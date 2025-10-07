import * as THREE from 'three';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // Sky blue

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 15, 30);
camera.lookAt(0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 20, 10);
scene.add(directionalLight);

// Ground (green)
const groundGeometry = new THREE.PlaneGeometry(60, 60);
const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x2e8b57 }); // green
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Road (gray)
const roadGeometry = new THREE.BoxGeometry(4, 0.1, 25);
const roadMaterial = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });
const road = new THREE.Mesh(roadGeometry, roadMaterial);
road.position.set(0, 0.05, 1);
scene.add(road);

// Houses (yellow boxes)
const houseGeometry = new THREE.BoxGeometry(5, 3, 3);
const houseMaterial = new THREE.MeshPhongMaterial({ color: 0xffd700 }); // yellow
const house1 = new THREE.Mesh(houseGeometry, houseMaterial);
house1.position.set(-8, 1.5, 4);

const house2 = new THREE.Mesh(houseGeometry, houseMaterial);
house2.scale.set(0.7, 0.7, 0.9);
house2.position.set(-8, 1.1, -3);

const house3 = new THREE.Mesh(houseGeometry, houseMaterial);
house3.scale.set(0.7, 0.7, 0.9);
house3.position.set(-8, 1.1, 10);

scene.add(house1);
scene.add(house2);
scene.add(house3);


// Trees (green spheres + brown cylinders)
const treeMaterial = new THREE.MeshPhongMaterial({ color: 0x006400 });
const trunkMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 });

for (let i = 0; i < 6; i++) {
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.3, 2),
    trunkMaterial
  );
  trunk.position.set(6, 1, -8 + i * 4);

  const leaves = new THREE.Mesh(
    new THREE.SphereGeometry(1, 16, 16),
    treeMaterial
  );
  leaves.position.set(6, 3, -8 + i * 4);

  scene.add(trunk);
  scene.add(leaves);
}

// Render loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
