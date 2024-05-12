import { Header } from '@/components/ui/header';
import { LevelSelector } from '@/components/ui/level-selector';
import { LoaderContext } from '@/shared/loader/LoaderProvider';
import { ModalContext } from '@/shared/modal/ModalProvider';
import { ChallengeIdentifier } from '@/shared/utils/ChallengeIdentifiers';
import { challengeMetadataMap } from '@/shared/utils/challengeMetadata';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAnswerStatus from 'src/hooks/useAnswerStatus';

function ChallengeMap() {
  const { setLoading } = useContext(LoaderContext);
  const { openModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const { statuses, allDone } = useAnswerStatus();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, [setLoading]);

  const goBack = () => {
    navigate(-1);
  };

  const goToChallenge = (id: ChallengeIdentifier) => {
    navigate(`/challenge/${String(Number(id) + 1)}/landing`);
  };

  useEffect(() => {
    if (!allDone) {
      return;
    }
    openModal({
      type: 'success',
      message: 'Obrigado por completar todos os desafios! Clique no X para ver os créditos',
      dismiss: () => {
        navigate('/credits');
      },
    });
  }, [allDone, navigate, openModal]);

  return (
    <>
      <div className="bg-[#EDEDED] min-h-svh">
        <div>
          <Header title="Seu progresso" variant="intro" onBackClick={goBack} style={''} />
        </div>
        {Object.entries(challengeMetadataMap).map(([key, challenge]) => {
          return (
            <LevelSelector
              key={key}
              image={challenge.image}
              label={String(Number(key) + 1)}
              title={challenge.title}
              onClick={() => goToChallenge(key as unknown as ChallengeIdentifier)}
              status={statuses[key as unknown as ChallengeIdentifier]}
              subtitle={challenge.period}
            />
          );
        })}
      </div>
    </>
  );
}

export default ChallengeMap;
