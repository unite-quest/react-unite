import { ChallengeIdentifier } from '@/shared/utils/ChallengeIdentifiers';
import { corgiChallengeLevels } from '@/shared/utils/corgiPosesMap';
import { rentalRumbleApartments } from '@/shared/utils/rentalRumbleApartments';
import { useEffect, useState } from 'react';
import { LOGO_QUIZ_MINIMUM_ANSWERS } from 'src/screens/challenges/1/LogoQuizChallenge';
import { VIDEO_CHALLENGE_QUESTIONS_LENGTH } from 'src/screens/challenges/3/VideoChallenge';
import { DOG_CUISINE_QUESTIONS_LENGTH } from 'src/screens/challenges/4/DogCuisineChallenge';
import { MAZE_QUESTIONS_LENGTH } from 'src/screens/challenges/5/MediMazeAdventureDetails';
import { useAnswerState, useLooseAnswerState } from './useAnswerState';
import { TORN_INVITE_MAX_GUESSES } from './useTornInviteMetadata';

enum AnswerStatus {
  TODO = 'todo',
  DOING = 'doing',
  DONE = 'done',
}
export default function useAnswerStatus(): {
  statuses: Record<ChallengeIdentifier, AnswerStatus>;
  allDone: boolean;
} {
  const [allDone, setAllDone] = useState(false);
  const { answeredQuestionIds: c1 } = useAnswerState(ChallengeIdentifier.One_LogoQuiz);
  const { answeredQuestionIds: c2 } = useLooseAnswerState(ChallengeIdentifier.Two_LogicGates);
  const { answeredQuestionIds: c3 } = useAnswerState(ChallengeIdentifier.Three_Video);
  const { answeredQuestionIds: c4 } = useAnswerState(ChallengeIdentifier.Four_DogCuisine);
  const { answeredQuestionIds: c5 } = useLooseAnswerState(ChallengeIdentifier.Five_Labyrinth);
  const { answeredQuestionIds: c6 } = useAnswerState(ChallengeIdentifier.Six_ApartmentTinder);
  const { answeredQuestionIds: c7 } = useAnswerState(ChallengeIdentifier.Seven_SimonSays);
  const { answeredQuestionIds: c8 } = useAnswerState(ChallengeIdentifier.Eight_TornInvite, {
    scrambledInviteList: true,
  });

  const [statuses, setStatuses] = useState<Record<ChallengeIdentifier, AnswerStatus>>({
    [ChallengeIdentifier.One_LogoQuiz]: AnswerStatus.DOING,
    [ChallengeIdentifier.Two_LogicGates]: AnswerStatus.TODO,
    [ChallengeIdentifier.Three_Video]: AnswerStatus.TODO,
    [ChallengeIdentifier.Four_DogCuisine]: AnswerStatus.TODO,
    [ChallengeIdentifier.Five_Labyrinth]: AnswerStatus.TODO,
    [ChallengeIdentifier.Six_ApartmentTinder]: AnswerStatus.TODO,
    [ChallengeIdentifier.Seven_SimonSays]: AnswerStatus.TODO,
    [ChallengeIdentifier.Eight_TornInvite]: AnswerStatus.TODO,
  });

  useEffect(() => {
    const storedAnswers = [
      c1?.length,
      c2?.length,
      c3?.length,
      c4?.length,
      c5?.length,
      c6?.length,
      c7?.length,
      c8?.length,
    ];
    const currentAnswer = storedAnswers
      .map((length, index) => ({ length, index }))
      .find(({ length }) => length === 0)?.index;

    const spreadCurrent = currentAnswer
      ? {
          // override with current challenge (fallback to LogoQuiz)
          [currentAnswer]: AnswerStatus.DOING,
        }
      : {};

    if (currentAnswer === undefined && c8?.length === TORN_INVITE_MAX_GUESSES) {
      setAllDone(true);
    }

    setStatuses({
      ...{
        [ChallengeIdentifier.One_LogoQuiz]:
          (c1 || []).length >= LOGO_QUIZ_MINIMUM_ANSWERS ? AnswerStatus.DONE : AnswerStatus.DOING,
        [ChallengeIdentifier.Two_LogicGates]:
          (c2 || []).length > 0 ? AnswerStatus.DONE : AnswerStatus.TODO,
        [ChallengeIdentifier.Three_Video]:
          (c3 || []).length >= VIDEO_CHALLENGE_QUESTIONS_LENGTH
            ? AnswerStatus.DONE
            : AnswerStatus.TODO,
        [ChallengeIdentifier.Four_DogCuisine]:
          (c4 || []).length >= DOG_CUISINE_QUESTIONS_LENGTH ? AnswerStatus.DONE : AnswerStatus.TODO,
        [ChallengeIdentifier.Five_Labyrinth]:
          (c5 || []).length >= MAZE_QUESTIONS_LENGTH ? AnswerStatus.DONE : AnswerStatus.TODO,
        [ChallengeIdentifier.Six_ApartmentTinder]:
          (c6 || []).length >= rentalRumbleApartments.length
            ? AnswerStatus.DONE
            : AnswerStatus.TODO,
        [ChallengeIdentifier.Seven_SimonSays]:
          (c7 || []).length >= corgiChallengeLevels.length ? AnswerStatus.DONE : AnswerStatus.TODO,
        [ChallengeIdentifier.Eight_TornInvite]:
          (c8 || []).length >= TORN_INVITE_MAX_GUESSES ? AnswerStatus.DONE : AnswerStatus.TODO,
      },
      ...spreadCurrent,
    });
  }, [c1, c2, c3, c4, c5, c6, c7, c8]);

  return {
    statuses,
    allDone,
  };
}
