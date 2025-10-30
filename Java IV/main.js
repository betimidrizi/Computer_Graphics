import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { contain } from 'three/src/extras/TextureUtils.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000
);

camera.position.set(0, 2, 3);
camera.lookAt(0, 0, 0);

// Sphere 1
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const sphere1 = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere1.position.set(-2, 0, -2);
scene.add(sphere1);

// Sphere 2
const sphereMaterial2 = new THREE.MeshPhongMaterial({ color: 0x0000ff });
const sphere2 = new THREE.Mesh(sphereGeometry, sphereMaterial2);
sphere2.position.set(2, 0, 0);
scene.add(sphere2);

// Directional light (main)
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// Point light at bottom-left
const pointLight = new THREE.PointLight(0xffaa00, 2, 50);
pointLight.position.set(-5, -3, 2);
scene.add(pointLight);

// Optional: small helper sphere to visualize light position
const lightHelperGeometry = new THREE.SphereGeometry(0.1, 16, 16);
const lightHelperMaterial = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
const lightHelper = new THREE.Mesh(lightHelperGeometry, lightHelperMaterial);
lightHelper.position.copy(pointLight.position);
scene.add(lightHelper);

const spotlight = new THREE.SpotLight(0x00ff00, 5);
spotlight.position.set(0, 5, 5);
spotlight.angle = Math.PI / 6;
spotlight.penumbra = 0.2;
spotlight.decay = 2;
spotlight.distance = 50;
spotlight.target = sphere1;
scene.add(spotlight);
scene.add(spotlight.target);

// Renderer
const container = document.getElementById('scene1');
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
