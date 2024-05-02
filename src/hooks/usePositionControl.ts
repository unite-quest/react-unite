import { Direction, Position } from '@/shared/utils/maze/playerDrawer';
import { useEffect, useState } from 'react';

const boundaries = {
  left: -40,
  right: 280,
  top: 80,
  bottom: 485,
};

export function usePositionControl(
  direction: Direction,
  tick: number,
  initialPosition: Position,
): {
  position: Position;
  stopped: boolean;
  lastKnownDirection: Direction;
} {
  const [position, setPosition] = useState<Position>(initialPosition);
  const [lastUpdateTick, setLastUpdateTick] = useState<number>(0);
  const [stopped, setStopped] = useState<boolean>(direction !== null);
  const [lastKnownDirection, setLastKnownDirection] = useState<Direction>(direction);

  useEffect(() => {
    const throttleTicks = 1; // Throttles the position update to every 10 ticks

    if (tick - lastUpdateTick < throttleTicks) {
      return;
    }
    setStopped(direction === null);
    if (direction !== null) {
      setLastKnownDirection(direction);
    }
    setLastUpdateTick(tick); // Update the last update tick state

    const moveStep = 10; // Defines how much the player moves per tick
    if (direction === 'RIGHT') {
      setPosition(pos => {
        if (pos.x > boundaries.right) {
          return { x: pos.x, y: pos.y };
        }
        return { x: pos.x + moveStep, y: pos.y };
      });
    } else if (direction === 'LEFT') {
      setPosition(pos => {
        if (pos.x < boundaries.left) {
          return { x: pos.x, y: pos.y };
        }
        return { x: pos.x - moveStep, y: pos.y };
      });
    } else if (direction === 'FORWARD') {
      setPosition(pos => {
        if (pos.y < boundaries.top) {
          return { x: pos.x, y: pos.y };
        }
        return { x: pos.x, y: pos.y - moveStep };
      });
    } else if (direction === 'BACKWARD') {
      setPosition(pos => {
        if (pos.y > boundaries.bottom) {
          return { x: pos.x, y: pos.y };
        }
        return { x: pos.x, y: pos.y + moveStep };
      });
    }
  }, [direction, lastUpdateTick, tick]); // Include dependencies that affect the effect

  useEffect(() => {
    console.log(direction, position);
  }, [direction, position]);

  return {
    position,
    stopped,
    lastKnownDirection,
  };
}
