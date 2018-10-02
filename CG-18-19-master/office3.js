/*global THREE, requestAnimationFrame, console*/

var camera, scene, renderer;
var camera1, camera2,camera3
var geometry, material, mesh;

var chair, floor,lamp,table;
var map={37:false,38:false,39:false,40:false}
var maxspeed=10;
var accelarateSpeedX = 0;
var accelarateSpeedY=0;
var accelarateSpeed=0;
var teta=0;

function addTableLeg(obj, x, y, z) {
    'use strict';

    geometry = new THREE.CylinderGeometry(2, 2, 50);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addTableTop(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(60, 5, 30);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addChairWheels(obj, x, y, z) {
    'use strict';
    geometry = new THREE.TorusGeometry(1, 0.3, 20,73);
    material = new THREE.MeshBasicMaterial({ color: 0xF0E68C, wireframe: true });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    //mesh.rotation.x=10;
    
    mesh.rotation.y=Math.PI /2;     
    //mesh.rotation.z=10;
    
    obj.add(mesh);

}

function addChairBody(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(20, 10, 20);
    material = new THREE.MeshBasicMaterial({ color: 0xF0E68C, wireframe: true });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addChairBack(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(20, 40, 5);
    material = new THREE.MeshBasicMaterial({ color: 0xF0E68C, wireframe: true });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addChairLeg(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(2, 18, 2);
    material = new THREE.MeshBasicMaterial({ color: 0xF0E68C, wireframe: true });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addLampBase(obj, x, y, z) {
    'use strict';
    geometry = new THREE.ConeGeometry(5, 3, 64);
    material = new THREE.MeshBasicMaterial({ color: 0xD3D3D3, wireframe: true });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x,y,z);
    obj.add(mesh);
}

function addLampCilinder(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CylinderGeometry(0.5, 0.5, 80, 64);
    material = new THREE.MeshBasicMaterial({ color: 0xD3D3D3, wireframe: true });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh);

}

function addLampPullerCilinder(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CylinderGeometry(0.2, 0.2, 1, 64);
    material = new THREE.MeshBasicMaterial({ color: 0xD3D3D3, wireframe: true });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh);

}

function addLampSphere(obj, x, y, z) {
    'use strict';
    geometry = new THREE.SphereGeometry(0.1, 23, 18);
    material = new THREE.MeshBasicMaterial({ color: 0xD3D3D3, wireframe: true });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh);

}

function addLampTop(obj, x, y, z){
    'use strict';
    geometry = new THREE.CylinderGeometry( 4, 6, 15, 10);
    material = new THREE.MeshBasicMaterial({ color: 0x000080, wireframe: true });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x,y,z);
    obj.add(mesh);
}
function createFloor(x,y,z){
	floor=new THREE.Object3D();

	geometry=new THREE.PlaneGeometry(360,360,10,10);
	material =new THREE.MeshBasicMaterial({ color: 0xFFFFFF,wireframe: true});

	mesh = new THREE.Mesh(geometry, material);
	mesh.rotation.x-=Math.PI /2;
	floor.add(mesh);
	floor.position.set(x,y,z);

	scene.add(floor);
}
function createTable(x, y, z) {
    'use strict';

    table = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({ color: 0x8B4513, wireframe: true });

    addTableTop(table, 0, 43, 0);
    addTableLeg(table, -25,18.5, -10);
    addTableLeg(table, -25, 18.5, 10);
    addTableLeg(table, 25, 18.5, 10);
    addTableLeg(table, 25, 18.5, -10);

    scene.add(table);

    table.position.x = x;
    table.position.y = y;
    table.position.z = z;
}

function createChair(x, y, z) {
    'use strict';

    chair = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({ color: 0xF0E68C, wireframe: true });

    addChairBody(chair, 0, 20, 0);
    addChairBack(chair, 0, 45, 7.5);
    addChairLeg(chair, -9, 6, -9);
    addChairLeg(chair, -9, 6, 9);
    addChairLeg(chair, 9, 6, 9);
    addChairLeg(chair, 9, 6, -9);
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

    
    teta-=0.2;
    chair.rotation.y-= 0.2*Math.PI/180;
    //console.log(Math.cos(teta*Math.PI/180),"com teta igual a",teta);

}
function newPosLeft(tipo) {
	side(37);
    //console.log(teta)
    teta+=0.2;
    chair.rotation.y+= 0.2*Math.PI/180;
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


function createLamp(x,y,z){
    'use strict'

    lamp = new THREE.Object3D();

    //material = new THREE.MeshBasicMaterial({ color: 0xFFE4C4, wireframe: true });

    addLampCilinder(lamp, 8, 40, 8);
    addLampBase(lamp, 8, 0, 8);
    addLampTop(lamp, 8, 80, 8);
    addLampSphere(lamp, 12, 72.5, 10);
    addLampSphere(lamp, 12, 72, 10);
	addLampSphere(lamp, 12, 71.5, 10);
	addLampSphere(lamp, 12, 71, 10);
	addLampSphere(lamp, 12, 70.5, 10);
	addLampSphere(lamp, 12, 70, 10);
	addLampSphere(lamp, 12, 69.5, 10);
	addLampSphere(lamp, 12, 69, 10);
    addLampSphere(lamp, 12, 68.5, 10);
    addLampSphere(lamp, 12, 68, 10);
    addLampSphere(lamp, 12, 67.5, 10);
    addLampSphere(lamp, 12, 67, 10);
    addLampSphere(lamp, 12, 66.5, 10);
    addLampSphere(lamp, 12, 66, 10);
    addLampSphere(lamp, 12, 65.5, 10);
    addLampSphere(lamp, 12, 65, 10);
	addLampPullerCilinder(lamp, 12, 64.5, 10);


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
    createLamp(27, 2, -45);
    //createFloor(0,0,0);

}
function clearScene(){
	scene.remove(chair);
	scene.remove(lamp);
	scene.remove(table);
	scene.remove(floor);
}

function update(){
	createScene();
	createChair(chair.position.x,chair.position.y,chair.position.z);
}
function createGame(){
	
	 createScene();
	 createChair(0, 6, 0);
}


function createCamera() {
    'use strict';
    camera1 = new THREE.OrthographicCamera(-100, 100, 100, -100, 40, 10000);
    camera1.position.y = 200;
    camera2 = new THREE.OrthographicCamera(-100, 100, 100, -100, 40, 10000);
    camera2.position.z = -200;
    camera3 = new THREE.OrthographicCamera(-100, 100, 100, -100, 40, 10000);
    camera3.position.x = 200;

   // camera.lookAt(scene.position);
}




function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
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
    	    createScene();
    	    
    	    createChair(chair.position.x,chair.position.y,chair.position.z);
            chair.rotation.y= teta*Math.PI/180;
            camera=camera1;
            onResize();
            render();
            break;
    case 50://2
    		createScene();
    		createChair(chair.position.x,chair.position.y,chair.position.z);
            chair.rotation.y= teta*Math.PI/180;
            camera=camera2;
            onResize();
            render();
            break;
    case 51://3
    		
    		createScene();
    		createChair(chair.position.x,chair.position.y,chair.position.z);
            chair.rotation.y= teta*Math.PI/180;
            camera=camera3;
            onResize();
    		
    
            render();
            break;
    case 65: //A
    case 97: //a

        scene.traverse(function (node) {

            if (node instanceof THREE.Mesh) {
            	
                node.material.wireframe = !node.material.wireframe;
            }
        });
        break;
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
		//console.log("antes",chair.position.x,"ACELERACAO",accelarateSpeedX);
	
		//console.log("depois",chair.position.x,"ACELERACAO",accelarateSpeedX);
		
		}	
		accelarateSpeed-=chair.desaccelarate;
		

		if(accelarateSpeed<0)
			accelarateSpeed=0;
	}


	else{

        if(map[40]&&(chair.front==false||accelarateSpeed==0)){
            //console.log(accelarateSpeed);
        	//chair.rotation.y=Math.PI;
    		newPosDown(1);
    	}
    	if(map[38]&& (chair.back==false||accelarateSpeed==0)){
    		//chair.rotation.y=0;
    		newPosUp(1);
    	}  
    	if(map[37]){
    		//chair.rotation.y=Math.PI/2;
    		newPosLeft(1);
    	}  	
    	if(map[39]){
    		//chair.rotation.y=-Math.PI/2;
    		newPosRight(1);
    	}
        if(map[40]&&accelarateSpeed>0&&chair.front==true){
                
                chair.position.z -= accelarateSpeed*Math.cos(teta*Math.PI/180);
                chair.position.x -= accelarateSpeed*Math.sin(teta*Math.PI/180);
                accelarateSpeed-=(chair.desaccelarate+0.005);
                if(accelarateSpeed<=0){
                   // console.log("frente antes de parar " , chair.front);
                    accelarateSpeed=0;
                    side(40);
                   // console.log("frente depois de parar " , chair.front);
                    //console.log("atras depois de parar " , chair.back);
                }
        }
        if(map[38]&&accelarateSpeed>0&&chair.back==true){
                
                chair.position.z += accelarateSpeed*Math.cos(teta*Math.PI/180);
                chair.position.x += accelarateSpeed*Math.sin(teta*Math.PI/180);
                accelarateSpeed-=(chair.desaccelarate+0.005);
                if(accelarateSpeed<=0){
                   // console.log("atras antes de parar " , chair.back);
                    accelarateSpeed=0;
                    side(38);
                   // console.log("atras depois de parar " , chair.back);
                }
        }
    	if(map[39]&&map[38]){
    		side(39);
    		chair.front=true;
    		accelarateSpeed += chair.accelarate;
    		
    	    if(accelarateSpeed>=maxspeed )
    			accelarateSpeed=maxspeed;

    		teta-=0.2;
    		chair.rotation.y-= 0.2*Math.PI/180;
    		chair.position.z -= accelarateSpeed*Math.cos(teta*Math.PI/180);
   			chair.position.x -= accelarateSpeed*Math.sin(teta*Math.PI/180);
    	}
    	if(map[39]&&map[40]){
    		side(39);
    		chair.back=true;
    		accelarateSpeed += chair.accelarate;
    
    	    if(accelarateSpeed>=maxspeed )
    			accelarateSpeed=maxspeed;

    		teta-=0.2;
    		chair.rotation.y-= 0.2*Math.PI/180;
    		chair.position.z += accelarateSpeed*Math.cos(teta*Math.PI/180);
   			chair.position.x += accelarateSpeed*Math.sin(teta*Math.PI/180);
    	}
    	if(map[37]&&map[38]){
    		side(37);
    		chair.front=true;
    		accelarateSpeed += chair.accelarate;
    		
    	    if(accelarateSpeed>=maxspeed )
    			accelarateSpeed=maxspeed;

    		teta+=0.2;
    		chair.rotation.y+= 0.2*Math.PI/180;
    		chair.position.z -= accelarateSpeed*Math.cos(teta*Math.PI/180);
   			chair.position.x -= accelarateSpeed*Math.sin(teta*Math.PI/180);
    	}
    	if(map[37]&&map[40]){
    		side(37);
    		chair.back=true;
    		accelarateSpeed += chair.accelarate;
    	
    	    if(accelarateSpeed>=maxspeed )
    			accelarateSpeed=maxspeed;

    		teta+=0.2;
    		chair.rotation.y+= 0.2*Math.PI/180;
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

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';
    checkKey();
    render();
   // update();
    requestAnimationFrame(animate);
}