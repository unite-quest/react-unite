import { MazeObjective, PlayerInitialParameters } from '@/shared/utils/maze/mazeLevelMetadata';
import { Direction, drawPlayer } from '@/shared/utils/maze/playerDrawer';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLoadSprites } from 'src/hooks/useLoadSprites';
import { usePositionControl } from 'src/hooks/usePositionControl';

type Props = {
  questionId: number;
  height: number;
  width: number;
  playerInit: PlayerInitialParameters;
  direction: Direction;
  onLoaded: () => void;
  objective: MazeObjective;
};
const TICK_INTERVAL = 75;

export const MazeCanvas: React.FC<Props> = ({
  questionId,
  width,
  height,
  playerInit,
  direction,
  onLoaded,
  objective,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tick, setTick] = useState(0);

  const { character, tilesetLoaded, staticTilesets } = useLoadSprites(questionId, {
    height,
    width,
  });
  const {
    position: playerPosition,
    stopped,
    lastKnownDirection,
  } = usePositionControl(direction, tick, staticTilesets, playerInit, objective);

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

    drawPlayer(ctx, character.body.current, lastKnownDirection, playerPosition, stopped, tick);
    drawPlayer(ctx, character.clothes.current, lastKnownDirection, playerPosition, stopped, tick);
    drawPlayer(ctx, character.hair.current, lastKnownDirection, playerPosition, stopped, tick);
    ctx.restore();
  }, [
    character.body,
    character.clothes,
    character.hair,
    lastKnownDirection,
    playerPosition,
    staticTilesets,
    stopped,
    tick,
  ]);

  return (
    <canvas ref={canvasRef} width={width} height={height} style={{ imageRendering: 'pixelated' }} />
  );
};
