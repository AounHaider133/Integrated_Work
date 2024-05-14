class Question {
    constructor(questionText, correctAnswer) {
        this.questionText = questionText;
        this.correctAnswer = correctAnswer; // Initialize correct answer as empty string
    }

    checkAnswer(userAnswer) {
        console.log(this.correctAnswer);
        return userAnswer.trim().toLowerCase() === this.correctAnswer.trim().toLowerCase(); // Method to check user's answer
    }
}

let questions = [
       new Question("Fill in the blank: JavaScript is a ____-side scripting language.", "client"),  
       new Question("The ________ method of JavaScript is used to parse a string and return a floating point number.", "parseFloat"),
       new Question("CSS stands for ________ Style Sheets.", "Cascading"),
       new Question("In HTML, the <____> tag is used to define a hyperlink.", "a"),
       new Question("The ________ property in CSS is used to specify the type of cursor to be displayed.", "cursor")
    ];
