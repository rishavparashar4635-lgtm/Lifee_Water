import React, { memo, useRef, useEffect } from "react";
import * as THREE from "three";
import { destroyRendererAndScene } from "../utils/disposeThreeScene";

function BottleScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let destroyed = false;
    let teardown: (() => void) | undefined;

    const initTimeoutId = window.setTimeout(() => {
      if (destroyed || !mountRef.current) return;

      let W = container.clientWidth || Math.max(window.innerWidth / 2, 300);
      let H = container.clientHeight || Math.max(window.innerHeight, 500);

      /* ── Scene ── */
      const scene = new THREE.Scene();
      scene.background = null;

      /* ── Camera ── */
      const camera = new THREE.PerspectiveCamera(32, W / H, 0.1, 200);
      camera.position.set(0, 0.05, 14.5);
      camera.lookAt(0, 0.05, 0);

      /* ── Renderer ── */
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.3;
      container.appendChild(renderer.domElement);

      /* ── Lights ── */
      scene.add(new THREE.AmbientLight(0x4488aa, 2.5));
      const backHalo = new THREE.PointLight(0xffffff, 10, 25);
      backHalo.position.set(0, 1.5, -6);
      scene.add(backHalo);

      const keyLight = new THREE.DirectionalLight(0xd0eeff, 2.5);
      keyLight.position.set(1, 4, 10);
      scene.add(keyLight);

      const rimL = new THREE.DirectionalLight(0x66aacc, 1.5);
      rimL.position.set(-6, 2, 3);
      scene.add(rimL);

      const rimR = new THREE.DirectionalLight(0x66aacc, 1.5);
      rimR.position.set(6, 2, 3);
      scene.add(rimR);

      const topPt = new THREE.PointLight(0xffffff, 2, 20);
      topPt.position.set(0, 10, 4);
      scene.add(topPt);

      /* ── Group ── */
      const G = new THREE.Group();
      G.scale.set(1.6, 1, 1.6);
      scene.add(G);

      /* ── Bottle Shape ── */
      const shape = [
        [0.0, -3.7],
        [0.01, -3.7],
        [0.38, -3.68],
        [0.54, -3.55],
        [0.6, -3.38],
        [0.62, -3.1],
        [0.58, -2.88],
        [0.62, -2.66],
        [0.58, -2.44],
        [0.62, -2.22],
        [0.58, -2.0],
        [0.62, -1.78],
        [0.62, -1.4],
        [0.62, 1.3],
        [0.6, 1.62],
        [0.52, 1.98],
        [0.4, 2.28],
        [0.28, 2.56],
        [0.23, 2.7],
        [0.21, 2.88],
        [0.21, 3.1],
        [0.235, 3.15],
        [0.235, 3.26],
        [0.21, 3.3],
        [0.21, 3.4],
      ].map(([x, y]) => new THREE.Vector2(x, y));

      const bottleGeo = new THREE.LatheGeometry(shape, 64);
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0xb8ddf5,
        transparent: true,
        opacity: 0.32,
        roughness: 0.03,
        metalness: 0.0,
        transmission: 0.88,
        thickness: 0.4,
        ior: 1.49,
        clearcoat: 1.0,
        clearcoatRoughness: 0.02,
        side: THREE.DoubleSide,
      });
      G.add(new THREE.Mesh(bottleGeo, glassMat));

      /* ── Sky-blue water fill ── */
      const waterShape = [
        [0.0, -3.68],
        [0.55, -3.58],
        [0.57, -3.1],
        [0.53, -2.88],
        [0.57, -2.66],
        [0.53, -2.44],
        [0.57, -2.22],
        [0.53, -2.0],
        [0.57, -1.78],
        [0.57, -1.4],
        [0.57, -1.1],
        [0.57, -0.8],
        [0.57, -0.5],
        [0.57, -0.22],
        [0.55, -0.06],
        [0.0, -0.06],
      ].map(([x, y]) => new THREE.Vector2(x, y));

      const waterGeo = new THREE.LatheGeometry(waterShape, 64);
      const waterMat = new THREE.MeshPhysicalMaterial({
        color: 0x2f9fd6,
        transparent: true,
        opacity: 0.82,
        roughness: 0.0,
        transmission: 0.4,
        thickness: 2.2,
        ior: 1.33,
        side: THREE.FrontSide,
      });
      G.add(new THREE.Mesh(waterGeo, waterMat));

      /* ── Label ── */
      const lc = document.createElement("canvas");
      lc.width = 1024;
      lc.height = 640;
      const ctx = lc.getContext("2d");
      if (ctx) {
        const lg = ctx.createLinearGradient(0, 0, 1024, 0);
        lg.addColorStop(0, "#3a9ac8");
        lg.addColorStop(0.25, "#5bbfea");
        lg.addColorStop(0.5, "#70cef5");
        lg.addColorStop(0.75, "#5bbfea");
        lg.addColorStop(1, "#3a9ac8");
        ctx.fillStyle = lg;
        ctx.fillRect(0, 0, 1024, 640);

        const th = ctx.createLinearGradient(0, 0, 0, 200);
        th.addColorStop(0, "rgba(255,255,255,0.25)");
        th.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = th;
        ctx.fillRect(0, 0, 1024, 200);

        ctx.textAlign = "center";
        ctx.fillStyle = "#0b2a45";
        ctx.font = "bold 155px Arial, sans-serif";
        ctx.shadowColor = "rgba(255,255,255,0.25)";
        ctx.shadowBlur = 6;
        ctx.fillText("LIFEE", 512, 195);
        ctx.shadowBlur = 0;

        ctx.font = "300 42px Arial, sans-serif";
        ctx.fillStyle = "rgba(11,42,69,0.9)";
        ctx.fillText("PREMIUM WATER", 512, 258);

        ctx.strokeStyle = "rgba(255,255,255,0.55)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(170, 284);
        ctx.lineTo(854, 284);
        ctx.stroke();

        ctx.fillStyle = "#0b2a45";
        ctx.font = "bold 140px Arial, sans-serif";
        ctx.fillText("1L", 512, 420);

        ctx.beginPath();
        ctx.moveTo(170, 448);
        ctx.lineTo(854, 448);
        ctx.stroke();

        ctx.font = "300 38px Arial, sans-serif";
        ctx.fillStyle = "rgba(11,42,69,0.9)";
        ctx.fillText("PURE & NATURAL", 512, 528);

        const labelTex = new THREE.CanvasTexture(lc);
        const labelGeo = new THREE.CylinderGeometry(0.625, 0.625, 2.1, 64, 1, true);
        const labelMat = new THREE.MeshStandardMaterial({
          map: labelTex,
          roughness: 0.25,
          side: THREE.FrontSide,
        });
        const labelMesh = new THREE.Mesh(labelGeo, labelMat);
        labelMesh.position.y = -0.25;
        G.add(labelMesh);
      }

      /* ── Cap ── */
      const capMat = new THREE.MeshPhysicalMaterial({
        color: 0x18263f,
        roughness: 0.3,
        metalness: 0.15,
        clearcoat: 0.9,
      });
      const ridgeMat = new THREE.MeshStandardMaterial({ color: 0x243560, roughness: 0.5 });
      const capGroup = new THREE.Group();
      capGroup.add(
        Object.assign(new THREE.Mesh(new THREE.CylinderGeometry(0.235, 0.235, 0.44, 64), capMat))
      );
      const topDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.235, 0.235, 0.04, 64), capMat);
      topDisc.position.y = 0.24;
      capGroup.add(topDisc);
      for (let i = 0; i < 24; i++) {
        const r = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.42, 0.024), ridgeMat);
        const a = (i / 24) * Math.PI * 2;
        r.position.set(Math.cos(a) * 0.24, 0, Math.sin(a) * 0.24);
        r.rotation.y = -a;
        capGroup.add(r);
      }
      capGroup.position.y = 3.57;
      G.add(capGroup);

      /* ── Specular highlight strips ── */
      const hlMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.1,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const hl1 = new THREE.Mesh(new THREE.PlaneGeometry(0.07, 7.6), hlMat);
      hl1.position.set(0.5, 0.1, 0.37);
      hl1.rotation.y = -0.65;
      G.add(hl1);
      const hl2 = new THREE.Mesh(new THREE.PlaneGeometry(0.025, 7.6), hlMat);
      hl2.position.set(0.42, 0.1, 0.46);
      hl2.rotation.y = -0.55;
      G.add(hl2);

      /* ── Water droplets ── */
      const dropMat = new THREE.MeshPhysicalMaterial({
        color: 0x88ccee,
        transparent: true,
        opacity: 0.6,
        roughness: 0.0,
        transmission: 0.55,
        ior: 1.33,
      });
      const rng = (s: number) => Math.abs(Math.sin(s * 127.1 + 311.7));
      for (let i = 0; i < 20; i++) {
        const s = rng(i) * 0.042 + 0.012;
        const d = new THREE.Mesh(new THREE.SphereGeometry(s, 8, 8), dropMat);
        const a = rng(i + 50) * Math.PI * 2;
        d.position.set(Math.cos(a) * 0.635, (rng(i + 100) - 0.5) * 7.0, Math.sin(a) * 0.635);
        G.add(d);
      }

      /* ── Floor reflection ── */
      const refl = new THREE.Mesh(
        new THREE.PlaneGeometry(4, 2.5),
        new THREE.MeshBasicMaterial({
          color: 0x2255aa,
          transparent: true,
          opacity: 0.1,
          depthWrite: false,
        })
      );
      refl.rotation.x = -Math.PI / 2;
      refl.position.y = -3.72;
      scene.add(refl);

      /* ── Animation loop (paused when off-screen) ── */
      const clock = new THREE.Clock();
      let animId = 0;
      let isVisible = false;

      const animate = () => {
        if (destroyed || !isVisible) return;
        renderer.info.reset();
        const t = clock.getElapsedTime();
        G.rotation.y = t * 0.28;
        G.position.y = Math.sin(t * 0.7) * 0.08;
        renderer.render(scene, camera);
        animId = requestAnimationFrame(animate);
      };

      const syncAnimationLoop = () => {
        if (destroyed) return;
        if (isVisible) {
          if (animId === 0) animId = requestAnimationFrame(animate);
        } else if (animId !== 0) {
          cancelAnimationFrame(animId);
          animId = 0;
        }
      };

      const visibilityObserver = new IntersectionObserver(
        (entries) => {
          const next = entries[0]?.isIntersecting ?? false;
          if (next === isVisible) return;
          isVisible = next;
          syncAnimationLoop();
        },
        { root: null, threshold: 0.01 }
      );
      visibilityObserver.observe(container);

      /* ── Resize Observer ── */
      const onResize = () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (w === 0 || h === 0) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      const resizeObserver = new ResizeObserver(onResize);
      resizeObserver.observe(container);
      window.addEventListener("resize", onResize, { passive: true });

      teardown = () => {
        visibilityObserver.disconnect();
        if (animId !== 0) cancelAnimationFrame(animId);
        animId = 0;
        window.removeEventListener("resize", onResize);
        resizeObserver.disconnect();
        destroyRendererAndScene(scene, renderer, container);
      };
    }, 200);

    return () => {
      destroyed = true;
      window.clearTimeout(initTimeoutId);
      teardown?.();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full absolute inset-0" />;
}

export default memo(BottleScene);
