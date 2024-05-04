import { MappedTileMetadata } from 'src/hooks/maze/useLoadSprites';
import { Position } from './maze/playerDrawer';

export class EnemySpriteRenderer {
  initialPosition: Position;
  mappedTileMetatada: MappedTileMetadata;
  constructor(initialPosition: Position, mappedTileMetatada: MappedTileMetadata) {
    this.initialPosition = initialPosition;
    this.mappedTileMetatada = mappedTileMetatada;
  }

  // with time;
  public render(canvas: CanvasRenderingContext2D) {
    canvas.fillRect(this.initialPosition.x, this.initialPosition.y, 1, 1);
  }
}
