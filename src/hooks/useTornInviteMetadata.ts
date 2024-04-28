import { scrambledInviteList } from '@/shared/utils/scrambledInviteList';
import { validateAndPersistAnswer } from '@/shared/utils/validateAnswer';
import useAllAnswers from './useAllAnswers';
import { useAnswerState } from './useAnswerState';
import { useCurrentChallenge } from './useCurrentChallenge';

type ChallengeMetadata = {
  alreadyAnswered: boolean;
  totalGuestsSubmitted: number;
  totalGuests: number;
  guestName: string;
  tipForGuestName: string;
  nextQuestionId: number;
  validateAnswer: (userAttempt: string) => Promise<boolean>;
};

export default function useTornInviteMetadata(currentQuestionId: number): ChallengeMetadata {
  const { id: challengeId } = useCurrentChallenge();
  const answers = useAllAnswers({ scrambledInviteList: true });

  const { answeredQuestionIds } = useAnswerState(challengeId, {
    scrambledInviteList: true,
  });
  if (currentQuestionId === undefined) {
    throw new Error('Invalid questionId');
  }

  const { name: guestName, tip: tipForGuestName } = scrambledInviteList[currentQuestionId];

  const validateAnswer = async (userAttempt: string): Promise<boolean> => {
    if (!answers) {
      throw new Error('Invalid answers list from secret');
    }

    // formatted on hash as such
    const appAnswer = `${guestName}|${userAttempt}`;
    const { valid } = await validateAndPersistAnswer(
      answers,
      challengeId,
      String(currentQuestionId + 1),
      appAnswer,
    );
    return valid;
  };

  const potentialQuestions = scrambledInviteList.filter((_, index) => {
    return !(answeredQuestionIds || []).includes(String(index + 1));
  });
  const randomIndex = Math.floor(Math.random() * potentialQuestions.length);

  return {
    alreadyAnswered: (answeredQuestionIds || []).includes(String(currentQuestionId + 1)),
    totalGuestsSubmitted: (answeredQuestionIds || []).length,
    totalGuests: 30,
    guestName,
    tipForGuestName,
    nextQuestionId: randomIndex,
    validateAnswer,
  };
}
