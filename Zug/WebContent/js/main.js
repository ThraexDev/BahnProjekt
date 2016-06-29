$(window).load(function () {
	var webSocket = 
		new WebSocket('ws://localhost:8080/Zug/websocket');

	webSocket.onerror = function(event) {
		onError(event);
	};

	webSocket.onopen = function(event) {
		onOpen(event);
	};

	webSocket.onmessage = function(event) {
		onMessage(event);
	};

	function onMessage(event) {
		console.log(event.data);
		var command = event.data.split(" ");
		if(command[0] == 'newTrain'){
			create3dZug();
		}
		if(command[0] == 'setSpeed'){
			zuege[parseInt(command[1])].speed = parseFloat(command[2]);
		}
		if(command[0] == 'changeDirection'){
			var dir = zuege[parseInt(command[1])].direct;
			if(dir == 1){
				zuege[parseInt(command[1])].direct = 2;
			}
			else{
				zuege[parseInt(command[1])].direct = 1;
			}
		}
		if(command[0] == 'setLight'){
			if(zuege[parseInt(command[1])].haslight == 1){
				scene.add(zuege[parseInt(command[1])].light);
				zuege[parseInt(command[1])].haslight = 2;
			}
			else{
				scene.remove(zuege[parseInt(command[1])].light);
				zuege[parseInt(command[1])].haslight = 1;
			}
		}
	}

	function onOpen(event) {
		console.log('connected');
	}

	function onError(event) {
		alert(event.data);
	}

	function send() {
		var txt = document.getElementById('inputmessage').value;
		webSocket.send(txt);
		return false;
	}
  var scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0xcce0ff, 0.0003);
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  var renderer = new THREE.WebGLRenderer();

  renderer.setClearColor(scene.fog.color);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.soft = true;
  
	var spotLight = new THREE.SpotLight(0xAAAAAA);
	spotLight.castShadow = true;
	spotLight.position.set(40,40,40);
	scene.add(spotLight);
	
	var planeGeo = new THREE.PlaneGeometry(100,100,100);
	var planeMat = new THREE.MeshLambertMaterial({color: 0x33FF33});
	var plane = new THREE.Mesh(planeGeo,planeMat);
	scene.add(plane);
	plane.receiveShadow = true;
	plane.rotation.x = -0.5*Math.PI;

  var cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
  
  var Protozug;
  var zuege = [];

var mtlLoader = new THREE.MTLLoader();
				mtlLoader.setPath( 'obj/Train/' );
				mtlLoader.load( 'train_enginecar.mtl', function( materials ) {
					materials.preload();
					var loader = new THREE.OBJLoader();
					loader.setMaterials(materials);
loader.load('obj/Train/train_enginecar.obj', function ( object ) {
object.scale.set(0.01,0.01,0.01);
object.castShadow = true;
object.receiveShadow = true;
Protozug = object;
  animation();
});
				});
  
  camera.position.x = 15;
  camera.position.y = 15;
  camera.position.z = 15;

  camera.lookAt(scene.position);

  renderer.render(scene, camera);
  $("#webGL-container").append(renderer.domElement);
  

  function animation(){
	  for(var i = 0; i < zuege.length; i++){
	  var cs = zuege[i].distance;
  var cs2 = cs * cs;
  var state = zuege[i].state;
  var x = zuege[i].x;
	var z = zuege[i].z;
	var zug = zuege[i].obj;
	var abl = 100;
	var speed = zuege[i].speed;
		zug.position.x = x
	  zug.position.z = z;
		if(zuege[i].haslight == 2){
			zuege[i].light.position.x = x;
			zuege[i].light.position.z = z;
		}
	  if(Math.abs(x) < Math.abs(cs)){
		  abl = 1+ Math.abs((x / Math.sqrt(cs2 - (x*x))));
	  }
	  if(zuege[i].direct == 1){
		  if(state == 1){
				x +=speed/abl;
				if(x < cs){
					z = Math.sqrt(cs2 - (x*x));
					if(x >= 0){
						zug.rotation.y =(Math.PI/2)-(Math.PI/2)*Math.cos((zug.position.x/cs)*(Math.PI/2));
					}
					else{
						zug.rotation.y =-(Math.PI/2)+(Math.PI/2)*Math.cos((zug.position.x/cs)*(Math.PI/2));
					}


				}
				else{
					state = 2;
				}
			  }
			  if(state == 2){
				x -=speed/abl;
				if(x > -cs){
					z = -1*Math.sqrt(cs2 - (x*x));
					if(x >= 0){
						zug.rotation.y =(Math.PI/2)+Math.cos((zug.position.x/cs)*(Math.PI/2))*(Math.PI/2);
					}
					else{
						zug.rotation.y =-(Math.PI/2)-(Math.PI/2)*Math.cos((Math.abs(zug.position.x)/cs)*(Math.PI/2));
					}
				}
				else{
					state = 1;
				}
			  }
	  }
	  if(zuege[i].direct == 2){
		  if(state == 1){
				x -=speed/abl;
				if(x > -cs){
					z = Math.sqrt(cs2 - (x*x));
					if(x >= 0){
						zug.rotation.y =(Math.PI/2)-(Math.PI/2)*Math.cos((zug.position.x/cs)*(Math.PI/2));
					}
					else{
						zug.rotation.y =-(Math.PI/2)+(Math.PI/2)*Math.cos((zug.position.x/cs)*(Math.PI/2));
					}


				}
				else{
					state = 2;
				}
			  }
			  if(state == 2){
				x +=speed/abl;
				if(x < cs){
					z = -1*Math.sqrt(cs2 - (x*x));
					if(x >= 0){
						zug.rotation.y =(Math.PI/2)+Math.cos((zug.position.x/cs)*(Math.PI/2))*(Math.PI/2);
					}
					else{
						zug.rotation.y =-(Math.PI/2)-(Math.PI/2)*Math.cos((Math.abs(zug.position.x)/cs)*(Math.PI/2));
					}
				}
				else{
					state = 1;
				}
			  }
	  }

		  zuege[i].state = state ;
  zuege[i].x = x;
	zuege[i].z = z;
	  }
	  		requestAnimationFrame(animation);
		renderer.render(scene,camera);
	  
  }
  function create3dZug(){
		var yel= new THREE.MeshLambertMaterial({color: 0xFFFF00});
		var light = new THREE.Mesh( new THREE.CubeGeometry( 1, 1, 1 ), yel);
		light.position.y = 3;
	  	var dist = 10 + 5 * zuege.length;
		var Train = new TrainClass(Protozug.clone(),dist, light);
		zuege.push(Train);
		scene.add( Train.obj);
		var material = new THREE.MeshLambertMaterial({color: 0x999999});
		  
		var geometry = new THREE.RingGeometry( dist - 0.5, dist + 0.5, 32 );
		var rails = new THREE.Mesh( geometry, material );
		scene.add( rails );
		rails.position.y = 0.1;
		rails.rotation.x = -0.5*Math.PI;
	}
});
function TrainClass(tdObj, distance, licht){
	this.obj = tdObj;
	this.distance = distance;
	this.x = 0;
	this.z = 0;
	this.state = 1;
	this.speed = 0.1;
	this.direct = 1;
	this.light = licht;
	this.haslight = 1;
}