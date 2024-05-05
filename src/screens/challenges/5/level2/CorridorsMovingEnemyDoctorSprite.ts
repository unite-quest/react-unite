import { ScalingData } from '@/shared/utils/maze/TilesetExtractor';
import { Position } from '@/shared/utils/maze/playerDrawer';
import { EnemySpriteRenderer } from '../../../../shared/utils/EnemySpriteRenderer';

export class CorridorsMovingEnemyDoctorSprite extends EnemySpriteRenderer {
  constructor(
    characterSprite: HTMLImageElement,
    position: Position,
    scalingData: ScalingData,
    tick: number,
  ) {
    super('MovingEnemyDoctor', characterSprite, 'FORWARD', position, scalingData, tick);
  }

  public getCanvasPositionByTick(): Position {
    return {
      x: this.position.x * this.scale * 16,
      y: this.position.y * this.scale * 16 * (this.tick % 4) ? 250 : 300,
    };
  }

  public getSpriteDimensions(): { lowX: number; highX: number; lowY: number; highY: number } {
    return {
      lowX: 28,
      lowY: 28,
      highX: 28,
      highY: 42,
    };
  }
}
