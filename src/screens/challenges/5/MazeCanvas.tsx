import { Direction, Position, drawPlayer } from '@/shared/utils/maze/playerDrawer';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLoadSprites } from 'src/hooks/useLoadSprites';
import { usePositionControl } from 'src/hooks/usePositionControl';

type Props = {
  height: number;
  width: number;
  playerInitialPosition: Position;
  direction: Direction;
  onLoaded: () => void;
};
const TICK_INTERVAL = 75;

export const MazeCanvas: React.FC<Props> = ({
  width,
  height,
  playerInitialPosition,
  direction,
  onLoaded,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tick, setTick] = useState(0);

  const { character, tilesetLoaded, staticTilesets } = useLoadSprites({ height, width });
  const {
    position: playerPosition,
    stopped,
    lastKnownDirection,
  } = usePositionControl(direction, tick, staticTilesets, playerInitialPosition);

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
