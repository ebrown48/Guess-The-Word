const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputBox = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word ="magnolia";

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
    const guess = inputBox.value;
    console.log(guess);
    inputBox.value = "";
});
