# Journal des modifications

## 0.5.1

### Fiche PNJ
- La fiche PNJ **suit maintenant les 8 thèmes** (fond, chiffres, libellés, possessions, arme) et dispose du **sélecteur de thème**.
- **Cadenas 🔒/🔓** dans l'en-tête de la fenêtre (à côté des trois petits points), sur les fiches PJ et PNJ : une fois la fiche réglée, on la verrouille et plus rien ne se modifie par erreur (champs, cases, portrait, retrait d'objets) ; les jets restent possibles.

### Créatures
- Nouveau type d'acteur **Créature** (Bestiaire, p.397) avec sa fiche : caractéristiques 0–20, Sensibilité, Dés de Mort (+/−), vitesse, + Tension et + XP de Folie pour les joueurs, attaques en nombre libre avec jet d'attaque et de létalité, magie (dés d'arcanes, sorts). Cadenas et 8 thèmes comme les autres fiches. Nouvelle page de wiki « 14. Fiche Créature ».
- Caractéristiques PJ et PNJ libres de 0 à 20 (Coût et Défense restent calculés sur la table 1–5).

### Lisibilité des thèmes
- Contrôle de contraste de tous les textes dans les 9 styles : textes secondaires (aides, « glissez ici », C/D, /20, Dés d'Arcanes…) assombris ou éclaircis selon le thème, zone Notes et boutons lisibles partout.

## 0.5.0

### Compétences
- Les compétences deviennent des **objets** (type `competence`) : compendium de 111 compétences, glisser-déposer sur la fiche, création de nouvelles compétences depuis la fiche, migration automatique des anciennes fiches.

### Fiche de personnage
- **8 thèmes visuels** au choix de chaque joueur (sélecteur dans l'en-tête de la fiche), appliqués aussi à la fiche PNJ et aux fiches d'objets.
- Texte agrandi (18 px), onglets compris ; fenêtres élargies.
- Caractéristiques modifiables à la main (Coût et Défense recalculés).
- **Encadré « Cartes PLP »** : la carte tirée après un jet de Maîtrise raté s'enregistre automatiquement sur la fiche (historique de 10).

### Table et chat
- Le **MJ choisit le thème des cartes de chat et des dialogues** pour toute la table (ou celui de chaque joueur).
- **Confidentialité** : jet de Maîtrise, carte PLP et gains d'XP de Folie/Espoir visibles uniquement par le joueur concerné et le MJ.

### Wiki et accueil
- Wiki ouvert à chaque lancement, nouvel habillage (dossier d'enquête + bandeaux Art Déco), page Compétences réécrite, nouvelle page **13. Personnaliser la fiche et la table**.
- Prétirés du kit de découverte importés automatiquement (dossier « 👥 Pré-tirés »).
- **Scène d'accueil** créée et activée au premier lancement ; image d'accueil du système fixée dans `system.json`.
- 29 polices libres (OFL) embarquées.

## 0.4
- Version précédente (Foundry v14).
