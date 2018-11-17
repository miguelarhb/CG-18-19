<<<<<<< HEAD


var lightHelper;
var shadowCameraHelper;
var ambient_light,light;
var sun;
var ilumination=true,light_change=false,sun_change=false;





function createholophote(){
    
    console.log('entrei');
    light = new THREE.PointLight(0xffffff,1.5,50);
    
    light.position.set( -30, 15, 0  );
    //light.target.set(10 , 0, -10 );
    cone1=new Cone(-35,25,0);
    light.castShadow = true;
    scene.add( light);
 
}

function createSun(){
    /*ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);*/

    sun = new THREE.DirectionalLight(0xffffff, 0.6);
    sun.position.set( 30, 100, 30);
    sun.castShadow=true;
    scene.add(sun);
}

function switchSun(){
    sun.visible = !sun.visible;
    /*for (i=0;i<4;i++){
        holopho[i].visible = !flag;
    }*/
}

function turn_on_off(){
    light.visible = !light.visible;
}

function switchIlumination(){
	if(ilumination==true){
		if(light.visible==true){
			light.visible=!light.visible;
			light_change=true;
		}
		if(sun.visible==true){
			sun.visible=!sun.visible;
			sun_change=true;
		}
	}
	else{
		if(light_change==true){
			light.visible=!light.visible;
			light_change=!light_change;
		}
		if(sun_change==true){
			sun.visible=!sun.visible;
			sun_change=!sun_change;
		}
	}
	ilumination=!ilumination;
}



=======


var lightHelper;
var shadowCameraHelper;
var ambient_light,light;
var sun;

function turn_on_off(light){
    var a=0;
    if(light.intensity==0){
        light.intensity=5;
        a++;
    }
    if(light.intensity==5 &&a==0){
        light.intensity=0;
    }      
}


function createholophote(){
    
    console.log('entrei');
    light = new THREE.PointLight(0xffffff,2,50);
    
    light.position.set( -30, 15, 0  );
    //light.target.set(10 , 0, -10 );
    cone1=new Cone(-30,25,0);
    light.castShadow = true;
    scene.add( light);
 
}

function createSun(){
    /*ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);*/

    sun = new THREE.DirectionalLight(0xffffff, 0.6);
    sun.position.set( 30, 100, 30);
    sun.castShadow=true;
    scene.add(sun);
}

function switchIlumination(){
    var flag = ambientLight.visible;
    ambientLight.visible = !flag;
    sun.visible = !flag;
    for (i=0;i<4;i++){
        holopho[i].visible = !flag;
    }
}

>>>>>>> f09dd7b50c71fc1a64f7202b1dd161afea1f499e
