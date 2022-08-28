import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.117.1/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/controls/OrbitControls.js";
import { FBXLoader } from "https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/loaders/FBXLoader.js";

export default class Model {
  constructor({ config }) {
    this.container =
      document.getElementsByClassName("slider--item-image")[config.index];
    this.camera = new THREE.PerspectiveCamera(
      40,
      document.getElementsByClassName("slider--item active")[0].offsetWidth /
        document.getElementsByClassName("slider--item active")[0].offsetHeight,
      1,
      4000
    );
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.clock = new THREE.Clock();
    this.mixer = null;
    this.config = config; // an objects,
  }
  animate = () => {
    requestAnimationFrame(this.animate);
    const delta = this.clock.getDelta();
    if (this.mixer) this.mixer.update(delta);
    this.renderer.render(this.scene, this.camera);
  };

  onWindowResize = () => {
    const width = document.getElementsByClassName("slider--item active")[0]
      .offsetWidth;
    const height = document.getElementsByClassName("slider--item active")[0]
      .offsetHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };
  init = () => {
    this.camera.position.set(...this.config.cameraPosition);
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 6);
    hemiLight.position.set(0, 200, 0);
    this.scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(0, 2000, 1000);
    dirLight.castShadow = false;
    dirLight.shadow.camera.top = 1080;
    dirLight.shadow.camera.bottom = -100;
    dirLight.shadow.camera.left = -120;
    dirLight.shadow.camera.right = 120;
    this.scene.add(dirLight);

    // model
    const loader = new FBXLoader();
    //Use second tukan model to see a diference "TukanNoBoomBox"
    loader.load(this.config.path, (object) => {
      if (this.config.hasAnimation) {
        this.mixer = new THREE.AnimationMixer(object);
        const action = this.mixer.clipAction(object.animations[0]);
        action.play();
      }
      object.traverse(function (child) {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.material.shininess = 1.5;
        }
      });

      this.scene.add(object);
    });

    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    const width = document.getElementsByClassName("slider--item active")[0]
      .offsetWidth;
    const height = document.getElementsByClassName("slider--item active")[0]
      .offsetHeight;
    this.renderer.setSize(width, height);
    this.container.appendChild(this.renderer.domElement);
    document.getElementsByClassName("slider--item-title")[
      this.config.index
    ].innerText = this.config.name;
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.target.set(0, 100, 0);
    controls.update();

    window.addEventListener("resize", this.onWindowResize);
  };

  start = () => {
    this.init();
    this.animate();
  };
}

const m1 = new Model({
  config: {
    cameraPosition: [350, 350, 350],
    path: "assets/models/tukanNoLightsNoBoomBox.fbx",
    name: "Tukan Model",
    hasAnimation: true,
    index: 0,
  },
});

const m2 = new Model({
  config: {
    cameraPosition: [350, 350, 350],
    path: "assets/models/ShotgunModel8.fbx",
    name: "Shotgun Model",
    hasAnimation: false,
    index: 1,
  },
});

const m3 = new Model({
  config: {
    path: "assets/models/HellDude1.fbx",
    name: "Monster Model",
    hasAnimation: false,
    cameraPosition: [550, 550, 550],
    index: 2,
  },
});
export { m1, m2, m3 };
