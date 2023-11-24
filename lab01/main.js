import "./style.css";
import * as THREE from "three";

function main() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  const scene = new THREE.Scene();

  let aspect = window.innerWidth / window.innerHeight; // the canvas default = 2
  const fov = 60;
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  camera.position.y = 1;
  camera.position.z = 5;

  const directionalLight = new THREE.DirectionalLight(0xfffff, 5);
  directionalLight.castShadow = true;
  directionalLight.position.set(3, 4, 5);
  directionalLight.lookAt(0, 0, 0);
  scene.add(directionalLight);

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
  const material = new THREE.MeshStandardMaterial({ color: 0x44aa88 }); // greenish blue

  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);

  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
  });
}

main();
