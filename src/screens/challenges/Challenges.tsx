import { LoaderContext } from '@/shared/loader/LoaderProvider';
import React, { Suspense, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Challenges() {
  const { challengeId: unsanitizedChallengeId } = useParams();
  const challengeId = unsanitizedChallengeId || '1';
  const { setLoading } = useContext(LoaderContext);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, [setLoading]);

  const LogoQuizChallenge = React.lazy(() => import('./LogoQuizChallenge'));
  const LogicGatesChallenge = React.lazy(() => import('./LogicGatesChallenge'));
  const VideoChallenge = React.lazy(() => import('./VideoChallenge'));

  const Challenges: Record<string, { component: JSX.Element }> = {
    '1': { component: <LogoQuizChallenge /> },
    '2': { component: <LogicGatesChallenge /> },
    '3': { component: <VideoChallenge /> },
  };

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>{Challenges[challengeId].component}</Suspense>
    </>
  );
}

export default Challenges;
