const quizData = [
  {
    question: "How old is Solomon",
    a: "18",
    b: "20",
    c: "34",
    d: "23",
    correct: "b",
  },
  {
    question: "What is the most used programming language in 2019",
    a: "Java",
    b: "C",
    c: "Javascript",
    d: "Python",
    correct: "c",
  },
  {
    question: "Who is The President of US",
    a: "Barack Obama",
    b: "Donald Trump",
    c: "Joe Biden",
    d: "Hillary Cliton",
    correct: "b",
  },
  {
    question: "What does HTML stands for",
    a: "HyperText Markup Language",
    b: "Cascading Style sheet",
    c: "Json Object Notation",
    d: "Hyper Mark Language",
    correct: "a",
  },
  {
    question: "What Year Was JavaScript Launched",
    a: "1993",
    b: "1992",
    c: "1994",
    d: "none of the above",
    correct: "d",
  },
];

const answerEls = document.querySelectorAll(".answer");
const quiz = document.getElementById("quiz");
const bottom = document.getElementById("bottom");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");

let currentQuestion = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
  deselectAnswer();
  const currentQuiz = quizData[currentQuestion];
  questionEl.innerText = currentQuiz.question;
  a_text.innerText = currentQuiz.a;
  b_text.innerText = currentQuiz.b;
  c_text.innerText = currentQuiz.c;
  d_text.innerText = currentQuiz.d;
  bottom.innerText = `${currentQuestion + 1} of ${quizData.length} question`;
}

let answerr = null;

function getSelected() {
  let answer = undefined;

  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });
  return answer;
}

function deselectAnswer() {
  answerEls.forEach((answerEl) => {
    answerEl.checked = false;
  });
}

submitBtn.addEventListener("click", () => {
  const answer = getSelected();

  if (answer) {
    if (answer === quizData[currentQuestion].correct) {
      score += 1;
    }
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuiz();
    } else {
      quiz.innerHTML = "<h2>Loading...Wait A Minute</h2>";
      setTimeout(() => {
        quiz.innerHTML = `
        <h2>
          You Answered correctly ${score} out of ${quizData.length} questions
        </h2><button onclick=location.reload()>Restart</button> `;
      }, 2000);
    }
  }
});
