import { TilesetStaticTransposer } from '@/shared/utils/TilesetStaticTransposer';
import { FloorTileset } from '@/shared/utils/maze/FloorTileset';
import { WallTileset } from '@/shared/utils/maze/WallTileset';
import { Direction, drawPlayer } from '@/shared/utils/maze/playerDrawer';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLoadSprites } from 'src/hooks/useLoadSprites';
import { usePositionControl } from 'src/hooks/usePositionControl';

type Props = {
  height: number;
  width: number;
  direction: Direction;
};
const TICK_INTERVAL = 75;

export const MazeCanvas: React.FC<Props> = ({ width, height, direction }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tick, setTick] = useState(0);
  const [tilesets, setTilesets] = useState<TilesetStaticTransposer[]>([]);

  const { character, floors, walls, tilesetLoaded } = useLoadSprites();
  const {
    position: playerPosition,
    stopped,
    lastKnownDirection,
  } = usePositionControl(direction, tick, {
    x: 0,
    y: 200,
  });

  // gameplay loop
  useLayoutEffect(() => {
    if (!tilesetLoaded) {
      return;
    }

    const intervalId = setInterval(() => {
      setTick(t => t + 1);
    }, TICK_INTERVAL);

    return () => clearInterval(intervalId); // Clear
  }, [tilesetLoaded]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const canvasMetadata = {
      width,
      height,
    };

    if (!ctx || !canvas || !tilesetLoaded || !floors.current || !walls.current) {
      return;
    }
    setTilesets([
      new FloorTileset(canvasMetadata, floors.current),
      new WallTileset(canvasMetadata, walls.current),
    ]);
  }, [floors, height, tilesetLoaded, walls, width]);

  // output graphics
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!ctx || !canvas || tilesets.length === 0 || !floors.current || !character.body) {
      return;
    }

    ctx.reset();
    ctx.imageSmoothingEnabled = false;
    for (const tileset of tilesets) {
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
    direction,
    height,
    lastKnownDirection,
    playerPosition,
    stopped,
    tick,
    floors,
    tilesetLoaded,
    width,
    tilesets,
  ]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};
