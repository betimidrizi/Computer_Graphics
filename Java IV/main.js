import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000
);
camera.position.set(0, 0, 5);

// Shtimi i nje kubi
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff00
    });
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.position.set(-2, 0, -2);

scene.add(boxMesh);

// Shtimi i nje kubi te dyte
const box1Material = new THREE.MeshBasicMaterial({
        color: 0x00ff00
    });
const box1Mesh = new THREE.Mesh(boxGeometry, box1Material);
boxMesh.position.set(2, 0, 0);
scene.add(box1Mesh);