/*global THREE, requestAnimationFrame, console*/


var geometry,material,mesh,texture;
var rubix;
var pool_ball;
var board;




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
        geometry=new THREE.CylinderGeometry( 5, 2, 7,10);
        material=new THREE.MeshPhongMaterial({color:0x0000ff,wireframe:false});
        mesh=new THREE.Mesh(geometry,material);
        this.add(mesh);

        this.position.set(x,y,z);
        console.log('posicionei');
        console.log('mudei 0');
            
        this.rotation.z=-Math.PI/1.2 ;

        scene.add(this);
    }
}

class Ball extends Entity{
    constructor(x,y,z){
        super();
        this.x=x;
        this.y=y;
        this.z=z;
        texture=THREE.ImageUtils.loadTexture( 'js/img/ball.png' );
        texture.crossOrigin = "Anonymous"
        texture.wrapS = THREE.repeatWrapping; 
        texture.wrapT = THREE.repeatWrapping;
        texture.repeat.set(1,1);

        geometry=new THREE.SphereGeometry(5,50,50);
        material=new THREE.MeshPhongMaterial({map:texture,wireframe:false});
        mesh=new THREE.Mesh(geometry,material);
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        this.add(mesh);
        this.position.set(x,y,z);
        scene.add(this);
    }

}

class Cube extends Entity{
    constructor(x,y,z){
        super();
        this.x=x;
        this.y=y;
        this.z=z;
        texture=THREE.ImageUtils.loadTexture( 'js/img/cube.jpg' );
        texture.crossOrigin = "Anonymous"
        texture.wrapS = THREE.repeatWrapping; 
        texture.wrapT = THREE.repeatWrapping;
        texture.repeat.set(1,1);
        geometry=new THREE.BoxGeometry(20,20,20,10,10);
        material=new THREE.MeshPhongMaterial({map:texture,wireframe:false});
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
        texture.crossOrigin = "Anonymous"
        texture.wrapS = THREE.repeatWrapping; 
        texture.wrapT = THREE.repeatWrapping;
        texture.repeat.set(1,1);

        geometry=new THREE.PlaneGeometry(150,150,50,50);
        material=new THREE.MeshPhongMaterial({map:texture,wireframe:false, shininess: 50});

        mesh=new THREE.Mesh(geometry,material);
        mesh.receiveShadow = true;
        mesh.rotation.x-=Math.PI /2;
        this.add(mesh);
        this.position.set(x,y,z);
        scene.add(this);
    }
}

