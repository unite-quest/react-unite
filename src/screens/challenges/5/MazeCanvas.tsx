import { Direction, drawPlayer } from '@/shared/utils/mazeDrawer';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import characterArmor from '../../../assets/maze/armor.png';
import characterSpriteSheet from '../../../assets/maze/character-base.png';
import characterHair from '../../../assets/maze/hair.png';
import tilemap from '../../../assets/tilemap.png';
type Props = {
  height: number;
  width: number;
  direction: Direction;
};
const TICK_INTERVAL = 100;

const ground = [
  [11, 5, 5, 5, 5, 5, 5, 5],
  [11, 54, 55, 54, 54, 54, 54, 54],
  [16, 60, 61, 60, 60, 60, 60, 60],
  [68, 0, 0, 0, 0, 0, 0, 0],
  [74, 0, 0, 4, 0, 0, 0, 0],
  [0, 0, 0, 11, 11, 0, 0, 0],
  [0, 0, 0, 11, 0, 0, 0, 0],
  [5, 5, 5, 5, 5, 0, 0, 11],
  [0, 0, 0, 0, 0, 0, 0, 11],
  [0, 0, 0, 0, 0, 0, 0, 11],
  [5, 5, 5, 5, 0, 0, 0, 11],
  [0, 0, 0, 0, 0, 0, 0, 11],
  [5, 5, 5, 5, 5, 5, 5, 5],
];

const tilesetConfig = {
  tileSize: 16,
  scale: 4, // Scale factor for drawing larger tiles
  tilesPerRow: 6,
  tilesPerCol: 13,
  gap: 1, // Size of the gap around each tile
};

function drawGround(
  ctx: CanvasRenderingContext2D,
  tilesetImage: HTMLImageElement,
  config: {
    height: number;
    width: number;
  },
) {
  const gap = tilesetConfig.gap;
  for (let r = 0; r < ground.length; r++) {
    for (let c = 0; c < ground[r].length; c++) {
      const scale = config.width / 16 / ground[r].length;
      const tile = ground[r][c];
      const tileHeight: number = 16;
      const tileWidth: number = 16;
      const tileRow = Math.floor(tile / tilesetConfig.tilesPerRow);
      const tileCol = tile % tilesetConfig.tilesPerRow;
      const gapXMultiplier = tileCol;
      // after third row, every gap is irregular - this accounts for that
      const gapYMultiplier = tileRow > 3 ? (tileRow % 2) + 3 : tileRow;

      // Calculate the source coordinates considering the gap
      const sourceX = tileCol * tileWidth + gapXMultiplier * gap;
      const sourceY = tileRow * tileHeight + gapYMultiplier * gap;

      ctx.drawImage(
        tilesetImage,
        sourceX, // Adjusted source x to skip the gap
        sourceY, // Adjusted source y to skip the gap
        tileWidth,
        tileHeight,
        c * tileWidth * scale,
        r * tileHeight * scale,
        tileWidth * scale,
        tileHeight * scale,
      );
    }
  }
}

export const MazeCanvas: React.FC<Props> = ({ width, height, direction }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tilesetRef = useRef(new Image());
  const characterSpriteRef = useRef(new Image());
  const characterArmorSpriteRef = useRef(new Image());
  const characterHairSpriteRef = useRef(new Image());
  const [tilesetLoaded, setTilesetLoaded] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    tilesetRef.current.src = tilemap;
    characterSpriteRef.current.src = characterSpriteSheet;
    characterArmorSpriteRef.current.src = characterArmor;
    characterHairSpriteRef.current.src = characterHair;

    const imagesLoaded = Promise.all([
      new Promise(resolve => (tilesetRef.current.onload = resolve)),
      new Promise(resolve => (characterSpriteRef.current.onload = resolve)),
      new Promise(resolve => (characterArmorSpriteRef.current.onload = resolve)),
      new Promise(resolve => (characterHairSpriteRef.current.onload = resolve)),
    ]);
    imagesLoaded.then(() => {
      setTilesetLoaded(true);
    });
  }, []);

  // hides weird gap
  useLayoutEffect(() => {
    if (!tilesetLoaded) {
      return;
    }

    // 60FPS implementation
    // let timerId: number;
    // const animate = () => {
    //   setTick(t => t + 1);
    //   timerId = requestAnimationFrame(animate);
    // };
    // timerId = requestAnimationFrame(animate);
    // return () => cancelAnimationFrame(timerId);

    const intervalId = setInterval(() => {
      setTick(t => t + 1); // Update state every 100 ms
    }, TICK_INTERVAL); // Set the interval to 100 ms

    return () => clearInterval(intervalId); // Clear
  }, [tilesetLoaded]);

  // output graphics
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!ctx || !canvas || !tilesetLoaded || !tilesetRef.current || !characterSpriteRef.current) {
      return;
    }
    ctx.reset();
    ctx.imageSmoothingEnabled = false;
    drawGround(ctx, tilesetRef.current, {
      width,
      height,
    });
    drawPlayer(ctx, characterSpriteRef.current, direction, 0, 0, tick);
    drawPlayer(ctx, characterArmorSpriteRef.current, direction, 0, 0, tick);
    drawPlayer(ctx, characterHairSpriteRef.current, direction, 0, 0, tick);
    ctx.restore();
  }, [tick, height, tilesetLoaded, width, direction]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};
