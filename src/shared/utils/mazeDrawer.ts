export type Direction = 'FORWARD' | 'RIGHT' | 'LEFT' | 'BACKWARD' | null;
export type Position = { x: number; y: number };

function getCharacterSpriteCoordinates(
  direction: Direction,
  tick: number,
  stopped: boolean,
): Position {
  let tilePosition = 0;
  const increment = stopped ? 0 : tick % 6;
  if (direction === 'BACKWARD') {
    tilePosition = stopped ? 0 : 32;
  } else if (direction === 'FORWARD') {
    tilePosition = stopped ? 8 : 40;
  } else if (direction === 'RIGHT') {
    tilePosition = stopped ? 16 : 48;
  } else if (direction === 'LEFT') {
    tilePosition = stopped ? 24 : 56;
  }

  const index = tilePosition + increment;
  const height = 8;
  const width = 8;
  const tileRow = Math.floor(index / height);
  const tileCol = index % width;
  const sourceX = tileCol * 64;
  const sourceY = tileRow * 64;

  return {
    x: sourceX,
    y: sourceY,
  };
}

export function drawPlayer(
  ctx: CanvasRenderingContext2D,
  characterSprite: HTMLImageElement,
  direction: Direction,
  position: Position,
  stopped: boolean,
  tick: number,
) {
  const scale = 2;
  const spriteSize = 64;
  const coordinates = getCharacterSpriteCoordinates(direction, tick, stopped);

  ctx.drawImage(
    characterSprite,
    coordinates.x,
    coordinates.y,
    spriteSize,
    spriteSize,
    position.x,
    position.y,
    spriteSize * scale,
    spriteSize * scale,
  );
}

export function drawGround(
  ctx: CanvasRenderingContext2D,
  ground: number[][],
  tilesetImage: HTMLImageElement,
  config: {
    height: number;
    width: number;
  },
) {
  const tilesetConfig = {
    tilesPerRow: 6,
    tilesPerCol: 13,
  };
  const gap = 1;
  for (let r = 0; r < ground.length; r++) {
    for (let c = 0; c < ground[r].length; c++) {
      const scale = config.width / 16 / ground[r].length;
      const tile = ground[r][c];
      const tileHeight: number = 16;
      const tileWidth: number = 16;
      const tileRow = Math.floor(tile / tilesetConfig.tilesPerRow);
      const tileCol = tile % tilesetConfig.tilesPerRow;
      const gapXMultiplier = tileCol;
      // after third row, every gap is irregular - this accounts for that (SQN)
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
