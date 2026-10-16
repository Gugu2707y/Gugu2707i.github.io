(() => {
  "use strict";

  const STORAGE_KEY = "ordemVocacionalRpgPersonagem";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  function activateTab(tabName, shouldScroll = false) {
    const tabs = $$(".rpg-tab");
    const panels = $$(".rpg-panel");
    const targetPanel = $(`.rpg-panel[data-panel="${tabName}"]`);

    if (!targetPanel) return;

    tabs.forEach(tab => {
      const active = tab.dataset.tab === tabName;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });

    panels.forEach(panel => {
      const active = panel.dataset.panel === tabName;
      panel.classList.toggle("active", active);
      panel.hidden = !active;
    });

    history.replaceState(null, "", `#${tabName}`);

    if (shouldScroll) {
      document.querySelector(".rpg-workspace")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function setupTabs() {
    $$(".rpg-tab").forEach(tab => {
      tab.addEventListener("click", () => activateTab(tab.dataset.tab));
      tab.addEventListener("keydown", event => {
        if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;

        const tabs = $$(".rpg-tab");
        const currentIndex = tabs.indexOf(tab);
        let nextIndex = currentIndex;

        if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabs.length;
        if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = tabs.length - 1;

        event.preventDefault();
        tabs[nextIndex].focus();
        activateTab(tabs[nextIndex].dataset.tab);
      });
    });

    const initialTab = window.location.hash.replace("#", "");
    const validTab = $(`.rpg-tab[data-tab="${initialTab}"]`);
    if (validTab) activateTab(initialTab);
  }

  function setupAccordions() {
    $$(".rpg-accordion-trigger").forEach(trigger => {
      trigger.addEventListener("click", () => {
        const accordion = trigger.closest(".rpg-accordion");
        const content = $(".rpg-accordion-content", accordion);
        const isOpen = trigger.getAttribute("aria-expanded") === "true";

        trigger.setAttribute("aria-expanded", String(!isOpen));
        accordion.classList.toggle("open", !isOpen);

        if (!isOpen) {
          content.style.maxHeight = `${content.scrollHeight}px`;
        } else {
          content.style.maxHeight = "0px";
        }
      });
    });
  }

  function rollD6() {
    const result = Math.floor(Math.random() * 6) + 1;
    const resultElements = $$("#diceResult");

    resultElements.forEach(element => {
      element.classList.remove("dice-pop");
      void element.offsetWidth;
      element.textContent = result;
      element.classList.add("dice-pop");
    });

    return result;
  }

  function setupDice() {
    $("#rollD6")?.addEventListener("click", rollD6);

    $$('[data-roll-d6]').forEach(button => {
      button.addEventListener("click", () => {
        activateTab("personagem", true);
        setTimeout(rollD6, 350);
      });
    });
  }

  function readCharacterForm() {
    const form = $("#characterForm");
    if (!form) return null;

    const data = new FormData(form);
    return {
      name: String(data.get("name") || "").trim(),
      age: String(data.get("age") || "").trim(),
      profession: String(data.get("profession") || "").trim(),
      traits: String(data.get("traits") || "").trim()
    };
  }

  function renderCharacter(character) {
    if (!character) return;

    $("#sheetTitle").textContent = character.name.toUpperCase();
    $("#sheetName").textContent = character.name;
    $("#sheetAge").textContent = character.age;
    $("#sheetProfession").textContent = character.profession;
    $("#sheetTraits").textContent = character.traits;
  }

  function setupCharacterForm() {
    const form = $("#characterForm");
    const status = $("#characterStatus");
    if (!form) return;

    form.addEventListener("submit", event => {
      event.preventDefault();

      if (!form.reportValidity()) return;

      const character = readCharacterForm();
      if (!character) return;

      localStorage.setItem(STORAGE_KEY, JSON.stringify(character));
      renderCharacter(character);

      status.textContent = "PERSONAGEM SALVO. A ficha foi atualizada abaixo.";
      status.classList.add("success");

      setTimeout(() => {
        $("#characterSheet")?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    });

    form.addEventListener("reset", () => {
      setTimeout(() => {
        status.textContent = "";
        status.classList.remove("success");
      }, 0);
    });
  }

  function loadSavedCharacter() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (!saved) return;

      $("#characterName").value = saved.name || "";
      $("#characterAge").value = saved.age || "";
      $("#characterProfession").value = saved.profession || "";
      $("#characterTraits").value = saved.traits || "";
      renderCharacter(saved);
    } catch (error) {
      console.warn("Não foi possível carregar a ficha salva.", error);
    }
  }

  function setupQuickNavigation() {
    $$('[data-tab-target]').forEach(button => {
      button.addEventListener("click", () => activateTab(button.dataset.tabTarget, true));
    });

    $$('[data-scroll-tab]').forEach(button => {
      button.addEventListener("click", () => activateTab(button.dataset.scrollTab, true));
    });
  }

  function setupMaterialDownloads() {
    $$('[data-download]').forEach(button => {
      button.addEventListener("click", () => {
        const name = button.dataset.download;
        const materialNames = {
          "ficha-personagem": "Ficha de Personagem",
          "guia-rpg": "Guia Rápido do RPG",
          "cartas-missao": "Cartas de Missão",
          "mapa-profissoes": "Mapa de Profissões"
        };

        const material = materialNames[name] || "Material";
        const text = `ORDEM VOCACIONAL — ${material}\n\nEste arquivo é um espaço reservado para o material definitivo do RPG. Substitua este conteúdo pelo PDF ou documento final quando estiver pronto.`;
        const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${name}.txt`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);

        button.textContent = "BAIXADO";
        setTimeout(() => { button.textContent = "BAIXAR"; }, 1500);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    setupTabs();
    setupAccordions();
    setupDice();
    setupCharacterForm();
    setupQuickNavigation();
    setupMaterialDownloads();
    loadSavedCharacter();
  });
})();
