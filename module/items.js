// ================================================
// SYSTÈME D'ITEMS — ARMES & ÉQUIPEMENTS
// Les Chants de Tindalos — Foundry VTT
// ================================================

import { ArmeDataModel, EquipementDataModel } from "./datamodels.js";
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
  // Chercher la zone armes ou utiliser toute la fiche
  const zone = html.querySelector(".armes-list")
    ?? html.querySelector("[data-tab='combat']")
    ?? html.querySelector(".sheet-body")
    ?? html;

  zone.addEventListener("dragover", ev => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "copy";
    zone.classList.add("drag-over");
  });

  zone.addEventListener("dragleave", () => {
    zone.classList.remove("drag-over");
  });

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
  });
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
// INITIALISATION DU COMPENDIUM D'ARMES
// ------------------------------------------------
async function initialiserCompendiumArmes() {
  const NOM_PACK = "chants-de-tindalos.armes";

  let pack = game.packs.get(NOM_PACK);
  if (!pack) {
    console.log("CDT | Pack armes non trouvé.");
    return;
  }

  // Vérifier si déjà peuplé
  const contenu = await pack.getDocuments();
  if (contenu.length > 0) return;

  // Déverrouiller le compendium
  await pack.configure({ locked: false });

  console.log("CDT | Peuplement du compendium d'armes...");
  for (const armeData of CDT_ARMES_DATA) {
    await Item.create(armeData, { pack: NOM_PACK });
  }

  // Reverrouiller
  await pack.configure({ locked: true });

  console.log(`CDT | ${CDT_ARMES_DATA.length} armes ajoutées au compendium !`);
  ui.notifications.info(`⚔️ Compendium d'armes initialisé (${CDT_ARMES_DATA.length} armes) !`);
}

// ------------------------------------------------
// ENREGISTREMENT
// ------------------------------------------------
Hooks.once("init", function () {
  // CONFIG.Item.dataModels est enregistré dans datamodels.js

  foundry.documents.collections.Items.registerSheet("chants-de-tindalos", CdTFeuilleArme, {
    types: ["arme"],
    makeDefault: true,
    label: "Fiche Arme CDT",
  });
});

Hooks.once("ready", function () {
  initialiserCompendiumArmes();
});

// Brancher le drag & drop sur la fiche PJ via hook Foundry
Hooks.on("renderCdTFeuillePersonnage", (app, html) => {
  const el = html instanceof HTMLElement ? html : (html[0] ?? html);
  _activerDropArmes(el, app.actor);
});
