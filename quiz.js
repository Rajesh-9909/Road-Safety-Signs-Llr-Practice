// Quiz state
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let questions = [];
let categories = [];
let currentCategoryIndex = 0;

// DOM Elements
const welcomeScreen = document.getElementById('welcome-screen');
const quizContainer = document.getElementById('quiz-container');
const resultsScreen = document.getElementById('results-screen');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const currentQuestionElement = document.getElementById('current-question');
const totalQuestionsElement = document.getElementById('total-questions');
const currentCategoryElement = document.getElementById('current-category');
const progressBar = document.getElementById('progress');
const nextButton = document.getElementById('next-btn');
const prevButton = document.getElementById('prev-btn');
const questionStatusElement = document.getElementById('question-status');
const scoreElement = document.getElementById('score');

// Initialize the quiz
function initQuiz() {
  // Categorize questions
  const allQuestions = window.questions || [];
  
  // Extract unique categories
  const categoryMap = new Map();
  allQuestions.forEach(q => {
    if (!categoryMap.has(q.category)) {
      categoryMap.set(q.category, []);
    }
    categoryMap.get(q.category).push(q);
  });
  
  // Convert map to array and select 4 categories with enough questions
  categories = Array.from(categoryMap.entries())
    .filter(([_, qs]) => qs.length >= 5)
    .slice(0, 4);
  
  // Select 5 random questions from each category
  questions = [];
  categories.forEach(([category, qs]) => {
    const shuffled = [...qs].sort(() => 0.5 - Math.random());
    questions.push(...shuffled.slice(0, 5).map(q => ({
      ...q,
      categoryIndex: categories.findIndex(([c]) => c === category)
    })));
  });
  
  // Shuffle all questions
  questions = questions.sort(() => Math.random() - 0.5);
  
  // Initialize user answers
  userAnswers = new Array(questions.length).fill(null);
  
  // Update UI
  totalQuestionsElement.textContent = questions.length;
}

// Start the quiz
function startQuiz() {
  initQuiz();
  welcomeScreen.classList.add('hidden');
  quizContainer.classList.remove('hidden');
  showQuestion(0);
}

// Show question at the given index
function showQuestion(index) {
  if (index < 0 || index >= questions.length) return;
  
  currentQuestionIndex = index;
  const question = questions[index];
  
  // Update UI
  questionElement.textContent = question.question;
  currentQuestionElement.textContent = index + 1;
  currentCategoryElement.textContent = question.category.split('-')[0].trim();
  
  // Update progress
  const progress = ((index) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
  
  // Clear previous options
  optionsContainer.innerHTML = '';
  
  // Add new options
  question.options.forEach((option, i) => {
    const optionElement = document.createElement('button');
    optionElement.className = `w-full text-left p-4 rounded-lg border border-gray-200 mb-3 option-btn ${
      userAnswers[index] === i ? 'bg-blue-100 border-blue-400' : 'bg-white hover:bg-gray-50'
    }`;
    optionElement.textContent = option;
    optionElement.onclick = () => selectOption(i);
    optionsContainer.appendChild(optionElement);
  });
  
  // Update navigation buttons
  prevButton.disabled = index === 0;
  nextButton.textContent = index === questions.length - 1 ? 'Finish' : 'Next';
  nextButton.disabled = userAnswers[index] === null;
  
  // Update question status
  updateQuestionStatus();
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Handle option selection
function selectOption(optionIndex) {
  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = currentQuestion.answer === currentQuestion.options[optionIndex];
  
  // Update user's answer
  userAnswers[currentQuestionIndex] = optionIndex;
  
  // Update UI
  const optionElements = document.querySelectorAll('#options-container button');
  optionElements.forEach((el, i) => {
    el.classList.remove('bg-green-100', 'border-green-500', 'bg-red-100', 'border-red-500');
    el.disabled = true;
    
    if (i === optionIndex) {
      el.classList.add(isCorrect ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500');
    } else if (currentQuestion.options[i] === currentQuestion.answer) {
      el.classList.add('bg-green-100', 'border-green-500');
    }
  });
  
  // Update next button
  nextButton.disabled = false;
  
  // Update question status
  updateQuestionStatus();
}

// Update question status indicator
function updateQuestionStatus() {
  const status = userAnswers[currentQuestionIndex] !== null ? 'Answered' : 'Not answered';
  questionStatusElement.textContent = status;
}

// Show next question
function nextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    showQuestion(currentQuestionIndex + 1);
  } else {
    showResults();
  }
}

// Show previous question
function prevQuestion() {
  if (currentQuestionIndex > 0) {
    showQuestion(currentQuestionIndex - 1);
  }
}

// Show results
function showResults() {
  // Calculate scores
  const categoryScores = Array(categories.length).fill(0);
  let totalScore = 0;
  
  questions.forEach((q, i) => {
    if (userAnswers[i] !== null && 
        q.answer === q.options[userAnswers[i]]) {
      totalScore++;
      if (q.categoryIndex !== undefined) {
        categoryScores[q.categoryIndex]++;
      }
    }
  });
  
  // Update UI
  quizContainer.classList.add('hidden');
  resultsScreen.classList.remove('hidden');
  scoreElement.textContent = totalScore;
  
  // Update category scores
  categoryScores.forEach((score, i) => {
    const categoryElement = document.getElementById(`category-score-${i}`);
    if (categoryElement) {
      const nameElement = categoryElement.querySelector('div:first-child');
      const scoreElement = categoryElement.querySelector('.correct');
      
      if (nameElement && scoreElement) {
        nameElement.textContent = categories[i][0].split('-')[0].trim();
        scoreElement.textContent = score;
      }
    }
  });
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Reset the quiz
function resetQuiz() {
  // Reset state
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = new Array(questions.length).fill(null);
  
  // Reset UI
  resultsScreen.classList.add('hidden');
  welcomeScreen.classList.remove('hidden');
  
  // Re-initialize with new questions
  initQuiz();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Make questions available globally
  window.questions = window.questions || [];
  
  // Initialize event listeners
  nextButton.addEventListener('click', nextQuestion);
  prevButton.addEventListener('click', prevQuestion);
  
  // Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && !nextButton.disabled) {
      nextQuestion();
    } else if (e.key === 'ArrowLeft' && !prevButton.disabled) {
      prevQuestion();
    } else if (e.key >= '1' && e.key <= '4') {
      const optionIndex = parseInt(e.key) - 1;
      const options = document.querySelectorAll('#options-container button');
      if (optionIndex < options.length) {
        options[optionIndex].click();
      }
    }
  });
});
