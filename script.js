const questions = [
    {
        question:"HTML stands for -",
        answers: [
            { text: "HighText Machine Language", correct: false},
            { text: "HyperText and links Markup Language", correct: false},
            { text: "HyperText Markup Language", correct: true},
            { text: "None of these", correct: false},
        ]
    },
    {
        question:"The correct sequence of HTML tags for starting a webpage is -",
        answers: [
            { text: "Head, Title, HTML, body", correct: false},
            { text: "HTML, Body, Title, Head", correct: false},
            { text: "HTML, Head, Body, Title", correct: false},
            { text: "HTML, Head, Title, Body", correct: true},
        ]
    },
    {
        question:"The hr tag in HTML is used for -",
        answers: [
            { text: "new line", correct: false},
            { text: "vertical ruler", correct: false},
            { text: "new paragraph", correct: false},
            { text: "horizontal ruler", correct: true},
        ]
    },
    {
        question:"Which of the following attribute is used to provide a unique name to an element?",
        answers: [
            { text: "class", correct: false},
            { text: "id", correct: true},
            { text: "type", correct: false},
            { text: "None of the above", correct: false},
        ]
    },
    {
        question:"What are the types of unordered or bulleted list in HTML?",
        answers: [
            { text: "disc, square, triangle", correct: false},
            { text: "polygon, triangle, circle", correct: false},
            { text: "disc, circle, square", correct: true},
            { text: "All of the above", correct: false},
        ]
    },
    {
        question:"Which of the following HTML attribute is used to define inline styles?",
        answers: [
            { text: "style", correct: true},
            { text: "type", correct: false},
            { text: "class", correct: false},
            { text: "None of the above", correct: false},
        ]
    },
    {
        question:"An HTML program is saved by using the ____ extension.",
        answers: [
            { text: ".ht", correct: false},
            { text: ".html", correct: true},
            { text: ".hml", correct: false},
            { text: "None of the above", correct: false},
        ]
    },
    {
        question:"A program in HTML can be rendered and read by -",
        answers: [
            { text: "Web Browser", correct: true},
            { text: "Server", correct: false},
            { text: "Interpreter", correct: false},
            { text: "None of the above", correct: false},
        ]
    },
    {
        question:"The tags in HTML are -",
        answers: [
            { text: "case sensitive", correct: false},
            { text: "in upper cass", correct: false},
            { text: "not case sensitive", correct: true},
            { text: "in lowercase", correct: false},
        ]
    },
    {
        question:"Which of the following are the attributes of the tag?",
        answers: [
            { text: "method", correct: false},
            { text: "action", correct: false},
            { text: "Both (a) & (b)", correct: true},
            { text: "None of the above", correct: false},
        ]
    },
];

const questionElement  = document.getElementById("question");
const answerButtons  = document.getElementById("answer-buttons");
const nextButton  = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});
startQuiz();