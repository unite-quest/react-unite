import { LoaderContext } from '@/shared/loader/LoaderProvider';
import { ChallengeIdentifier } from '@/shared/utils/ChallengeIdentifiers';
import React, { Suspense, useContext, useEffect } from 'react';
import { useCurrentChallenge } from '../../../hooks/useCurrentChallenge';

function ChallengesDetails() {
  const { setLoading } = useContext(LoaderContext);
  const { id: challengeId } = useCurrentChallenge();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, [setLoading]);

  const LogoQuizChallengeDetails = React.lazy(() => import('../1/LogoQuizChallengeDetails'));
  const VideoChallengeDetails = React.lazy(() => import('../3/VideoChallengeDetails'));
  const SimonSaysChallengeDetails = React.lazy(() => import('../7/SimonSaysChallengeDetails'));

  const Challenges: Record<ChallengeIdentifier, { component: JSX.Element }> = {
    [ChallengeIdentifier.One_LogoQuiz]: {
      component: <LogoQuizChallengeDetails />,
    },
    [ChallengeIdentifier.Two_LogicGates]: {
      component: <></>,
    },
    [ChallengeIdentifier.Three_Video]: {
      component: <VideoChallengeDetails />,
    },
    [ChallengeIdentifier.Four_DogCuisine]: {
      component: <></>,
    },
    [ChallengeIdentifier.Five_Labyrinth]: {
      component: <VideoChallengeDetails />,
    },
    [ChallengeIdentifier.Six_ApartmentTinder]: {
      component: <VideoChallengeDetails />,
    },
    [ChallengeIdentifier.Seven_SimonSays]: {
      component: <SimonSaysChallengeDetails />,
    },
  };

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>{Challenges[challengeId].component}</Suspense>
    </>
  );
}

export default ChallengesDetails;
