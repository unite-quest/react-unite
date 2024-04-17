export enum ChallengeIdentifier {
  One_LogoQuiz,
  Two_LogicGates,
  Three_Video,
  Four_DogCuisine,
  Five_Labyrinth,
  Six_ApartmentTinder,
  Seven_SimonSays,
}

export enum ChallengeRouteIdentifier {
  One_LogoQuiz = '1',
  Two_LogicGates = '2',
  Three_Video = '3',
  Four_DogCuisine = '4',
  Five_Labyrinth = '5',
  Six_ApartmentTinder = '6',
  Seven_SimonSays = '7',
}

export function fromRouteToChallengeIdentifier(value?: string): ChallengeIdentifier {
  switch (value) {
    case ChallengeRouteIdentifier.One_LogoQuiz:
      return ChallengeIdentifier.One_LogoQuiz;
    case ChallengeRouteIdentifier.Two_LogicGates:
      return ChallengeIdentifier.Two_LogicGates;
    case ChallengeRouteIdentifier.Three_Video:
      return ChallengeIdentifier.Three_Video;
    case ChallengeRouteIdentifier.Four_DogCuisine:
      return ChallengeIdentifier.Four_DogCuisine;
    case ChallengeRouteIdentifier.Five_Labyrinth:
      return ChallengeIdentifier.Five_Labyrinth;
    case ChallengeRouteIdentifier.Six_ApartmentTinder:
      return ChallengeIdentifier.Six_ApartmentTinder;
    case ChallengeRouteIdentifier.Seven_SimonSays:
      return ChallengeIdentifier.Seven_SimonSays;
    default:
      return ChallengeIdentifier.One_LogoQuiz;
  }
}
