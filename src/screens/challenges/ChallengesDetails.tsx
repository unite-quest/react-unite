import { LoaderContext } from '@/shared/loader/LoaderProvider';
import { ChallengeIdentifier } from '@/shared/utils/ChallengeIdentifiers';
import React, { Suspense, useContext, useEffect } from 'react';
import { useCurrentChallenge } from '../../hooks/useCurrentChallenge';

function ChallengesDetails() {
  const { setLoading } = useContext(LoaderContext);
  const { id: challengeId } = useCurrentChallenge();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, [setLoading]);

  const LogoQuizChallengeDetails = React.lazy(() => import('./details/LogoQuizChallengeDetails'));
  const LogicGatesChallenge = React.lazy(() => import('./LogicGatesChallenge'));
  const VideoChallengeDetails = React.lazy(() => import('./details/VideoChallengeDetails'));

  const Challenges: Record<ChallengeIdentifier, { component: JSX.Element }> = {
    [ChallengeIdentifier.One_LogoQuiz]: {
      component: <LogoQuizChallengeDetails />,
    },
    [ChallengeIdentifier.Two_LogicGates]: {
      component: <LogicGatesChallenge />,
    },
    [ChallengeIdentifier.Three_Video]: {
      component: <VideoChallengeDetails />,
    },
    [ChallengeIdentifier.Four_DogCuisine]: {
      component: <VideoChallengeDetails />,
    },
    [ChallengeIdentifier.Five_Labyrinth]: {
      component: <VideoChallengeDetails />,
    },
    [ChallengeIdentifier.Six_ApartmentTinder]: {
      component: <VideoChallengeDetails />,
    },
    [ChallengeIdentifier.Seven_SimonSays]: {
      component: <VideoChallengeDetails />,
    },
  };

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>{Challenges[challengeId].component}</Suspense>
    </>
  );
}

export default ChallengesDetails;
