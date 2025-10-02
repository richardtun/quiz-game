// Simple quiz questions
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
        question: "What is the football club of England?",
        choices: ["PSG", "Barcelona", "Juventus", "Manchester United"],
        answer: 3
    }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const nextBtn = document.getElementById('next-btn');
const scoreEl = document.getElementById('score');

function showQuestion() {
    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
    choicesEl.innerHTML = '';
    q.choices.forEach((choice, idx) => {
        const btn = document.createElement('button');
        btn.textContent = choice;
        btn.onclick = () => checkAnswer(idx, btn);
        choicesEl.appendChild(btn);
    });
    nextBtn.style.display = 'none';
}

function checkAnswer(selectedIdx, btn) {
    const correct = questions[currentQuestion].answer;
    Array.from(choicesEl.children).forEach((b, idx) => {
        b.disabled = true;
        if (idx === correct) b.classList.add('correct');
        else if (idx === selectedIdx) b.classList.add('incorrect');
    });
    if (selectedIdx === correct) {
        score++;
        scoreEl.textContent = `Score: ${score}`;
    }
    nextBtn.style.display = 'inline-block';
}

nextBtn.onclick = () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showFinalScore();
    }
};

function showFinalScore() {
    questionEl.textContent = 'Quiz Completed!';
    choicesEl.innerHTML = '';
    nextBtn.style.display = 'none';
    scoreEl.textContent = `Your final score: ${score} / ${questions.length}`;
}

// Start game
scoreEl.textContent = `Score: ${score}`;
showQuestion();
