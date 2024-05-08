import { useEffect, useRef, useState } from 'react';
import enemy from '../../assets/maze/doctor1.png';
import doctor2 from '../../assets/maze/doctor2.png';
import doctor3 from '../../assets/maze/doctor3.png';
import receptionist from '../../assets/maze/receptionist.png';
import { EnemyPositioning, MoveEnemyFn } from './basePosition';

export function useEnemies(questionId: number): {
  loaded: boolean;
  positioning: EnemyPositioning[];
  move: MoveEnemyFn;
  render: (canvas: CanvasRenderingContext2D) => void;
} {
  const [enemiesLoaded, setEnemiesLoaded] = useState(false);
  const enemyRef = useRef(new Image());
  const enemyRef1 = useRef(new Image());
  const enemyRef2 = useRef(new Image());
  const enemyRef3 = useRef(new Image());

  useEffect(() => {
    enemyRef.current.src = enemy;
    enemyRef1.current.src = doctor2;
    enemyRef2.current.src = doctor3;
    enemyRef3.current.src = receptionist;

    const imagesLoaded = Promise.all([
      new Promise(resolve => (enemyRef.current.onload = resolve)),
      new Promise(resolve => (enemyRef1.current.onload = resolve)),
      new Promise(resolve => (enemyRef2.current.onload = resolve)),
      new Promise(resolve => (enemyRef3.current.onload = resolve)),
    ]);
    // wait for all enemies to load before processing their sprites
    imagesLoaded.then(() => {
      setEnemiesLoaded(true);

      if (questionId === 1) {
        // add enemies
      }
    });
  }, [questionId]);

  return {
    loaded: enemiesLoaded,
    positioning: [],
    move: () => undefined,
    render: () => undefined,
  };
}
