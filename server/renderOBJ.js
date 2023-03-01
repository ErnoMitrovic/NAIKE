// Author: Ernesto Miranda Solis
// Date: February 28, 2023
// Description: Three js for 3D OBJ rendering
// Adding 3D OBJ to server

import * as THREE from 'three'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Instantiate canvas
var scene = new THREE.Scene();
var camera = new THREE.Camera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

// Instantiate renderer
const WIDTH = window.innerWidth, HEIGHT = window.innerHeight;
var renderer = new THREE.WebGLRenderer();
renderer.setSize(WIDTH, HEIGHT);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial( {color: 0x00ff00});

camera.position.z = 5;

// Set controls
var controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.campingFactory = 0.25;
controls.enableZoom = true;

var animate = () => {
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
}

animate();

// Instantiate loader
const loader = new OBJLoader();
loader.setPath('./objs/');

loader.load(
    // resource url
    'superstarOBJ.obj',
    (object) => {
        object.position.y -= 60; 
        scene.add(object);
    },
    function(xhr){
        console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
    },
    function(error){
        console.log('An error happened');
    }
);