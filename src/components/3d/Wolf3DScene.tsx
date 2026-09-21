"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { Sparkles, Play, Shield, Zap, Eye, RotateCw } from "lucide-react";

export type WolfAnimationMode = "idle" | "walk" | "gallop" | "jump" | "attack";

interface Wolf3DSceneProps {
  currentAnimation?: WolfAnimationMode;
  playbackSpeed?: number;
  scrollProgress?: number;
  showUIControls?: boolean;
  className?: string;
  autoRotate?: boolean;
}

export default function Wolf3DScene({
  currentAnimation = "gallop",
  playbackSpeed = 1.0,
  scrollProgress = 0,
  showUIControls = true,
  className = "",
  autoRotate = false,
}: Wolf3DSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeAnim, setActiveAnim] = useState<WolfAnimationMode>(currentAnimation);
  const [availableClips, setAvailableClips] = useState<string[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);

  // References to keep Three.js instances alive across renders
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const actionsRef = useRef<Record<string, THREE.AnimationAction>>({});
  const wolfGroupRef = useRef<THREE.Group | null>(null);
  const currentActionNameRef = useRef<string>("");
  const animFrameIdRef = useRef<number>(0);
  const clockRef = useRef<THREE.Clock>(new THREE.Clock());

  // Mouse tracking variables
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isDragging: false, prevX: 0 });
  const rotationOffsetRef = useRef({ y: 0 });

  // Sync external animation prop
  useEffect(() => {
    if (currentAnimation) {
      setActiveAnim(currentAnimation);
    }
  }, [currentAnimation]);

  // Handle switching animations with smooth crossfade
  const switchAnimation = useCallback((mode: WolfAnimationMode, duration = 0.35) => {
    const mixer = mixerRef.current;
    const actions = actionsRef.current;
    if (!mixer || Object.keys(actions).length === 0) return;

    // Map mode to actual clip name in wolf.glb
    let targetClip = "Gallop";
    if (mode === "idle") targetClip = actions["Idle_2"] ? "Idle_2" : "Idle";
    else if (mode === "walk") targetClip = "Walk";
    else if (mode === "gallop") targetClip = "Gallop";
    else if (mode === "jump") targetClip = "Gallop_Jump";
    else if (mode === "attack") targetClip = "Attack";

    const nextAction = actions[targetClip] || actions["Gallop"] || Object.values(actions)[0];
    const prevActionName = currentActionNameRef.current;
    const prevAction = prevActionName ? actions[prevActionName] : null;

    if (!nextAction) return;

    if (prevAction && prevAction !== nextAction) {
      prevAction.fadeOut(duration);
    }

    nextAction
      .reset()
      .setEffectiveTimeScale(playbackSpeed)
      .setEffectiveWeight(1)
      .fadeIn(duration)
      .play();

    // If jump or attack, return to gallop/idle once finished
    if (mode === "jump" || mode === "attack") {
      nextAction.clampWhenFinished = true;
      nextAction.loop = THREE.LoopOnce;

      const onFinished = () => {
        mixer.removeEventListener("finished", onFinished);
        switchAnimation(activeAnim === "gallop" ? "gallop" : "idle", 0.4);
      };
      mixer.addEventListener("finished", onFinished);
    } else {
      nextAction.loop = THREE.LoopRepeat;
    }

    currentActionNameRef.current = targetClip;
    setActiveAnim(mode);
  }, [activeAnim, playbackSpeed]);

  // Adjust playback speed when prop changes
  useEffect(() => {
    const currentActionName = currentActionNameRef.current;
    const currentAction = actionsRef.current[currentActionName];
    if (currentAction) {
      currentAction.setEffectiveTimeScale(playbackSpeed);
    }
  }, [playbackSpeed]);

  // Trigger switch when activeAnim changes
  useEffect(() => {
    switchAnimation(activeAnim);
  }, [activeAnim, switchAnimation]);

  // Main Three.js Scene Lifecycle
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let isDisposed = false;

    // 1. Create Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera Setup
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 420;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    // Dynamic 3/4 profile angle for heroic cinematic running posture
    camera.position.set(3.6, 1.8, 4.4);
    camera.lookAt(0, 0.9, 0);
    cameraRef.current = camera;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 4. Studio Lighting Formula (Morning Meadow Theme)
    // Key Light: Warm golden morning sunlight
    const sunLight = new THREE.DirectionalLight(0xfff3d6, 2.6);
    sunLight.position.set(5, 7, 5);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 25;
    sunLight.shadow.bias = -0.001;
    scene.add(sunLight);

    // Sky Fill: Soft cool morning blue skylight
    const skyLight = new THREE.HemisphereLight(0xdbeafe, 0x22543d, 0.95);
    scene.add(skyLight);

    // Rim Light: Cyan/Amber backlight to accentuate fur contour and athletic silhouette
    const rimLight = new THREE.DirectionalLight(0x7dd3fc, 1.6);
    rimLight.position.set(-6, 4, -4);
    scene.add(rimLight);

    // Front soft fill
    const frontFill = new THREE.PointLight(0xfef08a, 0.8, 10);
    frontFill.position.set(0, 2, 4);
    scene.add(frontFill);

    // 5. Ground Contact Shadow Disc
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const shadowCtx = shadowCanvas.getContext("2d");
    if (shadowCtx) {
      const gradient = shadowCtx.createRadialGradient(64, 64, 10, 64, 64, 60);
      gradient.addColorStop(0, "rgba(22, 45, 27, 0.5)");
      gradient.addColorStop(0.5, "rgba(22, 45, 27, 0.2)");
      gradient.addColorStop(1, "rgba(22, 45, 27, 0)");
      shadowCtx.fillStyle = gradient;
      shadowCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(3.6, 2.2);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.01;
    scene.add(shadowMesh);

    // 6. Floating Morning Dew Particle Dust
    const particleCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 8;
      particlePositions[i * 3 + 1] = Math.random() * 3;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xfef08a,
      size: 0.04,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 7. Load GLTF 3D Wolf Model
    const loader = new GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);

    const wolfRoot = new THREE.Group();
    wolfGroupRef.current = wolfRoot;
    scene.add(wolfRoot);

    loader.load(
      "/models/wolf.glb",
      (gltf) => {
        if (isDisposed) return;

        const model = gltf.scene;

        // Apply shadows and enhanced materials to all meshes
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            const mesh = child as THREE.Mesh;
            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.roughness = 0.72;
              mat.metalness = 0.12;
            }
          }
        });

        // Center and scale model appropriately
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetScale = 2.4 / maxDim; // Normalize to ~2.4m length

        model.scale.setScalar(targetScale);
        model.position.x = -center.x * targetScale;
        model.position.y = -box.min.y * targetScale; // Ground the paws on y = 0
        model.position.z = -center.z * targetScale;

        // Default running orientation (facing right/forward across the screen)
        wolfRoot.rotation.y = Math.PI * 0.45;
        wolfRoot.add(model);

        // Setup AnimationMixer
        const mixer = new THREE.AnimationMixer(model);
        mixerRef.current = mixer;

        const actions: Record<string, THREE.AnimationAction> = {};
        gltf.animations.forEach((clip) => {
          actions[clip.name] = mixer.clipAction(clip);
        });
        actionsRef.current = actions;
        setAvailableClips(gltf.animations.map((a) => a.name));

        // Start default animation
        const initialAction = actions["Gallop"] || actions["Walk"] || Object.values(actions)[0];
        if (initialAction) {
          initialAction.play();
          currentActionNameRef.current = initialAction.getClip().name;
        }

        setIsLoading(false);
      },
      undefined,
      (error) => {
        console.error("Failed to load wolf 3D model:", error);
        if (!isDisposed) {
          setLoadError("Không thể tải mô hình 3D. Đang sử dụng chế độ dự phòng.");
          setIsLoading(false);
        }
      }
    );

    // 8. Animation & Render Loop
    clockRef.current.start();
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      const delta = clockRef.current.getDelta();
      if (mixerRef.current) {
        mixerRef.current.update(delta);
      }

      // Float dew particles gently
      if (particles) {
        const pos = particleGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          pos[i * 3 + 1] += Math.sin(clockRef.current.getElapsedTime() + i) * 0.0015;
        }
        particleGeo.attributes.position.needsUpdate = true;
      }

      // Smooth mouse parallax interpolation (Lerp damping)
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      if (wolfGroupRef.current) {
        // Base angle + mouse tilt + drag offset
        const baseRotation = Math.PI * 0.45;
        const autoSpin = autoRotate ? clockRef.current.getElapsedTime() * 0.4 : 0;
        wolfGroupRef.current.rotation.y =
          baseRotation + mouse.x * 0.5 + rotationOffsetRef.current.y + autoSpin;
        wolfGroupRef.current.rotation.x = mouse.y * 0.15;
      }

      // Gentle camera sway
      if (cameraRef.current) {
        cameraRef.current.position.x = 3.6 + mouse.x * 0.4;
        cameraRef.current.position.y = 1.8 - mouse.y * 0.3;
        cameraRef.current.lookAt(0, 0.85, 0);
      }

      renderer.render(scene, camera);
    };
    animate();

    // 9. Resize Handling
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };
    window.addEventListener("resize", handleResize);

    // 10. Mouse / Touch Interactions
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;

      if (mouseRef.current.isDragging) {
        const deltaX = e.clientX - mouseRef.current.prevX;
        rotationOffsetRef.current.y += deltaX * 0.01;
        mouseRef.current.prevX = e.clientX;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      mouseRef.current.isDragging = true;
      mouseRef.current.prevX = e.clientX;
    };

    const handleMouseUp = () => {
      mouseRef.current.isDragging = false;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Cleanup on unmount
    return () => {
      isDisposed = true;
      cancelAnimationFrame(animFrameIdRef.current);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);

      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
      }
      scene.clear();
      renderer.dispose();
    };
  }, [autoRotate]);

  // Adjust model position subtly based on scrollProgress
  useEffect(() => {
    if (wolfGroupRef.current) {
      // Advance forward slightly as progress increases
      wolfGroupRef.current.position.x = (scrollProgress - 0.5) * 1.8;
      wolfGroupRef.current.position.z = Math.sin(scrollProgress * Math.PI) * 0.4;
    }
  }, [scrollProgress]);

  return (
    <div className={`relative w-full h-full select-none ${className}`}>
      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing outline-none"
        title="Kéo chuột để xoay góc nhìn sói 3D"
      />

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/70 backdrop-blur-md transition-opacity duration-500 rounded-3xl">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <div className="w-12 h-12 border-3 border-meadow-200 border-t-meadow-600 rounded-full animate-spin" />
            <Sparkles className="w-5 h-5 text-sun-amber absolute animate-pulse" />
          </div>
          <span className="mt-4 text-xs font-mono font-semibold text-meadow-900 tracking-wider">
            KHỞI TẠO MÔ HÌNH SÓI 3D CHUẨN ĐIỆN ẢNH...
          </span>
          <span className="text-[11px] font-sans text-stone-500 mt-1">
            Loading rigged bones & cinematic studio lighting
          </span>
        </div>
      )}

      {/* Error State */}
      {loadError && (
        <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-mono">
          {loadError}
        </div>
      )}

      {/* Interactive 3D HUD & Action Switcher */}
      {showUIControls && !isLoading && (
        <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
          {/* Quick Animation Selector */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/90 backdrop-blur-md border border-meadow-200/90 shadow-lg pointer-events-auto">
            <button
              type="button"
              onClick={() => switchAnimation("gallop")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                activeAnim === "gallop"
                  ? "bg-meadow-800 text-white shadow-sm scale-105"
                  : "text-meadow-800 hover:bg-meadow-100"
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-sun-amber" />
              <span>Phi Nước Đại (Gallop)</span>
            </button>

            <button
              type="button"
              onClick={() => switchAnimation("walk")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                activeAnim === "walk"
                  ? "bg-meadow-800 text-white shadow-sm scale-105"
                  : "text-meadow-800 hover:bg-meadow-100"
              }`}
            >
              <Play className="w-3.5 h-3.5 text-meadow-600" />
              <span>Sải Bước (Walk)</span>
            </button>

            <button
              type="button"
              onClick={() => switchAnimation("idle")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                activeAnim === "idle"
                  ? "bg-meadow-800 text-white shadow-sm scale-105"
                  : "text-meadow-800 hover:bg-meadow-100"
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>Cảnh Giác (Idle)</span>
            </button>

            <button
              type="button"
              onClick={() => switchAnimation("jump")}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-meadow-900 bg-sun-warm/20 hover:bg-sun-warm/30 border border-sun-warm/40 transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-sun-amber" />
              <span>Bật Nhảy (Jump)</span>
            </button>
          </div>

          {/* 3D Interaction Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/80 backdrop-blur-sm border border-meadow-200 text-[11px] font-mono text-meadow-700 shadow-sm pointer-events-auto">
            <RotateCw className="w-3 h-3 text-meadow-600" />
            <span>Kéo chuột để xoay 360° • Di chuột để đổi góc nhìn</span>
          </div>
        </div>
      )}
    </div>
  );
}
