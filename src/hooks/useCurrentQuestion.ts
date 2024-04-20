import { useSearchParams } from 'react-router-dom';

export function useCurrentQuestion(): {
  id: number;
} {
  const [params] = useSearchParams();
  const questionId = params.get('id') || '0';

  return {
    id: Number(questionId),
  };
}
