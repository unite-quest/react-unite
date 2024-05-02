import { Position } from './playerDrawer';

export type ObjectiveBoundingBox = [Position, Position];

export type MazeObjective = {
  boundingBox: ObjectiveBoundingBox;
  onReachBox: () => void;
};

export function getMazeParameters(questionId: number): {
  boundingBox: ObjectiveBoundingBox;
  playerInitialPosition: Position;
} {
  if (questionId === 0) {
    return {
      boundingBox: [
        { x: 280, y: 70 },
        { x: 280, y: 120 },
      ],
      playerInitialPosition: { x: 90, y: 370 },
    };
  }
  return {
    boundingBox: [
      { x: 280, y: 70 },
      { x: 280, y: 120 },
    ],
    playerInitialPosition: { x: 90, y: 370 },
  };
}
