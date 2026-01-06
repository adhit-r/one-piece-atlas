import React, { useState, useMemo, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Compass,
  Maximize2,
  Moon,
  Sun,
  Search as SearchIcon,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThreeGlobe } from './hooks/useThreeGlobe';
import { useEpisodeNavigation } from './hooks/useEpisodeNavigation';
import { EpisodeControls } from './components/EpisodeControls';
import { IslandDetails } from './components/IslandDetails';
import { GlobeControls } from './components/GlobeControls';
import { SearchBar } from './components/SearchBar';
import { ONE_PIECE_DATA } from './data/onePieceData';
import { getIslandById } from './utils/islandData';
import type { Island } from './utils/islandData';


const App = () => {
  const [selectedIslandId, setSelectedIslandId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedVoyage, setSelectedVoyage] = useState('strawhats');
  const [isNightMode, setIsNightMode] = useState(true);
  const [hoveredIsland, setHoveredIsland] = useState<Island | null>(null);
  const [showSearch, setShowSearch] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Episode navigation hook
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

  // --- DERIVED STATE ---
  const activeIslands = useMemo(() => {
    const crewPath = ONE_PIECE_DATA.paths[selectedVoyage as keyof typeof ONE_PIECE_DATA.paths] || [];
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
        .find(b => b.ep <= currentEpisode) || { ep: 1, amount: 0 }
    );
  }, [currentEpisode]);

  const selectedIsland = useMemo(() => {
    return getIslandById(ONE_PIECE_DATA.islands, selectedIslandId);
  }, [selectedIslandId]);

  // Three.js Globe hook
  const { flyToIsland, setLightIntensity, zoomIn, zoomOut, resetView } = useThreeGlobe({
    containerRef,
    activeIslands,
    selectedVoyage,
    onIslandClick: (island: Island) => {
      setSelectedIslandId(island.id);
      flyToIsland(island);
    },
    onIslandHover: (island: Island | null) => {
      setHoveredIsland(island);
    },
  });

  // --- LIGHTING TOGGLE ---
  useEffect(() => {
    setLightIntensity(isNightMode ? 0.4 : 1.5);
  }, [isNightMode, setLightIntensity]);

  // --- GLOBAL KEYBOARD SHORTCUTS ---
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Search toggle (Cmd/Ctrl + K)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(prev => !prev);
        return;
      }

      // Sidebar toggle (Cmd/Ctrl + B)
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        setIsSidebarOpen(prev => !prev);
        return;
      }

      // Night mode toggle (Cmd/Ctrl + M)
      if ((e.metaKey || e.ctrlKey) && e.key === 'm') {
        e.preventDefault();
        setIsNightMode(prev => !prev);
        return;
      }

      // Escape to close search
      if (e.key === 'Escape' && showSearch) {
        setShowSearch(false);
        return;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showSearch]);

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
            {showSearch ? (
              <div className="space-y-2">
                <SearchBar
                  islands={ONE_PIECE_DATA.islands}
                  onSelectIsland={(island) => {
                    setSelectedIslandId(island.id);
                    flyToIsland(island);
                    setShowSearch(false);
                  }}
                  onClose={() => setShowSearch(false)}
                />
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-10 pb-10 custom-scrollbar space-y-8">
          <AnimatePresence mode="wait">
            <IslandDetails
              island={selectedIsland}
              currentEpisode={currentEpisode}
              currentBounty={currentBounty}
              currentCrew={currentCrew}
            />
          </AnimatePresence>
        </div>
      </motion.aside>

      {/* --- WORLD VIEWER --- */}
      <main className="flex-1 relative bg-[#020617]">
        <div
          ref={containerRef}
          className="w-full h-full cursor-grab active:cursor-grabbing relative z-0"
          style={{ minHeight: '100%' }}
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
              onClick={() => setShowSearch(!showSearch)}
              className="pointer-events-auto p-2 hover:bg-white/10 rounded-xl transition-all"
              title="Search islands"
            >
              <SearchIcon className="w-5 h-5 text-slate-300" />
            </button>
            <button
              onClick={() => setIsNightMode(!isNightMode)}
              className="pointer-events-auto p-2 hover:bg-white/10 rounded-xl transition-all"
              title="Toggle day/night mode"
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
                flyToIsland(island);
              }}
              className={`flex-shrink-0 px-8 py-4 rounded-3xl text-[10px] font-black border transition-all duration-500 transform ${selectedIslandId === island.id ? 'bg-red-600 border-red-400 text-white shadow-[0_30px_60px_rgba(220,38,38,0.5)] -translate-y-4 scale-110' : 'bg-black/60 backdrop-blur-2xl border-white/10 text-slate-400 hover:text-white hover:border-white/20'}`}
            >
              {island.name.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Globe Controls */}
        <GlobeControls
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onReset={resetView}
        />
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
        
        @keyframes labelPop {
          0% { transform: translate(-50%, -100%) scale(0.3); opacity: 0; }
          60% { transform: translate(-50%, -100%) scale(1.1); }
          100% { transform: translate(-50%, -100%) scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default App;

// Mount the app to the DOM
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(React.createElement(App));
}
