import { scrambledInviteList } from '@/shared/utils/scrambledInviteList';
import { validateAndPersistAnswer } from '@/shared/utils/validateAnswer';
import { useMemo } from 'react';
import useAllAnswers from './useAllAnswers';
import { useAnswerState } from './useAnswerState';
import { useCurrentChallenge } from './useCurrentChallenge';
import { useCurrentQuestion } from './useCurrentQuestion';

type ChallengeMetadata = {
  currentQuestionId: number;
  alreadyAnswered: boolean;
  totalGuestsSubmitted: number;
  totalGuests: number;
  guestName: string;
  tipForGuestName: string;
  nextQuestionId: number | null | undefined;
  validateAnswer: (userAttempt: string) => Promise<boolean>;
};

export const TORN_INVITE_MAX_GUESSES = 12;

export default function useTornInviteMetadata(): ChallengeMetadata {
  const { id: challengeId } = useCurrentChallenge();
  // technically should start with 0
  const { id: currentQuestionId } = useCurrentQuestion();
  const answers = useAllAnswers({ scrambledInviteList: true });

  const { answeredQuestionIds, refetchAnsweredQuestions } = useAnswerState(challengeId, {
    scrambledInviteList: true,
  });

  const { name: guestName, tip: tipForGuestName } = scrambledInviteList[currentQuestionId];

  const validateAnswer = async (userAttempt: string): Promise<boolean> => {
    if (!answers || currentQuestionId === undefined) {
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
    if (valid) {
      await refetchAnsweredQuestions();
    }
    return valid;
  };

  const nextQuestionId = useMemo(() => {
    if (answeredQuestionIds === undefined) {
      return undefined;
    }

    if (answeredQuestionIds.length === TORN_INVITE_MAX_GUESSES) {
      return null;
    }

    const potentialQuestions = scrambledInviteList
      .map((item, index) => {
        return { item, index };
      })
      .filter(({ index }) => {
        return !(answeredQuestionIds || []).includes(String(index + 1));
      });
    const potentialQuestionsRandomIndex = Math.floor(Math.random() * potentialQuestions.length);
    const newRandomQuestion = potentialQuestions[potentialQuestionsRandomIndex].index;

    return newRandomQuestion;
  }, [answeredQuestionIds]);

  return {
    currentQuestionId,
    alreadyAnswered: (answeredQuestionIds || []).includes(String(currentQuestionId + 1)),
    totalGuestsSubmitted: (answeredQuestionIds || []).length,
    totalGuests: TORN_INVITE_MAX_GUESSES,
    guestName,
    tipForGuestName,
    nextQuestionId,
    validateAnswer,
  };
}
