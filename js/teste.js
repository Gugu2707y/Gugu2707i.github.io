const questions = [
  {
    text: "Quando você precisa resolver um problema difícil, o que mais combina com você?",
    answers: [
      ["Pesquisar, testar e encontrar uma solução lógica.", "tecnologia"],
      ["Criar uma ideia diferente e experimentar.", "criatividade"],
      ["Conversar com pessoas para entender o problema.", "pessoas"],
      ["Organizar as etapas e planejar a melhor estratégia.", "estrategia"]
    ]
  },
  {
    text: "Qual atividade parece mais interessante para você?",
    answers: [
      ["Programar um aplicativo ou jogo.", "tecnologia"],
      ["Criar um desenho, vídeo ou identidade visual.", "criatividade"],
      ["Ensinar ou ajudar alguém a aprender.", "pessoas"],
      ["Organizar um projeto com metas e prazos.", "estrategia"]
    ]
  },
  {
    text: "Em um trabalho em grupo, qual papel você tende a assumir?",
    answers: [
      ["A pessoa que resolve a parte técnica.", "tecnologia"],
      ["A pessoa que traz ideias e apresenta o projeto.", "criatividade"],
      ["A pessoa que aproxima e ajuda os integrantes.", "pessoas"],
      ["A pessoa que distribui tarefas e acompanha o progresso.", "estrategia"]
    ]
  },
  {
    text: "Qual ambiente de trabalho parece mais interessante?",
    answers: [
      ["Um laboratório, computador ou ambiente tecnológico.", "tecnologia"],
      ["Um estúdio, agência ou espaço de criação.", "criatividade"],
      ["Uma escola, organização ou ambiente com contato humano.", "pessoas"],
      ["Uma empresa com projetos, metas e decisões.", "estrategia"]
    ]
  },
  {
    text: "O que mais motiva você em uma atividade?",
    answers: [
      ["Descobrir como algo funciona.", "tecnologia"],
      ["Expressar uma ideia de maneira original.", "criatividade"],
      ["Perceber que ajudei alguém.", "pessoas"],
      ["Ver um objetivo sendo alcançado.", "estrategia"]
    ]
  },
  {
    text: "Se você pudesse escolher uma missão em um RPG, qual seria?",
    answers: [
      ["Construir uma ferramenta tecnológica.", "tecnologia"],
      ["Criar a identidade visual do reino.", "criatividade"],
      ["Liderar uma equipe e ajudar a comunidade.", "pessoas"],
      ["Planejar a estratégia para vencer o desafio.", "estrategia"]
    ]
  },
  {
    text: "Qual habilidade você gostaria de desenvolver mais?",
    answers: [
      ["Programação e tecnologia.", "tecnologia"],
      ["Criatividade e comunicação.", "criatividade"],
      ["Liderança, empatia e comunicação.", "pessoas"],
      ["Planejamento e tomada de decisões.", "estrategia"]
    ]
  },
  {
    text: "Quando surge uma novidade, qual é sua reação?",
    answers: [
      ["Quero entender como funciona.", "tecnologia"],
      ["Quero imaginar o que posso criar com ela.", "criatividade"],
      ["Quero saber como isso afeta as pessoas.", "pessoas"],
      ["Quero pensar em como aproveitar isso da melhor maneira.", "estrategia"]
    ]
  },
  {
    text: "Qual tipo de desafio você escolheria?",
    answers: [
      ["Resolver um enigma usando lógica e ferramentas.", "tecnologia"],
      ["Criar uma solução visual para um problema.", "criatividade"],
      ["Mediar uma situação entre diferentes pessoas.", "pessoas"],
      ["Comandar recursos para concluir uma missão.", "estrategia"]
    ]
  },
  {
    text: "Como você prefere aprender algo novo?",
    answers: [
      ["Praticando e testando na prática.", "tecnologia"],
      ["Experimentando e criando exemplos.", "criatividade"],
      ["Conversando e trocando experiências.", "pessoas"],
      ["Seguindo um plano e organizando o conteúdo.", "estrategia"]
    ]
  },
  {
    text: "Qual resultado traz mais satisfação?",
    answers: [
      ["Uma solução funcionando perfeitamente.", "tecnologia"],
      ["Uma criação que ficou do jeito que imaginei.", "criatividade"],
      ["Ver alguém evoluindo graças à minha ajuda.", "pessoas"],
      ["Concluir um projeto com tudo organizado.", "estrategia"]
    ]
  },
  {
    text: "Qual frase combina mais com você?",
    answers: [
      ["Gosto de entender, construir e melhorar sistemas.", "tecnologia"],
      ["Gosto de imaginar, criar e comunicar ideias.", "criatividade"],
      ["Gosto de ouvir, orientar e trabalhar com pessoas.", "pessoas"],
      ["Gosto de planejar, liderar e alcançar objetivos.", "estrategia"]
    ]
  }
];

let current = 0;
const selected = Array(questions.length).fill(null);

const intro = document.getElementById("testIntro");
const quiz = document.getElementById("quizSection");
const questionTitle = document.getElementById("questionTitle");
const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const answers = document.getElementById("answers");
const progressFill = document.getElementById("progressFill");
const warning = document.getElementById("quizWarning");
const startButton = document.getElementById("startTest");
const prevButton = document.getElementById("prevQuestion");
const nextButton = document.getElementById("nextQuestion");

function renderQuestion() {
  const question = questions[current];

  questionTitle.textContent = `Pergunta ${current + 1}`;
  questionNumber.textContent = current + 1;
  questionText.textContent = question.text;
  progressFill.style.width = `${((current + 1) / questions.length) * 100}%`;
  warning.textContent = "";

  answers.innerHTML = "";

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer";
    button.textContent = answer[0];

    if (selected[current] === index) {
      button.classList.add("selected");
    }

    button.addEventListener("click", () => {
      selected[current] = index;
      answers.querySelectorAll(".answer").forEach(item => item.classList.remove("selected"));
      button.classList.add("selected");
      warning.textContent = "";
    });

    answers.appendChild(button);
  });

  prevButton.style.visibility = current === 0 ? "hidden" : "visible";
  nextButton.textContent = current === questions.length - 1 ? "VER RESULTADO" : "PRÓXIMA";
}

startButton.addEventListener("click", () => {
  intro.classList.add("hidden");
  quiz.classList.remove("hidden");
  renderQuestion();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

prevButton.addEventListener("click", () => {
  if (current > 0) {
    current--;
    renderQuestion();
  }
});

nextButton.addEventListener("click", () => {
  if (selected[current] === null) {
    warning.textContent = "Escolha uma alternativa para continuar.";
    return;
  }

  if (current < questions.length - 1) {
    current++;
    renderQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const scores = {
    tecnologia: 0,
    criatividade: 0,
    pessoas: 0,
    estrategia: 0
  };

  selected.forEach((answerIndex, questionIndex) => {
    const type = questions[questionIndex].answers[answerIndex][1];
    scores[type]++;
  });

  const winner = Object.keys(scores).sort((a, b) => scores[b] - scores[a])[0];

  const answerDetails = selected.map((answerIndex, questionIndex) => ({
    question: questions[questionIndex].text,
    answer: questions[questionIndex].answers[answerIndex][0],
    category: questions[questionIndex].answers[answerIndex][1]
  }));

  localStorage.setItem("ordemVocacionalResult", JSON.stringify({
    winner,
    scores,
    total: questions.length,
    answers: answerDetails,
    date: new Date().toISOString()
  }));

  window.location.href = "resultado.html";
});
