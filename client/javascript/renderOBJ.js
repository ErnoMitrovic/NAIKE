// Author: Ernesto Miranda Solis
// Date: February 28, 2023
// Description: Three js for 3D OBJ rendering
// Adding 3D OBJ to server

import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

// Scene configs
const scene = new THREE.Scene();
const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
scene.add( ambientLight );

camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 2, 200);
scene.add(camera);

const loader = new OBJLoader();
loader.load(
    "../objs/shoe.obj",
    (obj) => {
        scene.add(obj)
        const p = document.createElement('p')
        const txt = document.createTextNode('Success');
        p.appendChild(txt);
        document.body.appendChild(p);
    },
    (xhr) => {
        const p = document.createElement('p');
        const txt = document.createTextNode((xhr.loaded / xhr.total * 100 ) + '% loaded');
        p.appendChild(txt);
        document.body.appendChild(p);
    },
    (error) => {
        const p = document.createElement('p')
        const txt = document.createTextNode(error.message);
        p.appendChild(txt);
        document.body.appendChild(p);
    }
    );

const texture = new THREE.TextureLoader().load('./img.jpg',
(t) => {
    texture = t;
    const p = document.createElement('p')
    const txt = document.createTextNode('Success texture');
    p.appendChild(txt);
    document.body.appendChild(p);
}, undefined, (error) => {
    const p = document.createElement('p')
    const txt = document.createTextNode('Could not load texture ' + error.message);
    p.appendChild(txt);
    document.body.appendChild(p);
});
const boxGeometry = new THREE.BoxGeometry(20, 20, 20);
const boxMaterial = new THREE.MeshBasicMaterial({map: texture});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

renderer.render(scene, camera);

document.body.appendChild(renderer.domElement);