import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.117.1/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/controls/OrbitControls.js";
import { FBXLoader } from "https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/loaders/FBXLoader.js";

let camera, scene, renderer;

const clock = new THREE.Clock();

let mixer;

init();
animate();

function init() {
  console.log(document.getElementsByClassName("slider--item slider--item-active")[0].offsetWidth,document.getElementsByClassName("slider--item slider--item-active")[0].offsetHeight)
  const container = document.getElementsByClassName("slider--item-image")[1];
  camera = new THREE.PerspectiveCamera(
    40,
   document.getElementsByClassName("slider--item slider--item-active")[0].offsetWidth / document.getElementsByClassName("slider--item slider--item-active")[0].offsetHeight,
    1,
    4000
  );
  camera.position.set(350, 350, 350);

  scene = new THREE.Scene();
  //scene.background = new THREE.Color( 0xa0a0a0 );
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
  hemiLight.position.set(0, 200, 0);
  //scene.add(hemiLight);

  const dirLight = new THREE.DirectionalLight(0xffffff);
  dirLight.position.set(0, 200, 100);
  dirLight.castShadow = true;
  dirLight.shadow.camera.top = 1080;
  dirLight.shadow.camera.bottom = -100;
  dirLight.shadow.camera.left = -120;
  dirLight.shadow.camera.right = 120;
  //scene.add(dirLight);

  //scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );

  // ground
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2000, 2000),
    new THREE.MeshPhongMaterial({
      color: 0x999999,
      //envMap: envMap,
      specular: 0x050505,
      shininess: 50,
      depthWrite: false,
    })
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.receiveShadow = true;
  //scene.add(mesh);

  const grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000);
  grid.material.opacity = 0.2;
  grid.material.transparent = true;

  //scene.add(grid);

  // model
  const loader = new FBXLoader();
  loader.load("assets/models/ShotgunModel6.fbx", function (object) {
    //mixer = new THREE.AnimationMixer(object);

    //const action = mixer.clipAction(object.animations[0]);
    //action.play();

    object.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    scene.add(object);
  });

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(window.devicePixelRatio);
  const width = document.getElementsByClassName("slider--item slider--item-active")[0].offsetWidth;
  const height = document.getElementsByClassName("slider--item slider--item-active")[0].offsetHeight;
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 100, 0);
  controls.update();

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  const width = document.getElementsByClassName("slider--item slider--item-active")[0].offsetWidth;
  const height = document.getElementsByClassName("slider--item slider--item-active")[0].offsetHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

//

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();

  if (mixer) mixer.update(delta);

  renderer.render(scene, camera);
}
