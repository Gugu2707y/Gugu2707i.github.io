/* Materiais do RPG: monta os cartões dos 30 personagens (com descrição,
   ampliação e download) a partir de js/assets-data.js. */
(() => {
  "use strict";
  const data = window.OV_ASSETS;
  const grid = document.getElementById("personagensGrid");
  if (!data || !grid) return;

  const pad = n => String(n).padStart(2, "0");
  const slug = s => s.replace(/[()]/g, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "");
  const originalOf = item => encodeURI(data.pasta + item.file);
  const downloadName = item => `Personagem-${pad(item.n)}-${slug(item.name)}.png`;

  /* ---------- cartões ---------- */
  grid.replaceChildren();
  data.personagens.forEach(item => {
    const card = document.createElement("article");
    card.className = "asset-card";

    const open = document.createElement("button");
    open.type = "button";
    open.className = "asset-card-image";
    open.setAttribute("aria-label", `Ampliar ${item.name}`);
    const img = document.createElement("img");
    img.src = encodeURI(data.pasta + item.thumb);
    img.alt = `${item.name}: ${item.desc}`;
    img.loading = "lazy";
    img.decoding = "async";
    const num = document.createElement("span");
    num.className = "asset-card-number";
    num.textContent = pad(item.n);
    open.append(img, num);
    open.addEventListener("click", () => openLightbox(item, open));

    const body = document.createElement("div");
    body.className = "asset-card-body";
    const area = document.createElement("span");
    area.className = "asset-card-area";
    area.textContent = item.area;
    const title = document.createElement("h4");
    title.textContent = item.name;
    const desc = document.createElement("p");
    desc.textContent = item.desc;
    const dl = document.createElement("a");
    dl.className = "asset-card-download";
    dl.href = originalOf(item);
    dl.download = downloadName(item);
    dl.textContent = "↓ Baixar imagem";
    dl.setAttribute("aria-label", `Baixar imagem: ${item.name}`);
    body.append(area, title, desc, dl);

    card.append(open, body);
    grid.append(card);
  });

  /* ---------- ampliação ---------- */
  const modal = document.getElementById("assetLightbox");
  if (!modal) return;
  const stage = document.getElementById("lightboxStage");
  const title = document.getElementById("lightboxTitle");
  const area = document.getElementById("lightboxArea");
  const desc = document.getElementById("lightboxDesc");
  const download = document.getElementById("lightboxDownload");
  let lastFocus = null;

  function openLightbox(item, trigger) {
    lastFocus = trigger || document.activeElement;
    title.textContent = item.name;
    area.textContent = `PERSONAGEM ${pad(item.n)} · ${item.area.toUpperCase()}`;
    desc.textContent = item.desc;
    const big = document.createElement("img");
    big.src = originalOf(item);          // original em alta resolução
    big.alt = item.name;
    big.onerror = () => { big.onerror = null; big.src = encodeURI(data.pasta + item.thumb); };
    stage.replaceChildren(big);
    download.href = originalOf(item);
    download.download = downloadName(item);
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    modal.querySelector(".asset-modal-close").focus();
  }
  function closeLightbox() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    stage.replaceChildren();
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }
  modal.querySelectorAll("[data-close-lightbox]").forEach(el => el.addEventListener("click", closeLightbox));
  document.addEventListener("keydown", e => {
    if (!modal.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "Tab") {
      const f = [...modal.querySelectorAll("button, a[href]")];
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
})();
