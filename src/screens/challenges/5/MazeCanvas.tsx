import { Direction, drawGround, drawPlayer } from '@/shared/utils/mazeDrawer';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLoadSprites } from 'src/hooks/useLoadSprites';
import { usePositionControl } from 'src/hooks/usePositionControl';

type Props = {
  height: number;
  width: number;
  direction: Direction;
};
const TICK_INTERVAL = 75;

const ground = [
  [11, 5, 5, 5, 5, 5, 5, 5],
  [11, 54, 55, 54, 54, 54, 54, 54],
  [16, 60, 61, 60, 60, 60, 60, 60],
  [68, 0, 0, 0, 0, 0, 0, 0],
  [74, 0, 0, 4, 0, 0, 0, 0],
  [0, 0, 0, 11, 0, 0, 0, 4],
  [0, 0, 22, 10, 5, 5, 5, 11],
  [0, 0, 0, 0, 0, 0, 0, 11],
  [0, 0, 0, 0, 0, 0, 0, 11],
  [5, 5, 5, 5, 10, 0, 0, 11],
  [6, 6, 6, 6, 6, 6, 6, 11],
  [6, 6, 6, 6, 6, 6, 6, 11],
  [5, 5, 5, 5, 5, 5, 5, 5],
];

export const MazeCanvas: React.FC<Props> = ({ width, height, direction }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tick, setTick] = useState(0);

  const { character, tileset, tilesetLoaded } = useLoadSprites();
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

  // output graphics
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!ctx || !canvas || !tilesetLoaded || !tileset.current || !character.body) {
      return;
    }
    ctx.reset();
    ctx.imageSmoothingEnabled = false;
    drawGround(ctx, ground, tileset.current, {
      width,
      height,
    });
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
    tileset,
    tilesetLoaded,
    width,
  ]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};
