// ================================================================
// Scène d'accueil — « Les Chants de Tindalos »
// Créée automatiquement par le MJ (image de couverture du système),
// activée à la création. Relançable : CDT.ouvrirSceneAccueil()
// ================================================================

const SYSTEME = "chants-de-tindalos";
const IMAGE = "systems/chants-de-tindalos/assets/cover.webp";
const LARGEUR = 2480;
const HAUTEUR = 3508;

async function trouverOuCreerScene() {
  let scene = game.scenes.find((s) => s.getFlag(SYSTEME, "accueil"));
  if (scene) return { scene, creee: false };
  scene = await Scene.create({
    name: "Les Chants de Tindalos — Accueil",
    img: IMAGE,
    background: { src: IMAGE },
    width: LARGEUR,
    height: HAUTEUR,
    padding: 0,
    grid: { type: 0, size: 100 },
    tokenVision: false,
    fog: { exploration: false },
    navigation: true,
    navName: "Tindalos",
    flags: { [SYSTEME]: { accueil: true } },
  });
  return { scene, creee: true };
}

async function ouvrirSceneAccueil() {
  if (!game.user.isGM) return ui.notifications.warn("Seul le MJ peut activer la scène d'accueil.");
  const { scene } = await trouverOuCreerScene();
  await scene.activate();
  return scene;
}

Hooks.once("init", () => {
  game.settings.register(SYSTEME, "sceneAccueilCreee", {
    scope: "world", config: false, type: Boolean, default: false,
  });
  game.settings.register(SYSTEME, "sceneAccueilAuLancement", {
    name: "Réactiver la scène d'accueil à chaque lancement",
    hint: "Par défaut, la scène d'accueil n'est activée qu'à sa création. Cochez pour l'activer à chaque ouverture du monde (attention : cela remplace la scène en cours).",
    scope: "world", config: true, type: Boolean, default: false,
  });
});

Hooks.once("ready", async () => {
  globalThis.CDT = globalThis.CDT ?? {};
  globalThis.CDT.ouvrirSceneAccueil = ouvrirSceneAccueil;
  if (!game.user.isGM) return;
  try {
    const dejaCreee = game.settings.get(SYSTEME, "sceneAccueilCreee");
    const toujours = game.settings.get(SYSTEME, "sceneAccueilAuLancement");
    if (dejaCreee && !toujours) return;
    const { scene, creee } = await trouverOuCreerScene();
    if (creee || toujours) await scene.activate();
    if (!dejaCreee) await game.settings.set(SYSTEME, "sceneAccueilCreee", true);
  } catch (err) {
    console.error("CDT | Scène d'accueil :", err);
  }
});
