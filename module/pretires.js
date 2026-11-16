// ================================================
// PRÉ-TIRÉS — import automatique dans le monde
// Les Chants de Tindalos — Foundry VTT v14
// ------------------------------------------------
// Au premier lancement d'un monde (MJ), les personnages du kit de découverte
// (fichiers packs/*.json) sont importés dans un dossier « 👥 Pré-tirés »,
// leurs compétences converties en items. Relançable via CDT.importerPretires(true).
// ================================================

import { itemsDepuisCompetencesLegacy } from "./competences.js";

const CDT_PRETIRES_FICHIERS = [
  "nora-haddad",
  "delphine-malesherbes",
  "archie-hunter",
  "genevieve-de-bouvines",
  "issac-haddad",
];
const CDT_PRETIRES_DOSSIER = "👥 Pré-tirés";

async function importerPretires(force = false) {
  if (!game.user.isGM) return 0;
  if (!force && game.settings.get("chants-de-tindalos", "pretiresImportes")) return 0;

  // Dossier de destination
  let dossier = game.folders.find(f => f.type === "Actor" && f.name === CDT_PRETIRES_DOSSIER);
  if (!dossier) dossier = await Folder.create({ name: CDT_PRETIRES_DOSSIER, type: "Actor", color: "#3d1a1a" });

  const docs = await (game.packs.get("chants-de-tindalos.competences")?.getDocuments() ?? []);
  let nb = 0;

  for (const fichier of CDT_PRETIRES_FICHIERS) {
    try {
      const data = await foundry.utils.fetchJsonWithTimeout(`systems/chants-de-tindalos/packs/${fichier}.json`);
      if (!data?.name) continue;
      if (game.actors.some(a => a.name === data.name)) continue; // déjà présent

      const legacy = data.system?.competences ?? {};
      delete data.system?.competences;
      const items = itemsDepuisCompetencesLegacy(legacy, docs, { inclureZero: false });

      await Actor.create({
        ...data,
        folder: dossier.id,
        items,
        flags: { "chants-de-tindalos": { competencesMigrees: true } },
      });
      nb++;
    } catch (e) {
      console.error(`CDT | Import du pré-tiré ${fichier} :`, e);
    }
  }

  await game.settings.set("chants-de-tindalos", "pretiresImportes", true);
  if (nb) ui.notifications.info(`👥 ${nb} personnage(s) pré-tiré(s) importé(s) dans le dossier « ${CDT_PRETIRES_DOSSIER} ».`);
  console.log(`CDT | Pré-tirés : ${nb} importé(s).`);
  return nb;
}

Hooks.once("init", () => {
  game.settings.register("chants-de-tindalos", "pretiresImportes", {
    name: "Pré-tirés importés",
    scope: "world",
    config: false,
    type: Boolean,
    default: false,
  });
  globalThis.CDT = globalThis.CDT ?? {};
  globalThis.CDT.importerPretires = importerPretires;
});

// Après competences.js (compendium prêt) : ordre garanti par esmodules dans system.json
Hooks.once("ready", async () => {
  if (!game.user.isGM) return;
  // Laisse le temps au compendium des compétences de s'initialiser
  await new Promise(r => setTimeout(r, 1000));
  try { await importerPretires(false); }
  catch (e) { console.error("CDT | Import des pré-tirés :", e); }
});

export { importerPretires };
