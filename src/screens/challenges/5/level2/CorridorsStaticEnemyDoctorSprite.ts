import { ScalingData } from '@/shared/utils/maze/TilesetExtractor';
import { Position } from '@/shared/utils/maze/playerDrawer';
import { EnemySpriteRenderer } from '../../../../shared/utils/EnemySpriteRenderer';

export class CorridorsStaticEnemyDoctorSprite extends EnemySpriteRenderer {
  constructor(
    characterSprite: HTMLImageElement,
    position: Position,
    scalingData: ScalingData,
    tick: number,
  ) {
    super('StaticEnemyDoctor', characterSprite, 'FORWARD', position, scalingData, tick);
  }
}
