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
<<<<<<< HEAD
var menu;
var controls;
var paused=false;
=======
>>>>>>> f09dd7b50c71fc1a64f7202b1dd161afea1f499e



function createScene() {
    'use strict';
    scene = new THREE.Scene();
    scene.add(new THREE.AxisHelper(10));
    //createSun();
    //createholophote();
    board = new Floor(0,0,0);
    rubix= new Cube(0,10,0);
    pool_ball= new Ball(-30,5,15);
<<<<<<< HEAD
    menu=new Pause(0,35,0);
    menu.visible=false;
    createSun();
    createholophote();

=======
    createSun();
    createholophote();



>>>>>>> f09dd7b50c71fc1a64f7202b1dd161afea1f499e
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
<<<<<<< HEAD
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
=======




>>>>>>> f09dd7b50c71fc1a64f7202b1dd161afea1f499e


function onKeyUp(){

    for (var i = 37; i <= 40; i++) {
       
    }
  

}

function onKeyDown(e) {
    'use strict';
    
    switch (e.keyCode) {
<<<<<<< HEAD

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


=======
    case 49: //1
        turn_on_off(holopho[0]);         

        break;
    case 50://2
        turn_on_off(holopho[1]);
 
        break;
    case 51://3
        turn_on_off(holopho[2]);  
        break;
    case 52://4
        turn_on_off(holopho[3]);
  
        break;
    case 53: //5
        camera=camera1;
        camera.lookAt(scene.position);
        break;
    case 54://6
        camera=camera2;
        camera.lookAt(scene.position);
        break;
    case 55://7
        camera=camera4;
        camera.lookAt(holopho[0].position);
        break;
    case 56://7
        camera=camera3;
        camera.lookAt(new THREE.Vector3(-100, 15, -2));
        break;
    case 69:  //E
    case 101: //e
        scene.traverse(function (node) {
            if (node instanceof THREE.AxisHelper) {
                node.visible = !node.visible;
            }
        });
        break;
/*    case 37://left
        teta=-1;
        console.log('rodar');
        plane.rotation.y+=teta*Math.PI/180; 

        break;
    case 39:
        teta=1;
        console.log('rodar');
        plane.rotation.y+=teta*Math.PI/180;
        break;
    case 40://down
        teta=-1;
        console.log('rodar');
        plane.rotation.z+=teta*Math.PI/180;
        break;
    case 38://up
        teta=1;
        console.log('rodar');
        plane.rotation.z+=teta*Math.PI/180;
        break;*/
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
>>>>>>> f09dd7b50c71fc1a64f7202b1dd161afea1f499e
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
<<<<<<< HEAD
    controls = new THREE.OrbitControls(camera);
    controls.update();
    controls.saveState();
=======
    var controls = new THREE.OrbitControls(camera);
>>>>>>> f09dd7b50c71fc1a64f7202b1dd161afea1f499e
   
    render();
    onResize();
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';
    render();
<<<<<<< HEAD
    controls.update();
    //console.log(camera.position);
    //controls.update();
    change_pause();

=======
    //controls.update();
>>>>>>> f09dd7b50c71fc1a64f7202b1dd161afea1f499e
    requestAnimationFrame(animate);
}
