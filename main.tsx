import React, { useState, useMemo, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Compass } from 'lucide-react';
import { useThreeGlobe } from './hooks/useThreeGlobe';
import { useEpisodeNavigation } from './hooks/useEpisodeNavigation';
import { EpisodeControls } from './components/EpisodeControls';
import { ONE_PIECE_DATA } from './data/onePieceData';
import { getIslandById } from './utils/islandData';
import type { Island } from './utils/islandData';

const App = () => {
  const [selectedIslandId, setSelectedIslandId] = useState<string | null>(null);
  const [selectedVoyage, setSelectedVoyage] = useState('strawhats');
  const [hoveredIsland, setHoveredIsland] = useState<Island | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

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
    // Show all islands for now for the visual effect, or filter by episode
    return ONE_PIECE_DATA.islands;
  }, []);

  // Three.js Globe Hook
  const { flyToIsland } = useThreeGlobe({
    containerRef,
    activeIslands,
    selectedVoyage,
    onIslandClick: island => {
      setSelectedIslandId(island.id);
      flyToIsland(island);
    },
    onIslandHover: island => setHoveredIsland(island),
  });

  // Derived state
  const selectedIsland = useMemo(
    () => getIslandById(ONE_PIECE_DATA.islands, selectedIslandId),
    [selectedIslandId]
  );

  return (
    <div className="relative w-full h-screen bg-[#020617] overflow-hidden font-sans text-white">
      {/* 3D Globe Container */}
      <div ref={containerRef} className="absolute inset-0 z-0" />

      {/* Top Left - Brand & Log Pose */}
      <div className="absolute top-8 left-8 z-10 flex items-center gap-6">
        <div className="relative group">
          <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
          <div className="relative w-16 h-16 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-center">
            <Compass className="w-8 h-8 text-cyan-400 animate-[spin_10s_linear_infinite]" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter uppercase leading-none">
            Grand Line
          </h1>
          <p className="text-xs font-bold text-cyan-400 tracking-[0.3em] uppercase mt-1">
            Atlas System v2.0
          </p>
        </div>
      </div>

      {/* Top Right - Search & Voyage Selector */}
      <div className="absolute top-8 right-8 z-10 flex flex-col items-end gap-4">
        <div className="flex gap-2 p-1 bg-black/40 backdrop-blur-xl rounded-full border border-white/10">
          {['strawhats', 'law', 'ace'].map(v => (
            <button
              key={v}
              onClick={() => setSelectedVoyage(v)}
              className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                selectedVoyage === v
                  ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'text-white/60 hover:bg-white/10'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Center Hover Info - Dynamic Futuristic Label */}
      {hoveredIsland && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 flex flex-col items-center"
          style={{ transform: 'translate(-50%, -150px)' }} // Float above center
        >
          <div className="flex flex-col items-center gap-1">
            <div className="w-px h-8 bg-gradient-to-b from-transparent to-cyan-400" />
            <div className="bg-black/80 backdrop-blur-md border border-cyan-500/30 px-6 py-3 rounded-lg flex flex-col items-center shadow-[0_0_30px_rgba(6,182,212,0.2)]">
              <h2 className="text-xl font-black uppercase italic tracking-wider text-white">
                {hoveredIsland.name}
              </h2>
              <div className="flex gap-3 text-[10px] font-bold text-cyan-300 uppercase tracking-widest mt-1">
                <span>{hoveredIsland.sea}</span>
                <span>•</span>
                <span>{hoveredIsland.visual}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Timeline */}
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

      {/* Island Details Overlay (Right Panel) - Only if selected */}
      {selectedIsland && (
        <div className="absolute top-1/2 right-8 -translate-y-1/2 w-80 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-2xl z-20">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-black uppercase italic text-white leading-none">
              {selectedIsland.name}
            </h2>
            <button
              onClick={() => setSelectedIslandId(null)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6">
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                Region
              </p>
              <p className="text-lg font-bold text-cyan-400">
                {selectedIsland.sea}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                Arc
              </p>
              <p className="text-lg font-bold text-white">
                {selectedIsland.arc}
              </p>
            </div>

            {selectedIsland.hasPoneglyph && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-red-200 uppercase tracking-wider">
                  Poneglyph Detected
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Background Ambience (Vignette) */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)] opacity-80" />
    </div>
  );
};

export default App;

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(React.createElement(App));
}
