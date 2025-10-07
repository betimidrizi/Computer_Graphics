import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(     
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000 
);
camera.position.z = 20;

// Cube
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const cubeMesh = new THREE.Mesh(geometry, material);

// Sphere
const spheregeometry = new THREE.SphereGeometry(1, 32, 32);
const spherematerial = new THREE.MeshStandardMaterial({ 
    color: 0x00ff00, 
    wireframe: true 
});
const spherecubeMesh = new THREE.Mesh(spheregeometry, spherematerial);

// Cone
const conegeometry = new THREE.ConeGeometry(2, 5, 32); 
const conematerial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
const cone = new THREE.Mesh(conegeometry, conematerial);

// Add to scene
scene.add(cubeMesh);
scene.add(spherecubeMesh);
scene.add(cone);

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 3);
scene.add(light);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Positioning
cubeMesh.position.set(-5, 0, 0);
spherecubeMesh.position.set(5, 2, 1);
cone.position.set(0, -3, 0);

let direction = 1; 
let speed = 0.1;   // movement speed

// Animate
function animate() {
    requestAnimationFrame(animate);

    // Cube rotates
    cubeMesh.rotation.x += 0.02;
    cubeMesh.rotation.y += 0.05;
    cubeMesh.rotation.z += 0.03;

    // Sphere bounces
    spherecubeMesh.position.y = 2 + Math.sin(Date.now() * 0.003) * 2;

    // Cone moves left and right
    cone.position.x += direction * speed;

    // Reverse direction if it reaches edges
    if (cone.position.x > 8 || cone.position.x < -8) {
        direction *= -1;
    }

    renderer.render(scene, camera);
}

animate();

// update