document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("accessibilityToggle");
  const closeButton = document.getElementById("accessibilityClose");
  const panel = document.getElementById("accessibilityPanel");
  const increaseButton = document.getElementById("increaseFont");
  const decreaseButton = document.getElementById("decreaseFont");
  const resetButton = document.getElementById("resetAccessibility");
  const fontSizeValue = document.getElementById("fontSizeValue");
  const focusToggle = document.getElementById("focusModeToggle");
  const focusStatus = document.getElementById("focusStatus");

  if (!toggleButton || !closeButton || !panel || !increaseButton ||
      !decreaseButton || !resetButton || !fontSizeValue ||
      !focusToggle || !focusStatus) return;

  const MIN_FONT = 100;
  const MAX_FONT = 180;
  const FONT_STEP = 10;

  let storedFont = Number(localStorage.getItem("ovFontSize"));
  let fontSize = Number.isFinite(storedFont) && storedFont >= MIN_FONT && storedFont <= MAX_FONT
    ? storedFont : MIN_FONT;

  function updateFontSize() {
    fontSize = Math.max(MIN_FONT, Math.min(MAX_FONT, fontSize));
    document.documentElement.style.fontSize = `${fontSize}%`;
    fontSizeValue.textContent = `${fontSize}%`;
    localStorage.setItem("ovFontSize", String(fontSize));
  }

  function setFocusMode(enabled) {
    document.documentElement.classList.toggle("focus-mode", enabled);
    focusToggle.checked = enabled;
    focusStatus.textContent = enabled ? "Modo Foco ativado" : "Modo Foco desativado";
    localStorage.setItem("ovFocusMode", String(enabled));
  }

  function openPanel() {
    panel.hidden = false;
    toggleButton.setAttribute("aria-expanded", "true");
  }

  function closePanel() {
    panel.hidden = true;
    toggleButton.setAttribute("aria-expanded", "false");
    toggleButton.focus();
  }

  toggleButton.addEventListener("click", () => panel.hidden ? openPanel() : closePanel());
  closeButton.addEventListener("click", closePanel);
  increaseButton.addEventListener("click", () => { fontSize += FONT_STEP; updateFontSize(); });
  decreaseButton.addEventListener("click", () => { fontSize -= FONT_STEP; updateFontSize(); });

  resetButton.addEventListener("click", () => {
    fontSize = MIN_FONT;
    updateFontSize();
    setFocusMode(false);
  });

  focusToggle.addEventListener("change", () => setFocusMode(focusToggle.checked));

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !panel.hidden) closePanel();
  });

  updateFontSize();
  setFocusMode(localStorage.getItem("ovFocusMode") === "true");
});
