"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { Sparkles, Trophy, Flame, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";

export interface Wolf3DSceneProps {
  onScoreUpdate?: (score: number, distance: number) => void;
  onMilestoneReached?: (milestoneId: number) => void;
  className?: string;
}

export default function Wolf3DScene({
  onScoreUpdate,
  onMilestoneReached,
  className = "",
}: Wolf3DSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [distance, setDistance] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isJumpingState, setIsJumpingState] = useState(false);
  const [jumpFeedback, setJumpFeedback] = useState<string | null>(null);

  // High score initialization
  useEffect(() => {
    try {
      const saved = localStorage.getItem("wolf_runner_highscore");
      if (saved) setHighScore(parseInt(saved, 10) || 0);
    } catch {}
  }, []);

  // References for Three.js engine
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const actionsRef = useRef<Record<string, THREE.AnimationAction>>({});
  const wolfRootRef = useRef<THREE.Group | null>(null);
  const shadowMeshRef = useRef<THREE.Mesh | null>(null);
  const animFrameRef = useRef<number>(0);

  // Game physics state
  const gameStateRef = useRef({
    distance: 0,
    score: 0,
    speed: 11.5, // units per second
    isJumping: false,
    jumpY: 0,
    jumpVelocity: 0,
    gravity: -38,
    wolfX: -2.2, // fixed X position
    isHit: false,
    hitCooldown: 0,
  });

  // Roadside scenery pools
  const sceneryPoolRef = useRef<THREE.Group[]>([]);
  const obstaclesPoolRef = useRef<{ group: THREE.Group; passed: boolean }[]>([]);
  const birdsPoolRef = useRef<THREE.Group[]>([]);
  const groundTextureRef = useRef<THREE.CanvasTexture | null>(null);

  // Jump trigger handler
  const handleJump = useCallback(() => {
    const game = gameStateRef.current;
    if (game.isJumping) return;

    game.isJumping = true;
    game.jumpVelocity = 14.5;
    setIsJumpingState(true);

    const actions = actionsRef.current;
    const gallopAction = actions["Gallop"];
    const jumpAction = actions["Gallop_Jump"];

    if (jumpAction) {
      if (gallopAction) gallopAction.fadeOut(0.15);
      jumpAction.reset().setEffectiveWeight(1).fadeIn(0.15).play();
    }
  }, []);

  // Keyboard controls (Space / ArrowUp / W to jump)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp" || e.key === "w" || e.key === "W") {
        e.preventDefault();
        handleJump();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleJump]);

  // Main Scene Lifecycle
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let isDisposed = false;

    // 1. Create Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera Setup (Side-scrolling Dino-style with cinematic 3/4 depth)
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 460;
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 120);
    camera.position.set(0, 2.2, 7.6);
    camera.lookAt(0.4, 0.9, 0);
    cameraRef.current = camera;

    // 3. WebGL Renderer
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
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 4. Studio Morning Meadow Lighting
    // Key Sun Light: Warm sunlight illuminating from upper-right
    const sunLight = new THREE.DirectionalLight(0xfff5dd, 2.7);
    sunLight.position.set(6, 10, 6);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.left = -10;
    sunLight.shadow.camera.right = 10;
    sunLight.shadow.camera.top = 8;
    sunLight.shadow.camera.bottom = -4;
    sunLight.shadow.bias = -0.001;
    scene.add(sunLight);

    // Ambient Sky Fill
    const skyLight = new THREE.HemisphereLight(0xdbeafe, 0x22543d, 1.0);
    scene.add(skyLight);

    // Rim Backlight for muscular fur silhouette
    const rimLight = new THREE.DirectionalLight(0x7dd3fc, 1.8);
    rimLight.position.set(-8, 5, -5);
    scene.add(rimLight);

    // 5. Continuous Flat Ground Track (Full Width, Zero cutoff)
    const groundCanvas = document.createElement("canvas");
    groundCanvas.width = 512;
    groundCanvas.height = 512;
    const gCtx = groundCanvas.getContext("2d");
    if (gCtx) {
      // Base meadow earth
      gCtx.fillStyle = "#335c3b";
      gCtx.fillRect(0, 0, 512, 512);

      // Running dirt trail in the center
      const trailGrad = gCtx.createLinearGradient(0, 160, 0, 360);
      trailGrad.addColorStop(0, "#335c3b");
      trailGrad.addColorStop(0.15, "#524330");
      trailGrad.addColorStop(0.5, "#6b5840");
      trailGrad.addColorStop(0.85, "#524330");
      trailGrad.addColorStop(1, "#335c3b");
      gCtx.fillStyle = trailGrad;
      gCtx.fillRect(0, 160, 512, 200);

      // Trail dashes & pebbles for motion sense
      gCtx.fillStyle = "rgba(225, 205, 175, 0.4)";
      for (let i = 0; i < 40; i++) {
        const px = (i * 28) % 512;
        const py = 200 + ((i * 17) % 110);
        gCtx.fillRect(px, py, 12 + (i % 6), 3);
      }
    }
    const groundTexture = new THREE.CanvasTexture(groundCanvas);
    groundTexture.wrapS = THREE.RepeatWrapping;
    groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(16, 1);
    groundTextureRef.current = groundTexture;

    // Endless Ground Plane
    const groundGeo = new THREE.PlaneGeometry(60, 14);
    const groundMat = new THREE.MeshStandardMaterial({
      map: groundTexture,
      roughness: 0.85,
      metalness: 0.05,
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = 0;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // 6. Dynamic Contact Shadow Disc for Wolf
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const shadowCtx = shadowCanvas.getContext("2d");
    if (shadowCtx) {
      const grad = shadowCtx.createRadialGradient(64, 64, 12, 64, 64, 58);
      grad.addColorStop(0, "rgba(20, 42, 25, 0.65)");
      grad.addColorStop(0.4, "rgba(20, 42, 25, 0.25)");
      grad.addColorStop(1, "rgba(20, 42, 25, 0)");
      shadowCtx.fillStyle = grad;
      shadowCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(3.2, 1.6);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(gameStateRef.current.wolfX, 0.015, 0);
    scene.add(shadowMesh);
    shadowMeshRef.current = shadowMesh;

    // 7. Roadside Scenery Generators (Trees, Bushes, Rocks, Wild Animals)
    const createTree = (scale = 1) => {
      const group = new THREE.Group();
      // Trunk
      const trunkGeo = new THREE.CylinderGeometry(0.12 * scale, 0.16 * scale, 1.2 * scale, 6);
      const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5c4033, roughness: 0.9 });
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = (0.6 * scale);
      trunk.castShadow = true;
      group.add(trunk);

      // Foliage layers (Pine layers)
      const colors = [0x234d28, 0x2e6134, 0x3d7c45];
      for (let l = 0; l < 3; l++) {
        const coneGeo = new THREE.ConeGeometry((0.9 - l * 0.2) * scale, (1.2 - l * 0.2) * scale, 6);
        const coneMat = new THREE.MeshStandardMaterial({ color: colors[l], roughness: 0.8 });
        const cone = new THREE.Mesh(coneGeo, coneMat);
        cone.position.y = (1.2 + l * 0.7) * scale;
        cone.castShadow = true;
        group.add(cone);
      }
      return group;
    };

    const createRock = (scale = 1) => {
      const geo = new THREE.DodecahedronGeometry(0.45 * scale, 1);
      const mat = new THREE.MeshStandardMaterial({
        color: 0x78716c,
        roughness: 0.95,
        flatShading: true,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.y = 0.28 * scale;
      mesh.scale.set(1.2, 0.8, 1);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      const grp = new THREE.Group();
      grp.add(mesh);
      return grp;
    };

    const createLog = (scale = 1) => {
      const geo = new THREE.CylinderGeometry(0.22 * scale, 0.24 * scale, 1.4 * scale, 6);
      const mat = new THREE.MeshStandardMaterial({ color: 0x604630, roughness: 0.9 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.z = Math.PI / 2;
      mesh.position.y = 0.22 * scale;
      mesh.castShadow = true;
      const grp = new THREE.Group();
      grp.add(mesh);
      return grp;
    };

    // Populate Background & Foreground Trees
    const sceneryPool: THREE.Group[] = [];
    for (let i = 0; i < 14; i++) {
      const tree = createTree(0.8 + Math.random() * 0.6);
      // Place in far background (z < -1.5) or foreground (z > 1.8)
      const isFar = i % 2 === 0;
      const zPos = isFar ? -2.2 - Math.random() * 1.5 : 2.0 + Math.random() * 1.2;
      tree.position.set(-15 + i * 3.2, 0, zPos);
      scene.add(tree);
      sceneryPool.push(tree);
    }
    sceneryPoolRef.current = sceneryPool;

    // Obstacles pool (rocks & logs directly on the running track z ~ 0)
    const obstaclesPool: { group: THREE.Group; passed: boolean }[] = [];
    const obsSpacing = [8, 16, 24, 32];
    for (let i = 0; i < 4; i++) {
      const isRock = i % 2 === 0;
      const obsGroup = isRock ? createRock(0.9 + Math.random() * 0.3) : createLog(0.85);
      obsGroup.position.set(12 + obsSpacing[i], 0, 0);
      scene.add(obsGroup);
      obstaclesPool.push({ group: obsGroup, passed: false });
    }
    obstaclesPoolRef.current = obstaclesPool;

    // Birds soaring in the morning sky
    const birdsPool: THREE.Group[] = [];
    for (let b = 0; b < 3; b++) {
      const birdGrp = new THREE.Group();
      const wingMat = new THREE.MeshBasicMaterial({ color: 0x334155, side: THREE.DoubleSide });
      const wingGeo = new THREE.PlaneGeometry(0.4, 0.15);
      const wingL = new THREE.Mesh(wingGeo, wingMat);
      wingL.rotation.z = 0.3;
      wingL.position.x = -0.15;
      const wingR = new THREE.Mesh(wingGeo, wingMat);
      wingR.rotation.z = -0.3;
      wingR.position.x = 0.15;
      birdGrp.add(wingL);
      birdGrp.add(wingR);
      birdGrp.position.set(-6 + b * 6, 3.2 + b * 0.6, -2.5 - b * 0.8);
      scene.add(birdGrp);
      birdsPool.push(birdGrp);
    }
    birdsPoolRef.current = birdsPool;

    // 8. Load 3D Wolf Model
    const loader = new GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);

    const wolfRoot = new THREE.Group();
    wolfRootRef.current = wolfRoot;
    wolfRoot.position.set(gameStateRef.current.wolfX, 0, 0);
    // Face directly right along the road track (+X)
    wolfRoot.rotation.y = Math.PI * 0.5;
    scene.add(wolfRoot);

    loader.load(
      "/models/wolf.glb",
      (gltf) => {
        if (isDisposed) return;

        const model = gltf.scene;
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        // Normalize size & place paws on ground
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.4 / maxDim;

        model.scale.setScalar(scale);
        model.position.x = -center.x * scale;
        model.position.y = -box.min.y * scale;
        model.position.z = -center.z * scale;

        wolfRoot.add(model);

        // Setup AnimationMixer
        const mixer = new THREE.AnimationMixer(model);
        mixerRef.current = mixer;

        const actions: Record<string, THREE.AnimationAction> = {};
        gltf.animations.forEach((clip) => {
          actions[clip.name] = mixer.clipAction(clip);
        });
        actionsRef.current = actions;

        // Start Gallop
        if (actions["Gallop"]) {
          actions["Gallop"].play();
        }

        setIsLoading(false);
      },
      undefined,
      (err) => {
        console.error("Error loading wolf model:", err);
        if (!isDisposed) setIsLoading(false);
      }
    );

    // 9. Game Physics & Scenery Animation Loop
    const clock = new THREE.Clock();
    let lastTime = performance.now();

    const gameLoop = (time: number) => {
      animFrameRef.current = requestAnimationFrame(gameLoop);

      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05); // cap delta
      lastTime = now;

      const game = gameStateRef.current;

      // Update Three.js AnimationMixer
      if (mixerRef.current) {
        mixerRef.current.update(dt);
      }

      // Update Jump Physics
      if (game.isJumping) {
        game.jumpVelocity += game.gravity * dt;
        game.jumpY += game.jumpVelocity * dt;

        if (game.jumpY <= 0) {
          game.jumpY = 0;
          game.isJumping = false;
          game.jumpVelocity = 0;
          setIsJumpingState(false);

          // Return smoothly to Gallop
          const actions = actionsRef.current;
          if (actions["Gallop_Jump"] && actions["Gallop"]) {
            actions["Gallop_Jump"].fadeOut(0.2);
            actions["Gallop"].reset().fadeIn(0.2).play();
          }
        }
      }

      // Apply Wolf Position & Shadow
      if (wolfRootRef.current) {
        wolfRootRef.current.position.y = game.jumpY;
        // Subtle forward tilt when leaping
        if (game.isJumping) {
          wolfRootRef.current.rotation.z = -game.jumpVelocity * 0.015;
        } else {
          wolfRootRef.current.rotation.z = 0;
        }
      }

      if (shadowMeshRef.current) {
        // Shadow shrinks and fades as wolf jumps higher
        const jumpFactor = Math.max(0.3, 1 - game.jumpY / 3);
        shadowMeshRef.current.scale.set(jumpFactor, jumpFactor, 1);
        (shadowMeshRef.current.material as THREE.MeshBasicMaterial).opacity = jumpFactor;
      }

      // Scroll Ground Texture for infinite rushing sensation
      if (groundTextureRef.current) {
        groundTextureRef.current.offset.x -= (game.speed * dt) / 16;
      }

      // Scroll Roadside Trees & Bushes
      sceneryPool.forEach((tree) => {
        tree.position.x -= game.speed * 0.95 * dt;
        if (tree.position.x < -18) {
          tree.position.x = 18 + Math.random() * 6;
        }
      });

      // Scroll Obstacles & Check Collisions / Dodges
      obstaclesPool.forEach((obs) => {
        obs.group.position.x -= game.speed * dt;

        // Collision Window with Wolf (wolf is at x = -2.2)
        const distToWolf = Math.abs(obs.group.position.x - game.wolfX);
        if (distToWolf < 0.65) {
          if (game.jumpY < 0.7 && !obs.passed) {
            // Hit!
            if (!game.isHit && now > game.hitCooldown) {
              game.isHit = true;
              game.hitCooldown = now + 1200;
              setJumpFeedback("Vấp chướng ngại vật! Hãy bấm [Space] để nhảy!");
              setTimeout(() => setJumpFeedback(null), 1500);

              // Stumble reaction
              const actions = actionsRef.current;
              if (actions["Idle_HitReact_Right"]) {
                actions["Idle_HitReact_Right"].reset().setDuration(0.5).play();
              }
            }
          } else if (game.jumpY >= 0.7 && !obs.passed) {
            // Clean dodge!
            obs.passed = true;
            game.score += 100;
            setScore(game.score);
            setJumpFeedback("+100 Điểm! Cú nhảy tuyệt đẹp!");
            setTimeout(() => setJumpFeedback(null), 1000);
          }
        }

        // Reset obstacle when it leaves the left screen edge
        if (obs.group.position.x < -16) {
          obs.group.position.x = 16 + Math.random() * 12;
          obs.passed = false;
        }
      });

      // Animate Birds
      birdsPool.forEach((bird, i) => {
        bird.position.x -= (game.speed * 0.45 + i) * dt;
        bird.position.y += Math.sin(now * 0.003 + i) * 0.003;
        if (bird.position.x < -16) {
          bird.position.x = 16 + Math.random() * 5;
        }
      });

      // Advance Distance
      game.distance += Math.round(game.speed * dt * 2.5);
      game.score += Math.round(dt * 8);

      setDistance(game.distance);
      setScore(game.score);

      // Update Highscore
      if (game.score > highScore) {
        setHighScore(game.score);
        try {
          localStorage.setItem("wolf_runner_highscore", game.score.toString());
        } catch {}
      }

      // Check milestones reached (500m, 1200m, 2200m)
      if (game.distance > 500 && game.distance < 550) onMilestoneReached?.(0);
      else if (game.distance > 1200 && game.distance < 1250) onMilestoneReached?.(1);
      else if (game.distance > 2200 && game.distance < 2250) onMilestoneReached?.(2);

      onScoreUpdate?.(game.score, game.distance);

      renderer.render(scene, camera);
    };

    animFrameRef.current = requestAnimationFrame(gameLoop);

    // 10. Resize
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // 11. Click or Tap on canvas to jump
    const handleCanvasClick = () => {
      handleJump();
    };
    container.addEventListener("pointerdown", handleCanvasClick);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("pointerdown", handleCanvasClick);
      scene.clear();
      renderer.dispose();
    };
  }, [handleJump, highScore, onMilestoneReached, onScoreUpdate]);

  return (
    <div className={`relative w-full h-full select-none ${className}`}>
      {/* 3D WebGL Canvas */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-pointer outline-none"
        title="Click chuột hoặc nhấn [Space] để Sói nhảy né chướng ngại vật!"
      />

      {/* Loading Screen */}
      {isLoading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/75 backdrop-blur-md rounded-3xl transition-opacity">
          <div className="w-12 h-12 border-3 border-meadow-300 border-t-meadow-700 rounded-full animate-spin mb-3" />
          <span className="text-xs font-mono font-bold text-meadow-950 tracking-wider">
            KHỞI TẠO ĐƯỜNG ĐUA DINO WOLF RUNNER...
          </span>
          <span className="text-[11px] font-sans text-stone-500 mt-1">
            Nạp đường chạy liên tục, cây cối & thú ven đường
          </span>
        </div>
      )}

      {/* Jump Score Feedback Popups */}
      {jumpFeedback && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 px-4 py-2 rounded-2xl bg-white/95 border border-sun-amber/60 shadow-xl shadow-sun-amber/15 text-xs font-mono font-bold text-meadow-950 animate-bounce">
          <span className="text-sun-amber mr-1.5">⚡</span>
          {jumpFeedback}
        </div>
      )}

      {/* Top Runner Game HUD */}
      {!isLoading && (
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          {/* Live Score & Distance */}
          <div className="flex items-center gap-2.5 p-1.5 px-3 rounded-2xl bg-white/90 backdrop-blur-md border border-meadow-200/90 shadow-md pointer-events-auto">
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <span className="text-stone-500">Cự ly:</span>
              <span className="font-bold text-meadow-900 bg-meadow-100 px-2 py-0.5 rounded-lg">
                {distance}m
              </span>
            </div>
            <div className="h-3.5 w-px bg-meadow-200" />
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <span className="text-stone-500">Điểm:</span>
              <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200/60">
                {score.toString().padStart(5, "0")}
              </span>
            </div>
          </div>

          {/* High Score Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/90 backdrop-blur-md border border-meadow-200/90 shadow-md text-xs font-mono text-stone-700 pointer-events-auto">
            <Trophy className="w-3.5 h-3.5 text-sun-amber" />
            <span className="text-stone-500">Kỷ Lục:</span>
            <span className="font-bold text-stone-900">
              {highScore.toString().padStart(5, "0")}
            </span>
          </div>
        </div>
      )}

      {/* Bottom Interactive Jump Controller (Dino Game Style) */}
      {!isLoading && (
        <div className="absolute bottom-4 inset-x-4 z-20 flex items-center justify-between pointer-events-none">
          {/* Main Jump Button */}
          <button
            type="button"
            onClick={handleJump}
            className={`pointer-events-auto flex items-center gap-2.5 px-5 py-2.5 rounded-2xl font-mono text-xs font-bold text-white shadow-xl transition-all active:scale-95 ${
              isJumpingState
                ? "bg-sun-amber scale-105 shadow-sun-amber/30 ring-4 ring-sun-warm/20"
                : "bg-meadow-800 hover:bg-meadow-900 hover:scale-105 shadow-meadow-950/20"
            }`}
          >
            <Sparkles className="w-4 h-4 text-sun-amber animate-pulse" />
            <span>{isJumpingState ? "ĐANG BẬT NHẢY..." : "BẬT NHẢY [SPACE]"}</span>
          </button>

          {/* Guide hint */}
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/85 backdrop-blur-sm border border-meadow-200 text-xs font-mono text-meadow-900 shadow-sm pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Bấm phím Space hoặc Click chuột để nhảy qua đá & khúc gỗ</span>
          </div>
        </div>
      )}
    </div>
  );
}
