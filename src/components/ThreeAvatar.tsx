import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface ThreeAvatarProps {
  mousePosition: { x: number; y: number };
  onWave?: () => void;
}

/** Arm chain bones: restored to bind pose after waving so hands aren't left mid-air */
const ARM_BONES = new Set([
  'LeftShoulder',
  'RightShoulder',
  'LeftArm',
  'RightArm',
  'LeftForeArm',
  'RightForeArm',
  'LeftHand',
  'RightHand',
  'LeftHandThumb1',
  'LeftHandThumb2',
  'LeftHandThumb3',
  'LeftHandIndex1',
  'LeftHandIndex2',
  'LeftHandIndex3',
  'LeftHandMiddle1',
  'LeftHandMiddle2',
  'LeftHandMiddle3',
  'LeftHandRing1',
  'LeftHandRing2',
  'LeftHandRing3',
  'LeftHandPinky1',
  'LeftHandPinky2',
  'LeftHandPinky3',
  'RightHandThumb1',
  'RightHandThumb2',
  'RightHandThumb3',
  'RightHandIndex1',
  'RightHandIndex2',
  'RightHandIndex3',
  'RightHandMiddle1',
  'RightHandMiddle2',
  'RightHandMiddle3',
  'RightHandRing1',
  'RightHandRing2',
  'RightHandRing3',
  'RightHandPinky1',
  'RightHandPinky2',
  'RightHandPinky3',
]);

interface BoneBind {
  position: THREE.Vector3;
  quaternion: THREE.Quaternion;
  scale: THREE.Vector3;
}

const ThreeAvatar: React.FC<ThreeAvatarProps> = ({ mousePosition, onWave }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const avatarRef = useRef<THREE.Group>();
  const mixerRef = useRef<THREE.AnimationMixer>();
  const waveActionRef = useRef<THREE.AnimationAction>();
  const frameRef = useRef<number>();
  const mouseRef = useRef(mousePosition);
  const headBoneRef = useRef<THREE.Object3D>();
  const neckBoneRef = useRef<THREE.Object3D>();
  const leftEyeRef = useRef<THREE.Object3D>();
  const rightEyeRef = useRef<THREE.Object3D>();
  const armBindRef = useRef<Map<string, BoneBind>>(new Map());
  const waveTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const isWavingRef = useRef(false);
  const playWaveRef = useRef<() => void>(() => {});

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    mouseRef.current = mousePosition;
  }, [mousePosition]);

  useEffect(() => {
    if (!mountRef.current) return;

    const host = mountRef.current;
    const initialSize = host.clientWidth || 400;
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const scene = new THREE.Scene();

    // Framed for head + torso + arms at rest (adjusted after model loads)
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 1.4, 2.6);
    camera.lookAt(0, 1.25, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(initialSize, initialSize);
    // Cap DPR harder on phones: full retina scaling melts mobile GPUs/battery
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = !isMobile;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.05);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.35);
    directionalLight.position.set(2, 5, 3);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0x4a90e2, 0.35);
    fillLight.position.set(-2, 2, 2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.25);
    rimLight.position.set(0, 2, -3);
    scene.add(rimLight);

    const clock = new THREE.Clock();

    const restoreArmRestPose = () => {
      const avatar = avatarRef.current;
      if (!avatar) return;
      avatar.traverse((child) => {
        if (!(child instanceof THREE.Bone) || !ARM_BONES.has(child.name)) return;
        const bind = armBindRef.current.get(child.name);
        if (!bind) return;
        child.position.copy(bind.position);
        child.quaternion.copy(bind.quaternion);
        child.scale.copy(bind.scale);
      });
    };

    const endWave = (action: THREE.AnimationAction) => {
      if (waveTimeoutRef.current) clearTimeout(waveTimeoutRef.current);
      action.fadeOut(0.3);
      waveTimeoutRef.current = setTimeout(() => {
        action.stop();
        action.reset();
        action.enabled = true;
        action.setEffectiveWeight(0);
        restoreArmRestPose();
        isWavingRef.current = false;
      }, 320);
    };

    const playWave = (action: THREE.AnimationAction, force = false) => {
      // Allow re-click: interrupt current wave and restart
      if (isWavingRef.current && !force) {
        if (waveTimeoutRef.current) clearTimeout(waveTimeoutRef.current);
        action.stop();
        restoreArmRestPose();
        isWavingRef.current = false;
      }

      isWavingRef.current = true;
      action.enabled = true;
      action.paused = false;
      action.reset();
      action.setEffectiveWeight(1);
      action.setEffectiveTimeScale(1);
      action.fadeIn(0.12);
      action.play();

      const durationMs = Math.min(
        Math.max((action.getClip().duration || 2.2) * 1000 * 0.95, 1600),
        3500
      );

      if (waveTimeoutRef.current) clearTimeout(waveTimeoutRef.current);
      waveTimeoutRef.current = setTimeout(() => endWave(action), durationMs);
    };

    playWaveRef.current = () => {
      if (waveActionRef.current) playWave(waveActionRef.current, true);
    };

    const loader = new GLTFLoader();

    loader.load(
      '/Animated_RPM_Wave.glb',
      (gltf) => {
        const avatar = gltf.scene;
        avatarRef.current = avatar;

        // Fit head + torso + resting arms inside the circular viewport
        avatar.scale.setScalar(0.95);
        avatar.position.set(0, -0.4, 0);

        avatar.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }

          switch (child.name) {
            case 'Head':
              headBoneRef.current = child;
              break;
            case 'Neck':
              neckBoneRef.current = child;
              break;
            case 'LeftEye':
              leftEyeRef.current = child;
              break;
            case 'RightEye':
              rightEyeRef.current = child;
              break;
          }
        });

        scene.add(avatar);

        // Frame face + upper torso; slightly closer for a clearer face
        avatar.updateMatrixWorld(true);
        const box = new THREE.Box3().setFromObject(avatar);
        const boxSize = box.getSize(new THREE.Vector3());
        const focusY = box.min.y + boxSize.y * 0.82;
        const distance = Math.max(boxSize.y * 0.95, 2.0);
        camera.position.set(0, focusY, distance);
        camera.lookAt(0, focusY - 0.1, 0);
        camera.updateProjectionMatrix();

        if (gltf.animations?.length) {
          const mixer = new THREE.AnimationMixer(avatar);
          mixerRef.current = mixer;

          const waveClip =
            gltf.animations.find(
              (clip) =>
                clip.name.toLowerCase().includes('wave') ||
                clip.name.toLowerCase().includes('hello') ||
                clip.name === 'Armature'
            ) ?? gltf.animations[0];

          if (waveClip) {
            // Strip eye tracks so the wave never locks the eyeballs
            const bodyTracks = waveClip.tracks.filter(
              (t) => !/LeftEye|RightEye/i.test(t.name)
            );
            const bodyClip = new THREE.AnimationClip(
              waveClip.name + '_body',
              waveClip.duration,
              bodyTracks
            );

            const waveAction = mixer.clipAction(bodyClip);
            // Don't freeze on the last wave frame: arms would hang mid-air
            waveAction.setLoop(THREE.LoopOnce, 1);
            waveAction.clampWhenFinished = false;
            waveActionRef.current = waveAction;

            // Capture rest pose from frame 0 (arms down), not the T-pose bind
            waveAction.play();
            waveAction.paused = true;
            waveAction.time = 0;
            mixer.update(0);
            armBindRef.current.clear();
            avatar.traverse((child) => {
              if (child instanceof THREE.Bone && ARM_BONES.has(child.name)) {
                armBindRef.current.set(child.name, {
                  position: child.position.clone(),
                  quaternion: child.quaternion.clone(),
                  scale: child.scale.clone(),
                });
              }
            });
            waveAction.stop();
            waveAction.paused = false;
            restoreArmRestPose();

            mixer.addEventListener('finished', (e) => {
              if (e.action === waveAction && isWavingRef.current) {
                endWave(waveAction);
              }
            });

            // Update the click handler now that the action exists
            playWaveRef.current = () => playWave(waveAction, true);

            // Initial greeting wave, then return to rest
            playWave(waveAction, true);
          }
        }

        setIsLoaded(true);
      },
      undefined,
      (error) => {
        console.error('Error loading avatar:', error);
        createFallbackCharacter(scene);
        setIsLoaded(true);
      }
    );

    host.appendChild(renderer.domElement);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.touchAction = 'manipulation';
    // Clicks on the canvas bubble to the wrapper's onClick
    renderer.domElement.style.pointerEvents = 'auto';
    renderer.domElement.style.cursor = 'pointer';

    // Keep the canvas square and matched to its container across rotations/resizes
    const resize = () => {
      const next = host.clientWidth || initialSize;
      renderer.setSize(next, next, true);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    window.addEventListener('orientationchange', resize);

    // Pause the render loop when offscreen or backgrounded (mobile battery)
    let visible = true;
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    visibilityObserver.observe(host);

    const onDocVisibility = () => {
      if (document.hidden) visible = false;
    };
    document.addEventListener('visibilitychange', onDocVisibility);

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      if (!visible || document.hidden) return;

      const delta = clock.getDelta();
      if (mixerRef.current) {
        mixerRef.current.update(delta);
      }

      // Cursor → look (my: -1 at top of screen, +1 at bottom)
      const mx = (mouseRef.current.x / 100) * 2 - 1;
      const my = (mouseRef.current.y / 100) * 2 - 1;

      // Vertical fixed: mouse up → look up (positive my used so top = negative pitch)
      const headPitch = THREE.MathUtils.clamp(my * 0.28, -0.28, 0.28);
      const headYaw = THREE.MathUtils.clamp(mx * 0.35, -0.35, 0.35);

      if (neckBoneRef.current) {
        neckBoneRef.current.rotation.x = THREE.MathUtils.lerp(
          neckBoneRef.current.rotation.x,
          headPitch * 0.35,
          0.12
        );
        neckBoneRef.current.rotation.y = THREE.MathUtils.lerp(
          neckBoneRef.current.rotation.y,
          headYaw * 0.3,
          0.12
        );
      }

      if (headBoneRef.current) {
        headBoneRef.current.rotation.x = THREE.MathUtils.lerp(
          headBoneRef.current.rotation.x,
          headPitch,
          0.14
        );
        headBoneRef.current.rotation.y = THREE.MathUtils.lerp(
          headBoneRef.current.rotation.y,
          headYaw,
          0.14
        );
      }

      // Eyes: direct local rotation (wave clip no longer touches these bones)
      const eyePitch = THREE.MathUtils.clamp(my * 0.5, -0.45, 0.45);
      const eyeYaw = THREE.MathUtils.clamp(mx * 0.65, -0.55, 0.55);

      const applyEyeLook = (eye: THREE.Object3D | undefined, pitch: number, yaw: number) => {
        if (!eye) return;
        eye.rotation.x = THREE.MathUtils.lerp(eye.rotation.x, pitch, 0.28);
        eye.rotation.y = THREE.MathUtils.lerp(eye.rotation.y, yaw, 0.28);
      };

      applyEyeLook(leftEyeRef.current, eyePitch, eyeYaw);
      applyEyeLook(rightEyeRef.current, eyePitch, eyeYaw);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (waveTimeoutRef.current) clearTimeout(waveTimeoutRef.current);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener('orientationchange', resize);
      document.removeEventListener('visibilitychange', onDocVisibility);
      if (renderer.domElement.parentNode === host) {
        host.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const triggerWave = () => {
    playWaveRef.current();
    onWave?.();
  };

  const createFallbackCharacter = (scene: THREE.Scene) => {
    const group = new THREE.Group();

    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.28, 32, 32),
      new THREE.MeshLambertMaterial({ color: 0xffdbac })
    );
    head.name = 'Head';
    head.position.set(0, 1.55, 0);
    group.add(head);
    headBoneRef.current = head;

    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.28, 0.35, 0.9, 8),
      new THREE.MeshLambertMaterial({ color: 0x4a90e2 })
    );
    body.position.set(0, 0.85, 0);
    group.add(body);

    group.position.set(0, -0.4, 0);
    avatarRef.current = group;
    scene.add(group);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Click avatar to wave"
      className="relative cursor-pointer select-none w-[min(78vw,400px)] h-[min(78vw,400px)] touch-manipulation"
      onClick={(e) => {
        e.preventDefault();
        triggerWave();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          triggerWave();
        }
      }}
    >
      <div className="relative w-full h-full">
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-gold-500/10 rounded-full animate-gold-pulse blur-3xl" />

        <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden neu-inset">
          <div
            ref={mountRef}
            className={`w-full h-full rounded-full overflow-hidden transition-all duration-1000 ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-50 scale-95'
            }`}
            style={{ filter: isLoaded ? 'none' : 'blur(2px)' }}
          />
        </div>

        <div className="pointer-events-none absolute inset-0 border border-dashed border-gold-500/25 rounded-full animate-spin-slow" />
      </div>

      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="gold-text text-lg animate-pulse">Loading…</div>
        </div>
      )}
    </div>
  );
};

export default ThreeAvatar;
