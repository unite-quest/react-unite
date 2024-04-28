import { ChallengeFooter } from '@/components/shell/ChallengeFooter';
import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
import { LoaderContext } from '@/shared/loader/LoaderProvider';
import { ChallengeIdentifier, ChallengeRouteIdentifier } from '@/shared/utils/ChallengeIdentifiers';
import { useContext, useEffect } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import useTornInviteMetadata from 'src/hooks/useTornInviteMetadata';
import { useCurrentChallenge } from '../../../hooks/useCurrentChallenge';

function ChallengeLanding() {
  const { setLoading } = useContext(LoaderContext);
  const navigate = useNavigate();
  const { meta: challenge, id } = useCurrentChallenge();
  const { nextQuestionId } = useTornInviteMetadata();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, [setLoading]);

  const submit = () => {
    if (id === ChallengeIdentifier.Eight_TornInvite) {
      navigate({
        pathname: `/challenge/${ChallengeRouteIdentifier.Eight_TornInvite}`,
        search: createSearchParams({
          id: String(nextQuestionId),
        }).toString(),
      });
      return;
    }
    navigate('..', {
      relative: 'path',
    });
  };

  return (
    <>
      <ChallengeScreen
        Footer={<ChallengeFooter title="Começar desafio" onClick={submit} withArrow />}
      >
        <div className="text-left">
          <span className="font-pt-serif font-bold text-5xl block pb-6">{challenge.title}</span>
          <span className="font-roboto text-lg block">{challenge.description}</span>
          <div className="flex justify-center pt-10  p-10">
            <img className="rotate-[4deg] border-8 border-white" src={challenge.image} />
          </div>
        </div>
      </ChallengeScreen>
    </>
  );
}

export default ChallengeLanding;
