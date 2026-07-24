import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface ThreeAvatarProps {
  mousePosition: { x: number; y: number };
  onWave?: () => void;
}

const ThreeAvatar: React.FC<ThreeAvatarProps> = ({ mousePosition, onWave }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const avatarRef = useRef<THREE.Group>();
  const mixerRef = useRef<THREE.AnimationMixer>();
  const clockRef = useRef<THREE.Clock>();
  const frameRef = useRef<number>();
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [isWaving, setIsWaving] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      30,
      400 / 400, // Square aspect ratio for the avatar container
      0.1,
      1000
    );
    camera.position.set(0, 1.6, 3);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(400, 400);
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.4);
    directionalLight.position.set(2, 5, 3);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0x4a90e2, 0.3);
    fillLight.position.set(-2, 2, 2);
    scene.add(fillLight);

    // Clock for animations
    const clock = new THREE.Clock();
    clockRef.current = clock;

    // Add a circle around the model (Three.js object)
    const circleGeometry = new THREE.CircleGeometry(1.0, 32); // Radius 1.0, 32 segments
    const circleMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc, side: THREE.DoubleSide }); // Light grey color
    const circle = new THREE.Mesh(circleGeometry, circleMaterial);
    circle.rotation.x = -Math.PI / 2; // Rotate to be flat on the ground
    circle.position.y = -0.25; // Position it slightly below the avatar's feet
    scene.add(circle);

    // Load avatar
    const loader = new GLTFLoader();
    
    // You'll need to add your Ready Player Me avatar GLB file to the public folder
    // For now, we'll create a fallback if the file doesn't exist
    const avatarUrl = '/Animated_RPM_Wave.glb'; // Place your GLB file in the public folder
    
    loader.load(
      avatarUrl,
      (gltf) => {
        const avatar = gltf.scene;
        avatarRef.current = avatar;
        
        // Scale and position the avatar
        avatar.scale.setScalar(1.2);
        avatar.position.set(0, -0.2, 0);
        
        // Enable shadows
        avatar.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        
        scene.add(avatar);
        
        // Declare waveAnimation here to ensure it's always in scope
        let waveAnimation: THREE.AnimationClip | undefined;

        // Setup animation mixer
        if (gltf.animations && Array.isArray(gltf.animations) && gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(avatar);
          mixerRef.current = mixer;
          
          // Find and setup wave animation
          waveAnimation = gltf.animations.find(clip => 
            clip.name.toLowerCase().includes('wave') || 
            clip.name.toLowerCase().includes('hello') ||
            gltf.animations.indexOf(clip) === 0 // Use first animation as fallback
          );
          
          if (waveAnimation) {
            const waveAction = mixer.clipAction(waveAnimation);
            waveAction.setLoop(THREE.LoopOnce);
            waveAction.clampWhenFinished = true;
            
            // Auto-play wave animation on load
            waveAction.reset();
            waveAction.play();
            setIsWaving(true);

            // Shorten the duration for the initial wave animation
            const shortenedDuration = 2500; // 0.5 seconds in milliseconds

            setTimeout(() => {
              waveAction.stop(); // Stop the animation manually
              setIsWaving(false);
            }, shortenedDuration);
          } else {
            console.warn("No suitable wave animation found in GLTF model.");
          }
        } else {
          console.warn("GLTF model has no animations or animations are not in expected format.");
        }
        
        setIsLoaded(true);
      },
      (progress) => {
        console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
      },
      (error) => {
        console.error('Error loading avatar:', error);
        // Create a simple fallback 3D character
        createFallbackCharacter(scene);
        setIsLoaded(true);
      }
    );

    // Add renderer to DOM
    mountRef.current.appendChild(renderer.domElement);

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      
      const delta = clock.getDelta();
      
      // Update animation mixer
      if (mixerRef.current) {
        mixerRef.current.update(delta);
      }
      
      // Head tracking based on mouse position
      if (avatarRef.current && isLoaded) {
        const headRotationX = (mousePosition.y - 50) * 0.001;
        const headRotationY = (mousePosition.x - 50) * 0.001;
        
        // Find head bone and apply rotation
        avatarRef.current.traverse((child) => {
          if (child.name.toLowerCase().includes('head') || 
              child.name.toLowerCase().includes('neck')) {
            child.rotation.x = THREE.MathUtils.lerp(child.rotation.x, headRotationX, 0.1);
            child.rotation.y = THREE.MathUtils.lerp(child.rotation.y, headRotationY, 0.1);
          }
        });
      }
      
      renderer.render(scene, camera);
    };
    
    animate();

    // Cleanup
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Handle mouse position changes
  useEffect(() => {
    // Mouse tracking is handled in the animation loop
  }, [mousePosition]);

  // Handle wave trigger
  const triggerWave = () => {
    if (mixerRef.current && avatarRef.current && !isWaving) {
      const mixer = mixerRef.current;
      const actions = mixer._actions;
      
      if (actions.length > 0) {
        const waveAction = actions[0];
        waveAction.reset();
        waveAction.play();
        setIsWaving(true);
        
        // Shorten the duration for the triggered wave animation
        setTimeout(() => {
          setIsWaving(false);
        }, 500); // 0.5 seconds in milliseconds
      }
    }
    
    if (onWave) {
      onWave();
    }
  };

  // Fallback character creation
  const createFallbackCharacter = (scene: THREE.Scene) => {
    const group = new THREE.Group();
    
    // Head
    const headGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const headMaterial = new THREE.MeshLambertMaterial({ color: 0xffdbac });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(0, 1.5, 0);
    head.castShadow = true;
    group.add(head);
    
    // Body
    const bodyGeometry = new THREE.CylinderGeometry(0.3, 0.4, 1, 8);
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x4a90e2 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.set(0, 0.5, 0);
    body.castShadow = true;
    group.add(body);
    
    // Arms
    const armGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.8, 8);
    const armMaterial = new THREE.MeshLambertMaterial({ color: 0x4a90e2 });
    
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.5, 0.7, 0);
    leftArm.rotation.z = 0.3;
    leftArm.castShadow = true;
    group.add(leftArm);
    
    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.5, 0.7, 0);
    rightArm.rotation.z = -0.3;
    rightArm.castShadow = true;
    group.add(rightArm);
    
    // Legs
    const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.8, 8);
    const legMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
    
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.2, -0.4, 0);
    leftLeg.castShadow = true;
    group.add(leftLeg);
    
    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.2, -0.4, 0);
    rightLeg.castShadow = true;
    group.add(rightLeg);
    
    group.position.set(0, -1, 0);
    avatarRef.current = group;
    scene.add(group);
  };

  return (
    <div className="relative cursor-pointer select-none" onClick={triggerWave}>
      {/* Main container with full width/height and relative positioning */}
      <div className="relative w-full h-full">
        {/* Pulsing gradient blur behind the character - moved and scaled */}
   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full animate-pulse blur-xl"></div>

        {/* Outer circle with gradient, border, and backdrop blur */}
        <div className="w-full h-full bg-gradient-to-br from-blue-400/20 via-purple-500/20 to-cyan-400/20 rounded-full flex items-center justify-center border-2 border-blue-400/30 backdrop-blur-sm">
          {/* Inner circle where the Three.js canvas will be mounted */}
          <div 
            ref={mountRef} 
            className={`w-full h-full rounded-full overflow-hidden transition-all duration-1000 ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-50 scale-95'
            }`}
            style={{
              filter: isLoaded ? 'none' : 'blur(2px)'
            }}
          >
            {/* The Three.js canvas will be appended here by the useEffect hook */}
          </div>
        </div>

        {/* Spinning dashed border */}
        <div className="absolute inset-0 border-2 border-dashed border-blue-400/40 rounded-full animate-spin-slow"></div>
        
      </div>
      
      {/* Loading indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-lg animate-pulse">Loading Avatar...</div>
        </div>
      )}
      
      {/* Interaction hint */}

      
      {/* Wave effect */}

    </div>
  );
};

export default ThreeAvatar;
