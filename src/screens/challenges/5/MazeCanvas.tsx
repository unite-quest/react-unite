import { useEffect, useRef } from 'react';

type Props = {
  maze: number[][];
  playerPosition: { x: number; y: number };
};

export const MazeCanvas: React.FC<Props> = ({ maze, playerPosition }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!ctx || !canvas) {
      return;
    }

    const tileSize = 50; // Size of each tile in pixels
    const drawMaze = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous drawings
      maze.forEach((row, y) => {
        row.forEach((cell, x) => {
          ctx.fillStyle = cell === 1 ? 'black' : cell === 2 ? 'blue' : 'white';
          ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
          if (x === playerPosition.x && y === playerPosition.y) {
            ctx.fillStyle = 'red'; // Color for the player
            ctx.beginPath();
            ctx.arc(
              x * tileSize + tileSize / 2,
              y * tileSize + tileSize / 2,
              tileSize / 4,
              0,
              2 * Math.PI,
            );
            ctx.fill();
          }
        });
      });
    };

    drawMaze();
  }, [maze, playerPosition.x, playerPosition.y]);

  return <canvas ref={canvasRef} width={maze[0].length * 50} height={maze.length * 50} />;
};
