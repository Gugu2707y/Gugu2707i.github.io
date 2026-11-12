/* Seletor de profissão (criação de personagem): grupos por área, cartões selecionáveis.
   Usa botões de opção (radio) reais: funciona com teclado, leitor de tela e validação do formulário. */
(() => {
  "use strict";
  const data = window.OV_ASSETS && window.OV_ASSETS.areasProfissoes;
  const groups = document.getElementById("professionGroups");
  if (!data || !groups) return;
  const label = document.getElementById("professionSelected");
  let first = true;

  data.forEach(area => {
    const sec = document.createElement("div");
    sec.className = "profession-group";
    const head = document.createElement("div");
    head.className = "profession-group-head";
    const icon = document.createElement("span"); icon.className = "profession-group-icon"; icon.setAttribute("aria-hidden", "true"); icon.textContent = area.icone;
    const title = document.createElement("strong"); title.textContent = area.titulo;
    head.append(icon, title);
    const list = document.createElement("div"); list.className = "profession-options";
    area.itens.forEach(nome => {
      const lab = document.createElement("label"); lab.className = "profession-option";
      const input = document.createElement("input");
      input.type = "radio"; input.name = "profession"; input.value = nome;
      if (first) { input.required = true; first = false; }
      const box = document.createElement("span"); box.className = "profession-option-box";
      const txt = document.createElement("span"); txt.className = "profession-option-name"; txt.textContent = nome;
      const check = document.createElement("span"); check.className = "profession-option-check"; check.setAttribute("aria-hidden", "true"); check.textContent = "✓";
      box.append(txt, check);
      lab.append(input, box);
      list.append(lab);
    });
    sec.append(head, list);
    groups.append(sec);
  });

  const radios = () => [...groups.querySelectorAll('input[name="profession"]')];
  function refresh() {
    const sel = radios().find(r => r.checked);
    label.textContent = sel ? `Profissão escolhida: ${sel.value}` : "Nenhuma profissão escolhida";
    label.classList.toggle("has-value", !!sel);
  }
  groups.addEventListener("change", refresh);
  const form = groups.closest("form");
  if (form) form.addEventListener("reset", () => setTimeout(refresh, 0));

  window.OVProfessionPicker = {
    set(valor) { radios().forEach(r => { r.checked = r.value === valor; }); refresh(); }
  };
})();
