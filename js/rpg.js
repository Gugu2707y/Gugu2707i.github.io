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
      traits: String(data.get("traits") || "").trim(),
      avatar: currentAvatarIndex
    };
  }

  let currentAvatarIndex = null;

  // Para adicionar as imagens futuramente, informe o caminho no índice correspondente.
  // Exemplo: AVATAR_IMAGES[1] = "assets/personagens/personagem-01.png".
 const AVATAR_IMAGES = Array.from(
  { length: 30 },
  (_, index) =>
    `assets/personagens/personagem-${String(index + 1).padStart(2, "0")}.png`
);
);

  function avatarImageFor(index) {
    return Number.isInteger(index) && index >= 1 && index <= 30 ? AVATAR_IMAGES[index - 1] : null;
  }

  function paintAvatar(target, index, compact = false) {
    if (!target) return;
    target.replaceChildren();
    const imagePath = avatarImageFor(index);
    if (imagePath) {
      const image = document.createElement("img");
      image.src = imagePath;
      image.alt = `Retrato ${index} do personagem`;
      image.loading = "lazy";
      image.onerror = () => {
        target.replaceChildren();
        target.textContent = compact ? "+" : "";
        if (!compact) target.classList.add("is-empty");
      };
      target.appendChild(image);
      target.classList.remove("is-empty");
    } else if (index) {
      target.classList.remove("is-empty");
      const number = document.createElement("span");
      number.className = compact ? "avatar-option-number" : "avatar-plus";
      number.textContent = compact ? String(index).padStart(2, "0") : String(index).padStart(2, "0");
      target.appendChild(number);
      if (!compact) {
        const label = document.createElement("span");
        label.className = "avatar-prompt";
        label.textContent = "RETRATO SELECIONADO";
        target.appendChild(label);
      }
    } else {
      target.classList.add("is-empty");
      if (compact) target.textContent = "+";
      else {
        const plus = document.createElement("span"); plus.className = "avatar-plus"; plus.textContent = "+";
        const label = document.createElement("span"); label.className = "avatar-prompt"; label.textContent = "ADICIONAR FOTO";
        target.append(plus, label);
      }
    }
  }

  function renderCharacter(character) {
    if (!character) return;
    currentAvatarIndex = character.avatar != null && Number.isInteger(Number(character.avatar)) && Number(character.avatar) >= 1 && Number(character.avatar) <= 30 ? Number(character.avatar) : null;
    paintAvatar($("#characterAvatarPreview"), currentAvatarIndex);
    paintAvatar($("#sheetAvatarMini"), currentAvatarIndex, true);
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
      if (saved.name) renderCharacter(saved);
      else if (saved.avatar) {
        currentAvatarIndex = Number(saved.avatar);
        paintAvatar($("#characterAvatarPreview"), currentAvatarIndex);
        paintAvatar($("#sheetAvatarMini"), currentAvatarIndex, true);
      }
    } catch (error) {
      console.warn("Não foi possível carregar a ficha salva.", error);
    }
  }

  function setupAvatarPicker() {
    const modal = $("#avatarPickerModal");
    const dialog = $(".avatar-modal", modal || document);
    const grid = $("#avatarOptionsGrid");
    const trigger = $("#characterAvatarTrigger");
    const closeButton = $("#closeAvatarModal");
    const status = $("#avatarSelectionStatus");
    const removeButton = $("#removeCharacterAvatar");
    if (!modal || !grid || !trigger) return;

    let lastFocusedElement = null;
    for (let index = 1; index <= 30; index += 1) {
      const option = document.createElement("button");
      option.type = "button";
      option.className = "avatar-option";
      option.dataset.avatarIndex = String(index);
      option.setAttribute("aria-label", `Selecionar retrato ${index}`);
      option.setAttribute("aria-pressed", "false");
      const visual = document.createElement("span"); visual.className = "avatar-option-visual";
      const imagePath = avatarImageFor(index);
      if (imagePath) {
        const image = document.createElement("img"); image.src = imagePath; image.alt = ""; image.loading = "lazy";
        image.onerror = () => image.remove();
        visual.appendChild(image);
      }
      const number = document.createElement("span"); number.className = "avatar-option-number"; number.textContent = String(index).padStart(2, "0");
      const label = document.createElement("span"); label.className = "avatar-option-label"; label.textContent = imagePath ? "RETRATO" : "OPÇÃO";
      const check = document.createElement("span"); check.className = "avatar-option-check"; check.textContent = "✓"; check.setAttribute("aria-hidden", "true");
      visual.append(number, label);
      option.append(visual, check);
      option.addEventListener("click", () => {
        currentAvatarIndex = index;
        paintAvatar($("#characterAvatarPreview"), index);
        paintAvatar($("#sheetAvatarMini"), index, true);
        $$(".avatar-option", grid).forEach(item => item.setAttribute("aria-pressed", String(Number(item.dataset.avatarIndex) === index)));
        if (status) status.textContent = `Retrato ${index} selecionado.`;
        const saved = (() => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); } catch { return null; } })();
        if (saved && saved.name) {
          saved.avatar = index;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
        }
        closeModal();
      });
      grid.appendChild(option);
    }

    function openModal() {
      lastFocusedElement = document.activeElement;
      modal.hidden = false;
      document.body.classList.add("avatar-modal-open");
      const selected = grid.querySelector(`[data-avatar-index="${currentAvatarIndex || ""}"]`);
      (selected || closeButton || dialog)?.focus();
    }
    function closeModal() {
      modal.hidden = true;
      document.body.classList.remove("avatar-modal-open");
      if (lastFocusedElement && typeof lastFocusedElement.focus === "function") lastFocusedElement.focus();
    }

    trigger.addEventListener("click", openModal);
    closeButton?.addEventListener("click", closeModal);
    modal.addEventListener("click", event => { if (event.target === modal) closeModal(); });
    document.addEventListener("keydown", event => {
      if (modal.hidden) return;
      if (event.key === "Escape") { event.preventDefault(); closeModal(); }
      if (event.key === "Tab") {
        const focusables = $$('button:not([disabled])', dialog).filter(el => el.offsetParent !== null);
        if (!focusables.length) return;
        const first = focusables[0], last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    });
    removeButton?.addEventListener("click", () => {
      currentAvatarIndex = null;
      paintAvatar($("#characterAvatarPreview"), null);
      paintAvatar($("#sheetAvatarMini"), null, true);
      $$(".avatar-option", grid).forEach(item => item.setAttribute("aria-pressed", "false"));
      if (status) status.textContent = "Foto removida.";
      try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
        if (saved) { saved.avatar = null; localStorage.setItem(STORAGE_KEY, JSON.stringify(saved)); }
      } catch (error) { console.warn("Não foi possível atualizar a foto salva.", error); }
      closeModal();
    });
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
    setupAvatarPicker();
    setupQuickNavigation();
    setupMaterialDownloads();
    loadSavedCharacter();
  });
})();
