import { useState, useEffect, useCallback } from 'react';
import { getNextEpisode, getPreviousEpisode, jumpToArc, ARCS } from '../utils/episodeUtils';

interface UseEpisodeNavigationOptions {
  minEpisode?: number;
  maxEpisode?: number;
  autoPlaySpeed?: number; // milliseconds between episodes
  initialEpisode?: number;
  onEpisodeChange?: (episode: number) => void;
}

export const useEpisodeNavigation = ({
  minEpisode = 1,
  maxEpisode = 1116,
  autoPlaySpeed = 1000,
  initialEpisode = maxEpisode,
  onEpisodeChange,
}: UseEpisodeNavigationOptions = {}) => {
  const [internalEpisode, setInternalEpisode] = useState(initialEpisode);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playSpeed, setPlaySpeed] = useState(autoPlaySpeed);

  // Sync internal state with external when initialEpisode changes
  useEffect(() => {
    setInternalEpisode(initialEpisode);
  }, [initialEpisode]);

  const setCurrentEpisode = useCallback(
    (episode: number) => {
      const clamped = Math.max(minEpisode, Math.min(maxEpisode, episode));
      setInternalEpisode(clamped);
      onEpisodeChange?.(clamped);
    },
    [minEpisode, maxEpisode, onEpisodeChange]
  );

  const currentEpisode = initialEpisode !== undefined ? initialEpisode : internalEpisode;

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      const current = initialEpisode !== undefined ? initialEpisode : internalEpisode;
      const next = getNextEpisode(current, maxEpisode);
      if (next === current) {
        setIsPlaying(false);
        return;
      }
      setInternalEpisode(next);
      onEpisodeChange?.(next);
    }, playSpeed);

    return () => clearInterval(interval);
  }, [isPlaying, playSpeed, maxEpisode, onEpisodeChange, initialEpisode, internalEpisode]);

  const nextEpisode = useCallback(() => {
    const current = initialEpisode !== undefined ? initialEpisode : internalEpisode;
    const next = getNextEpisode(current, maxEpisode);
    setInternalEpisode(next);
    onEpisodeChange?.(next);
  }, [maxEpisode, onEpisodeChange, initialEpisode, internalEpisode]);

  const previousEpisode = useCallback(() => {
    const current = initialEpisode !== undefined ? initialEpisode : internalEpisode;
    const prevEp = getPreviousEpisode(current, minEpisode);
    setInternalEpisode(prevEp);
    onEpisodeChange?.(prevEp);
  }, [minEpisode, onEpisodeChange, initialEpisode, internalEpisode]);

  const jumpToEpisode = useCallback(
    (episode: number) => {
      setCurrentEpisode(episode);
    },
    [setCurrentEpisode]
  );

  const jumpToArcName = useCallback(
    (arcName: string) => {
      const episode = jumpToArc(arcName);
      jumpToEpisode(episode);
    },
    [jumpToEpisode]
  );

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const stop = useCallback(() => {
    setIsPlaying(false);
  }, []);

  return {
    currentEpisode,
    setCurrentEpisode: jumpToEpisode,
    nextEpisode,
    previousEpisode,
    jumpToEpisode,
    jumpToArcName,
    isPlaying,
    togglePlay,
    stop,
    playSpeed,
    setPlaySpeed,
    arcs: ARCS,
  };
};

