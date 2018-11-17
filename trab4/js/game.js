/*global THREE, requestAnimationFrame, console*/

var camera, scene, renderer;
var camera1, camera2,camera3,camera4;
var wWidth = window.innerWidth;
var wHeight = window.innerHeight;
var originalAspect = wWidth / wHeight;
var holopho=new Array();
var ambientLight;
var phong=1;
var rubix;
var pool_ball;
var board;
var menu;
var controls;
var paused=false;



function createScene() {
    'use strict';
    scene = new THREE.Scene();
    scene.add(new THREE.AxisHelper(10));
    //createSun();
    //createholophote();
    board = new Floor(0,0,0);
    rubix= new Cube(0,10,0);
    pool_ball= new Ball(-30,5,15);
    menu=new Pause(0,35,0);
    menu.visible=false;
    createSun();
    createholophote();

}



function onResize() {
    'use strict';
    var sceneSize = 300;
    wWidth = window.innerWidth;
    wHeight = window.innerHeight;
    var aspect = wWidth / wHeight;
    var change = originalAspect / aspect;
    var newSize = sceneSize * change;
    camera.left = -aspect * newSize / 2;
    camera.right = aspect * newSize  / 2;
    camera.top = newSize / 2;
    camera.bottom = -newSize / 2;
    camera.updateProjectionMatrix();
    renderer.setSize(wWidth, wHeight);
    camera.lookAt(scene.position);
}

function render() {
    'use strict';
    renderer.render(scene, camera);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
}
function pause_game(){
	menu.visible=!menu.visible;
}

function change_pause(){
	menu.change_position(camera);
	paused=true;
}

function reset_game(){
	if(paused==true){
		controls.reset();
		pool_ball.reset();
		menu.visible=!menu.visible;
		paused=false;

	}
}


function onKeyUp(){

    for (var i = 37; i <= 40; i++) {
       
    }
  

}

function onKeyDown(e) {
    'use strict';
    
    switch (e.keyCode) {

    case 68:
    case 108: //D
        switchSun();
        break;
    case 112:
    case 80: //P
    	pool_ball.position.set(30,5,15);
        turn_on_off();
        break;

    case 76: //L
        switchIlumination();
        break; 
    case 83: //S
    	pause_game();
    	break;
    case 82:
    	reset_game();

    }


}

function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    createScene();
    createCamera();
    camera=camera1;
    camera.lookAt(scene.position);
    controls = new THREE.OrbitControls(camera);
    controls.update();
    controls.saveState();
   
    render();
    onResize();
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';
    render();
    controls.update();
    //console.log(camera.position);
    //controls.update();
    change_pause();

    requestAnimationFrame(animate);
}
