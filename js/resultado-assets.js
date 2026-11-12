/* Resultado: coloca o cenário (mapa) e os NPCs da missão do perfil, a partir de js/assets-data.js. */
window.renderResultAssets = function (perfil) {
  "use strict";
  const D = window.OV_ASSETS;
  const cfg = D && D.perfis && D.perfis[perfil];
  if (!cfg) return;

  const pad = n => String(n).padStart(2, "0");
  const slug = s => s.replace(/[()]/g, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "");
  const ext = f => (f.match(/\.[a-zA-Z0-9]+$/) || [".png"])[0];
  const find = (lista, n) => (D[lista] || []).find(x => x.n === n);
  const pasta = { mapas: D.pastaMapas, npcs: D.pastaNpcs };
  const rot = { mapas: "Mapa", npcs: "NPC" };

  function card(lista, item) {
    const orig = encodeURI(pasta[lista] + item.file);
    const thumb = encodeURI(pasta[lista] + (item.thumb || item.file));
    const el = document.createElement("article");
    el.className = "asset-card";
    const open = document.createElement("a");
    open.className = "asset-card-image";
    open.href = orig; open.target = "_blank"; open.rel = "noopener";
    open.setAttribute("aria-label", `Abrir imagem ampliada: ${item.name}`);
    const img = document.createElement("img");
    img.src = thumb; img.alt = `${item.name}: ${item.desc}`; img.loading = "lazy"; img.decoding = "async";
    open.append(img);
    const body = document.createElement("div"); body.className = "asset-card-body";
    const area = document.createElement("span"); area.className = "asset-card-area"; area.textContent = lista === "mapas" ? "Cenário" : "NPC";
    const h = document.createElement("h4"); h.textContent = item.name;
    const p = document.createElement("p"); p.textContent = item.desc;
    const dl = document.createElement("a"); dl.className = "asset-card-download"; dl.href = orig;
    dl.download = `${rot[lista]}-${pad(item.n)}-${slug(item.name)}${ext(item.file)}`;
    dl.textContent = "↓ Baixar imagem"; dl.setAttribute("aria-label", `Baixar imagem: ${item.name}`);
    body.append(area, h, p, dl);
    el.append(open, body);
    return el;
  }

  const mapas = cfg.mapas.map(n => find("mapas", n)).filter(i => i && i.file);
  const npcs = cfg.npcs.map(n => find("npcs", n)).filter(i => i && i.file);

  // Cenário principal no destaque do perfil
  const holder = document.getElementById("profileMainPhoto");
  if (holder && mapas[0]) {
    const m = mapas[0];
    holder.className = "profile-main-photo has-image";
    holder.removeAttribute("role"); holder.removeAttribute("aria-label");
    const fig = document.createElement("figure"); fig.className = "profile-scenario";
    const img = document.createElement("img");
    img.src = encodeURI(D.pastaMapas + (m.thumb || m.file)); img.alt = `${m.name}: ${m.desc}`; img.decoding = "async";
    const cap = document.createElement("figcaption");
    const strong = document.createElement("strong"); strong.textContent = `Cenário: ${m.name}`;
    const small = document.createElement("small"); small.textContent = m.desc;
    const dl = document.createElement("a"); dl.className = "asset-card-download"; dl.href = encodeURI(D.pastaMapas + m.file);
    dl.download = `Mapa-${pad(m.n)}-${slug(m.name)}${ext(m.file)}`; dl.textContent = "↓ Baixar mapa";
    cap.append(strong, small, dl); fig.append(img, cap); holder.replaceChildren(fig);
  }

  // Cenários e NPCs da missão
  const sec = document.getElementById("missionAssets");
  if (!sec) return;
  const mg = document.getElementById("missionMaps"), ng = document.getElementById("missionNpcs");
  mapas.forEach(i => mg.append(card("mapas", i)));
  npcs.forEach(i => ng.append(card("npcs", i)));
  document.getElementById("missionMapsBlock").hidden = !mapas.length;
  document.getElementById("missionNpcsBlock").hidden = !npcs.length;
  sec.hidden = !(mapas.length || npcs.length);
};
