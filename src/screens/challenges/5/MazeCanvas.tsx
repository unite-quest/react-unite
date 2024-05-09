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
const TICK_INTERVAL = 50;

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
    const MOVE_STEP = 2;
    if (direction === 'FORWARD') {
      movePlayer((currentPosition: Position) => ({
        direction,
        position: {
          x: currentPosition.x,
          y: currentPosition.y - MOVE_STEP,
        },
      }));
    } else if (direction === 'BACKWARD') {
      movePlayer((currentPosition: Position) => ({
        direction,
        position: {
          x: currentPosition.x,
          y: currentPosition.y + MOVE_STEP,
        },
      }));
    } else if (direction === 'LEFT') {
      movePlayer((currentPosition: Position) => ({
        direction,
        position: {
          x: currentPosition.x - MOVE_STEP,
          y: currentPosition.y,
        },
      }));
    } else if (direction === 'RIGHT') {
      movePlayer((currentPosition: Position) => ({
        direction,
        position: {
          x: currentPosition.x + MOVE_STEP,
          y: currentPosition.y,
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
