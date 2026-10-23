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
  ,{
    text: "Uma ponte apresenta sinais de desgaste e precisa ser avaliada. Qual tarefa você escolheria?",
    answers: [
      ["Analisar a estrutura, calcular os riscos e propor uma solução técnica.", { engenharia: 3, tecnologia: 1 }],
      ["Organizar o isolamento da área e orientar as pessoas para um local seguro.", { seguranca: 3, estrategia: 1, pessoas: 1 }],
      ["Pesquisar materiais e métodos para tornar a construção mais resistente.", { engenharia: 3, tecnologia: 1 }],
      ["Conversar com os moradores para entender os impactos do problema.", { pessoas: 2, estrategia: 1 }]
    ]
  },
  {
    text: "Durante uma missão, um equipamento importante para de funcionar. Como você reage?",
    answers: [
      ["Investigar a falha e testar uma solução técnica com segurança.", { engenharia: 2, tecnologia: 2 }],
      ["Seguir o protocolo de emergência e coordenar a proteção da equipe.", { seguranca: 3, estrategia: 1 }],
      ["Distribuir tarefas para manter a missão funcionando enquanto o problema é resolvido.", { estrategia: 2, engenharia: 1, seguranca: 1 }],
      ["Registrar o defeito e consultar uma pessoa especializada antes de agir.", { engenharia: 2, tecnologia: 1 }]
    ]
  },
  {
    text: "Uma cidade quer se preparar melhor para enchentes. Qual desafio mais interessa a você?",
    answers: [
      ["Projetar sistemas de drenagem e soluções de infraestrutura.", { engenharia: 3, tecnologia: 1 }],
      ["Planejar rotas de evacuação e procedimentos de emergência.", { seguranca: 3, estrategia: 1 }],
      ["Criar sensores e sistemas digitais para monitorar áreas de risco.", { tecnologia: 3, engenharia: 1 }],
      ["Mapear comunidades vulneráveis e organizar ações de apoio.", { pessoas: 2, estrategia: 1 }]
    ]
  },
  {
    text: "Durante um evento público, surge uma situação de conflito. Qual seria sua prioridade?",
    answers: [
      ["Avaliar os riscos, seguir os procedimentos e proteger as pessoas.", { seguranca: 3, pessoas: 1 }],
      ["Organizar a equipe, distribuir funções e manter a comunicação clara.", { seguranca: 2, estrategia: 2, pessoas: 1 }],
      ["Analisar o local para identificar falhas estruturais ou técnicas de segurança.", { engenharia: 2, seguranca: 2 }],
      ["Ajudar a mediar o conflito e buscar uma solução justa.", { pessoas: 2, estrategia: 1 }]
    ]
  },
  {
    text: "Sua equipe precisa criar um sistema mais eficiente usando menos recursos. Como você contribuiria?",
    answers: [
      ["Fazer cálculos, comparar materiais e otimizar o projeto.", { engenharia: 3, tecnologia: 1 }],
      ["Programar uma ferramenta para automatizar tarefas e analisar dados.", { tecnologia: 3, engenharia: 1 }],
      ["Definir procedimentos, avaliar riscos e preparar planos de contingência.", { seguranca: 2, estrategia: 2 }],
      ["Organizar o orçamento e distribuir os recursos entre as prioridades.", { estrategia: 2, engenharia: 1 }]
    ]
  }
];

let current = 0;
const selected = Array(questions.length).fill(null);

const totalIndicator = document.querySelector(".progress-info");
if (totalIndicator) totalIndicator.dataset.total = String(questions.length);

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

  // O progresso aparece somente na primeira pergunta; as transições continuam iguais.
  quiz.classList.toggle("hide-progress", current !== 0);

  questionTitle.textContent = `Pergunta ${current + 1}`;
  questionNumber.textContent = current + 1;
  if (totalIndicator) totalIndicator.setAttribute("aria-label", `Pergunta ${current + 1} de ${questions.length}`);
  const totalText = totalIndicator?.querySelector("[data-total-label]");
  if (totalText) totalText.textContent = String(questions.length);
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
    estrategia: 0,
    engenharia: 0,
    seguranca: 0
  };

  selected.forEach((answerIndex, questionIndex) => {
    const points = questions[questionIndex].answers[answerIndex][1];
    if (typeof points === "string") {
      scores[points] = (scores[points] || 0) + 1;
    } else if (points && typeof points === "object") {
      Object.entries(points).forEach(([category, value]) => {
        scores[category] = (scores[category] || 0) + Number(value || 0);
      });
    }
  });

  const winner = Object.keys(scores).sort((a, b) => scores[b] - scores[a])[0];

  const answerDetails = selected.map((answerIndex, questionIndex) => {
    const points = questions[questionIndex].answers[answerIndex][1];
    return {
      question: questions[questionIndex].text,
      answer: questions[questionIndex].answers[answerIndex][0],
      category: typeof points === "string" ? points : Object.keys(points || {}).sort((a, b) => (points[b] || 0) - (points[a] || 0))[0],
      points: points
    };
  });

  localStorage.setItem("ordemVocacionalResult", JSON.stringify({
    winner,
    scores,
    total: questions.length,
    maxScore: questions.length + 10,
    answers: answerDetails,
    date: new Date().toISOString()
  }));

  window.location.href = "resultado.html";
});
