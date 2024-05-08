import { useCallback, useEffect, useRef } from 'react';
import { Direction, Position } from 'src/hooks/maze2/playerDrawer';
import { useEnemies } from 'src/hooks/maze2/useEnemies';
import { useGlobalPositionControl } from 'src/hooks/maze2/useGlobalPositionControl';
import { useObjective } from 'src/hooks/maze2/useObjective';
import { usePlayer } from 'src/hooks/maze2/usePlayer';
import { useScenario } from 'src/hooks/maze2/useScenario';

type Props = {
  questionId: number;
  height: number;
  width: number;
  direction: Direction;
  onLoaded: () => void;
  onCollideWithEnemy: (entityId: string) => void;
  onCollideWithObjective: () => void;
};
const TICK_INTERVAL = 75;

export const MazeCanvas: React.FC<Props> = ({
  questionId,
  width,
  height,
  direction,
  onLoaded,
  onCollideWithEnemy,
  onCollideWithObjective,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tickRef = useRef(0);

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
    stop: stopPlayer,
  } = usePlayer(questionId);

  useGlobalPositionControl(
    tickRef.current,
    direction,
    [playerPositioning, tilesetPositioning, enemyPositioning, objectivePositioning],
    [movePlayer, moveEnemies],
    [onCollideWithEnemy, onCollideWithObjective],
  );

  const updateGameState = useCallback(() => {
    tickRef.current += 1; // Increment the tick count
    // Handle other game logic updates
    if (direction === 'FORWARD') {
      movePlayer((currentPosition: Position) => ({
        direction: 'FORWARD',
        position: {
          x: currentPosition.x + 16,
          y: currentPosition.y + 16,
        },
      }));
    }
    if (direction === null) {
      stopPlayer();
    }
  }, [direction, movePlayer, stopPlayer]);

  const render = useCallback(() => {
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
    renderObjective(ctx);

    // // Draw your character based on the current tick
    const totalFrames = 30;
    const frameIndex = Math.floor(tickRef.current / 2) % totalFrames; // Adjust frame change rate here
    renderPlayer(ctx, frameIndex);

    ctx.restore();
    requestAnimationFrame(render);
  }, [renderEnemies, renderObjective, renderPlayer, renderScenario]);

  useEffect(() => {
    if (!scenarioLoaded || !enemiesLoaded || !playerLoaded || !objectiveLoaded) {
      return;
    }
    onLoaded();
    const gameIntervalId = setInterval(updateGameState, TICK_INTERVAL); // game loop
    const animationFrameId = requestAnimationFrame(render); // Start the render loop

    return () => {
      clearTimeout(gameIntervalId);
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    enemiesLoaded,
    objectiveLoaded,
    onLoaded,
    playerLoaded,
    render,
    scenarioLoaded,
    updateGameState,
  ]);

  useEffect(() => {
    console.log(`Initialized Canvas with h=${height}; w=${width}`);
  }, [height, width]);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ imageRendering: 'pixelated' }}
      />
    </>
  );
};
