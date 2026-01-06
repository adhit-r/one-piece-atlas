import { useEffect, useRef, RefObject } from 'react';
import { latLonToVector3, getGlobeRotation } from '../utils/globeUtils';
import type { Island } from '../utils/islandData';
import { CATEGORY_COLORS } from '../utils/islandData';
import { ONE_PIECE_DATA } from '../data/onePieceData';

interface UseThreeGlobeOptions {
  containerRef: RefObject<HTMLDivElement>;
  activeIslands: Island[];
  selectedVoyage: string;
  onIslandClick?: (island: Island) => void;
  onIslandHover?: (island: Island | null) => void;
}

export const useThreeGlobe = ({
  containerRef,
  activeIslands,
  selectedVoyage,
  onIslandClick,
  onIslandHover,
}: UseThreeGlobeOptions) => {
  const sceneRef = useRef<any>(null);
  const globeRef = useRef<any>(null);
  const markersRef = useRef<Record<string, any>>({});
  const pathRef = useRef<any>(null);
  const shipRef = useRef<any>(null);
  const particlesRef = useRef<any>(null);
  const lightRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const raycasterRef = useRef<any>(null);
  const hoveredIslandRef = useRef<Island | null>(null);
  const isDraggingRef = useRef(false);
  const cameraAnimRef = useRef<any>(null);
  const labelsRef = useRef<Record<string, HTMLDivElement>>({});

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.crossOrigin = 'anonymous';
    script.onload = () => {
      const THREE = (window as any).THREE;
      if (!THREE) {
        console.error('Three.js failed to load');
        return;
      }
      if (!containerRef.current) return;
      console.log('✓ Three.js loaded, initializing globe...');
      
      const updateSize = () => {
        if (!containerRef.current) return;
        const width = containerRef.current.clientWidth || window.innerWidth;
        const height = containerRef.current.clientHeight || window.innerHeight;
        console.log(`Globe container size: ${width}x${height}`);
        return { width, height };
      };
      
      const { width, height } = updateSize();

      const scene = new THREE.Scene();
      scene.background = null; // Transparent background
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.z = 18;
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0); // Transparent background
      renderer.domElement.style.display = 'block';
      renderer.domElement.style.position = 'absolute';
      renderer.domElement.style.top = '0';
      renderer.domElement.style.left = '0';
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      renderer.domElement.style.zIndex = '0';
      containerRef.current!.appendChild(renderer.domElement);
      rendererRef.current = renderer;
      
      // Create labels container for game-like UI overlays
      const labelsContainer = document.createElement('div');
      labelsContainer.style.position = 'absolute';
      labelsContainer.style.top = '0';
      labelsContainer.style.left = '0';
      labelsContainer.style.width = '100%';
      labelsContainer.style.height = '100%';
      labelsContainer.style.pointerEvents = 'none';
      labelsContainer.style.zIndex = '10';
      containerRef.current!.appendChild(labelsContainer);
      
      const updateLabels = () => {
        Object.entries(labelsRef.current).forEach(([islandId, label]) => {
          const marker = markersRef.current[islandId];
          if (!marker) return;

          const vector = marker.position.clone();
          vector.project(camera);

          const x = (vector.x * 0.5 + 0.5) * width;
          const y = (-(vector.y * 0.5) + 0.5) * height;
          const z = vector.z;

          // Hide if behind globe
          if (z > 1) {
            label.style.display = 'none';
          } else {
            label.style.display = 'block';
            label.style.transform = `translate(-50%, -100%) translate(${x}px, ${y - 30}px)`;
          }
        });
      };
      
      // Handle window resize
      const handleResize = () => {
        if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
        const { width: w, height: h } = updateSize();
        cameraRef.current.aspect = w / h;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(w, h);
      };
      window.addEventListener('resize', handleResize);

      // Create procedural globe texture (Google Earth + comic style)
      const canvas = document.createElement('canvas');
      canvas.width = 2048;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const rand = (() => {
        let seed = 1337;
        return () => {
          seed = (seed * 16807) % 2147483647;
          return (seed - 1) / 2147483646;
        };
      })();

      // Deep ocean gradient (Google Earth style)
      const ocean = ctx.createLinearGradient(0, 0, 0, canvas.height);
      ocean.addColorStop(0, '#1a4d7a');
      ocean.addColorStop(0.4, '#0d2847');
      ocean.addColorStop(1, '#051a2f');
      ctx.fillStyle = ocean;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const equatorY = canvas.height / 2;

      // Calm Belts (lighter, more saturated)
      ctx.fillStyle = 'rgba(26, 120, 150, 0.35)';
      ctx.fillRect(0, equatorY - 110, canvas.width, 40);
      ctx.fillRect(0, equatorY + 70, canvas.width, 40);

      // Grand Line (vibrant comic style)
      const glGrad = ctx.createLinearGradient(0, equatorY - 50, 0, equatorY + 50);
      glGrad.addColorStop(0, 'rgba(13, 58, 92, 0)');
      glGrad.addColorStop(0.5, 'rgba(30, 144, 255, 0.7)');
      glGrad.addColorStop(1, 'rgba(13, 58, 92, 0)');
      ctx.fillStyle = glGrad;
      ctx.fillRect(0, equatorY - 50, canvas.width, 100);

      // Red Line (dramatic, bold)
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.75)';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();

      // Ocean wave texture (Perlin-like noise simulation)
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      for (let i = 0; i < 3000; i++) {
        const x = rand() * canvas.width;
        const y = rand() * canvas.height;
        const r = Math.pow(rand(), 2) * 2.5;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Islands - larger, more visible, comic glow style
      ONE_PIECE_DATA.islands.forEach(island => {
        const x = ((island.lon + 180) / 360) * canvas.width;
        const y = ((90 - island.lat) / 180) * canvas.height;
        
        // Glow halo (comic effect)
        const haloGrad = ctx.createRadialGradient(x, y, 0, x, y, 32);
        haloGrad.addColorStop(0, 'rgba(139, 215, 100, 0.4)');
        haloGrad.addColorStop(0.5, 'rgba(139, 215, 100, 0.15)');
        haloGrad.addColorStop(1, 'rgba(139, 215, 100, 0)');
        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(x, y, 32, 0, Math.PI * 2);
        ctx.fill();

        // Core island (bold, vibrant)
        const coreGrad = ctx.createRadialGradient(x, y, 0, x, y, 18);
        const coreColor = island.visual === 'peaks' ? '#ffd700' : '#8bd764';
        const coreEdge = island.visual === 'peaks' ? '#d4af37' : '#6ba54d';
        coreGrad.addColorStop(0, coreColor);
        coreGrad.addColorStop(1, coreEdge);
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(x, y, 18, 0, Math.PI * 2);
        ctx.fill();

        // Bold outline (comic style)
        ctx.strokeStyle = 'rgba(0,0,0,0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, 18, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Meridian grid (subtle but visible)
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1;
      ctx.setLineDash([8, 12]);
      for (let i = 0; i <= 8; i++) {
        const y = (i / 8) * canvas.height;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      for (let i = 0; i < 16; i++) {
        const x = (i / 16) * canvas.width;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Create globe with enhanced material
      const texture = new THREE.CanvasTexture(canvas);
      texture.magFilter = THREE.LinearFilter;
      texture.minFilter = THREE.LinearMipMapLinearFilter;
      const globe = new THREE.Mesh(
        new THREE.SphereGeometry(5, 192, 192),
        new THREE.MeshPhongMaterial({
          map: texture,
          shininess: 25,
          emissive: 0x1a3a4a,
          emissiveIntensity: 0.2,
          wireframe: false,
        })
      );
      scene.add(globe);
      globeRef.current = globe;
      console.log('✓ Globe mesh created and added to scene');

      // Enhanced lighting (Google Earth + comic style)
      // Soft ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
      scene.add(ambientLight);

      // Main directional light (sun)
      const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
      sunLight.position.set(15, 12, 10);
      sunLight.castShadow = true;
      scene.add(sunLight);

      // Fill light (adds comic book quality)
      const fillLight = new THREE.DirectionalLight(0x87ceeb, 0.5);
      fillLight.position.set(-10, -5, 8);
      scene.add(fillLight);

      // Rim light (enhances 3D feel)
      const rimLight = new THREE.DirectionalLight(0xff6b9d, 0.3);
      rimLight.position.set(-20, 0, 20);
      scene.add(rimLight);

      lightRef.current = sunLight;

      // Raycaster for island interactions
      raycasterRef.current = new THREE.Raycaster();

      // Mouse interactions
      const handleMouseDown = () => {
        isDraggingRef.current = true;
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!globeRef.current || !rendererRef.current) return;

        const rect = containerRef.current!.getBoundingClientRect();
        const mouse = {
          x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
          y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
        };

        if (isDraggingRef.current) {
          const deltaX = e.movementX * 0.005;
          const deltaY = e.movementY * 0.005;
          globeRef.current.rotation.y += deltaX;
          globeRef.current.rotation.x += deltaY;
        } else {
          // Hover detection
          raycasterRef.current.setFromCamera(mouse, camera);
          const intersects = raycasterRef.current.intersectObjects(
            Object.values(markersRef.current),
            true
          );

          if (intersects.length > 0) {
            const clickedObject = intersects[0].object;
            const islandId = Object.keys(markersRef.current).find(
              id =>
                markersRef.current[id] === clickedObject.parent ||
                markersRef.current[id] === clickedObject
            );
            if (islandId) {
              const island = activeIslands.find(i => i.id === islandId);
              if (island && hoveredIslandRef.current?.id !== island.id) {
                hoveredIslandRef.current = island;
                onIslandHover?.(island);
              }
            }
          } else {
            if (hoveredIslandRef.current) {
              hoveredIslandRef.current = null;
              onIslandHover?.(null);
            }
          }
        }
      };

      const handleMouseUp = () => {
        isDraggingRef.current = false;
      };

      const handleClick = (e: MouseEvent) => {
        if (isDraggingRef.current) return;

        const rect = containerRef.current!.getBoundingClientRect();
        const mouse = {
          x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
          y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
        };

        raycasterRef.current.setFromCamera(mouse, camera);
        const intersects = raycasterRef.current.intersectObjects(
          Object.values(markersRef.current),
          true
        );

        if (intersects.length > 0) {
          const clickedObject = intersects[0].object;
          const islandId = Object.keys(markersRef.current).find(
            id =>
              markersRef.current[id] === clickedObject.parent ||
              markersRef.current[id] === clickedObject
          );
          if (islandId) {
            const island = activeIslands.find(i => i.id === islandId);
            if (island) {
              onIslandClick?.(island);
            }
          }
        }
      };

      renderer.domElement.addEventListener('mousedown', handleMouseDown);
      renderer.domElement.addEventListener('mousemove', handleMouseMove);
      renderer.domElement.addEventListener('click', handleClick);
      window.addEventListener('mouseup', handleMouseUp);

      // Animation loop with glow pulsing
      let time = 0;
      const animate = () => {
        requestAnimationFrame(animate);
        time += 0.016; // ~60fps

        if (globeRef.current && !isDraggingRef.current) {
          globeRef.current.rotation.y += 0.0001;
        }

        // Pulse glow on markers
        Object.values(markersRef.current).forEach((marker: any) => {
          const glowMesh = marker.userData?.glowMesh;
          if (glowMesh) {
            glowMesh.scale.set(
              1 + Math.sin(time * 3) * 0.15,
              1 + Math.sin(time * 3) * 0.15,
              1 + Math.sin(time * 3) * 0.15
            );
            glowMesh.rotation.z += 0.02;
          }
        });

        updateLabels();
        renderer.render(scene, camera);
      };
      animate();
      console.log('✓ Animation loop started, globe rendering');

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        renderer.domElement.removeEventListener('mousedown', handleMouseDown);
        renderer.domElement.removeEventListener('mousemove', handleMouseMove);
        renderer.domElement.removeEventListener('click', handleClick);
        window.removeEventListener('mouseup', handleMouseUp);
        if (containerRef.current && renderer.domElement.parentNode) {
          containerRef.current.removeChild(renderer.domElement);
        }
      };
    };

    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [containerRef]);

  // Update markers and path when islands change
  useEffect(() => {
    if (!sceneRef.current) return;
    const THREE = (window as any).THREE;

    // Remove old markers and labels
    Object.values(markersRef.current).forEach(m => {
      if (m && sceneRef.current) {
        sceneRef.current.remove(m);
      }
    });
    Object.values(labelsRef.current).forEach(label => {
      if (label.parentNode) {
        label.parentNode.removeChild(label);
      }
    });
    markersRef.current = {};
    labelsRef.current = {};

    // Remove old path and ship
    if (pathRef.current && sceneRef.current) {
      sceneRef.current.remove(pathRef.current);
      pathRef.current = null;
    }
    if (shipRef.current && sceneRef.current) {
      sceneRef.current.remove(shipRef.current);
      shipRef.current = null;
    }

    // Create path
    if (activeIslands.length > 1) {
      const points = activeIslands.map(island => {
        const coords = latLonToVector3(island.lat, island.lon, 5.1);
        return new THREE.Vector3(coords.x, coords.y, coords.z);
      });
      const pathGeo = new THREE.BufferGeometry().setFromPoints(
        new THREE.CatmullRomCurve3(points).getPoints(100)
      );
      pathRef.current = new THREE.Line(
        pathGeo,
        new THREE.LineBasicMaterial({
          color: selectedVoyage === 'strawhats' ? 0xef4444 : 0x3b82f6,
          transparent: true,
          opacity: 0.7,
        })
      );
      sceneRef.current.add(pathRef.current);

      // Create ship marker
      const lastPoint = points[points.length - 1];
      const ship = new THREE.Mesh(
        new THREE.ConeGeometry(0.15, 0.4, 4),
        new THREE.MeshPhongMaterial({
          color: 0xffa500,
          emissive: 0xffa500,
          emissiveIntensity: 0.5,
        })
      );
      ship.position.copy(lastPoint);
      ship.lookAt(0, 0, 0);
      ship.rotateX(Math.PI / 2);
      sceneRef.current.add(ship);
      shipRef.current = ship;
    }

    // Create island markers
    activeIslands.forEach(island => {
      const group = new THREE.Group();
      const coords = latLonToVector3(island.lat, island.lon, 5.05);
      group.position.set(coords.x, coords.y, coords.z);
      group.lookAt(0, 0, 0);
      group.rotateX(Math.PI / 2);

      // Core island mesh
      const mesh = new THREE.Mesh(
        island.hasPoneglyph
          ? new THREE.BoxGeometry(0.15, 0.2, 0.15)
          : new THREE.SphereGeometry(0.1, 16, 16),
        new THREE.MeshPhongMaterial({
          color: island.hasPoneglyph
            ? 0xffd700
            : CATEGORY_COLORS[island.importance],
          emissive: island.hasPoneglyph ? 0xffa500 : 0x000000,
          emissiveIntensity: 0.6,
          shininess: 30,
        })
      );
      group.add(mesh);

      // Glow sphere (comic effect)
      const glowMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.135, 16, 16),
        new THREE.MeshBasicMaterial({
          color: island.hasPoneglyph ? 0xff6b6b : 0x8bd764,
          transparent: true,
          opacity: 0.3,
        })
      );
      glowMesh.position.z = 0.05;
      group.add(glowMesh);
      (glowMesh as any).userData.isGlow = true;

      sceneRef.current.add(group);
      markersRef.current[island.id] = group;
      (group as any).userData.glowMesh = glowMesh;

      // Create game-like label
      if (containerRef.current) {
        const labelsContainer = containerRef.current.querySelector('div[style*="pointer-events: none"]') as HTMLDivElement;
        if (labelsContainer) {
          const label = document.createElement('div');
          label.style.position = 'absolute';
          label.style.pointerEvents = 'none';
          label.style.fontFamily = 'system-ui, -apple-system, sans-serif';
          label.style.fontSize = '11px';
          label.style.fontWeight = '900';
          label.style.color = '#fff';
          label.style.textTransform = 'uppercase';
          label.style.letterSpacing = '0.05em';
          label.style.padding = '6px 12px';
          label.style.background = island.hasPoneglyph 
            ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.95), rgba(220, 38, 38, 0.95))'
            : 'linear-gradient(135deg, rgba(13, 58, 92, 0.95), rgba(8, 47, 73, 0.95))';
          label.style.borderRadius = '8px';
          label.style.border = island.hasPoneglyph
            ? '2px solid rgba(255, 215, 0, 0.8)'
            : '2px solid rgba(59, 130, 246, 0.6)';
          label.style.boxShadow = '0 4px 12px rgba(0,0,0,0.4), 0 0 20px rgba(59, 130, 246, 0.3)';
          label.style.whiteSpace = 'nowrap';
          label.style.animation = 'labelPop 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
          label.textContent = island.name;
          
          // Episode badge
          const badge = document.createElement('span');
          badge.style.marginLeft = '6px';
          badge.style.padding = '2px 6px';
          badge.style.background = 'rgba(0,0,0,0.4)';
          badge.style.borderRadius = '4px';
          badge.style.fontSize = '9px';
          badge.style.fontWeight = '700';
          badge.textContent = `EP ${island.episodes[0]}`;
          label.appendChild(badge);

          labelsContainer.appendChild(label);
          labelsRef.current[island.id] = label;
        }
      }
    });
  }, [activeIslands, selectedVoyage]);

  const flyToIsland = (island: Island) => {
    if (!globeRef.current || !cameraRef.current) return;
    
    // Smooth camera animation (Google Earth style)
    const rotation = getGlobeRotation(island.lat, island.lon);
    const startRot = { y: globeRef.current.rotation.y, x: globeRef.current.rotation.x };
    const startZoom = cameraRef.current.position.z;
    const endZoom = 12; // Zoom in closer for comic effect
    
    let progress = 0;
    const duration = 1.2; // seconds
    const startTime = Date.now();

    const animateCamera = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      progress = Math.min(elapsed / duration, 1);
      
      // Smooth easing (easeInOutCubic)
      const t = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      globeRef.current.rotation.y = startRot.y + (rotation.y - startRot.y) * t;
      globeRef.current.rotation.x = startRot.x + (rotation.x - startRot.x) * t;
      cameraRef.current.position.z = startZoom + (endZoom - startZoom) * t;

      if (progress < 1) {
        cameraAnimRef.current = requestAnimationFrame(animateCamera);
      } else {
        cameraAnimRef.current = null;
      }
    };

    if (cameraAnimRef.current) {
      cancelAnimationFrame(cameraAnimRef.current);
    }
    animateCamera();
  };

  const setLightIntensity = (intensity: number) => {
    if (lightRef.current) {
      lightRef.current.intensity = intensity;
    }
  };

  const zoomIn = () => {
    if (cameraRef.current) {
      cameraRef.current.position.z = Math.max(10, cameraRef.current.position.z - 2);
    }
  };

  const zoomOut = () => {
    if (cameraRef.current) {
      cameraRef.current.position.z = Math.min(30, cameraRef.current.position.z + 2);
    }
  };

  const resetView = () => {
    if (globeRef.current) {
      globeRef.current.rotation.y = 0;
      globeRef.current.rotation.x = 0;
    }
    if (cameraRef.current) {
      cameraRef.current.position.z = 18;
    }
  };

  return {
    flyToIsland,
    setLightIntensity,
    zoomIn,
    zoomOut,
    resetView,
    globeRef,
  };
};

