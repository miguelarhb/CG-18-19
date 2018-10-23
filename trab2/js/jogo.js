/*global THREE, requestAnimationFrame, console*/

var camera, scene, renderer;
var camera1, camera2,camera3,camera4;
var geometry, material, mesh;
var clock = new THREE.Clock(true);
var floor,parede1,parede2,parede3,parede4,num;
var ball=new Array();

var accel_max=2;



class Entity extends THREE.Object3D{
    constructor(x,y,z){
        super();
        this.position.set(x,y,z)


        
    }   

}

class Ball extends Entity{
    constructor(x,y,z,v){
        super();
        this.speed = 20;
        this.maxspeed = 1000;
        this.pos_x=x;
        this.pos_z=z;

        this.acceler=(Math.random()*(accel_max)+0).toFixed(3);
        this.teta=(Math.random()*(360)+0).toFixed(3);
        this.velocity=v;
        console.log(this.teta);
        geometry=new THREE.SphereGeometry(Math.sqrt(250*250+125*125)/20,32,32);
        material=new THREE.MeshBasicMaterial({color:0xff4000,wireframe:false});
        var helper=new THREE.AxisHelper(20); 


        geometry=new THREE.SphereGeometry(Math.sqrt(250*250+125*125)/20,32,32);
        material=new THREE.MeshBasicMaterial({color:0xff4000,wireframe:false});
        var helper=new THREE.AxisHelper(20);


        mesh=new THREE.Mesh(geometry,material);
        this.add(mesh);
        this.add(helper);

        this.position.set(this.pos_x,y+(Math.sqrt(250*250+125*125)/20),this.pos_z);

        scene.add(this);
    }
    change_position(x,z){
        this.pos_x=x;
        this.pos_z=z;
        this.position.set(this.pos_x,(Math.sqrt(250*250+125*125)/20),this.pos_z);
    }
    change_velocity(a){
        this.velocity=a;
        
    }
    get_teta(){
        return this.teta;
    }
    get_pos_x(){
        return this.pos_x;
    }
    get_pos_z(){
        return this.pos_z;
    }
    get_velocity(){
        return this.velocity;
    }
    get_acceler(){
        return this.acceler;
    }
}
    


class Floor extends Entity {
    constructor(x,y,z){
        super();
        this.width=250;
        this.height=125;
        geometry=new THREE.PlaneGeometry(250,125,5,5);
        material =new THREE.MeshBasicMaterial({ color: 0x6666ff,wireframe: false});

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
        material= new THREE.MeshBasicMaterial({color:0xc2c2d6, wireframe:false});

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
function move_balls(){

    for(i=0;i<10;i++){
        //console.log('velocidade antes memso antes ',ball[i].get_velocity());

        ball[i].change_velocity(ball[i].get_acceler());
        
        //console.log('antes ',ball[i].get_pos_x() ,'   ',ball[i].get_acceler()*Math.cos(teta*Math.PI/180));
        //console.log('velocidade antes ',ball[i].get_velocity());
        var position_z= ball[i].get_pos_z() + parseFloat(ball[i].get_velocity()) +ball[i].get_acceler()*Math.cos(ball[i].get_teta()*Math.PI/180);

        var position_x= ball[i].get_pos_x()+parseFloat(ball[i].get_velocity()) + ball[i].get_acceler()*Math.sin(ball[i].get_teta()*Math.PI/180);

        ball[i].change_position(position_x,position_z);

        //console.log('depois',ball[i].get_pos_x());
        //console.log('psoiçao x ',position_x ,'posicao z ',position_z);

        
    }

}
function create_balls(){
    var raio=Math.sqrt((250*250)+(125*125))/20;
    var num=0;
    var vertical_max=(250-raio);
    var horizontal_max=(125-raio);
<<<<<<< HEAD
    while(num<10){
        var random_x=(Math.random()*vertical_max+0).toFixed(3)-125;
        if(random_x<0)
            random_x+=raio;


=======

    while(num<1){
        console.log('estou no ciclo')
        var random_x=(Math.random()*vertical_max+0).toFixed(3)-125;
        if(random_x<0)
            random_x+=raio;
        console.log(random_x);
>>>>>>> f85d9212e7f90cfcfb124e18a0b9e24db33729a6
        var random_z=(Math.random()*horizontal_max+0).toFixed(3)-62.5;
        if(random_z<0)
            random_z+=raio;
        if(diferent_pos(random_x,random_z,num)){
            ball.push(new Ball(random_x,0,random_z,0))
            num+=1;
        }
    }
}

function move_speed_by_time(){
    time_passed = clock.getElapsedTime();
    if(time_passed%0.015 == 0){
        for (var i = 0; i < ball.length; i++) {
            console.log("DEVIA ESTAR A ANDAR")
            ball[i].velocidade();
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
    console.log("entao mas")
}

function clearScene(){
    scene.remove(chair);
    scene.remove(lamp);
    scene.remove(table);
    scene.remove(floor);
}

<<<<<<< HEAD

function createGame(){
    
     createScene();
     
=======
function update(){
    createScene();
    createChair(chair.position.x,chair.position.y,chair.position.z);
}

function createGame(){
     createScene();
>>>>>>> f85d9212e7f90cfcfb124e18a0b9e24db33729a6
}

function createCamera() {
    'use strict';
    camera1 = new THREE.OrthographicCamera(-150, 150, 150, -150, 150, 10000);
    camera1.position.y = 400;
    camera2 = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight,150, 10000);
<<<<<<< HEAD

=======
    console.log("OLA AMIGO! TUDO BEM?")
>>>>>>> f85d9212e7f90cfcfb124e18a0b9e24db33729a6
    camera2.position.z = -200;
    camera2.position.x = 300;
    camera2.position.y = 200;
    camera3 = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight,150, 10000);

    camera3.position.z = 0;
    camera3.position.x = 300;
    camera3.position.y = 300;
    camera4=new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera4.position.z=25;
    camera4.position.x=25;
    camera4.position.y=80;
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

<<<<<<< HEAD
    



=======
>>>>>>> f85d9212e7f90cfcfb124e18a0b9e24db33729a6
function onKeyDown(e) {
    'use strict';
    switch (e.keyCode) {
<<<<<<< HEAD
        

    case 49: //1
  
=======
        case 49: //1
>>>>>>> f85d9212e7f90cfcfb124e18a0b9e24db33729a6
            camera=camera1;
            onResize();
            render();
            break;
        case 50://2
            camera=camera2;
            onResize()
            render();
            break;
<<<<<<< HEAD
    case 51://3
            

            camera=camera3;
            onResize()
            
    
            render();
            break;

        break;
    case 52:
            camera=camera4;
            camera.lookAt(ball[0].position)
    case 69:  //E
    case 101: //e
 
        scene.traverse(function (node) {
            if (node instanceof THREE.AxisHelper) {
                node.visible = !node.visible;
            }
        });
        break;
=======
        case 51://3
            camera=camera3;
            onResize()
            render();
            break;
        case 52:
            camera=camera4;
            camera.lookAt(ball[0].position)
        case 69:  //E
        case 101: //e
            scene.traverse(function (node) {
                if (node instanceof THREE.AxisHelper) {
                    node.visible = !node.visible;
                }
            });
            break;
>>>>>>> f85d9212e7f90cfcfb124e18a0b9e24db33729a6
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
    //setInterval(move_balls(),3000);
    window.addEventListener("keydown", onKeyDown);
    window.setInterval(function(){move_speed_by_time()},15);
    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';
    render();
    setInterval(move_balls(),3000);
   // update();
    requestAnimationFrame(animate);
}
