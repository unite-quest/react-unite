import { AnswersModel } from '@/models/AnswersModel';
import {
  ChallengeIdentifier,
  fromChallengeIdentifierToDBKey,
} from '@/shared/utils/ChallengeIdentifiers';
import { oneWayHash } from '@/shared/utils/oneWayHash';
import { useCallback, useEffect, useState } from 'react';
import useAllAnswers from './useAllAnswers';

function getUserAnswers(): string[] {
  try {
    const answers = localStorage.getItem('answers');
    const tentativeArray = JSON.parse(answers || '[]');
    if (Array.isArray(tentativeArray)) {
      return tentativeArray.map(item => String(item));
    }
  } catch (err) {
    console.log(err);
  }
  // forced cleanup
  // invalid array or error while trying to open local storage - should not happen unless someone hacked the game
  localStorage.removeItem('answers');
  return [];
}

async function getCompletedQuestionsForChallenge(
  challengeId: ChallengeIdentifier,
  answers: AnswersModel | null | undefined,
): Promise<string[]> {
  const userAnswers = getUserAnswers();
  if (!answers?.answers.length || !userAnswers.length) {
    return [];
  }

  const cid = `c${fromChallengeIdentifierToDBKey(challengeId)}`;
  const answersForChallenge = userAnswers.filter(userAnswer => userAnswer.startsWith(cid));
  const hashesForChallenge: {
    plainAnswer: string;
    questionId: string;
  }[] = await Promise.all(
    answersForChallenge
      .filter(async userAnswer => {
        const hash = await oneWayHash(userAnswer);
        const components = userAnswer.replace(`${cid}-q`, '').split('-');

        return answers.answers.includes(hash) && components.length === 2;
      })
      .map(async userAnswer => {
        // given format is correct we can assume questionId is the first in the array
        const [questionId] = userAnswer.replace(`${cid}-q`, '').split('-');
        return {
          questionId,
          plainAnswer: userAnswer,
        };
      }),
  );

  return hashesForChallenge.map(i => i.questionId);
}

export function useAnswerState(
  challengeId: ChallengeIdentifier,
  config: { scrambledInviteList: boolean } = { scrambledInviteList: false },
): {
  answeredQuestionIds: string[] | undefined; // questionId
  refetchAnsweredQuestions: () => Promise<void>;
} {
  const answers = useAllAnswers(config);
  const [answeredQuestionIds, setAnsweredQuestions] = useState<string[] | undefined>(undefined);

  const refetchAnsweredQuestions = useCallback(async () => {
    const ids = await getCompletedQuestionsForChallenge(challengeId, answers);
    setAnsweredQuestions(ids);
  }, [answers, challengeId]);

  useEffect(() => {
    refetchAnsweredQuestions();
  }, [refetchAnsweredQuestions]);

  return {
    answeredQuestionIds,
    refetchAnsweredQuestions,
  };
}
