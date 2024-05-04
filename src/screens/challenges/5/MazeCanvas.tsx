import {
  DynamicCollisionBoundary,
  PlayerInitialParameters,
} from '@/shared/utils/maze/mazeLevelMetadata';
import { Direction, drawPlayer } from '@/shared/utils/maze/playerDrawer';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLoadSprites } from 'src/hooks/maze/useLoadSprites';
import { usePositionControl } from 'src/hooks/maze/usePositionControl';
import { useSpawnEnemies } from 'src/hooks/maze/useSpawnEnemies';

type Props = {
  questionId: number;
  height: number;
  width: number;
  playerInit: PlayerInitialParameters;
  direction: Direction;
  onLoaded: () => void;
  objectiveCollisionBoundary: DynamicCollisionBoundary;
  onCollideWithEnemy: (entityId: string) => void;
};
const TICK_INTERVAL = 75;

export const MazeCanvas: React.FC<Props> = ({
  questionId,
  width,
  height,
  playerInit,
  direction,
  onLoaded,
  objectiveCollisionBoundary,
  onCollideWithEnemy,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tick, setTick] = useState(0);
  const canvasMetadata = {
    height,
    width,
  };
  const { character, tilesetLoaded, staticTilesets, tileMetadata } = useLoadSprites(
    questionId,
    canvasMetadata,
  );
  const scaling = {
    canvas: canvasMetadata,
    tile: tileMetadata,
  };
  const { enemyCollisionBoundaries, enemies } = useSpawnEnemies(
    questionId,
    scaling,
    tick,
    onCollideWithEnemy,
  );

  const {
    position: playerPosition,
    stopped,
    lastKnownDirection,
  } = usePositionControl(scaling, direction, tick, staticTilesets, playerInit, [
    objectiveCollisionBoundary,
    ...enemyCollisionBoundaries,
  ]);

  // gameplay loop
  useLayoutEffect(() => {
    if (!tilesetLoaded) {
      return;
    }
    onLoaded();

    const intervalId = setInterval(() => {
      setTick(t => t + 1);
    }, TICK_INTERVAL);

    return () => clearInterval(intervalId); // Clear
  }, [onLoaded, tilesetLoaded]);

  // output graphics
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!ctx || !canvas || staticTilesets.length === 0) {
      return;
    }
    ctx.save();
    ctx.imageSmoothingEnabled = false;
    for (const tileset of staticTilesets) {
      tileset.transpose(ctx);
    }

    for (const enemy of enemies) {
      enemy.render(ctx);
    }

    drawPlayer(ctx, character.body.current, lastKnownDirection, playerPosition, stopped, tick);
    drawPlayer(ctx, character.clothes.current, lastKnownDirection, playerPosition, stopped, tick);
    drawPlayer(ctx, character.hair.current, lastKnownDirection, playerPosition, stopped, tick);
    ctx.restore();
  }, [
    character.body,
    character.clothes,
    character.hair,
    enemies,
    lastKnownDirection,
    playerPosition,
    staticTilesets,
    stopped,
    tick,
  ]);

  useEffect(() => {
    console.log(`Initialized Canvas with h=${height}; w=${width}`);
  }, [height, width]);

  return (
    <canvas ref={canvasRef} width={width} height={height} style={{ imageRendering: 'pixelated' }} />
  );
};
