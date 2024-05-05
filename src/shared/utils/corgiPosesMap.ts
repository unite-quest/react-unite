enum CorgiTrick {
  Standing,
  Backwards,
  LayingDown,
  Sitting,
}

export type CorgiPoseItem = {
  poseId: CorgiTrick;
  image: string;
  background: string;
};

export const corgiPosesMap: Array<CorgiPoseItem> = [
  {
    poseId: CorgiTrick.Standing,
    image: 'https://gabrieltnishimura.github.io/unite/pixil-frame-0.png',
    background: 'bg-red-500',
  },
  {
    poseId: CorgiTrick.Backwards,
    image: 'https://gabrieltnishimura.github.io/unite/pixil-frame-1.png',
    background: 'bg-emerald-500',
  },
  {
    poseId: CorgiTrick.LayingDown,
    image: 'https://gabrieltnishimura.github.io/unite/pixil-frame-2.png',
    background: 'bg-yellow-500',
  },
  {
    poseId: CorgiTrick.Sitting,
    image: 'https://gabrieltnishimura.github.io/unite/pixil-frame-3.png',
    background: 'bg-indigo-500',
  },
];

export function shuffle<T>(array: Array<T>): Array<T> {
  const clonedArray = Object.assign([], array);
  let currentIndex = clonedArray.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element ...
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [clonedArray[currentIndex], clonedArray[randomIndex]] = [
      clonedArray[randomIndex],
      clonedArray[currentIndex],
    ];
  }

  return clonedArray;
}

type TrickList = {
  tricks: CorgiTrick[];
};

export const corgiChallengeLevels: TrickList[] = [
  {
    tricks: [CorgiTrick.Standing, CorgiTrick.LayingDown],
  },
  {
    tricks: [
      CorgiTrick.Standing,
      CorgiTrick.LayingDown,
      CorgiTrick.Standing,
      CorgiTrick.Sitting,
      CorgiTrick.Backwards,
    ],
  },
  {
    tricks: [
      CorgiTrick.Standing,
      CorgiTrick.LayingDown,
      CorgiTrick.Standing,
      CorgiTrick.Sitting,
      CorgiTrick.Backwards,
      CorgiTrick.LayingDown,
      CorgiTrick.Standing,
      CorgiTrick.Backwards,
    ],
  },
  {
    tricks: [
      CorgiTrick.Standing,
      CorgiTrick.LayingDown,
      CorgiTrick.Standing,
      CorgiTrick.Sitting,
      CorgiTrick.Backwards,
      CorgiTrick.LayingDown,
      CorgiTrick.Standing,
      CorgiTrick.Backwards,
      CorgiTrick.Standing,
      CorgiTrick.LayingDown,
      CorgiTrick.Sitting,
    ],
  },
];
