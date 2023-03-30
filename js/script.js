const guessedLettersAppear = document.querySelector(".guessed-letters"); //guessedLettersElement
const guessButton = document.querySelector(".guess"); //guessLetterButton
const inputBox = document.querySelector(".letter"); //letterInput
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word ="magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

 const getWord = async function () {
     const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
     const words = await response.text();
     const wordArray = words.split("\n");
     const randomIndex = Math.floor(Math.random() * wordArray.length);
     word = wordArray[randomIndex].trim();
    //console.log(wordArray);
    blackSpot(word); //placeholder
 };

 getWord();

// show symbol for chosen word's letters
const blackSpot = function (word) { //placeholder
    const hiddenLetters = []; //placeholderLetters
    for (const letter of word) {
        //console.log(letter);
        hiddenLetters.push("●"); //placeholderLetters
    }
    wordInProgress.innerText = hiddenLetters.join(""); //placeholderLetters
};

//blackSpot(word); //placeholder***********

guessButton.addEventListener("click", function (e) { //guessLetterButton
    e.preventDefault();
    message.innerText = "";
    const guess = inputBox.value; //letterInput
    const goodGuess = letterValidator(guess); //validateInput

    if (goodGuess) {
        makeGuess(guess);
    }
    inputBox.value = ""; //letterInput
});

const letterValidator = function (input) { //validateInput
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
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
        showGuessCount (guess); //updateGuessesRemaining
        currentGuesses(); //showGuessedLetters
        updateWordProgress(guessedLetters); //updateWordInProgress
    }
};

const currentGuesses = function () { //showGuessedLetters
    guessedLettersAppear.innerHTML = ""; //guessedLettersElement
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersAppear.append(li); //guessedLettersElement
    }
};

const updateWordProgress = function (guessedLetters) { //updateWordInProgress
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    //console.log(wordArray);
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
    youWin(); //checkIfWin
};

const showGuessCount = function (guess) { //updateGuessesRemaining
    const makeUpper = word.toUpperCase(); //upperWord
    if (!makeUpper.includes(guess)) { //upperWord
        message.innerText = `Sorry, the word does not have ${guess} in it.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = ` ${guess} is the correct guess.`
    }

    if (remainingGuesses === 0) {
        message.innerHTML = "You have run out of guesses. Game over."
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

const youWin = function () { //checkIfWin
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats</p>`;

        startOver();
    }
};

const startOver = function ()  {
    guessButton.classList.add("hide"); //guessLetterButton
    remainingGuessesElement.classList.add("hide");
    guessedLettersAppear.classList.add("hide"); //guessedLettersElement
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
    message.classList.remove("win");
    remainingGuesses = 8;
    guessedLetters = [];
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`; 
    guessedLettersAppear.innerHTML = ""; //guessedLettersElement
    message.innerText = "";

    getWord();

    guessButton.classList.remove("hide"); //guessLetterButton
    remainingGuessesElement.classList.remove("hide");
    guessedLettersAppear.classList.remove("hide"); //guessedLettersElement
    playAgainButton.classList.add("hide");
});
