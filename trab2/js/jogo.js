/*global THREE, requestAnimationFrame, console*/

var camera, scene, renderer;
var camera1, camera2,camera3,camera4;
var geometry, material, mesh;
var wWidth = window.innerWidth;
var wHeight = window.innerHeight;
var originalAspect = wWidth / wHeight;
var floor,parede1,parede2,parede3,parede4,num;
var ball=new Array();
var accel_max=1.5;
var ball_num=3;


class Entity extends THREE.Object3D{
    constructor(x,y,z){
        super();
        this.position.set(x,y,z)
    }
}

class Ball extends Entity{
    constructor(x,y,z,v,num){
        super();
        this.pos_x=x;
        this.pos_z=z;
        this.radius=Math.sqrt(250*250+125*125)/20;
        this.num=num;
        this.acceler={ 
            x: (Math.random()*(accel_max*2+1)).toFixed(3)-accel_max,
            z: (Math.random()*(accel_max*2+1)).toFixed(3)-accel_max
        };
        this.mass=1;

        //this.teta=310;
        this.velocity=0;
        console.log(this.acceler.x, this.acceler.z);
        geometry=new THREE.SphereGeometry(Math.sqrt(250*250+125*125)/20,32,32);
        material=new THREE.MeshBasicMaterial({color:0xff4000,wireframe:false});
        var helper=new THREE.AxisHelper(20);

        mesh=new THREE.Mesh(geometry,material);
        this.add(mesh);
        this.add(helper);
        this.position.set(this.pos_x,y+(Math.sqrt(250*250+125*125)/20),this.pos_z);

        scene.add(this);
    }
    put_x_z(x,z){
        this.pos_z=z;
        this.pos_x=x;
    }
    change_teta(beta){
        this.teta+=beta;
    }
    change_accel_x(){
        this.acceler.x=-this.acceler.x;
         
    }
    change_accel_x_to(a){
        this.acceler.x=a;
    }  
    change_accel_z(){
        
        this.acceler.z=-this.acceler.z;
    }
    change_accel_z_to(a){
        this.acceler.z=a;
    }    
    change_position(){

        this.position.set(this.pos_x,(Math.sqrt(250*250+125*125)/20),this.pos_z);
    }
    change_velocity(a){
        this.velocity=a;
    }
    get_mass(){
        return this.mass;
    }

    get_radius(){
        return this.radius;
    }
    get_num(){
        return this.num;
    }
    get_pos_x(){
        return this.pos_x;
    }
    get_pos_z(){
        return this.pos_z;
    }
    get_acceler(){
        return this.acceler;
    }
    get_acceler_x(){
        
        return this.acceler.x;
    }
    get_acceler_z(){
        
        return this.acceler.z;
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
        this.z=z;
        this.x=x;
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
function check_wall(b){
    var prox_x=0;
    var prox_z=0;
    var s=0;
    prox_x=b.get_pos_x();
    prox_z=b.get_pos_z();
    if(prox_x<0)
        prox_x=-prox_x;
    if(prox_z<0)
        prox_z=-prox_z;
    //console.log('estou na bola ',j);
    if((prox_x+b.get_radius()-125>=0) ){
        s++;
        //console.log('bati parede de lado com ', k);
        b.change_accel_x();
    }
    if(prox_z+b.get_radius()-62.5>=0){
        s++;
        b.change_accel_z();
    }    
    if(s>0){
        var position_z= b.get_pos_z() +parseFloat(b.get_acceler_z());
        var position_x= b.get_pos_x() + parseFloat(b.get_acceler_x());
        b.put_x_z(position_x,position_z);
        b.change_position();       
    }

}
function collision(x,z,k){
    var a=0;
    var b=0;
    var j=0;
    for(j=0;j<ball_num;j++){
        var new_x=ball[j].pos_x -x;
        var new_z=ball[j].pos_z -z;
        var distancia=Math.sqrt((new_x*new_x)+(new_z*new_z))
        if(j!=k){
            if(checkCollision(ball[k],ball[j]))
                a++;
        }
        

        //check_wall(ball[k])
    }

    
    if(a>0){
        return  true;
    }
    else
        return false;
}


function rotate(x, z, sin, cos, reverse) {
    return {
        x: (reverse) ? (x * cos + z * sin) : (x * cos - z * sin),
        z: (reverse) ? (z * cos - x * sin) : (z * cos + x * sin)
    };
}

function checkCollision (ball0, ball1) {
  var dx = ball1.get_pos_x() - ball0.get_pos_x();
  var dz = ball1.get_pos_z() - ball0.get_pos_z();
  var dist = Math.sqrt(dx * dx + dz * dz);

  //collision handling code here
  if (dist < ball0.get_radius() + ball1.get_radius()) {
    //calculate angle, sine, and cosine
    var angle = Math.atan2(dz, dx),
        sin = Math.sin(angle),
        cos = Math.cos(angle), 

        //rotate ball0's position
        pos0 = {x: 0, z: 0}, //point

        //rotate ball1's position
        pos1 = rotate(dx, dz, sin, cos, true),

        //rotate ball0's velocity
        vel0 = rotate(ball0.get_acceler_x(), ball0.get_acceler_z(), sin, cos, true),

        //rotate ball1's velocity
        vel1 = rotate(ball1.get_acceler_x(), ball1.get_acceler_z(), sin, cos, true),

        //collision reaction
        vxTotal = vel0.x - vel1.x;
    vel0.x = ((ball0.get_mass() - ball1.get_mass()) * vel0.x + 2 * ball1.get_mass() * vel1.x) /
             (ball0.get_mass() + ball1.get_mass());
    vel1.x = vxTotal + vel0.x;

    //update position
    pos0.x += vel0.x;
    pos1.x += vel1.x;

    //rotate positions back
    var pos0F = rotate(pos0.x, pos0.z, sin, cos, false),
        pos1F = rotate(pos1.x, pos1.z, sin, cos, false);

    //adjust positions to actual screen positions
    //ball1.put_x_z(ball1.get_pos_x() + pos1F.x ,ball1.get_pos_z() + pos1F.z)
    //ball0.put_x_z(ball0.get_pos_x() + pos0F.x ,ball0.get_pos_z() + pos0F.z)

    //rotate velocities back
    var vel0F = rotate(vel0.x, vel0.z, sin, cos, false),
        vel1F = rotate(vel1.x, vel1.z, sin, cos, false);

    ball0.change_accel_x_to(vel0F.x);
    ball0.change_accel_z_to(vel0F.z);
    ball1.change_accel_x_to(vel1F.x);
    ball1.change_accel_z_to(vel1F.z);

    var position_z= ball1.get_pos_z() +parseFloat(ball1.get_acceler_z());
    var position_x= ball1.get_pos_x() + parseFloat(ball1.get_acceler_x());
    var posi_z= ball0.get_pos_z() +parseFloat(ball0.get_acceler_z());
    var posi_x= ball0.get_pos_x() + parseFloat(ball0.get_acceler_x());
    ball0.put_x_z(posi_x,posi_z);   
    ball1.put_x_z(position_x,position_z);
    check_wall(ball0);
    check_wall(ball1);
    ball1.change_position();
    ball0.change_position();


    return true;
  }
  return false;
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
            if(distancia<Math.sqrt(250*250+125*125)/10)
                a=1;
        }
        if(a==1)
            return  false;
        else
            return true;
    }
}

function move_balls(){

    for(i=0;i<ball_num;i++){
        if(collision(ball[i].get_pos_x(), ball[i].get_pos_z(),i )==false){
            var position_z= ball[i].get_pos_z() +parseFloat(ball[i].get_acceler_z());
            var position_x= ball[i].get_pos_x() + parseFloat(ball[i].get_acceler_x());
            ball[i].put_x_z(position_x,position_z);
            check_wall(ball[i]);
            ball[i].change_position();
        }

    }
}

function create_balls(){
    var raio=Math.sqrt((250*250)+(125*125))/20;
    var num=0;
    var vertical_max=(250-raio);
    var horizontal_max=(125-raio);

    while(num<ball_num){
        var random_x=(Math.random()*vertical_max+0).toFixed(3)-125;
        if(random_x<0)
            random_x+=raio;
        var random_z=(Math.random()*horizontal_max+0).toFixed(3)-62.5;
        if(random_z<0)
            random_z+=raio;
        if(diferent_pos(random_x,random_z,num)){
            ball.push(new Ball(random_x,0,random_z,0,num))
            num++;
        }
    }
    console.log(ball);
}

function createScene() {
    'use strict';
    scene = new THREE.Scene();
    scene.add(new THREE.AxisHelper(10));
    new Floor(0,0,0);
    create_walls();
    create_balls();
}

function createCamera() {
    'use strict';
    camera1 = new THREE.OrthographicCamera(wWidth / -2, wWidth / 2, wHeight / 2, wHeight / -2 , 150, 10000);
    camera1.position.y = 400;
    camera2 = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight,150, 10000);
    camera2.position.z = -200;
    camera2.position.x = 300;
    camera2.position.y = 200;
    camera3 = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight,150, 10000);
    camera3.position.z = 0;
    camera3.position.x = 300;
    camera3.position.y = 300;
    camera4=new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera4.position.z=ball[0].get_pos_x();
    camera4.position.x=ball[0].get_pos_z();
    camera4.position.y=80;
   // camera.lookAt(scene.position);
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
}

function onKeyDown(e) {
    'use strict';
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
    case 52:
        camera=camera4;
        camera.lookAt(ball[0].position);
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
    camera=camera1;
    camera.lookAt(scene.position);
    render();
    onResize();
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';
    render();
    move_balls();
    requestAnimationFrame(animate);
}
