/*global THREE, requestAnimationFrame, console*/

var camera, scene, renderer;
var camera1, camera2,camera3
var geometry, material, mesh;

var floor,parede1,parede2,parede3,parede4,num;
var ball=new Array();







class Entity extends THREE.Object3D{
    constructor(x,y,z){
        super();
        this.position.set(x,y,z)
        
    }    
}


class Ball extends Entity{
    constructor(x,y,z){
        super();
        this.pos_x=x;
        this.pos_z=z;
        geometry=new THREE.SphereGeometry(Math.sqrt(250*250+125*125)/20,32,32);
        material=new THREE.MeshBasicMaterial({color:0xDABB01,wireframe:false});

        mesh=new THREE.Mesh(geometry,material);
        this.add(mesh);
        this.position.set(x,y+(Math.sqrt(250*250+125*125)/20),z);

        scene.add(this);
    }
}


class Floor extends Entity {
    constructor(x,y,z){
        super();
        this.width=250;
        this.height=125;
	    geometry=new THREE.PlaneGeometry(250,125,5,5);
	    material =new THREE.MeshBasicMaterial({ color: 0x82CFA4,wireframe: false});

	    mesh = new THREE.Mesh(geometry, material);
	    mesh.rotation.x-=Math.PI /2;
	    this.add(mesh);
	    this.position.set(x,y,z);

	    scene.add(this);
    }
}


class Wall extends Entity{
    constructor(x,y,z,comp,rot){
        super();
        this.len=comp;
       
        geometry=new THREE.BoxGeometry(comp,Math.sqrt(250*250+125*125)/10,2);
        material= new THREE.MeshBasicMaterial({color:0x00a000, wireframe:false});

        mesh=new THREE.Mesh(geometry,material);
        this.add(mesh);
        
        this.position.set(x,y+(Math.sqrt(250*250+125*125)/10)/2,z);
        this.rotation.y=rot;
        mesh.rotation.z-=Math.PI ;
        scene.add(this);
    }

}

function create_walls(){
    parede1=new Wall(0,0,-63.5,250,0);
    parede2=new Wall(0,0,63.5,250,0);
    parede3=new Wall(126,0,0,125,Math.PI/2);
    parede4=new Wall(-126,0,0,125,Math.PI/2);

}

function diferent_pos(x,z,num){
    var a=0;
    if(num==0){
        console.log('primera bola');
        return true;
    }
    else{
        for(i=0;i<num;i++){
            var new_x=ball[i].pos_x-x;
            var new_z=ball[i].pos_z-z;
            var distancia=Math.sqrt((new_x*new_x)+(new_z*new_z))
            if(distancia<Math.sqrt(250*250+125*125)/10){
                a=1
                                
            }
        
        }
        if(a==1)
            return  false;
        else
            return true;
    }
}

function create_balls(){
    var raio=Math.sqrt((250*250)+(125*125))/20;
    var num=0;
    
    var vertical_max=(250-raio);
    
    var horizontal_max=(125-raio);
    while(num<10){
        console.log('estou no ciclo')
        var random_x=(Math.random()*vertical_max+0).toFixed(3)-125;
        if(random_x<0)
            random_x+=raio;

        console.log(random_x);
        var random_z=(Math.random()*horizontal_max+0).toFixed(3)-62.5;
        if(random_z<0)
            random_z+=raio;
        if(diferent_pos(random_x,random_z,num)){
            ball.push(new Ball(random_x,0,random_z))
            num+=1;
        }
    }
}








function createScene() {
    'use strict';

    scene = new THREE.Scene();

    scene.add(new THREE.AxisHelper(10));

   
    //createTable(0, 8, -30);
    new Floor(0,0,0);
    create_walls();
    create_balls();
    

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
    camera2 = new THREE.OrthographicCamera(-150, 150, 150, -150, 150, 10000);
    camera2.position.z = -400;
    camera3 = new THREE.OrthographicCamera(-100, 100, 100, -100, 40, 10000);
    camera3.position.x = 200;

   // camera.lookAt(scene.position);
}




function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = 1;
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
            onResize()
            render();
            break;
    case 51://3
    		

            camera=camera3;
           
    		
    
            render();
            break;

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