const quizData = [
  {
    q: "Which language runs in a web browser?",
    o: ["Java", "C", "Python", "JavaScript"],
    a: 3
  },
  {
    q: "What does CSS stand for?",
    o: ["Cascading Style Sheets", "Computer Style Sheet", "Colorful Style Sheet", "Creative Style System"],
    a: 0
  },
  {
    q: "What year was JavaScript launched?",
    o: ["1996", "1995", "1994", "None of the above"],
    a: 1
  },
  {
    q: "Which is the seventh planet from the sun?",
    o: ["Uranus", "Earth", "Pluto", "Mars"],
    a: 0
  },
  {
    q: "Which is the largest ocean on Earth?",
    o: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    a: 3
  },
  {
    q: "Who invented the telephone?",
    o: ["Alexander Graham Bell", "Thomas Edison", "Nikola Tesla", "Isaac Newton"],
    a: 0
  },
  {
    q: "What is the capital of Australia?",
    o: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
    a: 2
  },
  {
    q: "How many continents are there?",
    o: ["5", "6", "7", "8"],
    a: 2
  },
  {
    q: "What is the hardest natural substance on Earth?",
    o: ["Gold", "Iron", "Diamond", "Granite"],
    a: 2
  },
  {
    q: "Which is the longest river in the world?",
    o: ["Amazon", "Nile", "Yangtze", "Mississippi"],
    a: 1
  }
];

let current = 0, score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const progress = document.getElementById("progress");
const quizBox = document.getElementById("quizBox");
const resultBox = document.getElementById("resultBox");
const resultText = document.getElementById("resultText");

function loadQuestion() {
  nextBtn.disabled = true;
  questionEl.textContent = quizData[current].q;
  optionsEl.innerHTML = "";

  let optionIndexes = [0, 1, 2, 3];
  optionIndexes.sort(() => Math.random() - 0.5); // shuffle options

  optionIndexes.forEach(i => {
    const btn = document.createElement("div");
    btn.className = "option";
    btn.textContent = quizData[current].o[i];
    btn.dataset.index = i;
    btn.onclick = () => selectOption(btn, i);
    optionsEl.appendChild(btn);
  });

  progress.style.width = `${(current / quizData.length) * 100}%`;
}

function selectOption(el, selected) {
  const correctIndex = quizData[current].a;
  const options = document.querySelectorAll(".option");

  options.forEach(opt => {
    opt.onclick = null;
    if (parseInt(opt.dataset.index) === correctIndex) {
      opt.classList.add("correct");
    } else if (parseInt(opt.dataset.index) === selected) {
      opt.classList.add("wrong");
    }
  });

  if (selected === correctIndex) score++;
  nextBtn.disabled = false;
}

nextBtn.onclick = () => {
  current++;
  if (current < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  resultText.innerHTML = `You scored <strong>${score}</strong> out of <strong>${quizData.length}</strong>!<br><br>${
    score === quizData.length ? "🏆 Perfect!" : score >= 7 ? "🎯 Great job!" : score >= 4 ? "👍 Not bad!" : "😅 Better luck next time!"
  }`;
}

window.onload = loadQuestion;
