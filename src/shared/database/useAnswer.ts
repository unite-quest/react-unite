import { DatabaseService } from './DatabaseService';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useAnswer = () => {
  const answerQuestion = async (
    question: {
      challengeId: string;
      userId: string;
    },
    answer: Record<string, string>,
  ) => {
    const nextChallenge = await DatabaseService.validateAnswersAndGetNextChallenge(
      question.challengeId,
      answer,
    );
    console.log('nextChallenge', nextChallenge);
    if (nextChallenge) {
      DatabaseService.completeChallenge(question.userId, question.challengeId, nextChallenge);
    }
  };
  return {
    answerQuestion,
  };
};
