import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function main() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  renderer.shadowMap.enabled = true;
  renderer.setSize(window.innerWidth, window.innerHeight);

  const fov = 60;
  const aspect = window.innerWidth / window.innerHeight; // the canvas default = 2
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.y = 1;
  camera.position.z = 5;

  const scene = new THREE.Scene();

  const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
  directionalLight.castShadow = true;
  directionalLight.position.set(3, 4, 5);
  directionalLight.lookAt(0, 0, 0);
  scene.add(directionalLight);

  const floorGeometry = new THREE.PlaneGeometry(20, 20);
  const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xbbbbbb });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  floor.castShadow = true;
  scene.add(floor);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.position.y = 0.5;
  scene.add(mesh);

  const capsuleGeometry = new THREE.CapsuleGeometry(1, 2, 20, 30);
  const capsuleMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
  const capsuleMesh = new THREE.Mesh(capsuleGeometry, capsuleMaterial);
  capsuleMesh.position.set(3, 1.75, 0);
  capsuleMesh.castShadow = true;
  capsuleMesh.receiveShadow = true;
  scene.add(capsuleMesh);

  const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2, 16);
  const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
  cylinderMesh.position.set(-3, 1, 0);
  cylinderMesh.castShadow = true;
  cylinderMesh.receiveShadow = true;
  scene.add(cylinderMesh);

  const torusGeometry = new THREE.TorusGeometry(0.5, 0.1, 16, 100);
  const torusMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
  const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
  torusMesh.position.set(0, 0.5, 1);
  torusMesh.castShadow = true;
  torusMesh.receiveShadow = true;
  scene.add(torusMesh);

  const starShape = new THREE.Shape();
  starShape.moveTo(0, 1);
  starShape.lineTo(0.2, 0.2);
  starShape.lineTo(1, 0.2);
  starShape.lineTo(0.4, -0.1);
  starShape.lineTo(0.6, -1);
  starShape.lineTo(0, -0.5);
  starShape.lineTo(-0.6, -1);
  starShape.lineTo(-0.4, -0.1);
  starShape.lineTo(-1, 0.2);
  starShape.lineTo(-0.2, 0.2);
  const shapeGeometry = new THREE.ShapeGeometry(starShape);
  const shapeMaterial = new THREE.MeshStandardMaterial({ color: 0xff00ff });
  const shapeMesh = new THREE.Mesh(shapeGeometry, shapeMaterial);
  shapeMesh.position.set(0, 1, 2);
  scene.add(shapeMesh);

  const extrudeSettings = {
    steps: 1,
    depth: 0.1,
    bevelEnabled: true,
    bevelThickeness: 0.1,
    bevelSize: 0.3,
    bevelSegments: 100,
  };

  const extrudeGeometry = new THREE.ExtrudeGeometry(starShape, extrudeSettings);
  const extrudeMaterial = new THREE.MeshStandardMaterial({ color: 0xddaaf });
  const extrudeMesh = new THREE.Mesh(extrudeGeometry, extrudeMaterial);
  extrudeMesh.position.set(2, 1.3, 2);
  extrudeMesh.castShadow = true;
  extrudeMesh.receiveShadow = true;
  scene.add(extrudeMesh);

  const orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.update();

  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
  });

  const render = () => {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };

  render();
}

main();
