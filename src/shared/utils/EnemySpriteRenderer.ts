import { ScalingData } from './maze/TilesetExtractor';
import { ObjectiveBoundingBox } from './maze/mazeLevelMetadata';
import { Direction, Position } from './maze/playerDrawer';

export abstract class EnemySpriteRenderer {
  protected entityId: string;
  protected characterSprite: HTMLImageElement;
  protected direction: Direction;
  protected position: Position;
  scalingData: ScalingData;
  protected tick: number;
  protected scale: number;

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
  }

  public abstract getCanvasPositionByTick(): Position;
  public abstract getSpriteDimensions(): {
    lowX: number;
    highX: number;
    lowY: number;
    highY: number;
  };

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
    const positionInCanvas = this.getCanvasPositionByTick();

    canvas.drawImage(
      this.characterSprite,
      coordinatesInSprite.x,
      coordinatesInSprite.y,
      spriteWidth,
      spriteHeight,
      positionInCanvas.x,
      positionInCanvas.y,
      spriteWidth * this.scale,
      spriteHeight * this.scale,
    );
  }

  public getEntityId(): string {
    return this.entityId;
  }

  public getBoundingBox(): ObjectiveBoundingBox {
    const positionInCanvas = this.getCanvasPositionByTick();
    const { lowX, highX, lowY, highY } = this.getSpriteDimensions();

    return [
      { x: positionInCanvas.x - lowX, y: positionInCanvas.y - highX },
      { x: positionInCanvas.x + lowY, y: positionInCanvas.y + highY },
    ];
  }
}
