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
  const scale = 1.5;
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
