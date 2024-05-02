import { LoaderContext } from '@/shared/loader/LoaderProvider';
import { ChallengeIdentifier } from '@/shared/utils/ChallengeIdentifiers';
import React, { Suspense, useContext, useEffect } from 'react';
import { useCurrentChallenge } from 'src/hooks/useCurrentChallenge';
import TornInvite from '../8/TornInvite';

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
  const MediMazeAdventure = React.lazy(() => import('../5/MediMazeAdventure'));
  const RentalRumble = React.lazy(() => import('../6/RentalRumble'));
  const SimonSaysChallenge = React.lazy(() => import('../7/SimonSaysChallenge'));

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
      component: <MediMazeAdventure />,
    },
    [ChallengeIdentifier.Six_ApartmentTinder]: {
      component: <RentalRumble />,
    },
    [ChallengeIdentifier.Seven_SimonSays]: {
      component: <SimonSaysChallenge />,
    },
    [ChallengeIdentifier.Eight_TornInvite]: {
      component: <TornInvite />,
    },
  };

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>{Challenges[challengeId].component}</Suspense>
    </>
  );
}

export default Challenges;
