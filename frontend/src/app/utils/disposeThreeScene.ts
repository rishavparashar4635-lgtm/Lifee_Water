import * as THREE from "three";

/** Dispose GPU resources for meshes/lines/points under an Object3D. */
export function disposeObject3DResources(root: THREE.Object3D) {
  root.traverse((obj) => {
    const anyObj = obj as THREE.Mesh & { geometry?: THREE.BufferGeometry };
    anyObj.geometry?.dispose();

    const mat = anyObj.material as
      | THREE.Material
      | THREE.Material[]
      | undefined;
    if (!mat) return;
    const list = Array.isArray(mat) ? mat : [mat];
    for (const m of list) {
      const mm = m as THREE.Material & {
        map?: THREE.Texture | null;
        lightMap?: THREE.Texture | null;
        envMap?: THREE.Texture | null;
      };
      mm.map?.dispose();
      mm.lightMap?.dispose();
      mm.envMap?.dispose();
      m.dispose();
    }
  });
}

/** Full WebGL teardown: dispose scene contents, clear scene, release GL context, remove canvas. */
export function destroyRendererAndScene(
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer,
  container: HTMLElement
) {
  disposeObject3DResources(scene);
  while (scene.children.length > 0) {
    scene.remove(scene.children[0]);
  }

  renderer.forceContextLoss();
  renderer.dispose();

  const canvas = renderer.domElement;
  if (canvas?.parentNode === container) {
    container.removeChild(canvas);
  }
}
