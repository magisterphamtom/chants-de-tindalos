# Les Chants de Tindalos — Foundry VTT System

![Foundry v14](https://img.shields.io/badge/Foundry-v14-informational)
![Version](https://img.shields.io/badge/version-0.4-blue)
![Licence](https://img.shields.io/badge/licence-Walpurgis%20Éditions-red)

Unofficial system for **Foundry VTT v14** adapted from the tabletop RPG **Les Chants de Tindalos** (*The Songs of Tindalos*) by [Walpurgis Éditions](https://walpurgis.fr).

> Developed with the agreement of Walpurgis Éditions based on the complete rulebook.

---

## 📦 System Contents

### 🎲 Character Creation Wizard
A guided **8-step wizard** accessible via the **🎲 Create a Character** button in the Actors panel:

1. **Identity & Characteristics** — 12 points with real-time Cost/Defense display
2. **Variables** — Reserve, Anguish, Mastery, Intuition, Hope (12 points)
3. **Profession** — 10 milieus → fields → trades → 90 detailed professions
4. **Background Milieu** — 10 social origins with wealth effects
5. **Singular Experience** — 60 experiences filterable by milieu
6. **Decompression Ritual & Trigger** — complete lists from the rulebook
7. **Madness** — 0 or 1 point with automatic effects
8. **Summary** — full recap before actor creation

### 🎒 Compendiums
Four compendiums from the complete rulebook:

| Compendium | Contents |
|---|---|
| ⚔️ **Weapons** | 26 weapons (ranged and melee) with lethality, wound, range |
| 🚗 **Vehicles** | 13 vehicles with Max Speed, Acceleration, Maneuverability |
| 💊 **Substances** | Alcohol, Cannabis, Cocaine, Opiates with automatic effects |
| 🎒 **Equipment** | 40 items (tobacco, photography, office, tools, medical, accessories, services) |

All items support **drag & drop** directly onto the character sheet.

### Player Character Sheet
- 5 **characteristics** (Knowledge, Perception, Charisma, Agility, Vigor)
- Clickable **socle and specialty skills** to roll dice
- Clickable **Tension bar** and **Oneirism bar**
- **Gauges**: Reserve, Tension, Anguish, Wounds
- **XP boxes** for Hope and Madness with automatic level-up
- **7 tabs**: Main, Skills, Milieus, Combat, Inventory, Advanced, Notes
- **Inventory tab**: vehicles, substances and equipment via drag & drop

### NPC Sheet
- Compact stats with clickable possession pictograms (ON/OFF toggle)
- Integrated attack roll with lethality in chat

### Dice Rolls
- Characteristic, skill, mastery, defensive, sleep, arcane rolls
- Attack roll with lethality (melee and ranged)
- Cardiac Arrest with turn counter
- Bonus dice, GM dice and Hope die (explosive 1d8)
- **Substance consumption** with automatic intoxication roll

### Automation
- Automatic SD, Speed, Sleep calculation
- Automatic Madness and Hope progression
- Sleep Debt management and SD penalty
- PLP tables (4 levels, 54 cards) generated at launch

### Built-in Wiki
- **Automatically opens** on each player's first login
- **📖 Wiki button** in the Actors panel
- 12 pages covering all rules

### Pre-generated Characters
12 ready-to-play characters from the complete rulebook:

| Character | Profession | Strengths |
|---|---|---|
| **Nora Haddad** | Art Photography | Perception 4, Visual Art |
| **Delphine Malesherbes** | Investigative Journalism | Knowledge 3, Interrogation |
| **Archie Hunter** | Wreck Salvage | Vigor 3, Navigation |
| **Geneviève de Bouvines** | Tomb Raiding | Agility 3, Explosives |
| **Billy Hamlin** | Poker Player | Agility 4, Deception |
| **Bertrand McIntyre** | Field Investigator | Knowledge 4, Mastery +2 |
| **Stepan Kovar** | Butler/Medium | Intuition 4, Etiquette |
| **Marco Sachetto** | Psychiatrist | Mastery +3, Medicine |
| **Grzegorz Komanczyk** | Private Detective | Vigor 3, Surveillance |
| **Adam DeRouette** | Poet | Knowledge 4, Charisma 4 |
| **Tomah Neptune** | Prestidigitator | Charisma 3, Disguise |
| **August Köhler** | Inventor | Intuition 7, Sciences |

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
1. Download the repository (**Code → Download ZIP**)
2. Extract into Foundry's `Data/systems/` folder
3. Rename the folder to `chants-de-tindalos`
4. Restart Foundry

---

## 📁 Project Structure

```
chants-de-tindalos/
├── module/
│   ├── chants-de-tindalos.js     # Main system logic
│   ├── datamodels.js             # DataModels (PC, NPC, Weapon, Vehicle, Substance, Equipment)
│   ├── creation-personnage.js    # Character creation wizard
│   └── items.js                  # Item system and compendiums
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

## ⚙️ Compatibility

| Foundry VTT | Status |
|---|---|
| v14 | ✅ Supported |
| v13 | ❌ No longer maintained (see 0.3.x releases) |
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
