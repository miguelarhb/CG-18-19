/*global THREE, requestAnimationFrame, console*/

var camera, scene, renderer;
var wWidth = window.innerWidth;
var wHeight = window.innerHeight;
var geometry, material, mesh;
var map={78:false,76:false,71:false}
var cubo, floor;
var sun, ambientLight;
var WireFrame = false;

function createObject() {
    'use strict';
    cubo = new THREE.Object3D();
    material = new THREE.MeshPhongMaterial({ color: 0xff0000, wireframe: WireFrame });
    geometry = new THREE.CubeGeometry(10, 10, 10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    cubo.add(mesh);
    scene.add(cubo);
    cubo.position.x = 0;
    cubo.position.y = 10;
    cubo.position.z = 0;
}

function createFloor() {
    'use strict';
    floor = new THREE.Object3D();
    material = new THREE.MeshPhongMaterial({ color: 0xffffff, wireframe: WireFrame });
    geometry = new THREE.CubeGeometry(100, 1, 100);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    mesh.receiveShadow = true;
    floor.add(mesh);
    scene.add(floor);
    floor.position.x = 0;
    floor.position.y = 0;
    floor.position.z = 0;
}

function createScene() {
    'use strict';

    scene = new THREE.Scene();

    scene.add(new THREE.AxisHelper(10));
    createObject();
    createFloor();
    createSun();
}

function createCamera() {
    'use strict';
    camera = new THREE.PerspectiveCamera( 45, wWidth / wHeight, 1, 1000);
    camera.position.y = 30;
    camera.position.z = 35;
    camera.position.x = 30;
}

function render() {
    'use strict';
    renderer.render(scene, camera);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;
}

function createSun(){
    ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    sun = new THREE.DirectionalLight(0xffffff, 0.5);
    sun.position.set( 0, 35, 0);
    sun.castShadow = true;
    scene.add(sun);
}

function switchIlumination(){
    var flag = ambientLight.visible;
    ambientLight.visible = !flag;
    sun.visible = !flag;
}

function switchMaterial(){
    if (cubo.isMeshPhongMaterial == true) {
      material = new THREE.MeshLambertMaterial({ color: 0xff0000, wireframe: WireFrame });
    }
    else {
      material = new THREE.MeshPhongMaterial({ color: 0xff0000, wireframe: WireFrame });
    }
}

function switchSun(){
  if (ambientLight.visible == true){
    sun.visible = !sun.visible;
  }
}

function onKeyDown(e) {
    'use strict';

    map[e.keyCode]=true;

    switch (e.keyCode) {
      case 78: //N
        switchSun();
        break;
      case 76: //L
        switchIlumination();
        break;
      case 71: //G
        switchMaterial();
        break;
    }
}

function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.setSize(wWidth, wHeight);
    document.body.appendChild(renderer.domElement);
    createScene();

    createCamera();
    camera.lookAt(scene.position);
    render();
    window.addEventListener("keydown", onKeyDown);
}

function animate() {
    'use strict';
    render();
    requestAnimationFrame(animate);
}
