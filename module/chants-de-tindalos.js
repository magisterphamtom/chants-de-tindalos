// ================================================
// Les Chants de Tindalos - Système Foundry VTT v13
// Développé pour Walpurgis Éditions
// ================================================

const { ActorSheetV2 } = foundry.applications.sheets;
const { HandlebarsApplicationMixin } = foundry.applications.api;

// ================================================
// CARTES PLP
// ================================================
const CARTES_PLP = {
  1: [
    { nom: "Il faut que ça sorte",        description: "Vous devez HURLER à pleins poumons." },
    { nom: "Un au-delà rassurant",         description: "Vous devez PRIER pour votre (vos) divinité(s)." },
    { nom: "Un monde d'imbéciles",         description: "Vous devez INSULTER quelqu'un." },
    { nom: "Je suis une terreur !",        description: "Vous devez MENACER quelqu'un." },
    { nom: "Ad nauseam.",                  description: "Vous devez VOMIR immédiatement." },
    { nom: "Jérémiades",                   description: "Vous devez PLEURER à chaudes larmes." },
    { nom: "Un oeil pour un oeil.",        description: "Vous devez immédiatement DIFFAMER un interlocuteur." },
    { nom: "Le meilleur.",                 description: "Vous devez vous VANTER de vos compétences." },
    { nom: "Expiation",                    description: "Vous devez CONFESSER à haute voix une mauvaise action." },
    { nom: "Oiseau de mauvais augure.",    description: "Vous devez IMAGINER le pire à haute voix." },
    { nom: "Maître des destins",           description: "Vous devez ECRASER un insecte ou une araignée." },
    { nom: "Disque rayé",                  description: "Vous devez CRIER 10 fois un mot." },
    { nom: "Colère théâtrale",             description: "Vous devez CASSER un objet." },
    { nom: "Monologue",                    description: "Vous devez DIALOGUER avec vous-même." },
    { nom: "Gênant",                       description: "Vous devez DENIGRER la tenue vestimentaire d'un interlocuteur." },
    { nom: "Rire nerveux",                 description: "Vous devez ECLATER d'un rire incontrôlable." },
    { nom: "Chuuuuut !",                   description: "Vous devez ORDONNER aux autres de se taire." },
    { nom: "Tout m'afflige et me nuit...", description: "Vous devez vous PLAINDRE de vos malheurs." },
    { nom: "Quoi ?!",                      description: "Vous devez CRIER aux autres de parler plus fort." },
  ],
  2: [
    { nom: "Soufflet",                     description: "Vous devez GIFLER quelqu'un." },
    { nom: "Courage, fuyons !",            description: "Vous devez vous ELOIGNER tout de suite." },
    { nom: "Le nourrisson",                description: "Vous devez vous PROSTRER en position foetale." },
    { nom: "Régression infantile.",        description: "Vous devez APPELER votre maman en criant." },
    { nom: "Le courroucé",                 description: "Vous devez REDUIRE EN MIETTES un objet." },
    { nom: "Le prophète",                  description: "Vous devez ANNONCER la fin du monde en public." },
    { nom: "Bouge de là !",                description: "Vous devez BOUSCULER quelqu'un." },
    { nom: "Rage Kick",                    description: "Vous devez DONNER un coup de pied." },
    { nom: "Le flagellant",                description: "Vous devez vous PUNIR." },
    { nom: "Trop bavard",                  description: "Vous devez REVELER immédiatement un secret." },
    { nom: "Le bouquetin",                 description: "Vous devez ASSENER un coup de tête à une surface solide." },
    { nom: "J'étais là",                   description: "Vous devez LAISSER votre trace dans votre environnement." },
    { nom: "Rhéteur",                      description: "Vous devez HUMILIER un contradicteur." },
    { nom: "Le lama",                      description: "Vous devez CRACHER sur quelqu'un." },
    { nom: "Calvitie précoce",             description: "Vous devez vous ARRACHER les cheveux." },
    { nom: "Impulsion brutale.",           description: "Vous devez FRAPPER quelqu'un." },
    { nom: "Animal",                       description: "Vous devez vous GRIFFER jusqu'au sang." },
    { nom: "Au centre de l'attention",     description: "Vous devez TOUT FAIRE pour attirer l'attention sur vous." },
  ],
  3: [
    { nom: "Le Dieu de la Destruction",   description: "Vous devez DEMOLIR votre environnement immédiat." },
    { nom: "Le Prédateur",                description: "Vous devez MORDRE quelqu'un jusqu'au sang." },
    { nom: "Voeu de pauvreté",            description: "Vous devez vous DEBARASSER de toutes vos possessions de valeur." },
    { nom: "Expert pyromane",             description: "Vous devez REDUIRE EN CENDRES un lieu." },
    { nom: "Un manager efficace",         description: "Vous devez ROUER DE COUPS quelqu'un." },
    { nom: "Le Grand Prêtre",             description: "Vous devez vous PRESENTER comme le prophète d'une entité supérieure." },
    { nom: "On étouffe !",                description: "Vous devez DECHIRER vos vêtements." },
    { nom: "Dans mon cocon",              description: "Vous devez LIGOTER quelqu'un." },
    { nom: "Faust",                       description: "Vous devez PACTISER avec le Diable." },
    { nom: "Héroïsme",                    description: "Vous devez ALLER à la rencontre du danger." },
  ],
  4: [
    { nom: "Tueur de sang-froid",         description: "Vous devez ABATTRE quelqu'un qui a exprimé un désaccord avec vous." },
    { nom: "Tu ne médiras plus",          description: "Vous devez ARRACHER une langue." },
    { nom: "Colère Divine",               description: "Vous devez MASSACRER un humain ou un animal." },
    { nom: "Tu ne me feras plus d'ombre !", description: "Vous devez DEFIGURER quelqu'un." },
    { nom: "L'Haruspice",                 description: "Vous devez SACRIFIER quelqu'un à votre cause." },
    { nom: "Double-face",                 description: "Vous devez TRAHIR votre camp." },
    { nom: "Le bourreau de soi-même",     description: "Vous devez vous MUTILER gravement." },
  ],
};

// ================================================
// MALUS SD PAR TYPE DE BLESSURE
// ================================================
const MALUS_SD_BLESSURE = {
  "Superficielle": 0,
  "Legere":        0,
  "Moderee":       1,
  "Serieuse":      2,
};

const PERTE_RESERVE_BLESSURE = {
  "Superficielle": 1,
  "Legere":        2,
  "Moderee":       4,
  "Serieuse":      6,
};

// ================================================
// LABELS DES MILIEUX
// ================================================
const LABELS_MILIEUX = {
  academie:  "Académie",
  commerce:  "Commerce",
  culture:   "Culture",
  itinerant: "Itinérant",
  laborieux: "Laborieux",
  louche:    "Louche",
  occulte:   "Occulte",
  ordre:     "Ordre",
  politique: "Politique",
  sante:     "Santé",
};

// ================================================
// TABLES PLP
// ================================================
async function initialiserTablesPLP() {
  console.log("CDT | Initialisation des tables PLP...");
  for (const niveau of [1, 2, 3, 4]) {
    await creerTablePLP(niveau);
  }
  console.log("CDT | Tables PLP prêtes !");
}

async function creerTablePLP(niveau) {
  const nomTable = `PLP - Niveau ${niveau}`;
  const tableExistante = game.tables.find((t) => t.name === nomTable);
  if (tableExistante) return tableExistante;

  const cartes = CARTES_PLP[niveau];
  const resultats = cartes.map((carte, index) => ({
    type: CONST.TABLE_RESULT_TYPES.TEXT,
    text: `<b>${carte.nom}</b><br>${carte.description}`,
    weight: 1,
    range: [index + 1, index + 1],
  }));

  const table = await RollTable.create({
    name: nomTable,
    formula: `1d${cartes.length}`,
    results: resultats,
    replacement: true,
    displayRoll: true,
    img: "icons/svg/d20-grey.svg",
  });

  console.log(`CDT | Table "${nomTable}" créée avec ${cartes.length} cartes.`);
  return table;
}

async function piocherCartePLP(niveau, acteur) {
  const nomTable = `PLP - Niveau ${niveau}`;
  const table = game.tables.find((t) => t.name === nomTable);
  if (!table) return;

  const draw = await table.draw({ displayChat: false });
  const carte = draw.results[0];
  if (!carte) return;

  const perteTension = await calculerPerteTension(niveau);

  await ChatMessage.create({
    speaker: acteur ? ChatMessage.getSpeaker({ actor: acteur }) : {},
    content: `
      <div style="background:#1a0a0a;border:2px solid #8b0000;
                  padding:10px;border-radius:4px;color:#f4e8d0;">
        <div style="font-size:0.75em;text-transform:uppercase;
                    letter-spacing:2px;color:#c8a882;margin-bottom:6px;">
          💀 Carte PLP — Niveau ${niveau}
        </div>
        <div style="font-size:1.05em;">${carte.text}</div>
        <div style="margin-top:8px;font-size:0.85em;color:#c8a882;
                    border-top:1px solid #8b0000;padding-top:6px;">
          Tension perdue : <b>-${perteTension}</b>
          ${acteur ? `(pensez à mettre à jour la fiche de ${acteur.name})` : ""}
        </div>
      </div>
    `,
  });

  return { carte, perteTension };
}

async function calculerPerteTension(niveau) {
  let formule;
  switch (niveau) {
    case 1: formule = "1d3"; break;
    case 2: formule = "1d6"; break;
    case 3: formule = "2d6"; break;
    case 4: formule = "3d6"; break;
    default: formule = "1d3";
  }
  const roll = new Roll(formule);
  await roll.evaluate();
  return roll.total;
}

// ================================================
// APPLIQUER UNE BLESSURE
// ================================================
async function appliquerBlessure(acteur, typeBlessure) {
  const system = acteur.system;
  const perteReserve = PERTE_RESERVE_BLESSURE[typeBlessure] ?? 0;
  const malusSD = MALUS_SD_BLESSURE[typeBlessure] ?? 0;

  const reserveActuelle = system.jauges?.reserve?.valeur ?? 0;
  const malusSDActuel = system.malusSD ?? 0;

  const updates = {};
  if (perteReserve > 0) {
    updates["system.jauges.reserve.valeur"] = Math.max(0, reserveActuelle - perteReserve);
  }
  if (malusSD > 0) {
    updates["system.malusSD"] = malusSDActuel + malusSD;
  }

  await acteur.update(updates);

  const couleur = typeBlessure === "Serieuse" ? "#8b0000"
    : typeBlessure === "Moderee" ? "#c87010" : "#5c3010";

  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: acteur }),
    content: `
      <div style="background:#f0d0d0;border:1px solid #8b0000;
                  padding:8px;border-radius:4px;">
        <b style="color:${couleur};">🩸 Blessure ${typeBlessure}</b><br>
        Réserve : <b>-${perteReserve}</b>
        ${malusSD > 0 ? `— SD : <b>+${malusSD}</b>` : ""}
        ${reserveActuelle - perteReserve <= 0
          ? "<br><b style='color:#8b0000;'>⚠️ Inconscient !</b>" : ""}
      </div>
    `,
  });
}

// ================================================
// GAGNER XP FOLIE
// ================================================
async function gagnerXPFolie(acteur, montant = 1) {
  const system = acteur.system;
  const xpActuel = system.jauges?.folie?.xp ?? 0;
  const folieActuelle = system.jauges?.folie?.valeur ?? 0;
  const maitriseActuelle = system.variables?.maitrise ?? 0;
  const intuitionActuelle = system.variables?.intuition ?? 0;

  let nouvelXP = xpActuel + montant;
  const updates = {};
  let messages = [];

  while (nouvelXP >= 8) {
    nouvelXP -= 8;
    const nouvelleFolie = folieActuelle + 1;
    updates["system.jauges.folie.valeur"] = nouvelleFolie;
    updates["system.variables.maitrise"] = maitriseActuelle - 1;
    updates["system.variables.intuition"] = intuitionActuelle + 1;
    messages.push(`💀 <b>+1 Folie !</b> Maîtrise -1, Intuition +1`);

    if (nouvelleFolie % 4 === 0) {
      messages.push(`🔮 <b>Nouvelle Révélation !</b> (${nouvelleFolie} points de Folie)`);
    }
  }

  updates["system.jauges.folie.xp"] = nouvelXP;
  await acteur.update(updates);

  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: acteur }),
    content: `
      <div style="background:#f0d0f0;border:1px solid #6a1a7c;
                  padding:8px;border-radius:4px;">
        <b style="color:#6a1a7c;">🧠 +${montant} XP de Folie</b><br>
        XP Folie : <b>${nouvelXP} / 8</b>
        ${messages.length > 0 ? `<br>${messages.join("<br>")}` : ""}
      </div>
    `,
  });
}

// ================================================
// GAGNER XP ESPOIR
// ================================================
async function gagnerXPEspoir(acteur, montant = 1) {
  const system = acteur.system;
  const xpActuel = system.jauges?.espoir?.xp ?? 0;
  const espoirActuel = system.jauges?.espoir?.valeur ?? 0;

  let nouvelXP = xpActuel + montant;
  const updates = {};
  let bonusEspoir = 0;

  while (nouvelXP >= 8) {
    nouvelXP -= 8;
    bonusEspoir++;
  }

  updates["system.jauges.espoir.xp"] = nouvelXP;
  if (bonusEspoir > 0) {
    updates["system.jauges.espoir.valeur"] = espoirActuel + bonusEspoir;
  }

  await acteur.update(updates);

  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: acteur }),
    content: `
      <div style="background:#f0f0d0;border:1px solid #c8a020;
                  padding:8px;border-radius:4px;">
        <b style="color:#8b6010;">✨ +${montant} XP d'Espoir</b><br>
        XP Espoir : <b>${nouvelXP} / 8</b>
        ${bonusEspoir > 0 ? `<br>⭐ <b>+${bonusEspoir} Espoir permanent !</b>` : ""}
      </div>
    `,
  });
}

// ================================================
// DIALOGUES
// ================================================

async function ouvrirDialogueJet(nomAction, nbDesBase, sd, cout, espoir, desMilieuBonus = 0) {
  return new Promise((resolve) => {
    const contenu = `
      <div class="cdt-dialogue-jet">
        <div class="dialogue-info">
          <div class="dialogue-action">🎲 ${nomAction}</div>
          <div class="dialogue-base">
            Dés de base : <b>${nbDesBase}</b> — Seuil : <b>${sd}+</b>
            ${desMilieuBonus > 0 ? `<br>Dés de milieu : <b>+${desMilieuBonus}</b>` : ""}
          </div>
        </div>
        <div class="dialogue-options">
          <div class="dialogue-ligne">
            <label>Dés bonus (coût Réserve : ${cout} par dé, max 2)</label>
            <input type="number" id="des-bonus" value="0" min="0" max="2" />
          </div>
          <div class="dialogue-ligne">
            <label>Dés bonus du MJ</label>
            <input type="number" id="des-mj" value="0" min="0" max="10" />
          </div>
          <div class="dialogue-ligne">
            <label>🕯️ Dépenser 1 point d'Espoir (1d8 explosif)
              — Espoir disponible : <b>${espoir}</b></label>
            <input type="checkbox" id="espoir-check"
                   ${espoir <= 0 ? "disabled" : ""} />
          </div>
          <div class="dialogue-total">
            Total : <span id="total-des">${nbDesBase + desMilieuBonus}</span> dés
            <span id="espoir-label" style="display:none;color:#8b4513;">
              + 1d8 ✨
            </span>
          </div>
        </div>
      </div>
    `;

    const dialogue = new Dialog({
      title: `Jet — ${nomAction}`,
      content: contenu,
      buttons: {
        lancer: {
          label: "🎲 Lancer",
          callback: (html) => {
            const desBonus = Number(html.find("#des-bonus").val()) || 0;
            const desMJ = Number(html.find("#des-mj").val()) || 0;
            const espoirCheck = html.find("#espoir-check");
            const depenseEspoir = espoirCheck.length > 0
              ? espoirCheck.prop("checked") : false;
            resolve({ lancer: true, desBonus, desMJ, depenseEspoir });
          },
        },
        annuler: {
          label: "Annuler",
          callback: () => resolve({ lancer: false }),
        },
      },
      default: "lancer",
      render: (html) => {
        const majTotal = () => {
          const bonus = Number(html.find("#des-bonus").val()) || 0;
          const mj = Number(html.find("#des-mj").val()) || 0;
          html.find("#total-des").text(nbDesBase + desMilieuBonus + bonus + mj);
          const espCheck = html.find("#espoir-check").prop("checked");
          html.find("#espoir-label").toggle(espCheck);
        };
        html.find("#des-bonus").on("input", majTotal);
        html.find("#des-mj").on("input", majTotal);
        html.find("#espoir-check").on("change", majTotal);
      },
    });

    dialogue.render(true);
  });
}

async function ouvrirDialogueJetDefensif(nbDesBase, sd, defCarac, espoir, reserve, cout) {
  return new Promise((resolve) => {
    const contenu = `
      <div class="cdt-dialogue-jet">
        <div class="dialogue-info">
          <div class="dialogue-action">🛡️ Jet Défensif</div>
          <div class="dialogue-base">
            Dés de base : <b>${nbDesBase}</b> — Seuil : <b>${sd}+</b><br>
            Défense VIG : <b>${defCarac}</b> échec(s) retiré(s)
          </div>
        </div>
        <div class="dialogue-options">
          <div class="dialogue-ligne">
            <label>Dés en moins (coût Réserve : ${cout} par dé)</label>
            <input type="number" id="des-reserve" value="0" min="0"
                   max="${Math.floor(reserve / cout)}" />
          </div>
          <div class="dialogue-ligne">
            <label>Dés bonus du MJ (situation difficile)</label>
            <input type="number" id="des-mj" value="0" min="0" max="10" />
          </div>
          <div class="dialogue-ligne">
            <label>🕯️ Dépenser 1 Espoir (retire 1 dé + 1d8 explosif)
              — Espoir disponible : <b>${espoir}</b></label>
            <input type="checkbox" id="espoir-check"
                   ${espoir <= 0 ? "disabled" : ""} />
          </div>
          <div class="dialogue-total">
            Total : <span id="total-des">${nbDesBase}</span> dés
          </div>
        </div>
      </div>
    `;

    const dialogue = new Dialog({
      title: "Jet Défensif",
      content: contenu,
      buttons: {
        lancer: {
          label: "🛡️ Lancer",
          callback: (html) => {
            const desReserve = Number(html.find("#des-reserve").val()) || 0;
            const desMJ = Number(html.find("#des-mj").val()) || 0;
            const espoirCheck = html.find("#espoir-check");
            const depenseEspoir = espoirCheck.length > 0
              ? espoirCheck.prop("checked") : false;
            resolve({ lancer: true, desReserve, desMJ, depenseEspoir });
          },
        },
        annuler: {
          label: "Annuler",
          callback: () => resolve({ lancer: false }),
        },
      },
      default: "lancer",
      render: (html) => {
        const majTotal = () => {
          const res = Number(html.find("#des-reserve").val()) || 0;
          const mj = Number(html.find("#des-mj").val()) || 0;
          const esp = html.find("#espoir-check").prop("checked") ? 1 : 0;
          html.find("#total-des").text(Math.max(1, nbDesBase - res - esp + mj));
        };
        html.find("#des-reserve").on("input", majTotal);
        html.find("#des-mj").on("input", majTotal);
        html.find("#espoir-check").on("change", majTotal);
      },
    });

    dialogue.render(true);
  });
}

async function ouvrirDialogueAttaque(arme, caracVal, sd, espoir, reserve, cout) {
  return new Promise((resolve) => {
    const typeLabel = arme.type === "corpsacorps"
      ? "Corps-à-corps (VIG)" : "Distance (AGI)";

    const contenu = `
      <div class="cdt-dialogue-jet">
        <div class="dialogue-info">
          <div class="dialogue-action">⚔️ ${arme.nom || "Attaque"}</div>
          <div class="dialogue-base">
            Type : <b>${typeLabel}</b><br>
            Dés de base : <b>${caracVal}</b> — Seuil : <b>${sd}+</b><br>
            Blessure : <b>${arme.blessure}</b> — Létalité : <b>${arme.letalite}</b>
          </div>
        </div>
        <div class="dialogue-options">
          <div class="dialogue-ligne">
            <label>Dés bonus (coût Réserve : ${cout} par dé, max 2)</label>
            <input type="number" id="des-bonus" value="0" min="0" max="2" />
          </div>
          <div class="dialogue-ligne">
            <label>Dés bonus du MJ</label>
            <input type="number" id="des-mj" value="0" min="0" max="10" />
          </div>
          <div class="dialogue-ligne">
            <label>🕯️ Dépenser 1 Espoir (1d8 explosif)
              — Espoir disponible : <b>${espoir}</b></label>
            <input type="checkbox" id="espoir-check"
                   ${espoir <= 0 ? "disabled" : ""} />
          </div>
          <div class="dialogue-total">
            Total : <span id="total-des">${caracVal}</span> dés
            <span id="espoir-label" style="display:none;color:#8b4513;">
              + 1d8 ✨
            </span>
          </div>
        </div>
      </div>
    `;

    const dialogue = new Dialog({
      title: `Attaque — ${arme.nom || "Arme"}`,
      content: contenu,
      buttons: {
        lancer: {
          label: "⚔️ Attaquer",
          callback: (html) => {
            const desBonus = Number(html.find("#des-bonus").val()) || 0;
            const desMJ = Number(html.find("#des-mj").val()) || 0;
            const espoirCheck = html.find("#espoir-check");
            const depenseEspoir = espoirCheck.length > 0
              ? espoirCheck.prop("checked") : false;
            resolve({ lancer: true, desBonus, desMJ, depenseEspoir });
          },
        },
        annuler: {
          label: "Annuler",
          callback: () => resolve({ lancer: false }),
        },
      },
      default: "lancer",
      render: (html) => {
        const majTotal = () => {
          const bonus = Number(html.find("#des-bonus").val()) || 0;
          const mj = Number(html.find("#des-mj").val()) || 0;
          html.find("#total-des").text(caracVal + bonus + mj);
          const espCheck = html.find("#espoir-check").prop("checked");
          html.find("#espoir-label").toggle(espCheck);
        };
        html.find("#des-bonus").on("input", majTotal);
        html.find("#des-mj").on("input", majTotal);
        html.find("#espoir-check").on("change", majTotal);
      },
    });

    dialogue.render(true);
  });
}

// --- INITIALISATION DU SYSTÈME ---
Hooks.once("init", function () {
  console.log("Chants de Tindalos | Initialisation du système...");

  game.chantsdetindalos = {
    CdTActeur,
    CdTFeuillePersonnage,
    CdTFeuillePNJ,
    piocherCartePLP,
    gagnerXPFolie,
    gagnerXPEspoir,
  };

  CONFIG.Actor.documentClass = CdTActeur;

  CONFIG.Combat.initiative = {
    formula: "@system.variables.vitesse + @system.variables.intuition * 0.1 + 1d6 * 0.001",
    decimals: 3,
  };

  const ActorsCollection = foundry.documents.collections.Actors;
  const ActorSheetV1 = foundry.appv1.sheets.ActorSheet;

  ActorsCollection.unregisterSheet("core", ActorSheetV1);
  ActorsCollection.registerSheet("chants-de-tindalos", CdTFeuillePersonnage, {
    types: ["personnage"],
    makeDefault: true,
    label: "Feuille Personnage CDT",
  });
  ActorsCollection.registerSheet("chants-de-tindalos", CdTFeuillePNJ, {
    types: ["pnj"],
    makeDefault: true,
    label: "Feuille PNJ CDT",
  });

  chargerTemplates();
  console.log("Chants de Tindalos | Système initialisé !");
});

Hooks.once("ready", async function () {
  await initialiserTablesPLP();
  await initialiserWiki();
  await afficherWikiSiPremiereLancement();
});

// ================================================
// WIKI — OUVERTURE AUTOMATIQUE AU PREMIER LANCEMENT
// ================================================
async function afficherWikiSiPremiereLancement() {
  const CLE = "wikiDejaVu";
  if (!game.settings.settings.has(`chants-de-tindalos.${CLE}`)) {
    game.settings.register("chants-de-tindalos", CLE, {
      name: "Wiki déjà consulté",
      scope: "client",
      config: false,
      type: Boolean,
      default: false,
    });
  }
  const dejaVu = game.settings.get("chants-de-tindalos", CLE);
  if (!dejaVu) {
    setTimeout(async () => {
      const journal = game.journal.find(j => j.name === "📖 Wiki — Les Chants de Tindalos");
      if (journal) {
        journal.sheet.render(true);
        await game.settings.set("chants-de-tindalos", CLE, true);
      }
    }, 1500);
  }
}

// ================================================
// BOUTONS DANS LE PANNEAU ACTEURS
// ================================================
Hooks.on("renderActorDirectory", (app, html) => {
  const footer = html.querySelector(".directory-footer") ?? html.querySelector(".header-actions");
  if (!footer) return;

  const boutonCreation = document.createElement("button");
  boutonCreation.innerHTML = "🎲 Créer un personnage";
  boutonCreation.style.cssText = "width:100%;margin:4px 0;padding:6px;background:#8b4513;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:0.9em;";
  boutonCreation.addEventListener("click", () => new CdTCreationPersonnage().render(true));

  const boutonWiki = document.createElement("button");
  boutonWiki.innerHTML = "📖 Wiki du système";
  boutonWiki.style.cssText = "width:100%;margin:4px 0;padding:6px;background:#3d1a1a;color:#d4a96a;border:1px solid #8b4513;border-radius:4px;cursor:pointer;font-size:0.9em;";
  boutonWiki.addEventListener("click", () => {
    const journal = game.journal.find(j => j.name === "📖 Wiki — Les Chants de Tindalos");
    if (journal) journal.sheet.render(true);
    else ui.notifications.warn("Wiki introuvable — rechargez la page (F5).");
  });

  footer.prepend(boutonWiki);
  footer.prepend(boutonCreation);
});

// ================================================
// CLASSE ACTEUR
// ================================================
class CdTActeur extends Actor {

  prepareData() {
    super.prepareData();
    const system = this.system;

    const agi = system.caracteristiques?.agilite?.valeur ?? 1;
    const vig = system.caracteristiques?.vigueur?.valeur ?? 1;
    if (system.variables) {
      system.variables.vitesse = agi + vig + 2;
    }

    const tension = system.jauges?.tension?.valeur ?? 0;
    const malusSD = system.malusSD ?? 0;
    system.seuilDifficulte = calculerSD(tension) + malusSD;
  }
}

// ================================================
// FEUILLE DE PERSONNAGE - API V13
// ================================================
class CdTFeuillePersonnage extends HandlebarsApplicationMixin(ActorSheetV2) {

  static DEFAULT_OPTIONS = {
    classes: ["chants-de-tindalos", "sheet", "actor"],
    position: { width: 680, height: 780 },
    window: { resizable: true },
  };

  static PARTS = {
    header: {
      template: "systems/chants-de-tindalos/templates/actor/header.html",
    },
    principal: {
      template: "systems/chants-de-tindalos/templates/actor/onglet-principal.html",
    },
    competences: {
      template: "systems/chants-de-tindalos/templates/actor/onglet-competences.html",
    },
    milieux: {
      template: "systems/chants-de-tindalos/templates/actor/onglet-milieux.html",
    },
    combat: {
      template: "systems/chants-de-tindalos/templates/actor/onglet-combat.html",
    },
    avance: {
      template: "systems/chants-de-tindalos/templates/actor/onglet-avance.html",
    },
    notes: {
      template: "systems/chants-de-tindalos/templates/actor/onglet-notes.html",
    },
  };

  _tabActif = "principal";

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.actor = this.actor;
    context.system = this.actor.system;
    context.tabActif = this._tabActif;
    return context;
  }

  async _preparePartContext(partId, context) {
    context = await super._preparePartContext(partId, context);
    context.actor = this.actor;
    context.system = this.actor.system;
    context.tabActif = this._tabActif;
    return context;
  }

  _onRender(context, options) {
    super._onRender(context, options);
    const html = this.element;

    // --- SAUVEGARDE AUTOMATIQUE ---
    html.querySelectorAll("input, textarea, select").forEach((input) => {
      input.addEventListener("change", (ev) => {
        const name = ev.currentTarget.name;
        const value = ev.currentTarget.type === "number"
          ? Number(ev.currentTarget.value)
          : ev.currentTarget.type === "checkbox"
          ? ev.currentTarget.checked
          : ev.currentTarget.value;
        if (name) this.actor.update({ [name]: value });
      });
    });

  // --- CHANGEMENT DE PORTRAIT ---
    html.querySelectorAll("img[data-edit]").forEach((img) => {
      img.addEventListener("click", (ev) => {
        ev.preventDefault();
        const attr = ev.currentTarget.dataset.edit;
        const fp = new FilePicker({
          type: "image",
          current: foundry.utils.getProperty(this.actor, attr),
          callback: (path) => { this.actor.update({ [attr]: path }); },
        });
        fp.browse();
      });
    });

  // --- POSSESSIONS PNJ CLIQUABLES ---
html.querySelectorAll(".pnj-possession-item input[type='checkbox']").forEach((checkbox) => {
  checkbox.addEventListener("change", (ev) => {
    const label = checkbox.closest(".pnj-possession-item");
    label.classList.toggle("active", checkbox.checked);
    this.actor.update({ [checkbox.name]: checkbox.checked });
  });
});

    // --- BARRE DE TENSION CLIQUABLE ---
    const tensionActuelle = this.actor.system.jauges?.tension?.valeur ?? 0;
    html.querySelectorAll(".tension-cases:not(.onirisme-cases) .tension-case").forEach((caseEl) => {
      const valeur = Number(caseEl.dataset.valeur);
      if (valeur <= tensionActuelle) caseEl.classList.add("active");
      else caseEl.classList.remove("active");

      caseEl.addEventListener("click", (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        const val = Number(ev.currentTarget.dataset.valeur);
        const tensionCourante = this.actor.system.jauges?.tension?.valeur ?? 0;
        const nouvelleTension = val === tensionCourante ? val - 1 : val;
        this.actor.update({
          "system.jauges.tension.valeur": Math.max(0, Math.min(20, nouvelleTension))
        });
      });
    });

    // --- BARRE D'ONIRISME CLIQUABLE ---
    const onirismeActuel = this.actor.system.jauges?.onirisme?.valeur ?? 0;
    html.querySelectorAll(".onirisme-cases .tension-case").forEach((caseEl) => {
      const valeur = Number(caseEl.dataset.valeur);
      if (valeur <= onirismeActuel) caseEl.classList.add("active");
      else caseEl.classList.remove("active");

      caseEl.addEventListener("click", (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        const val = Number(ev.currentTarget.dataset.valeur);
        const onirismeCoruant = this.actor.system.jauges?.onirisme?.valeur ?? 0;
        const nouvelOnirisme = val === onirismeCoruant ? val - 1 : val;
        this.actor.update({
          "system.jauges.onirisme.valeur": Math.max(0, Math.min(20, nouvelOnirisme))
        });
      });
    });

    // --- CASES XP ESPOIR CLIQUABLES ---
    const xpEspoirActuel = this.actor.system.jauges?.espoir?.xp ?? 0;
    html.querySelectorAll("#xp-espoir-cases .xp-case").forEach((caseEl) => {
      const valeur = Number(caseEl.dataset.valeur);
      if (valeur <= xpEspoirActuel) caseEl.classList.add("active");
      else caseEl.classList.remove("active");

      caseEl.addEventListener("click", (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        const val = Number(ev.currentTarget.dataset.valeur);
        const xpCourant = this.actor.system.jauges?.espoir?.xp ?? 0;
        const nouvelXP = val === xpCourant ? val - 1 : val;
        if (nouvelXP >= 8) {
          gagnerXPEspoir(this.actor, 8 - xpCourant);
        } else {
          this.actor.update({
            "system.jauges.espoir.xp": Math.max(0, Math.min(7, nouvelXP))
          });
        }
      });
    });

    // --- CASES XP FOLIE CLIQUABLES ---
    const xpFolieActuel = this.actor.system.jauges?.folie?.xp ?? 0;
    html.querySelectorAll("#xp-folie-cases .xp-case").forEach((caseEl) => {
      const valeur = Number(caseEl.dataset.valeur);
      if (valeur <= xpFolieActuel) caseEl.classList.add("active");
      else caseEl.classList.remove("active");

      caseEl.addEventListener("click", (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        const val = Number(ev.currentTarget.dataset.valeur);
        const xpCourant = this.actor.system.jauges?.folie?.xp ?? 0;
        const nouvelXP = val === xpCourant ? val - 1 : val;
        if (nouvelXP >= 8) {
          gagnerXPFolie(this.actor, 8 - xpCourant);
        } else {
          this.actor.update({
            "system.jauges.folie.xp": Math.max(0, Math.min(7, nouvelXP))
          });
        }
      });
    });

    // --- JETS DE MILIEU CLIQUABLES ---
    html.querySelectorAll(".milieu-row.rollable").forEach((el) => {
      el.addEventListener("click", (ev) => {
        if (ev.target.tagName === "INPUT") return;
        ev.preventDefault();
        ev.stopPropagation();
        this._jetMilieu(ev.currentTarget.dataset.milieu);
      });
    });

    // --- GESTION DES ONGLETS ---
    this._initialiserOnglets(html);

    // --- JETS ---
    html.querySelectorAll(".carac-box.rollable").forEach((el) => {
      el.addEventListener("click", (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        this._jetCaracteristique(ev.currentTarget.dataset.carac);
      });
    });

    html.querySelectorAll(".comp-socle.rollable").forEach((el) => {
      el.addEventListener("click", (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        this._jetCompetence(ev.currentTarget.dataset.comp, "socle");
      });
    });

    html.querySelectorAll(".comp-specialite.rollable").forEach((el) => {
      el.addEventListener("click", (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        this._jetCompetence(ev.currentTarget.dataset.comp, "specialite");
      });
    });

    html.querySelectorAll(".btn-jet-maitrise").forEach((el) => {
      el.addEventListener("click", (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        this._jetMaitrise();
      });
    });

    html.querySelectorAll(".btn-jet-defensif").forEach((el) => {
      el.addEventListener("click", (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        this._jetDefensif();
      });
    });

    html.querySelectorAll(".btn-jet-sommeil").forEach((el) => {
      el.addEventListener("click", (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        this._jetSommeil();
      });
    });

    html.querySelectorAll(".btn-attaquer").forEach((el) => {
      el.addEventListener("click", (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        this._attaquer(ev.currentTarget.dataset.arme);
      });
    });

    html.querySelectorAll(".btn-arret-cardiaque").forEach((el) => {
      el.addEventListener("click", (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        this._arretCardiaque();
      });
    });

    html.querySelectorAll(".btn-jet-arcanes").forEach((el) => {
      el.addEventListener("click", (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        this._jetArcanes();
      });
    });
  }

  // ------------------------------------------------
  // GESTION DES ONGLETS
  // ------------------------------------------------
  _initialiserOnglets(html) {
    html.querySelectorAll(".tab[data-tab]").forEach((tab) => {
      if (tab.dataset.tab === this._tabActif) {
        tab.style.display = "block";
        tab.classList.add("active");
      } else {
        tab.style.display = "none";
        tab.classList.remove("active");
      }
    });

    html.querySelectorAll(".sheet-tabs .item").forEach((item) => {
      if (item.dataset.tab === this._tabActif) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    html.querySelectorAll(".sheet-tabs .item").forEach((item) => {
      item.addEventListener("click", (ev) => {
        ev.preventDefault();
        const tabId = ev.currentTarget.dataset.tab;
        this._tabActif = tabId;

        html.querySelectorAll(".sheet-tabs .item").forEach((i) => {
          i.classList.toggle("active", i.dataset.tab === tabId);
        });

        html.querySelectorAll(".tab[data-tab]").forEach((tab) => {
          if (tab.dataset.tab === tabId) {
            tab.style.display = "block";
            tab.classList.add("active");
          } else {
            tab.style.display = "none";
            tab.classList.remove("active");
          }
        });
      });
    });
  }

  // ------------------------------------------------
  // JET DE MILIEU
  // ------------------------------------------------
  async _jetMilieu(milieuId) {
    const system = this.actor.system;
    const pointsMilieu = system.milieux?.[milieuId] ?? 0;
    const carac = system.caracteristiques?.charisme;
    const caracVal = carac?.valeur ?? 1;
    const cout = carac?.cout ?? 3;
    const sd = system.seuilDifficulte ?? 3;
    const espoir = system.jauges?.espoir?.valeur ?? 0;
    const label = LABELS_MILIEUX[milieuId] ?? milieuId;

    const nomAction = `Charisme — ${label}`;
    const choix = await ouvrirDialogueJet(nomAction, caracVal, sd, cout, espoir, pointsMilieu);
    if (!choix.lancer) return;

    const nbDes = caracVal + pointsMilieu + choix.desBonus + choix.desMJ;

    if (choix.desBonus > 0) {
      const reserveActuelle = system.jauges?.reserve?.valeur ?? 0;
      await this.actor.update({
        "system.jauges.reserve.valeur": Math.max(0, reserveActuelle - (choix.desBonus * cout))
      });
    }

    if (choix.depenseEspoir && espoir > 0) {
      await this.actor.update({ "system.jauges.espoir.valeur": espoir - 1 });
    }

    const resultat = await lancerDesD6(nbDes, sd, nomAction, choix.depenseEspoir);

    if (resultat.espoirBonusObtenu) {
      const espoirActuel = this.actor.system.jauges?.espoir?.valeur ?? 0;
      await this.actor.update({ "system.jauges.espoir.valeur": espoirActuel + 2 });
    }

    afficherResultatChat(resultat, this.actor);
  }

  // ------------------------------------------------
  // JET DE CARACTÉRISTIQUE
  // ------------------------------------------------
  async _jetCaracteristique(caracId) {
    const system = this.actor.system;
    const carac = system.caracteristiques?.[caracId];
    if (!carac) return;

    const nbDesBase = carac.valeur ?? 1;
    const sd = system.seuilDifficulte ?? 3;
    const cout = carac.cout ?? 3;
    const espoir = system.jauges?.espoir?.valeur ?? 0;

    const choix = await ouvrirDialogueJet(carac.label, nbDesBase, sd, cout, espoir);
    if (!choix.lancer) return;

    const nbDes = nbDesBase + choix.desBonus + choix.desMJ;

    if (choix.desBonus > 0) {
      const reserveActuelle = system.jauges?.reserve?.valeur ?? 0;
      await this.actor.update({
        "system.jauges.reserve.valeur": Math.max(0, reserveActuelle - (choix.desBonus * cout))
      });
    }

    if (choix.depenseEspoir && espoir > 0) {
      await this.actor.update({ "system.jauges.espoir.valeur": espoir - 1 });
    }

    const resultat = await lancerDesD6(nbDes, sd, carac.label, choix.depenseEspoir);

    if (resultat.espoirBonusObtenu) {
      const espoirActuel = this.actor.system.jauges?.espoir?.valeur ?? 0;
      await this.actor.update({ "system.jauges.espoir.valeur": espoirActuel + 2 });
    }

    afficherResultatChat(resultat, this.actor);
  }

  // ------------------------------------------------
  // JET DE COMPÉTENCE
  // ------------------------------------------------
  async _jetCompetence(compId, type) {
    const system = this.actor.system;
    const comp = system.competences?.[type]?.[compId];
    if (!comp) return;

    const caracVal = system.caracteristiques?.[comp.caracLiee]?.valeur ?? 1;
    const compVal = comp.valeur ?? 0;
    const nbDesBase = caracVal + compVal;
    const sd = system.seuilDifficulte ?? 3;
    const cout = system.caracteristiques?.[comp.caracLiee]?.cout ?? 3;
    const espoir = system.jauges?.espoir?.valeur ?? 0;

    const choix = await ouvrirDialogueJet(comp.label, nbDesBase, sd, cout, espoir);
    if (!choix.lancer) return;

    const nbDes = nbDesBase + choix.desBonus + choix.desMJ;

    if (choix.desBonus > 0) {
      const reserveActuelle = system.jauges?.reserve?.valeur ?? 0;
      await this.actor.update({
        "system.jauges.reserve.valeur": Math.max(0, reserveActuelle - (choix.desBonus * cout))
      });
    }

    if (choix.depenseEspoir && espoir > 0) {
      await this.actor.update({ "system.jauges.espoir.valeur": espoir - 1 });
    }

    const resultat = await lancerDesD6(nbDes, sd, comp.label, choix.depenseEspoir);

    if (resultat.espoirBonusObtenu) {
      const espoirActuel = this.actor.system.jauges?.espoir?.valeur ?? 0;
      await this.actor.update({ "system.jauges.espoir.valeur": espoirActuel + 2 });
    }

    afficherResultatChat(resultat, this.actor);
  }

  // ------------------------------------------------
  // JET DE MAÎTRISE
  // ------------------------------------------------
  async _jetMaitrise() {
    const system = this.actor.system;
    const tension = system.jauges?.tension?.valeur ?? 0;
    const maitrise = system.variables?.maitrise ?? 0;

    const roll = new Roll("1d20");
    await roll.evaluate();

    const total = roll.total + maitrise;
    const succes = total >= tension;
    const couleur = succes ? "#2d6a2d" : "#8b0000";

    let bonusMaitrise = "";
    if (roll.total === 20) {
      await this.actor.update({ "system.variables.maitrise": maitrise + 1 });
      bonusMaitrise = `<div style="color:#c8a882;font-size:0.85em;margin-top:4px;">
        ⭐ 20 naturel ! Maîtrise augmentée de 1 définitivement !
      </div>`;
    }

    if (roll.total === 1) {
      await gagnerXPFolie(this.actor, 2);
    }

    if (succes) {
      await gagnerXPEspoir(this.actor, 1);
    }

    const texte = succes
      ? `✅ <b>Maîtrise réussie !</b> (${total} ≥ ${tension})`
      : `💀 <b>Perd les pédales !</b> (${total} < ${tension})`;

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      rolls: [roll],
      content: `
        <div style="background:#f4e8d0;border:1px solid #8b4513;
                    padding:8px;border-radius:4px;">
          <b style="font-size:1.1em;">🎲 Jet de Maîtrise</b><br>
          Dé : <b>${roll.total}</b> + Maîtrise (${maitrise})
          = <b style="color:${couleur}">${total}</b><br>
          Tension actuelle : <b>${tension}</b><br>
          ${texte}${bonusMaitrise}
        </div>
      `,
    });

    if (!succes) {
      const palier = calculerPalierPLP(tension);
      const palierFinal = roll.total === 1 ? Math.min(palier + 1, 4) : palier;
      await piocherCartePLP(palierFinal, this.actor);
      await gagnerXPFolie(this.actor, 1);
    }
  }

  // ------------------------------------------------
  // JET DÉFENSIF
  // ------------------------------------------------
  async _jetDefensif() {
    const system = this.actor.system;
    const vig = system.caracteristiques?.vigueur;
    const defCarac = vig?.defense ?? 1;
    const nbDesBase = vig?.valeur ?? 1;
    const sd = system.seuilDifficulte ?? 3;
    const cout = vig?.cout ?? 4;
    const espoir = system.jauges?.espoir?.valeur ?? 0;
    const reserve = system.jauges?.reserve?.valeur ?? 0;

    const choix = await ouvrirDialogueJetDefensif(
      nbDesBase, sd, defCarac, espoir, reserve, cout
    );
    if (!choix.lancer) return;

    let nbDes = Math.max(1, nbDesBase + choix.desMJ - choix.desReserve - (choix.depenseEspoir ? 1 : 0));

    if (choix.desReserve > 0) {
      await this.actor.update({
        "system.jauges.reserve.valeur": Math.max(0, reserve - (choix.desReserve * cout))
      });
    }

    if (choix.depenseEspoir && espoir > 0) {
      await this.actor.update({ "system.jauges.espoir.valeur": espoir - 1 });
    }

    const roll = new Roll(`${nbDes}d6`);
    await roll.evaluate();
    const valeurs = roll.dice[0].results.map((d) => d.result);

    let echecs = valeurs.filter((v) => v < sd).length;
    echecs += Math.floor(valeurs.filter((v) => v === 1).length / 2) * 2;

    let espoirValeurs = [];
    let echifsEspoir = 0;
    if (choix.depenseEspoir) {
      let continuer = true;
      while (continuer) {
        const d8 = new Roll("1d8");
        await d8.evaluate();
        const val = d8.total;
        espoirValeurs.push(val);
        if (val >= 7) echifsEspoir++;
        else continuer = false;
      }
    }

    const echifsFinal = Math.max(0, echecs - defCarac - echifsEspoir);

    const desAffichage = valeurs
      .map((v) => `<span style="color:${v >= sd ? "#2d6a2d" : "#8b0000"};font-weight:bold;">${v}</span>`)
      .join(" | ");

    let espoirAffichage = "";
    if (choix.depenseEspoir && espoirValeurs.length > 0) {
      const desEspoir = espoirValeurs
        .map((v) => `<span style="color:${v >= 7 ? "#2d6a2d" : "#8b0000"};font-weight:bold;">${v}${v >= 7 ? " 💥" : ""}</span>`)
        .join(" → ");
      espoirAffichage = `<div style="margin-top:4px;font-size:0.85em;color:#8b4513;">
        🕯️ Dé d'Espoir : ${desEspoir} (-${echifsEspoir} échec(s))
      </div>`;
    }

    const couleur = echifsFinal === 0 ? "#2d6a2d" : "#8b0000";

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      rolls: [roll],
      content: `
        <div style="background:#f4e8d0;border:1px solid #2d6a2d;
                    padding:8px;border-radius:4px;">
          <b style="font-size:1.1em;">🛡️ Jet Défensif</b><br>
          Dés (${nbDes}d6) : ${desAffichage}<br>
          Échecs : <b>${echecs}</b> - Défense : <b>${defCarac}</b><br>
          ${espoirAffichage}
          <span style="color:${couleur};font-size:1.1em;">
            ${echifsFinal === 0 ? "✅ <b>Succès défensif !</b>" : `❌ <b>${echifsFinal} échec(s)</b>`}
          </span>
        </div>
      `,
    });
  }

  // ------------------------------------------------
  // ATTAQUE
  // ------------------------------------------------
  async _attaquer(armeId) {
    const system = this.actor.system;
    const arme = system.armes?.[armeId];
    if (!arme || !arme.nom) return;

    const caracId = arme.type === "distance" ? "agilite" : "vigueur";
    const carac = system.caracteristiques?.[caracId];
    const caracVal = carac?.valeur ?? 1;
    const cout = carac?.cout ?? 4;
    const sd = system.seuilDifficulte ?? 3;
    const espoir = system.jauges?.espoir?.valeur ?? 0;
    const reserve = system.jauges?.reserve?.valeur ?? 0;

    const choix = await ouvrirDialogueAttaque(arme, caracVal, sd, espoir, reserve, cout);
    if (!choix.lancer) return;

    const nbDes = caracVal + choix.desBonus + choix.desMJ;

    if (choix.desBonus > 0) {
      await this.actor.update({
        "system.jauges.reserve.valeur": Math.max(0, reserve - (choix.desBonus * cout))
      });
    }

    if (choix.depenseEspoir && espoir > 0) {
      await this.actor.update({ "system.jauges.espoir.valeur": espoir - 1 });
    }

    const resultat = await lancerDesD6(nbDes, sd, arme.nom, choix.depenseEspoir);

    if (resultat.espoirBonusObtenu) {
      const espoirActuel = this.actor.system.jauges?.espoir?.valeur ?? 0;
      await this.actor.update({ "system.jauges.espoir.valeur": espoirActuel + 2 });
    }

    const succes = resultat.reussites > 0;
    const couleur = succes ? "#2d6a2d" : "#8b0000";

    const desAffichage = resultat.valeurs
      .map((v) => `<span style="color:${v >= sd ? "#2d6a2d" : "#8b0000"};font-weight:bold;">${v}</span>`)
      .join(" | ");

    let espoirAffichage = "";
    if (choix.depenseEspoir && resultat.espoirValeurs.length > 0) {
      const desEspoir = resultat.espoirValeurs
        .map((v) => `<span style="color:${v >= sd ? "#2d6a2d" : "#8b0000"};font-weight:bold;">${v}${v >= 7 ? " 💥" : ""}</span>`)
        .join(" → ");
      espoirAffichage = `<div style="margin-top:4px;font-size:0.85em;color:#8b4513;">
        🕯️ Dé d'Espoir : ${desEspoir} (+${resultat.espoirReussites} réussite(s))
      </div>`;
    }

    let letaliteAffichage = "";
    if (succes) {
      const jetLetalite = new Roll("1d20");
      await jetLetalite.evaluate();
      const bonusLetalite = Math.max(0, resultat.reussites - 1);
      const totalLetalite = jetLetalite.total + bonusLetalite;
      const mort = totalLetalite >= arme.letalite;

      if (!mort) {
        await appliquerBlessure(this.actor, arme.blessure);
      }

      letaliteAffichage = `
        <div style="margin-top:6px;padding-top:6px;border-top:1px solid #8b4513;">
          🎲 Jet de létalité : ${jetLetalite.total}
          ${bonusLetalite > 0 ? `+ ${bonusLetalite}` : ""}
          = <b>${totalLetalite}</b> / ${arme.letalite}<br>
          ${mort
            ? `<b style="color:#8b0000;">💀 MORT !</b>`
            : `<b style="color:#8b4513;">🩸 Blessure ${arme.blessure} appliquée</b>`
          }
        </div>
      `;
    }

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      rolls: [resultat.roll],
      content: `
        <div style="background:#f4e8d0;border:1px solid #8b4513;
                    padding:8px;border-radius:4px;">
          <b style="font-size:1.1em;">⚔️ ${arme.nom}</b><br>
          Dés (${nbDes}d6) : ${desAffichage}<br>
          ${espoirAffichage}
          Seuil : <b>${sd}+</b><br>
          <span style="color:${couleur};font-size:1.1em;">
            ${succes ? `✅ <b>${resultat.reussites} réussite(s)</b>` : `❌ <b>Raté !</b>`}
          </span>
          ${letaliteAffichage}
        </div>
      `,
    });
  }

  // ------------------------------------------------
  // ARRÊT CARDIAQUE
  // ------------------------------------------------
  async _arretCardiaque(tourActuel = 1) {
    const system = this.actor.system;
    const vig = system.caracteristiques?.vigueur;
    const defCarac = vig?.defense ?? 1;
    const nbDes = 1 + tourActuel;
    const sd = system.seuilDifficulte ?? 3;

    const roll = new Roll(`${nbDes}d6`);
    await roll.evaluate();
    const valeurs = roll.dice[0].results.map((d) => d.result);

    let echecs = valeurs.filter((v) => v < sd).length;
    echecs += Math.floor(valeurs.filter((v) => v === 1).length / 2) * 2;
    const echifsFinal = Math.max(0, echecs - defCarac);
    const mort = echifsFinal >= 3;

    const desAffichage = valeurs
      .map((v) => `<span style="color:${v >= sd ? "#2d6a2d" : "#8b0000"};font-weight:bold;">${v}</span>`)
      .join(" | ");

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      rolls: [roll],
      content: `
        <div style="background:#f0d0d0;border:2px solid #8b0000;
                    padding:8px;border-radius:4px;">
          <b style="font-size:1.1em;">💀 Arrêt Cardiaque — Tour ${tourActuel}</b><br>
          Jet défensif VIG (${nbDes}d6) : ${desAffichage}<br>
          Échecs : <b>${echecs}</b> - Défense : <b>${defCarac}</b>
          = <b>${echifsFinal}</b> échec(s)<br>
          ${mort
            ? `<b style="color:#8b0000;font-size:1.1em;">💀 LE PERSONNAGE MEURT !</b>`
            : `<span style="color:#2d6a2d;">✅ Survie ! Prochain tour : ${nbDes + 1}d6</span>`
          }
        </div>
      `,
    });
  }

  // ------------------------------------------------
  // JET DE SOMMEIL
  // ------------------------------------------------
  async _jetSommeil() {
    const system = this.actor.system;
    const sommeil = system.variables?.sommeil ?? 0;
    const dettes = system.variables?.dettesSommeil ?? 0;
    const tension = system.jauges?.tension?.valeur ?? 0;
    const angoisse = system.jauges?.angoisse?.valeur ?? 7;
    const reserveBase = system.jauges?.reserve?.max ?? 10;

    const roll = new Roll("1d12");
    await roll.evaluate();
    const total = roll.total + sommeil + (dettes * 5);

    let typeNuit, tensionReveil, modifReserve, modifDettes;

    if (total <= tension - 10) {
      typeNuit = "Nuit Blanche 😩";
      tensionReveil = angoisse + 2;
      modifReserve = -4;
      modifDettes = 2;
    } else if (total < tension) {
      typeNuit = "Nuit Atroce 😰";
      tensionReveil = angoisse + 1;
      modifReserve = 0;
      modifDettes = 1;
    } else {
      typeNuit = "Nuit Complète 😴";
      tensionReveil = angoisse;
      modifReserve = reserveBase;
      modifDettes = -1;
    }

    const updates = {};
    updates["system.jauges.tension.valeur"] = Math.max(0, Math.min(20, tensionReveil));

    const nouvelleDettes = Math.max(0, dettes + modifDettes);
    updates["system.variables.dettesSommeil"] = nouvelleDettes;

    if (modifReserve === reserveBase) {
      updates["system.jauges.reserve.valeur"] = reserveBase;
    } else if (modifReserve < 0) {
      const reserveActuelle = system.jauges?.reserve?.valeur ?? 0;
      updates["system.jauges.reserve.valeur"] = Math.max(0, reserveActuelle + modifReserve);
    }

    const malusDetteActuel = Math.floor(dettes / 2);
    const malusDetteNouveau = Math.floor(nouvelleDettes / 2);
    if (malusDetteNouveau !== malusDetteActuel) {
      const malusSDActuel = system.malusSD ?? 0;
      updates["system.malusSD"] = Math.max(0, malusSDActuel + (malusDetteNouveau - malusDetteActuel));
    }

    await this.actor.update(updates);

    const couleur = modifReserve === reserveBase ? "#2d6a2d"
      : modifReserve === 0 ? "#c87010" : "#8b0000";

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      rolls: [roll],
      content: `
        <div style="background:#1a1a3a;border:1px solid #4a4a8a;
                    padding:10px;border-radius:4px;color:#f4e8d0;">
          <b style="font-size:1.1em;">😴 Jet de Sommeil</b><br>
          Dé : <b>${roll.total}</b> + Sommeil (${sommeil})
          + Dettes (${dettes} × 5 = ${dettes * 5})
          = <b>${total}</b><br>
          Tension : <b>${tension}</b><br>
          <span style="color:${couleur};font-size:1.1em;">
            → <b>${typeNuit}</b>
          </span><br>
          <div style="margin-top:6px;font-size:0.85em;color:#c8a882;
                      border-top:1px solid #4a4a8a;padding-top:6px;">
            Tension au réveil : <b>${tensionReveil}</b><br>
            ${modifReserve === reserveBase
              ? `Réserve : <b>restaurée (${reserveBase})</b>`
              : modifReserve < 0
              ? `Réserve : <b>${modifReserve}</b>`
              : `Réserve : <b>inchangée</b>`
            }<br>
            Dettes de sommeil : <b>${dettes} → ${nouvelleDettes}</b>
            ${nouvelleDettes > dettes
              ? `<span style="color:#8b0000;"> ⚠️ +${modifDettes} dette(s) !</span>`
              : nouvelleDettes < dettes
              ? `<span style="color:#2d6a2d;"> ✅ -1 dette</span>`
              : ""
            }
            ${malusDetteNouveau > malusDetteActuel
              ? `<br><span style="color:#8b0000;">⚠️ SD augmenté de +1 (${nouvelleDettes} dettes) !</span>`
              : ""
            }
          </div>
        </div>
      `,
    });
  }

  // ------------------------------------------------
  // JET D'ARCANES
  // ------------------------------------------------
  async _jetArcanes() {
    const system = this.actor.system;
    const desArcanes = system.desArcanes ?? "1d6";
    const arcanes = system.arcanes ?? {};

    let modifTotal = 0;
    let ecolesActives = [];
    for (const [id, arc] of Object.entries(arcanes)) {
      if (arc.ecole && arc.modif !== 0) {
        modifTotal += arc.modif ?? 0;
        ecolesActives.push(`${arc.ecole} (${arc.modif >= 0 ? "+" : ""}${arc.modif})`);
      }
    }

    const formule = modifTotal !== 0
      ? `${desArcanes} + ${modifTotal}`
      : desArcanes;

    const roll = new Roll(formule);
    await roll.evaluate();

    const total = roll.total;
    const tousLesResultats = roll.dice.flatMap(d => d.results.map(r => r.result));
    const catastrophe = tousLesResultats.includes(1);

    let effet, couleur;

    if (catastrophe) {
      effet = "💥 Catastrophe ou Incident ! La Tension augmente de 2.";
      couleur = "#8b0000";
      const tensionActuelle = system.jauges?.tension?.valeur ?? 0;
      await this.actor.update({
        "system.jauges.tension.valeur": Math.min(20, tensionActuelle + 2)
      });
    } else if (total <= 8) {
      effet = "😶 Aucun effet — la réalité résiste.";
      couleur = "#5c3010";
    } else if (total <= 11) {
      effet = "✨ Altération mineure de la réalité !";
      couleur = "#c87010";
    } else if (total <= 15) {
      effet = "🌟 Altération majeure de la réalité !";
      couleur = "#2d6a2d";
    } else {
      effet = "⭐ Altération supérieure de la réalité !";
      couleur = "#1a4a8a";
    }

    const ecolesAffichage = ecolesActives.length > 0
      ? `<br>Écoles : ${ecolesActives.join(", ")}`
      : "";

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      rolls: [roll],
      content: `
        <div style="background:#1a0a2a;border:1px solid #6a2a8a;
                    padding:10px;border-radius:4px;color:#f4e8d0;">
          <b style="font-size:1.1em;">🔮 Jet d'Arcanes</b><br>
          Dés : <b>${desArcanes}</b>
          ${modifTotal !== 0 ? `+ Modificateurs (${modifTotal >= 0 ? "+" : ""}${modifTotal})` : ""}
          ${ecolesAffichage}<br>
          Résultat : <b>${total}</b><br>
          <div style="margin-top:6px;padding-top:6px;
                      border-top:1px solid #6a2a8a;">
            <span style="color:${couleur};font-size:1.05em;">
              ${effet}
            </span>
          </div>
          <div style="margin-top:4px;font-size:0.75em;color:#a08080;">
            1=Catastrophe | 2-8=Rien | 9-11=Mineure | 12-15=Majeure | 16+=Supérieure
          </div>
        </div>
      `,
    });
  }

}

// ================================================
// FEUILLE PNJ - API V13
// ================================================
class CdTFeuillePNJ extends HandlebarsApplicationMixin(ActorSheetV2) {

  static DEFAULT_OPTIONS = {
    classes: ["chants-de-tindalos", "sheet", "actor", "pnj"],
    position: { width: 480, height: 560 },
    window: { resizable: true },
  };

  static PARTS = {
    pnj: {
      template: "systems/chants-de-tindalos/templates/actor/feuille-pnj.html",
    },
  };

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.actor = this.actor;
    context.system = this.actor.system;
    return context;
  }

  async _preparePartContext(partId, context) {
    context = await super._preparePartContext(partId, context);
    context.actor = this.actor;
    context.system = this.actor.system;
    return context;
  }

  _onRender(context, options) {
    super._onRender(context, options);
    const html = this.element;

    // --- RESTAURER LE SCROLL ---
    const scrollable = html.querySelector(".pnj-body") ?? html;
    if (this._scrollTop) scrollable.scrollTop = this._scrollTop;
    scrollable.addEventListener("scroll", () => {
      this._scrollTop = scrollable.scrollTop;
    });

    // --- SAUVEGARDE AUTOMATIQUE (sauf possessions gérées séparément) ---
    html.querySelectorAll("input, textarea, select").forEach((input) => {
      if (input.closest(".pnj-possession-item")) return;
      input.addEventListener("change", (ev) => {
        const name = ev.currentTarget.name;
        const value = ev.currentTarget.type === "number"
          ? Number(ev.currentTarget.value)
          : ev.currentTarget.value;
        if (name) this.actor.update({ [name]: value });
      });
    });

    // --- POSSESSIONS CLIQUABLES (toggle ON/OFF) ---
    html.querySelectorAll(".pnj-possession-item input[type='checkbox']").forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const label = checkbox.closest(".pnj-possession-item");
        label.classList.toggle("active", checkbox.checked);
        this.actor.update({ [checkbox.name]: checkbox.checked });
      });
    });

    html.querySelectorAll("img[data-edit]").forEach((img) => {
      img.addEventListener("click", (ev) => {
        ev.preventDefault();
        const attr = ev.currentTarget.dataset.edit;
        const fp = new FilePicker({
          type: "image",
          current: foundry.utils.getProperty(this.actor, attr),
          callback: (path) => { this.actor.update({ [attr]: path }); },
        });
        fp.browse();
      });
    });

    html.querySelectorAll(".carac-box.rollable").forEach((el) => {
      el.addEventListener("click", (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        this._jetCaracteristique(ev.currentTarget.dataset.carac);
      });
    });

    html.querySelectorAll(".btn-jet-maitrise").forEach((el) => {
      el.addEventListener("click", (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        this._jetMaitrise();
      });
    });

    html.querySelectorAll(".btn-attaquer").forEach((el) => {
      el.addEventListener("click", (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        this._attaquerPNJ(ev.currentTarget.dataset.arme);
      });
    });
  }

  async _jetCaracteristique(caracId) {
    const system = this.actor.system;
    const carac = system.caracteristiques?.[caracId];
    if (!carac) return;
    const resultat = await lancerDesD6(
      carac.valeur ?? 1,
      system.seuilDifficulte ?? 3,
      carac.label,
      false
    );
    afficherResultatChat(resultat, this.actor);
  }

  async _jetMaitrise() {
    const system = this.actor.system;
    const tension = system.jauges?.tension?.valeur ?? 0;
    const maitrise = system.variables?.maitrise ?? 0;

    const roll = new Roll("1d20");
    await roll.evaluate();

    const total = roll.total + maitrise;
    const succes = total >= tension;
    const couleur = succes ? "#2d6a2d" : "#8b0000";
    const texte = succes
      ? `✅ <b>Maîtrise réussie !</b> (${total} ≥ ${tension})`
      : `💀 <b>Perd les pédales !</b> (${total} < ${tension})`;

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      rolls: [roll],
      content: `
        <div style="background:#f4e8d0;border:1px solid #8b4513;
                    padding:8px;border-radius:4px;">
          <b style="font-size:1.1em;">🎲 Jet de Maîtrise</b><br>
          Dé : <b>${roll.total}</b> + Maîtrise (${maitrise})
          = <b style="color:${couleur}">${total}</b><br>
          Tension actuelle : <b>${tension}</b><br>
          ${texte}
        </div>
      `,
    });

    if (!succes) {
      await piocherCartePLP(calculerPalierPLP(tension), this.actor);
    }
  }

  async _attaquerPNJ(armeId) {
    const system = this.actor.system;
    const arme = system.armes?.[armeId];
    if (!arme) return;

    const sd = system.seuilDifficulte ?? 3;
    const caracId = arme.type === "corpsacorps" ? "vigueur" : "agilite";
    const caracVal = system.caracteristiques?.[caracId]?.valeur ?? 1;

    const roll = new Roll(`${Math.max(1, caracVal)}d6`);
    await roll.evaluate();

    const valeurs = roll.dice[0].results.map((d) => d.result);
    const reussites = valeurs.filter((v) => v >= sd).length;
    const succes = reussites > 0;

    const desAffichage = valeurs
      .map((v) => `<span style="color:${v >= sd ? "#2d6a2d" : "#8b0000"};font-weight:bold;">${v}</span>`)
      .join(" | ");

    let contenuLetalite = "";
    if (succes) {
      const rollLet = new Roll(`1d20`);
      await rollLet.evaluate();
      const totalLet = rollLet.total + reussites;
      const touche = totalLet >= arme.letalite;
      contenuLetalite = `
        <div style="margin-top:6px;padding-top:6px;border-top:1px solid #8b4513;">
          🎯 Létalité : <b>${rollLet.total}</b> + ${reussites} réussite(s) = <b>${totalLet}</b>
          vs <b>${arme.letalite}</b><br>
          ${touche
            ? `<b style="color:#8b0000;">💥 Touché ! Blessure : ${arme.blessure}</b>`
            : `<span style="color:#5c3010;">🛡️ Manqué</span>`}
        </div>`;
    }

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      rolls: [roll],
      content: `
        <div style="background:#f4e8d0;border:1px solid #8b4513;
                    padding:8px;border-radius:4px;">
          <b>⚔️ ${arme.nom || "Attaque"}</b> (SD ${sd}+)<br>
          Dés : ${desAffichage}<br>
          ${succes
            ? `<b style="color:#2d6a2d;">✅ ${reussites} réussite(s)</b>`
            : `<b style="color:#8b0000;">❌ Échec</b>`}
          ${contenuLetalite}
        </div>
      `,
    });
  }
}

// ================================================
// FONCTIONS UTILITAIRES
// ================================================

async function lancerDesD6(nbDes, sd, nomAction, depenseEspoir = false) {
  const nbSecurise = Math.max(1, Math.floor(nbDes));
  const formule = depenseEspoir ? `${nbSecurise}d6 + 1d8` : `${nbSecurise}d6`;
  const roll = new Roll(formule);
  await roll.evaluate();

  const valeurs = roll.dice[0].results.map((d) => d.result);
  const nb6 = valeurs.filter((v) => v === 6).length;
  let reussites = valeurs.filter((v) => v >= sd).length + Math.floor(nb6 / 2);

  let espoirReussites = 0;
  let espoirValeurs = [];
  let espoirBonusObtenu = false;
  let consecutifs = 0;

  if (depenseEspoir && roll.dice.length > 1) {
    const valD8 = roll.dice[1].results[0].result;
    espoirValeurs.push(valD8);
    if (valD8 >= sd) espoirReussites++;
    if (valD8 >= 7) {
      consecutifs++;
      if (consecutifs >= 3) espoirBonusObtenu = true;
      let continuer = true;
      while (continuer) {
        const d8Extra = new Roll("1d8");
        await d8Extra.evaluate();
        const val = d8Extra.total;
        espoirValeurs.push(val);
        if (val >= sd) espoirReussites++;
        if (val >= 7) {
          consecutifs++;
          if (consecutifs >= 3) espoirBonusObtenu = true;
        } else continuer = false;
      }
    }
    reussites += espoirReussites;
  }

  return {
    roll, reussites, sd, nbDes: nbSecurise, nomAction, valeurs,
    depenseEspoir, espoirValeurs, espoirReussites, espoirBonusObtenu
  };
}

function afficherResultatChat(resultat, acteur) {
  const { roll, reussites, sd, nbDes, nomAction, valeurs,
    depenseEspoir, espoirValeurs, espoirReussites, espoirBonusObtenu } = resultat;

  const succes = reussites > 0;
  const couleur = succes ? "#2d6a2d" : "#8b0000";
  const texte = succes ? `✅ <b>${reussites} réussite(s)</b>` : `❌ <b>Échec</b>`;

  const desAffichage = valeurs
    .map((v) => `<span style="color:${v >= sd ? "#2d6a2d" : "#8b0000"};font-weight:bold;">${v}</span>`)
    .join(" | ");

  let espoirAffichage = "";
  if (depenseEspoir && espoirValeurs.length > 0) {
    const desEspoir = espoirValeurs
      .map((v) => `<span style="color:${v >= sd ? "#2d6a2d" : "#8b0000"};font-weight:bold;">${v}${v >= 7 ? " 💥" : ""}</span>`)
      .join(" → ");
    espoirAffichage = `
      <div style="margin-top:4px;font-size:0.85em;color:#8b4513;">
        🕯️ Dé d'Espoir : ${desEspoir} (+${espoirReussites} réussite(s))
        ${espoirBonusObtenu ? '<b style="color:#c8860a;">✨ +2 Espoir gagné !</b>' : ""}
      </div>`;
  }

  ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: acteur }),
    rolls: [roll],
    content: `
      <div style="background:#f4e8d0;border:1px solid #8b4513;
                  padding:8px;border-radius:4px;">
        <b style="font-size:1.1em;">🎲 ${nomAction}</b><br>
        Dés (${nbDes}d6) : ${desAffichage}<br>
        ${espoirAffichage}
        Seuil : <b>${sd}+</b><br>
        <span style="color:${couleur};font-size:1.1em;">${texte}</span>
      </div>
    `,
  });
}

function calculerSD(tension) {
  if (tension <= 10) return 3;
  if (tension <= 13) return 4;
  if (tension <= 16) return 5;
  if (tension <= 19) return 6;
  return 7;
}

function calculerPalierPLP(tension) {
  if (tension >= 20) return 4;
  if (tension >= 17) return 3;
  if (tension >= 14) return 2;
  return 1;
}

async function chargerTemplates() {
  return foundry.applications.handlebars.loadTemplates([
    "systems/chants-de-tindalos/templates/actor/header.html",
    "systems/chants-de-tindalos/templates/actor/onglet-principal.html",
    "systems/chants-de-tindalos/templates/actor/onglet-competences.html",
    "systems/chants-de-tindalos/templates/actor/onglet-milieux.html",
    "systems/chants-de-tindalos/templates/actor/onglet-combat.html",
    "systems/chants-de-tindalos/templates/actor/onglet-avance.html",
    "systems/chants-de-tindalos/templates/actor/onglet-notes.html",
    "systems/chants-de-tindalos/templates/actor/feuille-pnj.html",
  ]);
}

// ================================================
// WIKI — LES CHANTS DE TINDALOS
// ================================================
async function initialiserWiki() {
  const NOM_JOURNAL = "📖 Wiki — Les Chants de Tindalos";
  const journalExistant = game.journal.find(j => j.name === NOM_JOURNAL);
  if (journalExistant) {
    // Supprimer l'ancien pour le recréer à jour
    await journalExistant.delete();
  }

  console.log("CDT | Création du Wiki...");

  const pages = [
    {
      name: "1. Prise en main",
      text: {
        content: `
<h1>🎲 Prise en main — Les Chants de Tindalos sur Foundry</h1>
<p>Bienvenue dans l'adaptation Foundry VTT des <strong>Chants de Tindalos</strong>, un jeu de rôle d'horreur lovecraftienne se déroulant dans l'Amérique des années 1920, publié par <strong>Walpurgis Éditions</strong>.</p>
<h2>✨ Assistant de création de personnage</h2>
<p>Un bouton <strong>🎲 Créer un personnage</strong> est disponible en bas du panneau Acteurs. Il ouvre un assistant guidé en 8 étapes :</p>
<ol>
<li><strong>Identité & Caractéristiques</strong> — 12 points à répartir avec visualisation en temps réel</li>
<li><strong>Variables</strong> — 12 points (Réserve, Angoisse, Maîtrise, Intuition, Espoir)</li>
<li><strong>Profession</strong> — 10 milieux → champs → métiers → professions (90 professions)</li>
<li><strong>Milieu d'origine</strong> — 10 origines sociales avec effets sur la richesse</li>
<li><strong>Expérience singulière</strong> — 60 expériences filtrables par milieu</li>
<li><strong>Rituel & Déclencheur</strong> — listes complètes avec valeurs de tension</li>
<li><strong>Folie</strong> — 0 ou 1 point de folie avec effets automatiques</li>
<li><strong>Récapitulatif</strong> — aperçu complet avant création de l'acteur</li>
</ol>
<h2>📋 La Fiche de Personnage</h2>
<p>La fiche de personnage comporte <strong>6 onglets</strong> :</p>
<ul>
<li><strong>Principal</strong> — Caractéristiques, Variables, Jauges, Tension, Actions</li>
<li><strong>Compétences</strong> — Compétences Socle et Spécialité cliquables</li>
<li><strong>Milieux</strong> — Points de milieu social cliquables pour jets de Charisme</li>
<li><strong>Combat</strong> — Armes, modificateurs, actions de combat</li>
<li><strong>Avancé</strong> — Onirisme, Révélations, Arcanes, Contacts, Possessions</li>
<li><strong>Notes</strong> — Notes libres sur le personnage</li>
</ul>
<h2>🖱️ Éléments cliquables</h2>
<ul>
<li><strong>Caractéristiques</strong> → lance un jet de dés</li>
<li><strong>Compétences socle et spécialité</strong> → lance un jet de dés</li>
<li><strong>Milieux</strong> → jet de Charisme + dés de milieu bonus</li>
<li><strong>Barre de Tension</strong> → cliquez une case pour modifier la tension</li>
<li><strong>Barre d'Onirisme</strong> → cliquez une case pour modifier l'onirisme</li>
<li><strong>Cases XP Espoir / Folie</strong> → ajouter un XP (montée automatique à 8)</li>
<li><strong>Portrait</strong> → cliquez pour changer l'image</li>
</ul>
<h2>🎲 Boutons d'action (onglet Principal)</h2>
<ul>
<li><strong>Jet de Maîtrise</strong> — 1d20 + Maîtrise vs Tension</li>
<li><strong>Jet Défensif</strong> — dés de Vigueur contre les attaques</li>
<li><strong>Jet de Sommeil</strong> — résolution de la nuit (1d12 + Sommeil + Dettes×5)</li>
</ul>
<h2>🗡️ Fiche PNJ</h2>
<p>Les PNJ ont leur propre fiche compacte avec :</p>
<ul>
<li>Possessions sous forme de <strong>pictogrammes cliquables</strong> (toggle ON/OFF)</li>
<li>Section Arme avec bouton <strong>Attaquer</strong> (jet + létalité dans le chat)</li>
<li>Jet de Maîtrise et SD calculé automatiquement</li>
</ul>
<h2>👥 Personnages prétirés</h2>
<p>4 personnages du kit de découverte sont inclus — Nora Haddad, Delphine Malesherbes, Archie Hunter et Geneviève de Bouvines. Utilisez l'assistant de création ou consultez la page 12 pour les importer manuellement.</p>
        `
      }
    },
    {
      name: "2. Caractéristiques",
      text: {
        content: `
<h1>💪 Les Caractéristiques</h1>
<p>Chaque personnage possède <strong>5 caractéristiques</strong>, dont la valeur varie de 1 à 5. Vous disposez de <strong>12 points</strong> à répartir.</p>
<table>
<thead><tr><th>Caractéristique</th><th>Abrév.</th><th>Description</th></tr></thead>
<tbody>
<tr><td>📚 <strong>Savoir</strong></td><td>SAV</td><td>Culture et connaissances</td></tr>
<tr><td>👁️ <strong>Perception</strong></td><td>PER</td><td>Acuité des sens</td></tr>
<tr><td>🗣️ <strong>Charisme</strong></td><td>CHA</td><td>Habileté sociale</td></tr>
<tr><td>⚡ <strong>Agilité</strong></td><td>AGI</td><td>Coordination et motricité</td></tr>
<tr><td>💪 <strong>Vigueur</strong></td><td>VIG</td><td>Constitution physique</td></tr>
</tbody>
</table>
<h2>Coût et Défense</h2>
<table>
<thead><tr><th>Rang</th><th>Coût</th><th>Défense</th></tr></thead>
<tbody>
<tr><td>1</td><td>4</td><td>0</td></tr>
<tr><td>2</td><td>3</td><td>1</td></tr>
<tr><td>3</td><td>2</td><td>1</td></tr>
<tr><td>4</td><td>2</td><td>2</td></tr>
<tr><td>5</td><td>1</td><td>2</td></tr>
</tbody>
</table>
        `
      }
    },
    {
      name: "3. Variables",
      text: {
        content: `
<h1>📊 Les Variables</h1>
<p>Vous disposez de <strong>12 points de variable</strong> à répartir (max 6 par variable).</p>
<table>
<thead><tr><th>Variable</th><th>Initiale</th><th>Effet/pt</th><th>Limite</th></tr></thead>
<tbody>
<tr><td>🔋 Réserve</td><td>8</td><td>+2</td><td>20</td></tr>
<tr><td>😰 Angoisse</td><td>10</td><td>-1</td><td>4</td></tr>
<tr><td>🧘 Maîtrise</td><td>-3</td><td>+1</td><td>+3</td></tr>
<tr><td>🔮 Intuition</td><td>-6</td><td>+2</td><td>6</td></tr>
<tr><td>🕯️ Espoir</td><td>0</td><td>+1</td><td>6</td></tr>
</tbody>
</table>
<h2>Variables automatiques</h2>
<ul>
<li><strong>🏃 Vitesse</strong> = AGI + VIG + 2 (calculée automatiquement)</li>
<li><strong>😴 Sommeil</strong> = 12 - Angoisse</li>
<li><strong>💤 Dettes de Sommeil</strong> = s'accumulent lors des mauvaises nuits</li>
</ul>
        `
      }
    },
    {
      name: "4. Compétences",
      text: {
        content: `
<h1>🎓 Les Compétences</h1>
<h2>Compétences Socle (4 points)</h2>
<table>
<thead><tr><th>Compétence</th><th>Caractéristique</th></tr></thead>
<tbody>
<tr><td>Humanités</td><td>Savoir</td></tr>
<tr><td>Appréciation</td><td>Perception</td></tr>
<tr><td>Psychologie</td><td>Perception</td></tr>
<tr><td>Étiquette</td><td>Charisme</td></tr>
<tr><td>Bricolage</td><td>Agilité</td></tr>
<tr><td>Athlétisme</td><td>Vigueur</td></tr>
</tbody>
</table>
<h2>Compétences de Spécialité (8 points)</h2>
<p>Dépendent d'une compétence socle. Jet = Caractéristique + Compétence socle + Spécialité.</p>
<p>Dans Foundry, cliquez sur la ligne de compétence pour lancer le jet.</p>
        `
      }
    },
    {
      name: "5. Milieux",
      text: {
        content: `
<h1>🏙️ Les Milieux Sociaux</h1>
<p>6 points à répartir à la création. Donnent des dés bonus aux jets de Charisme.</p>
<table>
<thead><tr><th>Icône</th><th>Milieu</th></tr></thead>
<tbody>
<tr><td>🎓</td><td>Académie</td></tr>
<tr><td>⚖️</td><td>Commerce</td></tr>
<tr><td>🎭</td><td>Culture</td></tr>
<tr><td>🧭</td><td>Itinérant</td></tr>
<tr><td>⚙️</td><td>Laborieux</td></tr>
<tr><td>🎩</td><td>Louche</td></tr>
<tr><td>👁️</td><td>Occulte</td></tr>
<tr><td>🔒</td><td>Ordre</td></tr>
<tr><td>🏛️</td><td>Politique</td></tr>
<tr><td>✚</td><td>Santé</td></tr>
</tbody>
</table>
<p>Cliquez sur un milieu pour lancer <strong>Charisme + points de milieu</strong>.</p>
        `
      }
    },
    {
      name: "6. Résolution des actions",
      text: {
        content: `
<h1>🎲 Résolution des Actions</h1>
<p>Lancez un pool de d6 égal à votre caractéristique (+ compétence). Chaque dé ≥ SD = réussite. Double 6 = réussite bonus.</p>
<h2>Seuil de Difficulté (SD)</h2>
<table>
<thead><tr><th>Tension</th><th>SD</th></tr></thead>
<tbody>
<tr><td>0-10</td><td>3+</td></tr>
<tr><td>11-13</td><td>4+</td></tr>
<tr><td>14-16</td><td>5+</td></tr>
<tr><td>17-19</td><td>6+</td></tr>
<tr><td>20</td><td>7+</td></tr>
</tbody>
</table>
<h2>Options du jet</h2>
<ul>
<li><strong>Dés bonus</strong> — coûte des points de Réserve (max 2)</li>
<li><strong>Dés MJ</strong> — accordés gratuitement par le MJ</li>
<li><strong>Dé d'Espoir</strong> — 1d8 explosif (7-8 = relance)</li>
</ul>
        `
      }
    },
    {
      name: "7. La Tension",
      text: {
        content: `
<h1>⚡ La Tension</h1>
<p>Graduée de 0 à 20. Plus elle est haute, plus le SD augmente et le danger grandit.</p>
<table>
<thead><tr><th>Cases</th><th>Couleur</th><th>SD</th><th>Palier</th></tr></thead>
<tbody>
<tr><td>1-10</td><td>🟩 Vert</td><td>3+</td><td>—</td></tr>
<tr><td>11-13</td><td>🟧 Orange</td><td>4+</td><td>Palier 11</td></tr>
<tr><td>14-16</td><td>🟥 Orange foncé</td><td>5+</td><td>Palier 14</td></tr>
<tr><td>17-19</td><td>🔴 Rouge</td><td>6+</td><td>Palier 17</td></tr>
<tr><td>20</td><td>⬛ Noir</td><td>7+</td><td>Palier 20</td></tr>
</tbody>
</table>
<p>La Tension revient au niveau de l'<strong>Angoisse</strong> après chaque nuit complète.</p>
        `
      }
    },
    {
      name: "8. La Santé Mentale",
      text: {
        content: `
<h1>🧠 La Santé Mentale</h1>
<h2>Jet de Maîtrise</h2>
<p>1d20 + Maîtrise vs Tension :</p>
<ul>
<li>✅ Succès → +1 XP Espoir</li>
<li>❌ Échec → +1 XP Folie, pioche PLP</li>
<li>20 naturel → +1 Maîtrise permanent</li>
<li>1 naturel → +2 XP Folie, PLP surclassé</li>
</ul>
<h2>XP et Points</h2>
<ul>
<li>8 XP Espoir → +1 Espoir permanent</li>
<li>8 XP Folie → +1 Folie, -1 Maîtrise, +1 Intuition</li>
<li>Tous les 4 points de Folie → nouvelle Révélation</li>
</ul>
<h2>Niveaux PLP selon Tension</h2>
<table>
<thead><tr><th>Tension</th><th>Niveau</th><th>Tension perdue</th></tr></thead>
<tbody>
<tr><td>&lt;11</td><td>1</td><td>1d3</td></tr>
<tr><td>11-13</td><td>1-2</td><td>1d6</td></tr>
<tr><td>14-16</td><td>2</td><td>1d6</td></tr>
<tr><td>17-19</td><td>3</td><td>2d6</td></tr>
<tr><td>20</td><td>4</td><td>3d6</td></tr>
</tbody>
</table>
        `
      }
    },
    {
      name: "9. Le Combat",
      text: {
        content: `
<h1>⚔️ Le Combat</h1>
<h2>Initiative</h2>
<p>Vitesse + Intuition × 0.1 + 1d6 × 0.001 (automatique dans Foundry)</p>
<h2>Attaque</h2>
<ul>
<li>Corps-à-corps → jet de Vigueur</li>
<li>Distance → jet d'Agilité</li>
<li>Succès → jet de létalité (1d20 + réussites bonus)</li>
</ul>
<h2>Blessures</h2>
<table>
<thead><tr><th>Type</th><th>Réserve</th><th>Malus SD</th></tr></thead>
<tbody>
<tr><td>Superficielle</td><td>-1</td><td>0</td></tr>
<tr><td>Légère</td><td>-2</td><td>0</td></tr>
<tr><td>Modérée</td><td>-4</td><td>+1</td></tr>
<tr><td>Sérieuse</td><td>-6</td><td>+2</td></tr>
</tbody>
</table>
<h2>Arrêt Cardiaque</h2>
<p>Tour 1 : 2d6 | Tour 2 : 3d6 | etc. — 3 échecs ou plus = mort.</p>
        `
      }
    },
    {
      name: "10. Le Sommeil",
      text: {
        content: `
<h1>😴 Le Sommeil</h1>
<p>Cliquez sur <strong>😴 Jet de Sommeil</strong> dans l'onglet Principal pour résoudre la nuit.</p>
<h2>Formule</h2>
<p>1d12 + Sommeil + (Dettes × 5) vs Tension</p>
<h2>Types de nuit</h2>
<table>
<thead><tr><th>Résultat</th><th>Type</th><th>Tension réveil</th><th>Réserve</th><th>Dettes</th></tr></thead>
<tbody>
<tr><td>≤ Tension - 10</td><td>😩 Nuit Blanche</td><td>Angoisse + 2</td><td>-4</td><td>+2</td></tr>
<tr><td>&lt; Tension</td><td>😰 Nuit Atroce</td><td>Angoisse + 1</td><td>inchangée</td><td>+1</td></tr>
<tr><td>≥ Tension</td><td>😴 Nuit Complète</td><td>Angoisse</td><td>restaurée</td><td>-1</td></tr>
</tbody>
</table>
<h2>Dettes de Sommeil</h2>
<p>Toutes les 2 dettes = +1 au SD. Elles s'accumulent lors des mauvaises nuits et disparaissent lors des bonnes.</p>
        `
      }
    },
    {
      name: "11. La Magie",
      text: {
        content: `
<h1>🔮 La Magie</h1>
<p>Cliquez sur <strong>🔮 Jet</strong> dans l'onglet Avancé pour lancer un jet d'Arcanes.</p>
<h2>Dés d'Arcanes selon la Folie</h2>
<table>
<thead><tr><th>Points de Folie</th><th>Dés</th></tr></thead>
<tbody>
<tr><td>0</td><td>1d6</td></tr>
<tr><td>1-3</td><td>1d8</td></tr>
<tr><td>4-5</td><td>2d8</td></tr>
<tr><td>6-7</td><td>2d8+1d12</td></tr>
<tr><td>8</td><td>2d12</td></tr>
</tbody>
</table>
<h2>Résultats</h2>
<table>
<thead><tr><th>Résultat</th><th>Effet</th></tr></thead>
<tbody>
<tr><td>1 (sur n'importe quel dé)</td><td>💥 Catastrophe ! +2 Tension</td></tr>
<tr><td>2-8</td><td>😶 Aucun effet</td></tr>
<tr><td>9-11</td><td>✨ Altération mineure</td></tr>
<tr><td>12-15</td><td>🌟 Altération majeure</td></tr>
<tr><td>16+</td><td>⭐ Altération supérieure</td></tr>
</tbody>
</table>
<h2>Modificateurs d'École</h2>
<p>Chaque école de magie ajoute un modificateur au jet. Configurez-les dans l'onglet Avancé.</p>
        `
      }
    },
    {
      name: "12. Créer un personnage",
      text: {
        content: `
<h1>✍️ Créer son Personnage</h1>
<p>Deux façons de créer un personnage dans Foundry :</p>
<h2>🎲 Assistant de création (recommandé)</h2>
<p>Cliquez sur le bouton <strong>🎲 Créer un personnage</strong> en bas du panneau Acteurs. L'assistant guide en 8 étapes avec toutes les listes du manuel :</p>
<ol>
<li><strong>Identité & Caractéristiques</strong> — 12 points, visualisation Coût/Défense en temps réel</li>
<li><strong>Variables</strong> — Réserve, Angoisse, Maîtrise, Intuition, Espoir (12 points, max 6 par variable)</li>
<li><strong>Profession</strong> — 10 milieux → 3 champs → 3 métiers → professions (90 détaillées)</li>
<li><strong>Milieu d'origine</strong> — +1 point de milieu, effets richesse automatiques</li>
<li><strong>Expérience singulière</strong> — 60 expériences filtrables par milieu, +1 milieu +2 spécialités</li>
<li><strong>Rituel de décompression</strong> — liste complète avec valeurs de tension (−1 à −4)</li>
<li><strong>Déclencheur</strong> — 20 exemples ou saisie libre</li>
<li><strong>Folie</strong> — 0 ou 1 point (−1 Maîtrise, +1 Intuition)</li>
</ol>
<p>À la fin, le personnage est créé automatiquement et sa fiche s'ouvre.</p>
<h2>📝 Création manuelle (rappel des règles)</h2>
<p>Remplissez directement la fiche en suivant ces étapes :</p>
<ol>
<li><strong>Caractéristiques</strong> — 12 points (rang 4→5 coûte 2 points)</li>
<li><strong>Variables</strong> — 12 points. Vitesse = AGI + VIG + 2. Sommeil = 12 − Angoisse</li>
<li><strong>Profession</strong> — +4 pts milieu, +4 pts socle, +5 pts spécialité (+1 doublée), +1 rang richesse</li>
<li><strong>Milieu d'origine</strong> — +1 point de milieu, ajustement richesse éventuel</li>
<li><strong>Expérience singulière</strong> — +1 milieu, +1 point dans 2 spécialités</li>
<li><strong>Rituel & Déclencheur</strong> — onglet Combat de la fiche</li>
<li><strong>Folie & Révélations</strong> — onglet Avancé (en accord avec le MJ)</li>
<li><strong>Possessions & Équipement</strong> — onglet Avancé</li>
<li><strong>Contacts & Ressources</strong> — onglet Avancé</li>
</ol>
<h2>👥 Personnages prétirés</h2>
<p>4 personnages du kit de découverte sont disponibles :</p>
<ul>
<li><strong>Nora Haddad</strong> — Photographe d'Art (Perception 4)</li>
<li><strong>Delphine Malesherbes</strong> — Journaliste d'investigation (Savoir 3)</li>
<li><strong>Archie Hunter</strong> — Chercheur d'épaves (Vigueur 4)</li>
<li><strong>Geneviève de Bouvines</strong> — Pilleuse de tombes (Perception 3)</li>
</ul>
<p>Pour les importer via la console Foundry (F12) :</p>
<pre>const noms = ["nora-haddad","delphine-malesherbes","archie-hunter","genevieve-de-bouvines"];
for (const nom of noms) {
  const data = await fetch("systems/chants-de-tindalos/packs/" + nom + ".json").then(r => r.json());
  await Actor.create(data);
}</pre>
        `
      }
    },
  ];

  await JournalEntry.create({
    name: NOM_JOURNAL,
    pages: pages,
    ownership: { default: CONST.DOCUMENT_OWNERSHIP_LEVELS.OBSERVER },
  });

  console.log("CDT | Wiki créé avec succès !");
  ui.notifications.info("📖 Wiki Les Chants de Tindalos créé ! Consultez les Journaux.");
}