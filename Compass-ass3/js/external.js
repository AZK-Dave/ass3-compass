const questionElement = document.getElementById("question");

const answerbtnElement = document.getElementById("answer-btn");

let shuffledQuestions, currentQuestionIndex;

const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
})

const questionContainerElement = document.getElementById("question-container");

function startGame() {
  console.log("Start");
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerHTML = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener("click", selectAnswer)
    answerbtnElement.appendChild(button)
  });
}
function resetState() {
  nextButton.classList.add("hide");
  while (answerbtnElement.firstChild) {
    answerbtnElement.removeChild(answerbtnElement.firstChild)
  }
}

function selectAnswer(e) {
    const selectButton = e.target
    const correct = selectButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerbtnElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if(shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide") 
    } else {
        startButton.innerText = "Restart"
        startButton.classList.remove("hide")
    }
    
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if(correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
}

const questions = [
  {
    question: "Which of these elements in HTML can be used for making a text bold?",
    answers: [
      { text: "<a>", correct: false },
      { text: "<pre>", correct: false },
      { text: "<br>", correct: false },
      { text: "<b>", correct: true },
    ],
  },

  {
    question: "HTML stands for",
    answers: [
      { text: "HighText Machine Language", correct: false },
      { text: "HyperText and links Markup Language", correct: false },
      { text: "HyperText Markup Language", correct: true },
      { text: "None of these", correct:false },
    ],
  },

  {
    question: "Which character is used to represent the closing of a tag in HTML?",
    answers: [
      { text: "? ", correct: false },
      { text: "! ", correct: false },
      { text: "/", correct: true },
      { text: ".", correct: false },
    ],
  },

  {
    question: "Which of the following CSS selectors are used to specify a group of elements?",
    answers: [
      { text: "class", correct: true },
      { text: "tag", correct: false },
      { text: "id", correct: false },
      { text: "both class and tag", correct: false },
    ],
  },

  {
    question: "Which of the following is the correct way to apply CSS Styles?",
    answers: [
      { text: "in an external CSS file", correct: false },
      { text: "inside an HTML element", correct: false },
      { text: "inside the <head> section of an HTML page", correct: false },
      { text: "all of the mentioned ", correct: true },
    ],
  },
];
