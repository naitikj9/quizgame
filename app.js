const questions = [
    {
        question : "What is the output of typeof typeof 1",
        answers :[
            {text: "number", correct: false},
            {text: "string", correct: true},
            {text: "object", correct: false},
            {text: "undefined", correct: false}
        ]
    },
    {
        question : "What will the following code output: console.log(2 + '2' - 1)?",
        answers :[
            {text: "21", correct: true},
            {text: "3", correct: false},
            {text: "22", correct: false},
            {text: "NaN", correct: false}
        ]
    },
    {
        question : "What will be the output of console.log(3 === '3')?",
        answers :[
            {text: "true", correct: false},
            {text: "false", correct: true},
            {text: "error", correct: false},
            {text: "undefined", correct: false}
        ]
    },
    {
        question : "What does the following expression return: 5 > 4 > 3?",
        answers :[
          {text: "true", correct: false},
          {text: "false", correct: true},
          {text: "error", correct: false},
          {text: "undefined", correct: false}
      ]
    },
    
]

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answers');
const nextButton = document.getElementById('next');

let currentQuestionIndex = 0;
let score = 0;

function startGame() {
    nextButton.addEventListener('click', handleNextButton);
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('btn');
    answerButtonsElement.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener('click', selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = 'none';
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === 'true';
  if (correct) {
    score++;
    selectedButton.classList.add('correct');
  } else {
    selectedButton.classList.add('incorrect');
  }
  Array.from(answerButtonsElement.children).forEach(button => {
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
    }
    button.disabled = true;
  });
  nextButton.style.display = 'block';
}

nextButton.addEventListener('click', handleNextButton);

function handleNextButton() {
  if (currentQuestionIndex < questions.length) {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }
}

function showScore() {
  resetState();
  questionElement.innerHTML = "You scored " + score + " out of " + questions.length;
  nextButton.innerHTML = "Restart";
  nextButton.style.display = 'block';
  nextButton.addEventListener('click', startGame);
}

startGame();