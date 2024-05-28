// Sentences for different levels
// Sentences for Basic Level
const basicSentences = [
  "The quick brown fox jumps over the lazy dog.",
  "A stitch in time saves nine.",
  "Actions speak louder than words.",
  "Practice makes perfect.",
  "An apple a day keeps the doctor away.",
];

// Sentences for Intermediate Level
const intermediateSentences = [
  "Success is the result of preparation, hard work, and learning from failure.",
  "Believe you can and you're halfway there.",
  "Happiness is not something ready-made. It comes from your own actions.",
  "The only way to do great work is to love what you do.",
  "In the middle of difficulty lies opportunity.",
];

// Sentences for Advanced Level
const advancedSentences = [
  "The greatest glory in living lies not in never falling, but in rising every time we fall.",
  "Life is what happens when you're busy making other plans.",
  "You can't blame gravity for falling in love.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "The only limit to our realization of tomorrow will be our doubts of today.",
];

// Global variable for sentences
let sentences = basicSentences;
let currentSentence = "";

// Adding click event listeners to level buttons
document.querySelectorAll(".lvl-btn").forEach((button, index) => {
  button.addEventListener("click", function () {
    // Remove 'clicked' class from all buttons
    document
      .querySelectorAll(".lvl-btn")
      .forEach((btn) => btn.classList.remove("clicked"));

    // Add 'clicked' class to the clicked button
    this.classList.add("clicked");
  });

  // Set 'Basic' as clicked by default when the page loads
  if (index === 0) {
    button.classList.add("clicked");
  }
});

// Selecting DOM elements using querySelector
const inpField = document.querySelector(".wrapper .input-field"); // Input field for user typing
const typingText = document.querySelector(".typing-text p"); // Paragraph element for displaying typing text
const tryAgainBtn = document.querySelector(".content button"); // "Try Again" button
const timeTag = document.querySelector(".time span b"); // Element for displaying time
const mistakeTag = document.querySelector(".mistake span"); // Element for displaying mistakes count
const wpmTag = document.querySelector(".wpm span"); // Element for displaying words per minute (WPM)
const cpmTag = document.querySelector(".cpm span"); // Element for displaying characters per minute (CPM)

// Variables for timer and game settings
let timer; // Variable to hold the timer reference
let maxTime = 60; // Maximum time allowed for typing in seconds
let timeLeft = maxTime; // Time left for typing initially set to maxTime
let charIndex = (mistakes = isTyping = 0); // Variables for tracking typing progress and mistakes, and a flag for typing status

function startGame(level) {
  // Set the sentences array based on level
  switch (level) {
    case "basic":
      sentences = basicSentences;
      break;
    case "intermediate":
      sentences = intermediateSentences;
      break;
    case "advanced":
      sentences = advancedSentences;
      break;
    default:
      break;
  }
  resetGame(sentences);
}

// Function to load a paragraph for typing exercise
function loadParagraph(sentences = []) {
  // Select a random index from the paragraphs array
  const ranIndex = Math.floor(Math.random() * sentences.length);

  // Clear any existing text in the typingText element
  typingText.innerHTML = "";

  // Split the selected paragraph into individual characters and loop through each character
  sentences[ranIndex].split("").forEach((char) => {
    // Log each character to the console (optional)
    console.log(char);

    // Create a span element for each character and add it to the typingText element for styling and animation
    let span = `<span>${char}</span>`;
    typingText.innerHTML += span;
  });

  // Add the 'active' class to the first span element within typingText (for styling purposes)
  typingText.querySelectorAll("span")[0].classList.add("active");

  // Focus the input field when a key is pressed anywhere on the document
  document.addEventListener("keydown", () => inpField.focus());

  // Focus the input field when the typingText element is clicked
  typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
  let characters = typingText.querySelectorAll("span");
  let typedChar = inpField.value.split("")[charIndex];

  // Check if user has reached the end of the paragraph
  if (charIndex >= characters.length || timeLeft <= 0) {
    clearInterval(timer);
    isTyping = false;
    inpField.value = "";
    return; // Exit the function as typing is completed
  }

  if (!isTyping) {
    timer = setInterval(initTimer, 1000);
    isTyping = true;
  }

  if (typedChar == null) {
    if (charIndex > 0) {
      charIndex--;
      if (characters[charIndex].classList.contains("incorrect")) {
        mistakes--;
      }
      characters[charIndex].classList.remove("correct", "incorrect");
    }
  } else {
    if (characters[charIndex].innerText == typedChar) {
      characters[charIndex].classList.add("correct");
    } else {
      mistakes++;
      characters[charIndex].classList.add("incorrect");
    }
    charIndex++;
  }

  characters.forEach((span) => span.classList.remove("active"));
  characters[charIndex].classList.add("active");

  let wpm = Math.round(
    ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
  );
  wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

  wpmTag.innerText = wpm;
  mistakeTag.innerText = mistakes;
  cpmTag.innerText = charIndex - mistakes;
}

// Function to initialize and update a timer
function initTimer() {
  // Check if there is time left
  if (timeLeft > 0) {
    // Decrease timeLeft by 1
    timeLeft--;

    // Update the displayed time
    timeTag.innerText = timeLeft;

    // Calculate words per minute (WPM) based on typing progress
    let wpm = Math.round(
      ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
    ); // Adjusted WPM with error penalty

    // Update the displayed WPM
    wpmTag.innerText = wpm;
  } else {
    // If time is up, stop the timer
    clearInterval(timer);
  }
}

// Function to reset the typing game
function resetGame(sentences = []) {
  // Load a new paragraph for typing
  loadParagraph(sentences);

  // Stop the timer (if running)
  clearInterval(timer);

  // Reset variables related to typing progress and timer
  timeLeft = maxTime; // Reset time left to the maximum time allowed
  charIndex = mistakes = isTyping = 0; // Reset variables tracking typing progress and mistakes
  inpField.value = ""; // Clear the input field where the user types

  // Update displayed information to reflect the reset
  timeTag.innerText = timeLeft; // Update displayed time left
  wpmTag.innerText = 0; // Reset displayed WPM to 0
  mistakeTag.innerText = 0; // Reset displayed mistakes count to 0
  cpmTag.innerText = 0; // Reset displayed characters per minute (CPM) to 0
}

// Flow of Events

// Add an event listener to the input field for typing detection
inpField.addEventListener("input", initTyping);

// Add an event listener to the "Try Again" button to reset the game
tryAgainBtn.addEventListener("click", () => resetGame(sentences));

// Start the game at basic level
startGame("basic");
