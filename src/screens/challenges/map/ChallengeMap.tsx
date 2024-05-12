import { Header } from '@/components/ui/header';
import { LevelSelector } from '@/components/ui/level-selector';
import { LoaderContext } from '@/shared/loader/LoaderProvider';
import { ChallengeIdentifier } from '@/shared/utils/ChallengeIdentifiers';
import { challengeMetadataMap } from '@/shared/utils/challengeMetadata';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ChallengeMap() {
  const { setLoading } = useContext(LoaderContext);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, [setLoading]);

  const goBack = () => {
    navigate(-1);
  };

  const statuses: Record<ChallengeIdentifier, 'todo' | 'doing' | 'done'> = {
    [ChallengeIdentifier.One_LogoQuiz]: 'done',
    [ChallengeIdentifier.Two_LogicGates]: 'done',
    [ChallengeIdentifier.Three_Video]: 'done',
    [ChallengeIdentifier.Four_DogCuisine]: 'doing',
    [ChallengeIdentifier.Five_Labyrinth]: 'todo',
    [ChallengeIdentifier.Six_ApartmentTinder]: 'todo',
    [ChallengeIdentifier.Seven_SimonSays]: 'todo',
    [ChallengeIdentifier.Eight_TornInvite]: 'todo',
  };

  const goToChallenge = (id: ChallengeIdentifier) => {
    navigate(`/challenge/${String(Number(id) + 1)}/landing`);
  };

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
