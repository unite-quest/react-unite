import { AnswersModel } from '@/models/AnswersModel';
import { ChallengeIdentifier, fromChallengeIdentifierToDBKey } from '../utils/ChallengeIdentifiers';

const getDb = () => import('./DatabaseService');

export const useAnswers = () => {
  const getAnswersForQuestion = async (
    challengeId: ChallengeIdentifier,
  ): Promise<AnswersModel | null> => {
    const db = (await getDb()).DatabaseService;
    const key = fromChallengeIdentifierToDBKey(challengeId);
    return await db.getAnswersForQuestion(key);
  };
  return {
    getAnswersForQuestion,
  };
};
