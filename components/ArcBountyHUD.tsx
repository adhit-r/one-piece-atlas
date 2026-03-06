import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Swords, TrendingUp } from 'lucide-react';
import type { Island, Bounty } from '../utils/islandData';

interface ArcBountyHUDProps {
  islands: Island[];
  bounties: Bounty[];
  currentEpisode: number;
}

function formatBounty(amount: number): string {
  if (amount >= 1_000_000_000) return `${(amount / 1_000_000_000).toFixed(1)}B`;
  if (amount >= 1_000_000) return `${Math.round(amount / 1_000_000)}M`;
  if (amount >= 1_000) return `${Math.round(amount / 1_000)}K`;
  return String(amount);
}

export const ArcBountyHUD: React.FC<ArcBountyHUDProps> = ({
  islands,
  bounties,
  currentEpisode,
}) => {
  const currentArc = useMemo(() => {
    const island = [...islands]
      .filter(i => i.episodes[0] <= currentEpisode)
      .sort((a, b) => b.episodes[0] - a.episodes[0])[0];
    if (!island) return null;
    const arcIslands = islands.filter(i => i.arc === island.arc);
    const arcStart = Math.min(...arcIslands.map(i => i.episodes[0]));
    const arcEnd = Math.max(...arcIslands.map(i => i.episodes[1]));
    const progress = Math.min(
      1,
      Math.max(0, (currentEpisode - arcStart) / (arcEnd - arcStart || 1))
    );
    return {
      name: island.arc,
      arcStart,
      arcEnd,
      progress,
      island: island.name,
    };
  }, [islands, currentEpisode]);

  const currentBounty = useMemo(() => {
    const past = bounties.filter(b => b.ep <= currentEpisode);
    return past.length > 0 ? past[past.length - 1] : { ep: 0, amount: 0 };
  }, [bounties, currentEpisode]);

  const nextBounty = useMemo(() => {
    return bounties.find(b => b.ep > currentEpisode) ?? null;
  }, [bounties, currentEpisode]);

  if (!currentArc) return null;

  return (
    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-40 pointer-events-auto">
      <div className="flex items-center gap-3 bg-stone-900/90 backdrop-blur-xl border border-amber-900/30 rounded-2xl shadow-2xl px-4 py-2">
        {/* Arc progress */}
        <div className="flex items-center gap-2">
          <Swords size={14} className="text-amber-500 shrink-0" />
          <div>
            <div className="text-[11px] text-amber-200 font-bold tracking-wide uppercase leading-none">
              {currentArc.name}
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-24 h-1.5 bg-stone-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-700 to-amber-400 rounded-full"
                  initial={false}
                  animate={{ width: `${currentArc.progress * 100}%` }}
                  transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                />
              </div>
              <span className="text-[10px] text-stone-500 font-mono">
                {Math.round(currentArc.progress * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-stone-700" />

        {/* Bounty */}
        <div className="flex items-center gap-2">
          <TrendingUp size={14} className="text-amber-500 shrink-0" />
          <div>
            <div className="text-[11px] text-stone-400 leading-none">
              Bounty
            </div>
            <div className="text-sm font-bold text-amber-100 font-mono leading-tight">
              ₿{formatBounty(currentBounty.amount)}
            </div>
          </div>
          {nextBounty && (
            <div className="text-[10px] text-stone-600 ml-1">
              → ₿{formatBounty(nextBounty.amount)} @ Ep {nextBounty.ep}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
