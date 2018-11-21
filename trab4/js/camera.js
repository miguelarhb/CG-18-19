
var camera;


function createCamera() {
    'use strict';
    camera1 = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera1.position.set(-40,40,50 );

    camera2= new THREE.OrthographicCamera(wWidth / -2,  wWidth / 2, wHeight / 2, wHeight / -2 , 40, 10000);
    camera2.position.set(0,60,0);

}