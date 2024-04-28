import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
import { SimonSaysTile } from '@/components/ui/tile';
import { ChallengeRouteIdentifier } from '@/shared/utils/ChallengeIdentifiers';
import { corgiPosesMap } from '@/shared/utils/corgiPosesMap';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SimonSaysChallenge() {
  const [answers, setAnswers] = useState<number[]>([]);
  const correctAnswers = [0, 1, 2, 3];
  const navigate = useNavigate();

  useEffect(() => {
    if (JSON.stringify(answers) === JSON.stringify(correctAnswers)) {
      navigate(`/challenge/${ChallengeRouteIdentifier.Eight_TornInvite}/landing`);
    }
  });

  return (
    <>
      <ChallengeScreen
        Footer={
          <>
            <div className="pt-36"></div>
            <div className="fixed bottom-0 w-full">
              <div className={`bg-black p-6`}></div>
            </div>
          </>
        }
      >
        <div>
          <div className="pt-6 pb-6 text-left">
            Repita a ordem apresentada na tela anterior. No rodapé, apresentamos a barra de
            progresso para concluir esse desafio.
          </div>
          <div className="grid grid-cols-2 gap-4">
            {corgiPosesMap.map(({ poseId, background, image }) => {
              return (
                <SimonSaysTile
                  key={poseId}
                  onClick={() => setAnswers(prevArray => [...prevArray, poseId])}
                  image={image}
                  bg={background}
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
