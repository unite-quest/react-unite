import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
import { SimonSaysTile } from '@/components/ui/tile';
import { ChallengeRouteIdentifier } from '@/shared/utils/ChallengeIdentifiers';
import { corgiPosesMap } from '@/shared/utils/corgiPosesMap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SimonSaysChallenge() {
  const [answers, setAnswers] = useState<number[]>([]);
  const correctAnswers = [0, 1, 2, 3];
  const navigate = useNavigate();
  const goToNextChallenge = () => {
    navigate(`/challenge/${ChallengeRouteIdentifier.Two_LogicGates}/landing`);
  };
  return (
    <>
      <ChallengeScreen Footer={<div></div>}>
        <div>
          <div className="pt-6 pb-6 text-left">
            Repita a ordem apresentada na tela anterior. No rodapé, apresentamos a barra de
            progresso para concluir esse desafio.
          </div>
          <div className="grid grid-cols-2 gap-4">
            {corgiPosesMap.map(corgi => {
              return (
                <SimonSaysTile
                  key={corgi.poseId}
                  onClick={() => setAnswers(prevArray => [...prevArray, corgi.poseId])}
                  image={corgi.image}
                  bg={corgi.bg}
                />
              );
            })}
          </div>
        </div>
      </ChallengeScreen>
    </>
  );
}

export default SimonSaysChallenge;
