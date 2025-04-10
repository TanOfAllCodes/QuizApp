const quizData = [
    {
        question: {
            en: "What is the capital of France?",
            de: "Was ist die Hauptstadt von Frankreich?"
        },
        options: [
            { en: "Paris", de: "Paris" },
            { en: "London", de: "London" },
            { en: "Berlin", de: "Berlin" },
            { en: "Madrid", de: "Madrid" }
        ],
        answer: btoa("Paris"),
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
        options: [
            { en: "Mars", de: "Mars" },
            { en: "Jupiter", de: "Jupiter" },
            { en: "Venus", de: "Venus" },
            { en: "Saturn", de: "Saturn" }
        ],
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
        options: [
            { en: "3", de: "3" },
            { en: "4", de: "4" },
            { en: "5", de: "5" },
            { en: "6", de: "6" }
        ],
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
        options: [
            { en: "Helium", de: "Helium" },
            { en: "Hydrogen", de: "Wasserstoff" },
            { en: "Hafnium", de: "Hafnium" },
            { en: "Hassium", de: "Hassium" }
        ],
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
        options: [
            { en: "Atlantic", de: "Atlantik Ozean" },
            { en: "Indian", de: "Indischer Ozean" },
            { en: "Arctic", de: "Arktischer Ozean" },
            { en: "Pacific", de: "Pazifik Ozean" }
        ],
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
        options: [
            { en: "William Shakespeare", de: "William Shakespeare" },
            { en: "Charles Dickens", de: "Charles Dickens" },
            { en: "Jane Austen", de: "Jane Austen" },
            { en: "Ernst Hemingway", de: "Ernst Hemingway" }
        ],
        answer: btoa("William Shakespeare"),
        explanation: {
            en: "William Shakespeare wrote the famous tragedy 'Romeo and Juliet'.",
            de: "William Shakespeare schrieb die berühmte Tragödie 'Romeo und Julia'."
        }
    },
    {
        question: {
            en: "What gas do plants primarily use for photosynthesis?",
            de: "Welches Gas verwenden Pflanzen hauptsächlich für die Photosynthese?"
        },
        options: [
            { en: "Oxygen", de: "Sauerstoff" },
            { en: "Carbon Dioxide", de: "Kohlendioxid" },
            { en: "Nitrogen", de: "Stickstoff" },
            { en: "Helium", de: "Helium" }
        ],
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
        options: [
            { en: "Cat", de: "Katze" },
            { en: "Dog", de: "Hund" },
            { en: "Horse", de: "Pferd" },
            { en: "Bird", de: "Vogel" }
        ],
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
        options: [
            { en: "50°C ", de: "50°C " },
            { en: "75°C ", de: "75°C " },
            { en: "100°C ", de: "100°C " },
            { en: "125°C ", de: "125°C " }
        ],
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
        options: [
            { en: "Red", de: "Rot" },
            { en: "Blue", de: "Blau" },
            { en: "Pink", de: "Pink" },
            { en: "Yellow", de: "Gelb" }
        ],
        answer: btoa("Pink"),
        explanation: {
            en: "A rainbow consists of seven colors (ROYGBIV), and pink is not one of them.",
            de: "Ein Regenbogen besteht aus sieben Farben (ROYGBIV), und Pink ist keine davon."
        }
    }
];