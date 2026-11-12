/* Seletor de profissão (criação de personagem) — versão compacta:
   abas por área + só as profissões da área aberta. Usa botões de opção (radio) reais,
   então funciona com teclado, leitor de tela e vai junto com o formulário. */
(() => {
  "use strict";
  const data = window.OV_ASSETS && window.OV_ASSETS.areasProfissoes;
  const root = document.getElementById("professionGroups");
  if (!data || !root) return;
  const label = document.getElementById("professionSelected");

  const tabs = document.createElement("div");
  tabs.className = "profession-tabs"; tabs.setAttribute("role", "tablist"); tabs.setAttribute("aria-label", "Áreas profissionais");
  const panels = document.createElement("div"); panels.className = "profession-panels";
  const tabEls = [], panelEls = [];

  data.forEach((area, i) => {
    const tab = document.createElement("button");
    tab.type = "button"; tab.className = "profession-tab"; tab.id = `profTab-${area.id}`;
    tab.setAttribute("role", "tab"); tab.setAttribute("aria-controls", `profPanel-${area.id}`);
    const ic = document.createElement("span"); ic.className = "profession-tab-icon"; ic.setAttribute("aria-hidden", "true"); ic.textContent = area.icone;
    const tx = document.createElement("span"); tx.textContent = area.titulo;
    const dot = document.createElement("span"); dot.className = "profession-tab-dot"; dot.setAttribute("aria-hidden", "true");
    tab.append(ic, tx, dot);
    tab.addEventListener("click", () => activate(i, false));
    tab.addEventListener("keydown", e => {
      const k = e.key; let n = null;
      if (k === "ArrowRight") n = (i + 1) % data.length; else if (k === "ArrowLeft") n = (i - 1 + data.length) % data.length;
      else if (k === "Home") n = 0; else if (k === "End") n = data.length - 1;
      if (n !== null) { e.preventDefault(); activate(n, true); }
    });
    tabs.append(tab); tabEls.push(tab);

    const panel = document.createElement("div");
    panel.className = "profession-options"; panel.id = `profPanel-${area.id}`;
    panel.setAttribute("role", "tabpanel"); panel.setAttribute("aria-labelledby", tab.id);
    area.itens.forEach(nome => {
      const lab = document.createElement("label"); lab.className = "profession-option";
      const input = document.createElement("input"); input.type = "radio"; input.name = "profession"; input.value = nome;
      const box = document.createElement("span"); box.className = "profession-option-box";
      const txt = document.createElement("span"); txt.className = "profession-option-name"; txt.textContent = nome;
      const check = document.createElement("span"); check.className = "profession-option-check"; check.setAttribute("aria-hidden", "true"); check.textContent = "✓";
      box.append(txt, check); lab.append(input, box); panel.append(lab);
    });
    panels.append(panel); panelEls.push(panel);
  });
  root.append(tabs, panels);

  let active = 0;
  function activate(i, focusTab) {
    active = i;
    tabEls.forEach((t, k) => { const on = k === i; t.classList.toggle("is-active", on); t.setAttribute("aria-selected", String(on)); t.tabIndex = on ? 0 : -1; });
    panelEls.forEach((p, k) => { p.hidden = k !== i; });
    if (focusTab) tabEls[i].focus();
  }

  const radios = () => [...root.querySelectorAll('input[name="profession"]')];
  function refresh() {
    const sel = radios().find(r => r.checked);
    label.classList.remove("has-error");
    label.textContent = sel ? `Profissão escolhida: ${sel.value}` : "Nenhuma profissão escolhida";
    label.classList.toggle("has-value", !!sel);
    data.forEach((area, k) => tabEls[k].classList.toggle("has-selection", !!sel && area.itens.includes(sel.value)));
  }
  root.addEventListener("change", refresh);
  const form = root.closest("form");
  if (form) form.addEventListener("reset", () => setTimeout(() => { refresh(); activate(0, false); }, 0));

  window.OVProfessionPicker = {
    set(valor) {
      radios().forEach(r => { r.checked = r.value === valor; });
      const k = data.findIndex(a => a.itens.includes(valor));
      activate(k >= 0 ? k : 0, false); refresh();
    },
    validate() {
      if (radios().some(r => r.checked)) return true;
      label.textContent = "Escolha uma profissão para continuar";
      label.classList.add("has-error");
      const first = panelEls[active].querySelector("input");
      if (first) first.focus({ preventScroll: false });
      label.scrollIntoView({ block: "center", behavior: "smooth" });
      return false;
    }
  };
  activate(0, false); refresh();
})();
