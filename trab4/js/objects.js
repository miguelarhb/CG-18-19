/*global THREE, requestAnimationFrame, console*/


var geometry,material,mesh,texture,bump;
var rubix;
var pool_ball;
var board;
var theta;
var clock = new THREE.Clock();
var delta;



class Entity extends THREE.Object3D{
    constructor(x,y,z){
        super();
        this.position.set(x,y,z)
    }
}


class Cone extends Entity{
    constructor(x,y,z){
        super();
        this.y=y;
        this.z=z;
        this.x=x;
        geometry=new THREE.CylinderGeometry( 3, 1, 5,10);
        material=new THREE.MeshPhongMaterial({color:0x0000ff,wireframe:false});
        mesh=new THREE.Mesh(geometry,material);
        this.add(mesh);

        this.position.set(x,y,z);
        console.log('posicionei');
        console.log('mudei 0');
            
        this.rotation.z=-Math.PI ;

        scene.add(this);
    }
}

class Ball extends Entity{
    constructor(x,y,z){
        super();
        this.init_x=x;
        this.init_y=y;
        this.init_z=z;
        this.x=x;
        this.y=y;
        this.z=z;
        this.radius=Math.sqrt(x*x+z*z);
        this.velocity=0.5;
        this.alpha=0;
        this.paused=false;

        //var helper=new THREE.AxisHelper(20);
        texture=THREE.ImageUtils.loadTexture( 'js/img/ball.png' );
        //texture.crossOrigin = "Anonymous"
        texture.wrapS = THREE.repeatWrapping; 
        texture.wrapT = THREE.repeatWrapping;
        texture.repeat.set(1,1);

        geometry=new THREE.SphereGeometry(5,50,50);
        material=new THREE.MeshPhongMaterial({map:texture,wireframe:false,specular: 0xdddddd, shininess:60});
        mesh=new THREE.Mesh(geometry,material);
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        this.add(mesh);
        //this.add(helper);
        this.position.set(x,y,z);
        scene.add(this);
    }
    reset(){
    	this.position.set(this.init_x,this.init_y,this.init_z);
        this.alpha=0;
        this.paused=false;
    }
    update(){
        if(this.paused==false){
            delta= clock.getDelta();
            this.alpha+=this.velocity*delta;
        }
        
        this.x=Math.sin(this.alpha)*this.radius;
        this.z=Math.cos(this.alpha)*this.radius;
        
        this.position.set(this.x,this.y,this.z);
        this.rotation.y=this.alpha;



    }
    pause(){
        //console.log('parei');
        clock.stop();
        this.paused=true;
    }

    continue(){
        clock.start();
        this.paused=false;
    }

}

class Cube extends Entity{
    constructor(x,y,z){
        super();
        this.x=x;
        this.y=y;
        this.z=z;
        texture=THREE.ImageUtils.loadTexture( 'js/img/cube2.jpg' );
        bump=THREE.ImageUtils.loadTexture( 'js/img/cube_bump2.jpg' );
        //texture.crossOrigin = "Anonymous"
        texture.wrapS = THREE.repeatWrapping; 
        texture.wrapT = THREE.repeatWrapping;
        texture.repeat.set(1,1);
        //bump.crossOrigin = "Anonymous"
        bump.wrapS = THREE.repeatWrapping; 
        bump.wrapT = THREE.repeatWrapping;
        bump.repeat.set(1,1);
        geometry=new THREE.BoxGeometry(20,20,20,10,10);
        material=new THREE.MeshPhongMaterial({map:texture,bumpMap:bump,wireframe:false,shininess: 40});
        material.bumpScale=1;
        mesh=new THREE.Mesh(geometry,material);
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        this.add(mesh);
        this.position.set(x,y,z);
        scene.add(this);
    }

}

class Floor extends Entity{
    constructor(x,y,z){
        super();
        this.x=x;
        this.y=y;
        this.z=z;
        texture=THREE.ImageUtils.loadTexture( 'js/img/quadrado.jpg' );
        //texture.crossOrigin = "Anonymous"
        texture.wrapS = THREE.repeatWrapping; 
        texture.wrapT = THREE.repeatWrapping;
        texture.repeat.set(1,1);

        geometry=new THREE.PlaneGeometry(150,150,50,50);
        material=new THREE.MeshPhongMaterial({map:texture,wireframe:false, shininess: 50,specular: 0x1111111});

        mesh=new THREE.Mesh(geometry,material);
        mesh.receiveShadow = true;
        mesh.rotation.x-=Math.PI /2;
        this.add(mesh);
        this.position.set(x,y,z);
        scene.add(this);
    }
}


class Pause extends Entity{
    constructor(x,y,z){
        super();
        this.x=x;
        this.y=y;
        this.z=z;
        texture=THREE.ImageUtils.loadTexture( 'js/img/pause.jpg' );
        //texture.crossOrigin = "Anonymous"
        texture.wrapS = THREE.repeatWrapping; 
        texture.wrapT = THREE.repeatWrapping;
        texture.repeat.set(1,1);

        geometry=new THREE.PlaneGeometry(10,5,50,50);
        material=new THREE.MeshBasicMaterial({map:texture,wireframe:false});

        mesh=new THREE.Mesh(geometry,material);
        this.add(mesh);
        this.position.set(x,y,z);
        scene.add(this);
    }

    change_position(camera){

       this.position.copy( camera.position );
		this.rotation.copy( camera.rotation );
		this.updateMatrix();
		this.translateZ( - 10 );
    }

}
    





