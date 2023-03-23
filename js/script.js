const guessedLettersAppear = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputBox = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word ="magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

 const getWord = async function () {
     const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
     const words = await response.text();
     const wordArray = words.split("\n");
     const randomIndex = Math.floor(Math.random() * wordArray.length);
     word = wordArray[randomIndex].trim();
    //console.log(wordArray);
    blackSpot(word);
 };

 getWord();

// show symbol for chosen word's letters
const blackSpot = function (word) {
    const hiddenLetters = [];
    for (const letter of word) {
        //console.log(letter);
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
        showGuessCount (guess);
        currentGuesses();
        updateWordProgress(guessedLetters);
    }
};

const currentGuesses = function () {
    guessedLettersAppear.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersAppear.append(li);
    }
};

const updateWordProgress = function (guessedLetters) {
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
    youWin();
};

const showGuessCount = function (guess) {
    const makeUpper = word.toUpperCase();
    if (!makeUpper.includes(guess)) {
        message.innerText = `Sorry, the word does not have ${guess} in it.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = ` ${guess} is the correct guess.`
    }

    if (remainingGuesses === 0) {
        message.innerHTML = "You have run out of guesses. Game over."
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

const youWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats</p>`;
    }
};