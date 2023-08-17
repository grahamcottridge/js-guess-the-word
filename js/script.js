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
let word = "Magnolia";
// array of guessed letters inputed
const guessedLetters = [];
// number of guesses
let remainingGuesses = 8;

// Fetch words
const getWord = async function () {
  const res = await fetch(
    "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
  );
  const words = await res.text();
  const wordArray = words.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  placeholder(word);
};

// Start game
getWord();

// Add placeholders for each letter of word to guess
const placeholder = function (randomWord) {
  const placeholderLetters = [];
  for (const letter of word) {
    placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

// Validate player input as a letter
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

// Capture player input
const makeGuess = function (letter) {
  // convert input to uppercase
  const guess = letter.toUpperCase();
  // check letter not already guessed / else push to array
  if (guessedLetters.includes(guess)) {
    message.innerText = "You've already guessed that letter - try again!";
  } else {
    guessedLetters.push(guess);
    // call function
    updateLetters();
    // call function to update passing guessed letter
    guessCount(guess);
  }
  updateWordInProgress(guessedLetters);
};

// Update page with player's guessed letters
const updateLetters = function () {
  guessedLetterList.innerText = "";
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLetterList.append(li);
  }
};

// Update word with player guesses
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
  // display wordInProgress
  wordInProgress.innerText = revealWord.join("");
  // run function
  playerWins();
};

// Count guesses remaining
const guessCount = function (guess) {
  const upperWord = word.toUpperCase();
  // check guess is in word and count guesses
  if (!upperWord.includes(guess)) {
    message.innerText = "That letter is not in the word - try again!";
    remainingGuesses -= 1;
  } else {
    message.innerText = `Good guess! The word has the letter ${guess}.`;
  }
  // messages for number of guesses left
  if (remainingGuesses === 0) {
    message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
  } else if (remainingGuesses === 1) {
    remainingNum.innerText = `${remainingGuesses} guess`;
  } else {
    remainingNum.innerText = `${remainingGuesses} guesses `;
  }
};

// Check if player has won
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
