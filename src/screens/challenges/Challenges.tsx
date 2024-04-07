import { Button } from '@/components/ui/button';
import { AuthenticationContext } from '@/shared/authentication/AuthenticationProvider';
import { useAnswer } from '@/shared/database/useAnswer';
import { LoaderContext } from '@/shared/loader/LoaderProvider';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Challenges() {
  const { challengeId } = useParams();
  const { setLoading } = useContext(LoaderContext);
  const { user } = useContext(AuthenticationContext);
  const { answerQuestion } = useAnswer();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, [setLoading]);

  console.log(challengeId);

  const getAnswers = async () => {
    if (!user) {
      return;
    }

    await answerQuestion(
      {
        challengeId: 'lncyB9bw8x7WNStyUp7H',
        userId: user.uid,
      },
      {
        q1: '1',
        q2: '2',
      },
    );
    // navigate to next challenge
  };

  return (
    <>
      <Button variant="secondary" onClick={getAnswers}>
        Submit Answer
      </Button>
    </>
  );
}

export default Challenges;
