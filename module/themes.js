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
  if (!element?.classList?.contains("chants-de-tindalos")) return;
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

Hooks.once("init", () => {
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
    },
  });
});

// À chaque rendu d'une fiche : appliquer le thème et brancher le sélecteur
Hooks.on("renderApplicationV2", (app, element) => {
  if (!element?.classList?.contains("chants-de-tindalos")) return;
  appliquerTheme(element);
  const select = element.querySelector(".cdt-theme-select");
  if (select && !select.dataset.cdtBranche) {
    select.dataset.cdtBranche = "1";
    select.addEventListener("change", (ev) => {
      game.settings.set(SYSTEME, "themeFiche", ev.currentTarget.value);
    });
  }
});
