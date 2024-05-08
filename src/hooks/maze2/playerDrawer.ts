export type Direction = 'FORWARD' | 'RIGHT' | 'LEFT' | 'BACKWARD' | null;
export type Position = { x: number; y: number };

const enableDebugCenter = true;
export const PLAYER_SCALE = 1;
export const PLAYER_OFFSET_TO_ZERO = {
  HORIZONTAL: 24 * PLAYER_SCALE,
  VERTICAL: 16 * PLAYER_SCALE,
};

export const PLAYER_DIMENSIONS = {
  HORIZONTAL: 16 * PLAYER_SCALE,
  VERTICAL: 30 * PLAYER_SCALE,
};

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
    spriteSize * PLAYER_SCALE,
    spriteSize * PLAYER_SCALE,
  );

  if (enableDebugCenter) {
    ctx.fillStyle = 'red';
    ctx.fillRect(
      position.x + PLAYER_OFFSET_TO_ZERO.HORIZONTAL + PLAYER_DIMENSIONS.HORIZONTAL,
      position.y + PLAYER_OFFSET_TO_ZERO.VERTICAL + PLAYER_DIMENSIONS.VERTICAL,
      1,
      PLAYER_DIMENSIONS.VERTICAL,
    );
  }
}
