import { ScalingData } from './maze/TilesetExtractor';
import { ObjectiveBoundingBox } from './maze/mazeLevelMetadata';
import { Direction, Position } from './maze/playerDrawer';

export abstract class EnemySpriteRenderer {
  private entityId: string;
  private characterSprite: HTMLImageElement;
  private direction: Direction;
  private position: Position;
  scalingData: ScalingData;
  private tick: number;
  private scale: number;
  private positionInCanvas: Position;

  constructor(
    entityId: string,
    characterSprite: HTMLImageElement,
    direction: Direction,
    position: Position,
    scalingData: ScalingData,
    tick: number,
  ) {
    this.entityId = entityId;
    this.characterSprite = characterSprite;
    this.direction = direction;
    this.position = position;
    this.scalingData = scalingData;
    this.tick = tick;

    this.scale =
      this.scalingData.canvas.width /
      this.scalingData.tile.columnLength /
      this.scalingData.tile.tileSize;

    this.positionInCanvas = {
      x: this.position.x * this.scale * 16,
      y: this.position.y * this.scale * 16,
    };
  }

  private getCharacterSpriteCoordinates(): Position {
    let tilePosition = 0;
    const t = this.tick % 11;
    // mimi's magic
    const i = t % 2 === 1 ? 1 : 0;
    const increment = (t + i) / 2;
    if (this.direction === 'BACKWARD') {
      tilePosition = 62;
    } else if (this.direction === 'FORWARD') {
      tilePosition = 74;
    } else if (this.direction === 'RIGHT') {
      tilePosition = 56;
    } else if (this.direction === 'LEFT') {
      tilePosition = 68;
    }

    const index = tilePosition + increment;
    const spriteMapWidth = 56;

    const tileRow = Math.floor(index / spriteMapWidth);
    const tileCol = index % spriteMapWidth;
    const sourceX = tileCol * 16;
    const sourceY = tileRow * 32;

    return {
      x: sourceX,
      y: sourceY,
    };
  }

  public render(canvas: CanvasRenderingContext2D) {
    const spriteWidth = 16;
    const spriteHeight = 32;
    const coordinatesInSprite = this.getCharacterSpriteCoordinates();

    canvas.drawImage(
      this.characterSprite,
      coordinatesInSprite.x,
      coordinatesInSprite.y,
      spriteWidth,
      spriteHeight,
      this.positionInCanvas.x,
      this.positionInCanvas.y,
      spriteWidth * this.scale,
      spriteHeight * this.scale,
    );
  }

  public getEntityId(): string {
    return this.entityId;
  }

  public getBoundingBox(): ObjectiveBoundingBox {
    return [
      { x: this.positionInCanvas.x - 28, y: this.positionInCanvas.y - 28 },
      // this technically depends on screen size
      { x: this.positionInCanvas.x + 28, y: this.positionInCanvas.y + 42 },
    ];
  }
}
