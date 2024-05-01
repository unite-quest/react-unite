export type Direction = 'FORWARD' | 'RIGHT' | 'LEFT' | 'BACKWARD' | null;

function getCharacterSpriteCoordinates(
  direction: Direction,
  tick: number,
): {
  x: number;
  y: number;
} {
  let tilePosition = 0;
  const increment = tick % 6;
  if (direction === 'BACKWARD') {
    tilePosition = 32;
  } else if (direction === 'FORWARD') {
    tilePosition = 40;
  } else if (direction === 'RIGHT') {
    tilePosition = 48;
  } else if (direction === 'LEFT') {
    tilePosition = 56;
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
  x: number,
  y: number,
  tick: number,
) {
  const scale = 2;
  const spriteSize = 64;
  const coordinates = getCharacterSpriteCoordinates(direction, tick);

  ctx.drawImage(
    characterSprite,
    coordinates.x,
    coordinates.y,
    spriteSize,
    spriteSize,
    x,
    y,
    spriteSize * scale,
    spriteSize * scale,
  );
}
