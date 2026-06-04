// ================================================
// ASSISTANT DE CRÉATION DE PERSONNAGE
// Les Chants de Tindalos — Foundry VTT
// ================================================

// ------------------------------------------------
// DONNÉES : PROFESSIONS
// ------------------------------------------------
const CDT_PROFESSIONS = {
  academie: {
    label: "Académie", icone: "🎓",
    socles: ["Sciences", "Humanités", "Recherche"],
    champs: {
      encadrement: {
        label: "Encadrement", socles: ["Technique et Industrie", "Autorité"],
        milieu: "ordre",
        metiers: {
          direction: {
            label: "Direction",
            milieu: "politique", richesse: 6,
            socles: ["Gestion", "Commander"],
            professions: {
              directeur_orphelinat: { label: "Directeur d'orphelinat", milieu: "occulte", specialites: ["Psychologie", "Gestion"], specialiteBonus: "Psychologie" },
              secretaire_direction: { label: "Secrétaire de direction", milieu: "academie", specialites: ["Bibliothèque", "Lecture"], specialiteBonus: "Bibliothèque" },
            }
          },
          surveillance: {
            label: "Surveillance",
            milieu: "ordre", richesse: 4,
            socles: ["Observer", "Écouter"],
            professions: {
              gardien: { label: "Gardien", milieu: "louche", specialites: ["Observer", "Écouter", "Réparation"], specialiteBonus: "Observer" },
              surveillant: { label: "Surveillant général", milieu: "ordre", specialites: ["Autorité", "Observer", "Commander"], specialiteBonus: "Autorité" },
            }
          },
          intendance: {
            label: "Intendance",
            milieu: "commerce", richesse: 5,
            socles: ["Gestion", "Estimation"],
            professions: {
              preparateur_labo: { label: "Préparateur de laboratoire", milieu: "sante", specialites: ["Physique-Chimie", "Explosifs", "Réparation"], specialiteBonus: "Physique-Chimie" },
              agent_entretien: { label: "Agent d'entretien", milieu: "laborieux", specialites: ["Réparation", "Gestion", "Estimation"], specialiteBonus: "Réparation" },
            }
          }
        }
      },
      enseignement: {
        label: "Enseignement", socles: ["Humanités", "Sciences"],
        milieu: "culture",
        metiers: {
          professeur_universite: {
            label: "Professeur d'Université",
            milieu: "academie", richesse: 7,
            socles: ["Bibliothèque", "Lecture"],
            professions: {
              professeur_histoire: { label: "Professeur d'histoire", milieu: "academie", specialites: ["Histoire", "Géographie", "Humanités"], specialiteBonus: "Histoire" },
              professeur_secondaire: { label: "Professeur du secondaire", milieu: "academie", specialites: ["Expliquer", "Lecture", "Étiquette"], specialiteBonus: "Expliquer" },
            }
          },
          primaire_secondaire: {
            label: "Primaire / Secondaire",
            milieu: "laborieux", richesse: 6,
            socles: ["Expliquer", "Lecture"],
            professions: {
              instituteur: { label: "Instituteur", milieu: "academie", specialites: ["Autorité", "Premiers soins", "Déchiffrer"], specialiteBonus: "Autorité" },
              professeur_maths: { label: "Professeur de mathématiques", milieu: "academie", specialites: ["Mathématiques", "Expliquer", "Lecture"], specialiteBonus: "Mathématiques" },
            }
          },
          independant: {
            label: "Indépendant",
            milieu: "academie", richesse: 6,
            socles: ["Éloquence", "Étiquette"],
            professions: {
              precepteur: { label: "Précepteur", milieu: "politique", specialites: ["Étiquette", "Humanités", "Langues"], specialiteBonus: "Étiquette" },
              conferencier: { label: "Conférencier", milieu: "politique", specialites: ["Éloquence", "Étiquette", "Histoire"], specialiteBonus: "Éloquence" },
            }
          }
        }
      },
      recherche: {
        label: "Recherche", socles: ["Recherche", "Humanités"],
        milieu: "academie",
        metiers: {
          conservateur: {
            label: "Conservateur",
            milieu: "culture", richesse: 6,
            socles: ["Bibliothèque", "Savoir"],
            professions: {
              archiviste: { label: "Archiviste", milieu: "academie", specialites: ["Fouiller", "Déchiffrer", "Lecture"], specialiteBonus: "Déchiffrer" },
              directeur_musee: { label: "Directeur de musée", milieu: "culture", specialites: ["Bibliothèque", "Estimation", "Lecture"], specialiteBonus: "Bibliothèque" },
            }
          },
          chercheur_theorique: {
            label: "Chercheur théorique",
            milieu: "academie", richesse: 5,
            socles: ["Sciences", "Savoir"],
            professions: {
              metaphysicien: { label: "Métaphysicien", milieu: "occulte", specialites: ["Philosophie", "Religion", "Langues"], specialiteBonus: "Philosophie" },
              astrophysicien: { label: "Astrophysicien", milieu: "academie", specialites: ["Mathématiques", "Physique-Chimie", "Philosophie"], specialiteBonus: "Mathématiques" },
            }
          },
          chercheur_terrain: {
            label: "Chercheur de terrain",
            milieu: "itinerant", richesse: 7,
            socles: ["Enquête", "Orientation"],
            professions: {
              archeologue: { label: "Archéologue", milieu: "culture", specialites: ["Histoire", "Fouiller", "Langues"], specialiteBonus: "Fouiller" },
              geologue: { label: "Géologue", milieu: "academie", specialites: ["Géologie", "Orientation", "Escalader"], specialiteBonus: "Géologie" },
            }
          }
        }
      }
    }
  },

  commerce: {
    label: "Commerce", icone: "⚖️",
    socles: ["Apparence", "Éloquence", "Évaluation"],
    champs: {
      consommation: {
        label: "Du quotidien", socles: ["Psychologie", "Éloquence"],
        milieu: "commerce",
        metiers: {
          services: {
            label: "Services",
            milieu: "commerce", richesse: 4,
            socles: ["Étiquette", "Empathie"],
            professions: {
              barbier: { label: "Barbier", milieu: "commerce", specialites: ["Arme blanche", "Langage corporel", "Art visuel"], specialiteBonus: "Langage corporel" },
              decorateur: { label: "Décorateur d'intérieur", milieu: "culture", specialites: ["Art visuel", "Étiquette", "Estimation"], specialiteBonus: "Art visuel" },
            }
          },
          specialise: {
            label: "Spécialisée",
            milieu: "commerce", richesse: 8,
            socles: ["Gestion", "Étiquette"],
            professions: {
              agent_immobilier: { label: "Agent immobilier", milieu: "commerce", specialites: ["Bâtiment", "Estimation", "Négocier"], specialiteBonus: "Négocier" },
              libraire: { label: "Libraire", milieu: "culture", specialites: ["Bibliothèque", "Estimation", "Négocier"], specialiteBonus: "Bibliothèque" },
            }
          },
          vendeur_sauvette: {
            label: "Vendeur à la sauvette",
            milieu: "louche", richesse: 2,
            socles: ["Séduction", "Mensonge"],
            professions: {
              epicier: { label: "Épicier", milieu: "laborieux", specialites: ["Gestion", "Négocier", "Estimation"], specialiteBonus: "Gestion" },
              boutiquier: { label: "Boutiquier", milieu: "commerce", specialites: ["Gestion", "Étiquette", "Négocier"], specialiteBonus: "Négocier" },
            }
          }
        }
      },
      production: {
        label: "Production et intermédiaires", socles: ["Technique et Industrie", "Éloquence"],
        milieu: "commerce",
        metiers: {
          negociants: {
            label: "Les Négociants",
            milieu: "commerce", richesse: 7,
            socles: ["Négocier", "Estimation"],
            professions: {
              commercial_pharma: { label: "Commercial pharmaceutique", milieu: "sante", specialites: ["Pharmacologie", "Physique-Chimie", "Éloquence"], specialiteBonus: "Éloquence" },
              grossiste: { label: "Grossiste", milieu: "commerce", specialites: ["Négocier", "Gestion", "Estimation"], specialiteBonus: "Négocier" },
            }
          },
          techniciens: {
            label: "Les Techniciens",
            milieu: "academie", richesse: 8,
            socles: ["Gestion", "Mathématiques"],
            professions: {
              ingenieur_centrale: { label: "Ingénieur centrale à charbon", milieu: "academie", specialites: ["Énergie", "Nouvelles technologies", "Physique-Chimie"], specialiteBonus: "Énergie" },
              logisticien: { label: "Logisticien", milieu: "commerce", specialites: ["Gestion", "Mathématiques", "Commander"], specialiteBonus: "Gestion" },
            }
          },
          administrateurs: {
            label: "Les Administrateurs",
            milieu: "ordre", richesse: 8,
            socles: ["Droit", "Gestion"],
            professions: {
              directeur_usine: { label: "Directeur d'usine de sodas", milieu: "commerce", specialites: ["Physique-Chimie", "Économie", "Commander"], specialiteBonus: "Commander" },
              expert_comptable: { label: "Expert-comptable", milieu: "commerce", specialites: ["Économie", "Mathématiques", "Droit"], specialiteBonus: "Économie" },
            }
          }
        }
      },
      services_commerciaux: {
        label: "Services commerciaux", socles: ["Technique et Industrie", "Psychologie"],
        milieu: "commerce",
        metiers: {
          banque: {
            label: "Banque et finances",
            milieu: "commerce", richesse: 9,
            socles: ["Économie", "Gestion"],
            professions: {
              negociateur_bourse: { label: "Négociateur en Bourse", milieu: "commerce", specialites: ["Mathématiques", "Négocier", "Interrogatoire"], specialiteBonus: "Négocier" },
              banquier: { label: "Banquier d'investissements", milieu: "commerce", specialites: ["Économie", "Étiquette", "Diplomatie"], specialiteBonus: "Économie" },
            }
          },
          publicite: {
            label: "Publicité",
            milieu: "culture", richesse: 5,
            socles: ["Art visuel", "Empathie"],
            professions: {
              dessinateur_pub: { label: "Dessinateur publicitaire", milieu: "culture", specialites: ["Art (Dessin)", "Langage corporel", "Interprétation des rêves"], specialiteBonus: "Art (Dessin)" },
              directeur_artistique: { label: "Directeur artistique", milieu: "culture", specialites: ["Art visuel", "Empathie", "Rédaction"], specialiteBonus: "Art visuel" },
            }
          },
          conseil: {
            label: "Conseil",
            milieu: "commerce", richesse: 8,
            socles: ["Étiquette", "Diplomatie"],
            professions: {
              gestionnaire_fortune: { label: "Gestionnaire de fortune", milieu: "politique", specialites: ["Économie", "Estimation", "Éloquence"], specialiteBonus: "Économie" },
              conseiller_strategique: { label: "Conseiller stratégique", milieu: "commerce", specialites: ["Diplomatie", "Négocier", "Étiquette"], specialiteBonus: "Diplomatie" },
            }
          }
        }
      }
    }
  },

  culture: {
    label: "Culture", icone: "🎭",
    socles: ["Humanités", "Évaluation", "Psychologie"],
    champs: {
      artistes: {
        label: "Artistes", socles: ["Humanités", "Évaluation"],
        milieu: "academie",
        metiers: {
          beaux_arts: {
            label: "Beaux-Arts",
            milieu: "academie", richesse: 5,
            socles: ["Art", "Art visuel"],
            professions: {
              peintre: { label: "Peintre", milieu: "academie", specialites: ["Observer", "Humanités", "Anatomie"], specialiteBonus: "Observer" },
              sculpteur: { label: "Sculpteur", milieu: "culture", specialites: ["Art", "Art visuel", "Histoire"], specialiteBonus: "Art" },
            }
          },
          arts_scene: {
            label: "Arts de la scène",
            milieu: "itinerant", richesse: 4,
            socles: ["Art de la scène", "Déguisement"],
            professions: {
              acrobate: { label: "Acrobate", milieu: "itinerant", specialites: ["Escalader", "Sauter", "Équilibre"], specialiteBonus: "Escalader" },
              musicien: { label: "Musicien", milieu: "culture", specialites: ["Art de la scène", "Art (Musique)", "Séduction"], specialiteBonus: "Art de la scène" },
            }
          },
          arts_recents: {
            label: "Arts récents et émergents",
            milieu: "academie", richesse: 3,
            socles: ["Nouvelles technologies", "Art visuel"],
            professions: {
              photographe: { label: "Photographe", milieu: "culture", specialites: ["Observer", "Art (Photographie)", "Physique-Chimie"], specialiteBonus: "Art (Photographie)" },
              realisateur: { label: "Réalisateur de films", milieu: "culture", specialites: ["Art visuel", "Nouvelles technologies", "Commander"], specialiteBonus: "Art visuel" },
            }
          }
        }
      },
      monde_ecrit: {
        label: "Monde écrit", socles: ["Humanités", "Recherche"],
        milieu: "academie",
        metiers: {
          journalisme: {
            label: "Journalisme écrit",
            milieu: "culture", richesse: 5,
            socles: ["Rédaction", "Écouter"],
            professions: {
              journaliste_investigation: { label: "Journaliste d'investigation", milieu: "louche", specialites: ["Interrogatoire", "Fouiller", "Filature"], specialiteBonus: "Interrogatoire" },
              critique_art: { label: "Critique d'art", milieu: "culture", specialites: ["Estimation", "Rédaction", "Histoire"], specialiteBonus: "Rédaction" },
            }
          },
          lettres: {
            label: "Lettres",
            milieu: "culture", richesse: 5,
            socles: ["Bibliothèque", "Rédaction"],
            professions: {
              poete: { label: "Poète", milieu: "occulte", specialites: ["Rédaction", "Séduction", "Interprétation des rêves"], specialiteBonus: "Rédaction" },
              traducteur: { label: "Traducteur", milieu: "academie", specialites: ["Langues", "Bibliothèque", "Déchiffrer"], specialiteBonus: "Langues" },
            }
          },
          monde_presse: {
            label: "Monde de la presse",
            milieu: "academie", richesse: 4,
            socles: ["Rédaction", "Lecture"],
            professions: {
              attache_presse: { label: "Attaché de presse", milieu: "politique", specialites: ["Éloquence", "Étiquette", "Histoire"], specialiteBonus: "Éloquence" },
              redacteur_chef: { label: "Rédacteur-en-chef", milieu: "culture", specialites: ["Rédaction", "Commander", "Étiquette"], specialiteBonus: "Rédaction" },
            }
          }
        }
      },
      autour_arts: {
        label: "Autour des arts", socles: ["Apparence", "Psychologie"],
        milieu: "commerce",
        metiers: {
          economie_arts: {
            label: "Économie des arts",
            milieu: "commerce", richesse: 9,
            socles: ["Art", "Estimation"],
            professions: {
              marchand_art: { label: "Marchand d'Art", milieu: "commerce", specialites: ["Négocier", "Observer", "Mensonge"], specialiteBonus: "Négocier" },
              mecene: { label: "Mécène", milieu: "culture", specialites: ["Estimation", "Étiquette", "Négocier"], specialiteBonus: "Estimation" },
            }
          },
          salons_galeries: {
            label: "Salons et Galeries",
            milieu: "culture", richesse: 3,
            socles: ["Étiquette", "Art"],
            professions: {
              pique_assiette: { label: "Pique-assiette", milieu: "culture", specialites: ["Séduction", "Imposture", "Vol à la tire"], specialiteBonus: "Séduction" },
              commissaire_expo: { label: "Commissaire d'exposition", milieu: "culture", specialites: ["Art", "Étiquette", "Histoire"], specialiteBonus: "Art" },
            }
          },
          sport_divertissement: {
            label: "Sport et Divertissement",
            milieu: "commerce", richesse: 4,
            socles: ["Athlétisme", "Premiers soins"],
            professions: {
              joueur_baseball: { label: "Joueur de baseball", milieu: "itinerant", specialites: ["Lancer", "Courir", "Arme blanche"], specialiteBonus: "Lancer" },
              forain: { label: "Forain", milieu: "itinerant", specialites: ["Art de la scène", "Séduction", "Courir"], specialiteBonus: "Art de la scène" },
            }
          }
        }
      }
    }
  },

  itinerant: {
    label: "Itinérant", icone: "🧭",
    socles: ["Survie", "Discrétion", "Bricolage"],
    champs: {
      routes: {
        label: "Sur les routes", socles: ["Bricolage", "Survie"],
        milieu: "itinerant",
        metiers: {
          marginaux: {
            label: "Marginaux",
            milieu: "itinerant", richesse: 1,
            socles: ["Orientation", "Agilité"],
            professions: {
              vagabond: { label: "Vagabond", milieu: "itinerant", specialites: ["Vol à la tire", "Réparation", "Survie"], specialiteBonus: "Survie" },
              travailleur_saisonnier: { label: "Travailleur saisonnier", milieu: "laborieux", specialites: ["Agriculture", "Courir", "Orientation"], specialiteBonus: "Agriculture" },
            }
          },
          services: {
            label: "Services",
            milieu: "commerce", richesse: 4,
            socles: ["Conduite", "Orientation"],
            professions: {
              serrurier: { label: "Serrurier à domicile", milieu: "laborieux", specialites: ["Crochetage", "Réparation", "Sabotage"], specialiteBonus: "Crochetage" },
              guide_trekking: { label: "Guide de trekking", milieu: "itinerant", specialites: ["Orientation", "Survie", "Premiers soins"], specialiteBonus: "Orientation" },
            }
          },
          vehicules_moteur: {
            label: "Véhicules à moteur",
            milieu: "itinerant", richesse: 3,
            socles: ["Conduite", "Réparation"],
            professions: {
              routier: { label: "Routier", milieu: "laborieux", specialites: ["Automobile", "Combat à mains nues", "Orientation"], specialiteBonus: "Automobile" },
              aviateur: { label: "Aviateur", milieu: "itinerant", specialites: ["Pilotage", "Orientation", "Réparation"], specialiteBonus: "Pilotage" },
            }
          }
        }
      },
      marins: {
        label: "Marins", socles: ["Bricolage", "Évaluation"],
        milieu: "ordre",
        metiers: {
          marine_marchande: {
            label: "Marine marchande",
            milieu: "commerce", richesse: 5,
            socles: ["Orientation", "Faire des nœuds"],
            professions: {
              capitaine_navire: { label: "Capitaine de navire", milieu: "ordre", specialites: ["Commander", "Navigation", "Vigueur"], specialiteBonus: "Commander" },
              matelot: { label: "Matelot", milieu: "itinerant", specialites: ["Faire des nœuds", "Nager", "Navigation"], specialiteBonus: "Navigation" },
            }
          },
          peche: {
            label: "Pêche et Industries marines",
            milieu: "laborieux", richesse: 3,
            socles: ["Pêche", "Faire des nœuds"],
            professions: {
              baleinier: { label: "Baleinier-dépeceur", milieu: "laborieux", specialites: ["Artisanat (Dépeçage)", "Arme blanche", "Athlétisme"], specialiteBonus: "Artisanat (Dépeçage)" },
              ostericulteur: { label: "Ostréiculteur", milieu: "laborieux", specialites: ["Pêche", "Estimation", "Faire des nœuds"], specialiteBonus: "Pêche" },
            }
          },
          tourisme_plaisance: {
            label: "Tourisme et Plaisance",
            milieu: "commerce", richesse: 6,
            socles: ["Navigation", "Orientation"],
            professions: {
              plongeur_scaphandrier: { label: "Plongeur-scaphandrier", milieu: "itinerant", specialites: ["Apnée", "Nager", "Observer"], specialiteBonus: "Nager" },
              skipper: { label: "Skipper", milieu: "itinerant", specialites: ["Navigation", "Orientation", "Faire des nœuds"], specialiteBonus: "Navigation" },
            }
          }
        }
      },
      chemins_de_fer: {
        label: "Chemins de fer", socles: ["Bricolage", "Conduite"],
        milieu: "laborieux",
        metiers: {
          exploitation: {
            label: "Exploitation et Technique",
            milieu: "itinerant", richesse: 5,
            socles: ["Technique et Industrie", "Réparation"],
            professions: {
              telegraphiste: { label: "Télégraphiste", milieu: "academie", specialites: ["Nouvelles technologies", "Langues (Morse)", "Déchiffrer"], specialiteBonus: "Nouvelles technologies" },
              cheminot: { label: "Cheminot", milieu: "itinerant", specialites: ["Pilotage (Trains)", "Observer", "Commander"], specialiteBonus: "Pilotage (Trains)" },
            }
          },
          services_clientele: {
            label: "Services clientèle",
            milieu: "commerce", richesse: 4,
            socles: ["Négocier", "Étiquette"],
            professions: {
              bagagiste: { label: "Bagagiste", milieu: "politique", specialites: ["Estimation", "Langage corporel", "Lancer"], specialiteBonus: "Langage corporel" },
              controleur: { label: "Contrôleur", milieu: "commerce", specialites: ["Étiquette", "Autorité", "Déchiffrer"], specialiteBonus: "Étiquette" },
            }
          },
          ouvriers_rail: {
            label: "Ouvriers",
            milieu: "laborieux", richesse: 4,
            socles: ["Réparation", "Sabotage"],
            professions: {
              aiguilleur: { label: "Aiguilleur", milieu: "itinerant", specialites: ["Observer", "Réparation", "Sabotage"], specialiteBonus: "Observer" },
              mecanicien: { label: "Mécanicien de train", milieu: "laborieux", specialites: ["Réparation", "Technique et Industrie", "Énergie"], specialiteBonus: "Réparation" },
            }
          }
        }
      }
    }
  },

  laborieux: {
    label: "Laborieux", icone: "⚙️",
    socles: ["Corps-à-corps", "Bricolage", "Athlétisme"],
    champs: {
      monde_ouvrier: {
        label: "Monde ouvrier", socles: ["Bricolage", "Athlétisme"],
        milieu: "laborieux",
        metiers: {
          non_qualifie: {
            label: "Non-qualifié",
            milieu: "laborieux", richesse: 2,
            socles: ["Courir", "Combat à mains nues"],
            professions: {
              mineur: { label: "Mineur de fond", milieu: "laborieux", specialites: ["Explosifs", "Réparation", "Escalader"], specialiteBonus: "Explosifs" },
              cireur: { label: "Cireur de chaussures", milieu: "laborieux", specialites: ["Courir", "Dissimulation", "Langage corporel"], specialiteBonus: "Courir" },
            }
          },
          specialise: {
            label: "Spécialisé",
            milieu: "laborieux", richesse: 5,
            socles: ["Artisanat", "Réparation"],
            professions: {
              typographe: { label: "Typographe spécialisé", milieu: "commerce", specialites: ["Déchiffrer", "Lecture", "Nouvelles technologies"], specialiteBonus: "Nouvelles technologies" },
              verrier: { label: "Verrier", milieu: "laborieux", specialites: ["Artisanat", "Réparation", "Estimation"], specialiteBonus: "Artisanat" },
            }
          },
          artisans: {
            label: "Artisans",
            milieu: "commerce", richesse: 5,
            socles: ["Artisanat", "Estimation"],
            professions: {
              luthier: { label: "Luthier", milieu: "culture", specialites: ["Réparation", "Écouter", "Art (Musique)"], specialiteBonus: "Art (Musique)" },
              charpentier: { label: "Charpentier", milieu: "laborieux", specialites: ["Artisanat", "Bâtiment", "Réparation"], specialiteBonus: "Bâtiment" },
            }
          }
        }
      },
      monde_agricole: {
        label: "Monde agricole", socles: ["Bricolage", "Conduite"],
        milieu: "laborieux",
        metiers: {
          manoeuvre: {
            label: "Manœuvre",
            milieu: "laborieux", richesse: 2,
            socles: ["Agriculture", "Lancer"],
            professions: {
              charretier: { label: "Charretier", milieu: "itinerant", specialites: ["Équitation", "Soins vétérinaires", "Orientation"], specialiteBonus: "Équitation" },
              maraicher: { label: "Maraîcher", milieu: "laborieux", specialites: ["Agriculture", "Négocier", "Estimation"], specialiteBonus: "Agriculture" },
            }
          },
          agriculture_specialisee: {
            label: "Agriculture spécialisée",
            milieu: "laborieux", richesse: 3,
            socles: ["Agriculture", "Sciences"],
            professions: {
              apiculteur: { label: "Apiculteur", milieu: "commerce", specialites: ["Observer", "Négocier", "Courir"], specialiteBonus: "Observer" },
              ingenieur_agronome: { label: "Ingénieur agronome", milieu: "academie", specialites: ["Agriculture", "Biologie", "Estimation"], specialiteBonus: "Agriculture" },
            }
          },
          elevage: {
            label: "Élevage",
            milieu: "laborieux", richesse: 2,
            socles: ["Agriculture", "Soins vétérinaires"],
            professions: {
              berger: { label: "Berger", milieu: "laborieux", specialites: ["Dressage", "Commander", "Pister"], specialiteBonus: "Dressage" },
              cowboy: { label: "Cow-boy", milieu: "itinerant", specialites: ["Équitation", "Dressage", "Lancer"], specialiteBonus: "Équitation" },
            }
          }
        }
      },
      employes: {
        label: "Employés", socles: ["Technique et Industrie", "Psychologie"],
        milieu: "commerce",
        metiers: {
          hotellerie: {
            label: "Hôtellerie et Restauration",
            milieu: "laborieux", richesse: 3,
            socles: ["Étiquette", "Dissimulation"],
            professions: {
              cuisinier: { label: "Cuisinier", milieu: "laborieux", specialites: ["Artisanat (Cuisine)", "Goûter", "Anatomie"], specialiteBonus: "Artisanat (Cuisine)" },
              serveur: { label: "Serveur", milieu: "laborieux", specialites: ["Étiquette", "Dissimulation", "Empathie"], specialiteBonus: "Empathie" },
            }
          },
          commerce_services: {
            label: "Commerce et services",
            milieu: "commerce", richesse: 5,
            socles: ["Courir", "Étiquette"],
            professions: {
              facteur: { label: "Facteur", milieu: "itinerant", specialites: ["Conduite", "Déchiffrer", "Géographie"], specialiteBonus: "Géographie" },
              commis: { label: "Commis de magasin", milieu: "commerce", specialites: ["Étiquette", "Estimation", "Courir"], specialiteBonus: "Étiquette" },
            }
          },
          metiers_techniques: {
            label: "Métiers techniques",
            milieu: "academie", richesse: 4,
            socles: ["Technique et Industrie", "Bibliothèque"],
            professions: {
              operateur_telephone: { label: "Opérateur de téléphone", milieu: "commerce", specialites: ["Nouvelles technologies", "Écouter", "Énergie"], specialiteBonus: "Écouter" },
              stenographe: { label: "Sténographe", milieu: "laborieux", specialites: ["Déchiffrer", "Écouter", "Rédaction"], specialiteBonus: "Déchiffrer" },
            }
          }
        }
      }
    }
  },

  louche: {
    label: "Louche", icone: "🎩",
    socles: ["Corps-à-corps", "Tir", "Athlétisme"],
    champs: {
      crime_organise: {
        label: "Crime Organisé", socles: ["Corps-à-corps", "Autorité"],
        milieu: "louche",
        metiers: {
          hommes_main: {
            label: "Hommes de main",
            milieu: "laborieux", richesse: 5,
            socles: ["Arme à feu", "Intimidation"],
            professions: {
              tueur_gages: { label: "Tueur à gages", milieu: "louche", specialites: ["Arme à feu", "Dissimulation", "Filature"], specialiteBonus: "Arme à feu" },
              garde_corps: { label: "Garde du corps", milieu: "louche", specialites: ["Intimidation", "Observer", "Courir"], specialiteBonus: "Intimidation" },
            }
          },
          officiers: {
            label: "Officiers",
            milieu: "politique", richesse: 6,
            socles: ["Commander", "Intimidation"],
            professions: {
              capo: { label: "Capo", milieu: "louche", specialites: ["Arme à feu", "Arme blanche", "Intimidation"], specialiteBonus: "Intimidation" },
              boss: { label: "Boss", milieu: "politique", specialites: ["Commander", "Intimidation", "Diplomatie"], specialiteBonus: "Commander" },
            }
          },
          alcool: {
            label: "Alcool",
            milieu: "commerce", richesse: 5,
            socles: ["Dissimulation", "Négocier"],
            professions: {
              bootlegger: { label: "Bootlegger", milieu: "itinerant", specialites: ["Automobile", "Réparation", "Contrefaçon"], specialiteBonus: "Automobile" },
              distillateur: { label: "Distillateur clandestin", milieu: "louche", specialites: ["Physique-Chimie", "Dissimulation", "Réparation"], specialiteBonus: "Physique-Chimie" },
            }
          }
        }
      },
      delinquance: {
        label: "Délinquance", socles: ["Corps-à-corps", "Discrétion"],
        milieu: "laborieux",
        metiers: {
          voyous: {
            label: "Voyous",
            milieu: "laborieux", richesse: 1,
            socles: ["Courir", "Intimidation"],
            professions: {
              petite_frappe: { label: "Petite frappe", milieu: "louche", specialites: ["Vol à la tire", "Combat à mains nues", "Arme blanche"], specialiteBonus: "Combat à mains nues" },
              racketteur: { label: "Racketteur", milieu: "louche", specialites: ["Intimidation", "Courir", "Mensonge"], specialiteBonus: "Intimidation" },
            }
          },
          cambrioleurs: {
            label: "Cambrioleurs",
            milieu: "louche", richesse: 4,
            socles: ["Dissimulation", "Crochetage"],
            professions: {
              pilleur_tombes: { label: "Pilleur de tombes", milieu: "louche", specialites: ["Estimation", "Folklore", "Fouiller"], specialiteBonus: "Fouiller" },
              monte_en_lair: { label: "Monte-en-l'air", milieu: "louche", specialites: ["Escalader", "Crochetage", "Dissimulation"], specialiteBonus: "Escalader" },
            }
          },
          escrocs: {
            label: "Escrocs",
            milieu: "commerce", richesse: 6,
            socles: ["Imposture", "Déguisement"],
            professions: {
              faux_monnayeur: { label: "Faux-monnayeur", milieu: "louche", specialites: ["Contrefaçon", "Estimation", "Dissimulation"], specialiteBonus: "Contrefaçon" },
              arnaqueur: { label: "Arnaqueur", milieu: "commerce", specialites: ["Mensonge", "Imposture", "Séduction"], specialiteBonus: "Mensonge" },
            }
          }
        }
      },
      milieu_interlope: {
        label: "Milieu interlope", socles: ["Discrétion", "Psychologie"],
        milieu: "louche",
        metiers: {
          monde_nuit: {
            label: "Monde de la nuit",
            milieu: "louche", richesse: 6,
            socles: ["Observer", "Arme blanche"],
            professions: {
              gerant_boite_nuit: { label: "Gérant de boîte de nuit", milieu: "commerce", specialites: ["Gestion", "Intimidation", "Diplomatie"], specialiteBonus: "Gestion" },
              souteneur: { label: "Souteneur", milieu: "louche", specialites: ["Intimidation", "Arme blanche", "Séduction"], specialiteBonus: "Intimidation" },
            }
          },
          substances: {
            label: "Substances",
            milieu: "louche", richesse: 5,
            socles: ["Pharmacologie", "Dissimulation"],
            professions: {
              chimiste_clandestin: { label: "Chimiste clandestin", milieu: "academie", specialites: ["Physique-Chimie", "Explosifs", "Énergie"], specialiteBonus: "Physique-Chimie" },
              dealer: { label: "Dealer de rue", milieu: "louche", specialites: ["Pharmacologie", "Dissimulation", "Courir"], specialiteBonus: "Dissimulation" },
            }
          },
          jeux_argent: {
            label: "Jeux d'argent",
            milieu: "commerce", richesse: 5,
            socles: ["Estimation", "Dissimulation"],
            professions: {
              joueur_poker: { label: "Joueur de poker", milieu: "commerce", specialites: ["Déguisement", "Mensonge", "Vol à la tire"], specialiteBonus: "Mensonge" },
              croupier: { label: "Croupier", milieu: "louche", specialites: ["Dissimulation", "Estimation", "Langage corporel"], specialiteBonus: "Dissimulation" },
            }
          }
        }
      }
    }
  },

  occulte: {
    label: "Occulte", icone: "👁️",
    socles: ["Survie", "Discrétion", "Enquête"],
    champs: {
      religion: {
        label: "Religion", socles: ["Humanités", "Autorité"],
        milieu: "occulte",
        metiers: {
          clerge: {
            label: "Clergé",
            milieu: "occulte", richesse: 3,
            socles: ["Religion", "Lecture"],
            professions: {
              exorciste: { label: "Exorciste catholique", milieu: "sante", specialites: ["Interrogatoire", "Folklore", "Commander"], specialiteBonus: "Commander" },
              pasteur: { label: "Pasteur baptiste", milieu: "occulte", specialites: ["Religion", "Prêcher", "Empathie"], specialiteBonus: "Prêcher" },
            }
          },
          civils: {
            label: "Civils",
            milieu: "occulte", richesse: 3,
            socles: ["Religion", "Expliquer"],
            professions: {
              predicateur: { label: "Prédicateur itinérant", milieu: "itinerant", specialites: ["Prêcher", "Hypnose", "Géographie"], specialiteBonus: "Prêcher" },
              catechiste: { label: "Professeur de catéchisme", milieu: "occulte", specialites: ["Religion", "Expliquer", "Déchiffrer"], specialiteBonus: "Religion" },
            }
          },
          theologiens: {
            label: "Théologiens",
            milieu: "academie", richesse: 3,
            socles: ["Religion", "Philosophie"],
            professions: {
              theologien_medieval: { label: "Théologien d'inspiration médiévale", milieu: "academie", specialites: ["Langues (Grec et Latin)", "Histoire", "Lecture"], specialiteBonus: "Histoire" },
              philosophe: { label: "Philosophe libéral", milieu: "academie", specialites: ["Philosophie", "Rédaction", "Expliquer"], specialiteBonus: "Philosophie" },
            }
          }
        }
      },
      esoterisme: {
        label: "Ésotérisme et Paranormal", socles: ["Humanités", "Enquête"],
        milieu: "louche",
        metiers: {
          croyants: {
            label: "Croyants",
            milieu: "occulte", richesse: 4,
            socles: ["Folklore", "Philosophie"],
            professions: {
              medium: { label: "Médium", milieu: "occulte", specialites: ["Langage corporel", "Interprétation des rêves", "Empathie"], specialiteBonus: "Interprétation des rêves" },
              cartomancien: { label: "Cartomancien", milieu: "occulte", specialites: ["Séduction", "Mensonge", "Folklore"], specialiteBonus: "Séduction" },
            }
          },
          sectes: {
            label: "Sectes",
            milieu: "louche", richesse: 5,
            socles: ["Folklore", "Séduction"],
            professions: {
              gourou: { label: "Gourou", milieu: "occulte", specialites: ["Commander", "Imposture", "Hypnose"], specialiteBonus: "Hypnose" },
              rabatteur: { label: "Rabatteur", milieu: "louche", specialites: ["Séduction", "Mensonge", "Empathie"], specialiteBonus: "Séduction" },
            }
          },
          sceptiques: {
            label: "Sceptiques",
            milieu: "academie", richesse: 6,
            socles: ["Humanités", "Sciences"],
            professions: {
              investigateur_terrain: { label: "Investigateur de terrain", milieu: "occulte", specialites: ["Fouiller", "Observer", "Expliquer"], specialiteBonus: "Fouiller" },
              demystificateur: { label: "Démystificateur", milieu: "academie", specialites: ["Observer", "Expliquer", "Rédaction"], specialiteBonus: "Expliquer" },
            }
          }
        }
      },
      erudition: {
        label: "Érudition", socles: ["Humanités", "Recherche"],
        milieu: "academie",
        metiers: {
          collectionneurs: {
            label: "Collectionneurs",
            milieu: "culture", richesse: 6,
            socles: ["Fouiller", "Négocier"],
            professions: {
              antiquaire: { label: "Antiquaire", milieu: "occulte", specialites: ["Histoire", "Folklore", "Estimation"], specialiteBonus: "Estimation" },
              collectionneur_macabre: { label: "Collectionneur macabre", milieu: "louche", specialites: ["Estimation", "Folklore", "Fouiller"], specialiteBonus: "Fouiller" },
            }
          },
          recherches_alternatives: {
            label: "Recherches alternatives",
            milieu: "academie", richesse: 4,
            socles: ["Folklore", "Pseudo-science"],
            professions: {
              cryptozoologue: { label: "Cryptozoologue", milieu: "sante", specialites: ["Braconnage", "Biologie", "Pister"], specialiteBonus: "Biologie" },
              alchimiste: { label: "Alchimiste", milieu: "occulte", specialites: ["Pseudo-science", "Physique-Chimie", "Folklore"], specialiteBonus: "Pseudo-science" },
            }
          },
          investigateurs_occultes: {
            label: "Investigateurs occultes",
            milieu: "itinerant", richesse: 4,
            socles: ["Folklore", "Géographie"],
            professions: {
              explorateur_hante: { label: "Explorateur de maisons hantées", milieu: "occulte", specialites: ["Bâtiment", "Fouiller", "Crochetage"], specialiteBonus: "Fouiller" },
              chasseur_fantomes: { label: "Chasseur de fantômes", milieu: "occulte", specialites: ["Observer", "Folklore", "Géographie"], specialiteBonus: "Observer" },
            }
          }
        }
      }
    }
  },

  ordre: {
    label: "Ordre", icone: "🔒",
    socles: ["Tir", "Enquête", "Autorité"],
    champs: {
      legal: {
        label: "Légal", socles: ["Humanités", "Éloquence"],
        milieu: "politique",
        metiers: {
          magistrats: {
            label: "Magistrats et avocats",
            milieu: "ordre", richesse: 8,
            socles: ["Droit", "Étiquette"],
            professions: {
              avocat_penaliste: { label: "Avocat pénaliste", milieu: "louche", specialites: ["Droit", "Criminologie", "Éloquence"], specialiteBonus: "Droit" },
              juge: { label: "Juge", milieu: "ordre", specialites: ["Droit", "Autorité", "Commander"], specialiteBonus: "Autorité" },
            }
          },
          auxiliaires_justice: {
            label: "Auxiliaires de justice",
            milieu: "commerce", richesse: 7,
            socles: ["Droit", "Bibliothèque"],
            professions: {
              huissier: { label: "Huissier", milieu: "ordre", specialites: ["Autorité", "Fouiller", "Estimation"], specialiteBonus: "Fouiller" },
              notaire: { label: "Notaire", milieu: "ordre", specialites: ["Droit", "Étiquette", "Bibliothèque"], specialiteBonus: "Droit" },
            }
          },
          metiers_paralegaux: {
            label: "Métiers paralégaux",
            milieu: "commerce", richesse: 6,
            socles: ["Droit", "Négocier"],
            professions: {
              mediateur: { label: "Médiateur de justice", milieu: "commerce", specialites: ["Diplomatie", "Empathie", "Expliquer"], specialiteBonus: "Diplomatie" },
              juriste: { label: "Juriste d'entreprise", milieu: "commerce", specialites: ["Droit", "Négocier", "Gestion"], specialiteBonus: "Droit" },
            }
          }
        }
      },
      securite_secours: {
        label: "Sécurité et secours", socles: ["Athlétisme", "Autorité"],
        milieu: "ordre",
        metiers: {
          maintien_ordre: {
            label: "Maintien de l'Ordre",
            milieu: "ordre", richesse: 5,
            socles: ["Commander", "Combat à mains nues"],
            professions: {
              policier: { label: "Policier", milieu: "louche", specialites: ["Observer", "Interrogatoire", "Arme à feu"], specialiteBonus: "Interrogatoire" },
              commissaire: { label: "Commissaire", milieu: "ordre", specialites: ["Interrogatoire", "Commander", "Criminologie"], specialiteBonus: "Commander" },
            }
          },
          sapeurs: {
            label: "Sapeurs et Sauveteurs",
            milieu: "sante", richesse: 6,
            socles: ["Escalader", "Premiers soins"],
            professions: {
              speleologue: { label: "Spéléologue secouriste", milieu: "itinerant", specialites: ["Géologie", "Faire des nœuds", "Orientation"], specialiteBonus: "Géologie" },
              pompier: { label: "Pompier", milieu: "ordre", specialites: ["Escalader", "Premiers soins", "Courir"], specialiteBonus: "Escalader" },
            }
          },
          enquete: {
            label: "Enquête",
            milieu: "louche", richesse: 5,
            socles: ["Fouiller", "Langage corporel"],
            professions: {
              detective: { label: "Détective privé", milieu: "louche", specialites: ["Déguisement", "Discrétion", "Agilité"], specialiteBonus: "Discrétion" },
              agent_boi: { label: "Agent du BOI", milieu: "ordre", specialites: ["Filature", "Criminologie", "Arme à feu"], specialiteBonus: "Filature" },
            }
          }
        }
      },
      armee: {
        label: "Armée", socles: ["Tir", "Vigueur"],
        milieu: "ordre",
        metiers: {
          combat: {
            label: "Combat",
            milieu: "itinerant", richesse: 5,
            socles: ["Arme à feu", "Arme blanche"],
            professions: {
              soldat_infanterie: { label: "Soldat d'infanterie", milieu: "laborieux", specialites: ["Courir", "Arme à feu", "Corps-à-corps"], specialiteBonus: "Arme à feu" },
              fusilier_marin: { label: "Fusilier marin", milieu: "itinerant", specialites: ["Nager", "Arme à feu", "Courir"], specialiteBonus: "Nager" },
            }
          },
          commandement: {
            label: "Commandement",
            milieu: "ordre", richesse: 7,
            socles: ["Commander", "Étiquette"],
            professions: {
              officier_marine: { label: "Officier de Marine", milieu: "itinerant", specialites: ["Navigation", "Orientation", "Nager"], specialiteBonus: "Navigation" },
              officier_aviation: { label: "Officier d'aviation", milieu: "itinerant", specialites: ["Pilotage", "Orientation", "Commander"], specialiteBonus: "Pilotage" },
            }
          },
          soutien: {
            label: "Soutien",
            milieu: "laborieux", richesse: 4,
            socles: ["Conduite", "Orientation"],
            professions: {
              maitre_chien: { label: "Maître-chien", milieu: "laborieux", specialites: ["Dressage (chiens)", "Commander", "Soins vétérinaires"], specialiteBonus: "Dressage (chiens)" },
              depineur: { label: "Démineur", milieu: "ordre", specialites: ["Explosifs", "Réparation", "Observer"], specialiteBonus: "Explosifs" },
            }
          }
        }
      }
    }
  },

  politique: {
    label: "Politique", icone: "🏛️",
    socles: ["Apparence", "Autorité", "Éloquence"],
    champs: {
      gotha: {
        label: "Gotha", socles: ["Apparence", "Conduite"],
        milieu: "commerce",
        metiers: {
          heritiers: {
            label: "Héritiers",
            milieu: "politique", richesse: 9,
            socles: ["Étiquette", "Séduction"],
            professions: {
              proprietaire_terrien: { label: "Propriétaire terrien", milieu: "politique", specialites: ["Bâtiment", "Gestion", "Agriculture"], specialiteBonus: "Gestion" },
              rentier: { label: "Rentier", milieu: "politique", specialites: ["Étiquette", "Séduction", "Estimation"], specialiteBonus: "Étiquette" },
            }
          },
          vedettes: {
            label: "Vedettes",
            milieu: "itinerant", richesse: 7,
            socles: ["Art de la scène", "Séduction"],
            professions: {
              canon_beaute: { label: "Canon de beauté", milieu: "culture", specialites: ["Séduction", "Étiquette", "Déguisement"], specialiteBonus: "Séduction" },
              champion_sportif: { label: "Champion sportif", milieu: "itinerant", specialites: ["Athlétisme", "Séduction", "Courir"], specialiteBonus: "Athlétisme" },
            }
          },
          barons_voleurs: {
            label: "Barons voleurs",
            milieu: "politique", richesse: 9,
            socles: ["Intimidation", "Économie"],
            professions: {
              magnat_rail: { label: "Magnat du rail", milieu: "commerce", specialites: ["Négocier", "Nouvelles technologies", "Gestion"], specialiteBonus: "Gestion" },
              magnat_petrole: { label: "Magnat du pétrole", milieu: "politique", specialites: ["Économie", "Intimidation", "Gestion"], specialiteBonus: "Économie" },
            }
          }
        }
      },
      affaires_publiques: {
        label: "Affaires Publiques", socles: ["Éloquence", "Humanités"],
        milieu: "politique",
        metiers: {
          politicien: {
            label: "Politicien",
            milieu: "politique", richesse: 6,
            socles: ["Mensonge", "Diplomatie"],
            professions: {
              elu_local: { label: "Élu local", milieu: "politique", specialites: ["Droit", "Négocier", "Commander"], specialiteBonus: "Commander" },
              diplomate: { label: "Diplomate", milieu: "politique", specialites: ["Diplomatie", "Langues", "Étiquette"], specialiteBonus: "Diplomatie" },
            }
          },
          administrateurs: {
            label: "Administrateurs",
            milieu: "laborieux", richesse: 4,
            socles: ["Droit", "Expliquer"],
            professions: {
              employe_mairie: { label: "Employé de mairie", milieu: "laborieux", specialites: ["Gestion", "Expliquer", "Déchiffrer"], specialiteBonus: "Gestion" },
              agent_recensement: { label: "Agent de recensement", milieu: "politique", specialites: ["Droit", "Géographie", "Déchiffrer"], specialiteBonus: "Déchiffrer" },
            }
          },
          metiers_ombre: {
            label: "Métiers de l'ombre",
            milieu: "politique", richesse: 6,
            socles: ["Négocier", "Diplomatie"],
            professions: {
              conseiller: { label: "Conseiller", milieu: "politique", specialites: ["Humanités", "Langage corporel", "Expliquer"], specialiteBonus: "Langage corporel" },
              organisateur: { label: "Organisateur de meeting", milieu: "politique", specialites: ["Commander", "Étiquette", "Rédaction"], specialiteBonus: "Commander" },
            }
          }
        }
      },
      militantisme: {
        label: "Militantisme", socles: ["Éloquence", "Psychologie"],
        milieu: "politique",
        metiers: {
          droits_civiques: {
            label: "Droits civiques",
            milieu: "politique", richesse: 5,
            socles: ["Droit", "Empathie"],
            professions: {
              suffragette: { label: "Suffragette", milieu: "politique", specialites: ["Expliquer", "Histoire", "Prêcher"], specialiteBonus: "Prêcher" },
              militant_antiraciste: { label: "Militant antiraciste", milieu: "politique", specialites: ["Droit", "Prêcher", "Empathie"], specialiteBonus: "Prêcher" },
            }
          },
          causes_syndicales: {
            label: "Causes politiques et syndicales",
            milieu: "laborieux", richesse: 2,
            socles: ["Intimidation", "Prêcher"],
            professions: {
              anarchiste: { label: "Anarchiste révolutionnaire", milieu: "laborieux", specialites: ["Explosifs", "Sabotage", "Arme à feu"], specialiteBonus: "Sabotage" },
              syndicaliste: { label: "Militant syndical", milieu: "politique", specialites: ["Intimidation", "Prêcher", "Expliquer"], specialiteBonus: "Prêcher" },
            }
          },
          militantisme_caritatif: {
            label: "Militantisme associatif et caritatif",
            milieu: "politique", richesse: 5,
            socles: ["Empathie", "Prêcher"],
            professions: {
              dame_patronnesse: { label: "Dame patronnesse", milieu: "sante", specialites: ["Langage corporel", "Expliquer", "Étiquette"], specialiteBonus: "Empathie" },
              armee_salut: { label: "Membre de l'Armée du Salut", milieu: "occulte", specialites: ["Religion", "Prêcher", "Réconforter"], specialiteBonus: "Prêcher" },
            }
          }
        }
      }
    }
  },

  sante: {
    label: "Santé", icone: "✚",
    socles: ["Sciences", "Recherche", "Psychologie"],
    champs: {
      medical: {
        label: "Médical", socles: ["Médecine", "Soins"],
        milieu: "sante",
        metiers: {
          medecine_corps: {
            label: "Médecine du corps",
            milieu: "academie", richesse: 8,
            socles: ["Anatomie", "Biologie"],
            professions: {
              generaliste: { label: "Médecin généraliste", milieu: "sante", specialites: ["Pharmacologie", "Médecine", "Autorité"], specialiteBonus: "Médecine" },
              medecin_legiste: { label: "Médecin légiste", milieu: "ordre", specialites: ["Médecine légale", "Criminologie", "Sciences forensiques"], specialiteBonus: "Médecine légale" },
            }
          },
          medecine_esprit: {
            label: "Médecine de l'esprit",
            milieu: "academie", richesse: 8,
            socles: ["Neurologie", "Psychiatrie"],
            professions: {
              psychiatre: { label: "Psychiatre", milieu: "sante", specialites: ["Psychiatrie", "Pharmacologie", "Psychologie"], specialiteBonus: "Psychiatrie" },
              psychanalyste: { label: "Psychanalyste", milieu: "academie", specialites: ["Psychiatrie", "Interprétation des rêves", "Empathie"], specialiteBonus: "Interprétation des rêves" },
            }
          },
          autres_medecins: {
            label: "Autres médecins",
            milieu: "sante", richesse: 8,
            socles: ["Anatomie", "Médecine"],
            professions: {
              anesthesiste: { label: "Anesthésiste", milieu: "academie", specialites: ["Pharmacologie", "Médecine", "Premiers soins"], specialiteBonus: "Pharmacologie" },
              chirurgien: { label: "Chirurgien", milieu: "sante", specialites: ["Anatomie", "Médecine", "Premiers soins"], specialiteBonus: "Anatomie" },
            }
          }
        }
      },
      services_sante: {
        label: "Services de Santé", socles: ["Apparence", "Psychologie"],
        milieu: "commerce",
        metiers: {
          medicaments: {
            label: "Médicaments",
            milieu: "commerce", richesse: 8,
            socles: ["Pharmacologie", "Négocier"],
            professions: {
              pharmacien: { label: "Pharmacien", milieu: "commerce", specialites: ["Pharmacologie", "Gestion", "Physique-Chimie"], specialiteBonus: "Pharmacologie" },
              trafiquant: { label: "Trafiquant de médicaments", milieu: "louche", specialites: ["Pharmacologie", "Dissimulation", "Négocier"], specialiteBonus: "Dissimulation" },
            }
          },
          services_psy: {
            label: "Services",
            milieu: "laborieux", richesse: 3,
            socles: ["Psychologie", "Éloquence"],
            professions: {
              praticien_avortement: { label: "Praticien d'avortement", milieu: "louche", specialites: ["Chirurgie", "Anatomie", "Dissimulation"], specialiteBonus: "Dissimulation" },
              psychologue: { label: "Psychologue", milieu: "sante", specialites: ["Empathie", "Réconforter", "Langage corporel"], specialiteBonus: "Empathie" },
            }
          },
          medecines_alternatives: {
            label: "Médecines Alternatives",
            milieu: "occulte", richesse: 3,
            socles: ["Pseudo-science", "Imposture"],
            professions: {
              magnetiseur: { label: "Magnétiseur", milieu: "occulte", specialites: ["Mensonge", "Langage corporel", "Réconforter"], specialiteBonus: "Mensonge" },
              homeopathe: { label: "Homéopathe", milieu: "sante", specialites: ["Pharmacologie", "Pseudo-science", "Empathie"], specialiteBonus: "Pseudo-science" },
            }
          }
        }
      },
      paramedical: {
        label: "Paramédical", socles: ["Soins", "Bricolage"],
        milieu: "laborieux",
        metiers: {
          technicien: {
            label: "Technicien",
            milieu: "academie", richesse: 7,
            socles: ["Sciences", "Technique et Industrie"],
            professions: {
              opticien: { label: "Opticien", milieu: "commerce", specialites: ["Physique-Chimie", "Artisanat (Optique)", "Réparation"], specialiteBonus: "Artisanat (Optique)" },
              laborantin: { label: "Laborantin", milieu: "academie", specialites: ["Physique-Chimie", "Biologie", "Observer"], specialiteBonus: "Biologie" },
            }
          },
          infirmerie: {
            label: "Infirmerie",
            milieu: "commerce", richesse: 5,
            socles: ["Premiers soins", "Réconforter"],
            professions: {
              infirmier_psychiatrie: { label: "Infirmier en psychiatrie", milieu: "sante", specialites: ["Psychiatrie", "Combat à mains nues", "Faire des nœuds"], specialiteBonus: "Psychiatrie" },
              sage_femme: { label: "Sage-femme", milieu: "sante", specialites: ["Premiers soins", "Anatomie", "Réconforter"], specialiteBonus: "Premiers soins" },
            }
          },
          hospitaliers: {
            label: "Hospitaliers",
            milieu: "itinerant", richesse: 4,
            socles: ["Premiers soins", "Langage corporel"],
            professions: {
              ambulancier: { label: "Ambulancier", milieu: "sante", specialites: ["Automobile", "Orientation", "Anatomie"], specialiteBonus: "Premiers soins" },
              aide_soignant: { label: "Aide-soignant", milieu: "laborieux", specialites: ["Premiers soins", "Réconforter", "Empathie"], specialiteBonus: "Réconforter" },
            }
          }
        }
      }
    }
  }
};

// ------------------------------------------------
// DONNÉES : MILIEUX D'ORIGINE
// ------------------------------------------------
const CDT_MILIEUX_ORIGINE = {
  academie:  { label: "Académie",  icone: "🎓", description: "Vous avez grandi dans un environnement savant.", richesse: 0 },
  commerce:  { label: "Commerce",  icone: "⚖️", description: "Les transactions d'argent ont été au cœur de vos jeunes années.", richesse: 0 },
  culture:   { label: "Culture",   icone: "🎭", description: "Vous avez grandi dans un milieu plus cultivé que la moyenne.", richesse: 0 },
  itinerant: { label: "Itinérant", icone: "🧭", description: "Vous avez été par monts et par vaux dans votre jeunesse.", richesse: 0 },
  laborieux: { label: "Laborieux", icone: "⚙️", description: "Vous avez vraisemblablement vécu une enfance difficile.", richesse: -1 },
  louche:    { label: "Louche",    icone: "🎩", description: "Vous avez vécu au contact des marginaux ou des déshérités.", richesse: 0 },
  occulte:   { label: "Occulte",   icone: "👁️", description: "Vous avez reçu une éducation fortement religieuse ou ésotérique.", richesse: 0 },
  ordre:     { label: "Ordre",     icone: "🔒", description: "Le maintien de l'ordre était sans cesse présent dans votre jeunesse.", richesse: 0 },
  politique: { label: "Politique", icone: "🏛️", description: "Vous venez de la haute société.", richesse: 1 },
  sante:     { label: "Santé",     icone: "✚", description: "Vous avez grandi au contact du milieu médical.", richesse: 0 },
};

// ------------------------------------------------
// DONNÉES : EXPÉRIENCES SINGULIÈRES
// ------------------------------------------------
const CDT_EXPERIENCES = [
  { id: "tete_classe",        milieu: "academie",  label: "Tête de classe",          spec1: "Bibliothèque (SAV)",        spec2: "Lecture (SAV)",                  special: "" },
  { id: "fraternite",         milieu: "academie",  label: "Membre d'une fraternité",  spec1: "Étiquette (CHA)",           spec2: "Athlétisme (VIG)",               special: "" },
  { id: "plagiat",            milieu: "academie",  label: "Plagiat",                  spec1: "Imposture (CHA)",           spec2: "Contrefaçon (AGI)",              special: "" },
  { id: "recherches_perso",   milieu: "academie",  label: "Recherches personnelles",  spec1: "Bibliothèque (SAV)",        spec2: "Déchiffrer (PER)",               special: "" },
  { id: "exclusion_scolaire", milieu: "academie",  label: "Exclusion scolaire",       spec1: "Mensonge (CHA)",            spec2: "Escalader (VIG)",                special: "" },
  { id: "enseignement_alt",   milieu: "academie",  label: "Enseignement alternatif",  spec1: "Empathie (PER)",            spec2: "Pseudo-science (SAV)",           special: "" },
  { id: "boursicoteur",       milieu: "commerce",  label: "Boursicoteur",             spec1: "Économie (SAV)",            spec2: "Mathématiques (SAV)",            special: "" },
  { id: "self_made_man",      milieu: "commerce",  label: "Self-Made Man",            spec1: "Gestion (SAV)",             spec2: "Négocier (CHA)",                 special: "" },
  { id: "bateau_plaisance",   milieu: "commerce",  label: "Bateau de plaisance",      spec1: "Navigation (AGI)",          spec2: "Faire des nœuds (AGI)",          special: "" },
  { id: "heritage",           milieu: "commerce",  label: "Héritage",                 spec1: "Étiquette (CHA)",           spec2: "Conduite (AGI)",                 special: "" },
  { id: "as_volant",          milieu: "commerce",  label: "As du volant",             spec1: "Automobile (AGI)",          spec2: "Réparation (AGI)",               special: "" },
  { id: "surendettement",     milieu: "commerce",  label: "Surendettement",           spec1: "Négocier (CHA)",            spec2: "Estimation (PER)",               special: "Richesse -1" },
  { id: "artiste_rate",       milieu: "culture",   label: "Artiste raté",             spec1: "Imposture (CHA)",           spec2: "Art (SAV)",                      special: "" },
  { id: "vernissage",         milieu: "culture",   label: "Coureur de Vernissage",    spec1: "Estimation (PER)",          spec2: "Étiquette (CHA)",                special: "" },
  { id: "collectionneur",     milieu: "culture",   label: "Collectionneur",           spec1: "Estimation (PER)",          spec2: "Négocier (CHA)",                 special: "" },
  { id: "figurant",           milieu: "culture",   label: "Figurant occasionnel",     spec1: "Art de la scène (CHA)",     spec2: "Langage corporel (PER)",         special: "" },
  { id: "dancings",           milieu: "culture",   label: "Habitué des Dancings",     spec1: "Art de la scène (CHA)",     spec2: "Séduction (CHA)",                special: "" },
  { id: "source_presse",      milieu: "culture",   label: "Source pour la presse",    spec1: "Dissimulation (AGI)",       spec2: "Expliquer (CHA)",                special: "" },
  { id: "voyage_initiatique", milieu: "itinerant", label: "Voyage Initiatique",       spec1: "Langues (SAV)",             spec2: "Folklore (SAV)",                 special: "" },
  { id: "chasse_bison",       milieu: "itinerant", label: "Chasse au bison",          spec1: "Arme à feu (AGI)",          spec2: "Braconnage (VIG)",               special: "Né avant 1870" },
  { id: "ruee_or",            milieu: "itinerant", label: "Ruée vers l'or",           spec1: "Estimation (PER)",          spec2: "Géologie (SAV)",                 special: "" },
  { id: "vagabondage",        milieu: "itinerant", label: "Vagabondage",              spec1: "Vol à la tire (AGI)",       spec2: "Dissimulation (AGI)",            special: "" },
  { id: "naufrage",           milieu: "itinerant", label: "Naufrage",                 spec1: "Pêche (VIG)",               spec2: "Navigation (AGI)",               special: "" },
  { id: "immigrant",          milieu: "itinerant", label: "Immigrant 1ère génération",spec1: "Langues (SAV)",             spec2: "Diplomatie (CHA)",               special: "" },
  { id: "chomage",            milieu: "laborieux", label: "Chômage longue durée",     spec1: "Gestion (SAV)",             spec2: "Athlétisme (VIG)",               special: "" },
  { id: "garcon_ferme",       milieu: "laborieux", label: "Garçon/Fille de ferme",    spec1: "Agriculture (SAV)",         spec2: "Soins vétérinaires (AGI)",       special: "" },
  { id: "longue_greve",       milieu: "laborieux", label: "Longue grève",             spec1: "Intimidation (CHA)",        spec2: "Sabotage (AGI)",                 special: "" },
  { id: "travail_infantile",  milieu: "laborieux", label: "Travail infantile",        spec1: "Bricolage (AGI)",           spec2: "Courir (VIG)",                   special: "" },
  { id: "accident_travail",   milieu: "laborieux", label: "Accident du travail",      spec1: "Anatomie (SAV)",            spec2: "Droit (SAV)",                    special: "" },
  { id: "mis_a_la_rue",       milieu: "laborieux", label: "Mis à la rue",             spec1: "Réconforter (CHA)",         spec2: "Discrétion (AGI)",               special: "Richesse -1" },
  { id: "toxicomanie",        milieu: "louche",    label: "Toxicomanie",              spec1: "Dissimulation (AGI)",       spec2: "Combat à mains nues (VIG)",      special: "Réserve max -1" },
  { id: "recherche_police",   milieu: "louche",    label: "Recherché par la police",  spec1: "Dissimulation (AGI)",       spec2: "Déguisement (CHA)",              special: "Angoisse +1" },
  { id: "fetard",             milieu: "louche",    label: "Fêtard",                   spec1: "Art de la scène (CHA)",     spec2: "Séduction (CHA)",                special: "Richesse +1" },
  { id: "adultere",           milieu: "louche",    label: "Adultère",                 spec1: "Séduction (CHA)",           spec2: "Dissimulation (AGI)",            special: "Angoisse +1" },
  { id: "tenu_pègre",         milieu: "louche",    label: "Tenu par la pègre",        spec1: "Mensonge (CHA)",            spec2: "Criminologie (SAV)",             special: "" },
  { id: "mauvaises_freq",     milieu: "louche",    label: "Mauvaises fréquentations", spec1: "Corps-à-corps (VIG)",       spec2: "Vol à la tire (AGI)",            special: "" },
  { id: "spirite",            milieu: "occulte",   label: "Spirite amateur",          spec1: "Imposture (CHA)",           spec2: "Interprétation des rêves (PER)", special: "" },
  { id: "choriste",           milieu: "occulte",   label: "Choriste à la paroisse",   spec1: "Religion (SAV)",            spec2: "Art de la scène - Chant (CHA)", special: "" },
  { id: "malediction",        milieu: "occulte",   label: "Victime d'une malédiction",spec1: "Hypnose (CHA)",             spec2: "Observer (PER)",                 special: "" },
  { id: "conversion",         milieu: "occulte",   label: "Conversion",               spec1: "Religion (SAV)",            spec2: "Prêcher (CHA)",                  special: "" },
  { id: "exp_paranormal",     milieu: "occulte",   label: "Expérience du paranormal", spec1: "Folklore (SAV)",            spec2: "Interprétation des rêves (PER)", special: "" },
  { id: "exp_mystique",       milieu: "occulte",   label: "Expérience mystique",      spec1: "Interprétation des rêves (PER)", spec2: "Prêcher (CHA)",             special: "" },
  { id: "veteran",            milieu: "ordre",     label: "Vétéran de Guerre",        spec1: "Arme à feu (AGI)",          spec2: "Arme blanche (VIG)",             special: "" },
  { id: "erreur_judiciaire",  milieu: "ordre",     label: "Victime erreur judiciaire",spec1: "Droit (SAV)",               spec2: "Expliquer (CHA)",                special: "" },
  { id: "jury",               milieu: "ordre",     label: "Jury",                     spec1: "Droit (SAV)",               spec2: "Empathie (PER)",                 special: "" },
  { id: "pompier_volontaire", milieu: "ordre",     label: "Pompier Volontaire",       spec1: "Escalader (VIG)",           spec2: "Premiers soins (AGI)",           special: "" },
  { id: "milice_quartier",    milieu: "ordre",     label: "Milice de quartier",       spec1: "Arme blanche (VIG)",        spec2: "Filature (AGI)",                 special: "" },
  { id: "reserviste",         milieu: "ordre",     label: "Réserviste",               spec1: "Arme à feu (AGI)",          spec2: "Courir (VIG)",                   special: "" },
  { id: "ligue_vertu",        milieu: "politique", label: "Membre d'une Ligue de Vertu",spec1: "Religion (SAV)",          spec2: "Négocier (CHA)",                 special: "" },
  { id: "lobbyiste",          milieu: "politique", label: "Lobbyiste",                spec1: "Mensonge (CHA)",            spec2: "Négocier (CHA)",                 special: "" },
  { id: "club_philanthrope",  milieu: "politique", label: "Club philanthropique",     spec1: "Empathie (PER)",            spec2: "Étiquette (CHA)",                special: "" },
  { id: "militantisme_exp",   milieu: "politique", label: "Militantisme",             spec1: "Prêcher (CHA)",             spec2: "Bricolage (AGI)",                special: "" },
  { id: "espionage_act",      milieu: "politique", label: "Victime de l'Espionage Act",spec1: "Dissimulation (AGI)",      spec2: "Droit (SAV)",                    special: "" },
  { id: "candidat_malheureux",milieu: "politique", label: "Candidat malheureux",      spec1: "Commander (CHA)",           spec2: "Réconforter (CHA)",              special: "" },
  { id: "grippe_espagnole",   milieu: "sante",     label: "Marqué par la grippe espagnole",spec1: "Pharmacologie (SAV)", spec2: "Premiers soins (AGI)",           special: "" },
  { id: "cobaye",             milieu: "sante",     label: "Cobaye volontaire",        spec1: "Pharmacologie (SAV)",       spec2: "Estimation (PER)",               special: "" },
  { id: "sublime_corrosif",   milieu: "sante",     label: "Partisan du Sublimé Corrosif",spec1: "Pseudo-science (SAV)", spec2: "Prêcher (CHA)",                  special: "" },
  { id: "hypocondrie",        milieu: "sante",     label: "Hypocondrie",              spec1: "Anatomie (SAV)",            spec2: "Pharmacologie (SAV)",            special: "" },
  { id: "commerce_cadavres",  milieu: "sante",     label: "Commerce de cadavres",     spec1: "Dissimulation (AGI)",       spec2: "Anatomie (SAV)",                 special: "" },
  { id: "maladie_inexpliquee",milieu: "sante",     label: "Maladie inexpliquée",      spec1: "Neurologie (SAV)",          spec2: "Anatomie (SAV)",                 special: "Réserve max -1" },
];

// ------------------------------------------------
// DONNÉES : DÉCLENCHEURS
// ------------------------------------------------
const CDT_DECLENCHEURS = [
  "Saigner", "Araignées", "Créatures des profondeurs", "Être sale",
  "Bruit de l'eau", "Voir son reflet", "Crime organisé", "Flammes",
  "Être enfermé", "Piqûres", "Un nombre précis (13, 666…)", "Obscurité",
  "Serpents", "Mensonge", "Subir un reproche", "Orage",
  "Poupées", "Fluides corporels", "La Lune", "Cadavres"
];

// ------------------------------------------------
// DONNÉES : RITUELS DE DÉCOMPRESSION
// ------------------------------------------------
const CDT_RITUELS = [
  { label: "Aiguiser un couteau", tension: -1 },
  { label: "Boire de l'alcool", tension: -1 },
  { label: "Changer de vêtements", tension: -1 },
  { label: "Contempler le ciel étoilé", tension: -1 },
  { label: "Dessiner", tension: -1 },
  { label: "Écouter un feu crépiter", tension: -1 },
  { label: "Faire ses comptes", tension: -1 },
  { label: "Fumer la pipe", tension: -1 },
  { label: "Lire la Bible", tension: -1 },
  { label: "Sentir l'odeur de vieux livres", tension: -1 },
  { label: "Battre un rythme", tension: -1 },
  { label: "Bricoler", tension: -1 },
  { label: "Contempler la photo d'un proche", tension: -1 },
  { label: "Écrire un poème", tension: -1 },
  { label: "Faire le ménage", tension: -1 },
  { label: "Manger des friandises", tension: -1 },
  { label: "Tricoter", tension: -1 },
  { label: "Faire un achat compulsif", tension: -2 },
  { label: "Changer de coiffure", tension: -2 },
  { label: "Cuisiner un plat de son enfance", tension: -2 },
  { label: "Entretenir son arme à feu", tension: -2 },
  { label: "Écouter son morceau préféré", tension: -2 },
  { label: "Faire du sport", tension: -2 },
  { label: "Jardiner", tension: -2 },
  { label: "Jouer de la musique", tension: -2 },
  { label: "Marcher au hasard des rues", tension: -2 },
  { label: "Prier ou méditer", tension: -2 },
  { label: "Tenir son journal intime", tension: -2 },
  { label: "Danser", tension: -2 },
  { label: "Faire de l'équitation", tension: -2 },
  { label: "Faire un nœud coulant", tension: -2 },
  { label: "Prendre un bain chaud", tension: -2 },
  { label: "Sculpter du bois", tension: -2 },
  { label: "Chasser", tension: -3 },
  { label: "Découper des photographies", tension: -3 },
  { label: "Investir en bourse", tension: -3 },
  { label: "Se rendre à des obsèques", tension: -3 },
  { label: "Conduire à plus de 50km/h", tension: -3 },
  { label: "Faire un tour sur l'eau", tension: -3 },
  { label: "Tirer à l'arme à feu", tension: -3 },
  { label: "Effectuer un sabotage", tension: -4 },
  { label: "Être frôlé par un train", tension: -4 },
  { label: "Provoquer une bagarre générale", tension: -4 },
  { label: "Empailler un animal", tension: -4 },
  { label: "Se faire un tatouage", tension: -4 },
];

// ------------------------------------------------
// DIALOG PRINCIPAL
// ------------------------------------------------
class CdTCreationPersonnage extends foundry.applications.api.ApplicationV2 {
  static DEFAULT_OPTIONS = {
    id: "cdt-creation-personnage",
    classes: ["cdt-creation"],
    tag: "div",
    window: { title: "🎲 Créer un personnage — Les Chants de Tindalos", resizable: true },
    position: { width: 900, height: 780 },
  };

  constructor() {
    super();
    this.etape = 1;
    this.data = {
      nom: "",
      caracteristiques: { savoir: 1, perception: 1, charisme: 1, agilite: 1, vigueur: 1 },
      variables: { reserve: 8, angoisse: 10, maitrise: -3, intuition: -6, espoir: 0 },
      milieu: null,
      champ: null,
      metier: null,
      profession: null,
      milieuOrigine: null,
      experience: null,
      rituel: null,
      declencheur: null,
      folie: 0,
      milieuxPoints: {},
      competencesSocles: {},
      competencesSpecialites: {},
      richesse: 0,
    };
  }

  get pointsCaracRestants() {
    const total = Object.values(this.data.caracteristiques).reduce((s, v) => s + v, 0);
    return 12 - total + 5; // on part avec 5 (1 par carac)
  }

  get pointsVarRestants() {
    const d = this.data.variables;
    // Coût : chaque point investi
    const investi = (d.reserve - 8) / 2 + (10 - d.angoisse) + (d.maitrise + 3) + (d.intuition + 6) / 2 + d.espoir;
    return 12 - investi;
  }

  get vitesse() { return this.data.caracteristiques.agilite + this.data.caracteristiques.vigueur + 2; }
  get sommeil() { return 12 - this.data.variables.angoisse; }

  _renderHTML() {
    const el = document.createElement("div");
    el.innerHTML = this._getContenu();
    return el;
  }

  async _prepareContext() { return {}; }

  async render(force, options) {
    await super.render(force, options);
    return this;
  }

  _replaceHTML(result, content) {
    content.innerHTML = this._getContenu();
    this._activateListeners(content);
  }

  _getContenu() {
    const etapes = ["Identité & Carac.", "Variables", "Profession", "Milieu d'origine", "Expérience", "Rituel & Déclencheur", "Folie", "Récapitulatif"];
    const barreEtapes = etapes.map((e, i) => {
      const actif = i + 1 === this.etape ? "active" : i + 1 < this.etape ? "done" : "";
      return `<div class="cdt-etape-pill ${actif}">${i + 1}. ${e}</div>`;
    }).join("");

    return `
      <div class="cdt-creation-wrapper">
        <div class="cdt-etapes-barre">${barreEtapes}</div>
        <div class="cdt-contenu-etape">${this._getEtape()}</div>
        <div class="cdt-navigation">
          ${this.etape > 1 ? `<button class="cdt-btn-retour">← Retour</button>` : `<div></div>`}
          ${this.etape < 8 ? `<button class="cdt-btn-suivant">Suivant →</button>` : `<button class="cdt-btn-creer">✨ Créer le personnage</button>`}
        </div>
      </div>
      <style>${this._getStyles()}</style>
    `;
  }

  _getEtape() {
    switch (this.etape) {
      case 1: return this._etapeIdentiteCarac();
      case 2: return this._etapeVariables();
      case 3: return this._etapeProfession();
      case 4: return this._etapeMilieuOrigine();
      case 5: return this._etapeExperience();
      case 6: return this._etapeRituelDeclencheur();
      case 7: return this._etapeFolie();
      case 8: return this._etapeRecap();
      default: return "";
    }
  }

  _etapeIdentiteCarac() {
    const c = this.data.caracteristiques;
    const pts = this.pointsCaracRestants;
    const couleur = pts < 0 ? "#8b0000" : pts === 0 ? "#2d6a2d" : "#8b4513";
    return `
      <h2>Étape 1 — Identité & Caractéristiques</h2>
      <div class="cdt-champ-nom">
        <label>Nom du personnage</label>
        <input type="text" id="cdt-nom" value="${this.data.nom}" placeholder="Entrez le nom..." />
      </div>
      <div class="cdt-points-restants" style="color:${couleur}">
        Points restants : <strong>${pts}</strong> / 12
        <span style="font-size:0.85em;color:#666;">(Le passage rang 4→5 coûte 2 points)</span>
      </div>
      <div class="cdt-caracs-grid">
        ${this._rowCarac("savoir",     "📚", "Savoir",     c.savoir)}
        ${this._rowCarac("perception", "👁️", "Perception", c.perception)}
        ${this._rowCarac("charisme",   "🗣️", "Charisme",   c.charisme)}
        ${this._rowCarac("agilite",    "⚡", "Agilité",    c.agilite)}
        ${this._rowCarac("vigueur",    "💪", "Vigueur",    c.vigueur)}
      </div>
      <div class="cdt-info-caracs">
        <div class="cdt-info-box">
          <b>Vitesse calculée :</b> ${this.vitesse}
          (AGI ${c.agilite} + VIG ${c.vigueur} + 2)
        </div>
      </div>
    `;
  }

  _rowCarac(id, icone, label, valeur) {
    const couts = [0, 1, 2, 3, 4, 6];
    const defenses = [0, 0, 1, 1, 2, 2];
    const cout = couts[valeur] ?? 0;
    const defense = defenses[valeur] ?? 0;
    return `
      <div class="cdt-carac-row">
        <span class="cdt-carac-icone">${icone}</span>
        <span class="cdt-carac-label">${label}</span>
        <div class="cdt-carac-stepper">
          <button class="cdt-moins" data-carac="${id}" data-val="${valeur}">−</button>
          <span class="cdt-carac-val">${valeur}</span>
          <button class="cdt-plus" data-carac="${id}" data-val="${valeur}">+</button>
        </div>
        <span class="cdt-carac-info">Coût: ${cout} | Déf: ${defense}</span>
      </div>
    `;
  }

  _etapeVariables() {
    const v = this.data.variables;
    const pts = this.pointsVarRestants;
    const couleur = pts < 0 ? "#8b0000" : pts === 0 ? "#2d6a2d" : "#8b4513";
    return `
      <h2>Étape 2 — Variables</h2>
      <p style="color:#666;font-size:0.9em;">12 points à répartir. Maximum 6 points par variable.</p>
      <div class="cdt-points-restants" style="color:${couleur}">
        Points restants : <strong>${Math.round(pts * 2) / 2}</strong> / 12
      </div>
      <div class="cdt-vars-grid">
        ${this._rowVar("reserve",   "🔋", "Réserve",   v.reserve,   8,  "+2 par point", 20)}
        ${this._rowVar("angoisse",  "😰", "Angoisse",  v.angoisse,  10, "−1 par point",  4)}
        ${this._rowVar("maitrise",  "🧘", "Maîtrise",  v.maitrise, -3, "+1 par point",  3)}
        ${this._rowVar("intuition", "🔮", "Intuition", v.intuition, -6, "+2 par point",  6)}
        ${this._rowVar("espoir",    "🕯️", "Espoir",    v.espoir,    0, "+1 par point",  6)}
      </div>
      <div class="cdt-info-vars">
        <div class="cdt-info-box">
          <b>Sommeil :</b> ${this.sommeil} (12 − Angoisse ${v.angoisse})<br>
          <b>Vitesse :</b> ${this.vitesse}
        </div>
      </div>
    `;
  }

  _rowVar(id, icone, label, valeur, initial, effet, limite) {
    return `
      <div class="cdt-var-row">
        <span class="cdt-carac-icone">${icone}</span>
        <span class="cdt-carac-label">${label}</span>
        <div class="cdt-carac-stepper">
          <button class="cdt-var-moins" data-var="${id}" data-initial="${initial}">−</button>
          <span class="cdt-carac-val">${valeur}</span>
          <button class="cdt-var-plus" data-var="${id}" data-initial="${initial}" data-limite="${limite}">+</button>
        </div>
        <span class="cdt-carac-info">${effet} | Limite: ${limite}</span>
      </div>
    `;
  }

  _etapeProfession() {
    const d = this.data;
    let html = `<h2>Étape 3 — Profession</h2>`;

    if (!d.milieu) {
      html += `<p>Choisissez un <strong>milieu</strong> :</p><div class="cdt-choix-grid">`;
      for (const [id, m] of Object.entries(CDT_PROFESSIONS)) {
        html += `<button class="cdt-choix-btn" data-action="choix-milieu" data-val="${id}">${m.icone} ${m.label}</button>`;
      }
      html += `</div>`;
    } else if (!d.champ) {
      const milieu = CDT_PROFESSIONS[d.milieu];
      html += `<p><b>${milieu.icone} ${milieu.label}</b> → Choisissez un <strong>champ</strong> :</p>`;
      html += `<p style="color:#666;font-size:0.85em;">Socles de milieu : ${milieu.socles.join(", ")}</p>`;
      html += `<div class="cdt-choix-grid">`;
      for (const [id, ch] of Object.entries(milieu.champs)) {
        html += `<button class="cdt-choix-btn" data-action="choix-champ" data-val="${id}">${ch.label}<br><small>${ch.socles.join(", ")}</small></button>`;
      }
      html += `</div><button class="cdt-btn-reset" data-reset="milieu">← Changer de milieu</button>`;
    } else if (!d.metier) {
      const champ = CDT_PROFESSIONS[d.milieu].champs[d.champ];
      html += `<p><b>${d.champ}</b> → Choisissez un <strong>métier</strong> :</p>`;
      html += `<div class="cdt-choix-grid">`;
      for (const [id, m] of Object.entries(champ.metiers)) {
        html += `<button class="cdt-choix-btn" data-action="choix-metier" data-val="${id}">
          ${m.label}<br>
          <small>Richesse ${m.richesse} | ${m.milieu}</small><br>
          <small>${m.socles.join(", ")}</small>
        </button>`;
      }
      html += `</div><button class="cdt-btn-reset" data-reset="champ">← Changer de champ</button>`;
    } else if (!d.profession) {
      const metier = CDT_PROFESSIONS[d.milieu].champs[d.champ].metiers[d.metier];
      html += `<p><b>${metier.label}</b> → Choisissez votre <strong>profession</strong> :</p>`;
      html += `<div class="cdt-choix-grid">`;
      for (const [id, p] of Object.entries(metier.professions)) {
        html += `<button class="cdt-choix-btn" data-action="choix-profession" data-val="${id}">
          ${p.label}<br>
          <small>Milieu bonus: +1 ${p.milieu}</small><br>
          <small>Spécialités: ${p.specialites.join(", ")}</small>
        </button>`;
      }
      html += `</div><button class="cdt-btn-reset" data-reset="metier">← Changer de métier</button>`;
    } else {
      const metier = CDT_PROFESSIONS[d.milieu].champs[d.champ].metiers[d.metier];
      const prof = metier.professions[d.profession];
      html += `
        <div class="cdt-recap-profession">
          <h3>✅ ${prof.label}</h3>
          <p><b>Milieu principal :</b> ${CDT_PROFESSIONS[d.milieu].label} (+1)</p>
          <p><b>Milieu bonus :</b> +1 ${prof.milieu}</p>
          <p><b>Richesse de départ :</b> ${metier.richesse}</p>
          <p><b>Compétences socles :</b> ${metier.socles.join(", ")}</p>
          <p><b>Spécialités :</b> ${prof.specialites.join(", ")} (dont +1 ${prof.specialiteBonus})</p>
          <button class="cdt-btn-reset" data-reset="profession">← Changer de profession</button>
        </div>
      `;
    }
    return html;
  }

  _etapeMilieuOrigine() {
    const d = this.data;
    let html = `<h2>Étape 4 — Milieu d'origine</h2>
    <p style="color:#666;font-size:0.95em;">Choisissez votre origine sociale. Vous gagnez +1 point dans ce milieu.</p>
    <div class="cdt-milieux-grid">`;
    for (const [id, m] of Object.entries(CDT_MILIEUX_ORIGINE)) {
      const actif = d.milieuOrigine === id ? "selected" : "";
      const richesse = m.richesse !== 0 ? `Richesse ${m.richesse > 0 ? "+" : ""}${m.richesse}` : "";
      html += `<button class="cdt-milieu-btn ${actif}" data-action="choix-milieu-origine" data-val="${id}">
        <div class="cdt-milieu-titre">${m.icone} ${m.label}${richesse ? ` — <span class="cdt-milieu-bonus">${richesse}</span>` : ""}</div>
        <div class="cdt-milieu-desc">${m.description}</div>
      </button>`;
    }
    html += `</div>`;
    if (d.milieuOrigine) {
      html += `<div class="cdt-info-box">✅ Milieu d'origine choisi : <b>${CDT_MILIEUX_ORIGINE[d.milieuOrigine].icone} ${CDT_MILIEUX_ORIGINE[d.milieuOrigine].label}</b></div>`;
    }
    return html;
  }

  _etapeExperience() {
    const d = this.data;
    let html = `<h2>Étape 5 — Expérience singulière</h2>
    <p style="color:#666;font-size:0.9em;">Une expérience déterminante. +1 milieu, +1 point dans 2 spécialités.</p>`;

    // Filtres par milieu
    const milieux = [...new Set(CDT_EXPERIENCES.map(e => e.milieu))];
    html += `<div class="cdt-filtres">Filtrer : <button class="cdt-filtre-btn active" data-filtre="all">Tous</button>`;
    for (const m of milieux) {
      const info = CDT_MILIEUX_ORIGINE[m];
      html += `<button class="cdt-filtre-btn" data-filtre="${m}">${info?.icone ?? ""} ${info?.label ?? m}</button>`;
    }
    html += `</div><div class="cdt-exp-liste">`;

    for (const exp of CDT_EXPERIENCES) {
      const actif = d.experience === exp.id ? "selected" : "";
      const special = exp.special ? `<br><small style="color:#c8860a;">⚠️ ${exp.special}</small>` : "";
      html += `<button class="cdt-exp-btn ${actif}" data-action="choix-experience" data-val="${exp.id}" data-milieu="${exp.milieu}">
        <b>${exp.label}</b> <small>(${CDT_MILIEUX_ORIGINE[exp.milieu]?.icone ?? ""} ${exp.milieu})</small><br>
        <small>${exp.spec1} · ${exp.spec2}</small>${special}
      </button>`;
    }
    html += `</div>`;

    if (d.experience) {
      const exp = CDT_EXPERIENCES.find(e => e.id === d.experience);
      html += `<div class="cdt-info-box">✅ <b>${exp.label}</b> — ${exp.spec1}, ${exp.spec2}${exp.special ? " | ⚠️ " + exp.special : ""}</div>`;
    }
    return html;
  }

  _etapeRituelDeclencheur() {
    const d = this.data;
    let html = `<h2>Étape 6 — Rituel & Déclencheur</h2>`;

    html += `<div class="cdt-deux-colonnes">
      <div>
        <h3>🧘 Rituel de décompression</h3>
        <p style="color:#666;font-size:0.85em;">Fait baisser la Tension une fois par jour.</p>
        <div class="cdt-rituel-liste">`;
    for (const r of CDT_RITUELS) {
      const actif = d.rituel === r.label ? "selected" : "";
      html += `<button class="cdt-rituel-btn ${actif}" data-action="choix-rituel" data-val="${r.label}">
        ${r.label} <span style="color:#c8860a;">(${r.tension})</span>
      </button>`;
    }
    html += `</div></div>
      <div>
        <h3>⚡ Déclencheur</h3>
        <p style="color:#666;font-size:0.85em;">Provoque une montée de Tension soudaine.</p>
        <div class="cdt-declencheur-liste">`;
    for (const dec of CDT_DECLENCHEURS) {
      const actif = d.declencheur === dec ? "selected" : "";
      html += `<button class="cdt-dec-btn ${actif}" data-action="choix-declencheur" data-val="${dec}">${dec}</button>`;
    }
    html += `<div style="margin-top:8px;">
          <input type="text" id="cdt-dec-custom" placeholder="Ou saisissez le vôtre..." value="${d.declencheur && !CDT_DECLENCHEURS.includes(d.declencheur) ? d.declencheur : ""}" />
        </div>`;
    html += `</div></div></div>`;
    return html;
  }

  _etapeFolie() {
    const d = this.data;
    return `
      <h2>Étape 7 — Folie & Révélations</h2>
      <p>En accord avec votre MJ, votre personnage peut démarrer avec 0 ou 1 point de folie.</p>
      <div class="cdt-folie-choix">
        <button class="cdt-folie-btn ${d.folie === 0 ? "selected" : ""}" data-folie="0">
          <b>0 point de folie</b><br>
          <small>Départ serein — Maîtrise et Intuition non modifiées</small>
        </button>
        <button class="cdt-folie-btn ${d.folie === 1 ? "selected" : ""}" data-folie="1">
          <b>1 point de folie</b><br>
          <small>Maîtrise −1, Intuition +1 — Pioche PLP niveau 1 au palier 11</small>
        </button>
      </div>
      ${d.folie === 1 ? `
        <div class="cdt-info-box" style="color:#8b0000;">
          ⚠️ Avec 1 point de folie :<br>
          Maîtrise : ${d.variables.maitrise - 1}<br>
          Intuition : ${d.variables.intuition + 1}
        </div>` : ""}
      <div class="cdt-revelation-note">
        <p><b>Révélations</b> : Si votre personnage a un point de folie, demandez à votre MJ quelle révélation lui attribuer. Vous pourrez la saisir directement sur la fiche une fois créée.</p>
      </div>
    `;
  }

  _etapeRecap() {
    const d = this.data;
    const c = d.caracteristiques;
    const v = d.variables;
    const mFolie = d.folie === 1 ? v.maitrise - 1 : v.maitrise;
    const iFolie = d.folie === 1 ? v.intuition + 1 : v.intuition;

    let profLabel = "—";
    let milieuxFinal = { ...d.milieuxPoints };
    let richesseFinal = 0;

    if (d.milieu && d.champ && d.metier && d.profession) {
      const metier = CDT_PROFESSIONS[d.milieu].champs[d.champ].metiers[d.metier];
      const prof = metier.professions[d.profession];
      profLabel = prof.label;
      richesseFinal = metier.richesse;
    }

    return `
      <h2>Étape 8 — Récapitulatif</h2>
      <div class="cdt-recap-grid">
        <div class="cdt-recap-section">
          <h3>👤 Identité</h3>
          <p><b>Nom :</b> ${d.nom || "<em>Non renseigné</em>"}</p>
          <p><b>Profession :</b> ${profLabel}</p>
          <p><b>Milieu d'origine :</b> ${d.milieuOrigine ? CDT_MILIEUX_ORIGINE[d.milieuOrigine].label : "—"}</p>
          <p><b>Expérience :</b> ${d.experience ? CDT_EXPERIENCES.find(e => e.id === d.experience)?.label : "—"}</p>
          <p><b>Richesse :</b> ${richesseFinal}</p>
        </div>
        <div class="cdt-recap-section">
          <h3>💪 Caractéristiques</h3>
          <p>📚 Savoir : <b>${c.savoir}</b></p>
          <p>👁️ Perception : <b>${c.perception}</b></p>
          <p>🗣️ Charisme : <b>${c.charisme}</b></p>
          <p>⚡ Agilité : <b>${c.agilite}</b></p>
          <p>💪 Vigueur : <b>${c.vigueur}</b></p>
        </div>
        <div class="cdt-recap-section">
          <h3>📊 Variables</h3>
          <p>🔋 Réserve : <b>${v.reserve}</b></p>
          <p>😰 Angoisse : <b>${v.angoisse}</b></p>
          <p>🧘 Maîtrise : <b>${mFolie}</b></p>
          <p>🔮 Intuition : <b>${iFolie}</b></p>
          <p>🕯️ Espoir : <b>${v.espoir}</b></p>
          <p>🏃 Vitesse : <b>${this.vitesse}</b></p>
          <p>😴 Sommeil : <b>${this.sommeil}</b></p>
        </div>
        <div class="cdt-recap-section">
          <h3>🎭 Psychologie</h3>
          <p><b>Rituel :</b> ${d.rituel || "—"}</p>
          <p><b>Déclencheur :</b> ${d.declencheur || "—"}</p>
          <p><b>Folie :</b> ${d.folie} point(s)</p>
        </div>
      </div>
      ${this.pointsCaracRestants < 0 ? `<div class="cdt-alerte">⚠️ Trop de points de caractéristiques dépensés !</div>` : ""}
      ${this.pointsVarRestants < 0 ? `<div class="cdt-alerte">⚠️ Trop de points de variable dépensés !</div>` : ""}
    `;
  }

  _activateListeners(html) {
    // Navigation
    html.querySelector(".cdt-btn-suivant")?.addEventListener("click", () => this._suivant());
    html.querySelector(".cdt-btn-retour")?.addEventListener("click", () => this._retour());
    html.querySelector(".cdt-btn-creer")?.addEventListener("click", () => this._creerPersonnage());

    // Etape 1 : nom
    html.querySelector("#cdt-nom")?.addEventListener("input", e => { this.data.nom = e.target.value; });

    // Etape 1 : caractéristiques
    html.querySelectorAll(".cdt-plus[data-carac]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.carac;
        const val = this.data.caracteristiques[id];
        const cout = val >= 4 ? 2 : 1;
        if (this.pointsCaracRestants >= cout && val < 5) {
          this.data.caracteristiques[id]++;
          this._refresh();
        }
      });
    });
    html.querySelectorAll(".cdt-moins[data-carac]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.carac;
        if (this.data.caracteristiques[id] > 1) {
          this.data.caracteristiques[id]--;
          this._refresh();
        }
      });
    });

    // Etape 2 : variables
    html.querySelectorAll(".cdt-var-plus").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.var;
        const initial = Number(btn.dataset.initial);
        const limite = Number(btn.dataset.limite);
        const val = this.data.variables[id];
        const effet = (id === "reserve" || id === "intuition") ? 0.5 : 1;
        if (this.pointsVarRestants >= effet) {
          const nvVal = id === "reserve" ? val + 2 : id === "intuition" ? val + 2 : id === "angoisse" ? val - 1 : val + 1;
          const investi = id === "reserve" ? (nvVal - initial) / 2 : id === "intuition" ? (nvVal - initial) / 2 : id === "angoisse" ? (initial - nvVal) : (nvVal - initial);
          if (investi <= 6 && nvVal !== undefined) {
            this.data.variables[id] = nvVal;
            this._refresh();
          }
        }
      });
    });
    html.querySelectorAll(".cdt-var-moins").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.var;
        const initial = Number(btn.dataset.initial);
        const val = this.data.variables[id];
        let nvVal;
        if (id === "reserve") nvVal = val - 2;
        else if (id === "intuition") nvVal = val - 2;
        else if (id === "angoisse") nvVal = val + 1;
        else nvVal = val - 1;
        const investi = id === "reserve" ? (nvVal - initial) / 2 : id === "intuition" ? (nvVal - initial) / 2 : id === "angoisse" ? (initial - nvVal) : (nvVal - initial);
        if (investi >= 0) {
          this.data.variables[id] = nvVal;
          this._refresh();
        }
      });
    });

    // Etape 3 : profession
    html.querySelectorAll("[data-action='choix-milieu']").forEach(btn => {
      btn.addEventListener("click", () => { this.data.milieu = btn.dataset.val; this._refresh(); });
    });
    html.querySelectorAll("[data-action='choix-champ']").forEach(btn => {
      btn.addEventListener("click", () => { this.data.champ = btn.dataset.val; this._refresh(); });
    });
    html.querySelectorAll("[data-action='choix-metier']").forEach(btn => {
      btn.addEventListener("click", () => { this.data.metier = btn.dataset.val; this._refresh(); });
    });
    html.querySelectorAll("[data-action='choix-profession']").forEach(btn => {
      btn.addEventListener("click", () => { this.data.profession = btn.dataset.val; this._refresh(); });
    });
    html.querySelectorAll("[data-reset]").forEach(btn => {
      btn.addEventListener("click", () => {
        const r = btn.dataset.reset;
        if (r === "milieu") { this.data.milieu = null; this.data.champ = null; this.data.metier = null; this.data.profession = null; }
        if (r === "champ") { this.data.champ = null; this.data.metier = null; this.data.profession = null; }
        if (r === "metier") { this.data.metier = null; this.data.profession = null; }
        if (r === "profession") { this.data.profession = null; }
        this._refresh();
      });
    });

    // Etape 4 : milieu d'origine
    html.querySelectorAll("[data-action='choix-milieu-origine']").forEach(btn => {
      btn.addEventListener("click", () => { this.data.milieuOrigine = btn.dataset.val; this._refresh(); });
    });

    // Etape 5 : expérience
    html.querySelectorAll("[data-action='choix-experience']").forEach(btn => {
      btn.addEventListener("click", () => { this.data.experience = btn.dataset.val; this._refresh(); });
    });
    html.querySelectorAll(".cdt-filtre-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        html.querySelectorAll(".cdt-filtre-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const filtre = btn.dataset.filtre;
        html.querySelectorAll(".cdt-exp-btn").forEach(b => {
          b.style.display = (filtre === "all" || b.dataset.milieu === filtre) ? "" : "none";
        });
      });
    });

    // Etape 6 : rituel & déclencheur
    html.querySelectorAll("[data-action='choix-rituel']").forEach(btn => {
      btn.addEventListener("click", () => { this.data.rituel = btn.dataset.val; this._refresh(); });
    });
    html.querySelectorAll("[data-action='choix-declencheur']").forEach(btn => {
      btn.addEventListener("click", () => {
        this.data.declencheur = btn.dataset.val;
        const input = html.querySelector("#cdt-dec-custom");
        if (input) input.value = "";
        this._refresh();
      });
    });
    html.querySelector("#cdt-dec-custom")?.addEventListener("input", e => {
      if (e.target.value.trim()) {
        this.data.declencheur = e.target.value.trim();
        html.querySelectorAll(".cdt-dec-btn").forEach(b => b.classList.remove("selected"));
      }
    });

    // Etape 7 : folie
    html.querySelectorAll(".cdt-folie-btn").forEach(btn => {
      btn.addEventListener("click", () => { this.data.folie = Number(btn.dataset.folie); this._refresh(); });
    });
  }

  _refresh() {
    const content = this.element.querySelector(".cdt-creation-wrapper")?.parentElement;
    if (content) {
      content.innerHTML = this._getContenu();
      this._activateListeners(content);
    }
  }

  _suivant() {
    if (this.etape === 1 && this.pointsCaracRestants < 0) {
      ui.notifications.warn("⚠️ Vous avez dépensé trop de points de caractéristiques !");
      return;
    }
    if (this.etape === 2 && this.pointsVarRestants < 0) {
      ui.notifications.warn("⚠️ Vous avez dépensé trop de points de variable !");
      return;
    }
    if (this.etape < 8) { this.etape++; this._refresh(); }
  }

  _retour() {
    if (this.etape > 1) { this.etape--; this._refresh(); }
  }

  async _creerPersonnage() {
    const d = this.data;
    const c = d.caracteristiques;
    const v = d.variables;
    const mFolie = d.folie === 1 ? v.maitrise - 1 : v.maitrise;
    const iFolie = d.folie === 1 ? v.intuition + 1 : v.intuition;

    let richesse = 0;
    let profLabel = "";
    let competencesCles = "";
    if (d.milieu && d.champ && d.metier && d.profession) {
      const metier = CDT_PROFESSIONS[d.milieu].champs[d.champ].metiers[d.metier];
      const prof = metier.professions[d.profession];
      richesse = metier.richesse;
      profLabel = prof.label;
      competencesCles = [...metier.socles, ...prof.specialites].join(", ");
    }

    const exp = CDT_EXPERIENCES.find(e => e.id === d.experience);

    const actorData = {
      name: d.nom || "Nouveau personnage",
      type: "personnage",
      system: {
        identite: {
          profession: profLabel,
          origine: d.milieuOrigine ? CDT_MILIEUX_ORIGINE[d.milieuOrigine].label : "",
          experience: exp?.label ?? "",
          joueur: "",
          chant: "",
        },
        caracteristiques: {
          savoir:     { valeur: c.savoir,     cout: [0,4,3,2,2,1][c.savoir],     defense: [0,0,1,1,2,2][c.savoir] },
          perception: { valeur: c.perception, cout: [0,4,3,2,2,1][c.perception], defense: [0,0,1,1,2,2][c.perception] },
          charisme:   { valeur: c.charisme,   cout: [0,4,3,2,2,1][c.charisme],   defense: [0,0,1,1,2,2][c.charisme] },
          agilite:    { valeur: c.agilite,    cout: [0,4,3,2,2,1][c.agilite],    defense: [0,0,1,1,2,2][c.agilite] },
          vigueur:    { valeur: c.vigueur,    cout: [0,4,3,2,2,1][c.vigueur],    defense: [0,0,1,1,2,2][c.vigueur] },
        },
        variables: {
          maitrise:  mFolie,
          intuition: iFolie,
          vitesse:   c.agilite + c.vigueur + 2,
          richesse:  richesse,
        },
        jauges: {
          reserve:  { valeur: v.reserve, max: v.reserve },
          tension:  { valeur: 0, max: 20 },
          angoisse: { valeur: v.angoisse },
          espoir:   { valeur: v.espoir, max: 8, xp: 0 },
          folie:    { valeur: d.folie,   max: 8, xp: 0 },
          blessures: "",
          onirisme: { valeur: 0, max: 20 },
        },
        seuilDifficulte: 3,
        malusSD: 0,
        competencesCles: competencesCles,
        declencheur: d.declencheur ?? "",
        rituelDecompression: d.rituel ?? "",
        armes: {
          arme1: { nom: "Poings", type: "corpsacorps", letalite: 23, blessure: "Superficielle" },
          arme2: { nom: "", type: "corpsacorps", letalite: 18, blessure: "Superficielle" },
        },
        description: "",
        notes: exp ? `Expérience singulière : ${exp.label}\nSpécialités acquises : ${exp.spec1}, ${exp.spec2}${exp.special ? "\n⚠️ " + exp.special : ""}` : "",
      }
    };

    const acteur = await Actor.create(actorData);
    ui.notifications.info(`✨ ${acteur.name} a été créé avec succès !`);
    acteur.sheet.render(true);
    this.close();
  }

  _getStyles() {
    return `
      .cdt-creation-wrapper { display:flex; flex-direction:column; height:100%; font-family:inherit; font-size:14px; }
      .cdt-etapes-barre { display:flex; flex-wrap:wrap; gap:4px; padding:8px 10px; background:#3d1a1a; }
      .cdt-etape-pill { padding:4px 10px; border-radius:12px; font-size:0.8em; background:#5a2a2a; color:#d4a96a; white-space:nowrap; }
      .cdt-etape-pill.active { background:#8b4513; color:#fff; font-weight:bold; }
      .cdt-etape-pill.done { background:#2d5a2d; color:#90c090; }
      .cdt-contenu-etape { flex:1; overflow-y:auto; padding:20px 24px; background:#f4e8d0; }
      .cdt-contenu-etape h2 { color:#5a2a2a; border-bottom:2px solid #8b4513; padding-bottom:8px; margin-top:0; font-size:1.5em; }
      .cdt-contenu-etape h3 { color:#8b4513; font-size:1.15em; }
      .cdt-navigation { display:flex; justify-content:space-between; padding:12px 20px; background:#3d1a1a; }
      .cdt-btn-suivant, .cdt-btn-retour, .cdt-btn-creer { padding:10px 24px; border:none; border-radius:4px; cursor:pointer; font-size:1em; font-weight:bold; }
      .cdt-btn-suivant, .cdt-btn-creer { background:#8b4513; color:#fff; }
      .cdt-btn-retour { background:#5a2a2a; color:#d4a96a; }
      .cdt-btn-suivant:hover, .cdt-btn-creer:hover { background:#6d340e; }
      .cdt-points-restants { font-size:1em; margin:10px 0; padding:8px 14px; background:#fff8e8; border-radius:4px; border:1px solid #d4a96a; }
      .cdt-caracs-grid, .cdt-vars-grid { display:flex; flex-direction:column; gap:10px; margin:14px 0; }
      .cdt-carac-row, .cdt-var-row { display:flex; align-items:center; gap:14px; padding:10px 14px; background:#fff8e8; border-radius:6px; border:1px solid #d4a96a; }
      .cdt-carac-icone { font-size:1.5em; width:32px; flex-shrink:0; }
      .cdt-carac-label { width:110px; font-weight:bold; color:#5a2a2a; font-size:1em; flex-shrink:0; }
      .cdt-carac-stepper { display:flex; align-items:center; gap:10px; flex-shrink:0; }
      .cdt-carac-stepper button { width:32px; height:32px; border:none; background:#8b4513; color:#fff; border-radius:50%; cursor:pointer; font-size:1.2em; line-height:1; }
      .cdt-carac-val { width:32px; text-align:center; font-weight:bold; font-size:1.3em; color:#5a2a2a; }
      .cdt-carac-info { color:#888; font-size:0.9em; }
      .cdt-info-box { margin-top:14px; padding:12px 16px; background:#fff8e8; border:1px solid #8b4513; border-radius:4px; color:#5a2a2a; font-size:1em; line-height:1.6; }

      /* Étape 3 — Profession */
      .cdt-choix-grid { display:grid; grid-template-columns:repeat(4, 1fr); gap:12px; margin:14px 0; }
      .cdt-choix-grid.cdt-grid-3 { grid-template-columns:repeat(3, 1fr); }
      .cdt-choix-grid.cdt-grid-2 { grid-template-columns:repeat(2, 1fr); }
      .cdt-choix-btn { padding:16px 12px; border:2px solid #d4a96a; background:#fff8e8; border-radius:8px; cursor:pointer; text-align:center; font-size:1em; color:#5a2a2a; transition:all 0.15s; line-height:1.5; width:100%; }
      .cdt-choix-btn small { display:block; font-size:0.82em; color:#888; margin-top:6px; line-height:1.4; }
      .cdt-choix-btn:hover { background:#f0d080; border-color:#8b4513; }
      .cdt-choix-btn.selected { background:#8b4513; color:#fff; border-color:#5a2a2a; }
      .cdt-choix-btn.selected small { color:#f0d080; }
      .cdt-btn-reset { margin-top:12px; padding:8px 16px; background:#5a2a2a; color:#d4a96a; border:none; border-radius:4px; cursor:pointer; font-size:0.95em; }
      .cdt-recap-profession { padding:18px; background:#fff8e8; border:2px solid #8b4513; border-radius:8px; line-height:1.9; font-size:1em; }
      .cdt-recap-profession h3 { margin:0 0 12px 0; color:#5a2a2a; font-size:1.15em; }

      /* Étape 4 — Milieu d'origine */
      .cdt-milieux-grid { display:grid; grid-template-columns:repeat(2, 1fr); gap:16px; margin:14px 0; }
      .cdt-milieu-btn { padding:28px 24px; border:2px solid #d4a96a; background:#fff8e8; border-radius:10px; cursor:pointer; text-align:center; color:#5a2a2a; transition:all 0.15s; display:flex; flex-direction:column; align-items:center; gap:10px; width:100%; }
      .cdt-milieu-titre { font-weight:bold; font-size:1.2em; display:flex; align-items:center; justify-content:center; gap:8px; }
      .cdt-milieu-desc { font-size:1em; color:#666; line-height:1.6; text-align:center; }
      .cdt-milieu-bonus { font-size:1em; color:#c8860a; font-weight:bold; }
      .cdt-milieu-btn:hover { background:#f0d080; border-color:#8b4513; }
      .cdt-milieu-btn.selected { background:#8b4513; color:#fff; border-color:#5a2a2a; }
      .cdt-milieu-btn.selected .cdt-milieu-desc { color:#f0d080; }
      .cdt-milieu-btn.selected .cdt-milieu-bonus { color:#ffe080; }

      /* Étape 5 — Expérience */
      .cdt-filtres { display:flex; flex-wrap:wrap; gap:6px; margin-bottom:12px; }
      .cdt-filtre-btn { padding:5px 12px; border:1px solid #d4a96a; background:#fff8e8; border-radius:12px; cursor:pointer; font-size:0.9em; color:#5a2a2a; }
      .cdt-filtre-btn.active { background:#8b4513; color:#fff; }
      .cdt-exp-liste { display:flex; flex-direction:column; gap:6px; max-height:400px; overflow-y:auto; padding-right:4px; }
      .cdt-exp-btn { padding:10px 14px; border:1px solid #d4a96a; background:#fff8e8; border-radius:6px; cursor:pointer; text-align:left; font-size:0.95em; color:#5a2a2a; line-height:1.5; }
      .cdt-exp-btn:hover { background:#f0d080; }
      .cdt-exp-btn.selected { background:#8b4513; color:#fff; border-color:#5a2a2a; }

      /* Étape 6 — Rituel & Déclencheur */
      .cdt-deux-colonnes { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
      .cdt-rituel-liste, .cdt-declencheur-liste { display:flex; flex-direction:column; gap:5px; max-height:360px; overflow-y:auto; padding-right:4px; }
      .cdt-rituel-btn, .cdt-dec-btn { padding:8px 12px; border:1px solid #d4a96a; background:#fff8e8; border-radius:4px; cursor:pointer; text-align:left; font-size:0.92em; color:#5a2a2a; line-height:1.4; }
      .cdt-rituel-btn:hover, .cdt-dec-btn:hover { background:#f0d080; }
      .cdt-rituel-btn.selected, .cdt-dec-btn.selected { background:#8b4513; color:#fff; }

      /* Étape 7 — Folie */
      .cdt-folie-choix { display:flex; gap:16px; margin:20px 0; }
      .cdt-folie-btn { flex:1; padding:22px 20px; border:2px solid #d4a96a; background:#fff8e8; border-radius:8px; cursor:pointer; text-align:center; color:#5a2a2a; line-height:1.6; }
      .cdt-folie-btn b { display:block; font-size:1.15em; margin-bottom:8px; }
      .cdt-folie-btn small { display:block; font-size:0.9em; color:#666; }
      .cdt-folie-btn:hover { background:#f0d080; }
      .cdt-folie-btn.selected { background:#8b4513; color:#fff; border-color:#5a2a2a; }
      .cdt-folie-btn.selected small { color:#f0d080; }
      .cdt-revelation-note { margin-top:16px; padding:14px 16px; background:#fff8e8; border:1px solid #8b4513; border-radius:4px; color:#555; font-size:0.95em; line-height:1.6; }

      /* Étape 8 — Récap */
      .cdt-recap-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
      .cdt-recap-section { padding:20px 22px; background:#fff8e8; border:1px solid #d4a96a; border-radius:8px; }
      .cdt-recap-section h3 { margin:0 0 14px 0; color:#8b4513; font-size:1.15em; border-bottom:1px solid #d4a96a; padding-bottom:8px; display:flex; align-items:center; gap:6px; }
      .cdt-recap-section p { margin:9px 0; font-size:1em; color:#5a2a2a; line-height:1.6; }
      .cdt-alerte { margin-top:14px; padding:12px; background:#ffd0d0; border:1px solid #8b0000; border-radius:4px; color:#8b0000; font-weight:bold; font-size:1em; }

      /* Commun */
      .cdt-champ-nom { margin-bottom:18px; }
      .cdt-champ-nom label { display:block; font-weight:bold; color:#5a2a2a; margin-bottom:6px; font-size:1em; }
      .cdt-champ-nom input { width:100%; padding:10px; border:1px solid #d4a96a; border-radius:4px; font-size:1.05em; background:#fff8e8; box-sizing:border-box; }
      #cdt-dec-custom { width:100%; padding:8px; border:1px solid #d4a96a; border-radius:4px; background:#fff8e8; margin-top:6px; box-sizing:border-box; font-size:0.95em; }
    `;
  }
}

// Le bouton de création est géré dans chants-de-tindalos.js
