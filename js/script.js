const guessedLettersAppear = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputBox = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word ="magnolia";
const guessedLetters = [];

const blackSpot = function (word) {
    const hiddenLetters = [];
    for (const letter of word) {
        console.log(letter);
        hiddenLetters.push("●");
    }
    wordInProgress.innerText = hiddenLetters.join("");
};

blackSpot(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";
    const guess = inputBox.value;
    const goodGuess = letterValidator(guess);
    if (goodGuess) {
        makeGuess(guess);
    }
    inputBox.value = "";
});

const letterValidator = function (input) {
    const acceptedLetter = /[a=zA-Z]/;
    if (input.length ===0) {
        //is the input empty?
        message.innerText = "please enter a letter.";
    } else if (input.length > 1) {
        //is the input more than one letter?
        message.innerText = "please enter only one letter.";
    } else if (!input.match(acceptedLetter)) {
        //did they type something other than a letter?
        message.innerText = "Only use letters not munbers or special characters."; 
    }   else {
        //recieved a valid answer.
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter. Guess another.";
    } else {
       guessedLetters.push(guess);
       console.log(guessedLetters);
    }
};