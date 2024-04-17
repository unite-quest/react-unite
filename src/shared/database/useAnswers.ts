import { ChallengeIdentifier, fromChallengeIdentifierToDBKey } from '../utils/ChallengeIdentifiers';

const getDb = () => import('./DatabaseService');

export const useAnswers = () => {
  const getAnswersForQuestion = async (
    question: {
      challengeId: ChallengeIdentifier;
      questionId: number;
    },
    answer: string,
  ): Promise<boolean> => {
    const db = (await getDb()).DatabaseService;
    const key = fromChallengeIdentifierToDBKey(question.challengeId);
    const foundAnswer = await db.getAnswersForQuestion(key, String(question.questionId));
    if (!foundAnswer) {
      return false;
    }
    const dbAnswer = foundAnswer.answer;
    if (dbAnswer.type === 'array' && dbAnswer.data) {
      return dbAnswer.data.includes(answer);
    }
    return false;
  };
  return {
    getAnswersForQuestion,
  };
};
