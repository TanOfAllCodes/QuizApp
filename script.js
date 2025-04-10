let currentQuestion = 0;
let score = 0;
let selectedOption = null;
let answered = false;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const confirmBtn = document.getElementById("confirm-btn");
const explanationEl = document.getElementById("explanation");
const scoreEl = document.getElementById("score");
const questionNumberEl = document.getElementById("question-number");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function loadQuestion() {
    const q = quizData[currentQuestion];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";
    explanationEl.classList.add("hidden");
    confirmBtn.disabled = true;
    answered = false;
    selectedOption = null;

    const shuffledOptions = shuffle([...q.options]);
    shuffledOptions.forEach(option => {
        const div = document.createElement("div");
        div.classList.add("option");
        div.textContent = option;
        div.onclick = () => selectOption(div, option);
        optionsEl.appendChild(div);
    });

    questionNumberEl.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
    scoreEl.textContent = `Score: ${score}/${quizData.length}`;
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.disabled = currentQuestion === quizData.length - 1 && answered;
}

function selectOption(element, option) {
    if (answered) return;
    document.querySelectorAll(".option").forEach(opt => opt.classList.remove("selected"));
    element.classList.add("selected");
    selectedOption = option;
    confirmBtn.disabled = false;
}

confirmBtn.onclick = () => {
    if (!selectedOption || answered) return;
    answered = true;
    const q = quizData[currentQuestion];
    const correctAnswer = atob(q.answer);
    explanationEl.textContent = q.explanation;
    explanationEl.classList.remove("hidden");

    if (selectedOption === correctAnswer) {
        score++;
        correctSound.play();
    } else {
        wrongSound.play();
    }
    scoreEl.textContent = `Score: ${score}/${quizData.length}`;
    confirmBtn.disabled = true;
    nextBtn.disabled = currentQuestion === quizData.length - 1;
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
    currentQuestion = 0;
    score = 0;
    loadQuestion();
};

loadQuestion();