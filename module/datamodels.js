// ================================================
// DATAMODELS — Les Chants de Tindalos
// Foundry VTT v13
// ================================================

const { StringField, NumberField, BooleanField, SchemaField, ObjectField, ArrayField } = foundry.data.fields;

// ------------------------------------------------
// CHAMP UTILITAIRE : Caractéristique
// ------------------------------------------------
class CaracteristiqueField extends SchemaField {
  constructor(options = {}) {
    super({
      label:   new StringField({ initial: "" }),
      valeur:  new NumberField({ initial: 2, min: 1, max: 5, integer: true }),
      cout:    new NumberField({ initial: 3, integer: true }),
      defense: new NumberField({ initial: 1, integer: true }),
    }, options);
  }
}

class CaracteristiquePNJField extends SchemaField {
  constructor(options = {}) {
    super({
      label:  new StringField({ initial: "" }),
      valeur: new NumberField({ initial: 2, min: 1, max: 5, integer: true }),
    }, options);
  }
}

// ------------------------------------------------
// DATAMODEL : Personnage (PJ)
// ------------------------------------------------
class PersonnageDataModel extends foundry.abstract.TypeDataModel {

  static defineSchema() {
    return {
      identite: new SchemaField({
        profession:  new StringField({ initial: "" }),
        origine:     new StringField({ initial: "" }),
        experience:  new StringField({ initial: "" }),
        joueur:      new StringField({ initial: "" }),
        chant:       new StringField({ initial: "" }),
      }),

      caracteristiques: new SchemaField({
        savoir:     new CaracteristiqueField(),
        perception: new CaracteristiqueField(),
        charisme:   new CaracteristiqueField(),
        agilite:    new CaracteristiqueField(),
        vigueur:    new CaracteristiqueField(),
      }),

      variables: new SchemaField({
        maitrise:      new NumberField({ initial: -3, integer: true }),
        intuition:     new NumberField({ initial: -6, integer: true }),
        vitesse:       new NumberField({ initial: 6,  integer: true }),
        sommeil:       new NumberField({ initial: 2,  integer: true }),
        dettesSommeil: new NumberField({ initial: 0, min: 0, integer: true }),
      }),

      jauges: new SchemaField({
        reserve:  new SchemaField({
          valeur: new NumberField({ initial: 10, min: 0, integer: true }),
          max:    new NumberField({ initial: 20, min: 0, integer: true }),
        }),
        tension: new SchemaField({
          valeur: new NumberField({ initial: 0, min: 0, max: 20, integer: true }),
          max:    new NumberField({ initial: 20, integer: true }),
        }),
        angoisse: new SchemaField({
          valeur: new NumberField({ initial: 7, min: 0, integer: true }),
        }),
        espoir: new SchemaField({
          valeur: new NumberField({ initial: 0, min: 0, max: 8, integer: true }),
          max:    new NumberField({ initial: 8, integer: true }),
          xp:     new NumberField({ initial: 0, min: 0, integer: true }),
        }),
        folie: new SchemaField({
          valeur: new NumberField({ initial: 0, min: 0, max: 8, integer: true }),
          max:    new NumberField({ initial: 8, integer: true }),
          xp:     new NumberField({ initial: 0, min: 0, integer: true }),
        }),
        blessures: new StringField({ initial: "" }),
        onirisme: new SchemaField({
          valeur: new NumberField({ initial: 0, min: 0, max: 20, integer: true }),
          max:    new NumberField({ initial: 20, integer: true }),
        }),
      }),

      seuilDifficulte: new NumberField({ initial: 3, min: 2, max: 7, integer: true }),
      malusSD:         new NumberField({ initial: 0, min: 0, integer: true }),
      rangRichesse:    new NumberField({ initial: 0, integer: true }),

      revelations: new SchemaField({
        rev1: new SchemaField({ nom: new StringField({ initial: "" }), effet: new StringField({ initial: "" }), description: new StringField({ initial: "" }) }),
        rev2: new SchemaField({ nom: new StringField({ initial: "" }), effet: new StringField({ initial: "" }), description: new StringField({ initial: "" }) }),
        rev3: new SchemaField({ nom: new StringField({ initial: "" }), effet: new StringField({ initial: "" }), description: new StringField({ initial: "" }) }),
        rev4: new SchemaField({ nom: new StringField({ initial: "" }), effet: new StringField({ initial: "" }), description: new StringField({ initial: "" }) }),
        rev5: new SchemaField({ nom: new StringField({ initial: "" }), effet: new StringField({ initial: "" }), description: new StringField({ initial: "" }) }),
      }),
      niveauRevelation: new NumberField({ initial: 0, min: 0, integer: true }),

      arcanes: new SchemaField({
        arc1: new SchemaField({ ecole: new StringField({ initial: "" }), modif: new NumberField({ initial: 0, integer: true }) }),
        arc2: new SchemaField({ ecole: new StringField({ initial: "" }), modif: new NumberField({ initial: 0, integer: true }) }),
        arc3: new SchemaField({ ecole: new StringField({ initial: "" }), modif: new NumberField({ initial: 0, integer: true }) }),
      }),
      desArcanes: new StringField({ initial: "1d6" }),

      contacts: new SchemaField({
        milieu1: new SchemaField({
          milieu:       new StringField({ initial: "" }),
          contact1:     new StringField({ initial: "" }), contact1actif: new BooleanField({ initial: true }),
          contact2:     new StringField({ initial: "" }), contact2actif: new BooleanField({ initial: true }),
          contact3:     new StringField({ initial: "" }), contact3actif: new BooleanField({ initial: true }),
        }),
        milieu2: new SchemaField({
          milieu:       new StringField({ initial: "" }),
          contact1:     new StringField({ initial: "" }), contact1actif: new BooleanField({ initial: true }),
          contact2:     new StringField({ initial: "" }), contact2actif: new BooleanField({ initial: true }),
          contact3:     new StringField({ initial: "" }), contact3actif: new BooleanField({ initial: true }),
        }),
      }),

      possessions:         new StringField({ initial: "" }),
      declencheurs:        new StringField({ initial: "" }),
      rituelDecompression: new StringField({ initial: "" }),

      competences: new SchemaField({
        socle: new SchemaField({
          humanites:    new SchemaField({ label: new StringField({ initial: "Humanités" }),    valeur: new NumberField({ initial: 0, min: 0, integer: true }), caracLiee: new StringField({ initial: "savoir" }),     xp: new NumberField({ initial: 0, integer: true }) }),
          appreciation: new SchemaField({ label: new StringField({ initial: "Appréciation" }),valeur: new NumberField({ initial: 0, min: 0, integer: true }), caracLiee: new StringField({ initial: "perception" }), xp: new NumberField({ initial: 0, integer: true }) }),
          psychologie:  new SchemaField({ label: new StringField({ initial: "Psychologie" }),  valeur: new NumberField({ initial: 0, min: 0, integer: true }), caracLiee: new StringField({ initial: "perception" }), xp: new NumberField({ initial: 0, integer: true }) }),
          etiquette:    new SchemaField({ label: new StringField({ initial: "Étiquette" }),    valeur: new NumberField({ initial: 0, min: 0, integer: true }), caracLiee: new StringField({ initial: "charisme" }),   xp: new NumberField({ initial: 0, integer: true }) }),
          bricolage:    new SchemaField({ label: new StringField({ initial: "Bricolage" }),    valeur: new NumberField({ initial: 0, min: 0, integer: true }), caracLiee: new StringField({ initial: "agilite" }),    xp: new NumberField({ initial: 0, integer: true }) }),
          athletisme:   new SchemaField({ label: new StringField({ initial: "Athlétisme" }),   valeur: new NumberField({ initial: 0, min: 0, integer: true }), caracLiee: new StringField({ initial: "vigueur" }),    xp: new NumberField({ initial: 0, integer: true }) }),
        }),
        specialite: new SchemaField({
          histoiredelart:  new SchemaField({ label: new StringField({ initial: "Histoire de l'art" }),         valeur: new NumberField({ initial: 0, min: 0, integer: true }), caracLiee: new StringField({ initial: "savoir" }),     compSocle: new StringField({ initial: "humanites" }),    xp: new NumberField({ initial: 0, integer: true }) }),
          physimiechimie:  new SchemaField({ label: new StringField({ initial: "Physique-Chimie / Optique" }), valeur: new NumberField({ initial: 0, min: 0, integer: true }), caracLiee: new StringField({ initial: "savoir" }),     compSocle: new StringField({ initial: "humanites" }),    xp: new NumberField({ initial: 0, integer: true }) }),
          artvisuel:       new SchemaField({ label: new StringField({ initial: "Art visuel (Photographie)" }), valeur: new NumberField({ initial: 0, min: 0, integer: true }), caracLiee: new StringField({ initial: "perception" }), compSocle: new StringField({ initial: "appreciation" }), xp: new NumberField({ initial: 0, integer: true }) }),
          sensaiguise:     new SchemaField({ label: new StringField({ initial: "Sens aiguisé (Goût)" }),       valeur: new NumberField({ initial: 0, min: 0, integer: true }), caracLiee: new StringField({ initial: "perception" }), compSocle: new StringField({ initial: "appreciation" }), xp: new NumberField({ initial: 0, integer: true }) }),
          analysepostures: new SchemaField({ label: new StringField({ initial: "Analyse des postures" }),      valeur: new NumberField({ initial: 0, min: 0, integer: true }), caracLiee: new StringField({ initial: "perception" }), compSocle: new StringField({ initial: "psychologie" }),  xp: new NumberField({ initial: 0, integer: true }) }),
        }),
      }),

      milieux: new SchemaField({
        academie:  new NumberField({ initial: 0, min: 0, integer: true }),
        commerce:  new NumberField({ initial: 0, min: 0, integer: true }),
        culture:   new NumberField({ initial: 0, min: 0, integer: true }),
        itinerant: new NumberField({ initial: 0, min: 0, integer: true }),
        laborieux: new NumberField({ initial: 0, min: 0, integer: true }),
        louche:    new NumberField({ initial: 0, min: 0, integer: true }),
        occulte:   new NumberField({ initial: 0, min: 0, integer: true }),
        ordre:     new NumberField({ initial: 0, min: 0, integer: true }),
        politique: new NumberField({ initial: 0, min: 0, integer: true }),
        sante:     new NumberField({ initial: 0, min: 0, integer: true }),
      }),

      notes: new StringField({ initial: "" }),
    };
  }

  // Calculs dérivés automatiques
  prepareDerivedData() {
    const c = this.caracteristiques;
    const v = this.variables;
    // Vitesse = AGI + VIG + 2
    v.vitesse = (c.agilite?.valeur ?? 1) + (c.vigueur?.valeur ?? 1) + 2;
    // Sommeil = 12 - Angoisse
    v.sommeil = 12 - (this.jauges?.angoisse?.valeur ?? 10);
    // SD de base
    const tension = this.jauges?.tension?.valeur ?? 0;
    this.seuilDifficulte = Math.min(7, 3 + Math.floor(tension / 5) + (this.malusSD ?? 0));
  }
}

// ------------------------------------------------
// DATAMODEL : PNJ
// ------------------------------------------------
class PNJDataModel extends foundry.abstract.TypeDataModel {

  static defineSchema() {
    return {
      description:    new StringField({ initial: "" }),
      niveau:         new NumberField({ initial: 1, min: 1, max: 5, integer: true }),
      competencesCles: new StringField({ initial: "" }),

      caracteristiques: new SchemaField({
        savoir:     new CaracteristiquePNJField(),
        perception: new CaracteristiquePNJField(),
        charisme:   new CaracteristiquePNJField(),
        agilite:    new CaracteristiquePNJField(),
        vigueur:    new CaracteristiquePNJField(),
      }),

      variables: new SchemaField({
        maitrise: new NumberField({ initial: 0,  integer: true }),
        vitesse:  new NumberField({ initial: 6,  integer: true }),
        richesse: new NumberField({ initial: 0, min: 0, integer: true }),
      }),

      jauges: new SchemaField({
        reserve: new SchemaField({
          valeur: new NumberField({ initial: 10, min: 0, integer: true }),
          max:    new NumberField({ initial: 20, integer: true }),
        }),
        tension: new SchemaField({
          valeur: new NumberField({ initial: 0, min: 0, max: 20, integer: true }),
          max:    new NumberField({ initial: 20, integer: true }),
        }),
        blessures: new StringField({ initial: "" }),
      }),

      possessions: new SchemaField({
        telephone: new BooleanField({ initial: false }),
        arme:      new BooleanField({ initial: false }),
        velo:      new BooleanField({ initial: false }),
        moto:      new BooleanField({ initial: false }),
        voiture:   new BooleanField({ initial: false }),
        camion:    new BooleanField({ initial: false }),
        bateau:    new BooleanField({ initial: false }),
        cheval:    new BooleanField({ initial: false }),
        chien:     new BooleanField({ initial: false }),
      }),

      armes: new SchemaField({
        arme1: new SchemaField({
          nom:      new StringField({ initial: "" }),
          type:     new StringField({ initial: "corpsacorps" }),
          letalite: new NumberField({ initial: 18, integer: true }),
          blessure: new StringField({ initial: "Superficielle" }),
          portee:   new StringField({ initial: "CaC" }),
        }),
      }),

      pointsDeVie:      new NumberField({ initial: 4, min: 0, integer: true }),
      malusSD:          new NumberField({ initial: 0, min: 0, integer: true }),
      seuilDifficulte:  new NumberField({ initial: 3, min: 2, max: 7, integer: true }),
      notes:            new StringField({ initial: "" }),
    };
  }

  prepareDerivedData() {
    const c = this.caracteristiques;
    // Vitesse = AGI + VIG + 2
    this.variables.vitesse = (c.agilite?.valeur ?? 1) + (c.vigueur?.valeur ?? 1) + 2;
  }
}

// ------------------------------------------------
// DATAMODEL : Arme (Item)
// ------------------------------------------------
class ArmeDataModel extends foundry.abstract.TypeDataModel {

  static defineSchema() {
    return {
      categorie:       new StringField({ initial: "corpsacorps", choices: ["corpsacorps", "distance"] }),
      caracteristique: new StringField({ initial: "vigueur",     choices: ["vigueur", "agilite"] }),
      blessure:        new StringField({ initial: "Moderee",     choices: ["Superficielle", "Legere", "Moderee", "Serieuse"] }),
      letalite:        new NumberField({ initial: 18, min: 1, integer: true }),
      portee:          new StringField({ initial: "Contact",     choices: ["Contact", "Courte", "Longue"] }),
      chargeur:        new NumberField({ initial: 0,  min: 0, integer: true }),
      munitions:       new StringField({ initial: "" }),
      prix:            new StringField({ initial: "" }),
      special:         new StringField({ initial: "" }),
      description:     new StringField({ initial: "" }),
    };
  }
}

// ------------------------------------------------
// DATAMODEL : Équipement (Item)
// ------------------------------------------------
class EquipementDataModel extends foundry.abstract.TypeDataModel {

  static defineSchema() {
    return {
      categorie:   new StringField({ initial: "general" }),
      prix:        new StringField({ initial: "" }),
      poids:       new StringField({ initial: "" }),
      description: new StringField({ initial: "" }),
    };
  }
}

// ------------------------------------------------
// DATAMODEL : Véhicule (Item)
// ------------------------------------------------
class VehiculeDataModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      categorie:       new StringField({ initial: "terrestre", choices: ["terrestre", "aquatique", "aerien", "monture"] }),
      vitesseMax:      new NumberField({ initial: 5,  min: 0, integer: true }),
      acceleration:    new NumberField({ initial: 1,  min: 0, integer: true }),
      manoeuvrabilite: new NumberField({ initial: 0,  integer: true }),
      places:          new NumberField({ initial: 2,  min: 1, integer: true }),
      prix:            new StringField({ initial: "" }),
      competence:      new StringField({ initial: "automobile" }),
      special:         new StringField({ initial: "" }),
      description:     new StringField({ initial: "" }),
    };
  }
}

// ------------------------------------------------
// DATAMODEL : Substance (Item)
// ------------------------------------------------
class SubstanceDataModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      prix:             new StringField({ initial: "" }),
      duree:            new StringField({ initial: "1 heure par dose" }),
      seuilSurdose:     new NumberField({ initial: 3, min: 1, integer: true }),
      // Effet immédiat
      effetTension:     new NumberField({ initial: 0,  integer: true }),
      effetReserve:     new StringField({ initial: "" }),
      effetMaitrise:    new NumberField({ initial: 0,  integer: true }),
      effetSommeil:     new NumberField({ initial: 0,  integer: true }),
      effetSD:          new NumberField({ initial: 0,  integer: true }),
      effetSpecial:     new StringField({ initial: "" }),
      // Intoxication
      intoTension:      new NumberField({ initial: 0,  integer: true }),
      intoReserve:      new NumberField({ initial: 0,  integer: true }),
      intoMaitrise:     new NumberField({ initial: 0,  integer: true }),
      intoSD:           new NumberField({ initial: 0,  integer: true }),
      intoSpecial:      new StringField({ initial: "" }),
      // Descente
      descenteTension:  new NumberField({ initial: 0,  integer: true }),
      descenteReserve:  new NumberField({ initial: 0,  integer: true }),
      descenteSpecial:  new StringField({ initial: "" }),
      description:      new StringField({ initial: "" }),
    };
  }
}

// ------------------------------------------------
// DATAMODEL : Artefact (Item)
// ------------------------------------------------
class ArtefactDataModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      ecole:       new StringField({ initial: "vision",    choices: ["vision","aneantissement","envoutement","vitalisme","cosmos","songe"] }),
      modificateur: new NumberField({ initial: 1, integer: true }),
      declencheur: new StringField({ initial: "" }),
      effet:       new StringField({ initial: "" }),
      prix:        new StringField({ initial: "" }),
      description: new StringField({ initial: "" }),
    };
  }
}

// ------------------------------------------------
// DATAMODEL : Révélation (Item)
// ------------------------------------------------
class RevelationDataModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      categorie:   new StringField({ initial: "conviction_initiale", choices: ["conviction_initiale","conviction_superieure","objectif","etrangete","occulte_initiale","occulte_superieure"] }),
      contenu:     new StringField({ initial: "" }),
      effet:       new StringField({ initial: "" }),
      effetArcane: new StringField({ initial: "" }),
      entite:      new StringField({ initial: "" }),
      plpNom:      new StringField({ initial: "" }),
      plpNiveau:   new NumberField({ initial: 1, min: 1, max: 4, integer: true }),
      plpEffet:    new StringField({ initial: "" }),
      description: new StringField({ initial: "" }),
    };
  }
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------
export {
  PersonnageDataModel,
  PNJDataModel,
  ArmeDataModel,
  EquipementDataModel,
  VehiculeDataModel,
  SubstanceDataModel,
  ArtefactDataModel,
  RevelationDataModel,
};
