/*global THREE, requestAnimationFrame, console*/

var camera, scene, renderer;
var camera1, camera2,camera3,camera4;
var geometry, material, mesh;
var wWidth = window.innerWidth;
var wHeight = window.innerHeight;
var originalAspect = wWidth / wHeight;
var floor,parede1,parede2,parede3,parede4,num;
var plane;
var ang_degrees = 22.5;
var teta;
var lightHelper;
var shadowCameraHelper;
var ambient_light,light;
var cone1,cone2,cone3,cone4;
var holopho=new Array();
var sun;


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
        geometry=new THREE.CylinderGeometry( 20, 10, 10,10);
        material=new THREE.MeshPhongMaterial({color:0x0000ff,wireframe:true});
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
        light.intensity=5;
        a++;
    }
    if(light.intensity==5 &&a==0){
        light.intensity=0;
    }      
}

function create_floor(){
    geometry=new THREE.PlaneGeometry(1000,1000,1000,10);
    material=new THREE.MeshPhongMaterial({color:0xffffff,wireframe:false});
    floor=new THREE.Mesh(geometry,material);
    floor.rotation.x-=Math.PI /2;
    floor.position.set(0,-135,0);
    floor.receiveShadow = true;
    scene.add(floor);
}
function createholophote(){
    var i;
    console.log('entrei');
    for(i=0;i<4;i++){
        holopho[i] = new THREE.SpotLight(0xffffff,5,250,1.5,0.01,1);
        console.log('estou aqui',holopho)

        if(i==0){
            holopho[i].position.set( -75, 100, -75  );
            cone1=new Cone(-75,100,-75,0);

        }
        if(i==1){
            holopho[i].position.set( -75, 100, 75 );
            cone2=new Cone(-75,100,75,1);
        }        
        if(i==2){
            holopho[i].position.set( 75, 100, -75 );
            cone3=new Cone(75,100,-75,2);
        }
        if(i==3){
            holopho[i].position.set( 75, 100, 75 );
            cone4=new Cone(75,100,75,3);
        }

        holopho[i].castShadow = true;

        holopho[i].shadow.camera.near = 1;
        holopho[i].shadow.camera.far = 25;
        holopho[i].shadow.camera.fov = 30;
        //lightHelper = new THREE.SpotLightHelper( holopho[i] );
        //scene.add( lightHelper );
        //shadowCameraHelper = new THREE.CameraHelper( holopho[i].shadow.camera );
        //scene.add( shadowCameraHelper );
        scene.add( holopho[i] );
    }
}


class aviao extends THREE.Object3D{
    constructor(x,y,z){
        super();
        this.Fuzilagem(x, y, z)
        this.CockPit(x, y, z)
        this.Asas(x, y, z)
        this.Estabilizador_Hori(x, y, z)
        this.Estabilizador_Vert(x, y, z)
        scene.add(this);
}
    Fuzilagem(x, y, z){
        'use strict'
        
        geometry = new THREE.Geometry()
        
        geometry.vertices.push( 
                                //parte de cima
                                new THREE.Vector3(-70, 15, 10), // 0
                                new THREE.Vector3(-70, 15, -10), // 1
                                new THREE.Vector3(-35, 20, 20),  // 2
                                new THREE.Vector3(-35, 20, -20), // 3

                                new THREE.Vector3( -70, -15, 10),// 4
                                new THREE.Vector3(-70, -15, -10),// 5
                                new THREE.Vector3(-35, -20, 20), // 6
                                new THREE.Vector3(-35, -20, -20), // 7
                                
                                new THREE.Vector3(0, 20, 20), // 8
                                new THREE.Vector3(0, 20, -20), // 9
                                new THREE.Vector3(0, -20, 20), // 10
                                new THREE.Vector3(0, -20, -20), // 11

                                new THREE.Vector3(35, 20, 20), // 12
                                new THREE.Vector3(35, 20, -20), // 13
                                new THREE.Vector3(35, -20, 20), // 14
                                new THREE.Vector3(35, -20, -20), // 15

                                new THREE.Vector3(70, 20, 20), // 16
                                new THREE.Vector3(70, 20, -20), // 17
                                new THREE.Vector3(70, -20, 20), // 18
                                new THREE.Vector3(70,-20, -20), // 19

                                new THREE.Vector3(90, 15, 10), // 20
                                new THREE.Vector3(90, 15, -10),// 21
                                new THREE.Vector3(90, -15, 10),// 22
                                new THREE.Vector3(90, -15, -10),// 23

                                new THREE.Vector3(100, 10, 10), // 24
                                new THREE.Vector3(100, 10, -10), // 25
                                new THREE.Vector3(100, -10, 10), // 26
                                new THREE.Vector3(100, -10, -10), // 27

                                new THREE.Vector3(110, 0, 0) // 28


                                                                        /**,
                                new THREE.Vector3(-35, 10, 5),
                                new THREE.Vector3(-35, 5, 10),
                                new THREE.Vector3(45, 5, -10),
                                new THREE.Vector3(45, 10, -5),
                                new THREE.Vector3(45, 10, 5),
                                new THREE.Vector3(45, 5, 10),
                                new THREE.Vector3(60, 7, -5),
                                new THREE.Vector3(60, 7, 5),**/
                            
                               
                                //parte de baixo
                               /** new THREE.Vector3( -70, 10, -5),
                                new THREE.Vector3(-70, 10, 5),
                                new THREE.Vector3(-35, 5, -10),
                                new THREE.Vector3(-35, 0, -5),
                                new THREE.Vector3(-35, 0, 5),
                                new THREE.Vector3(-35, 5, 10),
                                new THREE.Vector3(45, 5, -10),
                                new THREE.Vector3(45, 0, -5),
                                new THREE.Vector3(45, 0, 5),
                                new THREE.Vector3(45, 5, 10),
                                new THREE.Vector3(60, 3, -5),
                                new THREE.Vector3(60, 3, 5)**/
                              )
        
        geometry.faces.push( new THREE.Face3(3, 1, 0),
                             new THREE.Face3(0, 2, 3),
                             new THREE.Face3(7, 4, 5),
                             new THREE.Face3(4, 7, 6),
                             new THREE.Face3(2, 0, 4),
                             new THREE.Face3(2, 4, 6),
                             new THREE.Face3(7, 5, 1),
                             new THREE.Face3(7, 1, 3),
                             new THREE.Face3(0, 1, 5),
                             new THREE.Face3(0, 5, 4),

                             new THREE.Face3(2, 8, 3),
                             new THREE.Face3(3, 8, 9),
                             new THREE.Face3(2, 10, 8),
                             new THREE.Face3(6, 10, 2),
                             new THREE.Face3(7, 3, 9),
                             new THREE.Face3(7, 9, 11),
                             new THREE.Face3(7, 10, 6),
                             new THREE.Face3(7, 11, 10),

                             new THREE.Face3(9, 8, 12),
                             new THREE.Face3(9, 12, 13),
                             new THREE.Face3(11, 14, 10),
                             new THREE.Face3(11, 15, 14),
                             new THREE.Face3(8, 10, 12),
                             new THREE.Face3(10, 14, 12),
                             new THREE.Face3(9, 15, 11),
                             new THREE.Face3(9, 13, 15),
                             new THREE.Face3(12, 16, 13),
                             new THREE.Face3(13, 16, 17),
                             new THREE.Face3(14, 15, 18),
                             new THREE.Face3(15, 19, 18),
                             new THREE.Face3(12, 14, 16),
                             new THREE.Face3(16, 14, 18),
                             new THREE.Face3(13, 17, 19),
                             new THREE.Face3(13, 19, 15),

                             new THREE.Face3(16, 20, 17),
                             new THREE.Face3(17, 20, 21),
                             new THREE.Face3(18, 19, 22),
                             new THREE.Face3(19, 23, 22),
                             new THREE.Face3(16, 18, 20),
                             new THREE.Face3(18, 22, 20),
                             new THREE.Face3(17, 21, 23),
                             new THREE.Face3(17, 23, 19),
                             new THREE.Face3(21, 20, 24),
                             new THREE.Face3(21, 24, 25),
                             new THREE.Face3(23, 26, 22),
                             new THREE.Face3(23, 26, 27),
                             new THREE.Face3(20, 26, 24),
                             new THREE.Face3(20, 22, 26),
                             new THREE.Face3(23, 27, 26),
                             new THREE.Face3(21, 25, 27),
                             new THREE.Face3(21, 27, 23),

                             new THREE.Face3(25, 24, 28),
                             new THREE.Face3(27, 25, 28),
                             new THREE.Face3(26, 27, 28),
                             new THREE.Face3(24, 26, 28)
                        )
        geometry.computeFaceNormals();
        material = new THREE.MeshPhongMaterial({ color: 0x0077FF, wireframe: false, vertexColors: THREE.VertexColors})
        mesh = new THREE.Mesh(geometry, material)
        
        //mesh.receiveShadow = true;
        mesh.castShadow = true;
        this.position.set(x, y, z)
        this.add(mesh)
    }
    
    Asas(x, y, z){
        'use strict'
        
        geometry = new THREE.Geometry()
        
        geometry.vertices.push(
            
                                //vertices da parte de cima
                                new THREE.Vector3( 15, 20, 20), // 0
                                new THREE.Vector3(25, 20, 20), // 1
                                new THREE.Vector3(15, 20, 40), // 2
                                new THREE.Vector3(25, 20, 40), // 3
                                new THREE.Vector3(15, 20, 60), // 4
                                new THREE.Vector3(25, 20, 60), // 5
                                new THREE.Vector3(15, 20, 80), // 6
                                new THREE.Vector3(25, 20, 80), // 7
                                new THREE.Vector3(15, 20, 100), // 8
                                new THREE.Vector3(25, 20, 100), // 9

                                new THREE.Vector3(5, 20, 20), // 10
                                new THREE.Vector3(15, 20, 20), // 11
                                new THREE.Vector3(5, 20, 40), // 12
                                new THREE.Vector3(15, 20, 40), // 13
                                new THREE.Vector3(5, 20, 60), // 14
                                new THREE.Vector3(15, 20, 60), // 15
                                new THREE.Vector3(5, 20, 80), // 16
                                new THREE.Vector3(15, 20, 80), // 17
                                new THREE.Vector3(5, 20, 100), // 18
                                new THREE.Vector3(15, 20, 100), // 19

                                new THREE.Vector3(-5, 20, 20), // 20
                                new THREE.Vector3(5, 20, 20), // 21
                                new THREE.Vector3(-5, 20, 40), // 22
                                new THREE.Vector3(5, 20, 40), // 23
                                new THREE.Vector3(-5, 20, 60), // 24
                                new THREE.Vector3(5, 20, 60), // 25
                                new THREE.Vector3(-5, 20, 80), // 26
                                new THREE.Vector3(5, 20, 80), // 27
                                new THREE.Vector3(-5, 20, 100), // 28
                                new THREE.Vector3(5, 20, 100), // 29

                                new THREE.Vector3(-15, 20, 20), // 30
                                new THREE.Vector3(-5, 20, 20), // 31
                                new THREE.Vector3(-15, 20, 40), // 32
                                new THREE.Vector3(-5, 20, 40), // 33
                                new THREE.Vector3(-15, 20, 60), // 34
                                new THREE.Vector3(-5, 20, 60), // 35
                                new THREE.Vector3(-15, 20, 80), // 36
                                new THREE.Vector3(-5, 20, 80), // 37
                                new THREE.Vector3(-15, 20, 100), // 38
                                new THREE.Vector3(-5, 20, 100), // 39

                                new THREE.Vector3( 25, 20, 20), // 40
                                new THREE.Vector3(35, 20, 20), // 41
                                new THREE.Vector3(25, 20, 40), // 42
                                new THREE.Vector3(35, 20, 40), // 43
                                new THREE.Vector3(25, 20, 60), // 44
                                new THREE.Vector3(35, 20, 60), // 45
                                new THREE.Vector3(25, 20, 80), // 46
                                new THREE.Vector3(35, 20, 80), // 47
                                new THREE.Vector3(25, 20, 100), // 48
                                new THREE.Vector3(35, 20, 100), // 49

                                new THREE.Vector3(35, 20, 20), // 50
                                new THREE.Vector3(45, 20, 20), // 51
                                new THREE.Vector3(35, 20, 40), // 52
                                new THREE.Vector3(45, 20, 40), // 53
                                new THREE.Vector3(35, 20, 60), // 54
                                new THREE.Vector3(45, 20, 60), // 55
                                new THREE.Vector3(35, 20, 80), // 56
                                new THREE.Vector3(45, 20, 80), // 57
                                new THREE.Vector3(35, 20, 100), // 58
                                new THREE.Vector3(45, 20, 100), // 59

                                new THREE.Vector3( 15, 20, -20), // 60
                                new THREE.Vector3(25, 20, -20), // 61
                                new THREE.Vector3(15, 20, -40), // 62
                                new THREE.Vector3(25, 20, -40), // 63
                                new THREE.Vector3(15, 20, -60), // 64
                                new THREE.Vector3(25, 20, -60), // 65
                                new THREE.Vector3(15, 20, -80), // 66
                                new THREE.Vector3(25, 20, -80), // 67
                                new THREE.Vector3(15, 20, -100), // 68
                                new THREE.Vector3(25, 20, -100), // 69

                                new THREE.Vector3(5, 20, -20), // 70
                                new THREE.Vector3(15, 20, -20), // 71
                                new THREE.Vector3(5, 20, -40), // 72
                                new THREE.Vector3(15, 20, -40), // 73
                                new THREE.Vector3(5, 20, -60), // 74
                                new THREE.Vector3(15, 20, -60), // 75
                                new THREE.Vector3(5, 20, -80), // 76
                                new THREE.Vector3(15, 20, -80), // 77
                                new THREE.Vector3(5, 20, -100), // 78
                                new THREE.Vector3(15, 20, -100), // 79

                                new THREE.Vector3(-5, 20, -20), // 80
                                new THREE.Vector3(5, 20, -20), // 81
                                new THREE.Vector3(-5, 20, -40), // 82
                                new THREE.Vector3(5, 20, -40), // 83
                                new THREE.Vector3(-5, 20, -60), // 84
                                new THREE.Vector3(5, 20, -60), // 85
                                new THREE.Vector3(-5, 20, -80), // 86
                                new THREE.Vector3(5, 20, -80), // 87
                                new THREE.Vector3(-5, 20, -100), // 88
                                new THREE.Vector3(5, 20, -100), // 89

                                new THREE.Vector3(-15, 20, -20), // 90
                                new THREE.Vector3(-5, 20, -20), // 91
                                new THREE.Vector3(-15, 20, -40), // 92
                                new THREE.Vector3(-5, 20, -40), // 93
                                new THREE.Vector3(-15, 20, -60), // 94
                                new THREE.Vector3(-5, 20, -60), // 95
                                new THREE.Vector3(-15, 20, -80), // 96
                                new THREE.Vector3(-5, 20, -80), // 97
                                new THREE.Vector3(-15, 20, -100), // 98
                                new THREE.Vector3(-5, 20, -100), // 99

                                new THREE.Vector3( 25, 20, -20), // 100
                                new THREE.Vector3(35, 20, -20), // 101
                                new THREE.Vector3(25, 20, -40), // 102
                                new THREE.Vector3(35, 20, -40), // 103
                                new THREE.Vector3(25, 20, -60), // 104
                                new THREE.Vector3(35, 20, -60), // 105
                                new THREE.Vector3(25, 20, -80), // 106
                                new THREE.Vector3(35, 20, -80), // 107
                                new THREE.Vector3(25, 20, -100), // 108
                                new THREE.Vector3(35, 20, -100), // 109

                                new THREE.Vector3(35, 20, -20), // 110
                                new THREE.Vector3(45, 20, -20), // 111
                                new THREE.Vector3(35, 20, -40), // 112
                                new THREE.Vector3(45, 20, -40), // 113
                                new THREE.Vector3(35, 20, -60), // 114
                                new THREE.Vector3(45, 20, -60), // 115
                                new THREE.Vector3(35, 20, -80), // 116
                                new THREE.Vector3(45, 20, -80), // 117
                                new THREE.Vector3(35, 20, -100), // 118
                                new THREE.Vector3(45, 20, -100) // 119 
                            )
        
        geometry.faces.push(
                             //parte de cima
                                new THREE.Face3(3,1,0),
                                new THREE.Face3(2, 3, 0),
                                new THREE.Face3(4, 3, 2),
                                new THREE.Face3(4, 5, 3),
                                new THREE.Face3(6, 7, 4),
                                new THREE.Face3(7, 5, 4),
                                new THREE.Face3(6, 8, 7),
                                new THREE.Face3(8, 9, 7),

                                new THREE.Face3(13, 11, 10),
                                new THREE.Face3(12, 13, 10),
                                new THREE.Face3(14, 13, 12),
                                new THREE.Face3(14, 15, 13),
                                new THREE.Face3(16, 17, 14),
                                new THREE.Face3(17, 15, 14),
                                new THREE.Face3(16, 18, 17),
                                new THREE.Face3(18, 19, 17),

                                new THREE.Face3(23, 21, 20),
                                new THREE.Face3(22, 23, 20),
                                new THREE.Face3(24, 23, 22),
                                new THREE.Face3(24, 25, 23),
                                new THREE.Face3(26, 27, 24),
                                new THREE.Face3(27, 25, 24),
                                new THREE.Face3(26, 28, 27),
                                new THREE.Face3(28, 29, 27),

                                new THREE.Face3(33, 31, 30),
                                new THREE.Face3(32, 33, 30),
                                new THREE.Face3(34, 33, 32),
                                new THREE.Face3(34, 35, 33),
                                new THREE.Face3(36, 37, 34),
                                new THREE.Face3(37, 35, 34),
                                new THREE.Face3(36, 38, 37),
                                new THREE.Face3(38, 39, 37),

                                new THREE.Face3(43, 41, 40),
                                new THREE.Face3(42, 43, 40),
                                new THREE.Face3(44, 43, 42),
                                new THREE.Face3(44, 45, 43),
                                new THREE.Face3(46, 47, 44),
                                new THREE.Face3(47, 45, 44),
                                new THREE.Face3(46, 48, 47),
                                new THREE.Face3(48, 49, 47),

                                new THREE.Face3(53, 51, 50),
                                new THREE.Face3(52, 53, 50),
                                new THREE.Face3(54, 53, 52),
                                new THREE.Face3(54, 55, 53),
                                new THREE.Face3(56, 57, 54),
                                new THREE.Face3(57, 55, 54),
                                new THREE.Face3(56, 58, 57),
                                new THREE.Face3(58, 59, 57),

                                new THREE.Face3(63, 60, 61),
                                new THREE.Face3(62, 60, 63),
                                new THREE.Face3(64, 62, 63),
                                new THREE.Face3(64, 63, 65),
                                new THREE.Face3(66, 64, 67),
                                new THREE.Face3(67, 64, 65),
                                new THREE.Face3(66, 67, 68),
                                new THREE.Face3(68, 67, 69),

                                new THREE.Face3(73, 70, 71),
                                new THREE.Face3(72, 70, 73),
                                new THREE.Face3(74, 72, 73),
                                new THREE.Face3(74, 73, 75),
                                new THREE.Face3(76, 74, 77),
                                new THREE.Face3(77, 74, 75),
                                new THREE.Face3(76, 77, 78),
                                new THREE.Face3(78, 77, 79),

                                new THREE.Face3(83, 80, 81),
                                new THREE.Face3(82, 80, 83),
                                new THREE.Face3(84, 82, 83),
                                new THREE.Face3(84, 83, 85),
                                new THREE.Face3(86, 84, 87),
                                new THREE.Face3(87, 84, 85),
                                new THREE.Face3(86, 87, 88),
                                new THREE.Face3(88, 87, 89),

                                new THREE.Face3(93, 90, 91),
                                new THREE.Face3(92, 90, 93),
                                new THREE.Face3(94, 92, 93),
                                new THREE.Face3(94, 93, 95),
                                new THREE.Face3(96, 94, 97),
                                new THREE.Face3(97, 94, 95),
                                new THREE.Face3(96, 97, 98),
                                new THREE.Face3(98, 97, 99),

                                new THREE.Face3(103, 100, 101),
                                new THREE.Face3(102, 100, 103),
                                new THREE.Face3(104, 102, 103),
                                new THREE.Face3(104, 103, 105),
                                new THREE.Face3(106, 104, 107),
                                new THREE.Face3(107, 104, 105),
                                new THREE.Face3(106, 107, 108),
                                new THREE.Face3(108, 107, 109),

                                new THREE.Face3(113, 110, 111),
                                new THREE.Face3(112, 110, 113),
                                new THREE.Face3(114, 112, 113),
                                new THREE.Face3(114, 113, 115),
                                new THREE.Face3(116, 114, 117),
                                new THREE.Face3(117, 114, 115),
                                new THREE.Face3(116, 117, 118),
                                new THREE.Face3(118, 117, 119)                                   

                             // parte de baixo

                            
                            
                             // Licacoes entre as laterais das asas
                          )
        geometry.computeFaceNormals();
        material = new THREE.MeshPhongMaterial({ color: 0x000099, wireframe: false, vertexColors: THREE.VertexColors})
        mesh = new THREE.Mesh(geometry, material)
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        this.position.set(x, y, z)
        this.add(mesh)
    }
    
    CockPit(x, y, z){/**
        'use strict'
        
        geometry = new THREE.Geometry()
        
        geometry.vertices.push( new THREE.Vector3(45, 10, -5),
                                new THREE.Vector3(45, 10, 5),
                                new THREE.Vector3(53, 10, -5),
                                new THREE.Vector3(53, 10, 5),
                                new THREE.Vector3(60, 7, -5),
                                new THREE.Vector3(60, 7, 5),
                                new THREE.Vector3(45, 7, -5),
                                new THREE.Vector3(45, 7, 5)
                              )
        
        geometry.faces.push( new THREE.Face3(0, 1, 2),
                             new THREE.Face3(1, 3, 2),
                             new THREE.Face3(2, 3, 5),
                             new THREE.Face3(4, 2, 5),
                             new THREE.Face3(6, 0, 4),
                             new THREE.Face3(0, 2, 4),
                             new THREE.Face3(3, 1, 5),
                             new THREE.Face3(1, 7, 5)
                             )
        
        
        material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true, vertexColors: THREE.VertexColors})
        mesh = new THREE.Mesh(geometry, material)

        this.position.set(x, y, z)
        this.add(mesh)**/
    }
    
    Estabilizador_Vert(x, y, z){
        'use strict'
        
        geometry = new THREE.Geometry()
        
        geometry.vertices.push(
                                //parte de cima
                                new THREE.Vector3(-70, 15, -2),//0
                                new THREE.Vector3(-70, 15, 2),//1
                                new THREE.Vector3(-120, 50, -2),//2
                                new THREE.Vector3(-120, 50, 2),//3
                                new THREE.Vector3(-120, 15, -2),//4
                                new THREE.Vector3(-120, 15, 2),//5

                                //parte de baixo
                                new THREE.Vector3(-70,13,-2),//6
                                new THREE.Vector3(-70,13,2),//7
                                new THREE.Vector3(-120,13,2),//8
                                new THREE.Vector3(-120,13,-2),//9
                                new THREE.Vector3(-70,0,2),//10
                                new THREE.Vector3(-70,0,-2)//11
                              )
        
        geometry.faces.push(
                            //parte de cima
                             new THREE.Face3(1, 0, 3),
                             new THREE.Face3(0, 2, 3),
                             new THREE.Face3(2, 0, 4),
                             new THREE.Face3(5, 1, 3),
                             new THREE.Face3(3, 2, 5),
                             new THREE.Face3(4, 5, 2),

                             //parte de baixo
                             new THREE.Face3(10, 7, 8),
                             new THREE.Face3(9, 6, 11),
                             new THREE.Face3(10, 8, 9),
                             new THREE.Face3(9,11,10),

                             )
        
        geometry.computeFaceNormals();
        material = new THREE.MeshPhongMaterial({ color: 0x000099 , wireframe: false, vertexColors: THREE.VertexColors})
        mesh = new THREE.Mesh(geometry, material)
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        this.position.set(x, y, z);
        this.add(mesh)
    }
    
    Estabilizador_Hori(x, y, z){
        'use strict'
        
        geometry = new THREE.Geometry()
        
        geometry.vertices.push( 
                                //lado esquerdo
                                new THREE.Vector3(-120, 15, 0),
                                new THREE.Vector3(-120, 15, -35),
                                new THREE.Vector3(-70, 15, 0),
                                new THREE.Vector3(-120, 11, 0),
                                new THREE.Vector3(-120, 11, -35),
                                new THREE.Vector3(-70, 11, 0),
                               
                                // lado direito
                                new THREE.Vector3(-120, 15, 0),//6
                                new THREE.Vector3(-120, 15, 35),//7
                                new THREE.Vector3(-70, 15, 0),//8
                                new THREE.Vector3(-120,11, 0),//9
                                new THREE.Vector3(-120, 11, 35),//10
                                new THREE.Vector3(-70, 11, 0)//11
                              )
        
        geometry.faces.push( 
                            //lado esquerdo
                             new THREE.Face3(2, 1, 0),
                             new THREE.Face3(5, 4, 3),
                            
                             // lado esquerdo lados
                             new THREE.Face3(0, 1, 4),
                             new THREE.Face3(0, 4, 3),
                             new THREE.Face3(5,1, 2),
                             new THREE.Face3(5, 4, 1),
            
            
                             // lado direito
                             new THREE.Face3(6, 7, 8),
                             new THREE.Face3(9, 10, 11),
            
                             // lado direito lados
                             new THREE.Face3(8, 7, 11),
                             new THREE.Face3(7, 10, 11),
                             new THREE.Face3(10, 7, 6),
                             new THREE.Face3(6, 9, 10)
                             )
        
        
        geometry.computeFaceNormals();
        material = new THREE.MeshPhongMaterial({ color: 0x000099, wireframe: false, vertexColors: THREE.VertexColors})
        mesh = new THREE.Mesh(geometry, material)
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        this.position.set(x, y, z)
        
        this.add(mesh)
    }
}
function createScene() {
    'use strict';
    scene = new THREE.Scene();
    scene.add(new THREE.AxisHelper(10));
    createSun();
    createholophote();
    plane = new aviao(0,0,0);
    create_floor();
    scene.add(plane);



}

function createCamera() {
    'use strict';
    camera1 = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera1.position.set(100, 100, 200 );

    camera2 = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight,0.1, 10000);
    camera2.position.z = 0;
    camera2.position.x = -160;
    camera2.position.y = 10;
    camera4 = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight,0.1, 10000);
    camera4.position.z = 10;
    camera4.position.x = -10;
    camera4.position.y = 150;
    camera3=new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera3.position.y=13;
    camera3.position.x=-100;
    camera3.position.z=-65;

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
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;
}

function createSun(){
    ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    sun = new THREE.DirectionalLight(0xffffff, 0.8);
    sun.position.set( 0, 125, 0);
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

function switchMaterial(){
    if (cubo.isMeshPhongMaterial == true) {
      material = new THREE.MeshLambertMaterial({ color: 0xff0000, wireframe: WireFrame });
    }
    else {
      material = new THREE.MeshPhongMaterial({ color: 0xff0000, wireframe: WireFrame });
    }
}

function switchSun(){
  if (ambientLight.visible == true){
    sun.visible = !sun.visible;
  }
}

function onKeyDown(e) {
    'use strict';
    switch (e.keyCode) {
    case 49: //1
        turn_on_off(holopho[0]);         

        break;
    case 50://2
        turn_on_off(holopho[1]);
 
        break;
    case 51://3
        turn_on_off(holopho[2]);  
        break;
    case 52://4
        turn_on_off(holopho[3]);
  
        break;
    case 53: //5
        camera=camera1;
        camera.lookAt(scene.position);
        break;
    case 54://6
        camera=camera2;
        camera.lookAt(scene.position);
        break;
    case 55://7
        camera=camera4;
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        break;
    case 56://7
        camera=camera3;
        camera.lookAt(new THREE.Vector3(-100, 15, -2));
        break;
    case 69:  //E
    case 101: //e
        scene.traverse(function (node) {
            if (node instanceof THREE.AxisHelper) {
                node.visible = !node.visible;
            }
        });
        break;
    case 37://left
        teta=-1;
        console.log('rodar');
        plane.rotation.y+=teta*Math.PI/180; 

        break;
    case 39:
        teta=1;
        console.log('rodar');
        plane.rotation.y+=teta*Math.PI/180;
        break;
    case 40://down
        teta=-1;
        console.log('rodar');
        plane.rotation.z+=teta*Math.PI/180;
        break;
    case 38://up
        teta=1;
        console.log('rodar');
        plane.rotation.z+=teta*Math.PI/180;
        break;
    case 78: //N
        switchSun();
        break;
    case 76: //L
        switchIlumination();
        break;
    case 71: //G
        switchMaterial();
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
    requestAnimationFrame(animate);
}
