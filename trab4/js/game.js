/*global THREE, requestAnimationFrame, console*/

var camera, scene,scene2, renderer;
var camera1, camera2,camera3,camera4,camera_pause;
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
var moving=true;
var clock = new THREE.Clock();





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
    camera.aspect=aspect;
    camera.updateProjectionMatrix();
    renderer.setSize(wWidth, wHeight);
    camera.lookAt(scene.position);
    camera_pause.lookAt(scene2.position);
}


function pause_game(){
	menu.visible=!menu.visible;
	paused=!paused;
    
	if(paused==true){
        moving=false;
        clock.stop();
        pool_ball.pause();
    }
	if(paused==false){
        moving=true;
        pool_ball.continue();
        clock.start();
		
    }
}


function pause_ball(){
    if(!paused)
        moving=!moving;
    if(moving){
        clock.start();
        pool_ball.continue();
    }
    else{
        clock.stop();
        pool_ball.pause();
    }
}
function reset_game(){
	
	if(paused==true){
        clock.start();
        pool_ball.continue();
		controls.reset();
		pool_ball.reset();
		menu.visible=!menu.visible;
		turn_all_on();
	}
	paused=false;
}


function onKeyUp(){

    for (var i = 37; i <= 40; i++) {
       
    }
  

}
function switchWireframes(){
    rubix.wireframe();
    pool_ball.wireframe();
    board.wireframe();
}
function onKeyDown(e) {
    'use strict';
    
    switch (e.keyCode) {

    case 68:
    case 108: //D
    	if(paused==false)
        	switchSun();
        break;
    case 112:
    case 80: //P
    	if(paused==false){
        	turn_on_off();
        }
        break;

    case 76: //L
    	if(paused==false)
        	switchIlumination();
        break; 
    case 83: //S
    	pause_game();
    	break;

    case 82: //R
    	reset_game();
    	break;

    case 87: //W
        switchWireframes();
        break;
    case 66: //B
        pause_ball();
        break;


    }


}

function update_game(){
    controls.update();
    if(clock.running){
        delta= clock.getDelta();
        pool_ball.update(delta);
    }
}

function createScene() {
    'use strict';
    scene = new THREE.Scene();
    scene.add(new THREE.AxisHelper(10));
    scene2=new THREE.Scene();
    //createSun();
    //createholophote();
    board = new Floor(0,0,0);
    rubix= new Cube(0,10,0);
    pool_ball= new Ball(-30,5,30);
    menu=new Pause(0,10,0);
    menu.visible=false;
    createSun();
    createholophote();

}


function render() {
    'use strict';
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    renderer.autoClear = false;
    renderer.clear();
    renderer.setViewport( 0, 0, window.innerWidth, window.innerHeight );
    renderer.render(scene, camera);
    renderer.clearDepth();
    renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
    renderer.render(scene2,camera_pause);

    //change_pause();
}

function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.shadowMap.enabled = true;
    renderer.autoClear = false;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    createScene();
    createCamera();

    camera=camera1;
    camera.lookAt(scene.position);
    camera_pause=camera2;
    
    controls = new THREE.OrbitControls(camera);
    controls.update();
    controls.saveState();

    camera.updateMatrixWorld ( false );
    camera_pause.updateMatrixWorld ( false );

    render();
    onResize();
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
    
}

function animate() {
    'use strict';
    render();
    update_game();
    

    requestAnimationFrame(animate);
}
