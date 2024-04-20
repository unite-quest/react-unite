import { AnswersModel } from '@/models/AnswersModel';
import { AnswerManagerContext } from '@/shared/database/AnswerManagerProvider';
import { useContext } from 'react';

export default function useAllAnswers(): AnswersModel | null | undefined {
  const { answers } = useContext(AnswerManagerContext);

  return answers;
}