import { LoaderContext } from '@/shared/loader/LoaderProvider';
import { ChallengeIdentifier } from '@/shared/utils/ChallengeIdentifiers';
import React, { Suspense, useContext, useEffect } from 'react';
import { useCurrentChallenge } from 'src/hooks/useCurrentChallenge';

function Challenges() {
  const { setLoading } = useContext(LoaderContext);
  const { id: challengeId } = useCurrentChallenge();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, [setLoading]);

  const LogoQuizChallenge = React.lazy(() => import('../1/LogoQuizChallenge'));
  const LogicGatesChallenge = React.lazy(() => import('../2/LogicGatesChallenge'));
  const VideoChallenge = React.lazy(() => import('../3/VideoChallenge'));
  const DogCuisineChallenge = React.lazy(() => import('../4/DogCuisineChallenge'));

  const Challenges: Record<ChallengeIdentifier, { component: JSX.Element }> = {
    [ChallengeIdentifier.One_LogoQuiz]: {
      component: <LogoQuizChallenge />,
    },
    [ChallengeIdentifier.Two_LogicGates]: {
      component: <LogicGatesChallenge />,
    },
    [ChallengeIdentifier.Three_Video]: {
      component: <VideoChallenge />,
    },
    [ChallengeIdentifier.Four_DogCuisine]: {
      component: <DogCuisineChallenge />,
    },
    [ChallengeIdentifier.Five_Labyrinth]: {
      component: <VideoChallenge />,
    },
    [ChallengeIdentifier.Six_ApartmentTinder]: {
      component: <VideoChallenge />,
    },
    [ChallengeIdentifier.Seven_SimonSays]: {
      component: <VideoChallenge />,
    },
  };

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>{Challenges[challengeId].component}</Suspense>
    </>
  );
}

export default Challenges;
