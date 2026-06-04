# Les Chants de Tindalos — Système Foundry VTT

![Foundry v13](https://img.shields.io/badge/Foundry-v13-informational)
![Version](https://img.shields.io/badge/version-0.3-blue)
![Licence](https://img.shields.io/badge/licence-Walpurgis%20Éditions-red)

Système non officiel pour **Foundry VTT v13** adapté du jeu de rôle **Les Chants de Tindalos** de [Walpurgis Éditions](https://walpurgis.fr).

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
Quatre compendiums issus du manuel complet :

| Compendium | Contenu |
|---|---|
| ⚔️ **Armes** | 26 armes (distance et corps-à-corps) avec létalité, blessure, portée |
| 🚗 **Véhicules** | 13 véhicules avec Vitesse max, Accélération, Manœuvrabilité |
| 💊 **Substances** | Alcool, Cannabis, Cocaïne, Opiacés avec effets automatiques |
| 🎒 **Équipements** | 40 objets (tabac, photographie, bureau, outils, médical, accessoires, services) |

Tous les items se glissent-déposent (**drag & drop**) directement sur la fiche personnage.

### Feuille de personnage joueur
- 5 **caractéristiques** (Savoir, Perception, Charisme, Agilité, Vigueur)
- **Compétences socle et spécialité** cliquables pour lancer les dés
- **Barre de Tension** et **Barre d'Onirisme** cliquables
- **Jauges** : Réserve, Tension, Angoisse, Blessures
- **Cases XP** Espoir et Folie avec montée automatique
- **7 onglets** : Principal, Compétences, Milieux, Combat, Inventaire, Avancé, Notes
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

### Wiki intégré
- **Ouverture automatique** à la première connexion
- **Bouton 📖 Wiki** dans le panneau Acteurs
- 12 pages couvrant toutes les règles

### Personnages prétirés
4 personnages du kit de découverte inclus :

| Personnage | Profession | Points forts |
|---|---|---|
| **Nora Haddad** | Photographe d'Art | Perception 4, Art visuel |
| **Delphine Malesherbes** | Journalisme d'investigation | Savoir 3, Interrogatoire |
| **Archie Hunter** | Recherche d'épaves | Vigueur 4, Navigation |
| **Geneviève de Bouvines** | Pillage de tombes | Perception 3, Explosifs |

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
│   └── items.js                  # Système d'items et compendiums
├── css/
│   └── chants-de-tindalos.css
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
├── assets/portraits/
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
| v13 | ✅ Supporté |
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
