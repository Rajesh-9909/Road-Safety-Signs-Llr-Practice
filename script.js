// Mock Questions Data
const questions = [
    {
        id: "1",
        question: "Near a pedestrian crossing, when the pedestrians are waiting to cross the road, you should...",
        options: ["Sound horn and proceed", "Slow down, sound horn and pass", "Stop the vehicle and wait till the pedestrians cross the road and then proceed", "None of above"],
        answer: "Stop the vehicle and wait till the pedestrians cross the road and then proceed",
        category: "Pedestrian Safety"
      },
      {
        id: "2",
        question: "This sign represents...",
        options: ["Stop", "No parking", "Hospital ahead", "Give way"],
        answer: "Stop",
        img: "images/signs/stop.png",
        category: "Mandatory Signs - Stop Signs"
      },
      {
        id: "3",
        question: "You are approaching a narrow bridge, another vehicle is about to enter the bridge from opposite side, you should...",
        options: ["Increase the speed and try to cross the bridge as fast as possible", "Put on the head light and pass the bridge", "Wait till the other vehicle crosses the bridge and then proceed"],
        answer: "Wait till the other vehicle crosses the bridge and then proceed",
        category: "General Safety"
      },
      {
        id: "4",
        question: "This sign represents...",
        options: ["Keep left", "There is no road to the left", "Compulsory turn left", "Compulsory turn right"],
        answer: "Compulsory turn left",
        img: "images/signs/compulsory-turn-left.png",
        category: "Mandatory Signs - Directional Signs"
      },
      {
        id: "5",
        question: "When a vehicle is involved in an accident causing injury to any person...",
        options: ["Take the vehicle to the nearest police station and report the accident", "Stop the vehicle and report to the police station", "Take all reasonable steps to secure medical attention to the injured and report to the nearest police station within 24 hours"],
        answer: "Take all reasonable steps to secure medical attention to the injured and report to the nearest police station within 24 hours",
        category: "Accident Procedures"
      },
      {
        id: "6",
        question: "This sign represents...",
        options: ["Give way", "Hospital ahead", "Traffic island ahead", "Stop"],
        answer: "Give way",
        img: "images/signs/give-way.png",
        category: "Cautionary Signs - Warning Signs"
      },
      {
        id: "7",
        question: "On a road designated as one way...",
        options: ["Parking is prohibited", "Overtaking is prohibited", "Should not drive in reverse gear"],
        answer: "Should not drive in reverse gear",
        category: "General Safety"
      },
      {
        id: "8",
        question: "This sign represents...",
        options: ["No entry", "One way", "Speed limit", "None of above"],
        answer: "One way",
        img: "images/signs/one-way.png",
        category: "Mandatory Signs - One Way Signs"
      },
      {
        id: "9",
        question: "You can overtake a vehicle in front...",
        options: ["Through the right side of that vehicle", "Through the left side", "Through the any side that vehicle", "Not from any side of that vehicle"],
        answer: "Through the right side of that vehicle",
        category: "General Safety"
      },
      {
        id: "10",
        question: "This sign represents...",
        options: ["Right turn prohibited", "Sharp curve to the right", "U-turn prohibited", "Overtaking prohibited"],
        answer: "U-turn prohibited",
        img: "images/signs/u-turn-prohibited.png",
        category: "Prohibitory Signs - Turn Prohibitions"
      },
      {
        id: "11",
        question: "When a vehicle approaches an unguarded railway level crossing before crossing it, the driver shall...",
        options: ["Stop the vehicle on the left side of the track, get down from the vehicle, go to the railway track, and ensure that no train or trolley is coming from either side and then proceed", "Sound horn and cross the track as fast as possible", "Wait till the train passes", "None of above"],
        answer: "Stop the vehicle on the left side of the track, get down from the vehicle, go to the railway track, and ensure that no train or trolley is coming from either side and then proceed",
        category: "Railway Crossing Safety"
      },
      {
        id: "12",
        question: "This sign represents...",
        options: ["Pedestrian crossing", "Pedestrians may enter", "Pedestrians prohibited", "School ahead"],
        answer: "Pedestrian crossing",
        img: "images/signs/pedestrian-crossing.png",
        category: "Cautionary Signs - Pedestrian Signs"
      },
      {
        id: "13",
        question: "How can you distinguish a transport vehicle?",
        options: ["By looking at the tyre size", "By colour of the vehicle", "By looking at the number plate of the vehicle"],
        answer: "By looking at the number plate of the vehicle",
        category: "General Knowledge"
      },
      {
        id: "14",
        question: "This sign represents...",
        options: ["Keep right side", "Parking on the right allowed", "Compulsory turn to right"],
        answer: "Parking on the right allowed",
        img: "images/signs/parking-right-allowed.png",
        category: "Mandatory Signs - Parking Signs"
      },
      {
        id: "15",
        question: "Validity of Learners licence...",
        options: ["Till the driving licence is obtained", "6 months", "30 days", "Upto 120 days from the date of issue of Learners License"],
        answer: "6 months",
        category: "Licence Information"
      },
      {
        id: "16",
        question: "This sign represents...",
        options: ["U-Turn prohibited", "Right turn prohibited", "Overtaking through left prohibited", "Left turn prohibited"],
        answer: "Right turn prohibited",
        img: "images/signs/right-turn-prohibited.png",
        category: "Prohibitory Signs - Turn Prohibitions"
      },
      {
        id: "17",
        question: "In a road without footpath, the pedestrians...",
        options: ["Should walk on the left side of the road", "Should walk on the right side of the road", "May walk on either side of the road"],
        answer: "Should walk on the right side of the road",
        category: "Pedestrian Safety"
      },
      {
        id: "18",
        question: "This sign represents...",
        options: ["Horn prohibited", "Compulsory sound horn", "May sound horn", "Hospital Ahead"],
        answer: "Horn prohibited",
        img: "images/signs/horn-prohibited.png",
        category: "Prohibitory Signs - Noise Restrictions"
      },
      {
        id: "19",
        question: "Free passage should be given to the following types of vehicles...",
        options: ["Police vehicles", "Ambulance and fire service vehicles", "Express, Super Express buses"],
        answer: "Ambulance and fire service vehicles",
        category: "General Safety"
      },
      {
        id: "20",
        question: "This sign represents...",
        options: ["Roads on both sides in front", "Narrow bridge ahead", "Narrow road ahead", "Restriction Ends"],
        answer: "Narrow bridge ahead",
        img: "images/signs/narrow-bridge-ahead.png",
        category: "Cautionary Signs - Road Condition Signs"
      },
      {
        id: "21",
        question: "Vehicles proceeding from opposite direction should be allowed to pass through ...",
        options: ["Your right side", "Your left side", "The convenient side"],
        answer: "Your right side",
        category: "General Safety"
      },
      {
        id: "22",
        question: "This sign represents...",
        options: ["First aid post", "Resting place", "Hospital", "Petrol pump"],
        answer: "Hospital",
        img: "images/signs/hospital.png",
        category: "Mandatory Signs - Service Signs"
      },
      {
        id: "23",
        question: "Driver of a vehicle may overtake ...",
        options: ["While driving down hill", "If the road is sufficiently wide", "When the driver of the vehicle in front shows the signal to overtake"],
        answer: "When the driver of the vehicle in front shows the signal to overtake",
        category: "General Safety"
      },
      {
        id: "24",
        question: "This sign represents...",
        options: ["First aid post", "Resting place", "Hospital"],
        answer: "First aid post",
        img: "images/signs/first-aid-post.png",
        category: "Mandatory Signs - Service Signs"
      },
      {
        id: "25",
        question: "Driver of a motor vehicle shall drive through...",
        options: ["The right side of the road", "The left side of the road", "The Center of the road"],
        answer: "The left side of the road",
        category: "General Safety"
      },
      {
        id: "26",
        question: "This sign represents...",
        options: ["Hospital", "Resting place", "First aid post", "Petrol pump"],
        answer: "Resting place",
        img: "images/signs/resting-place.png",
        category: "Mandatory Signs - Service Signs"
      },
      {
        id: "27",
        question: "When a vehicle is parked on the road side during night...",
        options: ["The vehicle should be locked", "The person having licence to drive such a vehicle should be in the driver seat", "The park light shall remain lit"],
        answer: "The park light shall remain lit",
        category: "General Safety"
      },
      {
        id: "28",
        question: "This sign represents...",
        options: ["Road closed", "No parking", "End of speed restriction"],
        answer: "End of speed restriction",
        img: "images/signs/end-speed-restriction.png",
        category: "Mandatory Signs - Speed Limit Signs"
      },
      {
        id: "29",
        question: "Fog lamps are used...",
        options: ["During night", "When there is mist", "When the opposite vehicle is not using dim light"],
        answer: "When there is mist",
        category: "General Safety"
      },
      {
        id: "30",
        question: "This sign represents...",
        options: ["Narrow road ahead", "Narrow bridge ahead", "Roads on both sides ahead", "No Entry"],
        answer: "Narrow road ahead",
        img: "images/signs/narrow-road-ahead.png",
        category: "Cautionary Signs - Road Condition Signs"
      },
      {
        id: "31",
        question: "Zebra lines are meant for...",
        options: ["Stopping vehicle", "Pedestrians crossing", "For giving preference to vehicle"],
        answer: "Pedestrians crossing",
        category: "Pedestrian Safety"
      },
      {
        id: "32",
        question: "This sign represents...",
        options: ["Railway station near", "Level crossing unguarded", "Level crossing Guarded"],
        answer: "Level crossing unguarded",
        img: "images/signs/level-crossing-unguarded.png",
        category: "Cautionary Signs - Railway Signs"
      },
      {
        id: "33",
        question: "When an ambulance is approaching...",
        options: ["allow passage if there are no vehicles from front side", "no preference need be given", "the driver shall allow free passage by drawing to the side of the road", "Yes it is Green Light"],
        answer: "the driver shall allow free passage by drawing to the side of the road",
        category: "General Safety"
      },
      {
        id: "34",
        question: "This sign represents...",
        options: ["Entry through right prohibited", "Entry through left prohibited", "Overtaking prohibited"],
        answer: "Overtaking prohibited",
        img: "images/signs/overtaking-prohibited.png",
        category: "Prohibitory Signs - Overtaking Prohibitions"
      },
      {
        id: "35",
        question: "Red traffic light indicates...",
        options: ["vehicle can proceed with caution", "stop the vehicle", "slow down", "Do not stop the vehicle"],
        answer: "stop the vehicle",
        category: "Traffic Signals"
      },
      {
        id: "36",
        question: "This sign represents...",
        options: ["Cross road", "No entry", "Hospital"],
        answer: "Cross road",
        img: "images/signs/cross-road.png",
        category: "Cautionary Signs - Intersection Signs"
      },
      {
        id: "37",
        question: "Parking a vehicle in front of entrance to hospital...",
        options: ["Proper", "Improper", "Proper if NO PARKING sign is provided"],
        answer: "Improper",
        category: "General Safety"
      },
      {
        id: "38",
        question: "This sign represents...",
        options: ["Restriction ends", "No entry", "No overtaking", "All are correct"],
        answer: "No entry",
        img: "images/signs/no-entry.png",
        category: "Prohibitory Signs - Access Restrictions"
      },
      {
        id: "39",
        question: "Where the slippery road sign is seen on the road, the driver shall...",
        options: ["reduce the speed by changing the gear", "apply brake", "proceed in the same speed"],
        answer: "reduce the speed by changing the gear",
        category: "General Safety"
      },
      {
        id: "40",
        question: "This sign represents...",
        options: ["May turn to left", "Compulsory go ahead or turn left", "Side road left", "Compulsory turn right"],
        answer: "Side road left",
        img: "images/signs/side-road-left.png",
        category: "Mandatory Signs - Directional Signs"
      },
      {
        id: "41",
        question: "Overtaking is prohibited in following circumstances...",
        options: ["when it is likely to cause inconvenience or danger to other traffic", "when the vehicle in front is reducing speed", "during night"],
        answer: "when it is likely to cause inconvenience or danger to other traffic",
        category: "General Safety"
      },
      {
        id: "42",
        question: "This sign represents...",
        options: ["Sound horn compulsory", "Sound horn continuously", "Horn prohibited", "Horn allowed"],
        answer: "Sound horn compulsory",
        img: "images/signs/sound-horn-compulsory.png",
        category: "Mandatory Signs - Noise Requirements"
      },
      {
        id: "43",
        question: "Overtaking when approaching a bend...",
        options: ["is permissible", "not permissible", "is permissible with care"],
        answer: "not permissible",
        category: "General Safety"
      },
      {
        id: "44",
        question: "This sign represents...",
        options: ["Road to the right in front", "Compulsory right", "Turn to right prohibited", "Turn to left prohibited"],
        answer: "Compulsory right",
        img: "images/signs/compulsory-right.png",
        category: "Mandatory Signs - Directional Signs"
      },
      {
        id: "45",
        question: "Drunken driving...",
        options: ["allowed in private vehicles", "allowed during night time", "prohibited in all vehicles"],
        answer: "prohibited in all vehicles",
        category: "General Safety"
      },
      {
        id: "46",
        question: "This sign represents...",
        options: ["End of restriction", "Do not stop", "No parking", "No Entry"],
        answer: "No Entry",
        img: "images/signs/no-entry.png",
        category: "Prohibitory Signs - Access Restrictions"
      },
      {
        id: "47",
        question: "Use of horn prohibited...",
        options: ["Mosque, Church and Temple", "Near Hospital, Courts of Law", "Near Police Station"],
        answer: "Near Hospital, Courts of Law",
        category: "General Safety"
      },
      {
        id: "48",
        question: "The sign represents...",
        options: ["Go straight", "One way", "Prohibited in both directions"],
        answer: "One way",
        img: "images/signs/one-way.png",
        category: "Mandatory Signs - One Way Signs"
      },
      {
        id: "49",
        question: "Rear view mirror is used...",
        options: ["for seeing", "for watching the traffic approaching from behind", "for seeing the back seat passenger"],
        answer: "for watching the traffic approaching from behind",
        category: "General Safety"
      },
      {
        id: "50",
        question: "The sign represents...",
        options: ["No entry for motor vehicles", "No entry for cars and motor cycles", "Entry allowed for cars and motor vehicles"],
        answer: "No entry for motor vehicles",
        img: "images/signs/no-motor-vehicles.png",
        category: "Prohibitory Signs - Vehicle Restrictions"
      }
];
// State Management
let currentQuestion = 0;
let answers = new Array(questions.length).fill(null);
let timeLeft = 900; // 15 minutes in seconds
let timer = null;
// DOM Elements
const screens = {
    instructions: document.getElementById('instructions-screen'),
    test: document.getElementById('test-screen'),
    results: document.getElementById('results-screen')
};
// Initialize the test
document.getElementById('start-test').addEventListener('click', startTest);
// Navigation event listeners are now set dynamically in showQuestion()

// Update total questions display
document.getElementById('total-questions').textContent = questions.length;
document.getElementById('total-score').textContent = questions.length;
// Initialize question navigator
const navigatorContainer = document.getElementById('navigator-buttons');
questions.forEach((_, index) => {
    const button = document.createElement('button');
    button.className = 'navigator-button';
    button.textContent = index + 1;
    button.addEventListener('click', () => navigateToQuestion(index));
    navigatorContainer.appendChild(button);
});
function startTest() {
    // Try to restore progress from localStorage
    const savedAnswers = JSON.parse(localStorage.getItem('llr_answers') || 'null');
    const savedCurrent = parseInt(localStorage.getItem('llr_currentQuestion'), 10);
    if (savedAnswers && Array.isArray(savedAnswers) && savedAnswers.length === questions.length) {
        answers = savedAnswers;
        if (!isNaN(savedCurrent) && savedCurrent >= 0 && savedCurrent < questions.length) {
            currentQuestion = savedCurrent;
        } else {
            currentQuestion = 0;
        }
    } else {
        answers = new Array(questions.length).fill(null);
        currentQuestion = 0;
    }

    // Always hide all screens first
    screens.instructions.classList.add('hidden');
    screens.test.classList.add('hidden');
    screens.results.classList.add('hidden');
    // Show only the test screen
    screens.test.classList.remove('hidden');
    startTimer();
    showQuestion(0);
}
function startTimer() {
    let warningShown = false;

    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        // Timer warning at 1 minute left
        const timerWarning = document.getElementById('timer-warning');
        if (timeLeft === 60 && timerWarning) {
            timerWarning.textContent = '⚠️ Only 1 minute left!';
            timerWarning.classList.remove('hidden');
        } else if (timeLeft < 60 && timerWarning) {
            // keep visible
        } else if (timerWarning) {
            timerWarning.classList.add('hidden');
            timerWarning.textContent = '';
        }
        if (timeLeft <= 0) {
            endTest();
        }
    }, 1000);
}
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('time-left').textContent =
        `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
function showQuestion(index) {
    // Save current question to localStorage
    localStorage.setItem('llr_currentQuestion', index);

    currentQuestion = index;
    const question = questions[index];
    // Show image if present
    const questionTextElem = document.getElementById('question-text');
    if (question.img) {
        questionTextElem.innerHTML = `
            <img src="${question.img}" alt="${question.question}" class="sign-image rounded-lg border border-gray-200 dark:border-gray-700 bg-white" onerror=\"this.onerror=null;this.style.display='none';questionTextElem.insertAdjacentHTML('afterbegin', '<div style=\\'color:#991b1b;font-size:0.9rem;margin-bottom:0.5rem;\\'>[Image not found]</div>');\">\n            <br><span class='block mt-2'>${question.question}</span>
        `;
    } else {
        questionTextElem.innerHTML = `<span class='block mt-2'>${question.question}</span>`;
    }
    // Update current question number
    document.getElementById('current-question').textContent = index + 1;
    // Create options
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    question.options.forEach((option, optionIndex) => {
        const optionDiv = document.createElement('label');
        optionDiv.className = 'flex items-center gap-3 cursor-pointer w-full p-4 rounded-xl border shadow-sm border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-200 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 group';
        if (answers[index] === optionIndex) {
            optionDiv.classList.add('border-blue-500', 'bg-blue-50', 'dark:bg-blue-900', 'ring-2', 'ring-blue-200');
        }
        optionDiv.innerHTML = `
            <input type="radio" name="option${index}" value="${optionIndex}" ${answers[index] === optionIndex ? 'checked' : ''} class="form-radio h-6 w-6 text-blue-600 focus:ring-2 focus:ring-blue-400 transition-all duration-200">
            <span class='text-base select-none group-hover:text-blue-700 transition-colors duration-200'>${option}</span>
        `;
        optionDiv.querySelector('input').addEventListener('change', () => {
            answers[index] = optionIndex;
            // Save answers to localStorage
            localStorage.setItem('llr_answers', JSON.stringify(answers));
            updateNavigatorButtons();
        });
        optionsContainer.appendChild(optionDiv);
    });
    // Update navigation buttons
    const prevButton = document.getElementById('prev-button');
    prevButton.disabled = index === 0;
    prevButton.onclick = showPreviousQuestion;
    const nextButton = document.getElementById('next-button');
    if (index === questions.length - 1) {
        nextButton.textContent = 'Submit Test';
        nextButton.onclick = endTest;
    } else {
        nextButton.textContent = 'Next →';
        nextButton.onclick = showNextQuestion;
    }
    // Update navigator buttons
    updateNavigatorButtons();

    // Update progress bar
    const progressBar = document.getElementById('progress-bar');
    if(progressBar) {
        progressBar.style.width = `${Math.round(((index+1)/questions.length)*100)}%`;
    }
}
function updateNavigatorButtons() {
    // Highlight current question and mark answered
    const navButtons = document.querySelectorAll('#navigator-buttons button');
    navButtons.forEach((btn, idx) => {
        btn.classList.remove('bg-blue-600','text-white','ring-2','ring-blue-300','border-green-500','after:content-[\'\']','after:absolute','after:bottom-1','after:right-1','after:w-2','after:h-2','after:bg-green-500','after:rounded-full');
        btn.classList.add('bg-white','text-blue-700','relative');
        if(idx === currentQuestion) {
            btn.classList.remove('bg-white','text-blue-700');
            btn.classList.add('bg-blue-600','text-white','ring-2','ring-blue-300');
        }
        // Mark answered
        if (answers[idx] !== null) {
            btn.classList.add('border-green-500');
            // Add a green dot (using a pseudo-element)
            btn.style.position = 'relative';
            if (!btn.querySelector('.answered-dot')) {
                const dot = document.createElement('span');
                dot.className = 'answered-dot absolute bottom-1 right-1 w-2 h-2 bg-green-500 rounded-full';
                btn.appendChild(dot);
            }
        } else {
            // Remove green dot if exists
            const dot = btn.querySelector('.answered-dot');
            if (dot) dot.remove();
        }
        // Touch-friendly
        btn.classList.add('rounded','transition','focus:outline-none','focus:ring-2','focus:ring-blue-400','w-8','h-8','md:w-9','md:h-9','text-sm','md:text-base');
    });
}

function showPreviousQuestion() {
    if (currentQuestion > 0) {
        showQuestion(currentQuestion - 1);
    }
}
function showNextQuestion() {
    if (currentQuestion < questions.length - 1) {
        showQuestion(currentQuestion + 1);
    }
}
function navigateToQuestion(index) {
    showQuestion(index);
}
function calculateScore() {
    return answers.reduce((score, selectedIndex, index) => {
        if (selectedIndex === null) return score;
        const correctIndex = questions[index].options.indexOf(questions[index].answer);
        return score + (selectedIndex === correctIndex ? 1 : 0);
    }, 0);
}
function showCustomConfirm(message) {
    return new Promise((resolve) => {
        const modal = document.getElementById('custom-alert-modal');
        const msg = document.getElementById('custom-alert-message');
        const confirmBtn = document.getElementById('custom-alert-confirm');
        const cancelBtn = document.getElementById('custom-alert-cancel');
        msg.textContent = message;
        modal.classList.remove('hidden');
        function cleanup(result) {
            modal.classList.add('hidden');
            confirmBtn.removeEventListener('click', onConfirm);
            cancelBtn.removeEventListener('click', onCancel);
            resolve(result);
        }
        function onConfirm() { cleanup(true); }
        function onCancel() { cleanup(false); }
        confirmBtn.addEventListener('click', onConfirm);
        cancelBtn.addEventListener('click', onCancel);
    });
}

async function endTest() {
    // Custom modal confirmation
    const confirmed = await showCustomConfirm('Are you sure you want to submit the test? You will not be able to change your answers.');
    if (!confirmed) return;
    // Remove progress from localStorage
    localStorage.removeItem('llr_answers');
    localStorage.removeItem('llr_currentQuestion');
    clearInterval(timer);
    const score = calculateScore();
    // Show results
    screens.test.classList.add('hidden');
    screens.results.classList.remove('hidden');
    // Show score
    document.getElementById('score').textContent = score;
    document.getElementById('total-score').textContent = questions.length;
    document.getElementById('percentage').textContent = Math.round((score / questions.length) * 100);
    // Show pass/fail
    const resultIcon = document.getElementById('result-icon');
    const resultMessage = document.getElementById('result-message');
    if ((score / questions.length) >= 0.6) {
        resultIcon.textContent = '🎉';
        resultMessage.textContent = 'Congratulations! You Passed';
        resultMessage.className = 'result-message text-green-600';
    } else {
        resultIcon.textContent = '😔';
        resultMessage.textContent = 'Sorry, You Did Not Pass';
        resultMessage.className = 'result-message text-red-600';
    }
    // Show button to reveal correct answers
    const resultsCard = document.querySelector('.results-card') || document.querySelector('#results-screen .flex-col');
    if (resultsCard) {
        // Remove previous answer details if any
        const prevDetails = document.getElementById('correct-answers-details');
        if (prevDetails) prevDetails.remove();
        // Add show answers button
        if (!document.getElementById('show-answers-btn')) {
            const btn = document.createElement('button');
            btn.id = 'show-answers-btn';
            btn.textContent = 'Show Correct Answers';
            btn.className = 'mt-6 mb-2 px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition';
            btn.onclick = () => {
                if (document.getElementById('correct-answers-details')) return;
                let details = '<div id="correct-answers-details" class="w-full mt-6">';
                questions.forEach((q, idx) => {
                    const correct = q.answer;
                    const userAns = answers[idx] !== null ? q.options[answers[idx]] : null;
                    details += `<div class=\"mb-2 p-2 rounded-lg ${userAns === correct ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}\">\n                        <div class=\"font-semibold\">Q${idx+1}: ${q.question}</div>\n                        <div>Your answer: <span class=\"${userAns === correct ? 'text-green-700' : 'text-red-700'}\">${userAns ? userAns : 'No answer'}</span></div>\n                        <div>Correct answer: <span class=\"text-green-700\">${correct}</span></div>\n                    </div>`;
                });
                details += '</div>';
                btn.insertAdjacentHTML('afterend', details);
            };
            resultsCard.appendChild(btn);
        }
    }
}
