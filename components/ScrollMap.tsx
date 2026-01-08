import React, { useState, useRef, useEffect } from 'react';
import type { Island } from '../utils/islandData';
import { ONE_PIECE_DATA } from '../data/onePieceData';

interface ScrollMapProps {
  islands: Island[];
  selectedVoyage: string;
  onIslandClick: (island: Island) => void;
  selectedIslandId: string | null;
}

// Character emoji/icon mapping
const CHARACTER_ICONS: Record<string, string> = {
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
  Rayleigh: '⚡',
};

// Fun facts for islands
const ISLAND_FACTS: Record<string, string> = {
  foosha: 'Where Luffy ate the Gomu Gomu no Mi and began his dream!',
  shells: 'Zoro was tied up here for 9 days without food!',
  baratie: 'A floating restaurant ship in the middle of the sea!',
  loguetown: 'The town where the Pirate King was both born and executed.',
  drum: 'Where Chopper joined! Home of the Sakura Kingdom.',
  arabasta: 'Ancient kingdom with a 4000-year history!',
  skypiea: 'A legendary sky island 10,000 meters above the sea!',
  enies: 'The Judicial Island! It never gets dark here.',
  thriller: 'A ghost ship 3x the size of a giant!',
  sabaody: 'Where bubbles grow on trees and coat ships!',
  fishman: 'An underwater paradise 10,000m below the surface!',
  punk: "Dr. Vegapunk's laboratory with 500 years of future tech!",
  dressrosa: 'A living toy island with dancing flowers!',
  wano: 'The land of samurai, isolated for 800 years!',
};

// Convert lat/lon to map coordinates
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

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale(prev => Math.max(0.5, Math.min(3, prev + delta)));
  };

  // Ship animation
  const [shipProgress, setShipProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setShipProgress(p => (p + 0.002) % 1);
    }, 16);
    return () => clearInterval(interval);
  }, []);

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

  // Wave animation time
  const [wavePhase, setWavePhase] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setWavePhase(p => (p + 0.05) % (Math.PI * 2));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing relative"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      style={{
        background: 'linear-gradient(180deg, #1a1510 0%, #0f1a2a 100%)',
      }}
    >
      {/* Animated Wave Background */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1e3a5f" />
          </linearGradient>
        </defs>
        {[0, 1, 2].map(i => (
          <path
            key={i}
            d={`M0 ${400 + i * 100 + Math.sin(wavePhase + i) * 20} Q ${window.innerWidth / 4} ${350 + i * 100 + Math.sin(wavePhase + i + 1) * 30} ${window.innerWidth / 2} ${400 + i * 100 + Math.sin(wavePhase + i + 2) * 25} T ${window.innerWidth} ${400 + i * 100 + Math.sin(wavePhase + i) * 20} V ${window.innerHeight} H 0 Z`}
            fill="url(#waveGrad)"
            opacity={0.3 - i * 0.08}
          />
        ))}
      </svg>

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
        {/* Parchment Background with Texture */}
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            background: `
              url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E"),
              radial-gradient(ellipse at center, #e8dcc8 0%, #d4c4a8 40%, #b8a888 80%, #8b7355 100%)
            `,
            boxShadow:
              'inset 0 0 150px rgba(0,0,0,0.4), 0 0 50px rgba(0,0,0,0.5)',
          }}
        />

        {/* Torn Edges Effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
            linear-gradient(90deg, rgba(139,115,85,0.5) 0%, transparent 2%),
            linear-gradient(270deg, rgba(139,115,85,0.5) 0%, transparent 2%),
            linear-gradient(180deg, rgba(139,115,85,0.5) 0%, transparent 2%),
            linear-gradient(0deg, rgba(139,115,85,0.5) 0%, transparent 2%)
          `,
          }}
        />

        {/* Grid Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none">
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

        {/* Grand Line Label */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none"
          style={{ fontFamily: "'Times New Roman', serif" }}
        >
          <div className="text-4xl font-bold text-amber-900/30 tracking-[0.3em] uppercase">
            Grand Line
          </div>
          <div className="text-sm text-amber-800/20 mt-2 italic">
            The Most Dangerous Sea Route
          </div>
        </div>

        {/* Compass Rose */}
        <div className="absolute top-12 right-12 w-40 h-40 opacity-70">
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="#5c4a32"
              strokeWidth="1"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#5c4a32"
              strokeWidth="0.5"
            />
            {/* Cardinal Points */}
            <polygon points="50,2 55,40 50,50 45,40" fill="#8b0000" />
            <polygon points="50,98 55,60 50,50 45,60" fill="#3a3a3a" />
            <polygon points="2,50 40,45 50,50 40,55" fill="#3a3a3a" />
            <polygon points="98,50 60,45 50,50 60,55" fill="#3a3a3a" />
            {/* Intercardinal */}
            <polygon
              points="15,15 42,42 50,50 42,48"
              fill="#5c4a32"
              opacity="0.6"
            />
            <polygon
              points="85,15 58,42 50,50 58,48"
              fill="#5c4a32"
              opacity="0.6"
            />
            <polygon
              points="15,85 42,58 50,50 48,58"
              fill="#5c4a32"
              opacity="0.6"
            />
            <polygon
              points="85,85 58,58 50,50 58,52"
              fill="#5c4a32"
              opacity="0.6"
            />
            {/* Labels */}
            <text
              x="50"
              y="16"
              textAnchor="middle"
              fontSize="10"
              fill="#5c4a32"
              fontWeight="bold"
              fontFamily="serif"
            >
              N
            </text>
            <text
              x="50"
              y="95"
              textAnchor="middle"
              fontSize="10"
              fill="#5c4a32"
              fontFamily="serif"
            >
              S
            </text>
            <text
              x="10"
              y="53"
              textAnchor="middle"
              fontSize="10"
              fill="#5c4a32"
              fontFamily="serif"
            >
              W
            </text>
            <text
              x="90"
              y="53"
              textAnchor="middle"
              fontSize="10"
              fill="#5c4a32"
              fontFamily="serif"
            >
              E
            </text>
            <circle cx="50" cy="50" r="5" fill="#5c4a32" />
          </svg>
        </div>

        {/* Voyage Path */}
        {voyagePoints.length > 1 && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <filter id="pathGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d={`M ${voyagePoints.map(p => `${p.x},${p.y}`).join(' L ')}`}
              fill="none"
              stroke="#8b0000"
              strokeWidth="4"
              strokeDasharray="20 10"
              strokeLinecap="round"
              filter="url(#pathGlow)"
              style={{ animation: 'dashMove 20s linear infinite' }}
            />
          </svg>
        )}

        {/* Island Markers */}
        {islands.map(island => {
          const pos = toMapCoords(island.lat, island.lon, mapWidth, mapHeight);
          const isSelected = island.id === selectedIslandId;
          const isHovered = hoveredIsland?.id === island.id;
          const fact = ISLAND_FACTS[island.id];
          const mainChar = island.characters?.[0];
          const charIcon = mainChar ? CHARACTER_ICONS[mainChar] : null;

          return (
            <div
              key={island.id}
              className="absolute cursor-pointer transition-all duration-300"
              style={{
                left: pos.x,
                top: pos.y,
                transform: `translate(-50%, -50%) ${isSelected || isHovered ? 'scale(1.4)' : 'scale(1)'}`,
                zIndex: isSelected ? 100 : isHovered ? 50 : 10,
              }}
              onClick={e => {
                e.stopPropagation();
                onIslandClick(island);
              }}
              onMouseEnter={() => setHoveredIsland(island)}
              onMouseLeave={() => setHoveredIsland(null)}
            >
              {/* Character Icon floating above */}
              {charIcon && (
                <div
                  className="absolute -top-8 left-1/2 -translate-x-1/2 text-2xl"
                  style={{
                    animation: 'float 2s ease-in-out infinite',
                  }}
                >
                  {charIcon}
                </div>
              )}

              {/* Island Pin */}
              <div className="relative">
                <div
                  className={`w-8 h-8 rounded-full border-3 flex items-center justify-center transition-all shadow-lg ${
                    island.hasPoneglyph
                      ? 'bg-gradient-to-br from-amber-500 to-amber-700 border-amber-300 shadow-amber-500/50'
                      : isSelected
                        ? 'bg-gradient-to-br from-red-500 to-red-700 border-red-300 shadow-red-500/50'
                        : 'bg-gradient-to-br from-stone-600 to-stone-800 border-stone-400'
                  }`}
                  style={{ borderWidth: '3px' }}
                >
                  <div className="w-2 h-2 bg-white/70 rounded-full" />
                </div>
                {/* Pulse ring for important islands */}
                {(island.hasPoneglyph || island.importance === 'Legendary') && (
                  <div className="absolute inset-0 rounded-full border-2 border-amber-400 animate-ping opacity-30" />
                )}
              </div>

              {/* Tooltip */}
              {(isHovered || isSelected) && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 -top-14 bg-stone-900/95 text-amber-100 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap border border-amber-800/50 shadow-2xl backdrop-blur-sm"
                  style={{
                    fontFamily: "'Times New Roman', serif",
                    minWidth: '150px',
                  }}
                >
                  <div className="flex items-center gap-2 justify-center">
                    {charIcon && <span>{charIcon}</span>}
                    <span>{island.name}</span>
                  </div>
                  {fact && (
                    <div className="text-[10px] text-amber-300/70 mt-1 text-center font-normal italic">
                      {fact.slice(0, 50)}...
                    </div>
                  )}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-stone-900/95"
                    style={{
                      borderLeftWidth: 6,
                      borderRightWidth: 6,
                      borderTopWidth: 6,
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}

        {/* Animated Ship */}
        {voyagePoints.length > 1 && (
          <div
            className="absolute pointer-events-none z-50"
            style={{
              left: shipPos.x,
              top: shipPos.y,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              className="text-4xl drop-shadow-xl"
              style={{
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))',
                animation: 'bob 1s ease-in-out infinite',
              }}
            >
              🚢
            </div>
          </div>
        )}

        {/* Decorative Sea Creatures */}
        <div
          className="absolute bottom-32 left-32 text-7xl opacity-25 pointer-events-none"
          style={{ animation: 'float 4s ease-in-out infinite' }}
        >
          🐙
        </div>
        <div
          className="absolute top-48 left-1/4 text-5xl opacity-20 pointer-events-none rotate-12"
          style={{ animation: 'float 3s ease-in-out infinite 1s' }}
        >
          🦑
        </div>
        <div
          className="absolute bottom-48 right-1/4 text-6xl opacity-15 pointer-events-none"
          style={{ animation: 'float 5s ease-in-out infinite 0.5s' }}
        >
          🐋
        </div>
        <div
          className="absolute top-1/3 right-32 text-4xl opacity-20 pointer-events-none"
          style={{ animation: 'float 3.5s ease-in-out infinite 2s' }}
        >
          🦈
        </div>

        {/* Legendary Text Decorations */}
        <div
          className="absolute bottom-16 right-16 text-amber-900/30 italic pointer-events-none"
          style={{ fontFamily: "'Times New Roman', serif", fontSize: '18px' }}
        >
          &ldquo;Here there be Sea Kings...&rdquo;
        </div>
        <div
          className="absolute top-16 left-16 text-amber-900/20 pointer-events-none"
          style={{
            fontFamily: "'Times New Roman', serif",
            fontSize: '14px',
            transform: 'rotate(-5deg)',
          }}
        >
          ☠️ Danger: Calm Belt ☠️
        </div>

        {/* Jolly Roger Watermark */}
        <div className="absolute bottom-1/4 left-1/3 text-9xl opacity-5 pointer-events-none">
          ☠️
        </div>
      </div>

      {/* CSS Keyframes */}
      <style>{`
        @keyframes dashMove {
          to { stroke-dashoffset: -1000; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes bob {
          0%, 100% { transform: translate(-50%, -50%) rotate(-3deg); }
          50% { transform: translate(-50%, -50%) rotate(3deg) translateY(-5px); }
        }
      `}</style>
    </div>
  );
};
