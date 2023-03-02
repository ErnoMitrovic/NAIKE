// Author: Ernesto Miranda Solis
// Date: February 28, 2023
// Description: Three js for 3D OBJ rendering
// Adding 3D OBJ to server

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const renderer = new THREE.WebGLRenderer();
let object;

// Rendered texture
const loadingModel = () =>{
    object.traverse( (child) => {
        if(child.isMesh) child.material.map = texture;
    })
	scene.add( object );
}

// Model callbacks
const onProgress = (xhr) => {
    if ( xhr.lengthComputable ) {

        const p = document.createElement('p');
        
        const percentComplete = xhr.loaded / xhr.total * 100;
        // console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );
        const node = document.createTextNode('model ' + Math.round( percentComplete, 2 ) + '% downloaded');
        p.appendChild(node);
    }
}

// Needs to be async for texture and object rendering
const manager = new THREE.LoadingManager(loadingModel);
const textureLoader = new THREE.TextureLoader(manager);
const texture = textureLoader.load('../../server/imgs/original.png'); // For debug

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// Scene configs
const scene = new THREE.Scene();
const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
scene.add( ambientLight );

camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 2, 200);
scene.add(camera);

const loader = new GLTFLoader(manager);
loader.load(
    'C:/Users/ernom/Downloads/6e48z1kc7r40-bugatti/bugatti/bugatti.gltf', 
    (obj) => { 
        object = obj 
        const p = document.createElement('p');
        const node = document.createTextNode('Success');
        p.appendChild(node);
        document.body.appendChild(p);
    },
    onProgress,
    (event) => {
        const p = document.createElement('p');
        const node = document.createTextNode(event.message);
        p.appendChild(node);
        document.body.appendChild(p);
    }
);

const boxGeometry = new THREE.BoxGeometry(40, 40, 40);
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

renderer.render(scene, camera);