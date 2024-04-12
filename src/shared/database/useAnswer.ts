const getDb = () => import('../database/DatabaseService');

export const useAnswer = () => {
  const answerQuestion = async (
    question: {
      challengeId: string;
      userId: string;
    },
    answer: Record<string, string>,
  ) => {
    const db = (await getDb()).DatabaseService;
    const nextChallenge = await db.validateAnswersAndGetNextChallenge(question.challengeId, answer);
    console.log('nextChallenge', nextChallenge);
    if (nextChallenge) {
      db.completeChallenge(question.userId, question.challengeId, nextChallenge);
    }
  };
  return {
    answerQuestion,
  };
};
