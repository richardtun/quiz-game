const express = require('express');
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(helmet());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
let allQuestions = JSON.parse(fs.readFileSync(path.join(__dirname, 'public', 'ques.json'), 'utf8'));
function shuffleArray(arr) {
	return arr
		.map(v => ({ v, sort: Math.random() }))
		.sort((a,b) => a.sort-b.sort)
		.map(({v}) => v);
}
function shuffleChoices(question) {
	const choices = [question.A, question.B, question.C, question.D].filter(c=>c!==undefined);
	const map = {A:0, B:1, C:2, D:3};
	const correctIndex = map[question.answer];
	const combined = choices.map((text, idx) => ({text, idx}));
	const shuffled = shuffleArray(combined);
	const newCorrect = shuffled.findIndex(c => c.idx === correctIndex);
	return { question: question.question, choices: shuffled.map(c=>c.text), answer: newCorrect };
}
app.get('/api/quiz', (req, res) => {
	const N = Math.floor(Math.random()*11) + 20; // 20-30 questions
	const shuffled = shuffleArray(allQuestions);
	const subset = shuffled.slice(0, N).map(q => shuffleChoices(q));
	res.json(subset);
});

app.listen(PORT, ()=>console.log(`Quiz server running at http://localhost:${PORT}`));
