import { AnswersModel } from '@/models/AnswersModel';
import {
  ChallengeIdentifier,
  fromChallengeIdentifierToDBKey,
} from '@/shared/utils/ChallengeIdentifiers';
import { oneWayHash } from '@/shared/utils/oneWayHash';
import { useEffect, useState } from 'react';
import useAllAnswers from './useAllAnswers';

function getUserAnswers(): string[] {
  const answers = localStorage.getItem('answers');
  const tentativeArray = JSON.parse(answers || '[]');
  // invalid array - should not happen unless someone hacked the game
  if (!Array.isArray(tentativeArray)) {
    // forced cleanup
    localStorage.removeItem('answers');
    return [];
  }
  return tentativeArray.map(item => String(item));
}

async function getCompletedQuestionsForChallenge(
  challengeId: ChallengeIdentifier,
  answers: AnswersModel | null | undefined,
): Promise<string[]> {
  const userAnswers = getUserAnswers();
  if (!answers?.answers.length || !userAnswers.length) {
    console.log('empty list of answers or user state');
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

export function useAnswerState(challengeId: ChallengeIdentifier): {
  answeredQuestionIds: string[] | undefined; // questionId
} {
  const answers = useAllAnswers();
  const [answeredQuestionIds, setAnsweredQuestions] = useState<string[] | undefined>(undefined);

  useEffect(() => {
    const fn = async () => {
      const ids = await getCompletedQuestionsForChallenge(challengeId, answers);
      setAnsweredQuestions(ids);
    };
    fn();
  }, [answers, challengeId]);

  return {
    answeredQuestionIds,
  };
}
