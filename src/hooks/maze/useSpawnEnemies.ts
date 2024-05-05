import { EnemySpriteRenderer } from '@/shared/utils/EnemySpriteRenderer';
import { ScalingData } from '@/shared/utils/maze/TilesetExtractor';
import { DynamicCollisionBoundary } from '@/shared/utils/maze/mazeLevelMetadata';
import { useEffect, useRef, useState } from 'react';
import { CorridorsMovingEnemyDoctorSprite } from 'src/screens/challenges/5/level2/CorridorsMovingEnemyDoctorSprite';
import { CorridorsMovingHorizontalEnemyDoctorSprite } from 'src/screens/challenges/5/level2/CorridorsMovingHorizontalEnemyDoctorSprite';
import { CorridorsStaticEnemyDoctorSprite } from 'src/screens/challenges/5/level2/CorridorsStaticEnemyDoctorSprite';
import enemy from '../../assets/maze/doctor1.png';
import doctor2 from '../../assets/maze/doctor2.png';
import doctor3 from '../../assets/maze/doctor3.png';
//import doctor4 from '../../assets/maze/doctor4.png';
import receptionist from '../../assets/maze/receptionist.png';

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
  const enemyRef1 = useRef(new Image());
  const enemyRef2 = useRef(new Image());
  const enemyRef3 = useRef(new Image());

  useEffect(() => {
    enemyRef.current.src = enemy;
    enemyRef1.current.src = doctor2;
    enemyRef2.current.src = doctor3;
    enemyRef3.current.src = receptionist;

    const imagesLoaded = Promise.all([new Promise(resolve => (enemyRef.current.onload = resolve)),
      new Promise(resolve => (enemyRef1.current.onload = resolve)),
      new Promise(resolve => (enemyRef2.current.onload = resolve)),
      new Promise(resolve => (enemyRef3.current.onload = resolve))
    ]);
    // wait for all enemies to load before processing their sprites
    imagesLoaded.then(() => {
      setEnemiesLoaded(true);

      if (questionId === 1) {
        const doctor = new CorridorsStaticEnemyDoctorSprite(
          enemyRef.current,
          { x: 2, y: 4 },
          scalingData,
          tick,
        );
        const movingDoctor = new CorridorsMovingEnemyDoctorSprite(
          enemyRef1.current,
          { x: 4, y: 4 },
          scalingData,
          tick,
        );
        const doctor3 = new CorridorsMovingHorizontalEnemyDoctorSprite(
          enemyRef2.current,
          { x: 10, y: 12 },
          scalingData,
          tick,
        );
        const receptionist = new CorridorsStaticEnemyDoctorSprite(
          enemyRef3.current,
          { x: 2.5, y: 14.5 },
          scalingData,
          tick,
        );
        setEnemies([doctor, movingDoctor, doctor3, receptionist]);
        setEnemyCollisionBoundaries([
          {
            type: 'enemy',
            boundingBox: doctor.getBoundingBox(),
            onTouch: () => onCollide(doctor.getEntityId()),
          },
          {
            type: 'enemy',
            boundingBox: movingDoctor.getBoundingBox(),
            onTouch: () => onCollide(movingDoctor.getEntityId()),
          },
          {
            type: 'enemy',
            boundingBox: doctor3.getBoundingBox(),
            onTouch: () => onCollide(doctor.getEntityId()),
          },
          {
            type: 'enemy',
            boundingBox: receptionist.getBoundingBox(),
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
