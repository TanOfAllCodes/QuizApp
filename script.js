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

// --- DOM Element References (Keep as is) ---
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
// --- End DOM Element References ---

// Fisher-Yates (Knuth) Shuffle algorithm
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}


function updateLanguage() {
    const t = translations[currentLanguage];
    modalTitleEl.textContent = t.chooseLanguage;
    landingTitleEl.innerHTML = t.title.join("<br>");
    startBtn.textContent = t.takeQuiz;
    quizTitleEl.textContent = t.quizTime;
    confirmBtn.textContent = t.confirmAnswer; // Keep Confirm text consistent
    prevBtn.textContent = t.previous;
    nextBtn.textContent = t.next;
    restartBtn.textContent = t.restartQuiz;
    finishBtn.textContent = t.finishQuiz;
    switchEnBtn.classList.toggle("active", currentLanguage === "en");
    switchDeBtn.classList.toggle("active", currentLanguage === "de");
    // Update UI elements that depend on language if quiz is active
    if (!quizContainerEl.classList.contains("hidden")) {
        updateQuizUI(); // Update score/question number text
        loadQuestion(); // Reload question to show options in new language
    }
}

function initializeQuiz() {
    // Create initial state for each question
    quizState = quizData.map((q, questionIndex) => {
        // Create an array of original indices [0, 1, 2, ...]
        const originalIndices = q.options.map((_, index) => index);
        // Shuffle these indices to determine the display order
        const shuffledDisplayIndices = shuffle([...originalIndices]);

        return {
            questionIndex: questionIndex, // Store original question index if needed
            answered: false,
            selectedOriginalIndex: null, // Store the *original* index of the selected option
            correct: false,
            // Store the shuffled order of original indices for consistent display
            shuffledDisplayIndices: shuffledDisplayIndices
        };
    });
    score = 0;
    currentQuestion = 0; // Start at the first question
    confirmBtn.disabled = true; // Disable confirm initially
    loadQuestion();
    updateNavBoxes();
    updateQuizUI(); // Initial UI update
}


function loadQuestion() {
    const q = quizData[currentQuestion]; // Get the question data from qa_config.js
    const state = quizState[currentQuestion]; // Get the current state for this question
    questionEl.textContent = q.question[currentLanguage]; // Set question text
    optionsEl.innerHTML = ""; // Clear previous options
    explanationEl.classList.add("explanation-hidden"); // Hide explanation initially
    explanationEl.textContent = ""; // Clear explanation text

    // Use the pre-shuffled order stored in the state to display options
    state.shuffledDisplayIndices.forEach(originalIndex => {
        const optionData = q.options[originalIndex]; // Get the option data using the original index
        const div = document.createElement("div");
        div.classList.add("option");
        div.textContent = optionData[currentLanguage]; // Display text in the current language
        div.dataset.originalIndex = originalIndex; // Store the original index on the element

        // Add styling based on the question's state
        if (state.answered) {
            // If answered, show correct/wrong feedback
            if (originalIndex === 0) { // Index 0 is always correct
                div.classList.add("correct");
            } else if (state.selectedOriginalIndex === originalIndex) {
                // If this wrong option was selected
                div.classList.add("wrong");
            }
            div.style.pointerEvents = 'none'; // Disable clicking after answer
        } else if (state.selectedOriginalIndex === originalIndex) {
            // If not answered, but this option is selected
            div.classList.add("selected");
        }

        // Add click listener only if the question hasn't been answered
        if (!state.answered) {
            div.onclick = () => selectOption(div, originalIndex);
        }

        optionsEl.appendChild(div);
    });

    // Show explanation if the question has been answered
    if (state.answered) {
        explanationEl.textContent = q.explanation[currentLanguage];
        explanationEl.classList.remove("explanation-hidden");
        confirmBtn.disabled = true; // Keep confirm disabled after answering
    } else {
        // Re-enable/disable confirm button based on whether an option is selected
        confirmBtn.disabled = state.selectedOriginalIndex === null;
    }

    updateQuizUI(); // Update score, question number, nav buttons
}


function updateQuizUI() {
    if (!currentLanguage) return; // Don't update if language not set
    const t = translations[currentLanguage];
    scoreEl.textContent = t.score.replace("{{score}}", score).replace("{{total}}", quizData.length);
    questionNumberEl.textContent = t.questionNumber.replace("{{current}}", currentQuestion + 1).replace("{{total}}", quizData.length);
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.disabled = currentQuestion === quizData.length - 1;
    updateFinishButton(); // Update finish button state/highlight
    // Highlight current question in nav
    document.querySelectorAll('.nav-box').forEach((box, index) => {
        box.classList.toggle('current', index === currentQuestion);
    });
}

function selectOption(element, originalIndex) {
    const state = quizState[currentQuestion];
    if (state.answered) return; // Do nothing if already answered

    state.selectedOriginalIndex = originalIndex; // Store the original index of the selection

    // Update visual selection
    document.querySelectorAll(".option").forEach(opt => opt.classList.remove("selected"));
    element.classList.add("selected");

    confirmBtn.disabled = false; // Enable the confirm button
}

confirmBtn.onclick = () => {
    const state = quizState[currentQuestion];
    // Only proceed if an option is selected and not already answered
    if (state.selectedOriginalIndex === null || state.answered) return;

    state.answered = true; // Mark as answered
    const q = quizData[currentQuestion];

    // Check correctness by comparing the selected original index with 0
    if (state.selectedOriginalIndex === 0) {
        score++;
        state.correct = true;
        correctSound.play();
    } else {
        state.correct = false; // Ensure correct is false if wrong
        wrongSound.play();
    }

    confirmBtn.disabled = true; // Disable confirm button after answering
    loadQuestion(); // Reload question to show feedback (correct/wrong styles, explanation)
    updateNavBoxes(); // Update navigation box colors
    updateQuizUI(); // Update score display
};


nextBtn.onclick = () => {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        confirmBtn.disabled = true; // Disable confirm when moving to a new question
        loadQuestion();
    }
};

prevBtn.onclick = () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        confirmBtn.disabled = true; // Disable confirm when moving to a new question
        loadQuestion();
    }
};

restartBtn.onclick = () => {
    if (confirm(translations[currentLanguage].restartWarning)) {
        // Reset state and UI
        quizState = [];
        score = 0;
        currentQuestion = 0;
        landingEl.classList.add("hidden");
        quizContainerEl.classList.remove("hidden");
        document.getElementById("language-switch").classList.remove("hidden");
        initializeQuiz(); // Re-initialize the quiz state and load first question
    }
};

function updateNavBoxes() {
    questionNavEl.innerHTML = ""; // Clear existing boxes
    quizData.forEach((_, i) => {
        const box = document.createElement("div");
        box.classList.add("nav-box");
        box.textContent = (i + 1).toString(); // Display question number (1-based)
        box.classList.toggle('current', i === currentQuestion); // Highlight current

        // Add answered status classes if the question state exists
        if (quizState[i]) {
            if (quizState[i].answered) {
                box.classList.add(quizState[i].correct ? "answered-correct" : "answered-wrong");
            }
        }

        box.onclick = () => {
            currentQuestion = i;
            loadQuestion(); // Load the clicked question
        };
        questionNavEl.appendChild(box);
    });
}


function updateFinishButton() {
    const unanswered = quizState.filter(q => !q.answered).length;
    // Highlight if only 1 question is left, or maybe always if unanswered > 0?
    // Let's highlight whenever there are unanswered questions.
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
        // Mark all remaining unanswered questions as answered and incorrect
        quizState.forEach((state) => {
            if (!state.answered) {
                state.answered = true;
                state.correct = false; // Mark unanswered as wrong
                // Optionally set selectedOriginalIndex to something invalid like -1
                // state.selectedOriginalIndex = -1;
            }
        });
        // Recalculate score just in case (though it should be correct)
        score = quizState.filter(q => q.correct).length;

        // Update UI to reflect final state
        loadQuestion(); // Reload current q view to show final state if it was unanswered
        updateNavBoxes(); // Update nav boxes for all questions
        updateQuizUI(); // Update score display

        // Show final message
        alert(t.finishMessage.replace("{{score}}", score).replace("{{total}}", quizData.length));

        // Optionally disable quiz controls further or navigate away
        confirmBtn.disabled = true;
        nextBtn.disabled = true;
        prevBtn.disabled = true;
        optionsEl.querySelectorAll('.option').forEach(opt => opt.style.pointerEvents = 'none');
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
    // Attempt to play music only if not already started and user interaction occurred
    if (!musicStarted && backgroundMusic.paused) {
         backgroundMusic.play().then(() => {
            musicStarted = true;
        }).catch(error => {
            console.log("Background music playback failed:", error);
            // Autoplay might be blocked, user might need to interact more
        });
    }
}


// --- Language Selection Handlers ---
langEnBtn.onclick = () => {
    currentLanguage = "en";
    updateLanguage();
    modalEl.classList.add("hidden");
    landingEl.classList.remove("hidden");
    // Don't start quiz here, wait for "Take Quiz" button
    startMusic(); // Try starting music on language selection
};

langDeBtn.onclick = () => {
    currentLanguage = "de";
    updateLanguage();
    modalEl.classList.add("hidden");
    landingEl.classList.remove("hidden");
    // Don't start quiz here, wait for "Take Quiz" button
    startMusic(); // Try starting music on language selection
};

switchEnBtn.onclick = () => {
    if (currentLanguage !== "en") {
        currentLanguage = "en";
        updateLanguage(); // This will reload the question with the new language
    }
};

switchDeBtn.onclick = () => {
     if (currentLanguage !== "de") {
        currentLanguage = "de";
        updateLanguage(); // This will reload the question with the new language
    }
};
// --- End Language Selection Handlers ---


// --- Initial Page Setup ---
modalEl.classList.remove("hidden"); // Show language modal first
landingEl.classList.add("hidden");
quizContainerEl.classList.add("hidden");
document.getElementById("language-switch").classList.add("hidden");
// --- End Initial Page Setup ---
