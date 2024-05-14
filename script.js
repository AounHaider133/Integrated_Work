
const quiz = new Quiz(questions);
let counter;
let counterLine;

const quizBox = document.querySelector('.quiz-box');
const questionText = document.querySelector('.question-text');
const nextButton = document.querySelector('.next');
const answerInput = document.getElementById('answerInput'); // Get input box element
let currentQuestionIndex = 0;
let userAnswer;
let currentQuestion;
// Start Button event
document.querySelector(".btn-start").addEventListener("click", () => {
    quizBox.classList.add("active");
    showQuestion(quiz.callQuestion());
    showNumber(quiz.questionIndex + 1, quiz.questions.length);
    startTimer(10);
    startLine();
    document.querySelector(".start-menu").remove();
});

// Next Button event
document.querySelector(".next").addEventListener("click", () => {
    userAnswer = answerInput.value.trim();
    if (quiz.checkAnswer(userAnswer)) {
        console.log(userAnswer);
        correctAnswers++;
    }
    answerInput.value = "";
    if (quiz.questions.length > quiz.questionIndex + 1) {
        quizBox.classList.add("active");

        clearInterval(counter);
        startTimer(10);
        clearInterval(counterLine);
        startLine();
        
        quiz.questionIndex++;
        showQuestion(quiz.callQuestion());
        showNumber(quiz.questionIndex + 1, quiz.questions.length);
    } else {
        console.log("The End");
        clearInterval(counter);
        clearInterval(counterLine);
        quizBox.classList.remove("active");
        document.querySelector(".score-box").classList.add("active");
        showScore(quiz.correctAnswers, quiz.questions.length);
                
    }

    // Move to the next question or show score
// currentQuestionIndex++;
// if (currentQuestionIndex < questions.length) {
//     showQuestion(new Question("Welcome","hello"));
// } else {
//     // Show score box
//     quizBox.classList.remove('active');
//     scoreBox.classList.add('active');
//     showScore(2,5);
// }

   
});

// try again Button event
document.querySelector(".tryagain-btn").addEventListener("click", () => {
    document.querySelector(".quiz-box").classList.add("active");
    showQuestion(quiz.callQuestion());
    showNumber(quiz.questionIndex + 1, quiz.questions.length);
    startTimer(10);
    startLine();
    quiz.questionIndex = 0;
    quiz.correctAnswers = 0;
    //document.querySelector(".btn-start").click();
    document.querySelector(".score-box").classList.remove("active");
});

// Quit Button event
document.querySelector(".quit-btn").addEventListener("click", () => {
    window.location.reload();
});



// Function for Show Questions 
function showQuestion(question) {
    let question_text = `<span> ${question.questionText} </span> `;
    document.querySelector(".question-text").innerHTML = question_text;
}





// Function for Show Number of Questions
function showNumber(questionNumber, allQuestions) {
    let tag = `<span>${questionNumber} / ${allQuestions}</span>`;
    document.querySelector(".badge").innerHTML = tag;
}

// Function for Show Score
function showScore(correctAnswers, allQuestions) {
    let tag = `You have ${correctAnswers} correct answers out of ${allQuestions}`;
    document.querySelector(".score-text").innerHTML = tag;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -1;
    let progressEndValue = (correctAnswers/allQuestions) * 100;
    let speed = 20;

    let progress = setInterval(() => {
        progressStartValue++;

        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#102C57 ${progressStartValue * 3.6}deg, rgba(255, 255, 255, 0.1) 0deg)`;

        if(progressStartValue == progressEndValue)
            {
                clearInterval(progress);
            }
    }, speed);
}

// Timer 


function startTimer(time) {
    counter = setInterval(timer, 1000);

    function timer() {
        document.querySelector(".second").textContent = time;
        time--;

        if (time < 0) {
            clearInterval(counter);

            document.querySelector(".time-text").textContent = "Time Over";

            let answer = quiz.callQuestion().correctAnswer;

            for (let option of option_list.children) {
                if (option.querySelector("span b").textContent == answer) {
                    option.classList.add("correct");
                    option.insertAdjacentHTML("beforeend", correctIcon);
                }
                option.classList.add("disabled");
            }
        }
    }

}

// Time Line


function startLine() {
    counterLine = setInterval(timer, 20);
    let lineWidth = 0;

    function timer() {
        document.querySelector(".time-line").style.width = lineWidth + "%";
        lineWidth += 0.181;

        if (lineWidth > 100.1) {
            clearInterval(counterLine);
        }
    }
}
