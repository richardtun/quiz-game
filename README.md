# Quiz Game

[![Live Demo on Render](https://img.shields.io/badge/Live%20Demo-Render-brightgreen?logo=render)](https://quiz-game-vyf6.onrender.com/)

## Overview
This is an **Quiz Game** web application built with **Node.js, Express, HTML, CSS, and JavaScript**, designed for a large question pool and secure interactive gameplay.

### Key Features

- **3000+ questions** with dynamic loading
- **Shuffling system** for questions and options
- **Secure answer handling**: Prevents revealing answers via inspect or frontend code
- **Animated feedback** for correct/wrong answers
- **Responsive design** for all devices
- **Score tracking with final summary**
- **Timer support** for timed quizzes (optional)
- **Progress bar** showing quiz completion
- **Customizable question categories and difficulty levels**

## Tech Stack

- **Backend:** Node.js, Express
- **Frontend:** HTML, CSS (Flexbox/Grid, Animations), JavaScript
- **Data:** JSON file (`ques.json`) with secure question handling
- **Optional:** Local storage for progress, charts for score visualization

## Installation

1. Clone the repo:
```bash
git clone https://github.com/<your-username>/quiz-app.git
```

2. Navigate to the project folder:
```bash
cd quiz-app
```

3. Install dependencies:
```bash
npm install
```

4. Run the server:
```bash
npm start
```

5. Open in browser:
```
http://localhost:3000
```

## Live Demo
Check out the live demo [here](https://quiz-game-vyf6.onrender.com/).

## Security Measures

- All correct answers handled server-side
- Frontend only receives question text and shuffled options
- Prevents users from inspecting source to reveal answers
- Randomized question and option order every session
- Optional authentication can be added for exam-like security

## Advanced Customization 

- **Add categories:** Separate `ques.json` files per category
- **Timed quizzes:** Countdown timers with auto-next question
- **Leaderboard:** Store scores for multiple users
- **Animations:** Smooth transitions on answer selection

## Contributing
Contributions are welcome! You can add new questions, improve UI/UX, or enhance security measures.
---