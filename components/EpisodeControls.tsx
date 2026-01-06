import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

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
  stop,
  playSpeed,
  setPlaySpeed,
  arcs,
}) => {
  const [showJumpInput, setShowJumpInput] = useState(false);
  const [jumpValue, setJumpValue] = useState('');
  const jumpInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          previousEpisode();
          break;
        case 'ArrowRight':
          e.preventDefault();
          nextEpisode();
          break;
        case ' ':
          e.preventDefault();
          togglePlay();
          break;
        case 'Escape':
          stop();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextEpisode, previousEpisode, togglePlay, stop]);

  const handleJump = () => {
    const episode = parseInt(jumpValue);
    if (!isNaN(episode) && episode >= 1 && episode <= 1116) {
      jumpToEpisode(episode);
      setJumpValue('');
      setShowJumpInput(false);
    }
  };

  const handleJumpKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleJump();
    } else if (e.key === 'Escape') {
      setShowJumpInput(false);
      setJumpValue('');
    }
  };

  useEffect(() => {
    if (showJumpInput && jumpInputRef.current) {
      jumpInputRef.current.focus();
    }
  }, [showJumpInput]);

  return (
    <div className="space-y-4">
      <div className="p-6 bg-white/5 rounded-3xl border border-white/10 shadow-inner">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Voyage Log
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-red-500 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
              Ep. {currentEpisode}
            </span>
            {showJumpInput ? (
              <div className="flex items-center gap-2">
                <input
                  ref={jumpInputRef}
                  type="number"
                  min="1"
                  max="1116"
                  value={jumpValue}
                  onChange={e => setJumpValue(e.target.value)}
                  onKeyDown={handleJumpKeyPress}
                  placeholder="Ep."
                  className="w-20 px-2 py-1 bg-black/50 border border-white/10 rounded-lg text-xs font-bold text-white focus:outline-none focus:border-red-500/50"
                />
                <button
                  onClick={handleJump}
                  className="px-2 py-1 bg-red-600 hover:bg-red-700 rounded-lg text-xs font-bold transition-colors"
                >
                  Go
                </button>
                <button
                  onClick={() => {
                    setShowJumpInput(false);
                    setJumpValue('');
                  }}
                  className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold transition-colors"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowJumpInput(true)}
                className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold transition-colors"
                title="Jump to episode (or press J)"
              >
                Jump
              </button>
            )}
          </div>
        </div>

        {/* Episode Slider */}
        <input
          type="range"
          min="1"
          max="1116"
          value={currentEpisode}
          onChange={e => onEpisodeChange(parseInt(e.target.value))}
          className="w-full accent-red-600 h-1.5 bg-white/5 rounded-full cursor-pointer appearance-none mb-4"
        />

        {/* Playback Controls */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={previousEpisode}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
              title="Previous episode (←)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={togglePlay}
              className="p-2 bg-red-600 hover:bg-red-700 rounded-xl transition-all"
              title="Play/Pause (Space)"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={nextEpisode}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
              title="Next episode (→)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {isPlaying && (
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 uppercase">Speed</span>
              <select
                value={playSpeed}
                onChange={e => setPlaySpeed(parseInt(e.target.value))}
                className="px-2 py-1 bg-black/50 border border-white/10 rounded-lg text-xs font-bold text-white focus:outline-none focus:border-red-500/50"
              >
                <option value={500}>2x</option>
                <option value={1000}>1x</option>
                <option value={2000}>0.5x</option>
                <option value={3000}>0.3x</option>
              </select>
            </div>
          )}
        </div>

        {/* Arc Navigation */}
        <div className="mt-4 pt-4 border-t border-white/5">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Quick Jump to Arc
          </p>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto custom-scrollbar">
            {arcs.map(arc => (
              <button
                key={arc.name}
                onClick={() => jumpToEpisode(arc.startEp)}
                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-[10px] font-bold transition-all"
              >
                {arc.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

