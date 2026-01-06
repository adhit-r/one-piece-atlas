import { useRef, useCallback } from 'react';
import { getGlobeRotation } from '../utils/globeUtils';
import type { Island } from '../utils/islandData';

interface UseIslandInteractionsOptions {
  globeRef: React.RefObject<any>;
  onIslandSelect?: (island: Island) => void;
  onIslandHover?: (island: Island | null) => void;
}

export const useIslandInteractions = ({
  globeRef,
  onIslandSelect,
  onIslandHover,
}: UseIslandInteractionsOptions) => {
  const hoveredIslandRef = useRef<Island | null>(null);
  const raycasterRef = useRef<any>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const flyToIsland = useCallback(
    (island: Island) => {
      if (!globeRef.current) return;
      const rotation = getGlobeRotation(island.lat, island.lon);
      globeRef.current.rotation.y = rotation.y;
      globeRef.current.rotation.x = rotation.x;
    },
    [globeRef]
  );

  const selectIsland = useCallback(
    (island: Island) => {
      flyToIsland(island);
      onIslandSelect?.(island);
    },
    [flyToIsland, onIslandSelect]
  );

  const setupRaycaster = useCallback(
    (THREE: any, camera: any, scene: any, markers: Record<string, any>) => {
      if (!raycasterRef.current) {
        raycasterRef.current = new THREE.Raycaster();
      }

      const handleClick = (event: MouseEvent) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycasterRef.current.setFromCamera(mouseRef.current, camera);

        const intersects = raycasterRef.current.intersectObjects(
          Object.values(markers),
          true
        );

        if (intersects.length > 0) {
          const clickedObject = intersects[0].object;
          // Find which island this marker belongs to
          const islandId = Object.keys(markers).find(
            id => markers[id] === clickedObject.parent || markers[id] === clickedObject
          );
          if (islandId) {
            // This would need island data passed in
            // For now, we'll handle this in the component
          }
        }
      };

      return handleClick;
    },
    []
  );

  const handleHover = useCallback(
    (island: Island | null) => {
      if (hoveredIslandRef.current?.id !== island?.id) {
        hoveredIslandRef.current = island;
        onIslandHover?.(island);
      }
    },
    [onIslandHover]
  );

  return {
    flyToIsland,
    selectIsland,
    setupRaycaster,
    handleHover,
  };
};

// Container ref will be passed from component
let containerRef: React.RefObject<HTMLDivElement> | null = null;

export const setContainerRef = (ref: React.RefObject<HTMLDivElement>) => {
  containerRef = ref;
};

