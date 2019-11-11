
var width = window.innerWidth;
var height = window.innerHeight-50;

//variable for the score and time function
var score =0; 

//found time counter at https://www.w3schools.com/howto/howto_js_countdown.asp and modified to my needs
function time(){
	var countDownDate = new Date().getTime();
	var minus = 30000;
	// Update the count down every 1 second
	var x = setInterval(function() {


		// Get todays date and time
		var now = new Date(countDownDate-minus).getTime();
		minus-=1000;
    
		// Find the distance between now and the count down date
		var distance = countDownDate - now;
    
		// Time calculations for days, hours, minutes and seconds
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
		// Output the result in an element with id="demo"
		document.getElementById("id").innerHTML = minutes + "m " + seconds + "s " + "Score:" + score;
    
		// If the count down is over, write some text 
		if (distance < 0) {
			clearInterval(x);
			document.getElementById("id").innerHTML = score;
		}
	}, 1000);
	
	
	
}









var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0xffffff);
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);
 
// create scene object
var scene = new THREE.Scene;




// create simple geometry and add to scene
var boxGeometry = new THREE.BoxGeometry(2,30, 2);
//var cubeMaterial = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('crate.jpg')});
var boxMaterial = new THREE.MeshLambertMaterial({ color: 0xdddd66});
var cube = new THREE.Mesh(boxGeometry, boxMaterial);
cube.position.x=0;
cube.position.y=0;
cube.position.z=0;
 
 var boxGeometry2 = new THREE.BoxGeometry(2,(Math.random()*30)+1, 2);
//var cubeMaterial = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('crate.jpg')});
var boxMaterial2 = new THREE.MeshLambertMaterial({ color: 0xdddd66});
var cube2 = new THREE.Mesh(boxGeometry2, boxMaterial2);
cube2.position.x=0;
cube2.position.y=0;
cube2.position.z=0;
 


// create perspective camera
var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
camera.position.y = 16;
camera.position.z = 40;
// add to scene and renderer
scene.add(camera); 
renderer.render(scene, camera);
// create the view matrix
camera.lookAt(cube.position);

// add lighting and add to scene 
var pointLight = new THREE.PointLight(0xaabbcc);
pointLight.position.set(10, 16, 16);
scene.add(pointLight);

scene.add(cube);
var checkBoxesX = [];
var checkBoxesZ = [];
checkBoxesX[0]=cube.position.x;
checkBoxesZ[0] = cube.position.z;
for(var i=0; i<1000; i++){
	var trF=false;
	var geom = new THREE.BoxGeometry(2,30, 2);

	var material = new THREE.MeshLambertMaterial({ color: 0xdddd66});
	var box = new THREE.Mesh(geom, material);
	if(i<50){
		box.position.x=Math.random()*100+20;
	box.position.y=0;
	box.position.z=Math.random()*95+1;
	console.log('z: '+ box.position.z);
		
	}
	else{
	box.position.x=Math.random()*i+10;
	box.position.y=0;
	box.position.z=Math.random()*i+5;
	}
	
	for(var j=0; j<checkBoxesX.length; j++){
		if (Math.abs(box.position.x - checkBoxesX[j])<20 && Math.abs(box.position.z - checkBoxesZ[j])<20){
				trF=true;
		}
		
	}
	if(!trF){
		checkBoxesX[i+1]= box.position.x;
		checkBoxesZ[i+1]= box.position.z;
		scene.add(box);
	
	}
}

var firstMouseMove= true;

var camPos = {x: 0, y: 0 , z: -1};

var camMove = new THREE.Vector3(0,0,0), camStrafe = new THREE.Vector3(0,0,0);
var cameraLookAt = new THREE.Vector3(0,0,-1);
var cameraRight = new THREE.Vector3(1,0,0);
var cameraUp = new THREE.Vector3().crossVectors(cameraRight, cameraLookAt);
 
var oldMousePos = {x: 0, y: 0}; 
 
function handleMouseMove(evt) {
	if(firstMouseMove){ 
		oldMousePos.x = event.clientX;
		oldMousePos.y = event.clientY;
		firstMouseMove = false;
		return;
	}
	//turn negative maybe
	var yaw = (oldMousePos.x - event.clientX)/200.0;
	var pitch = (oldMousePos.y - event.clientY)/200.0;
	
	cameraLookAt.applyAxisAngle(new THREE.Vector3(0,1,0), yaw);
	cameraRight.applyAxisAngle(new THREE.Vector3(0,1,0), yaw);
	
	cameraLookAt.applyAxisAngle(cameraRight, pitch);
	
	
	oldMousePos.x = event.clientX;
	oldMousePos.y = event.clientY;
 }
 
function doKeyUp(evt){
	var code = evt.keyCode;
	
	switch(code){
		case 65: //a
			camStrafe.x = 0;
			camStrafe.y = 0;
			camStrafe.z = 0;
			break;
		case 68: //d
			camStrafe.x = 0;
			camStrafe.y = 0;
			camStrafe.z = 0;
			break;
		case 87://w
			camMove.x = 0;
			camMove.y = 0; 
			camMove.z = 0;
			break;
		case 83://s
			camMove.x = 0;
			camMove.y = 0; 
			camMove.z = 0;
			break;
	}
	 
}
var ranInX= [];
var ranInZ= [];
function doKeyDown(evt){
	var code = evt.keyCode;
	var checkCollision= false;
	switch(code){
		case 65://a
			camStrafe.x = -cameraRight.x/1;
			camStrafe.y = -cameraRight.y/1;
			camStrafe.z = -cameraRight.z/1;
			break;
		case 68://d
			camStrafe.x = cameraRight.x/1;
			camStrafe.y = cameraRight.y/1;
			camStrafe.z = cameraRight.z/1;
			break;
			
		case 87://w
			for(var xz=0; xz < checkBoxesX.length; xz++ ){
				if(Math.abs(camera.position.x-checkBoxesX[xz])<10 && Math.abs(camera.position.z - checkBoxesZ[xz])<10){
						for(var scP=0; scP<ranInX.length; scP++){
							if(ranInX[scP]===checkBoxesX[xz] && ranInZ[scP]===checkBoxesZ[xz]){
								checkCollision=true;
							}
							else{
								checkCollision= false
							} 
							
						}
						if (!checkCollision){
							score+=1;
							ranInX.push(checkBoxesX[xz]);
							ranInZ.push(checkBoxesZ[xz]);
						}
						//console.log('score: '+score);
					
				}
			}
			
			camMove.x = cameraLookAt.x/1;
			camMove.y = cameraLookAt.y/1;
			camMove.z = cameraLookAt.z/1;
			break;
		case 83://s
			camMove.x = -cameraLookAt.x/1;
			camMove.y = -cameraLookAt.y/1;
			camMove.z = -cameraLookAt.z/1;
			break;
	}
}
 
 
 
 document.addEventListener('mousemove', handleMouseMove, false);
 document.addEventListener('keydown',doKeyDown,false);
 document.addEventListener('keyup',doKeyUp,false);
 
renderer.render(scene, camera);
function render() {

	camera.position.add(camMove);
	camera.position.add(camStrafe);
	var newLookAt = new THREE.Vector3().addVectors(camera.position, cameraLookAt);
	camera.lookAt(newLookAt);
	camera.up = cameraUp;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
	
    
	
}
render();
time();
