// ================================================
// SYSTÈME DE COMPÉTENCES (Items)
// Les Chants de Tindalos — Foundry VTT v14
// ------------------------------------------------
// - Item de type "competence" (socle ou spécialité)
// - Compendium "📜 Compétences" peuplé automatiquement
// - Fiche d'item pour créer / modifier des compétences
// - Migration des anciennes compétences (schéma fixe) vers des items
// ================================================

import { CompetenceDataModel } from "./datamodels.js";

// ------------------------------------------------
// CONSTANTES
// ------------------------------------------------
const CDT_CARACS = {
  savoir:     { label: "Savoir",     icone: "📚" },
  perception: { label: "Perception", icone: "👁️" },
  charisme:   { label: "Charisme",   icone: "🗣️" },
  agilite:    { label: "Agilité",    icone: "⚡" },
  vigueur:    { label: "Vigueur",    icone: "💪" },
};

// Les 19 socles officiels (clé → libellé / caractéristique)
const CDT_SOCLES = {
  humanites:            { label: "Humanités",             carac: "savoir" },
  sciences:             { label: "Sciences",              carac: "savoir" },
  recherche:            { label: "Recherche",             carac: "savoir" },
  medecine:             { label: "Médecine",              carac: "savoir" },
  techniqueetindustrie: { label: "Technique et Industrie",carac: "savoir" },
  evaluation:           { label: "Évaluation",            carac: "perception" },
  enquete:              { label: "Enquête",               carac: "perception" },
  psychologie:          { label: "Psychologie",           carac: "perception" },
  apparence:            { label: "Apparence",             carac: "charisme" },
  autorite:             { label: "Autorité",              carac: "charisme" },
  eloquence:            { label: "Éloquence",             carac: "charisme" },
  bricolage:            { label: "Bricolage",             carac: "agilite" },
  conduite:             { label: "Conduite",              carac: "agilite" },
  discretion:           { label: "Discrétion",            carac: "agilite" },
  soins:                { label: "Soins",                 carac: "agilite" },
  tir:                  { label: "Tir",                   carac: "agilite" },
  athletisme:           { label: "Athlétisme",            carac: "vigueur" },
  corpsacorps:          { label: "Corps-à-corps",         carac: "vigueur" },
  survie:               { label: "Survie",                carac: "vigueur" },
};

/** Transforme un libellé en clé (sans accents, minuscules, alphanumérique). */
function slugCompetence(texte) {
  return (texte ?? "")
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "");
}

/** Clé d'un item socle : son champ `cle` ou, à défaut, le slug de son nom. */
function cleSocle(item) {
  return item.system?.cle || slugCompetence(item.name);
}

/** Libellé complet d'une compétence (avec précision éventuelle). */
function libelleCompetence(item) {
  const p = item.system?.precision;
  return p ? `${item.name} (${p})` : item.name;
}

// ------------------------------------------------
// DONNÉES DU COMPENDIUM (Manuel p.52-56)
// ------------------------------------------------
const CDT_COMPETENCES_DATA = [
  {"name": "Humanités", "type": "competence", "img": "icons/svg/book.svg", "system": {"categorie": "socle", "caracteristique": "savoir", "cle": "humanites", "socle": "", "valeur": 0, "auChoix": false, "precision": "", "description": "Maîtrise de la culture classique, des sciences humaines, du droit, et plus largement des récits que partagent les êtres humains."}},
  {"name": "Sciences", "type": "competence", "img": "icons/svg/book.svg", "system": {"categorie": "socle", "caracteristique": "savoir", "cle": "sciences", "socle": "", "valeur": 0, "auChoix": false, "precision": "", "description": "Maîtrise des sciences expérimentales et des mathématiques."}},
  {"name": "Recherche", "type": "competence", "img": "icons/svg/book.svg", "system": {"categorie": "socle", "caracteristique": "savoir", "cle": "recherche", "socle": "", "valeur": 0, "auChoix": false, "precision": "", "description": "Aptitude du personnage à chercher des informations dans un cadre de type académique. Elle est notamment employée pour la recherche documentaire dans les bibliothèques."}},
  {"name": "Médecine", "type": "competence", "img": "icons/svg/book.svg", "system": {"categorie": "socle", "caracteristique": "savoir", "cle": "medecine", "socle": "", "valeur": 0, "auChoix": false, "precision": "", "description": "Connaissances concernant le corps et l'esprit, les maladies qui peuvent les affecter et les moyens de les guérir."}},
  {"name": "Technique et Industrie", "type": "competence", "img": "icons/svg/book.svg", "system": {"categorie": "socle", "caracteristique": "savoir", "cle": "techniqueetindustrie", "socle": "", "valeur": 0, "auChoix": false, "precision": "", "description": "Maîtrise de l'ensemble des connaissances appliquées, notamment dans le secteur économique."}},
  {"name": "Évaluation", "type": "competence", "img": "icons/svg/eye.svg", "system": {"categorie": "socle", "caracteristique": "perception", "cle": "evaluation", "socle": "", "valeur": 0, "auChoix": false, "precision": "", "description": "Aptitude du personnage à analyser son environnement au moyen des sens. Elle lui permet de s'orienter, de fournir une estimation ou une appréciation."}},
  {"name": "Enquête", "type": "competence", "img": "icons/svg/eye.svg", "system": {"categorie": "socle", "caracteristique": "perception", "cle": "enquete", "socle": "", "valeur": 0, "auChoix": false, "precision": "", "description": "Aptitude du personnage à débusquer quelque chose dans son environnement, tant au moyen des sens que de ses facultés de déduction."}},
  {"name": "Psychologie", "type": "competence", "img": "icons/svg/eye.svg", "system": {"categorie": "socle", "caracteristique": "perception", "cle": "psychologie", "socle": "", "valeur": 0, "auChoix": false, "precision": "", "description": "Capacité du personnage à comprendre les autres êtres humains et à saisir leur état d'esprit."}},
  {"name": "Apparence", "type": "competence", "img": "icons/svg/sound.svg", "system": {"categorie": "socle", "caracteristique": "charisme", "cle": "apparence", "socle": "", "valeur": 0, "auChoix": false, "precision": "", "description": "Aptitude du personnage à renvoyer une image de lui-même conforme à ce qu'il souhaite."}},
  {"name": "Autorité", "type": "competence", "img": "icons/svg/sound.svg", "system": {"categorie": "socle", "caracteristique": "charisme", "cle": "autorite", "socle": "", "valeur": 0, "auChoix": false, "precision": "", "description": "Aptitude du personnage à se faire respecter et obéir."}},
  {"name": "Éloquence", "type": "competence", "img": "icons/svg/sound.svg", "system": {"categorie": "socle", "caracteristique": "charisme", "cle": "eloquence", "socle": "", "valeur": 0, "auChoix": false, "precision": "", "description": "Aptitude du personnage à manier le langage à son avantage."}},
  {"name": "Bricolage", "type": "competence", "img": "icons/svg/lightning.svg", "system": {"categorie": "socle", "caracteristique": "agilite", "cle": "bricolage", "socle": "", "valeur": 0, "auChoix": false, "precision": "", "description": "Aptitude du personnage à réaliser des travaux ou faire preuve de motricité fine en manipulant des objets. Elle désigne aussi la maîtrise qu'a le personnage de son environnement technique."}},
  {"name": "Conduite", "type": "competence", "img": "icons/svg/lightning.svg", "system": {"categorie": "socle", "caracteristique": "agilite", "cle": "conduite", "socle": "", "valeur": 0, "auChoix": false, "precision": "", "description": "Savoir-faire du personnage lorsqu'il doit se déplacer à l'aide d'un moyen de transport, mécanique ou animal."}},
  {"name": "Discrétion", "type": "competence", "img": "icons/svg/lightning.svg", "system": {"categorie": "socle", "caracteristique": "agilite", "cle": "discretion", "socle": "", "valeur": 0, "auChoix": false, "precision": "", "description": "Capacité du personnage à ne pas se faire remarquer ou à dissimuler des choses."}},
  {"name": "Soins", "type": "competence", "img": "icons/svg/lightning.svg", "system": {"categorie": "socle", "caracteristique": "agilite", "cle": "soins", "socle": "", "valeur": 0, "auChoix": false, "precision": "", "description": "Aptitude du personnage à réaliser des actes thérapeutiques, sur les humains ou les animaux."}},
  {"name": "Tir", "type": "competence", "img": "icons/svg/lightning.svg", "system": {"categorie": "socle", "caracteristique": "agilite", "cle": "tir", "socle": "", "valeur": 0, "auChoix": false, "precision": "", "description": "Aptitude du personnage à atteindre une cible avec des armes à distance."}},
  {"name": "Athlétisme", "type": "competence", "img": "icons/svg/combat.svg", "system": {"categorie": "socle", "caracteristique": "vigueur", "cle": "athletisme", "socle": "", "valeur": 0, "auChoix": false, "precision": "", "description": "Aptitude du personnage à réaliser des activités sportives et des prouesses physiques."}},
  {"name": "Corps-à-corps", "type": "competence", "img": "icons/svg/combat.svg", "system": {"categorie": "socle", "caracteristique": "vigueur", "cle": "corpsacorps", "socle": "", "valeur": 0, "auChoix": false, "precision": "", "description": "Aptitude du personnage à combattre au contact de l'adversaire."}},
  {"name": "Survie", "type": "competence", "img": "icons/svg/combat.svg", "system": {"categorie": "socle", "caracteristique": "vigueur", "cle": "survie", "socle": "", "valeur": 0, "auChoix": false, "precision": "", "description": "Résistance de l'organisme à l'environnement et maîtrise des techniques de survie en milieu hostile."}},
  {"name": "Art", "type": "competence", "img": "icons/svg/book.svg", "system": {"categorie": "specialite", "caracteristique": "savoir", "cle": "", "socle": "humanites", "valeur": 0, "auChoix": false, "precision": "", "description": "Connaissance des techniques artistiques et de l'histoire des arts."}},
  {"name": "Criminologie", "type": "competence", "img": "icons/svg/book.svg", "system": {"categorie": "specialite", "caracteristique": "savoir", "cle": "", "socle": "humanites", "valeur": 0, "auChoix": false, "precision": "", "description": "Connaissance des techniques d'analyse des crimes."}},
  {"name": "Droit", "type": "competence", "img": "icons/svg/book.svg", "system": {"categorie": "specialite", "caracteristique": "savoir", "cle": "", "socle": "humanites", "valeur": 0, "auChoix": false, "precision": "", "description": "Connaissance et maîtrise de la loi."}},
  {"name": "Folklore", "type": "competence", "img": "icons/svg/book.svg", "system": {"categorie": "specialite", "caracteristique": "savoir", "cle": "", "socle": "humanites", "valeur": 0, "auChoix": false, "precision": "", "description": "Connaissance des rites, légendes et traditions humaines."}},
  {"name": "Géographie", "type": "competence", "img": "icons/svg/book.svg", "system": {"categorie": "specialite", "caracteristique": "savoir", "cle": "", "socle": "humanites", "valeur": 0, "auChoix": false, "precision": "", "description": "Connaissance de la réalité physique et humaine de l'occupation du globe."}},
  {"name": "Histoire", "type": "competence", "img": "icons/svg/book.svg", "system": {"categorie": "specialite", "caracteristique": "savoir", "cle": "", "socle": "humanites", "valeur": 0, "auChoix": false, "precision": "", "description": "Connaissance des événements et dynamiques importants du passé."}},
  {"name": "Langues", "type": "competence", "img": "icons/svg/book.svg", "system": {"categorie": "specialite", "caracteristique": "savoir", "cle": "", "socle": "humanites", "valeur": 0, "auChoix": true, "precision": "", "description": "Maîtrise d'une langue au choix (ancienne ou vivante, fictive ou réelle), autre que la langue maternelle du personnage."}},
  {"name": "Philosophie", "type": "competence", "img": "icons/svg/book.svg", "system": {"categorie": "specialite", "caracteristique": "savoir", "cle": "", "socle": "humanites", "valeur": 0, "auChoix": false, "precision": "", "description": "Connaissance de l'histoire et des débats philosophiques."}},
  {"name": "Religion", "type": "competence", "img": "icons/svg/book.svg", "system": {"categorie": "specialite", "caracteristique": "savoir", "cle": "", "socle": "humanites", "valeur": 0, "auChoix": false, "precision": "", "description": "Connaissance générale des traditions spirituelles humaines."}},
  {"name": "Anatomie", "type": "competence", "img": "icons/svg/book.svg", "system": {"categorie": "specialite", "caracteristique": "savoir", "cle": "", "socle": "medecine", "valeur": 0, "auChoix": false, "precision": "", "description": "Connaissance du corps des humains (et autres animaux)."}},
  {"name": "Médecine légale", "type": "competence", "img": "icons/svg/book.svg", "system": {"categorie": "specialite", "caracteristique": "savoir", "cle": "", "socle": "medecine", "valeur": 0, "auChoix": false, "precision": "", "description": "Spécialité médicale visant à constater et analyser les lésions des victimes, mortes ou vivantes."}},
  {"name": "Pharmacologie", "type": "competence", "img": "icons/svg/book.svg", "system": {"categorie": "specialite", "caracteristique": "savoir", "cle": "", "socle": "medecine", "valeur": 0, "auChoix": false, "precision": "", "description": "Connaissance des remèdes et de leur composition chimique."}},
  {"name": "Pseudo-science", "type": "competence", "img": "icons/svg/book.svg", "system": {"categorie": "specialite", "caracteristique": "savoir", "cle": "", "socle": "medecine", "valeur": 0, "auChoix": true, "precision": "", "description": "Maîtrise des connaissances et pratiques liées à une pseudo-science particulière (phrénologie, magnétisme, etc.)."}},
  {"name": "Psychiatrie", "type": "competence", "img": "icons/svg/book.svg", "system": {"categorie": "specialite", "caracteristique": "savoir", "cle": "", "socle": "medecine", "valeur": 0, "auChoix": false, "precision": "", "description": "Connaissance des maladies mentales et de leurs thérapies."}},
  {"name": "Spécialité médicale", "type": "competence", "img": "icons/svg/book.svg", "system": {"categorie": "specialite", "caracteristique": "savoir", "cle": "", "socle": "medecine", "valeur": 0, "auChoix": true, "precision": "", "description": "Maîtrise d'une spécialité médicale particulière (dentaire, ophtalmologie, neurologie...)."}},
  {"name": "Bibliothèque", "type": "competence", "img": "icons/svg/book.svg", "system": {"categorie": "specialite", "caracteristique": "savoir", "cle": "", "socle": "recherche", "valeur": 0, "auChoix": false, "precision": "", "description": "Faculté du personnage à trouver un ouvrage ou un document dans un ensemble organisé."}},
  {"name": "Lecture", "type": "competence", "img": "icons/svg/book.svg", "system": {"categorie": "specialite", "caracteristique": "savoir", "cle": "", "socle": "recherche", "valeur": 0, "auChoix": false, "precision": "", "description": "Capacité à repérer les informations importantes dans un écrit complexe."}},
  {"name": "Astronomie", "type": "competence", "img": "icons/svg/book.svg", "system": {"categorie": "specialite", "caracteristique": "savoir", "cle": "", "socle": "sciences", "valeur": 0, "auChoix": false, "precision": "", "description": "Connaissance des lois qui régissent les corps célestes."}},
  {"name": "Biologie", "type": "competence", "img": "icons/svg/book.svg", "system": {"categorie": "specialite", "caracteristique": "savoir", "cle": "", "socle": "sciences", "valeur": 0, "auChoix": false, "precision": "", "description": "Connaissance des mécanismes de la vie et de l'histoire de la discipline."}},
  {"name": "Géologie", "type": "competence", "img": "icons/svg/book.svg", "system": {"categorie": "specialite", "caracteristique": "savoir", "cle": "", "socle": "sciences", "valeur": 0, "auChoix": false, "precision": "", "description": "Connaissance des forces qui animent le globe terrestre, en particulier la lithosphère."}},
  {"name": "Mathématiques", "type": "competence", "img": "icons/svg/book.svg", "system": {"categorie": "specialite", "caracteristique": "savoir", "cle": "", "socle": "sciences", "valeur": 0, "auChoix": false, "precision": "", "description": "Connaissance des théories mathématiques et capacité à résoudre des équations et calculs."}},
  {"name": "Physique-Chimie", "type": "competence", "img": "icons/svg/book.svg", "system": {"categorie": "specialite", "caracteristique": "savoir", "cle": "", "socle": "sciences", "valeur": 0, "auChoix": false, "precision": "", "description": "Connaissance des lois de la nature, des propriétés de la matière et de ses transformations."}},
  {"name": "Sciences forensiques", "type": "competence", "img": "icons/svg/book.svg", "system": {"categorie": "specialite", "caracteristique": "savoir", "cle": "", "socle": "sciences", "valeur": 0, "auChoix": false, "precision": "", "description": "Capacité d'analyse scientifique d'une scène de crime."}},
  {"name": "Agriculture", "type": "competence", "img": "icons/svg/book.svg", "system": {"categorie": "specialite", "caracteristique": "savoir", "cle": "", "socle": "techniqueetindustrie", "valeur": 0, "auChoix": false, "precision": "", "description": "Connaissance des techniques agricoles de culture et d'élevage."}},
  {"name": "Bâtiment", "type": "competence", "img": "icons/svg/book.svg", "system": {"categorie": "specialite", "caracteristique": "savoir", "cle": "", "socle": "techniqueetindustrie", "valeur": 0, "auChoix": false, "precision": "", "description": "Connaissance des techniques du bâtiment et du droit immobilier."}},
  {"name": "Économie", "type": "competence", "img": "icons/svg/book.svg", "system": {"categorie": "specialite", "caracteristique": "savoir", "cle": "", "socle": "techniqueetindustrie", "valeur": 0, "auChoix": false, "precision": "", "description": "Connaissance globale des mécanismes monétaires et financiers."}},
  {"name": "Énergie", "type": "competence", "img": "icons/svg/book.svg", "system": {"categorie": "specialite", "caracteristique": "savoir", "cle": "", "socle": "techniqueetindustrie", "valeur": 0, "auChoix": false, "precision": "", "description": "Connaissance des systèmes de production et d'approvisionnement d'énergie."}},
  {"name": "Gestion", "type": "competence", "img": "icons/svg/book.svg", "system": {"categorie": "specialite", "caracteristique": "savoir", "cle": "", "socle": "techniqueetindustrie", "valeur": 0, "auChoix": false, "precision": "", "description": "Capacité à organiser et administrer les ressources d'une structure afin d'assurer son bon fonctionnement."}},
  {"name": "Mécanique", "type": "competence", "img": "icons/svg/book.svg", "system": {"categorie": "specialite", "caracteristique": "savoir", "cle": "", "socle": "techniqueetindustrie", "valeur": 0, "auChoix": false, "precision": "", "description": "Connaissance du fonctionnement des technologies récentes."}},
  {"name": "Nouvelles technologies", "type": "competence", "img": "icons/svg/book.svg", "system": {"categorie": "specialite", "caracteristique": "savoir", "cle": "", "socle": "techniqueetindustrie", "valeur": 0, "auChoix": false, "precision": "", "description": "Connaissance des nouveautés techniques et technologiques et de leur fonctionnement."}},
  {"name": "Art de la scène", "type": "competence", "img": "icons/svg/sound.svg", "system": {"categorie": "specialite", "caracteristique": "charisme", "cle": "", "socle": "apparence", "valeur": 0, "auChoix": true, "precision": "", "description": "Capacité à réaliser des prestations scéniques attrayantes dans un domaine donné (chant, théâtre, danse, etc.)."}},
  {"name": "Déguisement", "type": "competence", "img": "icons/svg/sound.svg", "system": {"categorie": "specialite", "caracteristique": "charisme", "cle": "", "socle": "apparence", "valeur": 0, "auChoix": false, "precision": "", "description": "Aptitude à modifier efficacement son apparence."}},
  {"name": "Étiquette", "type": "competence", "img": "icons/svg/sound.svg", "system": {"categorie": "specialite", "caracteristique": "charisme", "cle": "", "socle": "apparence", "valeur": 0, "auChoix": false, "precision": "", "description": "Connaissance des codes du savoir-vivre."}},
  {"name": "Séduction", "type": "competence", "img": "icons/svg/sound.svg", "system": {"categorie": "specialite", "caracteristique": "charisme", "cle": "", "socle": "apparence", "valeur": 0, "auChoix": false, "precision": "", "description": "Aptitude à charmer des personnages."}},
  {"name": "Commander", "type": "competence", "img": "icons/svg/sound.svg", "system": {"categorie": "specialite", "caracteristique": "charisme", "cle": "", "socle": "autorite", "valeur": 0, "auChoix": false, "precision": "", "description": "Faculté à se faire obéir des humains."}},
  {"name": "Dressage", "type": "competence", "img": "icons/svg/sound.svg", "system": {"categorie": "specialite", "caracteristique": "charisme", "cle": "", "socle": "autorite", "valeur": 0, "auChoix": false, "precision": "", "description": "Faculté à se faire obéir des animaux."}},
  {"name": "Hypnose", "type": "competence", "img": "icons/svg/sound.svg", "system": {"categorie": "specialite", "caracteristique": "charisme", "cle": "", "socle": "autorite", "valeur": 0, "auChoix": false, "precision": "", "description": "Capacité à hypnotiser des individus."}},
  {"name": "Interrogatoire", "type": "competence", "img": "icons/svg/sound.svg", "system": {"categorie": "specialite", "caracteristique": "charisme", "cle": "", "socle": "autorite", "valeur": 0, "auChoix": false, "precision": "", "description": "Capacité du personnage à déployer des techniques pour faire dire à votre interlocuteur ce qu'il sait."}},
  {"name": "Intimidation", "type": "competence", "img": "icons/svg/sound.svg", "system": {"categorie": "specialite", "caracteristique": "charisme", "cle": "", "socle": "autorite", "valeur": 0, "auChoix": false, "precision": "", "description": "Aptitude à inspirer de la crainte à des interlocuteurs."}},
  {"name": "Réconforter", "type": "competence", "img": "icons/svg/sound.svg", "system": {"categorie": "specialite", "caracteristique": "charisme", "cle": "", "socle": "autorite", "valeur": 0, "auChoix": false, "precision": "", "description": "Capacité à rassurer et remonter le moral d'une personne ou d'un groupe."}},
  {"name": "Diplomatie", "type": "competence", "img": "icons/svg/sound.svg", "system": {"categorie": "specialite", "caracteristique": "charisme", "cle": "", "socle": "eloquence", "valeur": 0, "auChoix": false, "precision": "", "description": "Faculté du personnage à ne pas froisser ses interlocuteurs."}},
  {"name": "Expliquer", "type": "competence", "img": "icons/svg/sound.svg", "system": {"categorie": "specialite", "caracteristique": "charisme", "cle": "", "socle": "eloquence", "valeur": 0, "auChoix": false, "precision": "", "description": "Capacité à expliquer des propos ou contenus théoriques de manière claire et pédagogique."}},
  {"name": "Imposture", "type": "competence", "img": "icons/svg/sound.svg", "system": {"categorie": "specialite", "caracteristique": "charisme", "cle": "", "socle": "eloquence", "valeur": 0, "auChoix": false, "precision": "", "description": "Capacité du personnage à se faire passer pour ce qu'il n'est pas."}},
  {"name": "Mensonge", "type": "competence", "img": "icons/svg/sound.svg", "system": {"categorie": "specialite", "caracteristique": "charisme", "cle": "", "socle": "eloquence", "valeur": 0, "auChoix": false, "precision": "", "description": "Capacité du personnage à dissimuler la vérité sans se faire découvrir."}},
  {"name": "Négocier", "type": "competence", "img": "icons/svg/sound.svg", "system": {"categorie": "specialite", "caracteristique": "charisme", "cle": "", "socle": "eloquence", "valeur": 0, "auChoix": false, "precision": "", "description": "Capacité du personnage à obtenir des bons prix en marchandant."}},
  {"name": "Prêcher", "type": "competence", "img": "icons/svg/sound.svg", "system": {"categorie": "specialite", "caracteristique": "charisme", "cle": "", "socle": "eloquence", "valeur": 0, "auChoix": false, "precision": "", "description": "Capacité du personnage à répandre un dogme par la parole."}},
  {"name": "Rédaction", "type": "competence", "img": "icons/svg/sound.svg", "system": {"categorie": "specialite", "caracteristique": "charisme", "cle": "", "socle": "eloquence", "valeur": 0, "auChoix": false, "precision": "", "description": "Capacité à mettre des idées par écrit dans un style particulier (professoral, lyrique, prophétique, etc.)."}},
  {"name": "Artisanat", "type": "competence", "img": "icons/svg/lightning.svg", "system": {"categorie": "specialite", "caracteristique": "agilite", "cle": "", "socle": "bricolage", "valeur": 0, "auChoix": true, "precision": "", "description": "Maîtrise d'un savoir-faire manuel au choix (menuiserie, joaillerie, plomberie...)."}},
  {"name": "Contrefaçon", "type": "competence", "img": "icons/svg/lightning.svg", "system": {"categorie": "specialite", "caracteristique": "agilite", "cle": "", "socle": "bricolage", "valeur": 0, "auChoix": false, "precision": "", "description": "Capacité du personnage à fabriquer des faux (documents, objets)."}},
  {"name": "Crochetage", "type": "competence", "img": "icons/svg/lightning.svg", "system": {"categorie": "specialite", "caracteristique": "agilite", "cle": "", "socle": "bricolage", "valeur": 0, "auChoix": false, "precision": "", "description": "Faculté d'ouvrir des verrous en l'absence de clé."}},
  {"name": "Explosifs", "type": "competence", "img": "icons/svg/lightning.svg", "system": {"categorie": "specialite", "caracteristique": "agilite", "cle": "", "socle": "bricolage", "valeur": 0, "auChoix": false, "precision": "", "description": "Connaissance du fonctionnement des explosifs et capacité à les fabriquer."}},
  {"name": "Faire des nœuds", "type": "competence", "img": "icons/svg/lightning.svg", "system": {"categorie": "specialite", "caracteristique": "agilite", "cle": "", "socle": "bricolage", "valeur": 0, "auChoix": false, "precision": "", "description": "Maîtrise des techniques pour nouer et dénouer différents types de nœuds."}},
  {"name": "Réparation", "type": "competence", "img": "icons/svg/lightning.svg", "system": {"categorie": "specialite", "caracteristique": "agilite", "cle": "", "socle": "bricolage", "valeur": 0, "auChoix": false, "precision": "", "description": "Capacité à réparer des objets cassés ou à remonter des objets démontés."}},
  {"name": "Sabotage", "type": "competence", "img": "icons/svg/lightning.svg", "system": {"categorie": "specialite", "caracteristique": "agilite", "cle": "", "socle": "bricolage", "valeur": 0, "auChoix": false, "precision": "", "description": "Maîtrise des techniques de détérioration et de destruction d'équipements."}},
  {"name": "Automobile", "type": "competence", "img": "icons/svg/lightning.svg", "system": {"categorie": "specialite", "caracteristique": "agilite", "cle": "", "socle": "conduite", "valeur": 0, "auChoix": false, "precision": "", "description": "Aisance à conduire un véhicule automobile (y compris poids-lourds et motos)."}},
  {"name": "Cyclisme", "type": "competence", "img": "icons/svg/lightning.svg", "system": {"categorie": "specialite", "caracteristique": "agilite", "cle": "", "socle": "conduite", "valeur": 0, "auChoix": false, "precision": "", "description": "Capacité à faire du vélo et à effectuer des réparations sommaires sur une bicyclette."}},
  {"name": "Équitation", "type": "competence", "img": "icons/svg/lightning.svg", "system": {"categorie": "specialite", "caracteristique": "agilite", "cle": "", "socle": "conduite", "valeur": 0, "auChoix": false, "precision": "", "description": "Capacité à monter à cheval et à établir un lien avec sa monture."}},
  {"name": "Navigation", "type": "competence", "img": "icons/svg/lightning.svg", "system": {"categorie": "specialite", "caracteristique": "agilite", "cle": "", "socle": "conduite", "valeur": 0, "auChoix": false, "precision": "", "description": "Capacité à manier et orienter un navire."}},
  {"name": "Pilotage", "type": "competence", "img": "icons/svg/lightning.svg", "system": {"categorie": "specialite", "caracteristique": "agilite", "cle": "", "socle": "conduite", "valeur": 0, "auChoix": true, "precision": "", "description": "Conduite d'un véhicule inhabituel au choix (avion, locomotive, etc.)."}},
  {"name": "Dissimulation", "type": "competence", "img": "icons/svg/lightning.svg", "system": {"categorie": "specialite", "caracteristique": "agilite", "cle": "", "socle": "discretion", "valeur": 0, "auChoix": false, "precision": "", "description": "Faculté du personnage à se cacher et à cacher des objets."}},
  {"name": "Filature", "type": "competence", "img": "icons/svg/lightning.svg", "system": {"categorie": "specialite", "caracteristique": "agilite", "cle": "", "socle": "discretion", "valeur": 0, "auChoix": false, "precision": "", "description": "Capacité du personnage à suivre sa cible sans se faire apercevoir."}},
  {"name": "Vol à la tire", "type": "competence", "img": "icons/svg/lightning.svg", "system": {"categorie": "specialite", "caracteristique": "agilite", "cle": "", "socle": "discretion", "valeur": 0, "auChoix": false, "precision": "", "description": "Faculté à dérober des objets."}},
  {"name": "Chirurgie", "type": "competence", "img": "icons/svg/lightning.svg", "system": {"categorie": "specialite", "caracteristique": "agilite", "cle": "", "socle": "soins", "valeur": 0, "auChoix": false, "precision": "", "description": "Capacité du personnage à exécuter avec précision des opérations médicales."}},
  {"name": "Premiers soins", "type": "competence", "img": "icons/svg/lightning.svg", "system": {"categorie": "specialite", "caracteristique": "agilite", "cle": "", "socle": "soins", "valeur": 0, "auChoix": false, "precision": "", "description": "Connaissance des gestes à effectuer pour administrer des soins immédiats."}},
  {"name": "Soins vétérinaires", "type": "competence", "img": "icons/svg/lightning.svg", "system": {"categorie": "specialite", "caracteristique": "agilite", "cle": "", "socle": "soins", "valeur": 0, "auChoix": false, "precision": "", "description": "Connaissance des techniques et substances pour soigner les animaux."}},
  {"name": "Arme à feu", "type": "competence", "img": "icons/svg/lightning.svg", "system": {"categorie": "specialite", "caracteristique": "agilite", "cle": "", "socle": "tir", "valeur": 0, "auChoix": false, "precision": "", "description": "Capacité à atteindre sa cible avec une arme à feu."}},
  {"name": "Lancer", "type": "competence", "img": "icons/svg/lightning.svg", "system": {"categorie": "specialite", "caracteristique": "agilite", "cle": "", "socle": "tir", "valeur": 0, "auChoix": false, "precision": "", "description": "Facilité à projeter au loin et avec précision des objets."}},
  {"name": "Tir à l'arc", "type": "competence", "img": "icons/svg/lightning.svg", "system": {"categorie": "specialite", "caracteristique": "agilite", "cle": "", "socle": "tir", "valeur": 0, "auChoix": false, "precision": "", "description": "Capacité à atteindre sa cible avec un arc."}},
  {"name": "Courir", "type": "competence", "img": "icons/svg/combat.svg", "system": {"categorie": "specialite", "caracteristique": "vigueur", "cle": "", "socle": "athletisme", "valeur": 0, "auChoix": false, "precision": "", "description": "Aptitude à courir rapidement et adroitement."}},
  {"name": "Équilibre", "type": "competence", "img": "icons/svg/combat.svg", "system": {"categorie": "specialite", "caracteristique": "vigueur", "cle": "", "socle": "athletisme", "valeur": 0, "auChoix": false, "precision": "", "description": "Faculté à garder son équilibre dans des environnements instables."}},
  {"name": "Escalader", "type": "competence", "img": "icons/svg/combat.svg", "system": {"categorie": "specialite", "caracteristique": "vigueur", "cle": "", "socle": "athletisme", "valeur": 0, "auChoix": false, "precision": "", "description": "Aisance pour grimper sur les parois, les arbres, etc."}},
  {"name": "Nager", "type": "competence", "img": "icons/svg/combat.svg", "system": {"categorie": "specialite", "caracteristique": "vigueur", "cle": "", "socle": "athletisme", "valeur": 0, "auChoix": false, "precision": "", "description": "Maîtrise de la natation."}},
  {"name": "Sauter", "type": "competence", "img": "icons/svg/combat.svg", "system": {"categorie": "specialite", "caracteristique": "vigueur", "cle": "", "socle": "athletisme", "valeur": 0, "auChoix": false, "precision": "", "description": "Faculté à sauter haut et loin."}},
  {"name": "Sport", "type": "competence", "img": "icons/svg/combat.svg", "system": {"categorie": "specialite", "caracteristique": "vigueur", "cle": "", "socle": "athletisme", "valeur": 0, "auChoix": true, "precision": "", "description": "Aptitude à l'activité physique."}},
  {"name": "Arme blanche", "type": "competence", "img": "icons/svg/combat.svg", "system": {"categorie": "specialite", "caracteristique": "vigueur", "cle": "", "socle": "corpsacorps", "valeur": 0, "auChoix": false, "precision": "", "description": "Capacité à frapper avec précision et/ou violence avec une arme de corps-à-corps."}},
  {"name": "Combat à mains nues", "type": "competence", "img": "icons/svg/combat.svg", "system": {"categorie": "specialite", "caracteristique": "vigueur", "cle": "", "socle": "corpsacorps", "valeur": 0, "auChoix": false, "precision": "", "description": "Faculté du personnage à prendre le dessus sur ses adversaires lors d'une bagarre."}},
  {"name": "Apnée", "type": "competence", "img": "icons/svg/combat.svg", "system": {"categorie": "specialite", "caracteristique": "vigueur", "cle": "", "socle": "survie", "valeur": 0, "auChoix": false, "precision": "", "description": "Capacité à retenir sa respiration pendant longtemps."}},
  {"name": "Braconnage", "type": "competence", "img": "icons/svg/combat.svg", "system": {"categorie": "specialite", "caracteristique": "vigueur", "cle": "", "socle": "survie", "valeur": 0, "auChoix": false, "precision": "", "description": "Connaissance du personnage des techniques de chasse : repérage des traces, pose de pièges, dépeçage…"}},
  {"name": "Pêche", "type": "competence", "img": "icons/svg/combat.svg", "system": {"categorie": "specialite", "caracteristique": "vigueur", "cle": "", "socle": "survie", "valeur": 0, "auChoix": false, "precision": "", "description": "Maîtrise des techniques pour attraper des animaux aquatiques."}},
  {"name": "Écouter", "type": "competence", "img": "icons/svg/eye.svg", "system": {"categorie": "specialite", "caracteristique": "perception", "cle": "", "socle": "enquete", "valeur": 0, "auChoix": false, "precision": "", "description": "Capacité du personnage à tendre l'oreille pour discerner des sons."}},
  {"name": "Fouiller", "type": "competence", "img": "icons/svg/eye.svg", "system": {"categorie": "specialite", "caracteristique": "perception", "cle": "", "socle": "enquete", "valeur": 0, "auChoix": false, "precision": "", "description": "Capacité à fouiller méthodiquement un lieu."}},
  {"name": "Goûter", "type": "competence", "img": "icons/svg/eye.svg", "system": {"categorie": "specialite", "caracteristique": "perception", "cle": "", "socle": "enquete", "valeur": 0, "auChoix": false, "precision": "", "description": "Capacité du personnage à identifier les goûts des aliments."}},
  {"name": "Observer", "type": "competence", "img": "icons/svg/eye.svg", "system": {"categorie": "specialite", "caracteristique": "perception", "cle": "", "socle": "enquete", "valeur": 0, "auChoix": false, "precision": "", "description": "Faculté du personnage à percevoir finement ce qui se trouve dans son champ visuel."}},
  {"name": "Pister", "type": "competence", "img": "icons/svg/eye.svg", "system": {"categorie": "specialite", "caracteristique": "perception", "cle": "", "socle": "enquete", "valeur": 0, "auChoix": false, "precision": "", "description": "Capacité du personnage à remonter une piste humaine, animale, ou d'un véhicule."}},
  {"name": "Sentir", "type": "competence", "img": "icons/svg/eye.svg", "system": {"categorie": "specialite", "caracteristique": "perception", "cle": "", "socle": "enquete", "valeur": 0, "auChoix": false, "precision": "", "description": "Capacité du personnage à identifier des odeurs."}},
  {"name": "Art visuel", "type": "competence", "img": "icons/svg/eye.svg", "system": {"categorie": "specialite", "caracteristique": "perception", "cle": "", "socle": "evaluation", "valeur": 0, "auChoix": true, "precision": "", "description": "Maîtrise d'un art visuel au choix (peinture, sculpture, gravure...)."}},
  {"name": "Déchiffrer", "type": "competence", "img": "icons/svg/eye.svg", "system": {"categorie": "specialite", "caracteristique": "perception", "cle": "", "socle": "evaluation", "valeur": 0, "auChoix": false, "precision": "", "description": "Capacité à interpréter des signes écrits difficiles à comprendre."}},
  {"name": "Estimation", "type": "competence", "img": "icons/svg/eye.svg", "system": {"categorie": "specialite", "caracteristique": "perception", "cle": "", "socle": "evaluation", "valeur": 0, "auChoix": false, "precision": "", "description": "Capacité du personnage à évaluer précisément la valeur d'un objet, d'un matériau ou d'un service."}},
  {"name": "Orientation", "type": "competence", "img": "icons/svg/eye.svg", "system": {"categorie": "specialite", "caracteristique": "perception", "cle": "", "socle": "evaluation", "valeur": 0, "auChoix": false, "precision": "", "description": "Capacité à se repérer dans l'espace, notamment grâce aux points cardinaux."}},
  {"name": "Empathie", "type": "competence", "img": "icons/svg/eye.svg", "system": {"categorie": "specialite", "caracteristique": "perception", "cle": "", "socle": "psychologie", "valeur": 0, "auChoix": false, "precision": "", "description": "Capacité du personnage à éprouver et montrer sa sympathie envers autrui."}},
  {"name": "Interprétation des rêves", "type": "competence", "img": "icons/svg/eye.svg", "system": {"categorie": "specialite", "caracteristique": "perception", "cle": "", "socle": "psychologie", "valeur": 0, "auChoix": false, "precision": "", "description": "Capacité du personnage à déceler les sens des rêves."}},
  {"name": "Langage corporel", "type": "competence", "img": "icons/svg/eye.svg", "system": {"categorie": "specialite", "caracteristique": "perception", "cle": "", "socle": "psychologie", "valeur": 0, "auChoix": false, "precision": "", "description": "Faculté à comprendre les états mentaux d'un personnage en interprétant les signes physiques de son corps."}}
];

// ------------------------------------------------
// FICHE D'ITEM : COMPÉTENCE
// ------------------------------------------------
class CdTFeuilleCompetence extends foundry.applications.api.HandlebarsApplicationMixin(
  foundry.applications.sheets.ItemSheetV2
) {
  static DEFAULT_OPTIONS = {
    classes: ["cdt", "competence-sheet"],
    position: { width: 480, height: 520 },
    window: { resizable: true },
    form: { submitOnChange: true, closeOnSubmit: false },
  };

  static PARTS = {
    body: { template: "systems/chants-de-tindalos/templates/item/feuille-competence.html" },
  };

  async _prepareContext(options) {
    const item = this.item;
    const system = item.system;

    // Liste des socles disponibles : les 19 officiels + les socles personnalisés
    // présents sur l'acteur porteur (ou dans le monde si l'item est libre)
    const socles = Object.entries(CDT_SOCLES).map(([cle, s]) => ({ cle, label: s.label, carac: s.carac }));
    const source = item.actor ? item.actor.items : game.items;
    for (const it of source) {
      if (it.type !== "competence" || it.system.categorie !== "socle") continue;
      const cle = cleSocle(it);
      if (!socles.some(s => s.cle === cle)) socles.push({ cle, label: it.name, carac: it.system.caracteristique });
    }
    socles.sort((a, b) => a.label.localeCompare(b.label, "fr"));

    return {
      item,
      system,
      estSocle: system.categorie === "socle",
      caracs: Object.entries(CDT_CARACS).map(([cle, c]) => ({ cle, label: c.label, icone: c.icone, selected: cle === system.caracteristique })),
      socles: socles.map(s => ({ ...s, selected: s.cle === system.socle })),
      cleAffichee: cleSocle(item),
      libelle: libelleCompetence(item),
      caracLabel: CDT_CARACS[system.caracteristique]?.label ?? system.caracteristique,
      socleLabel: CDT_SOCLES[system.socle]?.label ?? socles.find(s => s.cle === system.socle)?.label ?? "",
    };
  }

  _onRender(context, options) {
    super._onRender(context, options);
    const html = this.element;

    html.querySelector(".arme-portrait-wrapper")?.addEventListener("click", () => {
      new foundry.applications.apps.FilePicker.implementation({
        type: "image",
        current: this.item.img,
        callback: (path) => this.item.update({ img: path }),
      }).browse();
    });

    // Quand on choisit un socle pour une spécialité, on aligne la caractéristique
    html.querySelector("select[name='system.socle']")?.addEventListener("change", (ev) => {
      const cle = ev.currentTarget.value;
      const carac = CDT_SOCLES[cle]?.carac
        ?? context.socles.find(s => s.cle === cle)?.carac;
      if (carac) this.item.update({ "system.socle": cle, "system.caracteristique": carac });
    });

    // Bouton : lancer le jet depuis la fiche (si l'item est porté par un acteur)
    html.querySelector(".btn-jet-competence-item")?.addEventListener("click", () => {
      if (this.item.actor?.sheet?._jetCompetenceItem) this.item.actor.sheet._jetCompetenceItem(this.item.id);
      else ui.notifications.warn("Cette compétence n'est pas rattachée à un personnage.");
    });
  }
}

// ------------------------------------------------
// HELPERS PARTAGÉS (utilisés par la fiche PJ et l'assistant de création)
// ------------------------------------------------

/**
 * Regroupe les compétences d'un acteur pour l'affichage de l'onglet.
 * @returns {{ socles: Array, specialites: Array, total: number }}
 */
function regrouperCompetences(actor) {
  const items = actor.items.filter(i => i.type === "competence");
  const tri = (a, b) => a.name.localeCompare(b.name, "fr");

  const socleItems = items.filter(i => i.system.categorie === "socle").sort(tri);
  const specItems  = items.filter(i => i.system.categorie !== "socle").sort(tri);

  // Socles groupés par caractéristique
  const socles = Object.entries(CDT_CARACS).map(([cle, c]) => ({
    cle, label: c.label, icone: c.icone,
    items: socleItems.filter(i => i.system.caracteristique === cle).map(i => formaterLigne(i)),
  })).filter(g => g.items.length);

  // Spécialités groupées par socle parent
  const groupes = new Map();
  for (const it of specItems) {
    const cle = it.system.socle || "_sans";
    if (!groupes.has(cle)) {
      const socleItem = socleItems.find(s => cleSocle(s) === cle);
      const label = socleItem?.name ?? CDT_SOCLES[cle]?.label ?? (cle === "_sans" ? "Sans socle" : cle);
      const carac = socleItem?.system.caracteristique ?? CDT_SOCLES[cle]?.carac ?? it.system.caracteristique;
      groupes.set(cle, { cle, label, icone: CDT_CARACS[carac]?.icone ?? "", socleValeur: socleItem?.system.valeur ?? 0, items: [] });
    }
    groupes.get(cle).items.push(formaterLigne(it));
  }
  const specialites = [...groupes.values()].sort((a, b) => a.label.localeCompare(b.label, "fr"));

  return { socles, specialites, total: items.length };
}

function formaterLigne(item) {
  const carac = CDT_CARACS[item.system.caracteristique];
  return {
    id: item.id,
    name: item.name,
    img: item.img,
    libelle: libelleCompetence(item),
    valeur: item.system.valeur ?? 0,
    carac: item.system.caracteristique,
    caracIcone: carac?.icone ?? "",
    caracLabel: carac?.label ?? "",
    auChoix: item.system.auChoix,
    precision: item.system.precision,
    description: item.system.description,
  };
}

/**
 * Nombre de dés pour un jet de compétence : Carac + Socle (si spécialité) + Valeur.
 * @returns {{ nbDes:number, carac:object, caracId:string, detail:string }}
 */
function calculerDesCompetence(actor, item) {
  const caracId = item.system.caracteristique ?? "savoir";
  const carac = actor.system.caracteristiques?.[caracId] ?? { valeur: 1, cout: 3, label: caracId };
  const caracVal = carac.valeur ?? 1;
  const valeur = item.system.valeur ?? 0;

  let socleVal = 0;
  let socleNom = "";
  if (item.system.categorie !== "socle" && item.system.socle) {
    const socleItem = actor.items.find(i => i.type === "competence" && i.system.categorie === "socle" && cleSocle(i) === item.system.socle);
    socleVal = socleItem?.system.valeur ?? 0;
    socleNom = socleItem?.name ?? CDT_SOCLES[item.system.socle]?.label ?? "";
  }

  const parties = [`${CDT_CARACS[caracId]?.label ?? caracId} ${caracVal}`];
  if (socleNom) parties.push(`${socleNom} ${socleVal}`);
  parties.push(`${item.name} ${valeur}`);

  return { nbDes: Math.max(1, caracVal + socleVal + valeur), carac, caracId, detail: parties.join(" + ") };
}

/**
 * Ajoute à un acteur des compétences du compendium à partir de leurs noms.
 * Les doublons (même nom déjà présent) sont ignorés.
 * @param {Actor} actor
 * @param {string[]} noms
 * @param {number} valeur  valeur initiale des compétences ajoutées
 * @returns {Promise<number>} nombre de compétences ajoutées
 */
/**
 * Normalise un libellé de l'assistant de création ("Art (Photographie)", "Langues (SAV)",
 * "Art de la scène - Chant (CHA)", "Neurologie"…) en { nom, precision }.
 */
const CDT_ALIAS_COMPETENCES = {
  neurologie: { nom: "Spécialité médicale", precision: "Neurologie" },
};

function normaliserNomCompetence(libelle) {
  let texte = (libelle ?? "").trim();
  if (!texte) return null;
  // Retire le suffixe de caractéristique : "(SAV)", "(PER)"…
  texte = texte.replace(/\s*\((SAV|PER|CHA|AGI|VIG)\)\s*$/i, "").trim();
  let precision = "";
  // "Nom (Précision)"
  let m = texte.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  if (m) { texte = m[1].trim(); precision = m[2].trim(); }
  // "Nom - Précision"
  m = texte.match(/^(.*?)\s+-\s+(.+)$/);
  if (m) { texte = m[1].trim(); precision = precision || m[2].trim(); }
  const alias = CDT_ALIAS_COMPETENCES[slugCompetence(texte)];
  if (alias) return { nom: alias.nom, precision: precision || alias.precision };
  return { nom: texte, precision };
}

async function ajouterCompetencesParNoms(actor, noms, valeur = 1) {
  const pack = game.packs.get("chants-de-tindalos.competences");
  if (!pack) return 0;
  const docs = await pack.getDocuments();
  const cleExistant = (nom, precision) => `${slugCompetence(nom)}|${slugCompetence(precision)}`;
  const existants = new Set(actor.items.filter(i => i.type === "competence").map(i => cleExistant(i.name, i.system.precision)));
  const aCreer = [];
  for (const libelle of noms) {
    const norm = normaliserNomCompetence(libelle);
    if (!norm) continue;
    const doc = docs.find(d => slugCompetence(d.name) === slugCompetence(norm.nom));
    if (!doc) { console.log(`CDT | Compétence introuvable dans le compendium : ${libelle}`); continue; }
    const cle = cleExistant(doc.name, norm.precision);
    if (existants.has(cle)) continue;
    const data = doc.toObject();
    data.system.valeur = valeur;
    if (norm.precision) data.system.precision = norm.precision;
    aCreer.push(data);
    existants.add(cle);
  }
  if (aCreer.length) await actor.createEmbeddedDocuments("Item", aCreer);
  return aCreer.length;
}

// ------------------------------------------------
// MIGRATION : anciennes compétences (schéma fixe) → items
// ------------------------------------------------
const CDT_MIGRATION_SOCLES = { appreciation: "evaluation" }; // anciens identifiants → nouvelles clés
const CDT_ICONES_CARAC = { savoir: "icons/svg/book.svg", perception: "icons/svg/eye.svg", charisme: "icons/svg/sound.svg", agilite: "icons/svg/lightning.svg", vigueur: "icons/svg/combat.svg" };

/**
 * Construit des données d'items "competence" à partir de l'ancien format
 * `{ socle: { id: {label, valeur, caracLiee, xp} }, specialite: { id: {label, valeur, caracLiee, compSocle, xp} } }`.
 * Les compétences connues sont prises dans le compendium (description, icône), les autres sont créées sur mesure.
 * @param {object} legacy   ancien objet competences
 * @param {Document[]} docs documents du compendium des compétences (optionnel)
 * @param {object} options  { inclureZero: false } pour garder aussi les compétences à 0
 */
function itemsDepuisCompetencesLegacy(legacy, docs = [], { inclureZero = false } = {}) {
  const aCreer = [];
  const trouver = (nom, categorie) => docs.find(d => d.system?.categorie === categorie && slugCompetence(d.name) === slugCompetence(nom));

  for (const [id, c] of Object.entries(legacy?.socle ?? {})) {
    if (!c) continue;
    const valeur = c.valeur ?? 0;
    if (!inclureZero && !(valeur > 0)) continue;
    const cle = CDT_MIGRATION_SOCLES[id] ?? slugCompetence(id);
    const nomOfficiel = CDT_SOCLES[cle]?.label;
    const doc = trouver(nomOfficiel ?? c.label ?? id, "socle");
    if (doc) {
      const data = doc.toObject();
      data.system.valeur = valeur; data.system.xp = c.xp ?? 0;
      aCreer.push(data);
    } else {
      const carac = c.caracLiee ?? CDT_SOCLES[cle]?.carac ?? "savoir";
      aCreer.push({
        name: c.label ?? nomOfficiel ?? id, type: "competence", img: CDT_ICONES_CARAC[carac] ?? "icons/svg/book.svg",
        system: { categorie: "socle", caracteristique: carac, cle, socle: "", valeur, xp: c.xp ?? 0, auChoix: false, precision: "", description: "" },
      });
    }
  }

  for (const [id, c] of Object.entries(legacy?.specialite ?? {})) {
    if (!c) continue;
    const valeur = c.valeur ?? 0;
    if (!inclureZero && !(valeur > 0)) continue;
    const socle = CDT_MIGRATION_SOCLES[c.compSocle] ?? (c.compSocle ? slugCompetence(c.compSocle) : "");
    const norm = normaliserNomCompetence(c.label ?? id) ?? { nom: c.label ?? id, precision: "" };
    const doc = trouver(norm.nom, "specialite");
    if (doc) {
      const data = doc.toObject();
      data.system.valeur = valeur; data.system.xp = c.xp ?? 0;
      if (norm.precision) data.system.precision = norm.precision;
      // On conserve le rattachement d'origine s'il existe sur la fiche, sinon celui du compendium
      if (socle) data.system.socle = socle;
      aCreer.push(data);
    } else {
      const carac = c.caracLiee ?? CDT_SOCLES[socle]?.carac ?? "savoir";
      aCreer.push({
        name: c.label ?? id, type: "competence", img: CDT_ICONES_CARAC[carac] ?? "icons/svg/book.svg",
        system: { categorie: "specialite", caracteristique: carac, cle: "", socle, valeur, xp: c.xp ?? 0, auChoix: false, precision: "", description: "" },
      });
    }
  }
  return aCreer;
}

async function migrerCompetencesActeur(actor) {
  if (actor.type !== "personnage") return false;
  if (actor.getFlag("chants-de-tindalos", "competencesMigrees")) return false;
  if (actor.items.some(i => i.type === "competence")) {
    await actor.setFlag("chants-de-tindalos", "competencesMigrees", true);
    return false;
  }

  const docs = await (game.packs.get("chants-de-tindalos.competences")?.getDocuments() ?? []);
  const aCreer = itemsDepuisCompetencesLegacy(actor.system.competences ?? {}, docs);

  if (aCreer.length) {
    await actor.createEmbeddedDocuments("Item", aCreer);
    console.log(`CDT | ${aCreer.length} compétence(s) migrée(s) pour ${actor.name}`);
  }
  await actor.setFlag("chants-de-tindalos", "competencesMigrees", true);
  return aCreer.length > 0;
}

async function migrerToutesLesCompetences() {
  if (!game.user.isGM) return;
  let n = 0;
  for (const actor of game.actors) {
    try { if (await migrerCompetencesActeur(actor)) n++; }
    catch (e) { console.error(`CDT | Migration des compétences de ${actor.name} :`, e); }
  }
  if (n) ui.notifications.info(`📜 Compétences migrées en items pour ${n} personnage(s).`);
}

// ------------------------------------------------
// COMPENDIUM
// ------------------------------------------------
async function initialiserCompendiumCompetences() {
  const nomPack = "chants-de-tindalos.competences";
  const pack = game.packs.get(nomPack);
  if (!pack) { console.log(`CDT | Pack ${nomPack} non trouvé.`); return; }
  const contenu = await pack.getDocuments();
  if (contenu.length > 0) return;

  await pack.configure({ locked: false });
  await new Promise(r => setTimeout(r, 300));

  try {
    await Item.createDocuments(CDT_COMPETENCES_DATA, { pack: nomPack });
  } catch (e) {
    console.error("CDT | Erreur création compétences :", e);
  }

  await pack.configure({ locked: true });
  console.log(`CDT | ${CDT_COMPETENCES_DATA.length} compétences ajoutées dans ${nomPack} !`);
  ui.notifications?.info("✅ Compendium Compétences initialisé !");
}

// ------------------------------------------------
// ENREGISTREMENT
// ------------------------------------------------
Hooks.once("init", function () {
  CONFIG.Item.dataModels.competence = CompetenceDataModel;

  foundry.documents.collections.Items.registerSheet("chants-de-tindalos", CdTFeuilleCompetence, {
    types: ["competence"], makeDefault: true, label: "Fiche Compétence CDT",
  });

  // Rend les constantes accessibles ailleurs (console, macros, autres modules)
  globalThis.CDT = globalThis.CDT ?? {};
  Object.assign(globalThis.CDT, { CDT_CARACS, CDT_SOCLES, slugCompetence, cleSocle, regrouperCompetences, calculerDesCompetence, ajouterCompetencesParNoms, itemsDepuisCompetencesLegacy, migrerCompetencesActeur });
});

Hooks.once("ready", async function () {
  if (game.user.isGM) {
    await initialiserCompendiumCompetences();
    await migrerToutesLesCompetences();
  }
});

// Personnages créés après le chargement (import de pré-tirés, etc.) : migration à la volée
Hooks.on("createActor", async (actor, options, userId) => {
  if (userId !== game.user.id || !game.user.isGM) return;
  if (actor.type !== "personnage") return;
  try { await migrerCompetencesActeur(actor); }
  catch (e) { console.error(`CDT | Migration des compétences de ${actor.name} :`, e); }
});

export {
  CDT_CARACS,
  CDT_SOCLES,
  CDT_COMPETENCES_DATA,
  slugCompetence,
  cleSocle,
  libelleCompetence,
  regrouperCompetences,
  calculerDesCompetence,
  ajouterCompetencesParNoms,
  normaliserNomCompetence,
  itemsDepuisCompetencesLegacy,
  migrerCompetencesActeur,
};
