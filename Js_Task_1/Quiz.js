document.addEventListener("DOMContentLoaded", () => {
  const questions = [
    {
      question: "What does HTML stand for?",
      answers: [
        "Hyper Text Markup Language",
        "Home Tool Markup Language",
        "Hyperlinks and Text Markup Language",
        "Hyper Technical Machine Language",
      ],
      correct: 0,
    },
    {
      question: "What does CSS stand for?",
      answers: [
        "Creative Style Sheets",
        "Cascading Style Sheets",
        "Computer Style Sheets",
        "Colorful Style Sheets",
      ],
      correct: 1,
    },
    {
      question: "What does JS stand for?",
      answers: ["Java Source", "JavaScript", "Just Script", "Java Syntax"],
      correct: 1,
    },
    {
      question: "What is the purpose of Bootstrap?",
      answers: [
        "Backend Development",
        "Frontend Framework",
        "Database Management",
        "Code Debugging",
      ],
      correct: 1,
    },
    {
      question: "Which is a NoSQL database?",
      answers: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
      correct: 2,
    },
  ];

  let currentQuestionIndex = 0;
  let score = 0;
  let timer;
  let timeLeft = 15;

  const startScreen = document.getElementById("start-screen");
  const quizScreen = document.getElementById("quiz-screen");
  const scoreScreen = document.getElementById("score-screen");
  const rulesModal = new bootstrap.Modal(
    document.getElementById("rules-modal")
  );

  const questionElement = document.getElementById("question");
  const answersElement = document.getElementById("answers");
  const timerElement = document.getElementById("timer");
  const progressElement = document.getElementById("progress");
  const finalScoreElement = document.getElementById("final-score");

  document.getElementById("start-btn").addEventListener("click", () => {
    rulesModal.show();
  });

  document.getElementById("continue-btn").addEventListener("click", startQuiz);
  document.getElementById("exit-btn").addEventListener("click", resetQuiz);
  document.getElementById("replay-btn").addEventListener("click", replayQuiz);
  document.getElementById("quit-btn").addEventListener("click", quitQuiz);

  function startQuiz() {
    rulesModal.hide();
    score = 0;
    currentQuestionIndex = 0;
    timeLeft = 15;

    startScreen.classList.add("d-none");
    quizScreen.classList.remove("d-none");
    scoreScreen.classList.add("d-none");

    showQuestion();
    startTimer();
  }

  function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    answersElement.innerHTML = "";
    progressElement.textContent = `Question ${currentQuestionIndex + 1} / ${
      questions.length
    }`;

    currentQuestion.answers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.className = "btn btn-outline-primary";
      button.textContent = answer;
      button.addEventListener("click", () => checkAnswer(index, button));
      answersElement.appendChild(button);
    });
  }

  function startTimer() {
    timerElement.textContent = `Time Left: ${timeLeft}s`;
    timer = setInterval(() => {
      timeLeft--;
      timerElement.textContent = `Time Left: ${timeLeft}s`;

      if (timeLeft <= 0) {
        clearInterval(timer);
        disableAnswers();
        setTimeout(nextQuestion, 1000);
      }
    }, 1000);
  }

  function checkAnswer(selectedIndex, button) {
    clearInterval(timer);
    disableAnswers();

    const currentQuestion = questions[currentQuestionIndex];

    if (selectedIndex === currentQuestion.correct) {
      button.classList.add("bg-success", "text-white");
      score++;
    } else {
      button.classList.add("bg-danger", "text-white");
      const correctButton = answersElement.children[currentQuestion.correct];
      correctButton.classList.add("bg-success", "text-white");
    }

    setTimeout(nextQuestion, 1000);
  }

  function disableAnswers() {
    Array.from(answersElement.children).forEach((button) => {
      button.disabled = true;
    });
  }

  function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      timeLeft = 15;
      showQuestion();
      startTimer();
    } else {
      showScore();
    }
  }

  function showScore() {
    quizScreen.classList.add("d-none");
    scoreScreen.classList.remove("d-none");

    if (score === questions.length) {
      finalScoreElement.textContent = `Congratulations! You scored a perfect ${score} out of ${questions.length}!`;
    } else {
      finalScoreElement.textContent = `You scored ${score} out of ${questions.length}. Better luck next time!`;
    }
  }

  function resetQuiz() {
    clearInterval(timer);
    scoreScreen.classList.add("d-none");
    startScreen.classList.remove("d-none");
  }

  function replayQuiz() {
    resetQuiz();
    startQuiz();
  }

  function quitQuiz() {
    resetQuiz();
    alert("You have quit the quiz.");
  }
});
