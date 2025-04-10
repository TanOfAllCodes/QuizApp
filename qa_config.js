const quizData = [
    {
        question: {
            en: "What is the capital of France?",
            de: "Was ist die Hauptstadt von Frankreich?"
        },
        options: ["Paris", "London", "Berlin", "Madrid"],
        answer: btoa("Paris"), // Base64 encoded answer (same for both languages)
        explanation: {
            en: "France's capital is Paris, a major cultural and economic center.",
            de: "Die Hauptstadt Frankreichs ist Paris, ein bedeutendes kulturelles und wirtschaftliches Zentrum."
        }
    },
    {
        question: {
            en: "Which planet is known as the Red Planet?",
            de: "Welcher Planet ist als der Rote Planet bekannt?"
        },
        options: ["Mars", "Jupiter", "Venus", "Saturn"],
        answer: btoa("Mars"),
        explanation: {
            en: "Mars is called the Red Planet due to its reddish appearance caused by iron oxide (rust) on its surface.",
            de: "Mars wird der Rote Planet genannt wegen seines rötlichen Aussehens, das durch Eisenoxid (Rost) auf seiner Oberfläche verursacht wird."
        }
    },
    {
        question: {
            en: "What is 2 + 2?",
            de: "Was ist 2 + 2?"
        },
        options: ["3", "4", "5", "6"],
        answer: btoa("4"),
        explanation: {
            en: "Basic arithmetic: 2 + 2 equals 4.",
            de: "Grundrechenart: 2 + 2 ergibt 4."
        }
    },
    {
        question: {
            en: "Which element has the symbol H?",
            de: "Welches Element hat das Symbol H?"
        },
        options: ["Helium", "Hydrogen", "Hafnium", "Hassium"],
        answer: btoa("Hydrogen"),
        explanation: {
            en: "Hydrogen is the first element in the periodic table with the symbol H.",
            de: "Wasserstoff ist das erste Element im Periodensystem mit dem Symbol H."
        }
    },
    {
        question: {
            en: "What is the largest ocean?",
            de: "Welcher Ozean ist der größte?"
        },
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        answer: btoa("Pacific"),
        explanation: {
            en: "The Pacific Ocean is the largest, covering more area than all landmasses combined.",
            de: "Der Pazifische Ozean ist der größte und bedeckt mehr Fläche als alle Landmassen zusammen."
        }
    },
    {
        question: {
            en: "Who wrote 'Romeo and Juliet'?",
            de: "Wer schrieb 'Romeo und Julia'?"
        },
        options: ["Shakespeare", "Dickens", "Austen", "Hemingway"],
        answer: btoa("Shakespeare"),
        explanation: {
            en: "William Shakespeare wrote the famous tragedy 'Romeo and Juliet'.",
            de: "William Shakespeare schrieb die berühmte Tragödie 'Romeo und Julia'."
        }
    },
    {
        question: {
            en: "What gas do plants primarily use?",
            de: "Welches Gas nutzen Pflanzen hauptsächlich?"
        },
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"],
        answer: btoa("Carbon Dioxide"),
        explanation: {
            en: "Plants use carbon dioxide during photosynthesis to produce energy.",
            de: "Pflanzen nutzen Kohlendioxid während der Photosynthese, um Energie zu erzeugen."
        }
    },
    {
        question: {
            en: "Which animal is known as man’s best friend?",
            de: "Welches Tier ist als bester Freund des Menschen bekannt?"
        },
        options: ["Cat", "Dog", "Horse", "Bird"],
        answer: btoa("Dog"),
        explanation: {
            en: "Dogs are often called man’s best friend due to their loyalty and companionship.",
            de: "Hunde werden oft als bester Freund des Menschen bezeichnet wegen ihrer Loyalität und Gesellschaft."
        }
    },
    {
        question: {
            en: "What is the boiling point of water in Celsius?",
            de: "Was ist der Siedepunkt von Wasser in Celsius?"
        },
        options: ["50", "75", "100", "125"],
        answer: btoa("100"),
        explanation: {
            en: "Water boils at 100°C under standard atmospheric pressure.",
            de: "Wasser kocht bei 100°C unter normalem atmosphärischem Druck."
        }
    },
    {
        question: {
            en: "Which color is not in a rainbow?",
            de: "Welche Farbe ist nicht in einem Regenbogen?"
        },
        options: ["Red", "Blue", "Pink", "Yellow"],
        answer: btoa("Pink"),
        explanation: {
            en: "A rainbow consists of seven colors (ROYGBIV), and pink is not one of them.",
            de: "Ein Regenbogen besteht aus sieben Farben (ROYGBIV), und Pink ist keine davon."
        }
    }
];