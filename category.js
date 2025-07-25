// Supabase configuration
const supabaseUrl = 'https://ittpqmsjywssnffqoonv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0dHBxbXNqeXdzc25mZnFvb252Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNzY3NjksImV4cCI6MjA2NTY1Mjc2OX0.UdnbCkWY2j3JcPSZhEuLJz0-eXX1HQ_daZmTI62zRFU';

let supabase;
const tableName = 'quiz_questions';

// Category map for display title
const categoryMap = {
  ms: 'Mandatory Signs',
  cs: 'Cautionary Signs',
  is: 'Informational Signs',
  rules: 'Rules'
};

// Initialize Supabase
function initializeSupabase() {
  try {
    if (window.supabase) {
      supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
      return true;
    } else {
      console.error('Supabase library not loaded');
      return false;
    }
  } catch (error) {
    console.error('Error initializing Supabase:', error);
    return false;
  }
}

// Show error message
function showError(message) {
  const contentDiv = document.getElementById('content');
  if (contentDiv) {
    contentDiv.innerHTML = `
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline">${message}</span>
      </div>
    `;
  }
}

// Fetch and render data
async function fetchData() {
  const contentDiv = document.getElementById('content');
  if (!contentDiv) {
    console.error('Content div not found');
    return;
  }

  contentDiv.innerHTML = '<p class="text-center text-lg">Loading data...</p>';

  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .eq('category', category);

    if (error) throw error;

    if (!data || data.length === 0) {
      contentDiv.innerHTML = `
        <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
          <p class="font-bold">No Data Found</p>
          <p>No data found for "${categoryMap[category] || category}".</p>
        </div>
      `;
      return;
    }

    contentDiv.innerHTML = '';
    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4';
    contentDiv.appendChild(gridContainer);

    data.forEach((item) => {
      const card = document.createElement('div');
      card.className = "bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full";
      
      // Get answer directly from the answers column
      const correctAnswerText = item.answers || 'Not provided';
      
      card.innerHTML = `
        <div class="flex flex-col h-full">
          ${item.image_url ? `
            <div class="h-48 bg-gray-100 flex items-center justify-center p-4">
              <img 
                src="${item.image_url}" 
                alt="Sign" 
                class="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
                style="max-height: 100%; max-width: 100%; object-fit: contain;"
                onerror="this.onerror=null; this.src='https://via.placeholder.com/200?text=Image+Not+Found'"
              >
            </div>` : ''
          }

          <div class="p-6 flex-1 flex flex-col">
            <h3 class="text-xl font-semibold text-gray-800 mb-3">
              ${item.question || 'Question not available'}
            </h3>

            <div class="mt-auto pt-4 border-t border-gray-100">
              <p class="text-gray-700">
                <span class="font-medium">Answer:</span> 
                <span class="text-blue-600">${correctAnswerText}</span>
              </p>
              ${item.explanation ? `
                <div class="mt-3 p-3 bg-blue-50 rounded-lg">
                  <p class="text-sm text-blue-800">${item.explanation}</p>
                </div>` : ''
              }
            </div>
          </div>
        </div>
      `;

      gridContainer.appendChild(card);
    });

  } catch (error) {
    console.error('Error fetching data:', error);
    showError(`Failed to load data: ${error.message}`);
  }
}

// Init app
const params = new URLSearchParams(window.location.search);
const category = params.get('category');

function initApp() {
  const titleElement = document.getElementById('category-title');
  if (titleElement) {
    titleElement.textContent = categoryMap[category] || 'Learn Signs';
  }

  if (!initializeSupabase()) {
    showError('Database connection failed');
    return;
  }

  if (!category) {
    showError('No category selected.');
    return;
  }

  fetchData();
}

// Check if DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}