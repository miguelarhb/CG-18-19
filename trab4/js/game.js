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



function createScene() {
    'use strict';
    scene = new THREE.Scene();
    scene.add(new THREE.AxisHelper(10));
    //createSun();
    //createholophote();
    board = new Floor(0,0,0);
    rubix= new Cube(0,10,0);
    pool_ball= new Ball(-30,5,15);
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






function onKeyUp(){

    for (var i = 37; i <= 40; i++) {
       
    }
  

}

function onKeyDown(e) {
    'use strict';
    
    switch (e.keyCode) {
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
    var controls = new THREE.OrbitControls(camera);
   
    render();
    onResize();
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';
    render();
    //controls.update();
    requestAnimationFrame(animate);
}
