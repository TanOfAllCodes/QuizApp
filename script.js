let currentQuestion = 0;
let score = 0;
let quizState = [];
let currentLanguage = null;

const translations = {
    en: {
        chooseLanguage: "Choose Your Language",
        title: ["Mööp", "Quiz"],
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
        title: ["Mööp", "Quiz"],
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

// --- DOM Element References ---
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
const resultsBtn = document.getElementById("results-btn");
const explanationEl = document.getElementById("explanation");
const scoreEl = document.getElementById("score");
const questionNumberEl = document.getElementById("question-number");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const finishBtn = document.getElementById("finish-btn");
const questionNavEl = document.getElementById("question-nav");
const languageSwitchEl = document.getElementById("language-switch");
const wrongSound = document.getElementById("wrong-sound");
// --- End DOM Element References ---

// Fisher-Yates (Knuth) Shuffle algorithm
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

function updateLanguage() {
    const t = translations[currentLanguage];
    // modalTitleEl.textContent = t.chooseLanguage;
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
    if (!quizContainerEl.classList.contains("quiz-container-hidden")) {
        updateQuizUI();
        loadQuestion();
    }
}

function initializeQuiz() {
    quizState = quizData.map((q, questionIndex) => {
        const originalIndices = q.options.map((_, index) => index);
        const shuffledDisplayIndices = shuffle([...originalIndices]);
        return {
            questionIndex: questionIndex,
            answered: false,
            selectedOriginalIndex: null,
            correct: false,
            shuffledDisplayIndices: shuffledDisplayIndices
        };
    });
    score = 0;
    currentQuestion = 0;
    confirmBtn.disabled = true;
    loadQuestion();
    updateNavBoxes();
    updateQuizUI();
}

function loadQuestion() {
    const q = quizData[currentQuestion];
    const state = quizState[currentQuestion];
    questionEl.textContent = q.question[currentLanguage];
    optionsEl.innerHTML = "";
    explanationEl.classList.add("explanation-hidden");
    explanationEl.textContent = "";

    state.shuffledDisplayIndices.forEach(originalIndex => {
        const optionData = q.options[originalIndex];
        const div = document.createElement("div");
        div.classList.add("option");
        div.textContent = optionData[currentLanguage];
        div.dataset.originalIndex = originalIndex;

        if (state.answered) {
            if (originalIndex === 0) {
                div.classList.add("correct");
            } else if (state.selectedOriginalIndex === originalIndex) {
                div.classList.add("wrong");
            }
            div.style.pointerEvents = 'none';
        } else if (state.selectedOriginalIndex === originalIndex) {
            div.classList.add("selected");
        }

        if (!state.answered) {
            div.onclick = () => selectOption(div, originalIndex);
        }

        optionsEl.appendChild(div);
    });

    if (state.answered) {
        explanationEl.textContent = q.explanation[currentLanguage];
        explanationEl.classList.remove("explanation-hidden");
        confirmBtn.disabled = true;
    } else {
        confirmBtn.disabled = state.selectedOriginalIndex === null;
    }

    updateQuizUI();
}

function updateQuizUI() {
    if (!currentLanguage) return;
    const t = translations[currentLanguage];
    scoreEl.textContent = t.score.replace("{{score}}", score).replace("{{total}}", quizData.length);
    questionNumberEl.textContent = t.questionNumber.replace("{{current}}", currentQuestion + 1).replace("{{total}}", quizData.length);
    
    // Handle navigation button visibility
    prevBtn.classList.toggle("prev-btn-hidden", currentQuestion === 0);
    nextBtn.classList.toggle("next-btn-hidden", currentQuestion === quizData.length - 1);
    
    // Check if quiz is completed
    const quizCompleted = quizState.every(q => q.answered);
    
    // Toggle Confirm/Results buttons
    confirmBtn.classList.toggle("confirm-btn-hidden", quizCompleted);
    resultsBtn.classList.toggle("results-btn-hidden", !quizCompleted);
    
    updateFinishButton();
    // Highlight current question in nav
    document.querySelectorAll('.nav-box').forEach((box, index) => {
        box.classList.toggle('current', index === currentQuestion);
    });
}

function selectOption(element, originalIndex) {
    const state = quizState[currentQuestion];
    if (state.answered) return;

    state.selectedOriginalIndex = originalIndex;

    document.querySelectorAll(".option").forEach(opt => opt.classList.remove("selected"));
    element.classList.add("selected");

    confirmBtn.disabled = false;
}

confirmBtn.onclick = () => {
    const state = quizState[currentQuestion];
    if (state.selectedOriginalIndex === null || state.answered) return;

    state.answered = true;
    const q = quizData[currentQuestion];

    if (state.selectedOriginalIndex === 0) {
        score++;
        state.correct = true;
    } else {
        state.correct = false;
        wrongSound.play();
    }

    confirmBtn.disabled = true;
    loadQuestion();
    updateNavBoxes();
    updateQuizUI();
};

nextBtn.onclick = () => {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        confirmBtn.disabled = true;
        loadQuestion();
    }
};

prevBtn.onclick = () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        confirmBtn.disabled = true;
        loadQuestion();
    }
};

restartBtn.onclick = () => {
    if (confirm(translations[currentLanguage].restartWarning)) {
        quizState = [];
        score = 0;
        currentQuestion = 0;
        landingEl.classList.add("landing-hidden");
        quizContainerEl.classList.remove("quiz-container-hidden");
        languageSwitchEl.classList.remove("language-switch-hidden");
        initializeQuiz();
    }
};

function updateNavBoxes() {
    questionNavEl.innerHTML = "";
    quizData.forEach((_, i) => {
        const box = document.createElement("div");
        box.classList.add("nav-box");
        box.textContent = (i + 1).toString();
        box.classList.toggle('current', i === currentQuestion);

        if (quizState[i]) {
            if (quizState[i].answered) {
                box.classList.add(quizState[i].correct ? "answered-correct" : "answered-wrong");
            }
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
    finishBtn.classList.toggle("highlighted", unanswered > 0);
}

finishBtn.onclick = () => {
    const t = translations[currentLanguage];
    const unanswered = quizState.filter(q => !q.answered).length;
    let proceed = true;

    if (unanswered > 0) {
        proceed = confirm(t.finishWarning.replace("{{unanswered}}", unanswered));
    }

    if (proceed) {
        quizState.forEach((state) => {
            if (!state.answered) {
                state.answered = true;
                state.correct = false;
            }
        });
        score = quizState.filter(q => q.correct).length;

        loadQuestion();
        updateNavBoxes();
        updateQuizUI();

        alert(t.finishMessage.replace("{{score}}", score).replace("{{total}}", quizData.length));

        confirmBtn.disabled = true;
        optionsEl.querySelectorAll('.option').forEach(opt => opt.style.pointerEvents = 'none');
    }
};

resultsBtn.onclick = () => {
    const t = translations[currentLanguage];
    alert(t.finishMessage.replace("{{score}}", score).replace("{{total}}", quizData.length));
};

startBtn.onclick = () => {
    landingEl.classList.add("landing-hidden");
    quizContainerEl.classList.remove("quiz-container-hidden");
    languageSwitchEl.classList.remove("language-switch-hidden");
    initializeQuiz();

};



// --- Language Selection Handlers ---
langEnBtn.onclick = () => {
    currentLanguage = "en";
    updateLanguage();
    modalEl.classList.add("modal-hidden");
    landingEl.classList.remove("landing-hidden");
};

langDeBtn.onclick = () => {
    currentLanguage = "de";
    updateLanguage();
    modalEl.classList.add("modal-hidden");
    landingEl.classList.remove("landing-hidden");
};

switchEnBtn.onclick = () => {
    if (currentLanguage !== "en") {
        currentLanguage = "en";
        updateLanguage();
    }
};

switchDeBtn.onclick = () => {
    if (currentLanguage !== "de") {
        currentLanguage = "de";
        updateLanguage();
    }
};
// --- End Language Selection Handlers ---

// --- Initial Page Setup ---
modalEl.classList.remove("modal-hidden");
landingEl.classList.add("landing-hidden");
quizContainerEl.classList.add("quiz-container-hidden");
languageSwitchEl.classList.add("language-switch-hidden");
// --- End Initial Page Setup ---