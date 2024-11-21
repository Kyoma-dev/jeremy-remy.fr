// Récupérer la div où afficher le modèle
const container = document.getElementById('avatar');

// Création de la scène
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
camera.position.z = 3;

// Création du renderer
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.shadowMap.enabled = true; // Activer les ombres
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputEncoding = THREE.sRGBEncoding; // Encodage sRGB
renderer.toneMappingExposure = 1.2; // Ajuster l'exposition
container.appendChild(renderer.domElement);

// Lumières
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.8);
hemisphereLight.position.set(0, 20, 0);
scene.add(hemisphereLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 500;
directionalLight.shadow.bias = -0.0001; // Ajuster le biais
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2); // Ajouter une lumière ambiante
scene.add(ambientLight);

// Plan pour recevoir les ombres
const planeGeometry = new THREE.PlaneGeometry(500, 500);
const planeMaterial = new THREE.ShadowMaterial({ color: 0x000000, opacity: 0.1 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -1;
plane.receiveShadow = true;
scene.add(plane);

// Variables pour l'animation
let mixer;
const clock = new THREE.Clock();

// Charger le modèle GLB
const loader = new THREE.GLTFLoader();
loader.load(
  modelUrl,
  (gltf) => {
    const model = gltf.scene;
    model.scale.set(1.5, 1.5, 1.5);
    model.position.y = -1;

    // Activer les ombres et ajuster les matériaux
    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          // Convertir en MeshStandardMaterial si nécessaire
          if (!(child.material instanceof THREE.MeshStandardMaterial)) {
            const oldMaterial = child.material;
            child.material = new THREE.MeshStandardMaterial();
            child.material.map = oldMaterial.map;
            child.material.needsUpdate = true;
          }

          // Ajuster les propriétés du matériau
          child.material.color.set(0xffffff);
          child.material.roughness = 0.5;
          child.material.metalness = 0.1;
          child.material.needsUpdate = true;

          // Si la texture est utilisée, définir l'encodage
          if (child.material.map) {
            child.material.map.encoding = THREE.sRGBEncoding;
          }
        }
      }
    });

    scene.add(model);

    // Initialiser l'AnimationMixer
    mixer = new THREE.AnimationMixer(model);

    // Vérifier si des animations sont disponibles
    if (gltf.animations && gltf.animations.length > 0) {
      const action = mixer.clipAction(gltf.animations[0]);
      action.play();
    } else {
      console.warn('Aucune animation trouvée dans le modèle.');
    }

    // Démarrer la boucle d'animation
    animate();
  },
  undefined,
  (error) => {
    console.error('Erreur lors du chargement du modèle GLB :', error);
  }
);

// Fonction d'animation
function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();

  if (mixer) {
    mixer.update(delta);
  }

  renderer.render(scene, camera);
}

// Gérer le redimensionnement de la fenêtre
window.addEventListener('resize', () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});
