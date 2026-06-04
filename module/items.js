// ================================================
// SYSTÈME D'ITEMS — ARMES & ÉQUIPEMENTS
// Les Chants de Tindalos — Foundry VTT
// ================================================

import { ArmeDataModel, EquipementDataModel, VehiculeDataModel, SubstanceDataModel, ArtefactDataModel, RevelationDataModel } from "./datamodels.js";
// ------------------------------------------------
// FICHE D'ARME
// ------------------------------------------------
class CdTFeuilleArme extends foundry.applications.api.HandlebarsApplicationMixin(
  foundry.applications.sheets.ItemSheetV2
) {
  static DEFAULT_OPTIONS = {
    classes: ["cdt", "arme-sheet"],
    position: { width: 520, height: 480 },
    window: { resizable: true },
    form: { submitOnChange: true, closeOnSubmit: false },
  };

  static PARTS = {
    body: { template: "systems/chants-de-tindalos/templates/item/feuille-arme.html" },
  };

  async _prepareContext(options) {
    return {
      item: this.item,
      system: this.item.system,
    };
  }

  _onRender(context, options) {
    super._onRender(context, options);
    const html = this.element;

    // Clic sur le portrait pour changer l'image
    html.querySelector(".arme-portrait-wrapper")?.addEventListener("click", () => {
      const fp = new FilePicker({
        type: "image",
        current: this.item.img,
        callback: (path) => this.item.update({ img: path }),
      });
      fp.browse();
    });

    // Bouton attaquer depuis la fiche arme
    html.querySelector(".btn-attaquer-item")?.addEventListener("click", () => {
      if (this.item.actor) {
        this.item.actor.sheet._attaquerItem(this.item.id);
      } else {
        ui.notifications.warn("Cette arme n'est pas équipée par un personnage.");
      }
    });
  }

  async _lancerAttaque() {
    const arme = this.item.system;
    const actor = this.item.actor;
    const caracId = arme.caracteristique ?? "agilite";
    const caracVal = actor.system.caracteristiques?.[caracId]?.valeur ?? 1;
    const sd = actor.system.seuilDifficulte ?? 3;

    const roll = new Roll(`${Math.max(1, caracVal)}d6`);
    await roll.evaluate();

    const valeurs = roll.dice[0].results.map(d => d.result);
    const reussites = valeurs.filter(v => v >= sd).length;
    const succes = reussites > 0;

    const desAff = valeurs
      .map(v => `<span style="color:${v >= sd ? "#2d6a2d" : "#8b0000"};font-weight:bold;">${v}</span>`)
      .join(" | ");

    let contenuLet = "";
    if (succes) {
      const rollLet = new Roll("1d20");
      await rollLet.evaluate();
      const total = rollLet.total + reussites;
      const touche = total >= arme.letalite;
      contenuLet = `
        <div style="margin-top:6px;padding-top:6px;border-top:1px solid #8b4513;">
          🎯 Létalité : <b>${rollLet.total}</b> + ${reussites} réussite(s) = <b>${total}</b> vs <b>${arme.letalite}</b><br>
          ${touche
            ? `<b style="color:#8b0000;">💥 Touché ! Blessure : ${arme.blessure}</b>`
            : `<span style="color:#5c3010;">🛡️ Manqué</span>`}
        </div>`;
    }

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      rolls: [roll],
      content: `
        <div style="background:#f4e8d0;border:1px solid #8b4513;padding:8px;border-radius:4px;">
          <b>⚔️ ${this.item.name}</b> (SD ${sd}+) — ${arme.portee}<br>
          Dés : ${desAff}<br>
          ${succes
            ? `<b style="color:#2d6a2d;">✅ ${reussites} réussite(s)</b>`
            : `<b style="color:#8b0000;">❌ Échec</b>`}
          ${contenuLet}
        </div>`,
    });
  }
}

// ------------------------------------------------
// DRAG & DROP SUR LA FICHE PERSONNAGE
// ------------------------------------------------

// Surcharge du _onDropItem dans CdTFeuillePersonnage
// À appeler depuis activateListeners de la fiche PJ
function _activerDropArmes(html, actor) {
  const zone = html.querySelector(".armes-list")
    ?? html.querySelector("[data-tab='combat']")
    ?? html.querySelector(".sheet-body")
    ?? html;

  if (!actor._dropArmesController) actor._dropArmesController = new AbortController();
  else { actor._dropArmesController.abort(); actor._dropArmesController = new AbortController(); }
  const signal = actor._dropArmesController.signal;

  zone.addEventListener("dragover", ev => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "copy";
    zone.classList.add("drag-over");
  }, { signal });

  zone.addEventListener("dragleave", () => {
    zone.classList.remove("drag-over");
  }, { signal });

  zone.addEventListener("drop", async ev => {
    ev.preventDefault();
    zone.classList.remove("drag-over");

    let data;
    try {
      data = JSON.parse(ev.dataTransfer.getData("text/plain"));
    } catch {
      return;
    }

    if (data.type !== "Item") return;

    let item;
    if (data.uuid) {
      item = await fromUuid(data.uuid);
    } else if (data.id) {
      item = game.items.get(data.id);
    }

    if (!item || item.type !== "arme") {
      ui.notifications.warn("Seules les armes peuvent être glissées ici.");
      return;
    }

    await actor.createEmbeddedDocuments("Item", [item.toObject()]);
    ui.notifications.info(`⚔️ ${item.name} ajoutée à l'inventaire de ${actor.name} !`);
  }, { signal });
}

// ------------------------------------------------
// COMPENDIUM — TOUTES LES ARMES DU MANUEL
// ------------------------------------------------
const CDT_ARMES_DATA = [
  // ---- ARMES À DISTANCE ----
  {
    name: "Pistolet-Mitrailleur Thompson",
    type: "arme",
    img: "icons/weapons/guns/gun-pistol-flintlock-black.webp",
    system: {
      categorie: "distance", caracteristique: "agilite",
      blessure: "Serieuse", letalite: 12, portee: "Longue",
      chargeur: 100, munitions: "Calibre .45", prix: "200$",
      special: "Permet 2 attaques supplémentaires sans pénalité.",
      description: "La pointe du progrès avec son chargeur tambour."
    }
  },
  {
    name: "Fusil de chasse Ithaca",
    type: "arme",
    img: "icons/weapons/guns/gun-blunderbuss-gold.webp",
    system: {
      categorie: "distance", caracteristique: "agilite",
      blessure: "Serieuse", letalite: 12, portee: "Longue",
      chargeur: 2, munitions: "Calibre 12", prix: "28,5$",
      special: "",
      description: "Fusil à percussion centrale fiable et performant."
    }
  },
  {
    name: "Fusil à pompe Remington",
    type: "arme",
    img: "icons/weapons/guns/gun-blunderbuss-gold.webp",
    system: {
      categorie: "distance", caracteristique: "agilite",
      blessure: "Serieuse", letalite: 12, portee: "Longue",
      chargeur: 6, munitions: "Calibre 12", prix: "42$",
      special: "Démontable. +1 attaque/tour avec pénalité (SD+1).",
      description: "Démontable."
    }
  },
  {
    name: "Fusil automatique Remington",
    type: "arme",
    img: "icons/weapons/guns/gun-blunderbuss-gold.webp",
    system: {
      categorie: "distance", caracteristique: "agilite",
      blessure: "Serieuse", letalite: 12, portee: "Longue",
      chargeur: 5, munitions: "Calibre 12", prix: "52$",
      special: "Démontable. +1 attaque sans pénalité ou +2 avec pénalité.",
      description: "Démontable."
    }
  },
  {
    name: "Fusil White Powder Wonder",
    type: "arme",
    img: "icons/weapons/guns/gun-blunderbuss-gold.webp",
    system: {
      categorie: "distance", caracteristique: "agilite",
      blessure: "Serieuse", letalite: 12, portee: "Longue",
      chargeur: 1, munitions: "Calibre 12", prix: "6,69$",
      special: "",
      description: "Un prix abordable, une efficacité redoutable."
    }
  },
  {
    name: "Revolver Smith & Wesson",
    type: "arme",
    img: "icons/weapons/guns/gun-pistol-flintlock-black.webp",
    system: {
      categorie: "distance", caracteristique: "agilite",
      blessure: "Serieuse", letalite: 14, portee: "Courte",
      chargeur: 6, munitions: "Calibre .38", prix: "18$",
      special: "",
      description: "Employé par de nombreuses unités de police."
    }
  },
  {
    name: "Fusil de chasse Featherlight",
    type: "arme",
    img: "icons/weapons/guns/gun-blunderbuss-gold.webp",
    system: {
      categorie: "distance", caracteristique: "agilite",
      blessure: "Moderee", letalite: 14, portee: "Longue",
      chargeur: 2, munitions: "Calibre 20", prix: "15,85$",
      special: "",
      description: "Fusil à double canon particulièrement léger."
    }
  },
  {
    name: "Pistolet Colt automatique",
    type: "arme",
    img: "icons/weapons/guns/gun-pistol-flintlock-black.webp",
    system: {
      categorie: "distance", caracteristique: "agilite",
      blessure: "Moderee", letalite: 14, portee: "Courte",
      chargeur: 7, munitions: "Calibre .25", prix: "13,5$",
      special: "+1 attaque sans pénalité ou +2 avec pénalité. Rentre dans une poche.",
      description: "Rentre dans une poche."
    }
  },
  {
    name: "Carabine Winchester semi-automatique",
    type: "arme",
    img: "icons/weapons/guns/gun-blunderbuss-gold.webp",
    system: {
      categorie: "distance", caracteristique: "agilite",
      blessure: "Moderee", letalite: 15, portee: "Longue",
      chargeur: 6, munitions: "Calibre .351", prix: "48$",
      special: "+1 attaque/tour avec pénalité (SD+1). Dispose d'un cran de sûreté.",
      description: "Dispose d'un cran de sûreté."
    }
  },
  {
    name: "Carabine Winchester à répétition",
    type: "arme",
    img: "icons/weapons/guns/gun-blunderbuss-gold.webp",
    system: {
      categorie: "distance", caracteristique: "agilite",
      blessure: "Moderee", letalite: 16, portee: "Longue",
      chargeur: 12, munitions: "Calibre .22", prix: "20,5$",
      special: "+1 attaque/tour avec pénalité (SD+1). Démontable et légère.",
      description: "Modèle 1906. Carabine démontable et légère."
    }
  },
  {
    name: "Mini-revolver Baby",
    type: "arme",
    img: "icons/weapons/guns/gun-pistol-flintlock-black.webp",
    system: {
      categorie: "distance", caracteristique: "agilite",
      blessure: "Moderee", letalite: 17, portee: "Courte",
      chargeur: 6, munitions: "Calibre .22", prix: "3,5$",
      special: "Peut tenir dans la paume de la main.",
      description: "Peut tenir dans la paume de la main."
    }
  },
  {
    name: "Fusil à air comprimé",
    type: "arme",
    img: "icons/weapons/guns/gun-blunderbuss-gold.webp",
    system: {
      categorie: "distance", caracteristique: "agilite",
      blessure: "Legere", letalite: 22, portee: "Longue",
      chargeur: 1, munitions: "Plombs", prix: "0,88$",
      special: "",
      description: "Permet de tirer des plombs ou des fléchettes."
    }
  },
  // ---- ARMES AU CORPS-À-CORPS ----
  {
    name: "Hache de bûcheron",
    type: "arme",
    img: "icons/weapons/axes/axe-battle-black.webp",
    system: {
      categorie: "corpsacorps", caracteristique: "vigueur",
      blessure: "Serieuse", letalite: 14, portee: "Contact",
      chargeur: 0, munitions: "", prix: "2,2$",
      special: "",
      description: "L'outil approprié pour nombre de travaux."
    }
  },
  {
    name: "Couteau de chasse",
    type: "arme",
    img: "icons/weapons/daggers/dagger-curved-black.webp",
    system: {
      categorie: "corpsacorps", caracteristique: "vigueur",
      blessure: "Moderee", letalite: 15, portee: "Contact",
      chargeur: 0, munitions: "", prix: "3$",
      special: "",
      description: "Lame en acier de 15 cm. Poignée en cuir, fourreau en cuir."
    }
  },
  {
    name: "Hachette",
    type: "arme",
    img: "icons/weapons/axes/axe-battle-black.webp",
    system: {
      categorie: "corpsacorps", caracteristique: "vigueur",
      blessure: "Moderee", letalite: 16, portee: "Contact",
      chargeur: 0, munitions: "", prix: "1,25$",
      special: "",
      description: "Parfait pour l'usage des chasseurs ou les menus travaux."
    }
  },
  {
    name: "Hachoir à viande",
    type: "arme",
    img: "icons/weapons/axes/axe-battle-black.webp",
    system: {
      categorie: "corpsacorps", caracteristique: "vigueur",
      blessure: "Moderee", letalite: 16, portee: "Contact",
      chargeur: 0, munitions: "", prix: "1,5$",
      special: "",
      description: "Essentiel à toute bonne boucherie."
    }
  },
  {
    name: "Pied-de-biche",
    type: "arme",
    img: "icons/weapons/clubs/club-barbed-black.webp",
    system: {
      categorie: "corpsacorps", caracteristique: "vigueur",
      blessure: "Moderee", letalite: 17, portee: "Contact",
      chargeur: 0, munitions: "", prix: "0,90$",
      special: "",
      description: "Un outil qui vous sera toujours utile."
    }
  },
  {
    name: "Batte de baseball",
    type: "arme",
    img: "icons/weapons/clubs/club-barbed-black.webp",
    system: {
      categorie: "corpsacorps", caracteristique: "vigueur",
      blessure: "Moderee", letalite: 18, portee: "Contact",
      chargeur: 0, munitions: "", prix: "0,60$",
      special: "",
      description: "En bois poli."
    }
  },
  {
    name: "Marteau à arrache-clous",
    type: "arme",
    img: "icons/weapons/clubs/club-barbed-black.webp",
    system: {
      categorie: "corpsacorps", caracteristique: "vigueur",
      blessure: "Legere", letalite: 18, portee: "Contact",
      chargeur: 0, munitions: "", prix: "1,35$",
      special: "",
      description: "Enfoncez et retirez vos clous avec le même outil !"
    }
  },
  {
    name: "Rasoir",
    type: "arme",
    img: "icons/weapons/daggers/dagger-curved-black.webp",
    system: {
      categorie: "corpsacorps", caracteristique: "vigueur",
      blessure: "Legere", letalite: 19, portee: "Contact",
      chargeur: 0, munitions: "", prix: "2$",
      special: "",
      description: "Lame en acier 12cm, poignée celluloïd imitation chêne."
    }
  },
  {
    name: "Scalpel",
    type: "arme",
    img: "icons/weapons/daggers/dagger-curved-black.webp",
    system: {
      categorie: "corpsacorps", caracteristique: "vigueur",
      blessure: "Legere", letalite: 19, portee: "Contact",
      chargeur: 0, munitions: "", prix: "1,5$",
      special: "",
      description: "Pour les opérations rondement menées."
    }
  },
  {
    name: "Poing américain",
    type: "arme",
    img: "icons/weapons/fists/fist-small-black.webp",
    system: {
      categorie: "corpsacorps", caracteristique: "vigueur",
      blessure: "Legere", letalite: 20, portee: "Contact",
      chargeur: 0, munitions: "", prix: "1,75$",
      special: "",
      description: "Consommez local !"
    }
  },
  {
    name: "Matraque de police",
    type: "arme",
    img: "icons/weapons/clubs/club-barbed-black.webp",
    system: {
      categorie: "corpsacorps", caracteristique: "vigueur",
      blessure: "Legere", letalite: 21, portee: "Contact",
      chargeur: 0, munitions: "", prix: "0,90$",
      special: "",
      description: "Permet de mettre du plomb dans la cervelle des chenapans."
    }
  },
  {
    name: "Tesson de bouteille",
    type: "arme",
    img: "icons/weapons/daggers/dagger-curved-black.webp",
    system: {
      categorie: "corpsacorps", caracteristique: "vigueur",
      blessure: "Legere", letalite: 21, portee: "Contact",
      chargeur: 0, munitions: "", prix: "-",
      special: "",
      description: "Un vestige d'avant la Prohibition."
    }
  },
  {
    name: "Fouet de cocher",
    type: "arme",
    img: "icons/weapons/thrown/whip-leather-black.webp",
    system: {
      categorie: "corpsacorps", caracteristique: "vigueur",
      blessure: "Legere", letalite: 23, portee: "Courte",
      chargeur: 0, munitions: "", prix: "4$",
      special: "Après attaque réussie : jet en opposition pour désarmer ou faire tomber. Portée max 3m.",
      description: "Longueur 3m. Cuir de veau."
    }
  },
  {
    name: "Poings",
    type: "arme",
    img: "icons/weapons/fists/fist-small-black.webp",
    system: {
      categorie: "corpsacorps", caracteristique: "vigueur",
      blessure: "Legere", letalite: 23, portee: "Contact",
      chargeur: 0, munitions: "", prix: "-",
      special: "",
      description: "Cinq doigts et une paume, bien serrés."
    }
  },
];

// ------------------------------------------------
// FICHE VÉHICULE
// ------------------------------------------------
class CdTFeuilleVehicule extends foundry.applications.api.HandlebarsApplicationMixin(
  foundry.applications.sheets.ItemSheetV2
) {
  static DEFAULT_OPTIONS = {
    classes: ["cdt", "vehicule-sheet"],
    position: { width: 500, height: 460 },
    window: { resizable: true },
    form: { submitOnChange: true, closeOnSubmit: false },
  };

  static PARTS = {
    body: { template: "systems/chants-de-tindalos/templates/item/feuille-vehicule.html" },
  };

  async _prepareContext(options) {
    return { item: this.item, system: this.item.system };
  }

  _onRender(context, options) {
    super._onRender(context, options);
    const html = this.element;
    html.querySelector(".arme-portrait-wrapper")?.addEventListener("click", () => {
      new FilePicker({ type: "image", current: this.item.img, callback: (path) => this.item.update({ img: path }) }).browse();
    });
  }
}

// ------------------------------------------------
// FICHE SUBSTANCE
// ------------------------------------------------
class CdTFeuilleSubstance extends foundry.applications.api.HandlebarsApplicationMixin(
  foundry.applications.sheets.ItemSheetV2
) {
  static DEFAULT_OPTIONS = {
    classes: ["cdt", "substance-sheet"],
    position: { width: 520, height: 600 },
    window: { resizable: true },
    form: { submitOnChange: true, closeOnSubmit: false },
  };

  static PARTS = {
    body: { template: "systems/chants-de-tindalos/templates/item/feuille-substance.html" },
  };

  async _prepareContext(options) {
    return { item: this.item, system: this.item.system };
  }

  _onRender(context, options) {
    super._onRender(context, options);
    const html = this.element;
    html.querySelector(".arme-portrait-wrapper")?.addEventListener("click", () => {
      new FilePicker({ type: "image", current: this.item.img, callback: (path) => this.item.update({ img: path }) }).browse();
    });
    html.querySelector(".btn-consommer")?.addEventListener("click", () => {
      if (this.item.actor) this.item.actor.sheet._consommerSubstance(this.item);
      else ui.notifications.warn("Cette substance n'est pas dans l'inventaire d'un personnage.");
    });
  }
}
// ------------------------------------------------
// FICHE ARTEFACT
// ------------------------------------------------
class CdTFeuilleArtefact extends foundry.applications.api.HandlebarsApplicationMixin(
  foundry.applications.sheets.ItemSheetV2
) {
  static DEFAULT_OPTIONS = {
    classes: ["cdt", "artefact-sheet"],
    position: { width: 500, height: 480 },
    window: { resizable: true },
    form: { submitOnChange: true, closeOnSubmit: false },
  };
  static PARTS = { body: { template: "systems/chants-de-tindalos/templates/item/feuille-artefact.html" } };
  async _prepareContext(options) { return { item: this.item, system: this.item.system }; }
  _onRender(context, options) {
    super._onRender(context, options);
    this.element.querySelector(".arme-portrait-wrapper")?.addEventListener("click", () => {
      new FilePicker({ type: "image", current: this.item.img, callback: (path) => this.item.update({ img: path }) }).browse();
    });
  }
}

// ------------------------------------------------
// FICHE RÉVÉLATION
// ------------------------------------------------
class CdTFeuilleRevelation extends foundry.applications.api.HandlebarsApplicationMixin(
  foundry.applications.sheets.ItemSheetV2
) {
  static DEFAULT_OPTIONS = {
    classes: ["cdt", "revelation-sheet"],
    position: { width: 520, height: 560 },
    window: { resizable: true },
    form: { submitOnChange: true, closeOnSubmit: false },
  };
  static PARTS = { body: { template: "systems/chants-de-tindalos/templates/item/feuille-revelation.html" } };
  async _prepareContext(options) { return { item: this.item, system: this.item.system }; }
  _onRender(context, options) {
    super._onRender(context, options);
    this.element.querySelector(".arme-portrait-wrapper")?.addEventListener("click", () => {
      new FilePicker({ type: "image", current: this.item.img, callback: (path) => this.item.update({ img: path }) }).browse();
    });
  }
}

// ------------------------------------------------
// DONNÉES : ARTEFACTS
// ------------------------------------------------
const CDT_ARTEFACTS_DATA = [
  {
    name: "Blasphèmes de La Mer des Ossements",
    type: "artefact",
    img: "icons/sundries/books/book-worn-brown-grey.webp",
    system: {
      ecole: "vitalisme", modificateur: 2,
      declencheur: "Prononcer les incantations écrites.",
      effet: "+2 à tous les jets de Vitalisme visant à pratiquer la nécromancie.",
      prix: "Inestimable",
      description: "Cette page de manuscrit est réputée perdue depuis le sac de Constantinople en 1204."
    }
  },
  {
    name: "Rituel d'Apaisement des Âmes Tourmentées",
    type: "artefact",
    img: "icons/sundries/books/book-worn-brown-grey.webp",
    system: {
      ecole: "cosmos", modificateur: 10,
      declencheur: "Suivre les huit étapes présentées dans le rituel.",
      effet: "+10 à un jet de Cosmos permettant de bannir l'âme d'un spectre afin qu'il ne hante plus un lieu.",
      prix: "Inestimable",
      description: "Ce rituel a été rédigé au XVIIème siècle par un moine anonyme d'Écosse."
    }
  },
  {
    name: "ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn",
    type: "artefact",
    img: "icons/sundries/books/book-worn-brown-grey.webp",
    system: {
      ecole: "songe", modificateur: 15,
      declencheur: "Prononcer correctement l'incantation.",
      effet: "+15 à un jet de Songe permettant de lier les fils de Trame des rêveurs alentours à Cthulhu.",
      prix: "Inestimable",
      description: "Cette formule très célèbre dispose d'une grande puissance magique."
    }
  },
  {
    name: "Mudra de Chaanis",
    type: "artefact",
    img: "icons/magic/symbols/runes-star-magenta.webp",
    system: {
      ecole: "envoutement", modificateur: 1,
      declencheur: "Réaliser correctement le mouvement ésotérique de la main gauche.",
      effet: "+1 au prochain jet d'Envoûtement.",
      prix: "Inestimable",
      description: "Ce geste de rituel de la main a été décrit par le pseudo-Onésicrite, au IVème siècle avant notre ère, dans les Débris de l'Âme."
    }
  },
];

// ------------------------------------------------
// DONNÉES : RÉVÉLATIONS (principales)
// ------------------------------------------------
const CDT_REVELATIONS_DATA = [
  // CONVICTIONS INITIALES
  { name: "On cherche à me nuire...",             type: "revelation", img: "icons/magic/symbols/runes-star-magenta.webp", system: { categorie: "conviction_initiale",   contenu: "On cherche à me nuire...",             effet: "",           effetArcane: "", entite: "", plpNom: "Tout m'afflige et me nuit", plpNiveau: 1, plpEffet: "Vous devez vous PLAINDRE de vos malheurs.", description: "" } },
  { name: "On nous cache quelque chose...",        type: "revelation", img: "icons/magic/symbols/runes-star-magenta.webp", system: { categorie: "conviction_initiale",   contenu: "On nous cache quelque chose d'essentiel...", effet: "",   effetArcane: "", entite: "", plpNom: "L'inquisiteur", plpNiveau: 2, plpEffet: "Il vous faut FORCER QUELQU'UN à avouer un secret.", description: "" } },
  { name: "J'ai un rôle essentiel...",             type: "revelation", img: "icons/magic/symbols/runes-star-magenta.webp", system: { categorie: "conviction_initiale",   contenu: "J'ai un rôle essentiel dans ce qui se trame...", effet: "", effetArcane: "", entite: "", plpNom: "Monologue", plpNiveau: 1, plpEffet: "Vous devez DIALOGUER avec vous-même.", description: "" } },
  { name: "Nous ne sommes pas seuls...",           type: "revelation", img: "icons/magic/symbols/runes-star-magenta.webp", system: { categorie: "conviction_initiale",   contenu: "Nous ne sommes pas seuls...",           effet: "",           effetArcane: "", entite: "", plpNom: "Un au-delà rassurant", plpNiveau: 1, plpEffet: "Vous devez PRIER pour votre (vos) divinité(s).", description: "" } },
  { name: "Je me sens coupable...",                type: "revelation", img: "icons/magic/symbols/runes-star-magenta.webp", system: { categorie: "conviction_initiale",   contenu: "Je me sens coupable...",               effet: "",           effetArcane: "", entite: "", plpNom: "Expiation", plpNiveau: 1, plpEffet: "Vous devez CONFESSER à haute voix une mauvaise action.", description: "" } },
  { name: "La réalité n'est pas ce qu'elle semble", type: "revelation", img: "icons/magic/symbols/runes-star-magenta.webp", system: { categorie: "conviction_initiale", contenu: "La réalité n'est pas ce qu'elle semble être...", effet: "", effetArcane: "", entite: "", plpNom: "Faux-semblants", plpNiveau: 1, plpEffet: "Il vous faut TÂTER votre environnement pour vous assurer de sa réalité.", description: "" } },
  // CONVICTIONS SUPÉRIEURES
  { name: "Les règles morales sont des illusions",  type: "revelation", img: "icons/magic/symbols/runes-star-orange.webp", system: { categorie: "conviction_superieure", contenu: "Les règles morales sont des illusions.", effet: "Maîtrise -2",   effetArcane: "", entite: "", plpNom: "", plpNiveau: 1, plpEffet: "", description: "" } },
  { name: "L'humanité est insignifiante",           type: "revelation", img: "icons/magic/symbols/runes-star-orange.webp", system: { categorie: "conviction_superieure", contenu: "L'humanité est insignifiante.",        effet: "Maîtrise -1",   effetArcane: "", entite: "", plpNom: "", plpNiveau: 1, plpEffet: "", description: "" } },
  { name: "Les lois de la nature sont incomplètes", type: "revelation", img: "icons/magic/symbols/runes-star-orange.webp", system: { categorie: "conviction_superieure", contenu: "Les lois de la nature sont incomplètes.", effet: "Angoisse +1", effetArcane: "", entite: "", plpNom: "", plpNiveau: 1, plpEffet: "", description: "" } },
  { name: "Il y a d'autres réalités",              type: "revelation", img: "icons/magic/symbols/runes-star-orange.webp", system: { categorie: "conviction_superieure", contenu: "Il y a d'autres réalités.",             effet: "Angoisse +1",   effetArcane: "", entite: "", plpNom: "", plpNiveau: 1, plpEffet: "", description: "" } },
  { name: "Les Rêves nous dévoilent le réel",       type: "revelation", img: "icons/magic/symbols/runes-star-orange.webp", system: { categorie: "conviction_superieure", contenu: "Les Rêves nous dévoilent le réel.",    effet: "Intuition +2",  effetArcane: "", entite: "", plpNom: "", plpNiveau: 1, plpEffet: "", description: "" } },
  { name: "La Magie existe",                        type: "revelation", img: "icons/magic/symbols/runes-star-orange.webp", system: { categorie: "conviction_superieure", contenu: "La Magie existe.",                    effet: "Intuition +2",  effetArcane: "", entite: "", plpNom: "", plpNiveau: 1, plpEffet: "", description: "" } },
  // OBJECTIFS
  { name: "Je dois protéger mes proches",           type: "revelation", img: "icons/magic/symbols/runes-star-blue.webp",   system: { categorie: "objectif",              contenu: "Je dois protéger mes proches.",        effet: "Espoir +1",     effetArcane: "", entite: "", plpNom: "", plpNiveau: 1, plpEffet: "", description: "" } },
  { name: "Je dois révéler la vérité",              type: "revelation", img: "icons/magic/symbols/runes-star-blue.webp",   system: { categorie: "objectif",              contenu: "Je dois révéler la vérité.",           effet: "Déclencheur : Mentir", effetArcane: "", entite: "", plpNom: "", plpNiveau: 1, plpEffet: "", description: "" } },
  { name: "Je dois sauver le monde",                type: "revelation", img: "icons/magic/symbols/runes-star-blue.webp",   system: { categorie: "objectif",              contenu: "Je dois sauver le monde.",             effet: "Maîtrise +1",   effetArcane: "", entite: "", plpNom: "", plpNiveau: 1, plpEffet: "", description: "" } },
  { name: "Je dois élucider tout le mystère",       type: "revelation", img: "icons/magic/symbols/runes-star-blue.webp",   system: { categorie: "objectif",              contenu: "Je dois élucider tout le mystère.",    effet: "Maîtrise +1",   effetArcane: "", entite: "", plpNom: "", plpNiveau: 1, plpEffet: "", description: "" } },
  { name: "Je dois survivre à tout prix",           type: "revelation", img: "icons/magic/symbols/runes-star-blue.webp",   system: { categorie: "objectif",              contenu: "Je dois survivre à tout prix.",        effet: "Maîtrise +1",   effetArcane: "", entite: "", plpNom: "", plpNiveau: 1, plpEffet: "", description: "" } },
  // RÉVÉLATIONS OCCULTES INITIALES
  { name: "Le passé existe encore",                 type: "revelation", img: "icons/magic/symbols/runes-star-purple.webp", system: { categorie: "occulte_initiale",      contenu: "Le passé existe encore.",              effet: "",           effetArcane: "Vision +1",        entite: "Yog-Sothoth",     plpNom: "", plpNiveau: 1, plpEffet: "", description: "" } },
  { name: "Il y a un monde derrière le monde",      type: "revelation", img: "icons/magic/symbols/runes-star-purple.webp", system: { categorie: "occulte_initiale",      contenu: "Il y a un monde derrière le monde.",   effet: "",           effetArcane: "Vision +1",        entite: "Tindalos",        plpNom: "", plpNiveau: 1, plpEffet: "", description: "" } },
  { name: "Des créatures de la nuit adorent un Maître", type: "revelation", img: "icons/magic/symbols/runes-star-purple.webp", system: { categorie: "occulte_initiale", contenu: "Des créatures de la nuit adorent un Maître ignoble.", effet: "", effetArcane: "Envoûtement +1", entite: "Nyarlathotep",    plpNom: "", plpNiveau: 1, plpEffet: "", description: "" } },
  { name: "La vie a des origines divines",          type: "revelation", img: "icons/magic/symbols/runes-star-purple.webp", system: { categorie: "occulte_initiale",      contenu: "La vie a des origines divines.",       effet: "",           effetArcane: "Vitalisme +1",     entite: "Shub-Niggurath",  plpNom: "", plpNiveau: 1, plpEffet: "", description: "" } },
  { name: "Il y a une déesse dans les profondeurs", type: "revelation", img: "icons/magic/symbols/runes-star-purple.webp", system: { categorie: "occulte_initiale",      contenu: "Il y a une déesse dans les profondeurs de l'Océan.", effet: "", effetArcane: "Songe +1",      entite: "Dagon",           plpNom: "", plpNiveau: 1, plpEffet: "", description: "" } },
  { name: "Un Rêveur extraordinaire attend son réveil", type: "revelation", img: "icons/magic/symbols/runes-star-purple.webp", system: { categorie: "occulte_initiale", contenu: "Un Rêveur d'une ampleur extraordinaire attend enfin son réveil.", effet: "", effetArcane: "Songe +1", entite: "Cthulhu",        plpNom: "", plpNiveau: 1, plpEffet: "", description: "" } },
  // RÉVÉLATIONS OCCULTES SUPÉRIEURES
  { name: "Yog-Sothoth est l'ensemble des réalités", type: "revelation", img: "icons/magic/symbols/runes-star-red.webp",  system: { categorie: "occulte_superieure",    contenu: "Yog-Sothoth est l'ensemble des réalités.",   effet: "",           effetArcane: "Vision +2",       entite: "Yog-Sothoth",     plpNom: "", plpNiveau: 1, plpEffet: "", description: "" } },
  { name: "Tout disparaît en Azathoth",              type: "revelation", img: "icons/magic/symbols/runes-star-red.webp",  system: { categorie: "occulte_superieure",    contenu: "Tout disparaît en Azathoth et tout vient d'Azathoth.", effet: "", effetArcane: "Anéantissement +2", entite: "Azathoth",       plpNom: "", plpNiveau: 1, plpEffet: "", description: "" } },
  { name: "Nyarlathotep collecte les âmes",          type: "revelation", img: "icons/magic/symbols/runes-star-red.webp",  system: { categorie: "occulte_superieure",    contenu: "Nyarlathotep collecte les âmes pour régner sur l'ensemble des univers.", effet: "", effetArcane: "Envoûtement +2", entite: "Nyarlathotep", plpNom: "", plpNiveau: 1, plpEffet: "", description: "" } },
  { name: "Depuis Tindalos, Cthulhu règne",          type: "revelation", img: "icons/magic/symbols/runes-star-red.webp",  system: { categorie: "occulte_superieure",    contenu: "Depuis Tindalos, Cthulhu règne sur les Profonds.", effet: "",    effetArcane: "Songe +2",        entite: "Cthulhu",         plpNom: "", plpNiveau: 1, plpEffet: "", description: "" } },
  { name: "Les grands mages peuvent altérer la réalité", type: "revelation", img: "icons/magic/symbols/runes-star-red.webp", system: { categorie: "occulte_superieure", contenu: "Les grands mages peuvent altérer la texture de la réalité.", effet: "", effetArcane: "Arcanes +1d20", entite: "Magie", plpNom: "", plpNiveau: 1, plpEffet: "", description: "" } },
];
// ------------------------------------------------
class CdTFeuilleEquipement extends foundry.applications.api.HandlebarsApplicationMixin(
  foundry.applications.sheets.ItemSheetV2
) {
  static DEFAULT_OPTIONS = {
    classes: ["cdt", "equipement-sheet"],
    position: { width: 460, height: 380 },
    window: { resizable: true },
    form: { submitOnChange: true, closeOnSubmit: false },
  };

  static PARTS = {
    body: { template: "systems/chants-de-tindalos/templates/item/feuille-equipement.html" },
  };

  async _prepareContext(options) {
    return { item: this.item, system: this.item.system };
  }

  _onRender(context, options) {
    super._onRender(context, options);
    this.element.querySelector(".arme-portrait-wrapper")?.addEventListener("click", () => {
      new FilePicker({ type: "image", current: this.item.img, callback: (path) => this.item.update({ img: path }) }).browse();
    });
  }
}
// ------------------------------------------------
const CDT_EQUIPEMENTS_DATA = [
  // --- TABAC ---
  { name: "Paquet de cigarettes",        type: "equipement", img: "icons/consumables/plants/herb-sage-green.webp",     system: { categorie: "tabac",        prix: "16c",                description: "" } },
  { name: "Cigare El Camino",            type: "equipement", img: "icons/consumables/plants/herb-sage-green.webp",     system: { categorie: "tabac",        prix: "11c",                description: "" } },
  { name: "Tabac en pot",                type: "equipement", img: "icons/consumables/plants/herb-sage-green.webp",     system: { categorie: "tabac",        prix: "50c/200g",           description: "" } },
  { name: "Pipe",                        type: "equipement", img: "icons/consumables/plants/herb-sage-green.webp",     system: { categorie: "tabac",        prix: "48c",                description: "" } },
  { name: "Briquet",                     type: "equipement", img: "icons/tools/hand/torch-unlit.webp",                 system: { categorie: "tabac",        prix: "23c",                description: "" } },
  { name: "Boîte d'allumettes",          type: "equipement", img: "icons/tools/hand/torch-unlit.webp",                 system: { categorie: "tabac",        prix: "7c",                 description: "" } },
  // --- PHOTOGRAPHIE ---
  { name: "Appareil photo Conley Junior",type: "equipement", img: "icons/tools/instruments/magnifying-glass.webp",    system: { categorie: "photographie", prix: "9,95$",              description: "" } },
  { name: "Pellicule 6 photographies",   type: "equipement", img: "icons/tools/instruments/magnifying-glass.webp",    system: { categorie: "photographie", prix: "7,85$",              description: "" } },
  { name: "Matériel de développement",   type: "equipement", img: "icons/tools/instruments/magnifying-glass.webp",    system: { categorie: "photographie", prix: "21,75$",             description: "En studio." } },
  { name: "Trépied pour appareil photo", type: "equipement", img: "icons/tools/instruments/magnifying-glass.webp",    system: { categorie: "photographie", prix: "4,6$",               description: "" } },
  // --- BUREAU ---
  { name: "Crayon de papier",            type: "equipement", img: "icons/sundries/misc/parchment.webp",                system: { categorie: "bureau",       prix: "39c/deux douzaines", description: "" } },
  { name: "Stylo-plume",                 type: "equipement", img: "icons/sundries/misc/parchment.webp",                system: { categorie: "bureau",       prix: "55c - 85c",          description: "" } },
  { name: "Stylo-plume en or",           type: "equipement", img: "icons/sundries/misc/parchment.webp",                system: { categorie: "bureau",       prix: "2,3$",               description: "" } },
  { name: "Machine à écrire Harris",     type: "equipement", img: "icons/sundries/misc/parchment.webp",                system: { categorie: "bureau",       prix: "60$",                description: "40 pages, couverture rigide." } },
  { name: "Téléphone de bureau",         type: "equipement", img: "icons/tools/instruments/harp-simple.webp",          system: { categorie: "bureau",       prix: "16,8$",              description: "" } },
  { name: "Carnet de notes",             type: "equipement", img: "icons/sundries/misc/parchment.webp",                system: { categorie: "bureau",       prix: "22c",                description: "" } },
  // --- OUTILS ---
  { name: "Boussole de poche",           type: "equipement", img: "icons/tools/navigation/compass-brass.webp",         system: { categorie: "outils",       prix: "1,5$",               description: "" } },
  { name: "Canne à pêche Luckie",        type: "equipement", img: "icons/tools/hand/hoe.webp",                         system: { categorie: "outils",       prix: "2,15$",              description: "Télescopique et en métal." } },
  { name: "Piège à loup",               type: "equipement", img: "icons/tools/hand/hoe.webp",                         system: { categorie: "outils",       prix: "5,65$",              description: "" } },
  { name: "Tente",                      type: "equipement", img: "icons/environment/settlement/tent-canvas.webp",     system: { categorie: "outils",       prix: "1,35$ - 13,39$",    description: "De la tente individuelle jusqu'à 6 personnes." } },
  { name: "30m de corde",               type: "equipement", img: "icons/tools/hand/rope-wound-tan.webp",              system: { categorie: "outils",       prix: "2,65$",              description: "" } },
  { name: "Boîte à outils complète",    type: "equipement", img: "icons/tools/hand/wrench.webp",                      system: { categorie: "outils",       prix: "32$",                description: "Scies, marteaux, tournevis, équerres..." } },
  { name: "Chalumeau à essence",        type: "equipement", img: "icons/tools/hand/torch-unlit.webp",                 system: { categorie: "outils",       prix: "4,5$",               description: "Flamme bleue à environ 800°C. Réservoir 0,5L." } },
  { name: "Kit d'outils de serrurier",  type: "equipement", img: "icons/tools/hand/wrench.webp",                      system: { categorie: "outils",       prix: "6,75$",              description: "" } },
  { name: "Lampe torche de mineur",     type: "equipement", img: "icons/tools/hand/torch-lit.webp",                   system: { categorie: "outils",       prix: "1,3$",               description: "" } },
  // --- MÉDICAL ---
  { name: "Aspirine",                   type: "equipement", img: "icons/consumables/potions/potion-round-empty.webp", system: { categorie: "medical",      prix: "25c/24 tablettes",  description: "" } },
  { name: "Huile de foie de morue",     type: "equipement", img: "icons/consumables/potions/potion-round-empty.webp", system: { categorie: "medical",      prix: "1,2$",               description: "" } },
  { name: "Sublimé corrosif",           type: "equipement", img: "icons/consumables/potions/potion-round-empty.webp", system: { categorie: "medical",      prix: "95c",                description: "Produit par le Dr. Festen." } },
  { name: "Fauteuil roulant",           type: "equipement", img: "icons/environment/settlement/wagon.webp",           system: { categorie: "medical",      prix: "24$ - 52$",          description: "" } },
  // --- ACCESSOIRES ---
  { name: "Montre à bracelet",          type: "equipement", img: "icons/sundries/jewelry/ring-band-plain.webp",       system: { categorie: "accessoires",  prix: "11,35$",             description: "" } },
  { name: "Montre à gousset",           type: "equipement", img: "icons/sundries/jewelry/ring-band-plain.webp",       system: { categorie: "accessoires",  prix: "5,65$",              description: "" } },
  { name: "Holster pour revolver",      type: "equipement", img: "icons/sundries/misc/pouch-grey.webp",               system: { categorie: "accessoires",  prix: "2,85$",              description: "Sécurité à ressort anti-vol." } },
  { name: "Valise imitation Alligator", type: "equipement", img: "icons/sundries/misc/pouch-grey.webp",               system: { categorie: "accessoires",  prix: "8$",                 description: "Armature en acier, résiste à l'eau." } },
  { name: "Parapluie",                  type: "equipement", img: "icons/sundries/misc/pouch-grey.webp",               system: { categorie: "accessoires",  prix: "1,98$",              description: "" } },
  { name: "Sifflet de police",          type: "equipement", img: "icons/tools/instruments/harp-simple.webp",          system: { categorie: "accessoires",  prix: "35c",                description: "" } },
  { name: "Miroir de poche",            type: "equipement", img: "icons/sundries/misc/mirror.webp",                   system: { categorie: "accessoires",  prix: "10c",                description: "" } },
  // --- SERVICES ---
  { name: "Repas au restaurant",        type: "equipement", img: "icons/consumables/food/berries-grapes-yellow.webp", system: { categorie: "services",     prix: "75c - 1,5$",         description: "" } },
  { name: "Nuit à l'hôtel",            type: "equipement", img: "icons/environment/settlement/house.webp",           system: { categorie: "services",     prix: "2$ - 4$",            description: "" } },
  { name: "Ticket de cinéma",          type: "equipement", img: "icons/sundries/misc/parchment.webp",                system: { categorie: "services",     prix: "15c",                description: "" } },
  { name: "Billet de train",           type: "equipement", img: "icons/sundries/misc/parchment.webp",                system: { categorie: "services",     prix: "2c/km",              description: "" } },
  { name: "Taxi",                      type: "equipement", img: "icons/environment/settlement/wagon.webp",           system: { categorie: "services",     prix: "30c/km",             description: "" } },
];

// ------------------------------------------------
const CDT_VEHICULES_DATA = [
  {
    name: "Buggy 1 place", type: "vehicule",
    img: "icons/environment/settlement/wagon.webp",
    system: { categorie: "terrestre", vitesseMax: 4, acceleration: 1, manoeuvrabilite: 0, places: 1, prix: "86,5$", competence: "equitation", special: "Cheval non fourni.", description: "Véhicule à cheval à une place." }
  },
  {
    name: "Cheval", type: "vehicule",
    img: "icons/creatures/mammals/horse-brown.webp",
    system: { categorie: "monture", vitesseMax: 5, acceleration: 2, manoeuvrabilite: 0, places: 1, prix: "154$", competence: "equitation", special: "", description: "Monture classique." }
  },
  {
    name: "Mulet", type: "vehicule",
    img: "icons/creatures/mammals/horse-brown.webp",
    system: { categorie: "monture", vitesseMax: 1, acceleration: 1, manoeuvrabilite: -1, places: 1, prix: "175$", competence: "equitation", special: "", description: "Robuste mais lent." }
  },
  {
    name: "Bicyclette", type: "vehicule",
    img: "icons/environment/settlement/wagon.webp",
    system: { categorie: "terrestre", vitesseMax: 3, acceleration: 1, manoeuvrabilite: 1, places: 1, prix: "26,95$", competence: "cyclisme", special: "", description: "Moyen de transport économique." }
  },
  {
    name: "Moto Harley Davidson", type: "vehicule",
    img: "icons/environment/settlement/wagon.webp",
    system: { categorie: "terrestre", vitesseMax: 7, acceleration: 2, manoeuvrabilite: 1, places: 2, prix: "375$", competence: "automobile", special: "", description: "Moto emblématique des années 1920." }
  },
  {
    name: "Ford T Touring", type: "vehicule",
    img: "icons/environment/settlement/wagon.webp",
    system: { categorie: "terrestre", vitesseMax: 5, acceleration: 1, manoeuvrabilite: 0, places: 5, prix: "460$", competence: "automobile", special: "", description: "La voiture du peuple américain. 15 millions produites." }
  },
  {
    name: "Briscoe Touring", type: "vehicule",
    img: "icons/environment/settlement/wagon.webp",
    system: { categorie: "terrestre", vitesseMax: 5, acceleration: 1, manoeuvrabilite: -1, places: 5, prix: "885$", competence: "automobile", special: "", description: "Voiture de tourisme fiable." }
  },
  {
    name: "Buick H 6-44", type: "vehicule",
    img: "icons/environment/settlement/wagon.webp",
    system: { categorie: "terrestre", vitesseMax: 8, acceleration: 2, manoeuvrabilite: 0, places: 3, prix: "1495$", competence: "automobile", special: "", description: "Véhicule haut de gamme, puissant et rapide." }
  },
  {
    name: "Dort Sedan model 15-S", type: "vehicule",
    img: "icons/environment/settlement/wagon.webp",
    system: { categorie: "terrestre", vitesseMax: 6, acceleration: 1, manoeuvrabilite: 0, places: 5, prix: "1535$", competence: "automobile", special: "", description: "Berline confortable et spacieuse." }
  },
  {
    name: "Cunningham Touring", type: "vehicule",
    img: "icons/environment/settlement/wagon.webp",
    system: { categorie: "terrestre", vitesseMax: 10, acceleration: 3, manoeuvrabilite: 1, places: 4, prix: "6200$", competence: "automobile", special: "", description: "Voiture de luxe pour les plus fortunés. Vitesse exceptionnelle." }
  },
  {
    name: "Camion 1,5T", type: "vehicule",
    img: "icons/environment/settlement/wagon.webp",
    system: { categorie: "terrestre", vitesseMax: 4, acceleration: 1, manoeuvrabilite: -2, places: 2, prix: "1185$", competence: "automobile", special: "", description: "Camion léger pour le transport de marchandises." }
  },
  {
    name: "Camion électrique 2T", type: "vehicule",
    img: "icons/environment/settlement/wagon.webp",
    system: { categorie: "terrestre", vitesseMax: 3, acceleration: 1, manoeuvrabilite: -2, places: 2, prix: "2600$", competence: "automobile", special: "Moteur électrique silencieux.", description: "Camion électrique pour livraisons urbaines." }
  },
  {
    name: "Camion 3,5T", type: "vehicule",
    img: "icons/environment/settlement/wagon.webp",
    system: { categorie: "terrestre", vitesseMax: 4, acceleration: 1, manoeuvrabilite: -2, places: 2, prix: "4200$", competence: "automobile", special: "", description: "Gros camion pour transport lourd." }
  },
];

// ------------------------------------------------
// DONNÉES : SUBSTANCES
// ------------------------------------------------
const CDT_SUBSTANCES_DATA = [
  {
    name: "Alcool", type: "substance",
    img: "icons/consumables/potions/potion-round-empty.webp",
    system: {
      prix: "25c / dose", duree: "1 heure par dose", seuilSurdose: 3,
      effetTension: -1, effetReserve: "", effetMaitrise: 0, effetSommeil: 0, effetSD: 0,
      effetSpecial: "Tension −1 immédiatement.",
      intoTension: 0, intoReserve: -4, intoMaitrise: -2, intoSD: 1,
      intoSpecial: "Réserve −4, Maîtrise −2, SD+1.",
      descenteTension: 0, descenteReserve: -4,
      descenteSpecial: "Réserve −4.",
      description: "L'alcool est omniprésent malgré la Prohibition. Chaque dose supplémentaire ajoute 1D de difficulté au jet défensif [Vig▶Survie] contre l'intoxication."
    }
  },
  {
    name: "Cannabis", type: "substance",
    img: "icons/consumables/potions/potion-round-empty.webp",
    system: {
      prix: "25c / dose", duree: "1 heure par dose", seuilSurdose: 2,
      effetTension: -2, effetReserve: "", effetMaitrise: 0, effetSommeil: 3, effetSD: 0,
      effetSpecial: "Tension −2, impossibilité d'utiliser la Réserve, Sommeil +3.",
      intoTension: -2, intoReserve: -2, intoMaitrise: 0, intoSD: 0,
      intoSpecial: "Réserve −2, impossibilité d'utiliser la Réserve.",
      descenteTension: -2, descenteReserve: 0,
      descenteSpecial: "Tension −2, dette de sommeil +1.",
      description: "Substance illégale aux effets relaxants mais désorientants."
    }
  },
  {
    name: "Cocaïne", type: "substance",
    img: "icons/consumables/potions/potion-round-empty.webp",
    system: {
      prix: "75c / dose", duree: "1 heure par dose", seuilSurdose: 1,
      effetTension: 0, effetReserve: "1d6", effetMaitrise: 0, effetSommeil: 0, effetSD: 0,
      effetSpecial: "Réserve +1d6, tous les Coûts −1 (non cumulable).",
      intoTension: 6, intoReserve: 0, intoMaitrise: -2, intoSD: 1,
      intoSpecial: "Tension +1d6, Maîtrise −2, SD+1.",
      descenteTension: 2, descenteReserve: 0,
      descenteSpecial: "Tension +2, impossibilité d'utiliser de l'Espoir.",
      description: "Stimulant puissant très répandu dans les milieux aisés des années 1920."
    }
  },
  {
    name: "Opiacés", type: "substance",
    img: "icons/consumables/potions/potion-round-empty.webp",
    system: {
      prix: "75c / dose", duree: "5 heures par dose", seuilSurdose: 1,
      effetTension: 0, effetReserve: "", effetMaitrise: 0, effetSommeil: 0, effetSD: 0,
      effetSpecial: "Tension −2d6 immédiatement.",
      intoTension: -30, intoReserve: 0, intoMaitrise: 0, intoSD: 1,
      intoSpecial: "Tension −3d6, Sommeil +10, SD+1.",
      descenteTension: 2, descenteReserve: 0,
      descenteSpecial: "Tension +2, impossibilité d'utiliser de l'Espoir. La descente dure une nuit supplémentaire.",
      description: "Morphine, héroïne ou laudanum. Effets puissants et durables, très addictifs."
    }
  },
];

// ------------------------------------------------
// INITIALISATION DES COMPENDIUMS
// ------------------------------------------------
async function initialiserCompendium(nomPack, donnees) {
  const pack = game.packs.get(nomPack);
  if (!pack) { console.log(`CDT | Pack ${nomPack} non trouvé.`); return; }
  const contenu = await pack.getDocuments();
  if (contenu.length > 0) return;

  // Déverrouillage v13 avec délai pour laisser le serveur traiter
  await pack.configure({ locked: false });
  await new Promise(r => setTimeout(r, 300));

  for (const data of donnees) {
    try {
      await Item.create(data, { pack: nomPack });
    } catch(e) {
      console.error(`CDT | Erreur création ${data.name}:`, e.message);
    }
  }

  await pack.configure({ locked: true });
  console.log(`CDT | ${donnees.length} items ajoutés dans ${nomPack} !`);
  ui.notifications?.info(`✅ Compendium ${pack.title} initialisé !`);
}

// ------------------------------------------------
// ENREGISTREMENT
// ------------------------------------------------
Hooks.once("init", function () {
  CONFIG.Item.dataModels.vehicule  = VehiculeDataModel;
  CONFIG.Item.dataModels.substance = SubstanceDataModel;

  const Items = foundry.documents.collections.Items;
  Items.registerSheet("chants-de-tindalos", CdTFeuilleArme, {
    types: ["arme"], makeDefault: true, label: "Fiche Arme CDT",
  });
  Items.registerSheet("chants-de-tindalos", CdTFeuilleVehicule, {
    types: ["vehicule"], makeDefault: true, label: "Fiche Véhicule CDT",
  });
  Items.registerSheet("chants-de-tindalos", CdTFeuilleArtefact, {
    types: ["artefact"], makeDefault: true, label: "Fiche Artefact CDT",
  });
  Items.registerSheet("chants-de-tindalos", CdTFeuilleRevelation, {
    types: ["revelation"], makeDefault: true, label: "Fiche Révélation CDT",
  });
  Items.registerSheet("chants-de-tindalos", CdTFeuilleEquipement, {
    types: ["equipement"], makeDefault: true, label: "Fiche Équipement CDT",
  });
});

Hooks.once("ready", async function () {
  await initialiserCompendium("chants-de-tindalos.armes",      CDT_ARMES_DATA);
  await initialiserCompendium("chants-de-tindalos.vehicules",  CDT_VEHICULES_DATA);
  await initialiserCompendium("chants-de-tindalos.substances", CDT_SUBSTANCES_DATA);
  await initialiserCompendium("chants-de-tindalos.artefacts",  CDT_ARTEFACTS_DATA);
  await initialiserCompendium("chants-de-tindalos.revelations", CDT_REVELATIONS_DATA);
  // Équipements peuplés manuellement via console (voir peupler-equipements.js)
});

// Le drop est géré directement dans CdTFeuillePersonnage._onRender
