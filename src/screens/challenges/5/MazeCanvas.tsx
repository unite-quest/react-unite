import {
  DynamicCollisionBoundary,
  PlayerInitialParameters,
} from '@/shared/utils/maze/mazeLevelMetadata';
import { Direction } from '@/shared/utils/maze/playerDrawer';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useScenario } from 'src/hooks/maze2/useScenario';

type Props = {
  questionId: number;
  height: number;
  width: number;
  playerInit: PlayerInitialParameters;
  direction: Direction;
  onLoaded: () => void;
  objectiveCollisionBoundary: DynamicCollisionBoundary;
  onCollideWithEnemy: (entityId: string) => void;
};
const TICK_INTERVAL = 75;

export const MazeCanvas: React.FC<Props> = ({ questionId, width, height, direction, onLoaded }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tick, setTick] = useState(0);

  const {
    loaded: scenarioLoaded,
    positioning: tilesetPositioning,
    render: renderScenario,
  } = useScenario(questionId);
  const {
    loaded: enemiesLoaded,
    positioning: enemyPositioning,
    render: renderEnemies,
    move: moveEnemies,
  } = useEnemies(questionId);
  const {
    loaded: objectiveLoaded,
    positioning: objectivePositioning,
    render: renderObjective,
  } = useObjective(questionId);
  const {
    loaded: playerLoaded,
    positioning: playerPositioning,
    render: renderPlayer,
    move: movePlayer,
  } = usePlayer(questionId);

  // global movement control
  useGlobalPositionControl(
    tick,
    direction,
    [playerPositioning, tilesetPositioning, enemyPositioning, objectivePositioning],
    [movePlayer, moveEnemies],
    [onCollideEnemy, onCollideObjective],
  );

  // gameplay loop
  useLayoutEffect(() => {
    if (!scenarioLoaded || !enemiesLoaded || !playerLoaded || !objectiveLoaded) {
      return;
    }
    onLoaded();

    const intervalId = setInterval(() => {
      setTick(t => t + 1);
    }, TICK_INTERVAL);

    return () => clearInterval(intervalId); // Clear
  }, [onLoaded, enemiesLoaded, playerLoaded, scenarioLoaded, objectiveLoaded]);

  // output graphics (TODO move to requestAnimationFrame)
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!ctx || !canvas) {
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.imageSmoothingEnabled = false;

    renderScenario(ctx);
    renderEnemies(ctx);
    renderPlayer(ctx);
    renderObjective(ctx);

    ctx.restore();
  }, [renderEnemies, renderObjective, renderPlayer, renderScenario]);

  useEffect(() => {
    console.log(`Initialized Canvas with h=${height}; w=${width}`);
  }, [height, width]);

  return (
    <canvas ref={canvasRef} width={width} height={height} style={{ imageRendering: 'pixelated' }} />
  );
};
