let questions = [];
let currentQuestion = 0;
let score = 0;
let timeLeft = 15*60;
let timerInterval;

const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const nextBtn = document.getElementById('next-btn');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const counterEl = document.getElementById('counter');
const progressEl = document.getElementById('progress');

fetch('/api/quiz')
.then(res=>res.json())
.then(data=>{
	questions = data;
	scoreEl.textContent = `Score: ${score}`;
	updateCounter();
	showQuestion();
	startTimer();
})
.catch(err=>{
	console.error(err);
	questionEl.textContent = 'Error loading quiz.';
});

function startTimer(){
	timerInterval = setInterval(()=>{
		if(timeLeft<=0){
			clearInterval(timerInterval);
			alert("Time is up!");
			showFinalScore();
		}else{
			timeLeft--;
			const min = Math.floor(timeLeft/60);
			const sec = timeLeft%60;
			timerEl.textContent = `Time Left: ${min}:${sec<10?'0'+sec:sec}`;
			if(timeLeft<=60) timerEl.classList.add('red');
		}
	},1000);
}

function updateCounter(){
	counterEl.textContent = `Question: ${currentQuestion+1} / ${questions.length}`;
	progressEl.style.width = `${((currentQuestion)/questions.length)*100}%`;
}

function showQuestion(){
	const q = questions[currentQuestion];
	questionEl.textContent = q.question;
	choicesEl.innerHTML = '';
	q.choices.forEach((choice, idx)=>{
		const btn = document.createElement('button');
		btn.textContent = choice;
		btn.disabled = false; // enable buttons
		btn.onclick = ()=>checkAnswer(idx, btn);
		choicesEl.appendChild(btn);
	});
	nextBtn.style.display='none';
	updateCounter();
}

function checkAnswer(selectedIdx, btn){
	const correct = questions[currentQuestion].answer;
	Array.from(choicesEl.children).forEach((b, idx)=>{
		b.disabled = true; // disable all after selection
		if(idx===correct) b.classList.add('correct'); // green
		else if(idx===selectedIdx) b.classList.add('incorrect'); // red
	});

	if(selectedIdx===correct) score++;
	scoreEl.textContent = `Score: ${score}`;
	nextBtn.style.display='inline-block';
}
 
nextBtn.onclick = ()=>{
	currentQuestion++;
	if(currentQuestion<questions.length) showQuestion();
	else showFinalScore();
};

function showFinalScore(){
	clearInterval(timerInterval);
	questionEl.textContent='Quiz Completed!';
	choicesEl.innerHTML='';
	nextBtn.style.display='none';
	progressEl.style.width='100%';
	scoreEl.textContent=`Your final score: ${score} / ${questions.length}`;
}
