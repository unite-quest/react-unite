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
    // todo stop hardcoding
    const scale =
      this.scalingData.canvas.width /
      this.scalingData.tile.columnLength /
      this.scalingData.tile.tileSize;
    const spriteWidth = 16;
    const spriteHeight = 32;
    const coordinatesInSprite = this.getCharacterSpriteCoordinates();

    const translatePositionToCanvas = {
      x: this.position.x * scale * 16,
      y: this.position.y * scale * 16,
    };

    canvas.drawImage(
      this.characterSprite,
      coordinatesInSprite.x,
      coordinatesInSprite.y,
      spriteWidth,
      spriteHeight,
      translatePositionToCanvas.x,
      translatePositionToCanvas.y,
      spriteWidth * scale,
      spriteHeight * scale,
    );
  }

  public getEntityId(): string {
    return this.entityId;
  }

  public getBoundingBox(): ObjectiveBoundingBox {
    return [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ];
  }
}
