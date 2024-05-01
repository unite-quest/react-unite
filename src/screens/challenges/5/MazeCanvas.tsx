import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import tilemap from '../../../assets/tilemap.png';
type Props = {
  height: number;
  width: number;
  maze: number[][];
  playerPosition: { x: number; y: number };
};

const ground = [
  [0, 1, 2, 3, 4, 5, 6],
  [5, 6, 7, 8, 9, 5, 6],
  [10, 11, 12, 13, 14, 5, 6],
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
  const { tileSize, gap } = tilesetConfig;

  const sourceTileSize = tileSize; // Total size including the gap
  for (let r = 0; r < ground.length; r++) {
    for (let c = 0; c < ground[r].length; c++) {
      const scale2 = config.width / 16 / (ground[r].length - 1);
      const tile = ground[r][c];
      const tileRow = Math.floor(tile / tilesetConfig.tilesPerRow);
      const tileCol = tile % tilesetConfig.tilesPerCol;
      // Calculate the source coordinates considering the gap
      const sourceX = tileCol * sourceTileSize + gap * tileCol;
      const sourceY = tileRow * sourceTileSize + gap * tileRow;

      ctx.drawImage(
        tilesetImage,
        sourceX, // Adjusted source x to skip the gap
        sourceY, // Adjusted source y to skip the gap
        tileSize,
        tileSize,
        c * tileSize * scale2,
        r * tileSize * scale2,
        tileSize * scale2,
        tileSize * scale2,
      );
    }
  }
}

export const MazeCanvas: React.FC<Props> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tilesetRef = useRef(new Image());
  const [tilesetLoaded, setTilesetLoaded] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    tilesetRef.current.src = tilemap;

    const imagesLoaded = Promise.all([
      new Promise(resolve => (tilesetRef.current.onload = resolve)),
    ]);
    imagesLoaded.then(() => {
      setTilesetLoaded(true);
    });
  }, []);

  // guarantees gap disapears
  useLayoutEffect(() => {
    if (!tilesetLoaded) {
      return;
    }
    let timerId: number;

    const animate = () => {
      setTick(t => t + 1);
      timerId = requestAnimationFrame(animate);
    };
    timerId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(timerId);
  }, [tilesetLoaded]);

  // output graphics
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!ctx || !canvas || !tilesetLoaded || !tilesetRef.current) {
      return;
    }

    drawGround(ctx, tilesetRef.current, {
      width,
      height,
    });
    ctx.restore();
  }, [tick, height, tilesetLoaded, width]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};
