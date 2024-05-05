import { Direction, Position } from './playerDrawer';
const tutorial1 = 'https://gabrieltnishimura.github.io/unite/tutorial.png';
const tutorial2 = 'https://gabrieltnishimura.github.io/unite/tutorial2.PNG';

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
        { x: 280, y: 100 },
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
        { x: 310, y: 0 },
        { x: 350, y: 100 },
      ],
      playerInit: {
        direction: 'FORWARD',
        position: { x: 4.3, y: 18.1 },
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
    title: 'Tutorial (1/2)',
    description:
      'Use o joystick no canto inferior direito para controlar o Gabriel. O seu objetivo é encontrar a sala em que a Mimi está!',
    image: tutorial1,
  },
  {
    title: 'Tutorial (2/2)',
    description: 'Cuidado para não esbarrar nos médicos! A Mimi está na próxima sala.',
    image: tutorial2,
  },
  {
    title: 'Tutorial (3/3)',
    description: 'Tome cuidado com',
    image: 'https://placehold.co/250x400',
  },
];
