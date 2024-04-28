import { AnswersModel } from '@/models/AnswersModel';
import { AnswerManagerContext } from '@/shared/database/AnswerManagerProvider';
import { useContext } from 'react';

export default function useAllAnswers(
  config: { scrambledInviteList: boolean } = { scrambledInviteList: false },
): AnswersModel | null | undefined {
  const { answers, scrambledNames } = useContext(AnswerManagerContext);

  return config.scrambledInviteList ? scrambledNames : answers;
}
