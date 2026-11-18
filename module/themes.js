// ================================================================
// Thèmes visuels de la fiche — chaque joueur choisit le sien
// (réglage « client » : propre à chaque utilisateur, sur son navigateur)
// ================================================================

const SYSTEME = "chants-de-tindalos";

export const CDT_THEMES = {
  "":  "Classique (sépia)",
  "A": "A · Dossier d'enquête",
  "B": "B · Art Déco noir & or",
  "C": "C · Grimoire occulte",
  "D": "D · Carnet d'explorateur",
  "E": "E · Couverture pulp",
  "F": "F · Télégramme",
  "G": "G · Gazette d'Arkham",
  "H": "H · Tindalos",
};

function themeActuel() {
  try { return game.settings.get(SYSTEME, "themeFiche") ?? ""; }
  catch { return ""; }
}

// Applique le thème à une fiche (élément racine) et synchronise le sélecteur
function appliquerTheme(element) {
  if (!element?.classList?.contains("chants-de-tindalos") && !element?.classList?.contains("cdt")) return;
  const theme = themeActuel();
  if (theme) element.dataset.cdtTheme = theme;
  else delete element.dataset.cdtTheme;

  const select = element.querySelector(".cdt-theme-select");
  if (select) {
    if (!select.options.length) {
      for (const [id, label] of Object.entries(CDT_THEMES)) {
        select.add(new Option(label, id));
      }
    }
    select.value = theme;
  }
}

// Cadenas : verrouille les caractéristiques, variables (et niveau PNJ) d'une fiche
const CHAMPS_VERROUILLABLES = ".carac-box input, .variable-box input, .pnj-niveau-box input";

function appliquerVerrou(app, element) {
  const acteur = app.document ?? app.actor;
  const bouton = element.querySelector(".cdt-verrou");
  if (!acteur || !bouton) return;
  const verrouille = !!acteur.getFlag(SYSTEME, "verrou");
  element.classList.toggle("cdt-verrouille", verrouille);
  bouton.textContent = verrouille ? "🔒" : "🔓";
  bouton.title = verrouille
    ? "Caractéristiques verrouillées — cliquer pour déverrouiller"
    : "Caractéristiques déverrouillées — cliquer pour verrouiller";
  element.querySelectorAll(CHAMPS_VERROUILLABLES).forEach((champ) => {
    champ.readOnly = verrouille;
    champ.tabIndex = verrouille ? -1 : 0;
  });
  if (!bouton.dataset.cdtBranche) {
    bouton.dataset.cdtBranche = "1";
    bouton.disabled = !acteur.isOwner;
    bouton.addEventListener("click", (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      acteur.setFlag(SYSTEME, "verrou", !acteur.getFlag(SYSTEME, "verrou"));
    });
  }
}

// Thème des cartes de chat et dialogues : choisi par le MJ pour toute la table
// (« perso » = chacun voit le thème qu'il a choisi pour sa fiche)
function themeCartes() {
  let t = "perso";
  try { t = game.settings.get(SYSTEME, "themeCartes") ?? "perso"; } catch { /* réglage pas encore prêt */ }
  return t === "perso" ? themeActuel() : t;
}

const COULEURS_NEUTRES = /(^|[;\s])color:\s*(#8b4513|#5c3010|#c8a882|#666666|#666|#888888|#888|#a08080|#8b6010)\b/gi;
const COULEURS_SEMANTIQUES = [
  [/(^|[;\s])color:\s*#8b0000\b/gi, "$1color:var(--bad)"],
  [/(^|[;\s])color:\s*#2d6a2d\b/gi, "$1color:var(--good)"],
  [/(^|[;\s])color:\s*#c8860a\b/gi, "$1color:var(--warn)"],
];

// Repère une carte du système dans le chat (conteneur à fond + bordure en ligne)
function habillerCarte(carte) {
  if (!carte) return;
  if (!carte.dataset.cdtCarte) {
    carte.dataset.cdtCarte = "1";
    carte.classList.add("cdt-carte");
    // couleur « signal » d'origine (ex. rouge des cartes PLP), sauf le brun standard
    const m = /border[^:;]*:[^;]*?(#[0-9a-f]{6}|#[0-9a-f]{3})\b/i.exec(carte.getAttribute("style") ?? "");
    if (m && !/^#8b4513$/i.test(m[1])) carte.style.setProperty("--cdt-signal", m[1]);
    // couleurs de texte → variables du thème (lisibles aussi sur fond sombre)
    for (const el of [carte, ...carte.querySelectorAll("[style]")]) {
      let st = el.getAttribute("style") ?? "";
      let neuf = st.replace(COULEURS_NEUTRES, "$1color:var(--cdt-muted)");
      for (const [re, rep] of COULEURS_SEMANTIQUES) neuf = neuf.replace(re, rep);
      if (neuf !== st) el.setAttribute("style", neuf);
    }
  }
  const theme = themeCartes();
  if (theme) carte.dataset.cdtTheme = theme;
  else delete carte.dataset.cdtTheme;
}

function trouverCarte(html) {
  const racine = html?.querySelector?.(".message-content") ?? html;
  const c = racine?.querySelector?.(":scope > div[style]");
  const st = c?.getAttribute("style") ?? "";
  return (c && /background/i.test(st) && /border/i.test(st)) ? c : null;
}

function reappliquerCartesEtDialogues() {
  for (const c of document.querySelectorAll(".cdt-carte")) habillerCarte(c);
  for (const app of foundry.applications.instances.values()) {
    if (app.element?.classList?.contains("cdt-dialog")) appliquerThemeDialogue(app.element);
  }
}

function appliquerThemeDialogue(element) {
  const theme = themeCartes();
  if (theme) element.dataset.cdtTheme = theme;
  else delete element.dataset.cdtTheme;
}

Hooks.once("init", () => {
  game.settings.register(SYSTEME, "themeCartes", {
    name: "Thème des cartes de chat et des dialogues (MJ)",
    hint: "Visuel des jets, cartes du chat et fenêtres de dialogue pour toute la table. « Identique » = chaque joueur voit le thème choisi pour sa propre fiche.",
    scope: "world",
    config: true,
    type: String,
    default: "perso",
    choices: { perso: "Identique à la fiche de chaque joueur", ...CDT_THEMES },
    onChange: () => reappliquerCartesEtDialogues(),
  });

  game.settings.register(SYSTEME, "themeFiche", {
    name: "Thème des fiches de personnage",
    hint: "Habillage visuel de vos fiches. Propre à chaque joueur : le choix n'affecte pas les autres.",
    scope: "client",
    config: true,
    type: String,
    default: "",
    choices: CDT_THEMES,
    onChange: () => {
      for (const app of foundry.applications.instances.values()) appliquerTheme(app.element);
      reappliquerCartesEtDialogues();
    },
  });
});

// À chaque rendu d'une fiche : appliquer le thème et brancher le sélecteur
Hooks.on("renderChatMessageHTML", (message, html) => habillerCarte(trouverCarte(html)));

Hooks.on("renderApplicationV2", (app, element) => {
  if (element?.classList?.contains("cdt-dialog")) { appliquerThemeDialogue(element); return; }
  if (element?.classList?.contains("cdt")) { appliquerTheme(element); return; }
  if (!element?.classList?.contains("chants-de-tindalos")) return;
  appliquerTheme(element);
  appliquerVerrou(app, element);
  const select = element.querySelector(".cdt-theme-select");
  if (select && !select.dataset.cdtBranche) {
    select.dataset.cdtBranche = "1";
    select.addEventListener("change", (ev) => {
      game.settings.set(SYSTEME, "themeFiche", ev.currentTarget.value);
    });
  }
});
