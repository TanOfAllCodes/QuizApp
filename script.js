let currentQuestion = 0;
let score = 0;
let quizState = [];

const landingEl = document.getElementById("landing");
const quizContainerEl = document.getElementById("quiz-container");
const startBtn = document.getElementById("start-btn");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const confirmBtn = document.getElementById("confirm-btn");
const explanationEl = document.getElementById("explanation");
const scoreEl = document.getElementById("score");
const questionNumberEl = document.getElementById("question-number");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const finishBtn = document.getElementById("finish-btn");
const questionNavEl = document.getElementById("question-nav");
const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");
const backgroundMusic = document.getElementById("background-music");


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function initializeQuiz() {
    quizState = quizData.map(() => ({ answered: false, selected: null, correct: false }));
    score = 0;
    currentQuestion = 0;
    loadQuestion();
    updateNavBoxes();
}

function loadQuestion() {
    const q = quizData[currentQuestion];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";
    explanationEl.classList.add("hidden");
    confirmBtn.disabled = !quizState[currentQuestion].selected || quizState[currentQuestion].answered;

    const shuffledOptions = shuffle([...q.options]);
    shuffledOptions.forEach(option => {
        const div = document.createElement("div");
        div.classList.add("option");
        div.textContent = option;
        if (quizState[currentQuestion].answered) {
            const correctAnswer = atob(q.answer);
            if (option === correctAnswer) div.classList.add("correct");
            if (option === quizState[currentQuestion].selected && option !== correctAnswer) div.classList.add("wrong");
        } else if (option === quizState[currentQuestion].selected) {
            div.classList.add("selected");
        }
        div.onclick = () => selectOption(div, option);
        optionsEl.appendChild(div);
    });

    if (quizState[currentQuestion].answered) {
        explanationEl.textContent = q.explanation;
        explanationEl.classList.remove("hidden");
    }

    questionNumberEl.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
    scoreEl.textContent = `Score: ${score}/${quizData.length}`;
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.disabled = currentQuestion === quizData.length - 1;
    updateFinishButton();
}

function selectOption(element, option) {
    if (quizState[currentQuestion].answered) return;
    quizState[currentQuestion].selected = option;
    document.querySelectorAll(".option").forEach(opt => opt.classList.remove("selected"));
    element.classList.add("selected");
    confirmBtn.disabled = false;
}

confirmBtn.onclick = () => {
    if (!quizState[currentQuestion].selected || quizState[currentQuestion].answered) return;
    quizState[currentQuestion].answered = true;
    const q = quizData[currentQuestion];
    const correctAnswer = atob(q.answer);
    explanationEl.textContent = q.explanation;
    explanationEl.classList.remove("hidden");

    if (quizState[currentQuestion].selected === correctAnswer) {
        score++;
        quizState[currentQuestion].correct = true;
        correctSound.play();
    } else {
        wrongSound.play();
    }
    scoreEl.textContent = `Score: ${score}/${quizData.length}`;
    confirmBtn.disabled = true;
    loadQuestion();
    updateNavBoxes();
};

nextBtn.onclick = () => {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        loadQuestion();
    }
};

prevBtn.onclick = () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
};

restartBtn.onclick = () => {
    if (confirm("Are you sure you want to restart? Your progress will be lost!")) {
        initializeQuiz();
    }
};

function updateNavBoxes() {
    questionNavEl.innerHTML = "";
    quizData.forEach((_, i) => {
        const box = document.createElement("div");
        box.classList.add("nav-box");
        if (quizState[i].answered) {
            box.classList.add(quizState[i].correct ? "answered-correct" : "answered-wrong");
        }
        box.onclick = () => {
            currentQuestion = i;
            loadQuestion();
        };
        questionNavEl.appendChild(box);
    });
}

function updateFinishButton() {
    const unanswered = quizState.filter(q => !q.answered).length;
    finishBtn.classList.toggle("highlighted", unanswered === 1);
}

finishBtn.onclick = () => {
    const unanswered = quizState.filter(q => !q.answered).length;
    if (unanswered > 0) {
        if (confirm(`You have ${unanswered} unanswered question(s). Unanswered questions will be marked as wrong. Finish quiz?`)) {
            quizState.forEach((state, i) => {
                if (!state.answered) {
                    state.answered = true;
                    state.correct = false;
                }
            });
            score = quizState.filter(q => q.correct).length;
            loadQuestion();
            updateNavBoxes();
            alert(`Quiz finished! Your score: ${score}/${quizData.length}`);
        }
    } else {
        alert(`Quiz finished! Your score: ${score}/${quizData.length}`);
    }
};

startBtn.onclick = () => {
    landingEl.classList.add("hidden");
    quizContainerEl.classList.remove("hidden");
    initializeQuiz();
    backgroundMusic.play(); // This should work after click
};

// Start with landing page visible
landingEl.classList.remove("hidden");
quizContainerEl.classList.add("hidden");