enum CorgiTrick {
  Standing,
  Backwards,
  LayingDown,
  Sitting,
}

export const corgiPosesMap: Array<{
  poseId: CorgiTrick;
  image: string;
  background: string;
}> = [
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

type TrickList = {
  tricks: CorgiTrick[];
};

export const corgiChallengeLevels: TrickList[] = [
  {
    tricks: [CorgiTrick.Standing, CorgiTrick.LayingDown],
  },
  {
    tricks: [CorgiTrick.Backwards, CorgiTrick.LayingDown],
  },
];
