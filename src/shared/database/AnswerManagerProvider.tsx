import { AnswersModel } from '@/models/AnswersModel';
import React, { PropsWithChildren, createContext, useEffect, useState } from 'react';
import { ChallengeIdentifier } from '../utils/ChallengeIdentifiers';
import { useAnswers } from './useAnswers';

export interface AnswerManagerContextInput {
  fetchAnswers: (challengeId: ChallengeIdentifier) => Promise<AnswersModel | null>;
}

const defaultState: AnswerManagerContextInput = {
  fetchAnswers: () => Promise.resolve(null),
};

export const AnswerManagerContext = createContext<AnswerManagerContextInput>(defaultState);
export const AnswerManagerProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [answerMap, setAnswersMap] = useState<
    Partial<Record<ChallengeIdentifier, AnswersModel | null>> | undefined
  >(undefined);
  const { getAnswersForQuestion } = useAnswers();

  // fetch if not on cache
  const fetchAnswers = async (challengeId: ChallengeIdentifier): Promise<AnswersModel | null> => {
    if (answerMap && answerMap[challengeId]) {
      // should be impossible for this to return null (famous last words)
      return answerMap[challengeId] || null;
    }

    const dbAnswers = await getAnswersForQuestion(challengeId);
    setAnswersMap(previousAnswer => {
      if (!previousAnswer) {
        return {
          [challengeId]: dbAnswers,
        };
      }

      return {
        ...previousAnswer,
        [challengeId]: dbAnswers,
      };
    });

    return dbAnswers;
  };

  useEffect(() => {
    console.log('update answerMap', answerMap);
  }, [answerMap]);

  return (
    <AnswerManagerContext.Provider value={{ fetchAnswers }}>
      {children}
    </AnswerManagerContext.Provider>
  );
};
