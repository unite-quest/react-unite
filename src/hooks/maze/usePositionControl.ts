import { ScalingData } from '@/shared/utils/maze/TilesetExtractor';
import { TilesetStaticTransposer } from '@/shared/utils/maze/TilesetStaticTransposer';
import {
  DynamicCollisionBoundary,
  PlayerInitialParameters,
} from '@/shared/utils/maze/mazeLevelMetadata';
import { Direction, Position } from '@/shared/utils/maze/playerDrawer';
import { useEffect, useState } from 'react';

function translatePositionToCanvas(scaling: ScalingData, originalPosition: Position): Position {
  const scale = scaling.canvas.width / scaling.tile.columnLength / scaling.tile.tileSize;

  return {
    x: originalPosition.x * scale * 16,
    y: originalPosition.y * scale * 16,
  };
}

export function usePositionControl(
  scalingData: ScalingData,
  direction: Direction,
  tick: number,
  tilesets: TilesetStaticTransposer[],
  playerInit: PlayerInitialParameters,
  dynamicCollisionBoundary: DynamicCollisionBoundary[],
): {
  position: Position;
  stopped: boolean;
  lastKnownDirection: Direction;
} {
  const [position, setPosition] = useState<Position>(
    translatePositionToCanvas(scalingData, playerInit.position),
  );
  const [lastUpdateTick, setLastUpdateTick] = useState<number>(0);
  const [stopped, setStopped] = useState<boolean>(direction !== null);
  const [lastKnownDirection, setLastKnownDirection] = useState<Direction>(playerInit.direction);
  const [collision, setCollision] = useState<DynamicCollisionBoundary | null>(null);

  useEffect(() => {
    const rowIncrement = direction === 'LEFT' ? -24 : direction === 'RIGHT' ? 24 : 0;
    const colIncrement = direction === 'FORWARD' ? -24 : direction === 'BACKWARD' ? 24 : 0;
    const newY = position.y + colIncrement + 40;
    const newX = position.x + rowIncrement + 40;

    // currently you can only colide with one object at a time
    const collidingWith = dynamicCollisionBoundary.find(boundary => {
      const lowerBoundary = boundary.boundingBox[0];
      const upperBoundary = boundary.boundingBox[1];
      if (
        newX >= lowerBoundary.x &&
        newX <= upperBoundary.x &&
        newY >= lowerBoundary.y &&
        newY <= upperBoundary.y
      ) {
        return true;
      }
      return false;
    });

    setCollision(collidingWith || null);
  }, [direction, dynamicCollisionBoundary, position.x, position.y]);

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
    if (collision) {
      collision.onTouch();
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
  }, [collision, direction, lastUpdateTick, tick, tilesets]); // Include dependencies that affect the effect

  useEffect(() => {
    console.log(direction, position);
  }, [direction, position]);

  return {
    position,
    stopped,
    lastKnownDirection,
  };
}
