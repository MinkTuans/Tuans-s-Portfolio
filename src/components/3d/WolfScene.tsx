"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import SceneFallback from "./SceneFallback";

interface WolfSceneProps {
  className?: string;
}

export default function WolfScene({ className = "" }: WolfSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check WebGL Support
    try {
      const testCanvas = document.createElement("canvas");
      const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
      setHasWebGL(Boolean(gl));
    } catch {
      setHasWebGL(false);
      return;
    }

    // Check reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const motionHandler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", motionHandler);

    return () => mediaQuery.removeEventListener("change", motionHandler);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || hasWebGL === false || prefersReducedMotion) return;

    let animationFrameId: number;
    let isVisible = true;
    const clock = new THREE.Clock();

    // 1. Renderer Setup
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    } catch {
      setHasWebGL(false);
      return;
    }

    // 2. Scene & Fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog("#0a130e", 7, 24);

    // 3. Camera Setup
    const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.5, 30);
    camera.position.set(3.8, 2.4, 5.4);
    camera.lookAt(0, 0.4, 0);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight("#cde3d6", 0.9);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight("#fef08a", 1.8);
    sunLight.position.set(7, 9, 6);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 512;
    sunLight.shadow.mapSize.height = 512;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 22;
    sunLight.shadow.bias = -0.001;
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight("#34d399", 0.7);
    rimLight.position.set(-6, 3, -5);
    scene.add(rimLight);

    // 5. Build Procedural Low-Poly Prairie Terrain
    const terrainGeo = new THREE.PlaneGeometry(36, 36, 26, 26);
    terrainGeo.rotateX(-Math.PI / 2);
    const pos = terrainGeo.attributes.position;
    const vertexCount = pos.count;
    const cols = new Float32Array(vertexCount * 3);

    const colorGrassDeep = new THREE.Color("#13241b");
    const colorGrassMid = new THREE.Color("#203a2c");
    const colorGrassLight = new THREE.Color("#375b47");
    const colorRidgeSun = new THREE.Color("#567858");

    for (let i = 0; i < vertexCount; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const distFromCenter = Math.sqrt(x * x + z * z);
      const hill1 = Math.sin(x * 0.25) * Math.cos(z * 0.25) * 1.4;
      const hill2 = Math.sin(x * 0.5 + 1.2) * 0.5;
      const ridge = -Math.cos(distFromCenter * 0.15) * 0.8;
      const centerDamp = Math.min(1, distFromCenter / 4.5);
      const y = (hill1 + hill2 + ridge) * centerDamp - 1.2;
      pos.setY(i, y);

      const tempColor = new THREE.Color();
      if (y > 0.3) {
        tempColor.copy(colorRidgeSun).lerp(colorGrassLight, 0.4);
      } else if (y > -0.5) {
        tempColor.copy(colorGrassMid);
      } else {
        tempColor.copy(colorGrassDeep);
      }
      cols[i * 3] = tempColor.r;
      cols[i * 3 + 1] = tempColor.g;
      cols[i * 3 + 2] = tempColor.b;
    }
    terrainGeo.computeVertexNormals();
    terrainGeo.setAttribute("color", new THREE.BufferAttribute(cols, 3));

    const terrainMat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.88,
      metalness: 0.08,
      flatShading: true,
    });
    const terrain = new THREE.Mesh(terrainGeo, terrainMat);
    terrain.position.set(0, -0.6, 0);
    terrain.receiveShadow = true;
    scene.add(terrain);

    // 6. Build Low-Poly Wolf Model
    const wolfGroup = new THREE.Group();
    wolfGroup.position.set(0, -0.55, 0.4);
    wolfGroup.rotation.y = -0.4;

    const furMainMat = new THREE.MeshStandardMaterial({ color: "#4b5d54", roughness: 0.8, metalness: 0.1, flatShading: true });
    const furLightMat = new THREE.MeshStandardMaterial({ color: "#768d81", roughness: 0.8, metalness: 0.1, flatShading: true });
    const furSpineMat = new THREE.MeshStandardMaterial({ color: "#2a3832", roughness: 0.85, metalness: 0.1, flatShading: true });
    const furEarsMat = new THREE.MeshStandardMaterial({ color: "#1d2924", roughness: 0.85, flatShading: true });
    const eyeMat = new THREE.MeshBasicMaterial({ color: "#10b981" });
    const noseMat = new THREE.MeshStandardMaterial({ color: "#1a201c", roughness: 0.5, flatShading: true });

    // Chest (Breathing target)
    const chestGeo = new THREE.CylinderGeometry(0.52, 0.42, 0.95, 6);
    const chest = new THREE.Mesh(chestGeo, furLightMat);
    chest.position.set(0, 1.2, 0.4);
    chest.rotation.x = 0.35;
    chest.castShadow = true;
    wolfGroup.add(chest);

    // Body flank
    const flankGeo = new THREE.CylinderGeometry(0.42, 0.38, 1.0, 6);
    const flank = new THREE.Mesh(flankGeo, furMainMat);
    flank.position.set(0, 1.1, -0.2);
    flank.rotation.x = -0.1;
    flank.castShadow = true;
    wolfGroup.add(flank);

    // Hips
    const hipsGeo = new THREE.CylinderGeometry(0.4, 0.46, 0.85, 6);
    const hips = new THREE.Mesh(hipsGeo, furSpineMat);
    hips.position.set(0, 1.15, -0.8);
    hips.rotation.x = -0.3;
    hips.castShadow = true;
    wolfGroup.add(hips);

    // Spine
    const spineGeo = new THREE.BoxGeometry(0.15, 0.2, 1.7);
    const spine = new THREE.Mesh(spineGeo, furSpineMat);
    spine.position.set(0, 1.45, -0.1);
    spine.rotation.x = 0.08;
    wolfGroup.add(spine);

    // Neck & Head Group
    const neckGroup = new THREE.Group();
    neckGroup.position.set(0, 1.55, 0.75);

    const neckGeo = new THREE.CylinderGeometry(0.34, 0.44, 0.75, 6);
    const neck = new THREE.Mesh(neckGeo, furLightMat);
    neck.position.set(0, 0.3, 0.15);
    neck.rotation.x = -0.45;
    neck.castShadow = true;
    neckGroup.add(neck);

    // Head (Rotation target)
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.65, 0.35);

    const skullGeo = new THREE.BoxGeometry(0.48, 0.44, 0.52);
    const skull = new THREE.Mesh(skullGeo, furMainMat);
    skull.castShadow = true;
    headGroup.add(skull);

    const snoutGeo = new THREE.CylinderGeometry(0.15, 0.24, 0.55, 5);
    const snout = new THREE.Mesh(snoutGeo, furLightMat);
    snout.position.set(0, -0.06, 0.38);
    snout.castShadow = true;
    headGroup.add(snout);

    const noseGeo = new THREE.BoxGeometry(0.12, 0.09, 0.1);
    const nose = new THREE.Mesh(noseGeo, noseMat);
    nose.position.set(0, 0.08, 0.64);
    headGroup.add(nose);

    // Left & Right Ears
    const earGeo = new THREE.ConeGeometry(0.13, 0.36, 4);
    const earL = new THREE.Mesh(earGeo, furEarsMat);
    earL.position.set(-0.18, 0.34, -0.05);
    earL.rotation.set(-0.15, 0, -0.2);
    headGroup.add(earL);

    const earR = new THREE.Mesh(earGeo, furEarsMat);
    earR.position.set(0.18, 0.34, -0.05);
    earR.rotation.set(-0.15, 0, 0.2);
    headGroup.add(earR);

    // Eyes
    const eyeGeo = new THREE.BoxGeometry(0.07, 0.04, 0.06);
    const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
    eyeL.position.set(-0.15, 0.08, 0.24);
    headGroup.add(eyeL);

    const eyeR = new THREE.Mesh(eyeGeo, eyeMat);
    eyeR.position.set(0.15, 0.08, 0.24);
    headGroup.add(eyeR);

    neckGroup.add(headGroup);
    wolfGroup.add(neckGroup);

    // Legs
    const makeLeg = (x: number, z: number, isBack = false) => {
      const legGroup = new THREE.Group();
      legGroup.position.set(x, 0.6, z);
      const upperGeo = new THREE.CylinderGeometry(isBack ? 0.2 : 0.13, isBack ? 0.13 : 0.1, isBack ? 0.75 : 0.7, 5);
      const upper = new THREE.Mesh(upperGeo, isBack ? furSpineMat : furMainMat);
      upper.position.set(0, 0.15, 0);
      upper.castShadow = true;
      legGroup.add(upper);

      const lowerGeo = new THREE.CylinderGeometry(isBack ? 0.12 : 0.1, 0.08, 0.65, 5);
      const lower = new THREE.Mesh(lowerGeo, furLightMat);
      lower.position.set(0, -0.32, 0);
      lower.castShadow = true;
      legGroup.add(lower);

      const pawGeo = new THREE.BoxGeometry(0.14, 0.08, 0.2);
      const paw = new THREE.Mesh(pawGeo, furSpineMat);
      paw.position.set(0, -0.62, 0.04);
      legGroup.add(paw);
      return legGroup;
    };

    wolfGroup.add(makeLeg(-0.32, 0.5));
    wolfGroup.add(makeLeg(0.32, 0.5));
    wolfGroup.add(makeLeg(-0.34, -0.8, true));
    wolfGroup.add(makeLeg(0.34, -0.8, true));

    // Tail (Sway target)
    const tailGroup = new THREE.Group();
    tailGroup.position.set(0, 1.25, -1.15);
    tailGroup.rotation.x = -0.7;

    const tailUpperGeo = new THREE.CylinderGeometry(0.14, 0.22, 0.75, 5);
    const tailUpper = new THREE.Mesh(tailUpperGeo, furSpineMat);
    tailUpper.position.set(0, -0.35, 0);
    tailUpper.castShadow = true;
    tailGroup.add(tailUpper);

    const tailTipGeo = new THREE.ConeGeometry(0.18, 0.5, 5);
    const tailTip = new THREE.Mesh(tailTipGeo, furMainMat);
    tailTip.position.set(0, -0.75, 0.05);
    tailGroup.add(tailTip);

    wolfGroup.add(tailGroup);
    scene.add(wolfGroup);

    // 7. Mouse Pointer Tracking
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = nx;
      mouseY = ny;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 8. Resize Observer
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    handleResize();

    // 9. Viewport Visibility Observer (Pauses loop when offscreen)
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    visibilityObserver.observe(container);

    // 10. Animation Render Loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const t = clock.getElapsedTime();

      // Breathing cycle
      const breath = 1 + Math.sin(t * 1.8) * 0.025;
      chest.scale.set(breath, breath, 1);

      // Subtle Head tracking mouse
      const targetRotY = mouseX * 0.35 + Math.sin(t * 0.5) * 0.08;
      const targetRotX = -mouseY * 0.15 + Math.sin(t * 0.8) * 0.04;
      headGroup.rotation.y = THREE.MathUtils.lerp(headGroup.rotation.y, targetRotY, 0.05);
      headGroup.rotation.x = THREE.MathUtils.lerp(headGroup.rotation.x, targetRotX, 0.05);

      // Tail sway
      tailGroup.rotation.z = Math.sin(t * 1.5) * 0.08;
      tailGroup.rotation.y = Math.cos(t * 1.2) * 0.06;

      // Gentle wolf posture
      wolfGroup.position.y = -0.55 + Math.sin(t * 1.8) * 0.015;

      // Soft Camera Parallax based on pointer
      const camTargetX = 3.8 + mouseX * 0.3;
      const camTargetY = 2.4 + mouseY * 0.2;
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, camTargetX, 0.03);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, camTargetY, 0.03);
      camera.lookAt(0, 0.4, 0);

      renderer.render(scene, camera);
    };

    animate();

    // 11. Complete Cleanup on Unmount (Zero memory leaks)
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();

      // Dispose all geometries and materials
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material?.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, [hasWebGL, prefersReducedMotion]);

  if (hasWebGL === false) {
    return (
      <div ref={containerRef} className={className}>
        <SceneFallback reason="unsupported" />
      </div>
    );
  }

  if (prefersReducedMotion) {
    return (
      <div ref={containerRef} className={className}>
        <SceneFallback reason="reduced-motion" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[420px] lg:min-h-[580px] rounded-3xl overflow-hidden bg-gradient-to-b from-steppe-950 via-steppe-900 to-steppe-950 border border-steppe-800/60 shadow-2xl ${className}`}
    >
      {/* Visual background ambient gradient */}
      <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-amber-sun/10 blur-[90px] pointer-events-none" />
      <div className="absolute -bottom-10 left-1/4 w-96 h-60 rounded-full bg-tech-emerald/10 blur-[100px] pointer-events-none" />

      {/* Subtle UI badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-steppe-900/80 backdrop-blur-md border border-steppe-700/50 text-[11px] font-mono text-steppe-300 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-tech-emerald animate-pulse" />
        <span>3D Wolf • The Wolf&apos;s Journey</span>
      </div>

      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Bottom atmospheric gradient blending into page */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-steppe-950 via-steppe-950/70 to-transparent pointer-events-none" />
    </div>
  );
}
