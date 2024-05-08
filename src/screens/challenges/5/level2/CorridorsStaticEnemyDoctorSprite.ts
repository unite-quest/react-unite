import { ScalingData } from '@/shared/utils/maze/TilesetExtractor';
import { Position } from 'src/hooks/maze2/playerDrawer';
import { EnemySpriteRenderer } from '../../../../shared/utils/EnemySpriteRenderer';

export class CorridorsStaticEnemyDoctorSprite extends EnemySpriteRenderer {
  constructor(
    characterSprite: HTMLImageElement,
    position: Position,
    scalingData: ScalingData,
    tick: number,
  ) {
    super('StaticEnemyDoctor', characterSprite, 'FORWARD', position, scalingData, tick, false);
  }

  public getCanvasPositionByTick(): Position {
    return {
      x: this.position.x * this.scale * 16,
      y: this.position.y * this.scale * 16,
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
