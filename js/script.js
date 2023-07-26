// unorderd list of player's quessed letters
const guessedLetters = document.querySelector(".guessed-letters");
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
const word = "ti";

// function to add placeholders to each letter
const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    // console.log(letter);
    placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

const validatePlayerInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input === "") {
    return "Please enter a letter!";
  } else if (input.length > 1) {
    return "Please only enter one letter at a time!";
  } else if (!input.match(acceptedLetter)) {
    return "That's not a letter between A to Z!";
  } else {
    return input;
  }
};
// console.log(checkPlayerInput("t"));

button.addEventListener("click", function (e) {
  e.preventDefault();
  const input = playerInput.value;
  // console.log(input)
  playerInput.value = "";
});
