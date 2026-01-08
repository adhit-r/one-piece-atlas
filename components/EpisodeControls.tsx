import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';

interface EpisodeControlsProps {
  currentEpisode: number;
  onEpisodeChange: (episode: number) => void;
  nextEpisode: () => void;
  previousEpisode: () => void;
  jumpToEpisode: (episode: number) => void;
  isPlaying: boolean;
  togglePlay: () => void;
  stop: () => void;
  playSpeed: number;
  setPlaySpeed: (speed: number) => void;
  arcs: Array<{ name: string; startEp: number; endEp: number }>;
}

export const EpisodeControls: React.FC<EpisodeControlsProps> = ({
  currentEpisode,
  onEpisodeChange,
  nextEpisode,
  previousEpisode,
  jumpToEpisode,
  isPlaying,
  togglePlay,
  arcs,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-50 flex flex-col gap-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Current Arc/Episode Info - Floating Crystal Style */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="self-center bg-black/60 backdrop-blur-xl border border-white/10 px-6 py-2 rounded-full flex items-center gap-4 shadow-lg"
      >
        <span className="text-xs font-black text-cyan-400 tracking-widest uppercase">
          Current Log
        </span>
        <div className="h-4 w-px bg-white/20" />
        <span className="text-sm font-bold text-white">
          Episode {currentEpisode}
        </span>
      </motion.div>

      {/* Main Timeline Bar */}
      <div className="bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-2xl relative overflow-hidden group">
        {/* Progress Bar */}
        <div className="relative h-12 flex items-center gap-4">
          <button
            onClick={togglePlay}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-500 hover:bg-cyan-400 text-black transition-all shadow-[0_0_15px_rgba(6,182,212,0.5)]"
          >
            {isPlaying ? (
              <Pause size={18} fill="currentColor" />
            ) : (
              <Play size={18} fill="currentColor" className="ml-0.5" />
            )}
          </button>

          <div className="flex-1 relative h-2 bg-white/10 rounded-full cursor-pointer group/slider">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full"
              style={{ width: `${(currentEpisode / 1120) * 100}%` }}
            />
            <input
              type="range"
              min="1"
              max="1120"
              value={currentEpisode}
              onChange={e => onEpisodeChange(parseInt(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          <div className="flex gap-2 text-white/50">
            <button
              onClick={previousEpisode}
              className="hover:text-white transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextEpisode}
              className="hover:text-white transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Arc Markers (visible on hover) */}
        <motion.div
          className="flex gap-1 overflow-x-auto no-scrollbar mt-2 pt-2 border-t border-white/5"
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isHovered ? 'auto' : 0,
            opacity: isHovered ? 1 : 0,
          }}
        >
          {arcs.map(arc => (
            <button
              key={arc.name}
              onClick={() => jumpToEpisode(arc.startEp)}
              className={`flex-shrink-0 px-3 py-1 text-[10px] font-bold uppercase rounded-md border transition-all ${
                currentEpisode >= arc.startEp && currentEpisode <= arc.endEp
                  ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                  : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10'
              }`}
            >
              {arc.name}
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
