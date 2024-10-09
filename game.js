const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = 
[
    {
        question: "Koji je glavni grad Njemačke?",
        choice1: "Beč",
        choice2: "Berlin",
        choice3: "Budimpešta",
        choice4: "Helsinki",
        answer: 2
    },
    {
        question: "Koji je glavni grad Albanije?",
        choice1: "Beč",
        choice2: "Berlin",
        choice3: "Tirana",
        choice4: "Helsinki",
        answer: 3
    },
    {
        question: "Koji je glavni grad Bjelorusije?",
        choice1: "Minsk",
        choice2: "Berlin",
        choice3: "Budimpešta",
        choice4: "Helsinki",
        answer: 1
    },
    {
        question: "Koji je glavni grad Bugarske?",
        choice1: "Beč",
        choice2: "Sofija",
        choice3: "Budimpešta",
        choice4: "Helsinki",
        answer: 2
    },
    {
        question: "Koji je glavni grad Estonije?",
        choice1: "Beč",
        choice2: "Berlin",
        choice3: "Budimpešta",
        choice4: "Talin",
        answer: 4
    },
    {
        question: "Koji je glavni grad Finske?",
        choice1: "Beč",
        choice2: "Berlin",
        choice3: "Budimpešta",
        choice4: "Helsinki",
        answer: 4
    },
    {
        question: "Koji je glavni grad Italije?",
        choice1: "Beč",
        choice2: "Rim",
        choice3: "Budimpešta",
        choice4: "Helsinki",
        answer: 2
    },
    {
        question: "Koji je glavni grad Norveške?",
        choice1: "Beč",
        choice2: "Berlin",
        choice3: "Oslo",
        choice4: "Helsinki",
        answer: 3
    }
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;


startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () =>
{
    if (availableQuestions.length===0 || questionCounter >= MAX_QUESTIONS)
    {
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("end.html");
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

    //update progress bar

    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice =>
        {
            const number = choice.dataset["number"];
            choice.innerText = currentQuestion["choice" + number];
        });
        availableQuestions.splice(questionIndex,1);
        acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click" , e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply =
        selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if(classToApply=== 'correct')
        {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();