/* =========================================================
   WIDGET DE ACESSIBILIDADE — ORDEM VOCACIONAL
   Basta incluir em cada página (antes de </body>):
     <script src="js/acessibilidade.js" defer></script>
   O script cria o botão/painel sozinho e lembra as escolhas
   da pessoa (localStorage) entre as páginas.
   ========================================================= */
(() => {
  "use strict";
  if (window.__ovA11yLoaded) return;
  window.__ovA11yLoaded = true;

  const KEY_FONT = "ovA11yFontStep";
  const KEY_FOCUS = "ovA11yFocus";
  // Escala ampla: de 80% até 250%
  const STEPS = [80, 90, 100, 110, 125, 150, 175, 200, 225, 250];
  const DEFAULT_STEP = STEPS.indexOf(100);
  const MASK_HEIGHT = 150; // altura da faixa de leitura (px)

  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : v; } catch (_) { return d; } },
    set(k, v) { try { localStorage.setItem(k, String(v)); } catch (_) {} }
  };

  const html = document.documentElement;

  /* ---------- aplica o que foi salvo o quanto antes (evita "pulo" visual) ---------- */
  let step = parseInt(store.get(KEY_FONT, DEFAULT_STEP), 10);
  if (!Number.isInteger(step) || step < 0 || step >= STEPS.length) step = DEFAULT_STEP;
  let focusOn = store.get(KEY_FOCUS, "false") === "true";

  function applyFont() {
    const pct = STEPS[step];
    html.style.setProperty("--ov-fs", String(pct / 100));
    html.classList.toggle("ov-font-scaled", pct !== 100);
    store.set(KEY_FONT, step);
  }
  applyFont();
  html.classList.toggle("ov-focus-mode", focusOn);

  function build() {
    if (document.getElementById("ov-a11y")) return;

    const root = document.createElement("div");
    root.id = "ov-a11y";
    root.innerHTML = `
      <button id="ov-a11y-button" type="button" aria-label="Abrir opções de acessibilidade"
        aria-expanded="false" aria-controls="ov-a11y-panel" title="Acessibilidade">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"
          stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M1.5 12S5.5 4.5 12 4.5 22.5 12 22.5 12 18.5 19.5 12 19.5 1.5 12 1.5 12Z"/>
          <circle cx="12" cy="12" r="3.2"/>
        </svg>
      </button>

      <section id="ov-a11y-panel" role="dialog" aria-label="Opções de acessibilidade" hidden>
        <header class="ov-a11y-head">
          <div><span>ORDEM VOCACIONAL</span><h2>Acessibilidade</h2></div>
          <button id="ov-a11y-close" type="button" aria-label="Fechar painel">×</button>
        </header>

        <div class="ov-a11y-sec">
          <h3>Tamanho da letra</h3>
          <p>Aumente bastante o texto do site ou diminua se preferir.</p>
          <div class="ov-a11y-font">
            <button id="ov-a11y-minus" type="button" aria-label="Diminuir letra">A−</button>
            <strong id="ov-a11y-fontvalue" aria-live="polite">100%</strong>
            <button id="ov-a11y-plus" type="button" aria-label="Aumentar letra">A+</button>
          </div>
          <div class="ov-a11y-bar" aria-hidden="true"><i id="ov-a11y-bar"></i></div>
          <button id="ov-a11y-reset" type="button">Restaurar padrão</button>
        </div>

        <div class="ov-a11y-div"></div>

        <div class="ov-a11y-sec">
          <div class="ov-a11y-focusrow">
            <div>
              <h3>Modo Foco / TDAH</h3>
              <p>Mais espaço entre linhas, faixa de leitura e menos elementos chamativos.</p>
            </div>
            <label class="ov-a11y-switch">
              <input type="checkbox" id="ov-a11y-focus" role="switch" aria-label="Ativar Modo Foco / TDAH">
              <span class="ov-a11y-slider"></span>
            </label>
          </div>
          <span id="ov-a11y-focusstatus" aria-live="polite">Modo Foco desativado</span>
        </div>
      </section>`;
    document.body.appendChild(root);

    // máscara de leitura
    const maskTop = document.createElement("div");
    maskTop.id = "ov-mask-top"; maskTop.className = "ov-mask"; maskTop.setAttribute("aria-hidden", "true");
    const maskBottom = document.createElement("div");
    maskBottom.id = "ov-mask-bottom"; maskBottom.className = "ov-mask"; maskBottom.setAttribute("aria-hidden", "true");
    document.body.append(maskTop, maskBottom);

    const $ = id => document.getElementById(id);
    const button = $("ov-a11y-button"), panel = $("ov-a11y-panel"), closeBtn = $("ov-a11y-close");
    const plus = $("ov-a11y-plus"), minus = $("ov-a11y-minus"), reset = $("ov-a11y-reset");
    const value = $("ov-a11y-fontvalue"), bar = $("ov-a11y-bar");
    const focus = $("ov-a11y-focus"), status = $("ov-a11y-focusstatus");

    function renderFont() {
      value.textContent = STEPS[step] + "%";
      bar.style.width = (step / (STEPS.length - 1)) * 100 + "%";
      minus.disabled = step === 0;
      plus.disabled = step === STEPS.length - 1;
    }
    function setStep(n) {
      step = Math.max(0, Math.min(STEPS.length - 1, n));
      applyFont(); renderFont();
    }

    /* ---------- máscara de leitura ---------- */
    function moveMask(y) {
      const half = MASK_HEIGHT / 2;
      const top = Math.max(0, y - half);
      const bottom = Math.max(0, window.innerHeight - (y + half));
      maskTop.style.height = top + "px";
      maskBottom.style.height = bottom + "px";
    }
    let maskY = window.innerHeight / 2;
    function onMouse(e) { maskY = e.clientY; moveMask(maskY); }
    function onTouch(e) { if (e.touches[0]) { maskY = e.touches[0].clientY; moveMask(maskY); } }
    function onFocusIn(e) {
      if (root.contains(e.target)) return;
      const r = e.target.getBoundingClientRect();
      maskY = r.top + r.height / 2; moveMask(maskY);
    }
    function onResize() { moveMask(maskY); }
    function bindMask(on) {
      const m = on ? "addEventListener" : "removeEventListener";
      document[m]("mousemove", onMouse, { passive: true });
      document[m]("touchmove", onTouch, { passive: true });
      document[m]("touchstart", onTouch, { passive: true });
      document[m]("focusin", onFocusIn);
      window[m]("resize", onResize);
    }

    function setFocus(on) {
      focusOn = on;
      html.classList.toggle("ov-focus-mode", on);
      focus.checked = on;
      status.textContent = on ? "Modo Foco ativado" : "Modo Foco desativado";
      bindMask(false);
      if (on) { bindMask(true); moveMask(maskY); }
      store.set(KEY_FOCUS, on);
    }

    /* ---------- painel ---------- */
    function openPanel() { panel.hidden = false; button.setAttribute("aria-expanded", "true"); button.setAttribute("aria-label", "Fechar opções de acessibilidade"); }
    function closePanel(returnFocus) {
      panel.hidden = true; button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Abrir opções de acessibilidade");
      if (returnFocus) button.focus();
    }

    button.addEventListener("click", () => (panel.hidden ? openPanel() : closePanel(false)));
    closeBtn.addEventListener("click", () => closePanel(true));
    plus.addEventListener("click", () => setStep(step + 1));
    minus.addEventListener("click", () => setStep(step - 1));
    reset.addEventListener("click", () => { setStep(DEFAULT_STEP); });
    focus.addEventListener("change", () => setFocus(focus.checked));
    document.addEventListener("keydown", e => { if (e.key === "Escape" && !panel.hidden) closePanel(true); });
    document.addEventListener("click", e => { if (!panel.hidden && !root.contains(e.target)) closePanel(false); });

    renderFont();
    setFocus(focusOn);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
  else build();
})();
