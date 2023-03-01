// Author: Ernesto Miranda Solis
// Date: February 28, 2023
// Description: Three js for 3D OBJ rendering
// Adding 3D OBJ to server

import * as THREE from 'three'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function init(){

}

// Instantiate canvas
var scene = new THREE.Scene();
var camera = new THREE.Camera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
scene.add( ambientLight );
const pointLight = new THREE.PointLight( 0xffffff, 0.8 );
camera.add( pointLight );
scene.add( camera );

// Instantiate renderer
const WIDTH = window.innerWidth, HEIGHT = window.innerHeight;
var renderer = new THREE.WebGLRenderer();
renderer.setSize(WIDTH, HEIGHT);
document.body.appendChild(renderer.domElement);

// var geometry = new THREE.BoxGeometry(1, 1, 1);
// var material = new THREE.MeshBasicMaterial( {color: 0x00ff00});

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

/*
<script type="module">

			import * as THREE from 'three';

			import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

			let container;

			let camera, scene, renderer;

			let mouseX = 0, mouseY = 0;

			let windowHalfX = window.innerWidth / 2;
			let windowHalfY = window.innerHeight / 2;

			let object;

			init();
			animate();


			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
				camera.position.z = 250;

				// scene

				scene = new THREE.Scene();

				const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
				scene.add( ambientLight );

				const pointLight = new THREE.PointLight( 0xffffff, 0.8 );
				camera.add( pointLight );
				scene.add( camera );

				// manager

				function loadModel() {

					object.traverse( function ( child ) {

						if ( child.isMesh ) child.material.map = texture;

					} );

					object.position.y = - 95;
					scene.add( object );

				}

				const manager = new THREE.LoadingManager( loadModel );

				// texture

				// const textureLoader = new THREE.TextureLoader( manager );
				// const texture = textureLoader.load( 'textures/uv_grid_opengl.jpg' );

				// model

				function onProgress( xhr ) {

					if ( xhr.lengthComputable ) {

						const percentComplete = xhr.loaded / xhr.total * 100;
						console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );

					}

				}

				function onError() {}

				const loader = new OBJLoader( manager );
				loader.load( 'server/objs/supastarOBJ.obj', function ( obj ) {

					object = obj;

				}, onProgress, onError );

				//

				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				document.addEventListener( 'mousemove', onDocumentMouseMove );

				//

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function onDocumentMouseMove( event ) {

				mouseX = ( event.clientX - windowHalfX ) / 2;
				mouseY = ( event.clientY - windowHalfY ) / 2;

			}

			//

			function animate() {

				requestAnimationFrame( animate );
				render();

			}

			function render() {

				camera.position.x += ( mouseX - camera.position.x ) * .05;
				camera.position.y += ( - mouseY - camera.position.y ) * .05;

				camera.lookAt( scene.position );

				renderer.render( scene, camera );

			}

		</script>
*/