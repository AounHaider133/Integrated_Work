class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.questionIndex = 0;
        this.correctAnswers = 0;
    }

    callQuestion() {
        return this.questions[this.questionIndex];
    }

    checkAnswer(userAnswer) {
        const currentQuestion = this.questions[this.questionIndex];
        if (currentQuestion.checkAnswer(userAnswer)) { // Check user's answer using Question class method
            this.correctAnswers++;
        }
        console.log(this.correctAnswers);
    }
}
function getUserInput() {
    let ans = document.getElementById('answerInput').value.trim();
    return ans;
}
