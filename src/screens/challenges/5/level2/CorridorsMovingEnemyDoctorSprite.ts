import { ScalingData } from '@/shared/utils/maze/TilesetExtractor';
import { Position } from 'src/hooks/maze2/playerDrawer';
import { EnemySpriteRenderer } from '../../../../shared/utils/EnemySpriteRenderer';

export class CorridorsMovingEnemyDoctorSprite extends EnemySpriteRenderer {
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
      this.direction = 'FORWARD';
    } else {
      this.direction = 'BACKWARD';
    }

    return {
      x: this.position.x * this.scale * 16,
      y: shouldGoForward
        ? 210 + ((this.tick % 88) / 4) * 10
        : 320 - (((this.tick % 88) - 43) / 4) * 10,
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
