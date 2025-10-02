// Quiz questions database
const questions = [
    {
        question: "What is the capital of France?",
        choices: ["Paris", "Rome", "Berlin", "Madrid"],
        answer: 0
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: 1
    },
    {
        question: "Who wrote 'Hamlet'?",
        choices: ["Charles Dickens", "William Shakespeare", "J.K. Rowling", "Mark Twain"],
        answer: 1
    },
    {
        question: "What is 2 + 2?",
        choices: ["3", "4", "5", "6"],
        answer: 1
    },
    {
        question: "What is a famous football club from England?",
        choices: ["PSG", "Barcelona", "Juventus", "Manchester United"],
        answer: 3
    }
];

// Game state
let currentQuestion = 0;
let score = 0;

// DOM elements
const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const nextBtn = document.getElementById('next-btn');
const scoreValueEl = document.getElementById('score-value');
const progressFillEl = document.getElementById('progress-fill');
const progressTextEl = document.getElementById('progress-text');
const questionNumberEl = document.getElementById('question-number');
const resultContainer = document.getElementById('result-container');
const finalScoreEl = document.getElementById('final-score');
const resultMessageEl = document.getElementById('result-message');
const restartBtn = document.getElementById('restart-btn');
const scoreBadge = document.getElementById('score-badge');

// Initialize the quiz
function init() {
    currentQuestion = 0;
    score = 0;
    scoreValueEl.textContent = score;
    resultContainer.classList.remove('show');
    scoreBadge.style.display = 'flex';
    showQuestion();
}

// Display current question
function showQuestion() {
    const q = questions[currentQuestion];
    
    // Update question text
    questionEl.textContent = q.question;
    questionNumberEl.textContent = `Question ${currentQuestion + 1}`;
    
    // Update progress
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressFillEl.style.width = `${progress}%`;
    progressTextEl.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    
    // Clear and create choice buttons
    choicesEl.innerHTML = '';
    q.choices.forEach((choice, idx) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = choice;
        btn.onclick = () => checkAnswer(idx, btn);
        choicesEl.appendChild(btn);
        
        // Add staggered animation
        setTimeout(() => {
            btn.style.animation = 'fadeInUp 0.5s ease forwards';
        }, idx * 100);
    });
    
    // Hide next button
    nextBtn.classList.remove('show');
}

// Check the selected answer
function checkAnswer(selectedIdx, selectedBtn) {
    const correct = questions[currentQuestion].answer;
    const buttons = choicesEl.querySelectorAll('.choice-btn');
    
    // Disable all buttons
    buttons.forEach((btn, idx) => {
        btn.disabled = true;
        
        // Highlight correct answer
        if (idx === correct) {
            btn.classList.add('correct');
        } 
        // Highlight incorrect answer if selected
        else if (idx === selectedIdx) {
            btn.classList.add('incorrect');
        }
    });
    
    // Update score if correct
    if (selectedIdx === correct) {
        score++;
        scoreValueEl.textContent = score;
        
        // Animate score badge
        scoreBadge.style.animation = 'none';
        setTimeout(() => {
            scoreBadge.style.animation = 'pulse 0.5s ease';
        }, 10);
    }
    
    // Show next button
    nextBtn.classList.add('show');
}

// Handle next button click
nextBtn.onclick = () => {
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showFinalScore();
    }
};

// Display final results
function showFinalScore() {
    // Hide quiz elements
    questionNumberEl.style.display = 'none';
    questionEl.style.display = 'none';
    choicesEl.style.display = 'none';
    nextBtn.classList.remove('show');
    progressTextEl.style.display = 'none';
    scoreBadge.style.display = 'none';
    
    // Calculate percentage
    const percentage = (score / questions.length) * 100;
    
    // Set final score
    finalScoreEl.textContent = `${score}/${questions.length}`;
    
    // Set motivational message based on score
    let message = '';
    let icon = '🎉';
    
    if (percentage === 100) {
        message = 'Perfect score! You\'re a genius! 🌟';
        icon = '🏆';
    } else if (percentage >= 80) {
        message = 'Excellent work! You really know your stuff! 🎯';
        icon = '⭐';
    } else if (percentage >= 60) {
        message = 'Good job! Keep learning and improving! 👍';
        icon = '😊';
    } else if (percentage >= 40) {
        message = 'Not bad! With more practice, you\'ll do even better! 💪';
        icon = '📚';
    } else {
        message = 'Keep trying! Every expert was once a beginner! 🌱';
        icon = '💡';
    }
    
    resultMessageEl.textContent = message;
    document.querySelector('.result-icon').textContent = icon;
    
    // Show results
    resultContainer.classList.add('show');
}

// Handle restart button
restartBtn.onclick = () => {
    // Reset displays
    questionNumberEl.style.display = 'block';
    questionEl.style.display = 'block';
    choicesEl.style.display = 'flex';
    progressTextEl.style.display = 'block';
    
    // Restart quiz
    init();
};

// Start the quiz
init();