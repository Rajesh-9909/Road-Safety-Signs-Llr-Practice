// Import Supabase client and config
import { supabase } from './config.js'

// Get a signed URL for an image
async function getSignedUrl(path) {
  try {
    const { data, error } = await supabase
      .storage
      .from('signs')
      .createSignedUrl(path, 3600) // valid for 1 hour
    
    if (error) throw error;
    return data?.signedUrl || null;
  } catch (error) {
    console.error('Error getting signed URL:', error);
    // Fallback to public URL if signed URL fails
    const { data: { publicUrl } } = supabase
      .storage
      .from('signs')
      .getPublicUrl(path);
    return publicUrl;
  }
}

// --- UI Interactivity: Dark Mode, Mobile Menu, Smooth Scroll ---
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;

    // Check if localStorage is available (browser environment)
    const isBrowser = typeof window.localStorage !== 'undefined';
    const currentTheme = isBrowser ? localStorage.getItem('theme') || 'light' : 'light';
    html.classList.toggle('dark', currentTheme === 'dark');

    if (darkModeToggle) {
      darkModeToggle.addEventListener('click', () => {
        html.classList.toggle('dark');
        if (isBrowser) {
          localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
        }
      });
    }

    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenuToggle && mobileMenu) {
      mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
      });
      mobileMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') mobileMenu.classList.remove('active');
      });
    }

    // Smooth scrolling
    function scrollToSection(sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
    window.scrollToSection = scrollToSection;
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  });
}

// Function to fetch signs from Supabase
async function fetchSigns() {
  try {
    const { data, error } = await supabase
      .from('road_signs')
      .select('*');
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching signs:', error);
    return [];
  }
}

// Function to fetch quiz questions from Supabase
async function fetchQuizQuestions() {
  try {
    const { data, error } = await supabase
      .from('quiz_questions')
      .select('*');
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    return [];
  }
}

// Render the sign gallery on learn.html
async function renderSignGallery() {
  try {
    const rawSigns = await fetchSigns();
    // Map each sign to include a valid image URL using getSignedUrl
    const signs = await Promise.all(rawSigns.map(async sign => {
      let imgUrl = '';
      if (sign.img) {
        imgUrl = await getSignedUrl(sign.img);
      }
      // Debug log for affected categories
      if (["Mandatory", "Caution", "Rules", "Information"].includes(sign.type)) {
        console.log(`[DEBUG] type: ${sign.type}, name: ${sign.name}, img path: ${sign.img}, generated URL: ${imgUrl}`);
      }
      return {
        ...sign,
        img: imgUrl,
      };
    }));
    const gallery = document.getElementById('signGallery');
    if (!gallery) return;

    // Get unique categories and subcategories
    const categories = Array.from(new Set(signs.map(sign => sign.type)));
    let selectedCategory = window.selectedSignCategory || categories[0];
    const subcategories = Array.from(new Set(signs.filter(sign => sign.type === selectedCategory).map(sign => sign.subcategory)));
    let selectedSubcategory = window.selectedSignSubcategory || subcategories[0];

    // Category tabs/buttons
    const tabs = `
      <div class="flex flex-wrap gap-2 mb-6">
        ${categories.map(cat => `
          <button class="px-4 py-2 rounded-lg font-semibold transition-all duration-200
            ${cat === selectedCategory ? 'bg-orange-600 text-white shadow-lg' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-orange-100 dark:hover:bg-orange-800'}"
            onclick="selectSignCategory('${cat}')"
          >${cat}</button>
        `).join('')}
      </div>
    `;

    // Subcategory tabs/buttons
    const subtabs = `
      <div class="flex flex-wrap gap-2 mb-6">
        ${subcategories.map(sub => `
          <button class="px-3 py-1 rounded-lg font-semibold transition-all duration-200 text-sm
            ${sub === selectedSubcategory ? 'bg-orange-400 text-white shadow' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-orange-100 dark:hover:bg-orange-800'}"
            onclick="selectSignSubcategory('${sub}')"
          >${sub}</button>
        `).join('')}
      </div>
    `;

    // Filter signs by selected category and subcategory
    const filteredSigns = signs.filter(sign => sign.type === selectedCategory && sign.subcategory === selectedSubcategory);
    const cards = filteredSigns.length ? filteredSigns.map(sign => `
      <div class="sign-card bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex flex-col items-center mb-6 max-w-xs mx-auto">
        <img src="${sign.img}" alt="${sign.name} sign" class="w-24 h-24 object-contain mb-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white">
        <h3 class="font-bold text-lg mb-2 text-gray-900 dark:text-white">${sign.name}</h3>
        <p class="text-sm text-gray-500 dark:text-gray-300 mb-1"><span class="font-semibold">Type:</span> ${sign.type} &mdash; <span class="font-semibold">${sign.subcategory}</span></p>
        <p class="text-gray-700 dark:text-gray-200 text-center text-sm">${sign.description}</p>
      </div>
    `).join('') : '<div class="text-gray-500 dark:text-gray-400">No signs in this subcategory.</div>';

    gallery.innerHTML = tabs + subtabs + `<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">${cards}</div>`;
  } catch (error) {
    console.error('Error rendering sign gallery:', error);
  }
}

window.selectedSignSubcategory = null;
window.selectSignSubcategory = function(sub) {
  window.selectedSignSubcategory = sub;
  window.renderSignGallery();
};

window.selectedSignCategory = null;
window.selectSignCategory = function(cat) {
  window.selectedSignCategory = cat;
  // When changing category, reset subcategory to first available
  const subcategories = Array.from(new Set(window.roadSigns.filter(sign => sign.type === cat).map(sign => sign.subcategory)));
  window.selectedSignSubcategory = subcategories[0];
  window.renderSignGallery();
};

// Quiz logic
async function startQuiz() {
  try {
    const questions = await fetchQuizQuestions();
    let currentQuestion = 0;
    let score = 0;

    function showQuestion() {
      const quizContainer = document.getElementById('quizContainer');
      if (!quizContainer) return;
      if (currentQuestion >= questions.length) {
        quizContainer.innerHTML = `
          <h2>Quiz Completed!</h2>
          <p>Your Score: ${score} / ${questions.length}</p>
          <button onclick="startQuiz()">Retry Quiz</button>
        `;
        return;
      }
      const q = questions[currentQuestion];
      quizContainer.innerHTML = `
        <div class="quiz-question">${q.question}</div>
        <img src="${q.img}" alt="Question image" style="width:80px;height:80px;display:block;margin:1rem auto;">
        <div class="quiz-options">
          ${q.options.map((opt, idx) => `<button onclick="submitAnswer(${idx})">${opt}</button>`).join('')}
        </div>
        <div class="feedback" id="feedback"></div>
      `;
    }

    function submitAnswer(selected) {
      const q = questions[currentQuestion];
      const feedback = document.getElementById('feedback');
      if (!feedback) return;
      if (selected === q.answer) {
        feedback.textContent = "Correct!";
        feedback.style.color = "green";
        score++;
      } else {
        feedback.textContent = `Incorrect. Correct answer: ${q.options[q.answer]}`;
        feedback.style.color = "red";
      }
      setTimeout(() => {
        currentQuestion++;
        showQuestion();
      }, 1200);
    }

    showQuestion();
  } catch (error) {
    console.error('Error starting quiz:', error);
  }
}

// Expose for HTML inline calls
window.renderSignGallery = renderSignGallery;
window.startQuiz = startQuiz;
