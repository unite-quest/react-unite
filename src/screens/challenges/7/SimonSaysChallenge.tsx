import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
import { ChallengeRouteIdentifier } from '@/shared/utils/ChallengeIdentifiers';
import { corgiPosesMap } from '@/shared/utils/corgiPosesMap';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SimonSaysChallenge() {
  const [index, setIndex] = useState<number>(0);
  const correctAnswers = [0, 1, 2, 3];
  const [timeLeft, setTimeLeft] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (!timeLeft && index + 1 !== correctAnswers.length) {
      setIndex(index => index + 1);
      setTimeLeft(1);
    } else if (timeLeft === 0) {
      navigate(`/challenge/${ChallengeRouteIdentifier.Seven_SimonSays}/details`);
    }

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return (
    <>
      <ChallengeScreen Footer={<div></div>}>
        <div className={(corgiPosesMap[correctAnswers[index]] || {}).bg + ' h-full'}>
          <img src={(corgiPosesMap[correctAnswers[index]] || {}).image} />
        </div>
      </ChallengeScreen>
    </>
  );
}

export default SimonSaysChallenge;
