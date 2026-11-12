/* Resultado: coloca o cenário (mapa) e os NPCs da missão do perfil, a partir de js/assets-data.js. */
window.renderResultAssets = function (perfil) {
  "use strict";
  const D = window.OV_ASSETS;
  const cfg = D && D.perfis && D.perfis[perfil];
  if (!cfg || !window.OVAssetCards) return;

  const pad = n => String(n).padStart(2, "0");
  const slug = s => s.replace(/[()]/g, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "");
  const ext = f => (f.match(/\.[a-zA-Z0-9]+$/) || [".png"])[0];
  const find = (lista, n) => (D[lista] || []).find(x => x.n === n);
  const pasta = { mapas: D.pastaMapas, npcs: D.pastaNpcs };
  const rot = { mapas: "Mapa", npcs: "NPC" };

  const card = (lista, item) => window.OVAssetCards.card(lista, item);

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
