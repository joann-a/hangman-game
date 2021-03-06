const downArrow = document.querySelector(".down-arrow");
const hangmanWordDiv = document.querySelector(".hangman-word");
const lettersGuessedDiv = document.querySelector(".letters-guessed");
const lettersToChooseDiv = document.querySelector(".letters-choose");

const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const lettersGuessed = [];

setInterval(() => changeArrowColour(), 1000);

// Event handlers
document.addEventListener("DOMContentLoaded", generateWord);
document.addEventListener("DOMContentLoaded", generateLetters);

function changeArrowColour() {
  if (downArrow.style.color === "rgb(235, 42, 128)") {
    downArrow.style.color = "#e27ba9";
  } else {
    downArrow.style.color = "#eb2a80";
  }
}

function getWord() {
  return fetch("https://random-words-api.vercel.app/word")
    .then((res) => res.json())
    .then((data) => console.log(data[0].word));
}

async function generateWord() {
  // get random word
  let word = await fetch("https://random-words-api.vercel.app/word")
    .then((res) => res.json())
    .then((data) => data[0].word);
  word = word.toLowerCase();
  // console.log(word);

  // split word into each letter and create span for each letter
  let letters = word.split("");
  //   console.log(letters);
  letters.forEach((letter) => {
    let letterSpan = document.createElement("span");
    letterSpan.classList.add("hangman-letter");
    letterSpan.innerText = letter;
    hangmanWordDiv.appendChild(letterSpan);
  });
}

function generateLetters() {
  alphabet.forEach((letter) => {
    let letterButton = document.createElement("button");
    letterButton.classList.add("letter-button");
    letterButton.innerText = letter;
    lettersToChooseDiv.appendChild(letterButton);
    letterButton.addEventListener("click", checkLetter);
  });
}

// Check to see if the letter is in the word
function checkLetter(e) {
  let letterButton = e.target;
  alphabet.forEach((letter, index) => {
    if (letter === e.target.innerText) {
      lettersGuessedDiv.appendChild(letterButton);
    }
  });

  const hangmanLetters = hangmanWordDiv.childNodes;
  //   console.log("hangmanletters " + hangmanLetters);
  hangmanLetters.forEach((letterSpan) => {
    // console.log(letterButton.innerText);
    if (letterButton.innerText === letterSpan.innerText) {
      letterSpan.classList.add("correct");
      letterButton.remove();
    } else {
      console.log("incorrect");
      console.log(letterButton);
      letterButton.classList.add("incorrect");
    }
    checkSavedHangman(hangmanLetters);
    // console.log(letterSpan.innerText);
  });
}

// check if whole word has been guessed correctly
function checkSavedHangman(hangmanLetters) {
  let correctLetters = 0;
  hangmanLetters.forEach((letter) => {
    if (letter.classList.contains("correct")) {
      correctLetters += 1;
    }
  });

  if (correctLetters === hangmanLetters.length) {
    alert("congrats you saved the hangman!");
  }
}
