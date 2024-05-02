import { TilesetStaticTransposer } from '@/shared/utils/TilesetStaticTransposer';
import { BorderTileset } from '@/shared/utils/maze/BorderTileset';
import { FloorTileset } from '@/shared/utils/maze/FloorTileset';
import { WallTileset } from '@/shared/utils/maze/WallTileset';
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
  const [tilesets, setTilesets] = useState<TilesetStaticTransposer[]>([]);

  const { character, floors, walls, borders, tilesetLoaded } = useLoadSprites();
  const {
    position: playerPosition,
    stopped,
    lastKnownDirection,
  } = usePositionControl(direction, tick, tilesets, playerInitialPosition);

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

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const canvasMetadata = {
      width,
      height,
    };

    if (
      !ctx ||
      !canvas ||
      !tilesetLoaded ||
      !floors.current ||
      !walls.current ||
      !borders.current
    ) {
      return;
    }
    setTilesets([
      new FloorTileset(canvasMetadata, floors.current),
      new BorderTileset(canvasMetadata, borders.current),
      new WallTileset(canvasMetadata, walls.current),
    ]);
  }, [borders, floors, height, tilesetLoaded, walls, width]);

  // output graphics
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!ctx || !canvas || tilesets.length === 0 || !floors.current || !character.body) {
      return;
    }

    ctx.save();
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
    floors,
    lastKnownDirection,
    playerPosition,
    stopped,
    tick,
    tilesets,
  ]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};
