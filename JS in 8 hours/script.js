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
  console.log(yourChoice);
  let humanChoice, botChoice;
  humanChoice = yourChoice.id;
  console.log(humanChoice);
  //random bot choice
  botChoice = numberToChoice(randomRps());
  console.log(botChoice);
  //win function
  results = decideWinner(humanChoice, botChoice);
  console.log(results);
  //message print
  message = finalMessage(results);
  console.log(message);
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

  console.log(humanImageChoice);

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