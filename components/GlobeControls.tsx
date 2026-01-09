import React from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2 } from 'lucide-react';
import type { Island } from '../utils/islandData';

interface GlobeControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onFullscreen?: () => void;
  selectedIsland?: Island | null;
  onFlyToIsland?: (island: Island) => void;
}

export const GlobeControls: React.FC<GlobeControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onReset,
  onFullscreen,
}) => {
  return (
    <div className="absolute bottom-10 right-10 flex flex-col gap-3 z-10">
      <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-2xl p-2 shadow-2xl flex flex-col gap-2">
        <button
          onClick={onZoomIn}
          className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all group"
          title="Zoom In"
          aria-label="Zoom in on globe"
        >
          <ZoomIn className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
        </button>
        <button
          onClick={onZoomOut}
          className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all group"
          title="Zoom Out"
          aria-label="Zoom out on globe"
        >
          <ZoomOut className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
        </button>
        <button
          onClick={onReset}
          className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all group"
          title="Reset View"
          aria-label="Reset globe view"
        >
          <RotateCcw className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
        </button>
        {onFullscreen && (
          <button
            onClick={onFullscreen}
            className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all group"
            title="Fullscreen"
            aria-label="Toggle fullscreen"
          >
            <Maximize2 className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
          </button>
        )}
      </div>
    </div>
  );
};

