import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Compass,
  Users,
  BookOpen,
  Tv,
  ChevronRight,
  Search,
  Navigation,
  Anchor,
  Maximize2,
  Minimize2,
  Play,
  Globe,
  Wind,
  Shield,
  Zap,
  Snowflake,
  Sparkles,
  Flame,
  Target,
  Skull,
  Activity,
  Moon,
  Sun,
  Map as MapIcon,
  Flag,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- COMPREHENSIVE DATA MODEL ---
const ONE_PIECE_DATA = {
  islands: [
    {
      id: 'foosha',
      name: 'Foosha Village',
      sea: 'East Blue',
      lat: -22,
      lon: -155,
      arc: 'Romance Dawn',
      episodes: [1, 3],
      characters: ['Luffy', 'Shanks'],
      importance: 'Major',
      visual: 'village',
    },
    {
      id: 'shells',
      name: 'Shells Town',
      sea: 'East Blue',
      lat: -15,
      lon: -145,
      arc: 'Romance Dawn',
      episodes: [2, 3],
      characters: ['Zoro', 'Morgan'],
      importance: 'Minor',
      visual: 'fort',
    },
    {
      id: 'baratie',
      name: 'Baratie',
      sea: 'East Blue',
      lat: 4,
      lon: -115,
      arc: 'Baratie',
      episodes: [19, 30],
      characters: ['Sanji', 'Mihawk'],
      importance: 'Major',
      visual: 'ship',
    },
    {
      id: 'loguetown',
      name: 'Loguetown',
      sea: 'East Blue',
      lat: 12,
      lon: -95,
      arc: 'Loguetown',
      episodes: [45, 53],
      characters: ['Smoker', 'Dragon'],
      importance: 'Legendary',
      visual: 'city',
    },
    {
      id: 'reverse',
      name: 'Reverse Mountain',
      sea: 'Grand Line',
      lat: 0,
      lon: -90,
      arc: 'Reverse Mountain',
      episodes: [61, 63],
      characters: ['Laboon', 'Crocus'],
      importance: 'Major',
      visual: 'mountain',
    },
    {
      id: 'drum',
      name: 'Drum Island',
      sea: 'Grand Line',
      lat: 4,
      lon: -45,
      arc: 'Drum Island',
      episodes: [78, 91],
      characters: ['Chopper'],
      importance: 'Major',
      visual: 'peaks',
      weather: 'snow',
    },
    {
      id: 'arabasta',
      name: 'Alabasta',
      sea: 'Grand Line',
      lat: -4,
      lon: -30,
      arc: 'Alabasta',
      episodes: [92, 130],
      characters: ['Vivi', 'Crocodile', 'Ace'],
      importance: 'Legendary',
      visual: 'desert_city',
    },
    {
      id: 'skypiea',
      name: 'Skypiea',
      sea: 'Grand Line',
      lat: 0,
      lon: -10,
      arc: 'Skypiea',
      episodes: [153, 195],
      characters: ['Enel'],
      importance: 'Major',
      visual: 'cloud_temple',
      hasPoneglyph: true,
    },
    {
      id: 'water7',
      name: 'Water 7',
      sea: 'Grand Line',
      lat: 3,
      lon: 15,
      arc: 'Water 7',
      episodes: [229, 263],
      characters: ['Franky'],
      importance: 'Legendary',
      visual: 'water_city',
    },
    {
      id: 'enies',
      name: 'Enies Lobby',
      sea: 'Grand Line',
      lat: -3,
      lon: 30,
      arc: 'Enies Lobby',
      episodes: [264, 312],
      characters: ['Robin', 'Luccy'],
      importance: 'Legendary',
      visual: 'judicial_tower',
    },
    {
      id: 'thriller',
      name: 'Thriller Bark',
      sea: 'Grand Line',
      lat: 0,
      lon: 60,
      arc: 'Thriller Bark',
      episodes: [337, 381],
      characters: ['Brook'],
      importance: 'Major',
      visual: 'ship',
    },
    {
      id: 'sabaody',
      name: 'Sabaody',
      sea: 'Grand Line',
      lat: 0,
      lon: 85,
      arc: 'Sabaody',
      episodes: [385, 405],
      characters: ['Rayleigh', 'Kizaru'],
      importance: 'Legendary',
      visual: 'mangrove',
      weather: 'bubbles',
    },
    {
      id: 'marineford',
      name: 'Marineford',
      sea: 'Grand Line',
      lat: 5,
      lon: 88,
      arc: 'Marineford',
      episodes: [457, 489],
      characters: ['Whitebeard'],
      importance: 'Legendary',
      visual: 'fortress',
    },
    {
      id: 'fishman',
      name: 'Fishman Island',
      sea: 'New World',
      lat: 0,
      lon: 95,
      arc: 'Fishman Island',
      episodes: [517, 574],
      characters: ['Jimbei'],
      importance: 'Major',
      visual: 'mangrove',
      hasPoneglyph: true,
    },
    {
      id: 'dressrosa',
      name: 'Dressrosa',
      sea: 'New World',
      lat: -5,
      lon: 130,
      arc: 'Dressrosa',
      episodes: [629, 746],
      characters: ['Doflamingo'],
      importance: 'Legendary',
      visual: 'colosseum',
    },
    {
      id: 'zou',
      name: 'Zou',
      sea: 'New World',
      lat: 2,
      lon: 145,
      arc: 'Zou',
      episodes: [751, 779],
      characters: ['Minks'],
      importance: 'Major',
      visual: 'elephant',
      hasPoneglyph: true,
    },
    {
      id: 'wano',
      name: 'Wano Country',
      sea: 'New World',
      lat: 8,
      lon: 165,
      arc: 'Wano',
      episodes: [892, 1085],
      characters: ['Kaido', 'Yamato'],
      importance: 'Legendary',
      visual: 'pagoda',
      weather: 'sakura',
      hasPoneglyph: true,
    },
    {
      id: 'egghead',
      name: 'Egghead',
      sea: 'New World',
      lat: 0,
      lon: 178,
      arc: 'Egghead',
      episodes: [1086, 1120],
      characters: ['Vegapunk'],
      importance: 'Major',
      visual: 'lab',
    },
  ],
  paths: {
    strawhats: [
      'foosha',
      'shells',
      'baratie',
      'loguetown',
      'reverse',
      'drum',
      'arabasta',
      'skypiea',
      'water7',
      'enies',
      'thriller',
      'sabaody',
      'marineford',
      'fishman',
      'dressrosa',
      'zou',
      'wano',
      'egghead',
    ],
    law: [
      'sabaody',
      'marineford',
      'punk',
      'dressrosa',
      'zou',
      'wano',
      'egghead',
    ],
    ace: ['foosha', 'arabasta', 'marineford'],
  },
  bounties: [
    { ep: 1, amount: 0 },
    { ep: 45, amount: 30000000 },
    { ep: 130, amount: 100000000 },
    { ep: 312, amount: 300000000 },
    { ep: 489, amount: 400000000 },
    { ep: 746, amount: 500000000 },
    { ep: 890, amount: 1500000000 },
    { ep: 1085, amount: 3000000000 },
  ],
  crew: [
    { name: 'Luffy', joinEp: 1 },
    { name: 'Zoro', joinEp: 3 },
    { name: 'Nami', joinEp: 8 },
    { name: 'Usopp', joinEp: 18 },
    { name: 'Sanji', joinEp: 30 },
    { name: 'Chopper', joinEp: 91 },
    { name: 'Robin', joinEp: 130 },
    { name: 'Franky', joinEp: 312 },
    { name: 'Brook', joinEp: 381 },
    { name: 'Jimbei', joinEp: 890 },
    { name: 'Vivi', joinEp: 67, leaveEp: 130 },
  ],
};

const CATEGORY_COLORS = {
  Major: 0xf59e0b,
  Minor: 0x6b7280,
  Legendary: 0xef4444,
};

const App = () => {
  const [currentEpisode, setCurrentEpisode] = useState(1116);
  const [selectedIslandId, setSelectedIslandId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedVoyage, setSelectedVoyage] = useState('strawhats');
  const [isNightMode, setIsNightMode] = useState(true);

  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const globeRef = useRef(null);
  const markersRef = useRef({});
  const pathRef = useRef(null);
  const shipRef = useRef(null);
  const particlesRef = useRef(null);
  const lightRef = useRef(null);

  // --- DERIVED STATE ---
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

      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.z = 18;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);
      containerRef.current.appendChild(renderer.domElement);

      // Texture
      const canvas = document.createElement('canvas');
      canvas.width = 4096;
      canvas.height = 2048;
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

      const texture = new THREE.CanvasTexture(canvas);
      const globe = new THREE.Mesh(
        new THREE.SphereGeometry(5, 128, 128),
        new THREE.MeshPhongMaterial({
          map: texture,
          shininess: 15,
          bumpScale: 0.1,
        })
      );
      scene.add(globe);
      globeRef.current = globe;

      scene.add(new THREE.AmbientLight(0xffffff, 0.5));
      const sun = new THREE.DirectionalLight(0xffffff, 1.2);
      sun.position.set(10, 10, 10);
      scene.add(sun);
      lightRef.current = sun;

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

  // --- LIGHTING TOGGLE ---
  useEffect(() => {
    if (!lightRef.current) return;
    lightRef.current.intensity = isNightMode ? 0.4 : 1.5;
  }, [isNightMode]);

  // --- CONTENT UPDATE ---
  useEffect(() => {
    if (!sceneRef.current) return;
    const THREE = window.THREE;
    Object.values(markersRef.current).forEach(m => sceneRef.current.remove(m));
    if (pathRef.current) sceneRef.current.remove(pathRef.current);
    if (shipRef.current) sceneRef.current.remove(shipRef.current);

    // Path
    if (activeIslands.length > 1) {
      const points = activeIslands.map(island => {
        const phi = (90 - island.lat) * (Math.PI / 180);
        const theta = (island.lon + 180) * (Math.PI / 180);
        return new THREE.Vector3(
          -5.1 * Math.sin(phi) * Math.cos(theta),
          5.1 * Math.cos(phi),
          5.1 * Math.sin(phi) * Math.sin(theta)
        );
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

    // Landmarks
    activeIslands.forEach(island => {
      const group = new THREE.Group();
      const phi = (90 - island.lat) * (Math.PI / 180);
      const theta = (island.lon + 180) * (Math.PI / 180);
      const dist = 5.05;
      group.position.set(
        -dist * Math.sin(phi) * Math.cos(theta),
        dist * Math.cos(phi),
        dist * Math.sin(phi) * Math.sin(theta)
      );
      group.lookAt(0, 0, 0);
      group.rotateX(Math.PI / 2);

      const mesh = new THREE.Mesh(
        island.hasPoneglyph
          ? new THREE.BoxGeometry(0.15, 0.2, 0.15)
          : new THREE.SphereGeometry(0.1, 12, 12),
        new THREE.MeshPhongMaterial({
          color: island.hasPoneglyph
            ? 0xef4444
            : CATEGORY_COLORS[island.importance],
          emissive: island.hasPoneglyph ? 0xef4444 : 0x000000,
          emissiveIntensity: 0.5,
        })
      );
      group.add(mesh);
      sceneRef.current.add(group);
      markersRef.current[island.id] = group;
    });
  }, [currentEpisode, selectedVoyage]);

  const flyTo = island => {
    if (!globeRef.current) return;
    globeRef.current.rotation.y =
      -(island.lon + 180) * (Math.PI / 180) + Math.PI / 2;
    globeRef.current.rotation.x = island.lat * (Math.PI / 180);
  };

  return (
    <div className="flex h-screen w-full bg-[#020617] overflow-hidden text-slate-100 font-sans">
      {/* --- SIDEBAR --- */}
      <motion.aside
        animate={{ width: isSidebarOpen ? '480px' : '0px' }}
        className="relative bg-[#050b1a] border-r border-white/5 flex flex-col z-20 shadow-2xl overflow-hidden"
      >
        <div className="p-10 flex-shrink-0">
          <div className="flex items-center gap-5 mb-10">
            <Compass className="w-12 h-12 text-red-600 animate-[spin_12s_linear_infinite]" />
            <div>
              <h1 className="text-2xl font-black uppercase italic tracking-tighter leading-none">
                World Atlas
              </h1>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-1 italic">
                Great Pirate Era
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-6 bg-white/5 rounded-3xl border border-white/10 shadow-inner">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Voyage Log
                </span>
                <span className="text-xs font-black text-red-500 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                  Ep. {currentEpisode}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="1116"
                value={currentEpisode}
                onChange={e => setCurrentEpisode(parseInt(e.target.value))}
                className="w-full accent-red-600 h-1.5 bg-white/5 rounded-full cursor-pointer appearance-none"
              />
            </div>

            <div className="flex gap-2">
              {['strawhats', 'law', 'ace'].map(v => (
                <button
                  key={v}
                  onClick={() => setSelectedVoyage(v)}
                  className={`flex-1 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedVoyage === v ? 'bg-red-600 shadow-lg shadow-red-600/30' : 'bg-white/5 border border-white/5 hover:bg-white/10'}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-10 pb-10 custom-scrollbar space-y-8">
          <AnimatePresence mode="wait">
            {selectedIslandId ? (
              <motion.div
                key={selectedIslandId}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="relative rounded-[3rem] overflow-hidden bg-black aspect-video group shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050b1a] via-transparent to-transparent z-10" />
                  <div className="absolute inset-0 flex items-center justify-center p-8 z-20 text-center">
                    <div>
                      <span className="text-[10px] uppercase font-black text-red-500 tracking-[0.4em] mb-4 block">
                        Log Entry
                      </span>
                      <h2 className="text-5xl font-black mb-2 tracking-tighter">
                        {
                          ONE_PIECE_DATA.islands.find(
                            i => i.id === selectedIslandId
                          ).name
                        }
                      </h2>
                      <div className="flex items-center justify-center gap-3 opacity-60">
                        <Anchor className="w-4 h-4 text-amber-500" />
                        <span className="text-sm font-bold uppercase">
                          {
                            ONE_PIECE_DATA.islands.find(
                              i => i.id === selectedIslandId
                            ).sea
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5">
                    <Target className="w-6 h-6 text-amber-500 mb-4" />
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Active Bounty
                    </p>
                    <p className="text-2xl font-black">
                      {currentBounty.amount.toLocaleString()}฿
                    </p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5">
                    <BookOpen className="w-6 h-6 text-red-500 mb-4" />
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Poneglyphs
                    </p>
                    <p className="text-2xl font-black">
                      {ONE_PIECE_DATA.islands.find(
                        i => i.id === selectedIslandId
                      ).hasPoneglyph
                        ? 'SECURED'
                        : 'NONE'}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2 px-2">
                    <Users className="w-4 h-4 text-blue-500" /> Active Crew
                    Members
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentCrew.map(member => (
                      <span
                        key={member.name}
                        className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-xs font-bold hover:border-blue-500/30 transition-all cursor-default"
                      >
                        {member.name}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 opacity-30">
                <Globe className="w-20 h-20 mb-6 animate-spin-slow" />
                <p className="text-xl font-black uppercase tracking-[0.4em]">
                  Setting Sail
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>

      {/* --- WORLD VIEWER --- */}
      <main className="flex-1 relative bg-black">
        <div
          ref={containerRef}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        />

        {/* HUD Overlay */}
        <div className="absolute top-10 left-10 flex flex-col gap-4 pointer-events-none">
          {!isSidebarOpen && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="pointer-events-auto p-5 bg-white/10 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl"
            >
              <Maximize2 className="w-6 h-6" />
            </button>
          )}
          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-full px-8 py-4 pointer-events-auto shadow-2xl flex items-center gap-8">
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-slate-500 uppercase">
                Road to Laugh Tale
              </span>
              <div className="flex gap-1 mt-1">
                {[1, 2, 3, 4].map(i => (
                  <div
                    key={i}
                    className={`w-6 h-1 rounded-full transition-all duration-700 ${i <= poneglyphsFound ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]' : 'bg-white/10'}`}
                  />
                ))}
              </div>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <button
              onClick={() => setIsNightMode(!isNightMode)}
              className="pointer-events-auto p-2 hover:bg-white/10 rounded-xl transition-all"
            >
              {isNightMode ? (
                <Moon className="w-5 h-5 text-blue-400" />
              ) : (
                <Sun className="w-5 h-5 text-amber-500" />
              )}
            </button>
          </div>
        </div>

        {/* Global Navigator Timeline (Bottom) */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-10 max-w-[85%] overflow-x-auto pb-6 px-8 no-scrollbar scroll-smooth">
          {activeIslands.map(island => (
            <button
              key={island.id}
              onClick={() => {
                setSelectedIslandId(island.id);
                flyTo(island);
              }}
              className={`flex-shrink-0 px-8 py-4 rounded-3xl text-[10px] font-black border transition-all duration-500 transform ${selectedIslandId === island.id ? 'bg-red-600 border-red-400 text-white shadow-[0_30px_60px_rgba(220,38,38,0.5)] -translate-y-4 scale-110' : 'bg-black/60 backdrop-blur-2xl border-white/10 text-slate-400 hover:text-white hover:border-white/20'}`}
            >
              {island.name.toUpperCase()}
            </button>
          ))}
        </div>
      </main>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 10px; }
        
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 24px; width: 24px;
          border-radius: 50%;
          background: #dc2626;
          cursor: pointer;
          border: 4px solid #050b1a;
          box-shadow: 0 0 15px rgba(220, 38, 38, 0.4);
        }
        
        .animate-spin-slow { animation: spin 40s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default App;
