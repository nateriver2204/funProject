// Challenge 1: Age in Days
function ageInDays() {
  var birthYear = prompt("What year were you born?");
  var ageInDayss = (2021 - birthYear) * 365;
  var h2 = document.createElement("h2");
  var textAnswer = document.createTextNode(
    "You are " + ageInDayss + " days old."
  );
  h2.setAttribute("id", "ageInDays");
  h2.appendChild(textAnswer);
  document.getElementById("result1").appendChild(h2);
}

function reset() {
  if (document.getElementById("ageInDays")) {
    document.getElementById("ageInDays").remove();
  } else return;
}

//Challenge 2: Cat Generator
function generateCat() {
  var image = document.createElement("img");
  var result = document.getElementById("result2");
  image.src =
    "https://thecatapi.com/api/images/get?format=src&type=gif&size=small";
  result.appendChild(image);
}

// Challeng 3: Rock, Paper, Scissors
function rpsGame(yourChoice) {
  let humanChoice, botChoice;
  humanChoice = yourChoice.id;

  //random bot choice
  botChoice = numberToChoice(randomRps());

  //win function
  results = decideWinner(humanChoice, botChoice);

  //message print
  message = finalMessage(results);

  //fronEnd
  rpsFrontEnd(humanChoice, botChoice, message);
}

function randomRps() {
  return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
  return ["rock", "paper", "scissors"][number];
}

function decideWinner(yourChoice, computerChoice) {
  var rpsDatabase = {
    rock: { scissors: 1, rock: 0.5, paper: 0 },
    paper: { rock: 1, paper: 0.5, scissors: 0 },
    scissors: { paper: 1, scissors: 0.5, rock: 0 },
  };
  var yourScore = rpsDatabase[yourChoice][computerChoice];
  var computerScore = rpsDatabase[computerChoice][yourChoice];

  return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
  if (yourScore === 0) {
    return { message: "You Lost!", color: "red" };
  } else if (yourScore === 0.5) {
    return { message: "You Tied!", color: "yellow" };
  } else {
    return { message: "You Won!", color: "green" };
  }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
  var imagesDatabase = {
    rock: document.getElementById("rock").src,
    paper: document.getElementById("paper").src,
    scissors: document.getElementById("scissors").src,
  };

  //remove all images
  document.getElementById("rock").remove();
  document.getElementById("paper").remove();
  document.getElementById("scissors").remove();

  //createDiv
  var humanDiv = document.createElement("div");
  var botDiv = document.createElement("div");
  var messageDiv = document.createElement("div");

  humanDiv.innerHTML =
    "<img src='" +
    imagesDatabase[humanImageChoice] +
    "' height=150 width = 150 style='box-shadow: 0px 10px 50px dodgerblue'/>";

  botDiv.innerHTML =
    "<img src='" +
    imagesDatabase[botImageChoice] +
    "' height=150 width = 150 style='box-shadow: 0px 10px 50px red'/>";

  messageDiv.innerHTML =
    "<h3 style='color: " +
    finalMessage["color"] +
    "; font-size: 60px; padding: 30px; '>" +
    finalMessage.message +
    "</h3>";

  document.getElementById("result3").appendChild(humanDiv);
  document.getElementById("result3").appendChild(messageDiv);
  document.getElementById("result3").appendChild(botDiv);
}

//Challenge 4: Change the color of all buttons!
var all_buttons = document.getElementsByTagName("button");
var copyAllButtons = [];
for (const button of all_buttons) {
  copyAllButtons.push(button.classList[1]);
}

function buttonColorChange(color) {
  if (color.value === "red") {
    buttonRed();
  } else if (color.value === "green") {
    buttonGreen();
  } else if (color.value === "reset") {
    resetColor();
  } else if (color.value === "random") {
    randomColor();
  }
}

function buttonRed() {
  for (const button of all_buttons) {
    button.removeAttribute("class");
    button.classList.add("btn", "btn-danger");
  }
}

function buttonGreen() {
  for (const button of all_buttons) {
    button.removeAttribute("class");
    button.classList.add("btn", "btn-success");
  }
}

function resetColor() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(copyAllButtons[i]);
  }
}

function randomColor() {
  let choices = ["btn-primary", "btn-danger", "btn-success", "btn-warning"];
  for (let i = 0; i < all_buttons.length; i++) {
    let rand = Math.floor(Math.random() * 4);
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(choices[rand]);
  }
}

//Challenge 5: Blackjack
let blackjackGame = {
  you: {
    scoreSpan: "#your-blackjack-result",
    div: "#yourbox",
    score: 0,
  },
  dealer: {
    scoreSpan: "#dealer-blackjack-result",
    div: "#dealerbox",
    score: 0,
  },
  cards: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
  cardsMap: {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    J: 10,
    Q: 10,
    K: 10,
    A: [1, 11],
  },
  wins: 0,
  loses: 0,
  draws: 0,
  isStand: false,
  turnsOver: false,
};
const YOU = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];
const hitSound = new Audio("/sounds/swish.m4a");
const winSound = new Audio("/sounds/cash.mp3");
const lostSound = new Audio("/sounds/aww.mp3");

const CARDS = blackjackGame["cards"];

document.querySelector("#bj-hit-btn").addEventListener("click", blackjackHit);
document.querySelector("#bj-deal-btn").addEventListener("click", blackjackDeal);
document.querySelector("#bj-stand-btn").addEventListener("click", dealerLogic);

function blackjackHit() {
  //only work before stand button clicked
  if (blackjackGame["isStand"] === false) {
    //hit random card
    let card = randomCard();
    //show cards
    showCard(card, YOU);
    //set score
    updateScore(card, YOU);
    showScore(YOU);
  }
}
function randomCard() {
  let randomIndex = Math.floor(Math.random() * 13);
  return CARDS[randomIndex];
}
function showCard(card, activePlayer) {
  if (activePlayer["score"] <= 21) {
    let cardImage = document.createElement("img");
    cardImage.src = `/images/${card}.png`;
    document.querySelector(activePlayer.div).appendChild(cardImage);
    hitSound.play();
  }
}
function blackjackDeal() {
  if (blackjackGame["turnsOver"] === true) {
    blackjackGame["isStand"] = false;

    let yourImages = document.querySelector(YOU.div).querySelectorAll("img");
    let dealerImages = document
      .querySelector(DEALER.div)
      .querySelectorAll("img");
    //remove img
    for (const image of yourImages) {
      image.remove();
    }
    for (const image of dealerImages) {
      image.remove();
    }
    //reset score
    YOU.score = 0;
    DEALER.score = 0;
    document.querySelector("#your-blackjack-result").textContent = 0;
    document.querySelector("#dealer-blackjack-result").textContent = 0;
    document.querySelector("#your-blackjack-result").style.color = "white";
    document.querySelector("#dealer-blackjack-result").style.color = "white";
    //reset headline
    document.querySelector("#blackjack-result").textContent = "Let's play!";
    document.querySelector("#blackjack-result").style.color = "black";
  }
  blackjackGame["turnsOver"] = true;
}
function updateScore(card, activePlayer) {
  if (card === "A") {
    //if score + 11 <= 21 => A = 11, otherwise A = 1
    if (activePlayer["score"] + blackjackGame["cardsMap"][card][1] <= 21) {
      activePlayer["score"] += blackjackGame["cardsMap"][card][1];
    } else {
      activePlayer["score"] += blackjackGame["cardsMap"][card][0];
    }
  } else {
    activePlayer["score"] += blackjackGame["cardsMap"][card];
  }
}

function showScore(activePlayer) {
  if (activePlayer["score"] > 21) {
    document.querySelector(activePlayer["scoreSpan"]).textContent = "BUST!";
    document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
  } else {
    document.querySelector(activePlayer["scoreSpan"]).textContent =
      activePlayer["score"];
  }
}

//setTimeOut for dealerLogic
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//switch player when click stand
async function dealerLogic() {
  blackjackGame["isStand"] = true;

  while (DEALER["score"] < 16 && blackjackGame["isStand"] === true) {
    let card = randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
    await sleep(1000);
  }

  blackjackGame["turnsOver"] = true;
  let winner = computeWinner();
  showResult(winner);
}

//return the winner
function computeWinner() {
  let winner;
  if (YOU["score"] <= 21) {
    //higher score than dealer or when dealer busts but you are 21 or under
    if (YOU["score"] > DEALER["score"] || DEALER["score"] > 21) {
      blackjackGame["wins"]++;
      winner = YOU;
    } else if (YOU["score"] < DEALER["score"]) {
      blackjackGame["loses"]++;
      winner = DEALER;
    } else if (YOU["score"] === DEALER["score"]) {
      blackjackGame["draws"]++;
    }
  }
  //you bust but dealer doesnt
  else if (YOU["score"] > 21 && DEALER["score"] <= 21) {
    blackjackGame["loses"]++;
    winner = DEALER;
  }
  //you and dealer both bust
  else if (YOU["score"] > 21 && DEALER["score"] > 21) {
    blackjackGame["draws"]++;
  }

  return winner;
}

function showResult(winner) {
  let message, messageColor;
  if (blackjackGame["turnsOver"] === true) {
    if (winner === YOU) {
      document.querySelector("#wins").textContent = blackjackGame["wins"];
      message = "You won!";
      messageColor = "green";
      winSound.play();
    } else if (winner === DEALER) {
      document.querySelector("#loses").textContent = blackjackGame["loses"];
      message = "You lost!";
      messageColor = "red";
      lostSound.play();
    } else {
      document.querySelector("#draws").textContent = blackjackGame["draws"];
      message = "You drew!";
      messageColor = "black";
    }
    document.querySelector("#blackjack-result").textContent = message;
    document.querySelector("#blackjack-result").style.color = messageColor;
  }
}

//Challenge 6: AJAX & API's with JS
function getTen() {
  document.querySelector("#result6").innerHTML = "";
  let url = "https://randomuser.me/api/?results=10";
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      let authors = data.results;
      console.log(authors);
      for (const author of authors) {
        let div = document.createElement("div");
        let image = document.createElement("img");
        let p = document.createElement("p");
        p.textContent = `${author.name.title}.${author.name.first}${author.name.last}`;
        image.src = author.picture.large;
        div.appendChild(image);
        div.appendChild(p);
        document.querySelector("#result6").appendChild(div);
      }
    });
}
function getFive() {
  document.querySelector("#result6").innerHTML = "";
  let url = "https://randomuser.me/api/?results=5";
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      let authors = data.results;
      console.log(authors);
      for (const author of authors) {
        let div = document.createElement("div");
        let image = document.createElement("img");
        let p = document.createElement("p");
        p.textContent = `${author.name.title}.${author.name.first}${author.name.last}`;
        image.src = author.picture.large;
        div.appendChild(image);
        div.appendChild(p);
        document.querySelector("#result6").appendChild(div);
      }
    });
}
