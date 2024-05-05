import { ScalingData } from '@/shared/utils/maze/TilesetExtractor';
import { Position } from '@/shared/utils/maze/playerDrawer';
import { EnemySpriteRenderer } from '../../../../shared/utils/EnemySpriteRenderer';

export class CorridorsMovingHorizontalEnemyDoctorSprite extends EnemySpriteRenderer {
  constructor(
    characterSprite: HTMLImageElement,
    position: Position,
    scalingData: ScalingData,
    tick: number,
  ) {
    super('MovingEnemyDoctor', characterSprite, 'FORWARD', position, scalingData, tick, true);
  }

  public getCanvasPositionByTick(): Position {
    const shouldGoForward = this.tick % 88 < 43;
    if (shouldGoForward) {
      this.direction = 'RIGHT';
    } else {
      this.direction = 'LEFT';
    }

    return {
      x: shouldGoForward
        ? 170 + ((this.tick % 88) / 4) * 10
        : 280 - (((this.tick % 88) - 43) / 4) * 10,
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
