import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { loadTexture } from "./loader/texture";
import {
  addShapes,
  addParticles,
  addDoubleSidedMesh,
  addTorusKnots,
  addTextureMesh,
} from "./scene/elements";

async function main() {
  const canvas = document.querySelector("#c");
  const renderer = initializeRenderer(canvas);
  const camera = createCamera();

  const scene = new THREE.Scene();

  addFloor(scene);
  addLights(scene, "directional");

  // addShapes(scene);
  // addParticles(scene);
  // addDoubleSidedMesh(scene);
  // addTorusKnots(scene);
  // addTextureMesh(scene, await loadTexture("/threejs.webp"));

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.position.y = 0.5;
  scene.add(mesh);

  const orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.update();

  setupResizeHandler(renderer, camera, scene);
  startRenderingLoop(renderer, scene, camera);
}

function initializeRenderer(canvas) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  renderer.shadowMap.enabled = true;
  renderer.setSize(window.innerWidth, window.innerHeight);
  return renderer;
}

function createCamera() {
  const fov = 60;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 1, 5);
  return camera;
}

function addLights(scene, lightType) {
  switch (lightType) {
    case "directional":
      const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
      directionalLight.castShadow = true;
      directionalLight.position.set(3, 4, 5);
      directionalLight.lookAt(0, 0, 0);
      scene.add(directionalLight);
      // helper
      const directionalLightHelper = new THREE.DirectionalLightHelper(
        directionalLight,
        1
      );
      scene.add(directionalLightHelper);
      break;

    case "hemisphere":
      const hemisphereLight = new THREE.HemisphereLight(0xb4a912, 0x12f34f, 5);
      hemisphereLight.position.set(0, 1, 0);
      hemisphereLight.lookAt(0, 0, 0);
      scene.add(hemisphereLight);
      break;

    case "point":
      const pointLight = new THREE.PointLight(0xffffff, 5, 5, 4);
      pointLight.castShadow = true;
      pointLight.position.set(1, 1, 1);
      scene.add(pointLight);
      break;

    case "rectArea":
      const rectAreaLight = new THREE.RectAreaLight(0xffffff, 5, 2, 2);
      rectAreaLight.castShadow = true;
      rectAreaLight.position.set(1, 1, 2);
      scene.add(rectAreaLight);
      break;

    case "spot":
      const targetObj = new THREE.Object3D();
      scene.add(targetObj);
      const spotLight = new THREE.SpotLight(
        0xffffff,
        10,
        100,
        Math.PI / 4,
        1,
        1
      );
      spotLight.castShadow = true;
      spotLight.position.set(0, 3, 0);
      spotLight.target = targetObj;
      spotLight.target.position.set(1, 0, 2);
      scene.add(spotLight);
      break;
  }
}

function addFloor(scene) {
  const geometry = new THREE.PlaneGeometry(20, 20);
  const material = new THREE.MeshStandardMaterial({
    color: 0xbbbbbb,
  });
  const floor = new THREE.Mesh(geometry, material);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  floor.castShadow = true;
  scene.add(floor);
}

function setupResizeHandler(renderer, camera, scene) {
  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
  });
}

function startRenderingLoop(renderer, scene, camera) {
  const render = () => {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };
  render();
}

main();
