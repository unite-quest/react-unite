import { AnswersModel } from '@/models/AnswersModel';
import { oneWayHash } from './oneWayHash';

export async function validateAnswer(
  dbAnswers: AnswersModel,
  questionId: string,
  appAnswer: string,
): Promise<boolean> {
  const hashedAnswer = await oneWayHash(`${questionId}${appAnswer}`);
  console.log('hashed answer', hashedAnswer);
  if (dbAnswers.answer.type === 'array') {
    return dbAnswers.answer.data.includes(hashedAnswer);
  }
  return false;
}
