# Les Chants de Tindalos — Système Foundry VTT

![Foundry v13](https://img.shields.io/badge/Foundry-v13-informational)
![Version](https://img.shields.io/badge/version-0.3-blue)
![Licence](https://img.shields.io/badge/licence-Walpurgis%20Éditions-red)

Système non officiel pour **Foundry VTT v13** adapté du jeu de rôle **Les Chants de Tindalos** de [Walpurgis Éditions](https://walpurgis.fr).

> Développé avec l'accord de Walpurgis Éditions dans le cadre du kit de découverte gratuit.

---

## 📦 Contenu du système

### Feuille de personnage joueur
- Saisie des 5 **caractéristiques** (Savoir, Perception, Charisme, Agilité, Vigueur)
- Gestion des **compétences socle et de spécialité** par milieu
- **Barre de Tension** cliquable (20 cases avec paliers colorés)
- **Barre d'Onirisme** cliquable
- **Jauges** : Réserve, Tension, Angoisse, Blessures
- **Cases XP** Espoir et Folie cliquables avec montée automatique
- Gestion des **milieux d'origine** avec jets dédiés
- Onglets : Principal, Compétences, Milieux, Combat, Avancé, Notes

### Feuille PNJ
- Stats compactes : Caractéristiques, Variables, Jauges
- **Possessions pictogrammes** cliquables (Téléphone, Arme, Vélo, Moto, Voiture, Camion, Bateau, Cheval, Chien)
- Section Arme avec jet d'attaque intégré
- Compétences clés en texte libre
- Jet de Maîtrise et SD calculé automatiquement

### Jets de dés
- **Jet de caractéristique** — dés d6, seuil de difficulté variable
- **Jet de compétence** — socle et spécialité avec dés de milieu bonus
- **Jet de Maîtrise** — 1d20 + Maîtrise vs Tension
- **Jet Défensif** — avec défense VIG
- **Jet de Sommeil** — résolution de nuit complète (Nuit Blanche / Atroce / Complète)
- **Jet d'Arcanes** — selon les points de Folie
- **Jet d'attaque** — CaC (VIG) ou Distance (AGI) avec létalité
- **Arrêt Cardiaque** — jets progressifs avec compteur de tours
- Support des **dés bonus** (coût Réserve), **dés MJ** et **dé d'Espoir** (1d8 explosif)

### Automatisations
- **Calcul automatique** du Seuil de Difficulté selon la Tension
- **Calcul automatique** de la Vitesse (AGI + VIG + 2)
- **Initiative automatique** dans le tracker de combat
- **Montée de Folie** automatique (8 XP = +1 Folie, -1 Maîtrise, +1 Intuition)
- **Montée d'Espoir** automatique (8 XP = +1 Espoir permanent)
- **Gestion des Dettes de Sommeil** avec malus SD automatique
- **Application des blessures** avec perte de Réserve et malus SD

### Tables PLP (Perte de Lucidité Progressive)
- 4 tables générées automatiquement au lancement (Niveaux 1 à 4)
- **19 cartes niveau 1**, 18 niveau 2, 10 niveau 3, 7 niveau 4
- Tirage automatique lors des échecs au Jet de Maîtrise
- Calcul automatique de la perte de Tension selon le niveau

### Wiki intégré
Journal de règles créé automatiquement au premier lancement, couvrant :
- Le système PLP
- Les caractéristiques et compétences
- Les milieux d'origine
- Les jets de dés et options
- La Tension et la Santé Mentale
- Le Combat
- Le Sommeil
- La Magie
- La création de personnage

### Personnages prétirés
4 personnages prêts à jouer issus du kit de découverte :

| Personnage | Profession | Spécialité |
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
   https://raw.githubusercontent.com/TON-PSEUDO/chants-de-tindalos/main/system.json
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
├── chants-de-tindalos.js     # Logique principale du système
├── chants-de-tindalos.css    # Styles des fiches
├── system.json               # Manifest Foundry
├── template.json             # Structure des données acteurs
├── templates/
│   └── actor/
│       ├── header.html
│       ├── feuille-pnj.html
│       ├── onglet-principal.html
│       ├── onglet-competences.html
│       ├── onglet-milieux.html
│       ├── onglet-combat.html
│       ├── onglet-avance.html
│       └── onglet-notes.html
├── assets/
│   └── portraits/
│       ├── nora_portrait.png
│       ├── delphine_portrait.png
│       ├── archie_portrait.png
│       └── genevieve_portrait.png
└── packs/
    ├── nora-haddad.json
    ├── delphine-malesherbes.json
    ├── archie-hunter.json
    └── genevieve-de-bouvines.json
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
- **Kit de découverte** : Contenu issu du kit gratuit officiel

> Ce système est une adaptation non commerciale du kit de découverte gratuit de Les Chants de Tindalos. Tous les droits sur le jeu original appartiennent à Walpurgis Éditions.

---

## 🐛 Bugs et suggestions

Ouvre une [issue sur GitHub](../../issues) pour signaler un bug ou proposer une amélioration.
