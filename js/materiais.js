/* Materiais do RPG: monta os cartões de Personagens, NPCs e Mapas de cenários
   (descrição, ampliação e download) a partir de js/assets-data.js. */
(() => {
  "use strict";
  const data = window.OV_ASSETS;
  if (!data) return;

  const pad = n => String(n).padStart(2, "0");
  const slug = s => s.replace(/[()]/g, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "");
  const extOf = f => (f.match(/\.[a-zA-Z0-9]+$/) || [".png"])[0];

  const GROUPS = [
    { grid: "personagensGrid", list: data.personagens, pasta: data.pasta,       rotulo: "Personagem", label: "PERSONAGEM" },
    { grid: "npcsGrid",        list: data.npcs,        pasta: data.pastaNpcs,   rotulo: "NPC",        label: "NPC" },
    { grid: "mapasGrid",       list: data.mapas,       pasta: data.pastaMapas,  rotulo: "Mapa",       label: "MAPA DE CENÁRIO" }
  ];

  const modal = document.getElementById("assetLightbox");
  const stage = document.getElementById("lightboxStage");
  const mTitle = document.getElementById("lightboxTitle");
  const mArea = document.getElementById("lightboxArea");
  const mDesc = document.getElementById("lightboxDesc");
  const mDownload = document.getElementById("lightboxDownload");
  let lastFocus = null;

  const urlOriginal = (g, item) => encodeURI(g.pasta + item.file);
  const urlThumb = (g, item) => encodeURI(g.pasta + (item.thumb || item.file));
  const nomeArquivo = (g, item) => `${g.rotulo}-${pad(item.n)}-${slug(item.name)}${extOf(item.file)}`;

  function card(g, item) {
    const el = document.createElement("article");
    el.className = "asset-card";
    const has = !!item.file;

    let visual;
    if (has) {
      visual = document.createElement("button");
      visual.type = "button";
      visual.setAttribute("aria-label", `Ampliar ${item.name}`);
      visual.addEventListener("click", () => openLightbox(g, item, visual));
      const img = document.createElement("img");
      img.src = urlThumb(g, item);
      img.alt = item.desc ? `${item.name}: ${item.desc}` : item.name;
      img.loading = "lazy"; img.decoding = "async";
      img.onerror = () => { if (img.src !== new URL(urlOriginal(g, item), location.href).href) img.src = urlOriginal(g, item); };
      visual.append(img);
    } else {
      visual = document.createElement("div");
      visual.setAttribute("role", "img");
      visual.setAttribute("aria-label", `${item.name}: imagem em breve`);
      el.classList.add("is-empty");
      const plus = document.createElement("span"); plus.className = "asset-card-plus"; plus.setAttribute("aria-hidden", "true"); plus.textContent = "+";
      const soon = document.createElement("span"); soon.className = "asset-card-soon"; soon.textContent = "IMAGEM EM BREVE";
      visual.append(plus, soon);
    }
    visual.classList.add("asset-card-image");
    const num = document.createElement("span"); num.className = "asset-card-number"; num.textContent = pad(item.n);
    if (!item.hideNumber) visual.append(num);

    const body = document.createElement("div"); body.className = "asset-card-body";
    const area = document.createElement("span"); area.className = "asset-card-area"; area.textContent = item.area || g.label;
    const title = document.createElement("h4"); title.textContent = item.name;
    const desc = document.createElement("p");
    desc.textContent = item.desc || (has ? "" : "A imagem e a descrição deste espaço serão adicionadas em breve.");
    body.append(area, title, desc);

    if (has) {
      const dl = document.createElement("a");
      dl.className = "asset-card-download";
      dl.href = urlOriginal(g, item);
      dl.download = nomeArquivo(g, item);
      dl.textContent = "↓ Baixar imagem";
      dl.setAttribute("aria-label", `Baixar imagem: ${item.name}`);
      body.append(dl);
    } else {
      const off = document.createElement("span");
      off.className = "asset-card-download is-disabled"; off.setAttribute("aria-disabled", "true");
      off.textContent = "↓ Download indisponível";
      body.append(off);
    }
    el.append(visual, body);
    return el;
  }

  /* ---------- Ilustrações da Jornada (personagem / cenário / profissão) ---------- */
  const ilus = document.getElementById("ilustracoesGrid");
  if (ilus && data.destaques) {
    const porLista = { personagens: GROUPS[0], npcs: GROUPS[1], mapas: GROUPS[2] };
    ilus.replaceChildren(...Object.values(data.destaques).map(d => {
      const g = porLista[d.lista];
      const item = g && g.list.find(x => x.n === d.n);
      if (!item) return document.createComment("destaque sem imagem");
      const el = card({ ...g, label: d.rotulo }, { ...item, area: d.rotulo, hideNumber: true });
      el.classList.add("illustration-card");
      return el;
    }));
  }

  GROUPS.forEach(g => {
    const grid = document.getElementById(g.grid);
    if (!grid || !Array.isArray(g.list)) return;
    grid.replaceChildren(...g.list.map(item => card(g, item)));
  });

  /* ---------- ampliação ---------- */
  if (!modal) return;
  function openLightbox(g, item, trigger) {
    lastFocus = trigger || document.activeElement;
    mTitle.textContent = item.name;
    mArea.textContent = `${g.label} ${pad(item.n)}${item.area && item.area !== g.label ? " · " + item.area.toUpperCase() : ""}`;
    mDesc.textContent = item.desc || "";
    mDesc.hidden = !item.desc;
    const big = document.createElement("img");
    big.src = urlOriginal(g, item);
    big.alt = item.name;
    big.onerror = () => { big.onerror = null; big.src = urlThumb(g, item); };
    stage.replaceChildren(big);
    mDownload.href = urlOriginal(g, item);
    mDownload.download = nomeArquivo(g, item);
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
