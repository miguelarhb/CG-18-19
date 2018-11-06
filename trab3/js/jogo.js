/*global THREE, requestAnimationFrame, console*/

var camera, scene, renderer;
var camera1, camera2,camera3,camera4,camera5;
var geometry, material, mesh;
var wWidth = window.innerWidth;
var wHeight = window.innerHeight;
var originalAspect = wWidth / wHeight;
var holopho=new Array();
var perspetiva,ortegonal;
var ZOOM=3;
var ASPECT=1;
var aument=0;
var ball,floor,cone;
var lightHelper;
var shadowCameraHelper;
var ambient_light,light;
var cone1,cone2;
var teta=0;
var omega=0;

class Entity extends THREE.Object3D{
    constructor(x,y,z){
        super();
        this.position.set(x,y,z)
    }
}

class Cone extends Entity{
    constructor(x,y,z,num){
        super();
        this.y=y;
        this.z=z;
        this.x=x;
        geometry=new THREE.CylinderGeometry( 20,10, 10,10);
        material=new THREE.MeshBasicMaterial({color:0x0000ff,wireframe:false});
        mesh=new THREE.Mesh(geometry,material);
        this.add(mesh);

        this.position.set(x,y,z);
        console.log('posicionei');
        if(num==0){
            this.rotation.z=-Math.atan2(Math.sqrt(this.x*this.x+this.z*this.z),this.y);
            //this.rotation.y=Math.atan2(this.x,this.z) ;
        }
        if(num==1){
            this.rotation.z=Math.atan2(Math.sqrt(this.x*this.x+this.z*this.z),this.y);
            //this.rotation.y=Math.atan2(this.x,this.z) ;            
        }
        if(num==2){
            this.rotation.z=Math.atan2(Math.sqrt(this.x*this.x+this.z*this.z),this.y);
            //this.rotation.z=-Math.atan2(this.x,this.z) ;                        
        }
        if(num==3){
            this.rotation.z=-Math.atan2(Math.sqrt(this.x*this.x+this.z*this.z),this.y);
            //this.rotation.y=Math.atan2(this.x,this.z) ;            
        }
        scene.add(this);
    }
}

function turn_on_off(light){
    var a=0;
    if(light.intensity==0){
        light.intensity=2;
        a++;
    }
    if(light.intensity==2 &&a==0){
        light.intensity=0;
    }      
}

function createholophote(){
    var i;
    console.log('entrei');
    for(i=0;i<4;i++){
        holopho[i] = new THREE.SpotLight(  0xffffff,2,110,0.30,0.250,1.7 );
        console.log('estou aqui',holopho)

        if(i==0){
            holopho[i].position.set( -3, 2, -3 );
            cone1=new Cone(-3,2,-3,0);

        }
        if(i==1){
            holopho[i].position.set( -3, 2, 3 );
            cone2=new Cone(-3,2,3,1);
        }        
        if(i==2){
            holopho[i].position.set( 3, 2, -3 );
            cone3=new Cone(3,2,-3,2);
        }
        if(i==3){
            holopho[i].position.set( 3, 2, 3 );
            cone4=new Cone(3,2,3,3);
        }

        holopho[i].castShadow = true;

        holopho[i].shadow.camera.near = 0.1;
        holopho[i].shadow.camera.far = 25;
        //holopho[i].shadow.camera.fov = 30;
        lightHelper = new THREE.SpotLightHelper( holopho[i] );
        scene.add( lightHelper );
        shadowCameraHelper = new THREE.CameraHelper( holopho[i].shadow.camera );
        scene.add( shadowCameraHelper );
        scene.add( holopho[i] );
    }
}


function create_box(){
    geometry=new THREE.BoxGeometry(1,1,1);
    material=new THREE.MeshPhongMaterial({color:0xff4000,wireframe:false});
    ball=new THREE.Mesh(geometry,material);
    ball.position.y+=1;
    scene.add(ball);
    geometry=new THREE.PlaneGeometry(10,10,10,10);
    material=new THREE.MeshPhongMaterial({color:0xffffff,wireframe:false});
    floor=new THREE.Mesh(geometry,material);
    floor.rotation.x-=Math.PI /2;
    scene.add(floor);


}
function createScene() {
    'use strict';
    scene = new THREE.Scene();
    scene.add(new THREE.AxisHelper(10));
    create_box();
    ambient_light=new THREE.AmbientLight(0xffffff,0.2);
    scene.add(ambient_light);
    createholophote();
 
}

function createCamera() {
    'use strict';
    camera1 = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera1.position.set(0 , 2, -5 );

    camera2 = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight,0.1, 10000);
    camera2.position.z = 2;
    camera2.position.x = -2;
    camera2.position.y = 2;
    camera4 = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight,0.1, 10000);
    camera4.position.z = 2;
    camera4.position.x = 2;
    camera4.position.y = 2;
    camera3=new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera3.position.y=2;
    camera3.position.x=-2;
    camera3.position.z=-2;
    camera5=new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera5.position.y=2;
    camera5.position.x=2;
    camera5.position.z=-2;
   // camera.lookAt(scene.position);
}

function onResize() {
    'use strict'

    screen = resize_Aux()

    if (window.innerWidth > 0 && window.innerHeight > 0) {

            if (perspetiva==1)
                camera.aspect = screen.w / screen.h

            else if (ortegonal==1) {
                camera.left = screen.w * -ZOOM
                camera.right = screen.w * ZOOM
                camera.top = screen.h * ZOOM
                camera.bottom = screen.h * -ZOOM
            }

            camera.updateProjectionMatrix()
    }

    renderer.setSize(window.innerWidth, window.innerHeight)
}

function resize_Aux() {
    'use strict'
    var width;
    var height;
    var scale = window.innerWidth / window.innerHeight

    if(scale > ASPECT) { // higher width
        // height = window.innerHeight
        // width = height * ASPECT
        width = scale * 50;
        height = 50;
    }
    else { // higher height
        // width = window.innerWidth
        // height = width / ASPECT
        width = ASPECT * 50;
        height = width / scale;
    }

    return {w: width, h: height}
}


function render() {
    'use strict';
    renderer.render(scene, camera);
}

function onKeyDown(e) {
    'use strict';
    switch (e.keyCode) {
    case 49: //1
        //camera=camera1;
        turn_on_off(holopho[0]);     
        perspetiva=0;
        ortegonal=1;
        

        break;
    case 50://2
        //camera=camera2;
        perspetiva=1;
        ortegonal=0;
        turn_on_off(holopho[1]);
        
        //camera.lookAt(scene.position);
 
        break;
    case 51://3
        //camera=camera3;
        perspetiva=1;
        ortegonal=0;
        turn_on_off(holopho[2]);
        //camera.lookAt(scene.position);
   
        break;
    case 52://4
        //camera=camera4;
        perspetiva=1;
        turn_on_off(holopho[3]);
        ortegonal=0;
        //camera.lookAt(scene.position);
  
        break;
    case 53://5
        camera=camera4;
        camera.lookAt(holopho[3].position);
        break;
    case 54://6
        camera=camera3;
        camera.lookAt(holopho[0].position);
        break;
    case 55://7
        camera=camera2;
        camera.lookAt(holopho[1].position);
        break;
    case 56://8
        camera=camera5;
        camera.lookAt(holopho[2].position);
        break;

    case 37://left
        teta=-1;
        console.log('rodar');
        ball.rotation.y+=teta*Math.PI/180; 

        break;
    
    case 39://right
        teta=1;
        console.log('rodar');
        ball.rotation.y+=teta*Math.PI/180;
        break;
    case 40://down
        teta=-1;
        console.log('rodar');
        ball.rotation.x+=teta*Math.PI/180;
        break;
    case 38://up
        teta=1;
        console.log('rodar');
        ball.rotation.x+=teta*Math.PI/180;
        break;
    }

}

function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enable=true;
    renderer.shadowMap.type=THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);
    createScene();
    createCamera();
    camera=camera1;
    perspetiva=0;
    ortegonal=1;
    camera.lookAt(scene.position);
    render();
    onResize();
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    //setInterval(move_balls,25);
}

function animate() {
    'use strict';
    render();
    requestAnimationFrame(animate);
}
