class Question {
    constructor(questionText, answers, correctAnswer) {
        this.questionText = questionText;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }

    checkAnswer(answer){
        return answer === this.correctAnswer;
    }
}

let questions = [
    new Question("What is a program in computer science?", {
        a: "a planned series of events, a schedule",
        b: "a translated language that is easy for the computer to understand",
        c: "a general process for solving a category of problems",
		d: "a sequence of instructions that specifies how to perform a computation"
    }, "d"),
    new Question("What is the function of the compiler?", {
        a: "It reads a high-level program and translates everything at once, before executing any of the commands.",
        b: "It loads the program from its saved location and makes the computer execute it.",
        c: "It translates the program line-by-line, alternately reading lines and carrying out commands.",
		d: "It translates the program from the low-level language you coded in to a high-level language that the computer can understand."
    }, "a"),
    new Question("Which of the following is not component of computer system?", {
        a: "Input Device",
        b: "Stepper Motor",
        c: "Memory ",
		d: "None of the above"
    }, "b"),
    new Question("Which of the following is the Valid Measurement unit of memory?", {
        a: "GB",
        b: "MB",
        c: "KB",
		d: "All"
    }, "d"),
    new Question("Which the following is application software?", {
        a: "Compiler",
        b: "Power Point",
        c: "Debugger",
		d: "None of the Above"
    }, "b")
];