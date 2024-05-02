import { TilesetStaticTransposer } from '@/shared/utils/TilesetStaticTransposer';
import { MazeObjective } from '@/shared/utils/maze/mazeLevelMetadata';
import { Direction, Position } from '@/shared/utils/maze/playerDrawer';
import { useEffect, useMemo, useState } from 'react';

export function usePositionControl(
  direction: Direction,
  tick: number,
  tilesets: TilesetStaticTransposer[],
  initialPosition: Position,
  objective: MazeObjective,
): {
  position: Position;
  stopped: boolean;
  lastKnownDirection: Direction;
} {
  const [position, setPosition] = useState<Position>(initialPosition);
  const [lastUpdateTick, setLastUpdateTick] = useState<number>(0);
  const [stopped, setStopped] = useState<boolean>(direction !== null);
  const [lastKnownDirection, setLastKnownDirection] = useState<Direction>(direction);

  const isCollidingWithObjective = useMemo(() => {
    const rowIncrement = direction === 'LEFT' ? -10 : direction === 'RIGHT' ? 10 : 0;
    const colIncrement = direction === 'FORWARD' ? -10 : direction === 'BACKWARD' ? 10 : 0;
    const newY = position.y + colIncrement;
    const newX = position.x + rowIncrement;
    const lowerBoundary = objective.boundingBox[0];
    const upperBoundary = objective.boundingBox[1];
    if (
      newX >= lowerBoundary.x &&
      newX <= upperBoundary.x &&
      newY >= lowerBoundary.y &&
      newY <= upperBoundary.y
    ) {
      // { x: 280, y: 70 },
      // { x: 280, y: 120 },
      return true;
    }
    return false;
  }, [direction, objective.boundingBox, position.x, position.y]);

  useEffect(() => {
    const throttleTicks = 1; // Throttles the position update

    if (tick - lastUpdateTick < throttleTicks) {
      return;
    }
    setStopped(direction === null);
    if (direction !== null) {
      setLastKnownDirection(direction);
    }
    setLastUpdateTick(tick); // Update the last update tick state

    const moveStep = 10; // Defines how much the player moves per tick

    // objective collision
    if (isCollidingWithObjective) {
      objective.onReachBox();
      return;
    }

    // tileset collision
    if (direction === 'RIGHT') {
      setPosition(pos => {
        const isColliding = tilesets.some(tileset => tileset.isColliding(pos, direction));
        if (isColliding) {
          return { x: pos.x, y: pos.y };
        }
        return { x: pos.x + moveStep, y: pos.y };
      });
    } else if (direction === 'LEFT') {
      setPosition(pos => {
        const isColliding = tilesets.some(tileset => tileset.isColliding(pos, direction));
        if (isColliding) {
          return { x: pos.x, y: pos.y };
        }
        return { x: pos.x - moveStep, y: pos.y };
      });
    } else if (direction === 'FORWARD') {
      setPosition(pos => {
        const isColliding = tilesets.some(tileset => tileset.isColliding(pos, direction));
        if (isColliding) {
          return { x: pos.x, y: pos.y };
        }
        return { x: pos.x, y: pos.y - moveStep };
      });
    } else if (direction === 'BACKWARD') {
      setPosition(pos => {
        const isColliding = tilesets.some(tileset => tileset.isColliding(pos, direction));
        if (isColliding) {
          return { x: pos.x, y: pos.y };
        }
        return { x: pos.x, y: pos.y + moveStep };
      });
    }
  }, [direction, isCollidingWithObjective, lastUpdateTick, tick, tilesets]); // Include dependencies that affect the effect

  useEffect(() => {
    console.log(direction, position);
  }, [direction, position]);

  return {
    position,
    stopped,
    lastKnownDirection,
  };
}
