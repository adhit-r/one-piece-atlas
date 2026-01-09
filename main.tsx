import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { Map, Anchor } from 'lucide-react';
import { ScrollMap } from './components/ScrollMap';
import { EpisodeControls } from './components/EpisodeControls';
import { useEpisodeNavigation } from './hooks/useEpisodeNavigation';
import { ONE_PIECE_DATA } from './data/onePieceData';
import { getIslandById } from './utils/islandData';
import type { Island } from './utils/islandData';

const App = () => {
  const [selectedIslandId, setSelectedIslandId] = useState<string | null>(null);
  const [selectedVoyage, setSelectedVoyage] = useState('strawhats');

  // Episode navigation
  const [currentEpisode, setCurrentEpisode] = useState(1116);
  const {
    nextEpisode,
    previousEpisode,
    jumpToEpisode,
    isPlaying,
    togglePlay,
    stop,
    playSpeed,
    setPlaySpeed,
    arcs,
  } = useEpisodeNavigation({
    initialEpisode: currentEpisode,
    onEpisodeChange: setCurrentEpisode,
  });

  const activeIslands = useMemo(() => {
    const crewPath = ONE_PIECE_DATA.paths[selectedVoyage];
    return ONE_PIECE_DATA.islands
      .filter(i => crewPath.includes(i.id) && i.episodes[0] <= currentEpisode)
      .sort((a, b) => a.episodes[0] - b.episodes[0]);
  }, [currentEpisode, selectedVoyage]);

  const poneglyphsFound = useMemo(() => {
    return activeIslands.filter(i => i.hasPoneglyph).length;
  }, [activeIslands]);

  const currentCrew = useMemo(() => {
    return ONE_PIECE_DATA.crew.filter(
      member =>
        currentEpisode >= member.joinEp &&
        (!member.leaveEp || currentEpisode < member.leaveEp)
    );
  }, [currentEpisode]);

  const currentBounty = useMemo(() => {
    return (
      [...ONE_PIECE_DATA.bounties]
        .reverse()
        .find(b => b.ep <= currentEpisode) || { amount: 0 }
    );
  }, [currentEpisode]);

  // --- THREE.JS ---
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = () => {
      const THREE = window.THREE;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      // Mobile detection for performance optimization
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const pixelRatio = isMobile ? Math.min(window.devicePixelRatio, 1.5) : window.devicePixelRatio;
      const segments = isMobile ? 64 : 128;

      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.z = 18;

      const renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: true,
        powerPreference: isMobile ? 'low-power' : 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(pixelRatio);
      containerRef.current.appendChild(renderer.domElement);

      // Texture with base map
      const canvas = document.createElement('canvas');
      canvas.width = isMobile ? 2048 : 4096;
      canvas.height = isMobile ? 1024 : 2048;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Procedural Geography
      const glY = canvas.height / 2;
      ctx.fillStyle = '#082f49';
      ctx.fillRect(0, glY - 100, canvas.width, 200);

      ONE_PIECE_DATA.islands.forEach(island => {
        const x = ((island.lon + 180) / 360) * canvas.width;
        const y = ((90 - island.lat) / 180) * canvas.height;
        ctx.fillStyle = island.visual === 'peaks' ? '#ffffff' : '#14532d';
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2;
          const r = 40 * (0.8 + Math.random() * 0.4);
          const px = x + Math.cos(angle) * r;
          const py = y + Math.sin(angle) * r;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.fill();
      });

      // Procedural Normal/Bump Map using noise
      const normalCanvas = document.createElement('canvas');
      normalCanvas.width = isMobile ? 1024 : 2048;
      normalCanvas.height = isMobile ? 512 : 1024;
      const normalCtx = normalCanvas.getContext('2d');
      const imageData = normalCtx.createImageData(normalCanvas.width, normalCanvas.height);
      
      // Simple noise function for bump mapping
      const noise = (x, y) => {
        const n = Math.sin(x * 0.1) * Math.cos(y * 0.1) + 
                  Math.sin(x * 0.05 + y * 0.05) * 0.5 +
                  Math.sin(x * 0.02) * Math.cos(y * 0.03) * 0.3;
        return (n + 2) / 4; // Normalize to 0-1
      };
      
      for (let y = 0; y < normalCanvas.height; y++) {
        for (let x = 0; x < normalCanvas.width; x++) {
          const i = (y * normalCanvas.width + x) * 4;
          const val = Math.floor(noise(x, y) * 255);
          imageData.data[i] = val;
          imageData.data[i + 1] = val;
          imageData.data[i + 2] = val;
          imageData.data[i + 3] = 255;
        }
      }
      normalCtx.putImageData(imageData, 0, 0);

      const texture = new THREE.CanvasTexture(canvas);
      const bumpTexture = new THREE.CanvasTexture(normalCanvas);
      
      const globe = new THREE.Mesh(
        new THREE.SphereGeometry(5, segments, segments),
        new THREE.MeshPhongMaterial({
          map: texture,
          bumpMap: bumpTexture,
          bumpScale: 0.05,
          shininess: 25,
          specular: new THREE.Color(0x333333),
          reflectivity: 0.3,
        })
      );
      scene.add(globe);
      globeRef.current = globe;

      // Enhanced Lighting System: Google Earth + Anime Aesthetic
      // 1. Ambient base light (soft fill)
      const ambientLight = new THREE.AmbientLight(0x404865, 0.6);
      scene.add(ambientLight);

      // 2. Main directional light (sun) - dramatic anime-style
      const sun = new THREE.DirectionalLight(0xfff5e6, 1.8);
      sun.position.set(10, 10, 10);
      scene.add(sun);
      lightRef.current = sun;

      // 3. Fill light (to soften shadows, Google Earth style)
      const fillLight = new THREE.DirectionalLight(0x6b9bd1, 0.4);
      fillLight.position.set(-8, 3, -5);
      scene.add(fillLight);

      // 4. Rim light (anime/comic aesthetic for edge highlighting)
      const rimLight = new THREE.DirectionalLight(0xffffff, 0.6);
      rimLight.position.set(0, 5, -10);
      scene.add(rimLight);

      // 5. Secondary accent light (subtle color gradient)
      const accentLight = new THREE.DirectionalLight(0xff9a5c, 0.3);
      accentLight.position.set(5, -3, 8);
      scene.add(accentLight);

      // Particles
      const partCount = 500;
      const partGeo = new THREE.BufferGeometry();
      const posArr = new Float32Array(partCount * 3);
      for (let i = 0; i < partCount * 3; i++)
        posArr[i] = (Math.random() - 0.5) * 20;
      partGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
      particlesRef.current = new THREE.Points(
        partGeo,
        new THREE.PointsMaterial({
          size: 0.05,
          color: 0xffffff,
          transparent: true,
          opacity: 0,
        })
      );
      scene.add(particlesRef.current);

      let isDragging = false;
      let prevMouse = { x: 0, y: 0 };
      renderer.domElement.addEventListener(
        'mousedown',
        () => (isDragging = true)
      );
      renderer.domElement.addEventListener('mousemove', e => {
        if (isDragging) {
          globe.rotation.y += (e.offsetX - prevMouse.x) * 0.005;
          globe.rotation.x += (e.offsetY - prevMouse.y) * 0.005;
        }
        prevMouse = { x: e.offsetX, y: e.offsetY };
      });
      window.addEventListener('mouseup', () => (isDragging = false));

      const animate = () => {
        requestAnimationFrame(animate);
        if (!isDragging) globe.rotation.y += 0.0001;
        renderer.render(scene, camera);
      };
      animate();

      return () => containerRef.current?.removeChild(renderer.domElement);
    };
    document.head.appendChild(script);
  }, []);

  const selectedIsland = useMemo(
    () => getIslandById(ONE_PIECE_DATA.islands as Island[], selectedIslandId),
    [selectedIslandId]
  );

  return (
    <div className="relative w-full h-screen bg-[#0d0a07] overflow-hidden font-sans text-white">
      {/* Scroll Map */}
      <ScrollMap
        islands={activeIslands}
        selectedVoyage={selectedVoyage}
        onIslandClick={island => setSelectedIslandId(island.id)}
        selectedIslandId={selectedIslandId}
      />

      {/* Top Bar - Brand & Voyage Selector */}
      <div className="absolute top-0 left-0 right-0 z-50 p-6 flex justify-between items-start pointer-events-none">
        {/* Brand */}
        <div className="pointer-events-auto flex items-center gap-4">
          <div className="w-14 h-14 bg-amber-900/80 backdrop-blur-md rounded-xl border border-amber-700/50 flex items-center justify-center shadow-xl">
            <Map className="w-7 h-7 text-amber-300" />
          </div>
          <div>
            <h1
              className="text-2xl font-bold tracking-wide text-amber-100"
              style={{ fontFamily: "'Times New Roman', serif" }}
            >
              Grand Line Atlas
            </h1>
            <p className="text-xs text-amber-600/80 tracking-widest uppercase">
              Captain&apos;s Navigation Chart
            </p>
          </div>
        </div>

        {/* Voyage Selector */}
        <div className="pointer-events-auto flex gap-2 bg-stone-900/80 backdrop-blur-md p-1.5 rounded-full border border-amber-900/30">
          {['strawhats', 'law', 'ace'].map(v => (
            <button
              key={v}
              onClick={() => setSelectedVoyage(v)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                selectedVoyage === v
                  ? 'bg-amber-700 text-amber-100 shadow-lg'
                  : 'text-amber-400/60 hover:bg-amber-900/30'
              }`}
            >
              {v === 'strawhats'
                ? 'Straw Hats'
                : v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Episode Controls */}
      <EpisodeControls
        currentEpisode={currentEpisode}
        onEpisodeChange={setCurrentEpisode}
        nextEpisode={nextEpisode}
        previousEpisode={previousEpisode}
        jumpToEpisode={jumpToEpisode}
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        stop={stop}
        playSpeed={playSpeed}
        setPlaySpeed={setPlaySpeed}
        arcs={arcs}
      />

      {/* Island Details Panel */}
      {selectedIsland && (
        <div className="absolute top-1/2 right-6 -translate-y-1/2 w-80 bg-stone-900/95 backdrop-blur-xl border border-amber-900/40 rounded-2xl p-6 shadow-2xl z-50">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2
                className="text-2xl font-bold text-amber-100 leading-none"
                style={{ fontFamily: "'Times New Roman', serif" }}
              >
                {selectedIsland.name}
              </h2>
              <p className="text-xs text-amber-600/70 uppercase tracking-widest mt-1">
                {selectedIsland.sea}
              </p>
            </div>
            <button
              onClick={() => setSelectedIslandId(null)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-stone-800 hover:bg-stone-700 text-amber-300/70 transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="space-y-5">
            <div className="flex gap-4">
              <div className="flex-1 bg-stone-800/60 rounded-xl p-3">
                <p className="text-[10px] uppercase tracking-widest text-amber-600/60 mb-1">
                  Arc
                </p>
                <p className="text-sm font-bold text-amber-100">
                  {selectedIsland.arc}
                </p>
              </div>
              <div className="flex-1 bg-stone-800/60 rounded-xl p-3">
                <p className="text-[10px] uppercase tracking-widest text-amber-600/60 mb-1">
                  Episodes
                </p>
                <p className="text-sm font-bold text-amber-100">
                  {selectedIsland.episodes[0]} - {selectedIsland.episodes[1]}
                </p>
              </div>
            </div>

            {selectedIsland.hasPoneglyph && (
              <div className="p-3 bg-amber-900/30 border border-amber-700/40 rounded-xl flex items-center gap-3">
                <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Poneglyph Location
                </span>
              </div>
            )}

            {/* Characters */}
            {selectedIsland.characters &&
              selectedIsland.characters.length > 0 && (
                <div className="pt-4 border-t border-stone-700/50">
                  <p className="text-[10px] uppercase tracking-widest text-amber-600/60 mb-3">
                    Key Figures
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedIsland.characters.map((char, i) => {
                      const icons: Record<string, string> = {
                        Luffy: '👒',
                        Zoro: '⚔️',
                        Nami: '🗺️',
                        Usopp: '🎯',
                        Sanji: '🍳',
                        Chopper: '🩺',
                        Robin: '📚',
                        Franky: '🔧',
                        Brook: '🎻',
                        Jinbe: '🦈',
                        Shanks: '🍺',
                        Ace: '🔥',
                        Mihawk: '🗡️',
                        Smoker: '💨',
                        Dragon: '🐉',
                        Crocodile: '🐊',
                        Vivi: '👑',
                        Law: '💉',
                        Whitebeard: '🌊',
                        Doflamingo: '🦩',
                      };
                      const icon = icons[char] || '⭐';
                      return (
                        <div
                          key={char}
                          className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-stone-800 to-stone-800/60 rounded-lg text-sm font-medium text-amber-200 border border-stone-600/50 shadow-lg"
                          style={{
                            animation: `fadeIn 0.3s ease-out ${i * 0.08}s backwards`,
                          }}
                        >
                          <span className="text-lg">{icon}</span>
                          <span>{char}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
          </div>
        </div>
      )}

      {/* Floating Hints */}
      <div className="absolute bottom-28 left-6 flex items-center gap-2 text-amber-700/50 text-xs pointer-events-none">
        <Anchor className="w-4 h-4" />
        <span>Drag to pan • Scroll to zoom</span>
      </div>

      {/* CSS Keyframes */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default App;

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(React.createElement(App));
}
