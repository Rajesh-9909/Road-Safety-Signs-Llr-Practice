// quickPractice.js
import { supabase } from './config.js';

// Get a signed URL for an image
async function getSignedUrl(path) {
  console.log('Getting signed URL for path:', path);
  
  // Try with public URL first
  try {
    const { data: publicUrlData } = supabase
      .storage
      .from('signs')
      .getPublicUrl(path);
    
    console.log('Generated public URL:', publicUrlData.publicUrl);
    
    // Test the public URL
    const testResponse = await fetch(publicUrlData.publicUrl, { method: 'HEAD' });
    console.log('Public URL test response status:', testResponse.status);
    
    if (testResponse.ok) {
      console.log('Using public URL');
      return publicUrlData.publicUrl;
    }
  } catch (publicUrlError) {
    console.warn('Error testing public URL, trying signed URL:', publicUrlError);
  }
  
  // If public URL fails, try signed URL
  try {
    console.log('Trying to get signed URL...');
    const { data, error } = await supabase
      .storage
      .from('signs')
      .createSignedUrl(path, 3600); // valid for 1 hour
    
    if (error) {
      console.error('Error from createSignedUrl:', error);
      throw error;
    }
    
    if (!data?.signedUrl) {
      throw new Error('No signed URL returned');
    }
    
    console.log('Generated signed URL:', data.signedUrl);
    return data.signedUrl;
    
  } catch (error) {
    console.error('Error in getSignedUrl:', {
      error,
      path,
      message: error.message,
      stack: error.stack
    });
    
    // As a last resort, try to construct a direct URL
    const directUrl = `https://ittpqmsjywssnffqoonv.supabase.co/storage/v1/object/public/signs/${path}`;
    console.log('Falling back to direct URL:', directUrl);
    return directUrl;
  }
}

// Fetch Quick Practice questions from Supabase
async function fetchQuickPracticeQuestions() {
  try {
    console.log('Fetching questions from Supabase...');
    const { data, error } = await supabase
      .from('quiz_questions')
      .select('*');
    
    if (error) {
      console.error('Supabase query error:', error);
      throw error;
    }
    
    console.log(`Fetched ${data.length} questions from Supabase`);
    
    // Log first few questions for debugging
    console.log('Sample questions (first 3):', data.slice(0, 3).map(q => ({
      question: q.question,
      img: q.img || q.image_url || q.image,
      options: q.options || 'No options array',
      answer: q.answer || q.correct_answer
    })));

    return data.map(row => {
      // Extract options
      let options = [];
      if (Array.isArray(row.options) && row.options.length) {
        options = row.options;
      } else {
        // Fallback: look for option1, option2, etc.
        const optKeys = Object.keys(row)
          .filter(k => /^option[\d_]/i.test(k))
          .sort((a, b) => {
            // Sort options in order (option1, option2, etc.)
            const numA = parseInt(a.replace(/\D/g, '')) || 0;
            const numB = parseInt(b.replace(/\D/g, '')) || 0;
            return numA - numB;
          });
        options = optKeys.map(k => row[k]).filter(Boolean);
      }

      // Determine correct answer index
      let answerIdx = 0;
      const rawAnswer = row.correct_answer ?? row.answer;
      if (typeof rawAnswer === 'number') {
        answerIdx = rawAnswer;
      } else if (typeof rawAnswer === 'string') {
        answerIdx = options.findIndex(o => o === rawAnswer);
      }

      // Handle image path
      const imgPath = row.image_url || row.img || row.image;
      let cleanImgPath = null;
      
      if (imgPath) {
        // Extract just the filename, handling different URL formats
        cleanImgPath = imgPath
          .replace(/^.*[\\/]/, '') // Remove path
          .split('?')[0]; // Remove query parameters
      }

      return {
        id: row.id || Math.random().toString(36).substr(2, 9),
        question: row.question,
        options,
        answer: answerIdx,
        img: cleanImgPath,
        imgPath: cleanImgPath, // Use the same clean path for both
        originalPath: imgPath, // Keep original for reference
        category: row.category || 'Uncategorized',
        explanation: row.explanation
      };
    });
  } catch (error) {
    console.error('Error in fetchQuickPracticeQuestions:', {
      error,
      message: error.message,
      stack: error.stack
    });
    throw error; // Re-throw to be handled by the caller
  }
}

// Render the Quick Practice MCQ UI into #mcq-container
function renderMCQUI(questions) {
  const container = document.getElementById('mcq-container');
  if (!container) return;
  if (!questions.length) {
    container.innerHTML = '<div class="text-red-500 text-center">No questions available. Please check your Supabase table "quiz_questions" and ensure it has data.</div>';
    return;
  }

  let currentQuestion = 0;
  let score = 0;
  let answers = new Array(questions.length).fill(null);

  // Responsive Navigator: mobile drawer
  let navDrawer = null;
  function showNavDrawer() {
    if (!navDrawer) {
      navDrawer = document.createElement('div');
      navDrawer.id = 'nav-drawer';
      navDrawer.className = 'fixed inset-0 bg-black bg-opacity-40 flex items-end z-50 md:hidden';
      navDrawer.innerHTML = `
        <div class='bg-white dark:bg-gray-900 w-full rounded-t-2xl p-6 max-h-[60vh] overflow-y-auto'>
          <div class='flex justify-between items-center mb-4'>
            <h3 class='text-lg font-bold text-blue-700 dark:text-blue-200'>Question Navigator</h3>
            <button id='close-nav-drawer' class='text-2xl'>&times;</button>
          </div>
          <div id='drawer-question-nav' class='grid grid-cols-5 gap-2'></div>
        </div>
      `;
      document.body.appendChild(navDrawer);
      navDrawer.querySelector('#close-nav-drawer').onclick = hideNavDrawer;
    }
    // Render questions in drawer
    const drawerNav = navDrawer.querySelector('#drawer-question-nav');
    drawerNav.innerHTML = questions.map((q, idx) => `
      <button
        class="navigator-button ${idx === currentQuestion ? 'current border-blue-600 border-2' : ''} ${answers[idx] !== null ? 'answered bg-green-100' : ''} px-2 py-2 rounded text-xs font-semibold truncate w-full"
        title="Q${idx + 1}: ${q.question.length > 40 ? q.question.slice(0, 40) + '…' : q.question}"
        style="outline:none;"
        data-qidx="${idx}"
      >${idx + 1}</button>
    `).join('');
    Array.from(drawerNav.children).forEach((btn, idx) => {
      btn.onclick = () => {
        currentQuestion = idx;
        hideNavDrawer();
        showQuestion();
      };
    });
    navDrawer.style.display = 'flex';
  }
  function hideNavDrawer() {
    if (navDrawer) navDrawer.style.display = 'none';
  }
  // Add mobile nav button if not present
  window.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('mobile-nav-btn')) {
      const main = document.querySelector('main .flex');
      if (main) {
        const btn = document.createElement('button');
        btn.id = 'mobile-nav-btn';
        btn.className = 'md:hidden fixed bottom-5 right-5 z-50 bg-blue-600 text-white rounded-full shadow-lg p-4 text-xl';
        btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>';
        btn.title = 'Open Question Navigator';
        btn.onclick = showNavDrawer;
        document.body.appendChild(btn);
      }
    }
  });


  async function showQuestion() {
    // Debug log for current question data
    console.log('Current question data:', questions[currentQuestion]);
    
    // --- Question Navigator Rendering ---
    const nav = document.querySelector('#question-nav > .grid');
    if (nav) {
      nav.innerHTML = questions.map((q, idx) => `
        <button
          class="navigator-button flex items-center justify-center aspect-square w-full rounded-lg transition-all duration-200
          ${idx === currentQuestion ? 'bg-blue-600 text-white scale-105 shadow-lg' : 'bg-white dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700'}
          ${answers[idx] !== null ? '!bg-green-100 dark:!bg-green-900/50' : ''}
          border border-gray-200 dark:border-gray-700"
          title="Q${idx + 1}: ${q.question}"
          style="outline:none; min-width: 2rem;"
          data-qidx="${idx}"
        >
          <span class="text-xs font-semibold">${idx + 1}</span>
          <div class="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-blue-300 dark:group-hover:border-blue-700 pointer-events-none"></div>
        </button>
      `).join('');
      
      // Add event listeners with smooth scroll
      Array.from(nav.children).forEach((btn, idx) => {
        btn.onclick = (e) => {
          e.preventDefault();
          currentQuestion = idx;
          showQuestion();
          // Smooth scroll to keep button in view
          btn.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
          });
        };
      });
      
      // Auto-scroll to current question
      const currentBtn = nav.querySelector(`[data-qidx="${currentQuestion}"]`);
      if (currentBtn) {
        currentBtn.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
    // --- End Navigator Rendering ---

    const currentScore = answers.reduce((acc, ans, idx) => acc + (ans === questions[idx]?.answer ? 1 : 0), 0);
    const q = questions[currentQuestion];

    // Generate image URL if needed
    let imageHtml = '';
    if (q.img) {
      try {
        console.log('Processing image for question:', {
          questionId: q.id || currentQuestion,
          img: q.img,
          imgPath: q.imgPath
        });
        
        // Clean the image path
        const cleanImgPath = (q.imgPath || q.img).replace(/^.*[\\/]/, '');
        console.log('Cleaned image path:', cleanImgPath);
        
        // Get signed URL for the image
        const imageUrl = await getSignedUrl(cleanImgPath);
        console.log('Final image URL to use:', imageUrl);
        
        // Create a test image to verify it loads
        const testImg = new Image();
        testImg.src = imageUrl;
        
        await new Promise((resolve, reject) => {
          testImg.onload = () => {
            console.log('Image loaded successfully');
            resolve();
          };
          testImg.onerror = (err) => {
            console.error('Test image failed to load:', err);
            reject(new Error(`Failed to load image: ${cleanImgPath}`));
          };
          // Set a timeout to prevent hanging
          setTimeout(() => {
            if (!testImg.complete) {
              console.warn('Image loading timed out');
              resolve(); // Still try to use it
            }
          }, 5000);
        });
        
        imageHtml = `
          <div class="relative w-full mb-4 flex justify-center items-center">
            <div class="relative w-full max-w-[300px] h-[200px] flex items-center justify-center">
              <img 
                src="${imageUrl}" 
                alt="Question illustration" 
                class="max-w-full max-h-full w-auto h-auto object-contain mx-auto transition-all duration-200 hover:scale-105"
                onerror="this.onerror=null; this.classList.add('hidden'); this.nextElementSibling?.classList.remove('hidden')"
                loading="lazy"
                data-original-path="${cleanImgPath}"
              >
              <div class="hidden absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg">
                <svg class="w-10 h-10 text-red-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
                <p class="text-sm font-medium text-red-600 dark:text-red-400">Could not load image</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">${cleanImgPath}</p>
                <button onclick="location.reload()" class="mt-3 px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded transition-colors">
                  Try Again
                </button>
              </div>
            </div>
          </div>`;
      } catch (error) {
        console.error('Error loading image:', error);
        imageHtml = `
          <div class="text-center p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
            <p class="text-yellow-700 dark:text-yellow-300">Image could not be loaded.</p>
            <p class="text-xs text-yellow-600 dark:text-yellow-400 mt-2">${q.imgPath || q.img}</p>
            <button onclick="location.reload()" class="mt-2 px-3 py-1 text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded hover:bg-yellow-200 dark:hover:bg-yellow-800">
              Try Again
            </button>
          </div>`;
      }
    }

    container.innerHTML = `
      <div class="mb-6">
        <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
          <div class="h-full bg-blue-500 transition-all duration-300" style="width:${((currentQuestion + 1) / questions.length) * 100}%"></div>
        </div>
        <div class="bg-blue-50 dark:bg-blue-900 rounded-xl p-4 mb-4 shadow-sm border border-blue-100 dark:border-blue-800">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Q${currentQuestion + 1}. ${q.question}</h2>
          ${imageHtml}
        </div>
        <div class="grid gap-4">
          ${q.options.map((opt, idx) => `
            <button class="option px-5 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold hover:bg-blue-100 dark:hover:bg-blue-800 transition w-full text-left"
              data-idx="${idx}">${opt}</button>
          `).join('')}
        </div>
      </div>
      <div class="flex justify-between mt-8">
        <button id="prev-btn" class="px-5 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition" ${currentQuestion === 0 ? 'disabled' : ''}>&larr; Previous</button>
        <button id="next-btn" class="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">${currentQuestion === questions.length - 1 ? 'Finish' : 'Next &rarr;'}</button>
      </div>
      <div class="mt-4 text-gray-500 text-sm text-center">Question ${currentQuestion + 1} of ${questions.length}</div>
      <div id="mcq-feedback" class="text-center mt-4 font-semibold"></div>
      <div class="text-center text-sm mt-2">Score: <span id="live-score" class="font-semibold">${currentScore}</span></div>
    `;

    // Option button handler
    const allOptionButtons = container.querySelectorAll('.option');
    allOptionButtons.forEach(btn => {
      btn.onclick = () => {
        const selectedIdx = parseInt(btn.getAttribute('data-idx'));
        const isCorrect = selectedIdx === q.answer;
        answers[currentQuestion] = selectedIdx;

        allOptionButtons.forEach((b, idx) => {
          b.disabled = true;
          b.classList.remove('bg-green-200', 'bg-red-200');

          if (idx === q.answer) {
            b.classList.add('bg-green-200'); // correct answer
          } else if (idx === selectedIdx) {
            b.classList.add('bg-red-200'); // wrong selection
          }
        });

        const feedback = container.querySelector('#mcq-feedback');
        feedback.textContent = isCorrect ? 'Correct!' : 'Incorrect!';
        feedback.className = isCorrect ? 'text-green-600 font-semibold mt-4' : 'text-red-600 font-semibold mt-4';

        const newScore = answers.reduce((acc, ans, idx) => acc + (ans === questions[idx]?.answer ? 1 : 0), 0);
        const scoreElem = container.querySelector('#live-score');
        if (scoreElem) scoreElem.textContent = newScore;
      };
    });

    container.querySelector('#prev-btn').onclick = () => {
      if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
      }
    };

    container.querySelector('#next-btn').onclick = () => {
      if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
      } else {
        showResults();
      }
    };
  }

  function showResults() {
    score = answers.reduce((acc, ans, idx) => acc + (ans === questions[idx].answer ? 1 : 0), 0);
    const percent = ((score / questions.length) * 100).toFixed(1);
    container.innerHTML = `
      <div class="text-center">
        <h2 class="text-3xl font-bold mb-4 text-green-600 dark:text-green-300">Quick Practice Results</h2>
        <div class="text-lg mb-4 text-gray-700 dark:text-gray-200">Score: <span class="font-bold">${score}</span> / ${questions.length}</div>
        <div class="text-lg mb-4">Percentage: <span class="font-bold">${percent}%</span></div>
        <div class="mb-6">
          ${score / questions.length >= 0.6 ? '<span class="text-green-600 font-semibold">Congratulations! You passed.</span>' : '<span class="text-red-600 font-semibold">You did not pass. Try again!</span>'}
        </div>
        <button id="retry-btn" class="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 text-lg">Retry Practice</button>
      </div>
    `;
    container.querySelector('#retry-btn').onclick = () => {
      currentQuestion = 0;
      score = 0;
      answers = new Array(questions.length).fill(null);
      showQuestion();
    };
  }

  showQuestion();
}

// Debug function to test image URLs
window.debugImageUrls = async () => {
  const questions = await fetchQuickPracticeQuestions();
  console.log('=== Image URL Debug ===');
  questions.forEach((q, i) => {
    console.log(`Q${i + 1}: ${q.img || 'No image'}`);
    if (q.img) {
      // Test if image loads
      const img = new Image();
      img.onload = () => console.log(`✅ Image ${i + 1} loaded successfully`);
      img.onerror = () => console.error(`❌ Failed to load image ${i + 1}: ${q.img}`);
      img.src = q.img;
    }
  });};

// Test Supabase storage connection
async function testSupabaseStorage() {
  try {
    console.log('Testing Supabase storage connection...');
    
    // List all files in the 'signs' bucket
    const { data: files, error } = await supabase
      .storage
      .from('signs')
      .list();
    
    if (error) {
      console.error('Error listing files in Supabase storage:', error);
      return false;
    }
    
    console.log('Files in Supabase storage (first 10):', files.slice(0, 10));
    return true;
    
  } catch (error) {
    console.error('Error testing Supabase storage:', error);
    return false;
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  console.log('DOM loaded, initializing app...');
  
  // Test storage connection first
  const storageOk = await testSupabaseStorage();
  if (!storageOk) {
    console.error('Failed to connect to Supabase storage');
    // Continue anyway, as the error will be handled by the image loading code
  }
  
  try {
    const questions = await fetchQuickPracticeQuestions();
    console.log('Fetched questions:', questions.length);
    if (questions.length > 0) {
      console.log('First question data:', questions[0]);
    }
    renderMCQUI(questions);
  } catch (error) {
    console.error('Error initializing app:', error);
    const container = document.getElementById('mcq-container');
    if (container) {
      container.innerHTML = `
        <div class="p-6 bg-red-50 dark:bg-red-900/30 rounded-lg">
          <h2 class="text-xl font-bold text-red-700 dark:text-red-300">Error Loading Content</h2>
          <p class="mt-2 text-red-600 dark:text-red-400">${error.message || 'Unknown error occurred'}</p>
          <p class="mt-4 text-sm text-red-500 dark:text-red-400">Check the browser console for more details.</p>
          <button onclick="location.reload()" class="mt-4 px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded hover:bg-red-200 dark:hover:bg-red-800">
            Reload Page
          </button>
        </div>`;
    }
  }
  
  // Auto-run debug on load
  setTimeout(debugImageUrls, 1000);
});
