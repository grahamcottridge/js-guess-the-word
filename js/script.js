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

// Add placeholders for each letter of word to guess
const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

// validate player input as a letter
const validatePlayerInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    message.innerText = "Please enter a letter!";
  } else if (input.length > 1) {
    message.innerText = "Please only enter one letter at a time!";
  } else if (!input.match(acceptedLetter)) {
    message.innerText = "That's not a letter between A to Z!";
  } else {
    return input;
  }
};

// capture player input
const makeGuess = function (letter) {
  // convert input to uppercase
  const guess = letter.toUpperCase();
  // check letter not already guessed / else push to array
  if (guessedLetters.includes(guess)) {
    message.innerText = "You've already guessed that letter - try again!";
  } else {
    guessedLetters.push(guess);
    console.log(guessedLetters);
    // call function
    updateLetters();
    // call function to update with guessed letters
  }
  updateWordInProgress(guessedLetters);
};

// update page with player's guessed letters
const updateLetters = function () {
  guessedLetterList.innerText = "";
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLetterList.append(li);
  }
};

// update word with player guesses
const updateWordInProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  // new array to display updated word
  const revealWord = [];
  // check if wordArray contains any letters from guessedLetters array
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push("●");
    }
  }
  // console.log(revealWord);
  // display wordInProgress
  wordInProgress.innerText = revealWord.join("");
  // run function
  playerWins()
};

// check if player has won
const playerWins = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
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
