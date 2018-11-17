
var camera;


function createCamera() {
    'use strict';
    camera1 = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera1.position.set(-40,40,50 );

    camera2 = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight,0.1, 10000);
    camera2.position.z = 150;
    camera2.position.x = 100;
    camera2.position.y = 100;
    camera4 = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight,0.1, 10000);
    camera4.position.z = 40;
    camera4.position.x = -90;
    camera4.position.y = 100;
    camera3=new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera3.position.y=13;
    camera3.position.x=-100;
    camera3.position.z=-65;

}