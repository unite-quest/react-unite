import { EnemySpriteRenderer } from '@/shared/utils/EnemySpriteRenderer';
import { ScalingData } from '@/shared/utils/maze/TilesetExtractor';
import { DynamicCollisionBoundary } from '@/shared/utils/maze/mazeLevelMetadata';
import { useEffect, useRef, useState } from 'react';
import { CorridorsStaticEnemyDoctorSprite } from 'src/screens/challenges/5/level2/CorridorsStaticEnemyDoctorSprite';
import enemy from '../../assets/maze/sample-enemy.png';

export function useSpawnEnemies(
  questionId: number,
  scalingData: ScalingData,
  tick: number,
  onCollide: (entityId: string) => void,
): {
  enemiesLoaded: boolean;
  enemyCollisionBoundaries: DynamicCollisionBoundary[];
  enemies: EnemySpriteRenderer[];
} {
  const [enemiesLoaded, setEnemiesLoaded] = useState(false);
  const [enemies, setEnemies] = useState<EnemySpriteRenderer[]>([]);
  const [enemyCollisionBoundaries, setEnemyCollisionBoundaries] = useState<
    DynamicCollisionBoundary[]
  >([]);
  const enemyRef = useRef(new Image());

  useEffect(() => {
    enemyRef.current.src = enemy;

    const imagesLoaded = Promise.all([new Promise(resolve => (enemyRef.current.onload = resolve))]);
    // wait for all enemies to load before processing their sprites
    imagesLoaded.then(() => {
      setEnemiesLoaded(true);

      if (questionId === 1) {
        const doctor = new CorridorsStaticEnemyDoctorSprite(
          enemyRef.current,
          { x: 4, y: 6 },
          scalingData,
          tick,
        );
        setEnemies([doctor]);
        setEnemyCollisionBoundaries([
          {
            type: 'enemy',
            boundingBox: doctor.getBoundingBox(),
            onTouch: () => onCollide(doctor.getEntityId()),
          },
        ]);
      }
    });
  }, [onCollide, questionId, scalingData, tick]);

  return {
    enemiesLoaded,
    enemyCollisionBoundaries,
    enemies,
  };
}
