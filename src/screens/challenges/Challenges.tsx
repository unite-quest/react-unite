import { LoaderContext } from '@/shared/loader/LoaderProvider';
import React, { Suspense, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Challenges() {
  const { challengeId } = useParams();
  const { setLoading } = useContext(LoaderContext);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, [setLoading]);

  const LogoQuizChallenge = React.lazy(() => import('./LogoQuizChallenge'));
  const LogicGatesChallenge = React.lazy(() => import('./LogicGatesChallenge'));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {challengeId === '1' ? <LogoQuizChallenge /> : <LogicGatesChallenge />}
    </Suspense>
  );
}

export default Challenges;
