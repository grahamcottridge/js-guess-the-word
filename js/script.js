// unorderd list of player's quessed letters
const guessedLetterList = document.querySelector(".guessed-letters");
// guess button
const button = document.querySelector("button");
// text input from player
const playerInput = document.querySelector("input");
// display of word in progress
const wordInProgress = document.querySelector(".word-in-progress");
// display remaining guesses
const remainingText = document.querySelector(".remaining");
// number of guesses span
const remainingNum = document.querySelector(".remaining span");
// message to display result of player guess
const message = document.querySelector(".message");
// play again button
const playAgain = document.querySelector(".play-again");

// starting word
const word = "Magnolia";
// array of guessed letters inputed
const guessedLetters = [];

// function to add placeholders for each letter
const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

// validate player input
const validatePlayerInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input === "") {
    message.innerText = "Please enter a letter!";
  } else if (input.length > 1) {
    message.innerText = "Please only enter one letter at a time!";
  } else if (!input.match(acceptedLetter)) {
    message.innerText = "That's not a letter between A to Z!";
  } else {
    return input;
  }
};

const makeGuess = function (letter) {
  // convert input to uppercase
  const guess = letter.toUpperCase();
  // check letter not already guessed / else push to array
  if (guessedLetters.includes(guess)) {
    message.innerText = "You've already guessed that letter - try again!";
  } else {
    guessedLetters.push(guess);
    console.log(guessedLetters);
  }
};

// Button event handler
button.addEventListener("click", function (e) {
  e.preventDefault();
  // clear message
  message.innerText = "";
  // assign input value
  const input = playerInput.value;
  // run validation function and assign to variable
  const guess = validatePlayerInput(input);
  // if validated run makeGuess function
  if (guess) {
    makeGuess(guess);
  }
  // clear input field
  playerInput.value = "";
});
