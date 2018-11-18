
var camera;


function createCamera() {
    'use strict';
    camera1 = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera1.position.set(-40,40,50 );

}