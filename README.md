<p align="center"><img src=".github/banner.png" alt="chants-de-tindalos" width="100%"></p>

# Les Chants de Tindalos — Système Foundry VTT

![Foundry v14](https://img.shields.io/badge/Foundry-v14-informational)
![Version](https://img.shields.io/badge/version-0.5-blue)
![Licence](https://img.shields.io/badge/licence-Walpurgis%20Éditions-red)

Système non officiel pour **Foundry VTT v14** adapté du jeu de rôle **Les Chants de Tindalos** de [Walpurgis Éditions](https://walpurgis.fr).

> Développé avec l'accord de Walpurgis Éditions dans le cadre du manuel complet.

---

## 📦 Contenu du système

### 🎲 Assistant de création de personnage
Un assistant guidé en **8 étapes** accessible via le bouton **🎲 Créer un personnage** dans le panneau Acteurs :

1. **Identité & Caractéristiques** — 12 points à répartir avec visualisation en temps réel
2. **Variables** — Réserve, Angoisse, Maîtrise, Intuition, Espoir (12 points)
3. **Profession** — 10 milieux → champs → métiers → 90 professions détaillées
4. **Milieu d'origine** — 10 origines sociales avec effets sur la richesse
5. **Expérience singulière** — 60 expériences filtrables par milieu
6. **Rituel de décompression & Déclencheur** — listes complètes du manuel
7. **Folie** — 0 ou 1 point avec effets automatiques
8. **Récapitulatif** — aperçu complet avant création de l'acteur

### 🎒 Compendiums
Sept compendiums issus du manuel complet :

| Compendium | Contenu |
|---|---|
| 📜 **Compétences** | 111 compétences (19 socles, spécialités) sous forme d'objets |
| ⚔️ **Armes** | 26 armes (distance et corps-à-corps) avec létalité, blessure, portée |
| 🚗 **Véhicules** | 13 véhicules avec Vitesse max, Accélération, Manœuvrabilité |
| 💊 **Substances** | Alcool, Cannabis, Cocaïne, Opiacés avec effets automatiques |
| 🎒 **Équipements** | 40 objets (tabac, photographie, bureau, outils, médical, accessoires, services) |
| 🔮 **Artefacts** | 4 artefacts |
| 📖 **Révélations** | 27 révélations |

Tous les items se glissent-déposent (**drag & drop**) directement sur la fiche personnage.

### Feuille de personnage joueur
- 5 **caractéristiques** (Savoir, Perception, Charisme, Agilité, Vigueur)
- **Compétences en objets** : glisser-déposer depuis le compendium, création de nouvelles compétences depuis la fiche, clic pour lancer les dés
- **Barre de Tension** et **Barre d'Onirisme** cliquables
- **Jauges** : Réserve, Tension, Angoisse, Blessures
- **Cases XP** Espoir et Folie avec montée automatique
- **7 onglets** : Principal, Compétences, Milieux, Combat, Inventaire, Avancé, Notes
- **Cartes PLP** enregistrées automatiquement sur la fiche après un jet de Maîtrise raté (encadré dédié, historique)
- **Texte agrandi** (18 px) sur les fiches de personnage et PNJ
- Onglet **Inventaire** : véhicules, substances et équipements en drag & drop

### Feuille PNJ
- Stats compactes avec possessions pictogrammes cliquables (toggle ON/OFF)
- Jet d'attaque intégré avec létalité dans le chat

### Jets de dés
- Jets de caractéristique, compétence, maîtrise, défensif, sommeil, arcanes
- Jet d'attaque avec létalité (CaC et Distance)
- Arrêt Cardiaque avec compteur de tours
- Dés bonus, dés MJ et dé d'Espoir (1d8 explosif)
- **Consommation de substances** avec jet d'intoxication automatique

### Automatisations
- Calcul automatique SD, Vitesse, Sommeil
- Montée automatique Folie et Espoir
- Gestion Dettes de Sommeil et malus SD
- Tables PLP (4 niveaux, 54 cartes) générées au lancement

### 🎨 Thèmes visuels
- **8 thèmes** au choix de chaque joueur pour sa fiche : Dossier d'enquête, Art Déco noir & or, Grimoire occulte, Carnet d'explorateur, Couverture pulp, Télégramme, Gazette d'Arkham, Tindalos (en plus du thème Classique)
- Appliqués aussi aux **fiches d'objets**, à la **fiche PNJ**, aux **cartes de chat** et aux **dialogues**
- Le **MJ choisit le thème des cartes de chat et dialogues** pour toute la table (ou « identique à chaque joueur »)

### 🕵️ Confidentialité
Le jet de Maîtrise, la carte PLP et les gains d'XP de Folie et d'Espoir ne sont visibles que par **le joueur concerné et le MJ**.

### Wiki intégré
- **Ouverture automatique** à chaque lancement du monde (désactivable par joueur)
- **Bouton 📖 Wiki** dans le panneau Acteurs
- 13 pages couvrant toutes les règles et la personnalisation, habillées en dossier d'enquête / Art Déco

### 🖼️ Scène d'accueil
Une scène « Les Chants de Tindalos — Accueil » (couverture du jeu) est créée et activée au premier lancement du monde par le MJ.

### Personnages prétirés
12 personnages issus du manuel complet (les 5 du kit de découverte sont importés automatiquement dans le dossier « 👥 Pré-tirés ») :

| Personnage | Profession | Points forts |
|---|---|---|
| **Nora Haddad** | Photographe d'Art | Perception 4, Art visuel |
| **Delphine Malesherbes** | Journalisme d'investigation | Savoir 3, Interrogatoire |
| **Archie Hunter** | Recherche d'épaves | Vigueur 3, Navigation |
| **Geneviève de Bouvines** | Pillage de tombes | Agilité 3, Explosifs |
| **Billy Hamlin** | Joueur de Poker | Agilité 4, Dissimulation |
| **Bertrand McIntyre** | Investigateur | Savoir 4, Maîtrise +2 |
| **Stepan Kovar** | Majordome médium | Intuition 4, Étiquette |
| **Marco Sachetto** | Psychiatre | Maîtrise +3, Médecine |
| **Grzegorz Komanczyk** | Détective privé | Vigueur 3, Filature |
| **Adam DeRouette** | Poète | Savoir 4, Charisme 4 |
| **Tomah Neptune** | Prestidigitateur | Charisme 3, Déguisement |
| **August Köhler** | Inventeur | Intuition 7, Sciences |

---

## 🚀 Installation

1. Dans Foundry VTT, va dans **Configuration → Systèmes de jeu**
2. Clique sur **Installer un système**
3. Colle l'URL du manifest :
   ```
   https://raw.githubusercontent.com/magisterphamtom/chants-de-tindalos/main/system.json
   ```
4. Clique **Installer**

### Installation manuelle
1. Télécharge le dépôt (bouton **Code → Download ZIP**)
2. Dézippe dans le dossier `Data/systems/` de Foundry
3. Renomme le dossier en `chants-de-tindalos`
4. Redémarre Foundry

---

## 📁 Structure du projet

```
chants-de-tindalos/
├── module/
│   ├── chants-de-tindalos.js     # Logique principale
│   ├── datamodels.js             # DataModels (PJ, PNJ, Arme, Véhicule, Substance, Équipement)
│   ├── creation-personnage.js    # Assistant de création
│   ├── items.js                  # Système d'items et compendiums
│   ├── competences.js            # Compétences (items), migration, compendium
│   ├── pretires.js               # Import automatique des prétirés
│   ├── themes.js                 # Thèmes de fiche, cartes de chat, dialogues
│   └── scene-accueil.js          # Scène d'accueil
├── css/
│   ├── chants-de-tindalos.css
│   ├── themes.css                # 8 thèmes
│   └── wiki.css                  # Habillage du wiki
├── system.json
├── template.json
├── templates/
│   └── actor/
│       ├── header.html
│       ├── feuille-pnj.html
│       ├── onglet-principal.html
│       ├── onglet-competences.html
│       ├── onglet-milieux.html
│       ├── onglet-combat.html
│       ├── onglet-inventaire.html
│       ├── onglet-avance.html
│       └── onglet-notes.html
│   └── item/
│       ├── feuille-arme.html
│       ├── feuille-vehicule.html
│       ├── feuille-substance.html
│       └── feuille-equipement.html
├── assets/                       # portraits, couverture, polices (OFL)
└── packs/
    ├── armes/
    ├── vehicules/
    ├── substances/
    └── equipements/
```

---

## ⚙️ Compatibilité

| Foundry VTT | Statut |
|---|---|
| v14 | ✅ Supporté |
| v13 | ❌ Non maintenu (voir versions 0.3.x) |
| v12 | ❌ Non testé |

---

## 📜 Licence et crédits

- **Jeu original** : Les Chants de Tindalos — [Walpurgis Éditions](https://walpurgis.fr)
- **Adaptation Foundry** : Développée avec l'accord de Walpurgis Éditions
- **Contenu** : Issu du manuel complet des Chants de Tindalos

> Ce système est une adaptation non commerciale des Chants de Tindalos, développée avec l'accord de Walpurgis Éditions. Tous les droits sur le jeu original appartiennent à Walpurgis Éditions.

---

## 🐛 Bugs et suggestions

Ouvre une [issue sur GitHub](../../issues) pour signaler un bug ou proposer une amélioration.
