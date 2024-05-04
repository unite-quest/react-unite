import { EnemySpriteRenderer } from '@/shared/utils/EnemySpriteRenderer';
import { DynamicCollisionBoundary } from '@/shared/utils/maze/mazeLevelMetadata';
import { CorridorsStaticEnemyDoctorSprite } from 'src/screens/challenges/5/level2/CorridorsStaticEnemyDoctorSprite';
import { MappedTileMetadata } from './useLoadSprites';

export function useSpawnEnemies(
  questionId: number,
  tileMetadata: MappedTileMetadata,
  tick: number,
): {
  enemyCollisionBoundaries: DynamicCollisionBoundary[];
  enemies: EnemySpriteRenderer[];
} {
  if (questionId === 1) {
    const doctor = new CorridorsStaticEnemyDoctorSprite({ x: 0, y: tick }, tileMetadata);
    return {
      enemyCollisionBoundaries: [],
      enemies: [doctor],
    };
  }

  return {
    enemyCollisionBoundaries: [],
    enemies: [],
  };
}
