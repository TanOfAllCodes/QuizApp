const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        answer: btoa("Paris"), // Base64 encoded answer
        explanation: "France's capital is Paris, a major cultural and economic center."
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Jupiter", "Venus", "Saturn"],
        answer: btoa("Mars"),
        explanation: "Mars is called the Red Planet due to its reddish appearance caused by iron oxide (rust) on its surface."
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: btoa("4"),
        explanation: "Basic arithmetic: 2 + 2 equals 4."
    },
    {
        question: "Which element has the symbol H?",
        options: ["Helium", "Hydrogen", "Hafnium", "Hassium"],
        answer: btoa("Hydrogen"),
        explanation: "Hydrogen is the first element in the periodic table with the symbol H."
    },
    {
        question: "What is the largest ocean?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        answer: btoa("Pacific"),
        explanation: "The Pacific Ocean is the largest, covering more area than all landmasses combined."
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Shakespeare", "Dickens", "Austen", "Hemingway"],
        answer: btoa("Shakespeare"),
        explanation: "William Shakespeare wrote the famous tragedy 'Romeo and Juliet'."
    },
    {
        question: "What gas do plants primarily use?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"],
        answer: btoa("Carbon Dioxide"),
        explanation: "Plants use carbon dioxide during photosynthesis to produce energy."
    },
    {
        question: "Which animal is known as man’s best friend?",
        options: ["Cat", "Dog", "Horse", "Bird"],
        answer: btoa("Dog"),
        explanation: "Dogs are often called man’s best friend due to their loyalty and companionship."
    },
    {
        question: "What is the boiling point of water in Celsius?",
        options: ["50", "75", "100", "125"],
        answer: btoa("100"),
        explanation: "Water boils at 100°C under standard atmospheric pressure."
    },
    {
        question: "Which color is not in a rainbow?",
        options: ["Red", "Blue", "Pink", "Yellow"],
        answer: btoa("Pink"),
        explanation: "A rainbow consists of seven colors (ROYGBIV), and pink is not one of them."
    }
];