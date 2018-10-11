/*global THREE, requestAnimationFrame, console*/

var camera, scene, renderer;
var camera1, camera2, camera3;
var wWidth = window.innerWidth;
var wHeight = window.innerHeight;
var originalAspect = wWidth / wHeight;
var geometry, material, mesh;
var flagWireframe = true;

var chair,lamp,table;
var map={37:false,38:false,39:false,40:false}
var maxspeed=10;
var accelarateSpeedX = 0;
var accelarateSpeedY = 0;
var accelarateSpeed = 0;
var teta = 0;

function addTableLeg(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CylinderGeometry(2, 3, 30, 5);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addTableTop(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(60, 3, 30);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addChairWheels(obj, x, y, z) {
    'use strict';
    geometry = new THREE.TorusGeometry(1.5, 0.5, 20, 5);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    //mesh.rotation.x=10;
    mesh.rotation.y=Math.PI /2;
    //mesh.rotation.z=10;
    obj.add(mesh);
}

function addChairBody(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(20, 5, 20);
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
    geometry = new THREE.CubeGeometry(2, 15, 2);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addLampBase(obj, x, y, z) {
    'use strict';
    geometry = new THREE.ConeGeometry(5, 3, 64);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x,y,z);
    obj.add(mesh);
}

function addLampCilinder(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CylinderGeometry(0.5, 0.5, 40, 64);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh);
}

function addLampPullerCilinder(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CylinderGeometry(0.2, 0.2, 1, 64);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh);

}

function addLampSphere(obj, x, y, z) {
    'use strict';
    geometry = new THREE.SphereGeometry(0.1, 23, 18);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh);

}

function addLampTop(obj, x, y, z){
    'use strict';
    geometry = new THREE.CylinderGeometry( 4, 6, 15, 10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x,y,z);
    obj.add(mesh);
}

function createLamp(x, y, z){
    'use strict'

    lamp = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({ color: 0xFFE4C4, wireframe: flagWireframe });

    addLampCilinder(lamp, 8, 20, 8);
    addLampBase(lamp, 8, -1, 8);
    addLampTop(lamp, 8, 40, 8);
    addLampSphere(lamp, 12, 36.5, 10);
    addLampSphere(lamp, 12, 36, 10);
    addLampSphere(lamp, 12, 35.5, 10);
    addLampSphere(lamp, 12, 35, 10);
    addLampSphere(lamp, 12, 34.5, 10);
    addLampSphere(lamp, 12, 34, 10);
    addLampSphere(lamp, 12, 33.5, 10);
    addLampSphere(lamp, 12, 33, 10);
    addLampSphere(lamp, 12, 32.5, 10);
    addLampSphere(lamp, 12, 32, 10);
    addLampSphere(lamp, 12, 31.5, 10);
    addLampSphere(lamp, 12, 31, 10);
    addLampSphere(lamp, 12, 30.5, 10);
    addLampSphere(lamp, 12, 30, 10);
    addLampSphere(lamp, 12, 29.5, 10);
    addLampSphere(lamp, 12, 29, 10);
	  addLampPullerCilinder(lamp, 12, 28.5, 10);


    scene.add(lamp);

    lamp.position.x = x;
    lamp.position.y = y;
    lamp.position.z = z;
}

function createTable(x, y, z) {
    'use strict';

    table = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({ color: 0x8B4513, wireframe: flagWireframe });

    addTableTop(table, 0, 23, 0);
    addTableLeg(table, -25, 6.5, -10);
    addTableLeg(table, -25, 6.5, 10);
    addTableLeg(table, 25, 6.5, 10);
    addTableLeg(table, 25, 6.5, -10);

    scene.add(table);

    table.position.x = x;
    table.position.y = y;
    table.position.z = z;
}

function createChair(x, y, z) {
    'use strict';

    chair = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({ color: 0xF0E68C, wireframe: flagWireframe });

    addChairBody(chair, 0, 14, 0);
    addChairBack(chair, 0, 26.5, 7.5);
    addChairLeg(chair, -9, 4, -9);
    addChairLeg(chair, -9, 4, 9);
    addChairLeg(chair, 9, 4, 9);
    addChairLeg(chair, 9, 4, -9);
    addChairWheels(chair, -9, -5, -9);
    addChairWheels(chair, -9, -5, 9);
    addChairWheels(chair, 9, -5, 9);
    addChairWheels(chair, 9, -5, -9);

    scene.add(chair);

    chair.position.x = x;
    chair.position.y = y;
    chair.position.z = z;

   	chair.speedX = 0;
    chair.speedZ = 0;
    chair.accelarate = 0.005;
    chair.desaccelarate=0.005;

    chair.right=false;
    chair.left=false;
    chair.front=false;
    chair.back=false;

}
/*
function wheelsRotation(flag){
  for (var e = 6; e != 9; e++){
    if (flag == 1)                      //chair more speed
      chair.children[i].rotate.z += ;
    if (flag == -1)                     //chair less speed
      chair.children[i].rotate.z -= ;
  }
}
*/

function side(lado){
    chair.right=false;
    chair.left=false;
    chair.front=false;
    chair.back=false;

	if(lado==39)
		chair.right=true;
	if(lado==40)
		chair.back=true;
	if(lado==37)
		chair.left=true;
	if(lado==38)
		chair.front=true;

}

function newPosRight(tipo) {

  side(39);
  teta-=0.5;
  chair.rotation.y-= 0.5*Math.PI/180;
  //console.log(Math.cos(teta*Math.PI/180),"com teta igual a",teta);
}

function newPosLeft(tipo) {

  side(37);
  teta+=0.5;
  chair.rotation.y+= 0.5*Math.PI/180;
  //console.log(Math.cos(teta*Math.PI/180),"com teta igual a",teta);

}

function newPosUp(tipo) {
	side(38);
	if(tipo==1)
    	accelarateSpeed += chair.accelarate;

  if(accelarateSpeed>=maxspeed)
  	accelarateSpeed=maxspeed;

  chair.position.z -= accelarateSpeed*Math.cos(teta*Math.PI/180);
  chair.position.x -= accelarateSpeed*Math.sin(teta*Math.PI/180);
}

function newPosDown(tipo) {
	side(40);
	if(tipo==1)
    	accelarateSpeed += chair.accelarate;
  if(accelarateSpeed>=maxspeed)
  	accelarateSpeed=maxspeed;
  chair.position.z += accelarateSpeed*Math.cos(teta*Math.PI/180);
  chair.position.x += accelarateSpeed*Math.sin(teta*Math.PI/180);
}

function createScene() {
    'use strict';

    scene = new THREE.Scene();

    scene.add(new THREE.AxisHelper(10));

    createTable(0, 8, -30);
    createLamp(27, 2, -45);
}

function createGame(){
	 createScene();
	 createChair(0, 6, 0);
}

function clearScene(){
	scene.remove(chair);
	scene.remove(lamp);
	scene.remove(table);
}

function update(){
	createScene();
	createChair(chair.position.x,chair.position.y,chair.position.z);
}

function createCamera() {
    'use strict';
    camera1 = new THREE.OrthographicCamera(wWidth / -2,  wWidth / 2, wHeight / 2, wHeight / -2 , 40, 10000);
    camera1.position.y = 200;
    camera2 = new THREE.OrthographicCamera(wWidth / -2,  wWidth / 2, wHeight / 2, wHeight / -2 , 40, 10000);
    camera2.position.z = -200;
    camera3 = new THREE.OrthographicCamera(wWidth / -2,  wWidth / 2, wHeight / 2, wHeight / -2 , 40, 10000);
    camera3.position.x = 200;
}

function onResize() {
    'use strict';
    var sceneSize = 110;
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
}

function onKeyUp(){

	for (var i = 37; i <= 40; i++) {
		map[i]=false;
	}
}

function onKeyDown(e) {
    'use strict';

    map[e.keyCode]=true;

    switch (e.keyCode) {
      case 49: //1
        camera=camera1;
        onResize();
        render();
        break;
      case 50://2
        camera=camera2;
        onResize();
        render();
        break;
      case 51://3
        camera=camera3;
        onResize();
        render();
        break;
      case 65: //A
      case 97: //a
        flagWireframe = !flagWireframe;
        update();                  // !!!!! FIXME !!!!! -- resets --- velocity chair and rotation place
        break;
      case 69:  //E
      case 101: //e
        scene.traverse( function (node) {
          if (node instanceof THREE.AxisHelper) {
            node.visible = !node.visible;
          }
        });
        break;
    }
}

function seeiffalse(){
	var check=0;
	for (var i = 37; i <= 40; i++) {
		if(map[i]==false)
			check++;
	}
	if(check==4)
		return true;
	else
		return false;
}

function checkKey() {

	if(seeiffalse()){
		if(accelarateSpeed>0 ){
			if(chair.front){
				//console.log("antes entrei cima",chair.rigth, chair.left);
				    chair.position.z -= accelarateSpeed*Math.cos(teta*Math.PI/180);
    				chair.position.x -= accelarateSpeed*Math.sin(teta*Math.PI/180);
			}
			if(chair.back){
   				chair.position.z += accelarateSpeed*Math.cos(teta*Math.PI/180);
    			chair.position.x += accelarateSpeed*Math.sin(teta*Math.PI/180);
    		}
		}
    accelarateSpeed-=chair.desaccelarate;
    if(accelarateSpeed<0)
			accelarateSpeed=0;
	}
  else{
    if(map[40]&&(chair.front==false||accelarateSpeed==0))
      newPosDown(1);
    if(map[38]&& (chair.back==false||accelarateSpeed==0))
      newPosUp(1);
    if(map[37] && accelarateSpeed==0)
      newPosLeft(1);
    if(map[39] && accelarateSpeed==0)
      newPosRight(1);
    if(map[37] && accelarateSpeed>0 && chair.front==true){
      teta+=0.5;
      chair.rotation.y+= 0.5*Math.PI/180;
      chair.position.z -= accelarateSpeed*Math.cos(teta*Math.PI/180);
      chair.position.x -= accelarateSpeed*Math.sin(teta*Math.PI/180);
      accelarateSpeed-=(chair.desaccelarate);
      if(accelarateSpeed<=0){
          accelarateSpeed=0;
          chair.front=false;
      }
    }
    if(map[39] && accelarateSpeed>0 && chair.front==true){
      teta-=0.5;
      chair.rotation.y-= 0.5*Math.PI/180;
      chair.position.z -= accelarateSpeed*Math.cos(teta*Math.PI/180);
      chair.position.x -= accelarateSpeed*Math.sin(teta*Math.PI/180);
      accelarateSpeed-=(chair.desaccelarate);
      if(accelarateSpeed<=0){
          accelarateSpeed=0;
          chair.front=false;
      }
    }
    if(map[37] && accelarateSpeed>0 && chair.back==true){
      teta+=0.5;
      chair.rotation.y+= 0.5*Math.PI/180;
      chair.position.z += accelarateSpeed*Math.cos(teta*Math.PI/180);
      chair.position.x += accelarateSpeed*Math.sin(teta*Math.PI/180);
      accelarateSpeed-=(chair.desaccelarate);
      if(accelarateSpeed<=0){
          accelarateSpeed=0;
          chair.front=false;
      }
    }
    if(map[39] && accelarateSpeed>0 && chair.back==true){
      teta-=0.5;
      chair.rotation.y-= 0.5*Math.PI/180;
      chair.position.z += accelarateSpeed*Math.cos(teta*Math.PI/180);
      chair.position.x += accelarateSpeed*Math.sin(teta*Math.PI/180);
      accelarateSpeed-=(chair.desaccelarate);
      if(accelarateSpeed<=0){
          accelarateSpeed=0;
          chair.front=false;
      }
    }
    if(map[40]&&accelarateSpeed>0&&chair.front==true){
      chair.position.z -= accelarateSpeed*Math.cos(teta*Math.PI/180);
      chair.position.x -= accelarateSpeed*Math.sin(teta*Math.PI/180);
      accelarateSpeed-=(chair.desaccelarate+0.005);
      if(accelarateSpeed<=0){
          accelarateSpeed=0;
          side(40);
      }
    }
    if(map[38]&&accelarateSpeed>0&&chair.back==true){
      chair.position.z += accelarateSpeed*Math.cos(teta*Math.PI/180);
      chair.position.x += accelarateSpeed*Math.sin(teta*Math.PI/180);
      accelarateSpeed-=(chair.desaccelarate+0.005);
      if(accelarateSpeed<=0){
          accelarateSpeed=0;
          side(38);
      }
    }
    if(map[39]&&map[38]){
    	side(39);
    	chair.front=true;
    	accelarateSpeed += chair.accelarate;
	    if(accelarateSpeed>=maxspeed )
    			accelarateSpeed=maxspeed;
  		teta-=0.5;
  		chair.rotation.y-= 0.5*Math.PI/180;
  		chair.position.z -= accelarateSpeed*Math.cos(teta*Math.PI/180);
 			chair.position.x -= accelarateSpeed*Math.sin(teta*Math.PI/180);
  	}
  	if(map[39]&&map[40]){
  		side(39);
  		chair.back=true;
  		accelarateSpeed += chair.accelarate;
	    if(accelarateSpeed>=maxspeed )
  			accelarateSpeed=maxspeed;
  		teta-=0.5;
  		chair.rotation.y-= 0.5*Math.PI/180;
  		chair.position.z += accelarateSpeed*Math.cos(teta*Math.PI/180);
 			chair.position.x += accelarateSpeed*Math.sin(teta*Math.PI/180);
  	}
  	if(map[37]&&map[38]){
  		side(37);
  		chair.front=true;
  		accelarateSpeed += chair.accelarate;
  	  if(accelarateSpeed>=maxspeed )
  			accelarateSpeed=maxspeed;
  		teta+=0.5;
  		chair.rotation.y+= 0.5*Math.PI/180;
  		chair.position.z -= accelarateSpeed*Math.cos(teta*Math.PI/180);
 			chair.position.x -= accelarateSpeed*Math.sin(teta*Math.PI/180);
    }
  	if(map[37]&&map[40]){
  		side(37);
  		chair.back=true;
  		accelarateSpeed += chair.accelarate;
  	  if(accelarateSpeed>=maxspeed )
  			accelarateSpeed=maxspeed;
  		teta+=0.5;
  		chair.rotation.y+= 0.5*Math.PI/180;
  		chair.position.z += accelarateSpeed*Math.cos(teta*Math.PI/180);
 			chair.position.x += accelarateSpeed*Math.sin(teta*Math.PI/180);
  	}
  }
}

function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    createGame();

    createCamera();
    camera=camera1;
    camera.lookAt(scene.position);
    render();
    onResize();
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
}

function animate() {
    'use strict';
    checkKey();
    render();
    requestAnimationFrame(animate);
}
