import * as THREE from './three.js-master/build/three.module.js';
import {OrbitControls} from './three.js-master/examples/jsm/controls/OrbitControls.js';
import { TextGeometry } from './three.js-master/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from './three.js-master/examples/jsm/loaders/FontLoader.js';
import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js';

//camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
const control = new OrbitControls(camera,renderer.domElement);
document.body.appendChild( renderer.domElement );

const gentilis = 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/fonts/gentilis_regular.typeface.json';
const helvetiker = 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/fonts/helvetiker_regular.typeface.json';
const optimer = 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/fonts/optimer_regular.typeface.json';

camera.position.set(16,12,-8);
camera.lookAt(0,0,0);   
scene.add(camera);

const a = new THREE.Euler( -0.39269908169, 1.57079632679, 0, 'XYZ' );


//change camera and turn spotlight on/off

var camNumber = 0;
var spotlightOn = 0;

let keyListener = (event) =>{
    let keyCode = event.keyCode;
    
    switch (keyCode) {
        case 87:
            
            if (camNumber == 0) {
                camera.position.set(0,2,-16);
                camera.lookAt(0,0,0);
                camNumber = 1;
            }
            else {
                camera.position.set(16,12,-8);
                camera.lookAt(0,0,0);
                camNumber = 0;
            }
            break;
        case 81:
            
            if (spotlightOn == 0) {
                spotLight.intensity = 0;
                spotlightOn = 1;
                }
            else {
                spotLight.intensity = 1;
                spotlightOn = 0;
            }
            break;
    
        default:

            break;
    }

    console.log(keyCode);
}

let addListener = () => {
    document.addEventListener("keydown",keyListener);
    //keydown
    //keyup
    //keypress
}

window.onload = () => {
    addListener();
}

//window resize
window.onresize = () => {
    const NEW_WIDTH = innerWidth
    const NEW_HEIGHT = innerHeight

    renderer.setSize(NEW_WIDTH, NEW_HEIGHT)

    camera.aspect = NEW_WIDTH / NEW_HEIGHT
    camera.updateProjectionMatrix()
}

//text
new FontLoader().load(helvetiker, font => {
    const text = new THREE.Mesh(
    new TextGeometry('Happy Birthday', {
        font: font,
        size: 0.25,
        height: 0.125
    }),
    new THREE.MeshStandardMaterial({color: 0xD65645})
   );
   text.position.set(-1,8, 0);
   text.rotateX(-45);
   scene.add(text);
});



//light 
    //ambient light
const ambientLight = new THREE.AmbientLight( 0xE8DC8B, 0.3);
scene.add( ambientLight );

    //spotlight
const spotLight = new THREE.SpotLight( 0xE8DC8B, 1, 1000 );
spotLight.position.set( 20, 30, 0 );
spotLight.rotation.set( 0.39269908169 );

spotLight.castShadow = true;

scene.add( spotLight );

// Table

    //TopPart
var TopPart = new THREE.CylinderGeometry (12,12,1.2,8)
const textureloader = new THREE.TextureLoader ()
var texture = textureloader.load("assets/textures/wood_texture.jpg")
var normal = textureloader.load("assets/textures/wood_normal.png")
var TopPartmaterial = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
    map: texture,
    normalMap: normal
})

var TopPartmesh = new THREE.Mesh(TopPart,TopPartmaterial)
TopPartmesh.castShadow = true
TopPartmesh.receiveShadow = true
scene.add(TopPartmesh)


    //LegPart
var LegPart = new THREE.CylinderGeometry (1,1,16,64)
const textureloader1 = new THREE.TextureLoader ()
var texture = textureloader1.load("assets/textures/wood_texture.jpg")
var normal = textureloader1.load("assets/textures/wood_normal.png")
var LegPartmaterial = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
    map: texture,
    normalMap: normal
})

var LegPartmesh = new THREE.Mesh(LegPart,LegPartmaterial)
LegPartmesh.position.set(0,-8,0) 
LegPartmesh.castShadow = true
LegPartmesh.receiveShadow = true

scene.add(LegPartmesh)

    //BottomPart
var BottomPart = new THREE.CylinderGeometry (5,5,1,8)
const textureloader2 = new THREE.TextureLoader ()
var texture = textureloader2.load("assets/textures/wood_texture.jpg")
var normal = textureloader2.load("assets/textures/wood_normal.png")
var BottomPartmaterial = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
    map: texture,
    normalMap: normal
})

var BottomPartmesh = new THREE.Mesh(BottomPart,BottomPartmaterial)
BottomPartmesh.position.set(0,-16,0) 
BottomPartmesh.castShadow = true
BottomPartmesh.receiveShadow = true

scene.add(BottomPartmesh)


// Cake
    //plate
const plate = new THREE.Mesh(
    new THREE.CylinderGeometry(7,7,0.5,64),
    new THREE.MeshPhongMaterial({
        shininess: 64
    })
);
    plate.position.set(0,1,0) 
    plate.receiveShadow= true;
    plate.castShadow = true;
    scene.add(plate);

    //bottomcake
const bottomCake = new THREE.Mesh(
	new THREE.CylinderGeometry(5,5,4,64),
	new THREE.MeshPhongMaterial({
		map: new THREE.TextureLoader().load('/assets/textures/frosting_texture.jpg'),
		normalMap: new THREE.TextureLoader().load('/assets/textures/frosting_normal.png')
	})
);
bottomCake.position.set(0,3,0);
bottomCake.castShadow = true;
bottomCake.receiveShadow = true;
//bottomCake.position.set();
scene.add(bottomCake);

    //topcake
const topCake = new THREE.Mesh(
	new THREE.CylinderGeometry(3,3,4,64),
	new THREE.MeshPhongMaterial({
		map: new THREE.TextureLoader().load('/assets/textures/frosting_texture.jpg'),
		normalMap: new THREE.TextureLoader().load('/assets/textures/frosting_normal.png')
	})
);
topCake.position.set(0,6,0);
topCake.castShadow = true;
topCake.receiveShadow = true;
//topCake.position.set();
scene.add(topCake);

    
//Decoration
    //chocolate ball
function createBall() {
    var chocolateBall = new THREE.Group();
    
    const ball = new THREE.Mesh(
        new THREE.SphereGeometry(0.3,32,32),
        new THREE.MeshPhongMaterial({
            color: 0x5E350C
        })
    );
    ball.position.set(0,8.2,2);
    ball.castShadow = true;
    ball.receiveShadow = true;
    chocolateBall.add(ball);

    const cream = new THREE.Mesh(
        new THREE.TorusGeometry(0.3, 0.3, 30, 64),
        new THREE.MeshPhongMaterial( 0xffffff )
    );
    cream.rotation.set(1.57079632679,0,0);
    cream.position.set(0,7.9,2);
    cream.castShadow = true;
    cream.receiveShadow = true;
    chocolateBall.add(cream);

    return chocolateBall;
}
    //upper layer
const chocolateball1 = createBall();
chocolateball1.position.set(0,0,-3.5);
scene.add(chocolateball1);

const chocolateball2 = createBall();
chocolateball2.position.set(-1,0,0);
scene.add(chocolateball2);

const chocolateball3 = createBall();
chocolateball3.position.set(1,0,0);
scene.add(chocolateball3);

const chocolateball4 = createBall();
chocolateball4.position.set(2,0,-2);
scene.add(chocolateball4);

const chocolateball5 = createBall();
chocolateball5.position.set(-2,0,-2);
scene.add(chocolateball5);

    //lower layer
const chocolateball6 = createBall();
chocolateball6.position.set(-4,-3,-2);
scene.add(chocolateball6);

const chocolateball7 = createBall();
chocolateball7.position.set(4,-3,-2);
scene.add(chocolateball7);

const chocolateball8 = createBall();
chocolateball8.position.set(0,-3,2);
scene.add(chocolateball8);

const chocolateball9 = createBall();
chocolateball9.position.set(0,-3,-6);
scene.add(chocolateball9);

//Candle
function createCandle() {
    var candleGroup = new THREE.Group();
       //top part
    const topPart = new THREE.Mesh(
        new THREE.ConeGeometry(0.05,0.1,64),
        new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load('/assets/textures/candle_texture.jpg')
        })
    );
    topPart.castShadow = true;
    topPart.receiveShadow = true;
    topPart.position.set(0,8.5,2);
    candleGroup.add(topPart);

           //body part
     const bodyPart = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05,0.05,0.5,64),
        new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load('/assets/textures/candle_texture.jpg')
        })
    );
    bodyPart.castShadow = true;
    bodyPart.receiveShadow = true;
    bodyPart.position.set(0,8.2,2);
    candleGroup.add(bodyPart);

     const pointlight = new THREE.PointLight(
        0xE65C2C,
        1,
        8
    );
    pointlight.position.set(0,8.5,2);
    candleGroup.add(pointlight);
    return candleGroup;
}

const candle1 = createCandle();
scene.add(candle1);

const candle2 = createCandle();
candle2.position.set(-1.5,0,-1);
scene.add(candle2);

const candle3 = createCandle();
candle3.position.set(1.5,0,-1);
scene.add(candle3);

const candle4 = createCandle();
candle4.position.set(1,0,-3);
scene.add(candle4);

const candle5 = createCandle();
candle5.position.set(-1,0,-3);
scene.add(candle5);

//camera model
const loader = new GLTFLoader();


loader.load( './assets/3dmodel/model.gltf', function ( gltf ) {

	scene.add( gltf.scene );

    gltf.animations; // Array<THREE.AnimationClip>
	gltf.scene; // THREE.Group
	gltf.scenes; // Array<THREE.Group>
	gltf.cameras; // Array<THREE.Camera>
	gltf.asset; // Object
    gltf.scene.scale.set(7,7,7);
    gltf.scene.position.set(0,0,-30);


}, undefined, function ( error ) {

	console.error( error );

} );
	
//Skybox
{
    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
        './assets/skyboxes/Vasa/px.jpg',
        './assets/skyboxes/Vasa/nx.jpg',
        './assets/skyboxes/Vasa/py.jpg',
        './assets/skyboxes/Vasa/ny.jpg',
        './assets/skyboxes/Vasa/pz.jpg',
        './assets/skyboxes/Vasa/nz.jpg',
    ]);
    scene.background = texture;
}


//========================================================
function animate() {
	requestAnimationFrame( animate );


	renderer.render( scene, camera );
};

animate();
