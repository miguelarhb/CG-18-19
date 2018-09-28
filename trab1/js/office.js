/*global THREE, requestAnimationFrame, console*/

var camera, scene, renderer;

var geometry, material, mesh;

var chair;


function addTableLeg(obj, x, y, z) {
    'use strict';

    geometry = new THREE.CylinderGeometry(2, 2, 20);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y - 3, z);
    obj.add(mesh);
}

function addTableTop(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(60, 2, 30);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addChairWheels(obj, x, y, z) {
    'use strict';
    geometry = new THREE.TorusGeometry(1, 0.3, 30);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    /*mesh.rotation.x=10;
    mesh.rotation.y=10;      ROTATION DAS RODAS
    mesh.rotation.z=10;*/
    obj.add(mesh);
}

function addChairBody(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(20, 10, 20);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addChairBack(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(20, 20, 5);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addChairLeg(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(2, 10, 2);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addLampBase(obj, x, y, z) {
    'use strict';
    geometry = new THREE.ConeGeometry(5, 3, 64);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x,y-3,z);
    obj.add(mesh);
}

function addLampCilinder(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CylinderGeometry(1, 1, 40, 64);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y - 3, z);
    obj.add(mesh);

}

function addLampTop(obj, x, y, z){
    'use strict';
    geometry = new THREE.ConeGeometry( 6, 6, 64);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x,y-3,z);
    obj.add(mesh);
}

function createTable(x, y, z) {
    'use strict';

    var table = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

    addTableTop(table, 0, 8, 0);
    addTableLeg(table, -25, 0, -10);
    addTableLeg(table, -25, 0, 10);
    addTableLeg(table, 25, 0, 10);
    addTableLeg(table, 25, 0, -10);

    scene.add(table);

    table.position.x = x;
    table.position.y = y;
    table.position.z = z;
}

function createChair(x, y, z) {
    'use strict';

    chair = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });

    addChairBody(chair, 0, 10, 0);
    addChairBack(chair, 0, 25, 7.5);
    addChairLeg(chair, -9, 0, -9);
    addChairLeg(chair, -9, 0, 9);
    addChairLeg(chair, 9, 0, 9);
    addChairLeg(chair, 9, 0, -9);
    addChairWheels(chair, -9, -5, -9);
    addChairWheels(chair, -9, -5, 9);
    addChairWheels(chair, 9, -5, 9);
    addChairWheels(chair, 9, -5, -9);

    scene.add(chair);

    chair.position.x = x;
    chair.position.y = y;
    chair.position.z = z;
}

function createLamp(x,y,z){
    'use strict'

    var lamp = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true });

    addLampCilinder(lamp, 8, 20, 8);
    addLampBase(lamp, 8, 0, 8);
    addLampTop(lamp, 8, 37.3, 8);

    scene.add(lamp);

    lamp.position.x = x;
    lamp.position.y = y;
    lamp.position.z = z;
}

function createScene() {
    'use strict';

    scene = new THREE.Scene();

    scene.add(new THREE.AxisHelper(10));

    createTable(0, 8, -30);
    createChair(0, 0, 0);
    createLamp(27, 0, -45);
}

function createCamera2() {
    'use strict';
    camera = new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = -125;
    camera.lookAt(scene.position);
}
function createCamera() {
    'use strict';
    camera = new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    camera.position.x = 0;
    camera.position.y = 125;
    camera.position.z = 0;
    camera.lookAt(scene.position);
}

function createCamera3() {
    'use strict';
    camera = new THREE.PerspectiveCamera(100,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    camera.position.x = 75;
    camera.position.y = 0;
    camera.position.z = 0;
    camera.lookAt(scene.position);
}

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

}
function render() {
    'use strict';
    renderer.render(scene, camera);
}

function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {

    case 65: //A
    case 97: //a

        scene.traverse(function (node) {

            if (node instanceof THREE.Mesh) {
                node.material.wireframe = !node.material.wireframe;
            }
        });
        break;
    case 40:
    		chair.position.z += 1; //seta baixo
    		//chair.linear_velocity.set( 1, 2, 3 );
    		break;
    case 38:
    		chair.position.z -= 1; //seta cima
    		break;
    case 39:
    		chair.position.x += 1; //seta direita
    		break;
    case 37:
    		chair.position.x -= 1; //seta esquerda
    		break;
    case 49: //1
    	    createScene();
            createCamera();

            render();
            break;
    case 50://2
    		createScene();
            createCamera2();

            render();
            break;
    case 51://3
    		createScene();
            createCamera3();

            render();
            break;

/*    case 83:  //S
    case 115: //s
        ball.userData.jumping = !ball.userData.jumping;
        break;*/
    case 69:  //E
    case 101: //e

        scene.traverse(function (node) {
            if (node instanceof THREE.AxisHelper) {
                node.visible = !node.visible;
            }
        });
        break;
    }
}



function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
    createCamera();

    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';

    render();

    requestAnimationFrame(animate);
}
