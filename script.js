let currentQuestion = 0;
let score = 0;
let quizState = [];
let currentLanguage = null;
let musicStarted = false;

const translations = {
    en: {
        chooseLanguage: "Choose Your Language",
        title: ["Pawly's", "Coolest", "Quiz"],
        takeQuiz: "Take Quiz",
        quizTime: "Quiz Time!",
        score: "Score: {{score}}/{{total}}",
        questionNumber: "Question {{current}} of {{total}}",
        confirmAnswer: "Confirm Answer",
        previous: "Previous",
        next: "Next",
        restartQuiz: "Restart Quiz",
        finishQuiz: "Finish Quiz",
        restartWarning: "Are you sure you want to restart? Your progress will be lost!",
        finishWarning: "You have {{unanswered}} unanswered question(s). Unanswered questions will be marked as wrong. Finish quiz?",
        finishMessage: "Quiz finished! Your score: {{score}}/{{total}}"
    },
    de: {
        chooseLanguage: "Wähle deine Sprache",
        title: ["Pawlys", "Coolstes", "Quiz"],
        takeQuiz: "Quiz starten",
        quizTime: "Quiz-Zeit!",
        score: "Punkte: {{score}}/{{total}}",
        questionNumber: "Frage {{current}} von {{total}}",
        confirmAnswer: "Antwort bestätigen",
        previous: "Zurück",
        next: "Weiter",
        restartQuiz: "Quiz neu starten",
        finishQuiz: "Quiz beenden",
        restartWarning: "Bist du sicher, dass du neu starten willst? Dein Fortschritt geht verloren!",
        finishWarning: "Du hast {{unanswered}} unbeantwortete Frage(n). Unbeantwortete Fragen werden als falsch gewertet. Quiz beenden?",
        finishMessage: "Quiz beendet! Dein Punktestand: {{score}}/{{total}}"
    }
};

const modalEl = document.getElementById("language-modal");
const modalTitleEl = document.getElementById("modal-title");
const landingEl = document.getElementById("landing");
const landingTitleEl = document.getElementById("landing-title");
const quizContainerEl = document.getElementById("quiz-container");
const startBtn = document.getElementById("start-btn");
const langEnBtn = document.getElementById("lang-en");
const langDeBtn = document.getElementById("lang-de");
const switchEnBtn = document.getElementById("switch-en");
const switchDeBtn = document.getElementById("switch-de");
const quizTitleEl = document.getElementById("quiz-title");
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

function updateLanguage() {
    const t = translations[currentLanguage];
    modalTitleEl.textContent = t.chooseLanguage;
    landingTitleEl.innerHTML = t.title.join("<br>");
    startBtn.textContent = t.takeQuiz;
    quizTitleEl.textContent = t.quizTime;
    confirmBtn.textContent = t.confirmAnswer;
    prevBtn.textContent = t.previous;
    nextBtn.textContent = t.next;
    restartBtn.textContent = t.restartQuiz;
    finishBtn.textContent = t.finishQuiz;
    switchEnBtn.classList.toggle("active", currentLanguage === "en");
    switchDeBtn.classList.toggle("active", currentLanguage === "de");
    updateQuizUI();
}

function initializeQuiz() {
    quizState = quizData.map((q) => {
        const indices = q.options.map((_, index) => index); // Array of indices [0, 1, 2, 3]
        return {
            answered: false,
            selected: null,
            correct: false,
            originalIndices: indices,
            shuffledIndices: shuffle([...indices]) // Shuffle indices, not options
        };
    });
    score = 0;
    currentQuestion = 0;
    loadQuestion();
    updateNavBoxes();
}

function loadQuestion() {
    const q = quizData[currentQuestion];
    const state = quizState[currentQuestion];
    questionEl.textContent = q.question[currentLanguage];
    optionsEl.innerHTML = "";
    explanationEl.classList.add("explanation-hidden");

    // Map shuffled indices to options in the current language
    const currentOptions = state.shuffledIndices.map(index => ({
        text: q.options[index][currentLanguage], // Get the text in the current language
        original: q.options[index] // Store the full option object
    }));

    currentOptions.forEach(option => {
        const div = document.createElement("div");
        div.classList.add("option");
        div.textContent = option.text; // Display the text in the current language
        if (state.answered) {
            const correctAnswer = atob(q.answer);
            if (option.text === correctAnswer) div.classList.add("correct");
            if (state.selected && option.text === state.selected[currentLanguage] && option.text !== correctAnswer) {
                div.classList.add("wrong");
            }
        } else if (state.selected && option.text === state.selected[currentLanguage]) {
            div.classList.add("selected");
        }
        div.onclick = () => selectOption(div, option.original);
        optionsEl.appendChild(div);
    });

    if (state.answered) {
        explanationEl.textContent = q.explanation[currentLanguage];
        explanationEl.classList.remove("explanation-hidden");
    }

    updateQuizUI();
}

function updateQuizUI() {
    const t = translations[currentLanguage];
    scoreEl.textContent = t.score.replace("{{score}}", score).replace("{{total}}", quizData.length);
    questionNumberEl.textContent = t.questionNumber.replace("{{current}}", currentQuestion + 1).replace("{{total}}", quizData.length);
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.disabled = currentQuestion === quizData.length - 1;
    updateFinishButton();
}

function selectOption(element, option) {
    if (quizState[currentQuestion].answered) return;
    quizState[currentQuestion].selected = option; // Store the full option object
    document.querySelectorAll(".option").forEach(opt => opt.classList.remove("selected"));
    element.classList.add("selected");
    confirmBtn.disabled = false;
}

confirmBtn.onclick = () => {
    if (!quizState[currentQuestion].selected || quizState[currentQuestion].answered) return;
    quizState[currentQuestion].answered = true;
    const q = quizData[currentQuestion];
    const correctAnswer = atob(q.answer);
    explanationEl.textContent = q.explanation[currentLanguage];
    explanationEl.classList.remove("explanation-hidden");

    if (quizState[currentQuestion].selected[currentLanguage] === correctAnswer) {
        score++;
        quizState[currentQuestion].correct = true;
        correctSound.play();
    } else {
        wrongSound.play();
    }
    updateQuizUI();
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
    if (confirm(translations[currentLanguage].restartWarning)) {
        initializeQuiz();
    }
};

function updateNavBoxes() {
    questionNavEl.innerHTML = "";
    quizData.forEach((_, i) => {
        const box = document.createElement("div");
        box.classList.add("nav-box");
        box.textContent = (i + 1).toString(); // Add question number (1, 2, 3, ...)
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
    const t = translations[currentLanguage];
    const unanswered = quizState.filter(q => !q.answered).length;
    if (unanswered > 0) {
        if (confirm(t.finishWarning.replace("{{unanswered}}", unanswered))) {
            quizState.forEach((state, i) => {
                if (!state.answered) {
                    state.answered = true;
                    state.correct = false;
                }
            });
            score = quizState.filter(q => q.correct).length;
            loadQuestion();
            updateNavBoxes();
            alert(t.finishMessage.replace("{{score}}", score).replace("{{total}}", quizData.length));
        }
    } else {
        alert(t.finishMessage.replace("{{score}}", score).replace("{{total}}", quizData.length));
    }
};

startBtn.onclick = () => {
    landingEl.classList.add("hidden");
    quizContainerEl.classList.remove("hidden");
    document.getElementById("language-switch").classList.remove("hidden");
    initializeQuiz();
    startMusic();
};

function startMusic() {
    if (!musicStarted) {
        backgroundMusic.play();
        musicStarted = true;
    }
}

langEnBtn.onclick = () => {
    currentLanguage = "en";
    updateLanguage();
    modalEl.classList.add("hidden");
    landingEl.classList.remove("hidden");
    startMusic();
};

langDeBtn.onclick = () => {
    currentLanguage = "de";
    updateLanguage();
    modalEl.classList.add("hidden");
    landingEl.classList.remove("hidden");
    startMusic();
};

switchEnBtn.onclick = () => {
    currentLanguage = "en";
    updateLanguage();
    loadQuestion();
};

switchDeBtn.onclick = () => {
    currentLanguage = "de";
    updateLanguage();
    loadQuestion();
};

modalEl.classList.remove("hidden");
landingEl.classList.add("hidden");
quizContainerEl.classList.add("hidden");
document.getElementById("language-switch").classList.add("hidden");