import { Direction, Position } from './playerDrawer';

export type ObjectiveBoundingBox = [Position, Position];

export type PlayerInitialParameters = {
  position: Position;
  direction: Direction;
};

export type MazeObjective = {
  boundingBox: ObjectiveBoundingBox;
  onReachBox: () => void;
};

export type DynamicCollisionBoundary =
  | {
      type: 'objective';
      boundingBox: ObjectiveBoundingBox;
      onTouch: () => void;
    }
  | {
      type: 'enemy';
      boundingBox: ObjectiveBoundingBox;
      onTouch: () => void;
    };

export function getMazeParameters(questionId: number): {
  boundingBox: ObjectiveBoundingBox;
  playerInit: PlayerInitialParameters;
} {
  if (questionId === 0) {
    return {
      boundingBox: [
        { x: 303, y: 100 },
        { x: 330, y: 160 },
      ],
      playerInit: {
        direction: 'FORWARD',
        position: { x: 2.9, y: 11.1 },
      },
    };
  }
  if (questionId === 1) {
    return {
      boundingBox: [
        { x: 280, y: 70 },
        { x: 280, y: 120 },
      ],
      playerInit: {
        direction: 'RIGHT',
        position: { x: -1, y: 5.2 },
      },
    };
  }
  return {
    boundingBox: [
      { x: 280, y: 70 },
      { x: 280, y: 120 },
    ],
    playerInit: {
      direction: 'RIGHT',
      position: { x: -10, y: 110 },
    },
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
    description: 'Tome cuidado com os enfermeiros correndo pela sala',
    image: 'https://placehold.co/250x400',
  },
  {
    title: 'Tutorial (3/3)',
    description: 'Tome cuidado com',
    image: 'https://placehold.co/250x400',
  },
];
