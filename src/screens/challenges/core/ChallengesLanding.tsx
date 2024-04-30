import { ChallengeFooter } from '@/components/shell/ChallengeFooter';
import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
import { InsetSpacing } from '@/components/ui/inset-spacing';
import { StackSpacing } from '@/components/ui/stack-spacing';
import { UniteText, UniteTitle } from '@/components/ui/unite-text';
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
      if (nextQuestionId === null) {
        navigate('/credits');
        return;
      }

      navigate({
        pathname: `/challenge/${ChallengeRouteIdentifier.Eight_TornInvite}`,
        search: createSearchParams({
          id: String(nextQuestionId),
        }).toString(),
      });
      return;
    } else if (id === ChallengeIdentifier.Seven_SimonSays) {
      navigate({
        pathname: `/challenge/${ChallengeRouteIdentifier.Seven_SimonSays}`,
        search: createSearchParams({
          id: '0',
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
        <UniteTitle align="left">{challenge.title}</UniteTitle>
        <StackSpacing size="sm" />
        <UniteText>{challenge.description}</UniteText>
        <StackSpacing size="lg" />
        <InsetSpacing size="md">
          <div className="flex justify-center">
            <img
              height={250}
              width={250}
              className="rotate-[4deg] border-8 border-white"
              src={challenge.image}
            />
          </div>
        </InsetSpacing>
      </ChallengeScreen>
    </>
  );
}

export default ChallengeLanding;
