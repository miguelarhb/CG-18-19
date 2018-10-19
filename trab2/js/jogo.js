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

    geometry = new THREE.BoxGeometry(10, 2, 50);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}




class Entity extends THREE.Object3D{
    constructor(x,y,z){
        super();
        this.position.set(x,y,z)
        
    }    
}





class Floor extends Entity {
    constructor(x,y,z){
        super();
        this.width=180;
        this.height=90;
	    geometry=new THREE.PlaneGeometry(180,90,5,5);
	    material =new THREE.MeshBasicMaterial({ color: 0xFFFFFF,wireframe: true});

	    mesh = new THREE.Mesh(geometry, material);
	    mesh.rotation.x-=Math.PI /2;
	    this.add(mesh);
	    this.position.set(x,y,z);

	    scene.add(this);
    }
}


class Wall extends Entity{
    constructor(x,y,z,comp){
        super();
        this.len=comp;
        geometry=new THREE.BoxGeometry(comp,Math.sqrt((Floor.width*Floor.width)+(Floor.height*Floor.height)),5);
        material= new THREE.MeshBasicMaterial({color:0x00a000, wireframe:true});

        mesh=new THREE.Mesh(geometry,material);
        this.add(mesh);
        this.position.set(x,y,z);
        scene.add(this);
    }

}

function create_walls(){
    new Wall(0,0,0,180);

}


function createTable(x, y, z) {
    'use strict';

    table = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({ color: 0x8B4513, wireframe: true });

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

function newPosRight(tipo) {
	side(39);

    
    teta-=0.5;
    chair.rotation.y-= 0.5*Math.PI/180;
    //console.log(Math.cos(teta*Math.PI/180),"com teta igual a",teta);

}
function newPosLeft(tipo) {
	side(37);
    //console.log(teta)
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

   
    //createTable(0, 8, -30);
    new Floor(0,0,0);
    create_walls()
    

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
	 
}


function createCamera() {
    'use strict';
    camera1 = new THREE.OrthographicCamera(-150, 150, 150, -150, 150, 10000);
    camera1.position.y = 400;
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

	



function onKeyDown(e) {
    'use strict';
 
    map[e.keyCode]=true;
    
    switch (e.keyCode) {
    	

    case 49: //1
  
            camera=camera1;

            render();
            break;
    case 50://2
            
            camera=camera2;
            
            render();
            break;
    case 51://3
    		

            camera=camera3;
           
    		
    
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
   
    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';
    
    render();
   // update();
    requestAnimationFrame(animate);
}