// ================================================
// Les Chants de Tindalos - Cartes PLP
// Perdre Les Pédales - Tables aléatoires
// ================================================

// Données des cartes PLP par niveau
const CARTES_PLP = {
  1: [
    { nom: "Il faut que ça sorte",       description: "Vous devez HURLER à pleins poumons." },
    { nom: "Un au-delà rassurant",        description: "Vous devez PRIER pour votre (vos) divinité(s)." },
    { nom: "Un monde d'imbéciles",        description: "Vous devez INSULTER quelqu'un." },
    { nom: "Je suis une terreur !",       description: "Vous devez MENACER quelqu'un." },
    { nom: "Ad nauseam.",                 description: "Vous devez VOMIR immédiatement." },
    { nom: "Jérémiades",                  description: "Vous devez PLEURER à chaudes larmes." },
    { nom: "Un oeil pour un oeil.",       description: "Vous devez immédiatement DIFFAMER un interlocuteur." },
    { nom: "Le meilleur.",                description: "Vous devez vous VANTER de vos compétences." },
    { nom: "Expiation",                   description: "Vous devez CONFESSER à haute voix une mauvaise action." },
    { nom: "Oiseau de mauvais augure.",   description: "Vous devez IMAGINER le pire à haute voix." },
    { nom: "Maître des destins",          description: "Vous devez ECRASER un insecte ou une araignée." },
    { nom: "Disque rayé",                 description: "Vous devez CRIER 10 fois un mot." },
    { nom: "Colère théâtrale",            description: "Vous devez CASSER un objet." },
    { nom: "Monologue",                   description: "Vous devez DIALOGUER avec vous-même." },
    { nom: "Gênant",                      description: "Vous devez DENIGRER la tenue vestimentaire d'un interlocuteur." },
    { nom: "Rire nerveux",                description: "Vous devez ECLATER d'un rire incontrôlable." },
    { nom: "Chuuuuut !",                  description: "Vous devez ORDONNER aux autres de se taire." },
    { nom: "Tout m'afflige et me nuit...", description: "Vous devez vous PLAINDRE de vos malheurs." },
    { nom: "Quoi ?!",                     description: "Vous devez CRIER aux autres de parler plus fort." },
  ],
  2: [
    { nom: "Soufflet",                    description: "Vous devez GIFLER quelqu'un." },
    { nom: "Courage, fuyons !",           description: "Vous devez vous ELOIGNER tout de suite." },
    { nom: "Le nourrisson",               description: "Vous devez vous PROSTRER en position foetale." },
    { nom: "Régression infantile.",       description: "Vous devez APPELER votre maman en criant." },
    { nom: "Le courroucé",                description: "Vous devez REDUIRE EN MIETTES un objet." },
    { nom: "Le prophète",                 description: "Vous devez ANNONCER la fin du monde en public." },
    { nom: "Bouge de là !",               description: "Vous devez BOUSCULER quelqu'un." },
    { nom: "Rage Kick",                   description: "Vous devez DONNER un coup de pied." },
    { nom: "Le flagellant",               description: "Vous devez vous PUNIR." },
    { nom: "Trop bavard",                 description: "Vous devez REVELER immédiatement un secret." },
    { nom: "Le bouquetin",                description: "Vous devez ASSENER un coup de tête à une surface solide." },
    { nom: "J'étais là",                  description: "Vous devez LAISSER votre trace dans votre environnement." },
    { nom: "Rhéteur",                     description: "Vous devez HUMILIER un contradicteur." },
    { nom: "Le lama",                     description: "Vous devez CRACHER sur quelqu'un." },
    { nom: "Calvitie précoce",            description: "Vous devez vous ARRACHER les cheveux." },
    { nom: "Impulsion brutale.",          description: "Vous devez FRAPPER quelqu'un." },
    { nom: "Animal",                      description: "Vous devez vous GRIFFER jusqu'au sang." },
    { nom: "Au centre de l'attention",    description: "Vous devez TOUT FAIRE pour attirer l'attention sur vous." },
  ],
  3: [
    { nom: "Le Dieu de la Destruction",  description: "Vous devez DEMOLIR votre environnement immédiat." },
    { nom: "Le Prédateur",               description: "Vous devez MORDRE quelqu'un jusqu'au sang." },
    { nom: "Voeu de pauvreté",           description: "Vous devez vous DEBARASSER de toutes vos possessions de valeur." },
    { nom: "Expert pyromane",            description: "Vous devez REDUIRE EN CENDRES un lieu." },
    { nom: "Un manager efficace",        description: "Vous devez ROUER DE COUPS quelqu'un." },
    { nom: "Le Grand Prêtre",            description: "Vous devez vous PRESENTER comme le prophète d'une entité supérieure." },
    { nom: "On étouffe !",               description: "Vous devez DECHIRER vos vêtements." },
    { nom: "Dans mon cocon",             description: "Vous devez LIGOTER quelqu'un." },
    { nom: "Faust",                      description: "Vous devez PACTISER avec le Diable." },
    { nom: "Héroïsme",                   description: "Vous devez ALLER à la rencontre du danger." },
  ],
  4: [
    { nom: "Tueur de sang-froid",        description: "Vous devez ABATTRE quelqu'un qui a exprimé un désaccord avec vous." },
    { nom: "Tu ne médiras plus",         description: "Vous devez ARRACHER une langue." },
    { nom: "Colère Divine",              description: "Vous devez MASSACRER un humain ou un animal." },
    { nom: "Tu ne me feras plus d'ombre !", description: "Vous devez DEFIGURER quelqu'un." },
    { nom: "L'Haruspice",                description: "Vous devez SACRIFIER quelqu'un à votre cause." },
    { nom: "Double-face",                description: "Vous devez TRAHIR votre camp." },
    { nom: "Le bourreau de soi-même",    description: "Vous devez vous MUTILER gravement." },
  ],
};

// ------------------------------------------------
// Crée ou récupère les tables PLP dans Foundry
// ------------------------------------------------
export async function initialiserTablesPLP() {
  console.log("CDT | Initialisation des tables PLP...");

  for (const niveau of [1, 2, 3, 4]) {
    await creerTablePLP(niveau);
  }

  console.log("CDT | Tables PLP prêtes !");
}

async function creerTablePLP(niveau) {
  const nomTable = `PLP - Niveau ${niveau}`;

  // Vérifie si la table existe déjà
  const tableExistante = game.tables.find((t) => t.name === nomTable);
  if (tableExistante) {
    console.log(`CDT | Table "${nomTable}" déjà existante.`);
    return tableExistante;
  }

  // Prépare les entrées de la table
  const cartes = CARTES_PLP[niveau];
  const resultats = cartes.map((carte, index) => ({
    type: CONST.TABLE_RESULT_TYPES.TEXT,
    text: `<b>${carte.nom}</b><br>${carte.description}`,
    weight: 1,
    range: [index + 1, index + 1],
  }));

  // Crée la table
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

// ------------------------------------------------
// Pioche une carte PLP d'un niveau donné
// ------------------------------------------------
export async function piocherCartePLP(niveau, acteur) {
  const nomTable = `PLP - Niveau ${niveau}`;
  const table = game.tables.find((t) => t.name === nomTable);

  if (!table) {
    console.error(`CDT | Table PLP niveau ${niveau} introuvable !`);
    return;
  }

  // Lance la table et affiche le résultat
  const draw = await table.draw({ displayChat: false });
  const carte = draw.results[0];

  if (!carte) return;

  // Calcule la perte de tension selon le niveau
  const perteTension = await calculerPerteTension(niveau);

  // Affiche le résultat dans le chat
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: acteur }),
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
          (${acteur ? `pensez à mettre à jour la fiche de ${acteur.name}` : ""})
        </div>
      </div>
    `,
  });

  return { carte, perteTension };
}

// Calcule la perte de tension selon le tableau du kit
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