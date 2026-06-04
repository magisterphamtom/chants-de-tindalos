# Les Chants de Tindalos — Foundry VTT System

![Foundry v13](https://img.shields.io/badge/Foundry-v13-informational)
![Version](https://img.shields.io/badge/version-0.3-blue)
![Licence](https://img.shields.io/badge/licence-Walpurgis%20Éditions-red)

Unofficial system for **Foundry VTT v13** adapted from the tabletop RPG **Les Chants de Tindalos** (*The Songs of Tindalos*) by [Walpurgis Éditions](https://walpurgis.fr).

> Developed with the agreement of Walpurgis Éditions based on the complete rulebook.

---

## 📦 System Contents

### 🎲 Character Creation Wizard
A guided **8-step wizard** accessible via the **🎲 Create a Character** button in the Actors panel:

- **Step 1** — Identity & Characteristics (12 points, real-time Cost/Defense display)
- **Step 2** — Variables (Reserve, Anguish, Mastery, Intuition, Hope — 12 points)
- **Step 3** — Profession (10 milieus → fields → trades → 90 detailed professions)
- **Step 4** — Background Milieu (10 social origins with wealth effects)
- **Step 5** — Singular Experience (60 experiences filterable by milieu)
- **Step 6** — Decompression Ritual & Trigger (complete lists from the rulebook)
- **Step 7** — Madness (0 or 1 point with automatic effects)
- **Step 8** — Full summary before actor creation

### Player Character Sheet
- 5 **characteristics** (Knowledge, Perception, Charisma, Agility, Vigor)
- **Socle and Specialty skills** per milieu, all clickable to roll
- Clickable **Tension bar** (20 boxes with colored thresholds)
- Clickable **Oneirism bar**
- **Gauges**: Reserve, Tension, Anguish, Wounds
- Clickable **XP boxes** for Hope and Madness with automatic level-up
- **Milieu** management with dedicated rolls
- Tabs: Main, Skills, Milieus, Combat, Advanced, Notes

### NPC Sheet
- Compact stats: Characteristics, Variables, Gauges
- Clickable **possession pictograms** toggle ON/OFF (Phone, Weapon, Bike, Motorcycle, Car, Truck, Boat, Horse, Dog)
- Weapon section with integrated **Attack** button (roll + lethality in chat)
- Key skills as free text
- Mastery roll and SD calculated automatically

### Dice Rolls
- **Characteristic roll** — d6 pool, variable difficulty threshold
- **Skill roll** — socle and specialty with milieu bonus dice
- **Mastery roll** — 1d20 + Mastery vs Tension
- **Defensive roll** — Vigor dice against attacks
- **Sleep roll** — full night resolution (White Night / Atrocious / Complete)
- **Arcane roll** — based on Madness points
- **Attack roll** — Melee (VIG) or Ranged (AGI) with lethality
- **Cardiac Arrest** — progressive rolls with turn counter
- Support for **bonus dice** (Reserve cost), **GM dice** and **Hope die** (explosive 1d8)

### Automation
- **Automatic SD calculation** based on Tension
- **Automatic Speed** (AGI + VIG + 2)
- **Automatic initiative** in the combat tracker
- **Automatic Madness progression** (8 XP = +1 Madness, −1 Mastery, +1 Intuition)
- **Automatic Hope progression** (8 XP = +1 permanent Hope)
- **Sleep Debt management** with automatic SD penalty
- **Wound application** with Reserve loss and SD penalty

### PLP Tables (Losing the Plot)
- 4 tables auto-generated at launch (Levels 1 to 4)
- **19 level-1 cards**, 18 level-2, 10 level-3, 7 level-4
- Automatic draw on failed Mastery rolls
- Automatic Tension loss calculation by level

### Built-in Wiki
- **Automatically opens** on each player's first login
- **📖 System Wiki button** in the Actors panel for quick access at any time
- 12 pages covering all rules: characteristics, skills, milieus, dice rolls, tension, mental health, combat, sleep, magic, character creation

### Pre-generated Characters
4 ready-to-play characters from the rulebook:

| Character | Profession | Strengths |
|---|---|---|
| **Nora Haddad** | Art Photography | Perception 4, Visual Art |
| **Delphine Malesherbes** | Investigative Journalism | Knowledge 3, Interrogation |
| **Archie Hunter** | Wreck Salvage | Vigor 4, Navigation |
| **Geneviève de Bouvines** | Tomb Raiding | Perception 3, Explosives |

---

## 🚀 Installation

1. In Foundry VTT, go to **Configuration → Game Systems**
2. Click **Install System**
3. Paste the manifest URL:
   ```
   https://raw.githubusercontent.com/magisterphamtom/chants-de-tindalos/main/system.json
   ```
4. Click **Install**

### Manual Installation
1. Download the repository (button **Code → Download ZIP**)
2. Extract into Foundry's `Data/systems/` folder
3. Rename the folder to `chants-de-tindalos`
4. Restart Foundry

---

## 📁 Project Structure

```
chants-de-tindalos/
├── module/
│   ├── chants-de-tindalos.js     # Main system logic
│   └── creation-personnage.js    # Character creation wizard
├── css/
│   └── chants-de-tindalos.css    # Sheet styles
├── system.json                   # Foundry manifest
├── template.json                 # Actor data structure
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

## ⚙️ Compatibility

| Foundry VTT | Status |
|---|---|
| v13 | ✅ Supported |
| v12 | ❌ Not tested |

---

## 📜 License & Credits

- **Original game**: Les Chants de Tindalos — [Walpurgis Éditions](https://walpurgis.fr)
- **Foundry adaptation**: Developed with the agreement of Walpurgis Éditions
- **Content**: Based on the complete Les Chants de Tindalos rulebook

> This system is a non-commercial adaptation of Les Chants de Tindalos, developed with the agreement of Walpurgis Éditions. All rights to the original game belong to Walpurgis Éditions.

---

## 🐛 Bugs & Suggestions

Open an [issue on GitHub](../../issues) to report a bug or suggest an improvement.
