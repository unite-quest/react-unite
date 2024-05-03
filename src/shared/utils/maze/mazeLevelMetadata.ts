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
    playerInitialPosition: { x: 10, y: 370 },
  };
}

export const mazeTutorial: { title: string; description: string; image: string }[] = [
  {
    title: 'Tutorial (1/3)',
    description:
      'Use o joystick no canto inferior direito para controlar o Gabriel. O seu objetivo é encontrar a sala em que a Mimi está!',
    image: 'https://placehold.co/250x400',
  },
  {
    title: 'Tutorial (2/3)',
    description: 'Cuidado com os enfermeiros correndo pela sala',
    image: 'https://placehold.co/250x400',
  },
  {
    title: 'Tutorial (3/3)',
    description:
      'Use o joystick no canto inferior direito para controlar o Gabriel. O seu objetivo é encontrar a sala em que a Mimi está!',
    image: 'https://placehold.co/250x400',
  },
];
