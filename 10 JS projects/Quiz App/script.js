const quizData = [
  {
    question: "What is your name?",
    a: "Levi Ackerman",
    b: "Nate River",
    c: "Killer Bee",
    d: "Kuroko Tatsuya",
    correct: "a",
  },
  {
    question: "What is your pet name?",
    a: "Gintoki",
    b: "Momo",
    c: "Tora",
    d: "Kira",
    correct: "c",
  },
  {
    question: "Who is the president of US?",
    a: "Obi Wan Kennobi",
    b: "Donald Trump",
    c: "Barack Obama",
    d: "Joe Biden",
    correct: "d",
  },
  {
    question: "What is HTML stand for?",
    a: "Hyper Text Markup Language",
    b: "Application Program Interface",
    c: "Json Object Notation",
    d: "Pretty Huge D",
    correct: "a",
  },
  {
    question: "What year was Javascript launched?",
    a: "1997",
    b: "1995",
    c: "1996",
    d: "1994",
    correct: "b",
  },
];

const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const questionEl = document.getElementById("question");
const submitBtn = document.getElementById("submitBtn");
const answerEls = document.getElementsByClassName("answer");
const quiz = document.getElementById("quiz");

let currentQuiz = 0;
let score = 0;

function loadQuiz() {
  deSelected();
  const currentQuizData = quizData[currentQuiz];
  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}
loadQuiz();

function getSelected() {
  let answer;
  for (let answerEl of answerEls) {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  }
  return answer;
}

function deSelected() {
  for (let answerEl of answerEls) {
    answerEl.checked = false;
  }
}

submitBtn.addEventListener("click", () => {
  let answer = getSelected();
  console.log(answer);
  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      score++;
    }
    currentQuiz++;

    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      quiz.innerHTML = `<h2>You answered correctly at ${score}/${quizData.length} questions.</h2> <button onclick="location.reload()">Reload</button>`;
    }
  }
});
