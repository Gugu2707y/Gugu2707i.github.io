const profiles = {
  tecnologia: {
    name: "TECNOLOGIA",
    title: "Tecnológico",
    icon: "⌘",
    subtitle: "Você demonstra curiosidade, raciocínio lógico e interesse em entender como as coisas funcionam.",
    description: "Seu resultado indica uma tendência para atividades que envolvem tecnologia, lógica, investigação e construção de soluções. Explore áreas diferentes antes de escolher uma profissão.",
    careers: [
      {
        name: "Desenvolvedor de Software",
        shortDescription: "Transforma ideias em sistemas, sites, aplicativos e ferramentas digitais.",
        intro: "Na área de desenvolvimento, seu interesse por lógica pode se transformar em produtos digitais. É uma carreira que combina raciocínio, testes e criação contínua de soluções.",
        recommended: [
          "Desenvolvimento Front-end", "Desenvolvimento Back-end", "Desenvolvimento Full Stack", "Desenvolvimento Mobile", "Engenharia de Software", "Desenvolvimento de Jogos", "DevOps e Automação", "Desenvolvimento de APIs"
        ],
        strengthsIntro: "Para desenvolver software, é especialmente útil conseguir decompor problemas grandes em pequenas etapas e manter atenção aos detalhes do código.",
        strengths: ["Raciocínio lógico para estruturar soluções", "Persistência para testar e corrigir erros", "Curiosidade para aprender novas tecnologias", "Facilidade para transformar uma ideia em etapas práticas"],
        challengesIntro: "O trabalho de desenvolvimento exige lidar com mudanças constantes e problemas que nem sempre têm uma resposta imediata.",
        challenges: ["Manter estudos atualizados diante de novas tecnologias", "Ter paciência durante depuração e correção de erros", "Lidar com requisitos que mudam durante um projeto", "Equilibrar velocidade de entrega com qualidade e segurança"],
        skillsIntro: "Para avançar nessa carreira, vale construir uma base técnica sólida e aprender a trabalhar de forma organizada em projetos reais.",
        skills: ["Praticar algoritmos e estruturas de dados", "Aprender Git e organização de projetos", "Desenvolver testes e hábitos de depuração", "Aprimorar leitura de documentação técnica", "Criar projetos próprios para montar portfólio"]
      },
      {
        name: "Analista de Dados",
        shortDescription: "Investiga dados para encontrar padrões e apoiar decisões mais bem fundamentadas.",
        intro: "A análise de dados combina investigação, matemática e interpretação. Aqui, o desafio não é apenas encontrar números, mas descobrir o que eles significam para uma situação concreta.",
        recommended: [
          "Business Intelligence", "Análise de Dados de Marketing", "Análise Financeira", "People Analytics", "Análise de Dados em Saúde", "Engenharia de Analytics", "Visualização de Dados", "Pesquisa e Métricas"
        ],
        strengthsIntro: "Um bom analista precisa observar detalhes sem perder a visão geral e transformar informações dispersas em conclusões compreensíveis.",
        strengths: ["Atenção para padrões e inconsistências", "Curiosidade investigativa diante de perguntas", "Facilidade para comparar informações", "Interesse por evidências antes de concluir algo"],
        challengesIntro: "Dados podem ser incompletos, contraditórios ou mal interpretados. A responsabilidade de comunicar conclusões também faz parte da carreira.",
        challenges: ["Evitar conclusões precipitadas a partir de poucos dados", "Trabalhar com bases desorganizadas ou incompletas", "Explicar análises técnicas para pessoas não técnicas", "Separar correlação de causalidade ao interpretar resultados"],
        skillsIntro: "O próximo passo é unir conhecimento técnico com capacidade de comunicação, para que a análise realmente ajude alguém a decidir.",
        skills: ["Aprimorar Excel e ferramentas de planilhas", "Aprender SQL para consultar bancos de dados", "Estudar estatística aplicada", "Praticar visualização de dados e dashboards", "Treinar apresentação de conclusões com clareza"]
      },
      {
        name: "Engenheiro de Computação",
        shortDescription: "Integra hardware, software e sistemas para construir soluções computacionais.",
        intro: "Essa carreira fica na fronteira entre computadores físicos e programas. Ela pode ser especialmente interessante para quem gosta de entender tanto o funcionamento interno das máquinas quanto o software que as controla.",
        recommended: [
          "Sistemas Embarcados", "Internet das Coisas", "Robótica", "Automação Industrial", "Arquitetura de Computadores", "Firmware", "Inteligência Artificial Embarcada", "Segurança de Hardware"
        ],
        strengthsIntro: "Engenharia de Computação favorece quem gosta de investigar sistemas por várias camadas e entender como componentes diferentes dependem uns dos outros.",
        strengths: ["Pensamento sistêmico para conectar hardware e software", "Interesse por funcionamento interno de equipamentos", "Capacidade de raciocinar sobre causas e efeitos", "Disposição para experimentar e testar protótipos"],
        challengesIntro: "Projetos físicos e computacionais podem envolver limitações de custo, energia, desempenho e segurança ao mesmo tempo.",
        challenges: ["Lidar com problemas que envolvem várias áreas técnicas", "Testar protótipos em condições diferentes", "Compreender limitações de hardware e recursos", "Manter precisão ao trabalhar com componentes físicos"],
        skillsIntro: "Uma boa preparação combina programação com fundamentos de eletrônica, arquitetura e matemática aplicada.",
        skills: ["Fortalecer matemática e raciocínio físico", "Aprender fundamentos de eletrônica digital", "Praticar C, C++ ou linguagens próximas de hardware", "Estudar arquitetura de computadores", "Montar pequenos protótipos e projetos embarcados"]
      }
    ]
  },
  criatividade: {
    name: "CRIATIVIDADE",
    title: "Criativo",
    icon: "✦",
    subtitle: "Você demonstra interesse em criar, comunicar ideias e encontrar soluções originais.",
    description: "Seu resultado indica uma tendência para atividades que valorizam imaginação, comunicação e criação. Conheça diferentes áreas criativas para descobrir onde seus interesses se encaixam.",
    careers: [
      {
        name: "Designer",
        shortDescription: "Cria soluções visuais e experiências que conectam pessoas a produtos, serviços e ideias.",
        intro: "Design não é apenas deixar algo bonito: envolve compreender um problema, testar possibilidades e construir uma solução visual ou funcional que faça sentido para quem vai usá-la.",
        recommended: [
          "Design Gráfico", "UX/UI Design", "Product Design", "Design de Marcas", "Motion Design", "Design Editorial", "Design de Serviços", "Direção de Arte"
        ],
        strengthsIntro: "O trabalho de design valoriza percepção visual, capacidade de observar problemas e disposição para transformar ideias abstratas em propostas concretas.",
        strengths: ["Sensibilidade para composição visual", "Facilidade para gerar alternativas", "Atenção à experiência de quem utiliza uma solução", "Capacidade de comunicar ideias por imagens e conceitos"],
        challengesIntro: "Projetos criativos envolvem opiniões diferentes, alterações de briefing e a necessidade de justificar escolhas além do gosto pessoal.",
        challenges: ["Receber críticas sem perder o foco do projeto", "Trabalhar dentro de prazos e restrições", "Explicar decisões visuais com argumentos", "Evitar depender apenas de inspiração para produzir"],
        skillsIntro: "Para crescer como designer, é importante transformar criatividade em método e aprender ferramentas que permitam apresentar e testar suas ideias.",
        skills: ["Estudar composição, tipografia e hierarquia visual", "Aprender ferramentas de criação digital", "Praticar pesquisa com usuários", "Montar um portfólio com projetos explicados", "Treinar apresentação e defesa de conceitos"]
      },
      {
        name: "Publicidade",
        shortDescription: "Combina criatividade, estratégia e comunicação para construir campanhas e mensagens.",
        intro: "Na publicidade, uma boa ideia precisa encontrar o público certo e transmitir uma mensagem clara. A carreira mistura criação, comportamento, estratégia e análise de resultados.",
        recommended: [
          "Redação Publicitária", "Direção de Arte", "Planejamento de Campanhas", "Social Media", "Mídia e Performance", "Branding", "Marketing de Conteúdo", "Produção de Campanhas"
        ],
        strengthsIntro: "Publicidade favorece quem gosta de observar comportamentos, criar mensagens e adaptar uma mesma ideia para diferentes meios de comunicação.",
        strengths: ["Facilidade para pensar em conceitos e campanhas", "Boa percepção de linguagem e público", "Curiosidade sobre tendências culturais", "Capacidade de combinar ideia criativa com objetivo"],
        challengesIntro: "Campanhas precisam funcionar dentro de orçamento, prazo, regras e objetivos de negócio, mesmo quando a ideia inicial precisa mudar.",
        challenges: ["Equilibrar criatividade e objetivos comerciais", "Produzir sob pressão de prazo", "Adaptar ideias para diferentes públicos e canais", "Avaliar resultados sem depender somente de opinião pessoal"],
        skillsIntro: "A evolução nessa área acontece quando criatividade, escrita, estratégia e leitura de dados começam a trabalhar juntas.",
        skills: ["Aprimorar escrita e storytelling", "Estudar comportamento do consumidor", "Aprender fundamentos de marketing digital", "Entender métricas de campanhas", "Praticar criação de conceitos para diferentes públicos"]
      },
      {
        name: "Produção Audiovisual",
        shortDescription: "Planeja e produz vídeos, filmes e conteúdos que comunicam histórias e experiências.",
        intro: "A produção audiovisual transforma uma ideia em uma sequência de imagens, sons e decisões de narrativa. É uma área que reúne criação artística com planejamento técnico e trabalho em equipe.",
        recommended: [
          "Direção de Vídeo", "Roteiro", "Edição de Vídeo", "Direção de Fotografia", "Produção Executiva", "Motion Graphics", "Captação de Áudio", "Pós-produção"
        ],
        strengthsIntro: "Quem trabalha com audiovisual precisa imaginar o resultado final e, ao mesmo tempo, organizar as várias etapas que fazem uma produção acontecer.",
        strengths: ["Visão narrativa para organizar uma história", "Percepção de ritmo e imagem", "Criatividade para resolver limitações de produção", "Facilidade para colaborar com diferentes funções"],
        challengesIntro: "Produções audiovisuais dependem de equipamentos, cronogramas, equipe e muitas decisões técnicas acontecendo ao mesmo tempo.",
        challenges: ["Cumprir cronogramas de gravação e edição", "Resolver imprevistos durante uma produção", "Manter consistência entre cenas e versões", "Equilibrar visão artística com recursos disponíveis"],
        skillsIntro: "Uma formação prática é essencial: quanto mais você experimenta roteiro, gravação e edição, melhor entende qual função combina com você.",
        skills: ["Estudar linguagem cinematográfica", "Praticar edição e organização de arquivos", "Aprender fundamentos de iluminação e áudio", "Escrever roteiros curtos e storyboards", "Criar projetos autorais para portfólio"]
      }
    ]
  },
  pessoas: {
    name: "PESSOAS",
    title: "Conector",
    icon: "♧",
    subtitle: "Você demonstra interesse em ouvir, ajudar, orientar e trabalhar com outras pessoas.",
    description: "Seu resultado indica uma tendência para atividades que envolvem comunicação, educação, colaboração e relações humanas. Explore ambientes em que o contato com pessoas seja importante.",
    careers: [
      {
        name: "Professor",
        shortDescription: "Planeja experiências de aprendizagem e ajuda estudantes a desenvolver conhecimentos e autonomia.",
        intro: "Ensinar envolve muito mais do que transmitir conteúdo. O professor precisa compreender diferentes formas de aprender, organizar experiências e acompanhar o desenvolvimento de cada turma.",
        recommended: [
          "Educação Infantil", "Ensino Fundamental", "Ensino Médio", "Educação Profissional", "Educação Especial", "Tecnologia Educacional", "Coordenação Pedagógica", "Produção de Material Didático"
        ],
        strengthsIntro: "A docência combina comunicação, organização e sensibilidade para perceber quando um estudante precisa de outra explicação ou abordagem.",
        strengths: ["Facilidade para explicar ideias de maneiras diferentes", "Paciência para acompanhar processos de aprendizagem", "Interesse pelo desenvolvimento de outras pessoas", "Capacidade de conduzir grupos e atividades"],
        challengesIntro: "A rotina escolar exige planejamento e adaptação constante, porque turmas e estudantes apresentam necessidades muito diferentes.",
        challenges: ["Administrar diferentes ritmos de aprendizagem", "Manter organização de aulas e avaliações", "Lidar com conflitos e situações inesperadas", "Atualizar conhecimentos e metodologias de ensino"],
        skillsIntro: "Para desenvolver uma carreira docente, é importante unir domínio do conteúdo com didática, planejamento e comunicação.",
        skills: ["Aprimorar comunicação oral e escrita", "Estudar metodologias de aprendizagem", "Praticar planejamento de aulas", "Aprender a usar recursos digitais educacionais", "Desenvolver estratégias para avaliação e feedback"]
      },
      {
        name: "Psicólogo",
        shortDescription: "Estuda processos psicológicos e trabalha com escuta, avaliação e diferentes formas de intervenção.",
        intro: "A Psicologia exige interesse genuíno pelo comportamento humano, mas também formação científica, ética e capacidade de analisar situações sem reduzir pessoas a julgamentos rápidos.",
        recommended: [
          "Psicologia Clínica", "Psicologia Escolar", "Psicologia Organizacional", "Psicologia do Esporte", "Psicologia Social", "Neuropsicologia", "Psicologia Hospitalar", "Orientação Profissional"
        ],
        strengthsIntro: "A escuta cuidadosa e a capacidade de observar diferentes perspectivas são importantes para compreender histórias e contextos sem tirar conclusões precipitadas.",
        strengths: ["Escuta atenta e respeito ao relato do outro", "Curiosidade sobre comportamento e relações", "Empatia sem perder a capacidade de analisar", "Disposição para estudar diferentes perspectivas"],
        challengesIntro: "O profissional precisa lidar com situações humanas complexas mantendo limites éticos, responsabilidade técnica e equilíbrio emocional.",
        challenges: ["Evitar julgamentos e interpretações precipitadas", "Manter sigilo e postura ética", "Lidar com situações emocionalmente exigentes", "Diferenciar conhecimento científico de opiniões pessoais"],
        skillsIntro: "O desenvolvimento nessa carreira depende de estudo científico, prática supervisionada e amadurecimento da capacidade de escuta e análise.",
        skills: ["Estudar teorias e métodos científicos da Psicologia", "Aprimorar escuta ativa", "Desenvolver escrita e registro profissional", "Aprender princípios de ética profissional", "Praticar análise de casos com supervisão adequada"]
      },
      {
        name: "Gestor de Pessoas",
        shortDescription: "Ajuda organizações a desenvolver equipes, processos de trabalho e ambientes profissionais.",
        intro: "A gestão de pessoas conecta necessidades humanas e objetivos de uma organização. A carreira envolve comunicação, recrutamento, desenvolvimento, cultura e acompanhamento de equipes.",
        recommended: [
          "Recrutamento e Seleção", "Treinamento e Desenvolvimento", "People Analytics", "Cultura Organizacional", "Gestão de Desempenho", "Remuneração e Benefícios", "Comunicação Interna", "Employer Branding"
        ],
        strengthsIntro: "Essa área favorece quem consegue conversar com perfis diferentes e transformar percepções sobre equipes em ações organizadas.",
        strengths: ["Facilidade para construir relações profissionais", "Boa comunicação em situações de grupo", "Interesse por desenvolvimento humano", "Capacidade de mediar necessidades diferentes"],
        challengesIntro: "Decisões de pessoas podem afetar equipes inteiras, por isso o profissional precisa equilibrar empatia, critérios objetivos e interesses organizacionais.",
        challenges: ["Mediar conflitos entre pessoas ou áreas", "Tomar decisões com critérios claros", "Trabalhar com informações confidenciais", "Equilibrar necessidades individuais e objetivos da organização"],
        skillsIntro: "Para avançar, vale desenvolver competências de gestão junto com conhecimentos de processos, indicadores e legislação trabalhista básica.",
        skills: ["Aprimorar negociação e mediação", "Aprender fundamentos de recrutamento", "Estudar indicadores de pessoas", "Desenvolver comunicação profissional", "Conhecer princípios de legislação e ética no trabalho"]
      }
    ]
  },
  estrategia: {
    name: "ESTRATÉGIA",
    title: "Estrategista",
    icon: "♜",
    subtitle: "Você demonstra interesse por planejamento, organização, liderança e tomada de decisões.",
    description: "Seu resultado indica uma tendência para atividades que envolvem planejamento, gestão, organização e resolução de problemas. Conheça diferentes contextos para encontrar seu caminho.",
    careers: [
      {
        name: "Administrador",
        shortDescription: "Organiza recursos, processos e pessoas para ajudar organizações a atingir seus objetivos.",
        intro: "Administração oferece uma visão ampla do funcionamento de uma organização. É uma carreira que permite transitar entre finanças, operações, pessoas, marketing e planejamento.",
        recommended: [
          "Gestão Financeira", "Gestão de Operações", "Recursos Humanos", "Marketing", "Gestão Comercial", "Empreendedorismo", "Consultoria Empresarial", "Gestão de Processos"
        ],
        strengthsIntro: "A administração valoriza quem gosta de organizar informações, definir prioridades e acompanhar se os recursos estão sendo usados de maneira adequada.",
        strengths: ["Organização de tarefas e informações", "Visão geral para conectar diferentes áreas", "Interesse por metas e resultados", "Facilidade para comparar alternativas antes de decidir"],
        challengesIntro: "A rotina administrativa envolve decisões com recursos limitados e exige equilíbrio entre pessoas, custos, prazos e resultados.",
        challenges: ["Priorizar demandas concorrentes", "Tomar decisões com informações incompletas", "Acompanhar resultados sem perder detalhes importantes", "Lidar com pressão por metas e prazos"],
        skillsIntro: "Para crescer em Administração, é útil construir uma base ampla e depois escolher uma especialização que combine com seus interesses.",
        skills: ["Aprimorar Excel e análise de indicadores", "Estudar finanças e custos básicos", "Desenvolver comunicação profissional", "Aprender fundamentos de gestão de processos", "Praticar planejamento e definição de metas"]
      },
      {
        name: "Gerente de Projetos",
        shortDescription: "Coordena pessoas, prazos, riscos e entregas para transformar planos em projetos concluídos.",
        intro: "Gerenciar projetos significa organizar uma jornada com começo, meio e fim. O profissional acompanha objetivos, dependências e riscos enquanto mantém a equipe alinhada.",
        recommended: [
          "Projetos de Tecnologia", "Projetos de Construção", "Projetos de Marketing", "Projetos Sociais", "Projetos de Produto", "Projetos Industriais", "PMO", "Gestão Ágil de Projetos"
        ],
        strengthsIntro: "Essa carreira exige visão de conjunto: você precisa saber o que está acontecendo agora e também antecipar o que pode atrapalhar a próxima etapa.",
        strengths: ["Organização de prazos e prioridades", "Facilidade para acompanhar várias tarefas", "Comunicação entre pessoas e áreas", "Tendência a antecipar riscos e problemas"],
        challengesIntro: "Mesmo um bom planejamento pode sofrer mudanças. O gestor precisa reorganizar o projeto sem perder o objetivo principal.",
        challenges: ["Lidar com atrasos e mudanças de escopo", "Negociar prioridades entre diferentes interessados", "Administrar riscos sem paralisar o projeto", "Manter a equipe alinhada durante períodos de pressão"],
        skillsIntro: "A melhor preparação combina planejamento tradicional com métodos modernos de gestão e muita prática de comunicação.",
        skills: ["Aprender cronogramas e gestão de tarefas", "Estudar metodologias ágeis", "Praticar gestão de riscos", "Desenvolver negociação e comunicação", "Aprender a acompanhar indicadores de projeto"]
      },
      {
        name: "Analista de Negócios",
        shortDescription: "Investiga necessidades, processos e problemas para ajudar a construir melhores soluções empresariais.",
        intro: "O analista de negócios atua como uma ponte entre o problema da organização e a solução que precisa ser construída. Ele investiga processos, conversa com pessoas e organiza requisitos.",
        recommended: [
          "Análise de Processos", "Business Analysis em TI", "Requisitos de Software", "Inteligência de Negócios", "Consultoria de Processos", "Transformação Digital", "Product Analysis", "Melhoria Contínua"
        ],
        strengthsIntro: "Essa função combina investigação e comunicação: é preciso perguntar, ouvir, organizar informações e enxergar onde um processo pode ser melhorado.",
        strengths: ["Capacidade de fazer perguntas relevantes", "Visão para identificar gargalos", "Facilidade para organizar requisitos", "Comunicação entre áreas com objetivos diferentes"],
        challengesIntro: "Um dos maiores desafios é entender problemas que nem sempre são apresentados de forma clara e transformar opiniões diferentes em requisitos objetivos.",
        challenges: ["Lidar com necessidades conflitantes", "Evitar assumir que a primeira solução é a melhor", "Documentar requisitos com precisão", "Traduzir linguagem técnica e de negócio entre equipes"],
        skillsIntro: "Para se desenvolver, o profissional precisa unir pensamento analítico, processos, tecnologia básica e comunicação estruturada.",
        skills: ["Estudar modelagem de processos", "Praticar levantamento de requisitos", "Aprender fundamentos de bancos de dados", "Desenvolver documentação clara", "Aprimorar técnicas de entrevista e análise"]
      }
    ]
  }
};

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));
}

function createAccordion(title, intro, contentHtml, icon = "⌄") {
  return `
    <section class="career-accordion">
      <button class="accordion-trigger" type="button" aria-expanded="false">
        <span class="accordion-title">${title}</span>
        <span class="accordion-arrow" aria-hidden="true"><span>${icon}</span></span>
      </button>
      <div class="accordion-panel" hidden>
        <p class="accordion-intro">${intro}</p>
        ${contentHtml}
      </div>
    </section>
  `;
}

function createStarGrid(items) {
  return `<div class="star-grid">${items.map(item => `
    <div class="star-card"><span class="star-icon">🌟</span><span>${item}</span></div>
  `).join("")}</div>`;
}

function createBulletList(items) {
  return `<ul class="detail-list">${items.map(item => `<li>${item}</li>`).join("")}</ul>`;
}

function createSkillList(items) {
  return `<ul class="skill-list">${items.map(item => `
    <li><span class="skill-arrow" aria-hidden="true">➜</span><span>${item}</span></li>
  `).join("")}</ul>`;
}

function buildProfileAnalysis(profile, result) {
  const answers = Array.isArray(result.answers) ? result.answers : [];
  const categoryAnswers = answers.filter(item => item && item.category === result.winner);
  const chosenTexts = answers.slice(0, 12).map(item => item && item.answer).filter(Boolean);
  const selectedExamples = chosenTexts.slice(0, 3).map(escapeHTML);
  const evidence = selectedExamples.length
    ? ` Nas suas respostas, apareceram escolhas como ${selectedExamples.map(text => `“${text}”`).join(", ")}.`
    : "";

  const profileInsights = {
    tecnologia: "Você tende a investigar como as coisas funcionam, testar possibilidades e buscar soluções lógicas. Suas escolhas apontam interesse em compreender sistemas, resolver problemas por etapas e aprender colocando ideias em prática.",
    criatividade: "Suas respostas indicam interesse em imaginar alternativas, expressar ideias e experimentar maneiras originais de resolver situações. Você parece valorizar a comunicação, a criação e a possibilidade de transformar conceitos em algo que outras pessoas possam perceber ou utilizar.",
    pessoas: "Suas escolhas destacam atenção às relações humanas, à comunicação e ao impacto das decisões sobre outras pessoas. Você demonstra interesse em ouvir perspectivas, compartilhar conhecimento e colaborar para que indivíduos ou grupos avancem.",
    estrategia: "Suas respostas apontam para interesse em organizar tarefas, comparar caminhos e acompanhar objetivos até a conclusão. Você parece valorizar planejamento, decisões fundamentadas e a coordenação de recursos ou pessoas para resolver problemas."
  };

  const reinforcement = categoryAnswers.length
    ? ` Você escolheu ${categoryAnswers.length} resposta(s) diretamente ligada(s) ao perfil ${profile.name.toLowerCase()}, reforçando essa tendência nas situações apresentadas.`
    : " O perfil representa a tendência mais forte entre as opções escolhidas, mas outras áreas também podem combinar com você.";

  return `${profileInsights[result.winner] || profile.description}${reinforcement}${evidence}`;
}

function renderCareer(career, index) {
  const recommended = createAccordion("🌟 CARREIRAS RECOMENDADAS", career.intro, createStarGrid(career.recommended));
  const strengths = createAccordion("💪 SEUS PONTOS FORTES", career.strengthsIntro, createBulletList(career.strengths));
  const challenges = createAccordion("⚠️ SEUS DESAFIOS", career.challengesIntro, createBulletList(career.challenges));
  const skills = createAccordion("🎯 HABILIDADES A DESENVOLVER", career.skillsIntro, createSkillList(career.skills));
  const professionQuery = encodeURIComponent(career.name);

  return `
    <article class="profession-result" data-career-index="${index}">
      <div class="profession-result-header">
        <div class="profession-heading">
          <p class="eyebrow">PROFISSÃO RECOMENDADA · 0${index + 1}</p>
          <h2>${career.name}</h2>
          <p>${career.shortDescription}</p>
        </div>
      </div>

      <div class="profession-overview">
        <section class="profile-about">
          <p class="eyebrow">SOBRE ESTA PROFISSÃO</p>
          <h3>Onde seu perfil encontra essa carreira</h3>
          <p>${career.intro}</p>
        </section>

        <aside class="profession-side">
          <div class="profession-photo-frame" role="img" aria-label="Espaço reservado para uma foto de ${career.name}">
            <div class="photo-placeholder-mark" aria-hidden="true">✦</div>
            <span>ADICIONE A FOTO DA PROFISSÃO</span>
            <small>${career.name}</small>
          </div>
          <div class="rpg-material-card">
            <p class="eyebrow">EXPERIÊNCIA INTERATIVA</p>
            <h3>Materiais RPG da sua Profissão</h3>
            <p>Leve esta carreira para uma aventura e experimente desafios inspirados na área.</p>
            <a class="btn primary rpg-profession-link" href="rpg.html?profissao=${professionQuery}">ACESSAR MATERIAIS RPG <span aria-hidden="true">↗</span></a>
          </div>
        </aside>
      </div>

      <div class="career-accordions">
        ${recommended}
        ${strengths}
        ${challenges}
        ${skills}
      </div>
    </article>
  `;
}

function setupAccordions() {
  document.querySelectorAll(".accordion-trigger").forEach(trigger => {
    trigger.addEventListener("click", () => {
      const panel = trigger.nextElementSibling;
      const expanded = trigger.getAttribute("aria-expanded") === "true";

      trigger.setAttribute("aria-expanded", String(!expanded));
      panel.hidden = expanded;

      // A seta é desenhada por CSS; aria-expanded controla sua rotação.
      // Isso evita deslocamentos do glifo ao abrir/fechar o acordeão.
    });
  });
}

const raw = localStorage.getItem("ordemVocacionalResult");

if (!raw) {
  window.location.href = "teste.html";
} else {
  try {
    const result = JSON.parse(raw);
    const profile = profiles[result.winner] || profiles.tecnologia;
    const score = result.scores[result.winner] || 0;
    const total = Number(result.total) || 1;
    const percentage = Math.round((score / total) * 100);

    document.getElementById("resultTitle").textContent = profile.name;
    document.getElementById("resultSubtitle").textContent = profile.subtitle;
    document.getElementById("profileName").textContent = profile.title;
    document.getElementById("profileDescription").textContent = buildProfileAnalysis(profile, result);
    document.getElementById("resultIcon").textContent = profile.icon;
    document.getElementById("scoreValue").textContent = `${percentage}%`;

    setTimeout(() => {
      document.getElementById("scoreFill").style.width = `${percentage}%`;
    }, 150);

    const careerList = document.getElementById("careerList");
    careerList.innerHTML = profile.careers.map((career, index) => createCareer(career, index)).join("");

    setupAccordions();
  } catch (error) {
    console.error("Não foi possível carregar o resultado:", error);
    window.location.href = "teste.html";
  }
}

function createCareer(career, index) {
  return renderCareer(career, index);
}
