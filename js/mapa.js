(() => {
  "use strict";
  const modal = document.getElementById("mapPreviewModal");
  const title = document.getElementById("mapPreviewTitle");
  const stage = document.getElementById("mapPreviewStage");
  const download = document.getElementById("downloadMapButton");
  const D = window.OV_ASSETS || {};
  const pad = n => String(n).padStart(2, "0");
  const slug = v => v.replace(/[()]/g, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "");

  // Monta os 13 cartões a partir de js/assets-data.js (lista "mapas").
  const grid = document.getElementById("mapAssetsGrid");
  if (grid && Array.isArray(D.mapas)) {
    grid.replaceChildren(...D.mapas.map(item => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "map-asset-card";
      card.dataset.mapNumber = String(item.n);
      card.setAttribute("aria-label", `Ampliar ${item.name}`);

      const number = document.createElement("span");
      number.className = "map-asset-number"; number.textContent = pad(item.n);

      const holder = document.createElement("span");
      holder.className = "map-asset-placeholder";
      if (item.file) {
        const img = document.createElement("img");
        img.src = encodeURI(D.pastaMapas + (item.thumb || item.file));       // tela: miniatura
        img.dataset.original = encodeURI(D.pastaMapas + item.file);          // ampliar e baixar: original
        img.alt = item.desc ? `${item.name}: ${item.desc}` : item.name;
        img.dataset.filename = `Mapa-${pad(item.n)}-${slug(item.name)}${(item.file.match(/\.[a-zA-Z0-9]+$/) || [".png"])[0]}`;
        img.loading = "lazy"; img.decoding = "async";
        holder.append(img);
      } else {
        holder.setAttribute("role", "img");
        holder.setAttribute("aria-label", `${item.name}: imagem em breve`);
        const plus = document.createElement("span"); plus.className = "map-asset-plus"; plus.setAttribute("aria-hidden", "true"); plus.textContent = "+";
        const label = document.createElement("span"); label.className = "map-asset-empty-label"; label.textContent = "Imagem em breve";
        holder.append(plus, label);
      }

      const footer = document.createElement("span");
      footer.className = "map-asset-footer";
      const name = document.createElement("strong"); name.textContent = item.name;
      const action = document.createElement("span"); action.textContent = item.file ? "Visualizar ↗" : "Em breve";
      footer.append(name, action);
      if (item.desc) {
        const d = document.createElement("small"); d.className = "map-asset-desc"; d.textContent = item.desc;
        card.append(number, holder, footer, d);
      } else card.append(number, holder, footer);
      return card;
    }));
  }
  const cards = [...document.querySelectorAll("[data-map-number]")];
  let lastFocus = null;

  function imageForCard(card) {
    // Para inserir um mapa, adicione um <img src="assets/mapas/mapa-01.jpg"> dentro de .map-asset-placeholder.
    return card.querySelector(".map-asset-placeholder img");
  }
  function openMap(card) {
    const number = Number(card.dataset.mapNumber);
    const img = imageForCard(card);
    lastFocus = document.activeElement;
    const info = (D.mapas || []).find(m => m.n === number);
    title.textContent = info ? info.name : `Mapa ${pad(number)}`;
    stage.replaceChildren();
    if (img && img.getAttribute("src")) {
      const preview = document.createElement("img");
      const original = img.dataset.original || img.getAttribute("src");
      preview.src = original;
      preview.alt = img.alt || `Imagem ampliada do mapa ${number}`;
      stage.append(preview);
      download.href = original;
      download.download = img.dataset.filename || `mapa-${String(number).padStart(2, "0")}`;
      download.classList.remove("is-disabled");
      download.removeAttribute("aria-disabled");
      download.tabIndex = 0;
    } else {
      const empty = document.createElement("div");
      empty.className = "map-preview-empty";
      const plus = document.createElement("span"); plus.textContent = "+";
      const message = document.createElement("p"); message.textContent = "A imagem deste mapa será adicionada em breve.";
      const note = document.createElement("small"); note.textContent = "Quando a imagem for registrada, a visualização ampla e o download ficam disponíveis.";
      empty.append(plus, message, note); stage.append(empty);
      download.href = "#"; download.removeAttribute("download");
      download.classList.add("is-disabled"); download.setAttribute("aria-disabled", "true"); download.tabIndex = -1;
    }
    modal.classList.add("is-open"); modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    modal.querySelector("[data-close-map-modal]")?.focus();
  }
  function closeMap() {
    modal.classList.remove("is-open"); modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }
  cards.forEach(card => card.addEventListener("click", () => openMap(card)));
  modal.querySelectorAll("[data-close-map-modal]").forEach(button => button.addEventListener("click", closeMap));
  document.addEventListener("keydown", event => {
    if (!modal.classList.contains("is-open")) return;
    if (event.key === "Escape") closeMap();
    if (event.key === "Tab") {
      const focusable = [...modal.querySelectorAll('button:not([disabled]),a[href]:not([aria-disabled="true"])')];
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
})();
