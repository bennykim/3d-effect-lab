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

  addLights(scene);
  addFloor(scene);

  addShapes(scene);
  addParticles(scene);
  addDoubleSidedMesh(scene);
  addTorusKnots(scene);
  addTextureMesh(scene, await loadTexture("/threejs.webp"));

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

function addLights(scene) {
  const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
  directionalLight.castShadow = true;
  directionalLight.position.set(3, 4, 5);
  directionalLight.lookAt(0, 0, 0);
  scene.add(directionalLight);
}

function addFloor(scene) {
  const geometry = new THREE.PlaneGeometry(20, 20);
  const material = new THREE.MeshStandardMaterial({ color: 0xbbbbbb });
  const floor = new THREE.Mesh(geometry, material);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
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
