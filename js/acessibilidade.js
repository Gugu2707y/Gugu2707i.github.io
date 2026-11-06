(() => {
  function initOVAccessibility() {
    const root = document.getElementById("ov-accessibility");
    if (!root || root.dataset.initialized === "true") return;
    root.dataset.initialized = "true";

    const button = document.getElementById("ov-accessibility-button");
    const panel = document.getElementById("ov-accessibility-panel");
    const close = document.getElementById("ov-accessibility-close");
    const plus = document.getElementById("ov-font-plus");
    const minus = document.getElementById("ov-font-minus");
    const reset = document.getElementById("ov-font-reset");
    const value = document.getElementById("ov-font-value");
    const focus = document.getElementById("ov-focus-toggle");
    const status = document.getElementById("ov-focus-status");
    if (!button || !panel || !close || !plus || !minus || !reset || !value || !focus || !status) return;

    const MIN = 100, MAX = 150, STEP = 10;
    const storage = {
      get(key, fallback) {
        try { const v = localStorage.getItem(key); return v === null ? fallback : v; }
        catch (_) { return fallback; }
      },
      set(key, val) { try { localStorage.setItem(key, String(val)); } catch (_) {} }
    };

    let fontPercent = Number(storage.get("ovAccessibilityFont", "100"));
    if (!Number.isFinite(fontPercent)) fontPercent = 100;
    fontPercent = Math.max(MIN, Math.min(MAX, fontPercent));

    // Aplica escala ao documento sem reescrever estilos individuais dos elementos.
    function applyFont() {
      fontPercent = Math.max(MIN, Math.min(MAX, fontPercent));
      document.documentElement.style.setProperty("--ov-accessibility-scale", String(fontPercent / 100));
      document.documentElement.classList.add("ov-font-scaled");
      value.textContent = fontPercent + "%";
      storage.set("ovAccessibilityFont", fontPercent);
    }

    function resetFont() {
      fontPercent = 100;
      document.documentElement.classList.remove("ov-font-scaled");
      document.documentElement.style.removeProperty("--ov-accessibility-scale");
      value.textContent = "100%";
      storage.set("ovAccessibilityFont", 100);
    }

    function setFocus(enabled) {
      document.documentElement.classList.toggle("ov-focus-mode", enabled);
      focus.checked = enabled;
      status.textContent = enabled ? "Modo Foco ativado" : "Modo Foco desativado";
      storage.set("ovAccessibilityFocus", enabled);
    }

    function openPanel() {
      panel.hidden = false;
      button.setAttribute("aria-expanded", "true");
    }
    function closePanel() {
      panel.hidden = true;
      button.setAttribute("aria-expanded", "false");
      button.focus();
    }

    button.addEventListener("click", () => panel.hidden ? openPanel() : closePanel());
    close.addEventListener("click", closePanel);
    plus.addEventListener("click", () => { fontPercent += STEP; applyFont(); });
    minus.addEventListener("click", () => { fontPercent -= STEP; applyFont(); });
    reset.addEventListener("click", resetFont);
    focus.addEventListener("change", () => setFocus(focus.checked));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && !panel.hidden) closePanel();
    });
    document.addEventListener("click", event => {
      if (!panel.hidden && !root.contains(event.target)) closePanel();
    });

    applyFont();
    setFocus(storage.get("ovAccessibilityFocus", "false") === "true");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initOVAccessibility);
  } else {
    initOVAccessibility();
  }
})();
