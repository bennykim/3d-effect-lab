import * as THREE from "three";

export async function loadTexture(filePath) {
  const textureLoader = new THREE.TextureLoader();
  return textureLoader.load(filePath);
}
