(() => {
  "use strict";
  const modal = document.getElementById("mapPreviewModal");
  const title = document.getElementById("mapPreviewTitle");
  const stage = document.getElementById("mapPreviewStage");
  const download = document.getElementById("downloadMapButton");
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
    title.textContent = `Mapa ${String(number).padStart(2, "0")}`;
    stage.replaceChildren();
    if (img && img.getAttribute("src")) {
      const preview = document.createElement("img");
      preview.src = img.getAttribute("src");
      preview.alt = img.alt || `Imagem ampliada do mapa ${number}`;
      stage.append(preview);
      download.href = img.getAttribute("src");
      download.download = img.dataset.filename || `mapa-${String(number).padStart(2, "0")}`;
      download.classList.remove("is-disabled");
      download.removeAttribute("aria-disabled");
      download.tabIndex = 0;
    } else {
      const empty = document.createElement("div");
      empty.className = "map-preview-empty";
      const plus = document.createElement("span"); plus.textContent = "+";
      const message = document.createElement("p"); message.textContent = "Espaço reservado para a imagem do mapa.";
      const note = document.createElement("small"); note.textContent = "Adicione uma imagem ao cartão correspondente para habilitar a visualização ampla e o download.";
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
