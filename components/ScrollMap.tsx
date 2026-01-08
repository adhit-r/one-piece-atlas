import React, { useState, useRef, useEffect } from 'react';
import type { Island } from '../utils/islandData';
import { ONE_PIECE_DATA } from '../data/onePieceData';

interface ScrollMapProps {
  islands: Island[];
  selectedVoyage: string;
  onIslandClick: (island: Island) => void;
  selectedIslandId: string | null;
}

// Convert lat/lon to map coordinates (simple equirectangular projection)
const toMapCoords = (
  lat: number,
  lon: number,
  mapWidth: number,
  mapHeight: number
) => {
  const x = ((lon + 180) / 360) * mapWidth;
  const y = ((90 - lat) / 180) * mapHeight;
  return { x, y };
};

export const ScrollMap: React.FC<ScrollMapProps> = ({
  islands,
  selectedVoyage,
  onIslandClick,
  selectedIslandId,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredIsland, setHoveredIsland] = useState<Island | null>(null);

  const mapWidth = 2400;
  const mapHeight = 1200;

  // Get voyage path
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const voyageIds: string[] =
    (ONE_PIECE_DATA as any).paths[selectedVoyage] || [];
  const voyagePoints = voyageIds
    .map(id => islands.find(i => i.id === id))
    .filter((i): i is Island => !!i)
    .map(i => toMapCoords(i.lat, i.lon, mapWidth, mapHeight));

  // Pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Zoom handler
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale(prev => Math.max(0.5, Math.min(3, prev + delta)));
  };

  // Ship animation state
  const [shipProgress, setShipProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setShipProgress(p => (p + 0.002) % 1);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  // Get ship position along path
  const getShipPosition = () => {
    if (voyagePoints.length < 2) return { x: 0, y: 0 };
    const totalSegments = voyagePoints.length - 1;
    const segmentProgress = shipProgress * totalSegments;
    const segmentIndex = Math.floor(segmentProgress);
    const t = segmentProgress - segmentIndex;
    const p1 = voyagePoints[Math.min(segmentIndex, voyagePoints.length - 1)];
    const p2 =
      voyagePoints[Math.min(segmentIndex + 1, voyagePoints.length - 1)];
    return {
      x: p1.x + (p2.x - p1.x) * t,
      y: p1.y + (p2.y - p1.y) * t,
    };
  };

  const shipPos = getShipPosition();

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing relative"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      style={{ background: '#1a1510' }}
    >
      {/* Map Container */}
      <div
        className="absolute origin-center transition-transform duration-100"
        style={{
          width: mapWidth,
          height: mapHeight,
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          left: '50%',
          top: '50%',
          marginLeft: -mapWidth / 2,
          marginTop: -mapHeight / 2,
        }}
      >
        {/* Parchment Background */}
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            background: `
              radial-gradient(ellipse at center, #d4c4a8 0%, #c4b494 50%, #a89878 100%)
            `,
            boxShadow: 'inset 0 0 100px rgba(0,0,0,0.3)',
            filter: 'url(#paper-texture)',
          }}
        />

        {/* Grid Lines (Nautical) */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
          <defs>
            <pattern
              id="grid"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 100 0 L 0 0 0 100"
                fill="none"
                stroke="#5c4a32"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Compass Rose */}
        <div className="absolute top-8 right-8 w-32 h-32 opacity-60">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#5c4a32"
              strokeWidth="2"
            />
            <polygon points="50,5 55,45 50,50 45,45" fill="#8b0000" />
            <polygon points="50,95 55,55 50,50 45,55" fill="#333" />
            <polygon points="5,50 45,45 50,50 45,55" fill="#333" />
            <polygon points="95,50 55,45 50,50 55,55" fill="#333" />
            <text
              x="50"
              y="18"
              textAnchor="middle"
              fontSize="8"
              fill="#5c4a32"
              fontWeight="bold"
            >
              N
            </text>
            <text x="50" y="92" textAnchor="middle" fontSize="8" fill="#5c4a32">
              S
            </text>
            <text x="8" y="53" textAnchor="middle" fontSize="8" fill="#5c4a32">
              W
            </text>
            <text x="92" y="53" textAnchor="middle" fontSize="8" fill="#5c4a32">
              E
            </text>
          </svg>
        </div>

        {/* Voyage Path */}
        {voyagePoints.length > 1 && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d={`M ${voyagePoints.map(p => `${p.x},${p.y}`).join(' L ')}`}
              fill="none"
              stroke="#8b0000"
              strokeWidth="3"
              strokeDasharray="15 8"
              strokeLinecap="round"
              filter="url(#glow)"
              style={{
                animation: 'dashMove 30s linear infinite',
              }}
            />
          </svg>
        )}

        {/* Island Markers */}
        {islands.map(island => {
          const pos = toMapCoords(island.lat, island.lon, mapWidth, mapHeight);
          const isSelected = island.id === selectedIslandId;
          const isHovered = hoveredIsland?.id === island.id;

          return (
            <div
              key={island.id}
              className="absolute cursor-pointer transition-transform duration-200"
              style={{
                left: pos.x,
                top: pos.y,
                transform: `translate(-50%, -50%) ${isSelected || isHovered ? 'scale(1.3)' : 'scale(1)'}`,
                zIndex: isSelected ? 100 : isHovered ? 50 : 10,
              }}
              onClick={e => {
                e.stopPropagation();
                onIslandClick(island);
              }}
              onMouseEnter={() => setHoveredIsland(island)}
              onMouseLeave={() => setHoveredIsland(null)}
            >
              {/* Island Pin */}
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  island.hasPoneglyph
                    ? 'bg-amber-600 border-amber-400 shadow-lg shadow-amber-500/50'
                    : isSelected
                      ? 'bg-red-700 border-red-400 shadow-lg shadow-red-500/50'
                      : 'bg-stone-700 border-stone-500'
                }`}
              >
                <div className="w-2 h-2 bg-white/60 rounded-full" />
              </div>

              {/* Island Label */}
              {(isHovered || isSelected) && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 -top-10 bg-stone-900/95 text-amber-100 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap border border-amber-900/50 shadow-xl"
                  style={{ fontFamily: "'Times New Roman', serif" }}
                >
                  {island.name}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-stone-900/95" />
                </div>
              )}
            </div>
          );
        })}

        {/* Animated Ship */}
        {voyagePoints.length > 1 && (
          <div
            className="absolute pointer-events-none z-50 transition-all duration-75"
            style={{
              left: shipPos.x,
              top: shipPos.y,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              className="text-3xl drop-shadow-lg"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}
            >
              ⛵
            </div>
          </div>
        )}

        {/* Decorative Sea Monster */}
        <div className="absolute bottom-20 left-20 text-6xl opacity-30 pointer-events-none">
          🐙
        </div>
        <div className="absolute top-40 left-1/4 text-4xl opacity-20 pointer-events-none rotate-12">
          🦑
        </div>

        {/* "Here Be Dragons" Text */}
        <div
          className="absolute bottom-10 right-10 text-stone-600/40 italic pointer-events-none"
          style={{ fontFamily: "'Times New Roman', serif", fontSize: '14px' }}
        >
          Here there be Sea Kings...
        </div>
      </div>

      {/* CSS Keyframes */}
      <style>{`
        @keyframes dashMove {
          to { stroke-dashoffset: -1000; }
        }
      `}</style>
    </div>
  );
};
