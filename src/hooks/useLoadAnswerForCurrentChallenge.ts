import { AnswersModel } from '@/models/AnswersModel';
import { AnswerManagerContext } from '@/shared/database/AnswerManagerProvider';
import { useContext, useEffect, useState } from 'react';
import { useCurrentChallenge } from './useCurrentChallenge';

export default function useLoadAnswerForCurrentChallenge(): AnswersModel | null | undefined {
  const { id } = useCurrentChallenge();
  const [answer, setAnswer] = useState<AnswersModel | null | undefined>(undefined);
  const { fetchAnswers } = useContext(AnswerManagerContext);

  useEffect(() => {
    const fn = async () => {
      const data = await fetchAnswers(id);
      setAnswer(data);
    };
    fn();
  }, [fetchAnswers, id]);

  return answer;
}
