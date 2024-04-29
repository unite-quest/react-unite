import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
import { SimonSaysTile } from '@/components/ui/tile';
import { ModalContext } from '@/shared/modal/ModalProvider';
import { ChallengeRouteIdentifier } from '@/shared/utils/ChallengeIdentifiers';
import { corgiChallengeLevels, corgiPosesMap } from '@/shared/utils/corgiPosesMap';
import { useContext, useEffect, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useCurrentQuestion } from 'src/hooks/useCurrentQuestion';

function SimonSaysChallenge() {
  const { openModal } = useContext(ModalContext);
  const { id: questionId } = useCurrentQuestion();
  const [answers, setAnswers] = useState<number[]>([]);
  const currentLevel = corgiChallengeLevels[questionId];

  const totalLength = currentLevel.tricks.length;
  const navigate = useNavigate();

  useEffect(() => {
    if (currentLevel.tricks.length !== answers.length) {
      // don't validate if not fully responded yet
      return;
    }

    const correctAnswers = currentLevel.tricks.filter((trick, index) => {
      return trick === answers[index];
    });
    const valid = correctAnswers.length === currentLevel.tricks.length;
    if (!valid) {
      setAnswers([]);
      openModal({
        type: 'failure',
        message:
          'Resposta incorreta! Tente novamente (e se quiser ver a sequência novamente aperte no botão voltar =)',
      });
      return;
    }
    if (corgiChallengeLevels.length === questionId + 1) {
      openModal({
        type: 'success',
        message:
          'Você conseguiu ensinar a Flan! Aperte X para ir para o próximo (e último desafio)!',
        dismiss: () => {
          navigate(`/challenge/${ChallengeRouteIdentifier.Eight_TornInvite}/landing`);
        },
      });
      return;
    }

    openModal({
      type: 'success',
      message: 'Parabéns! Aperte X para ir para o próximo nível',
      dismiss: () => {
        navigate({
          pathname: `/challenge/${ChallengeRouteIdentifier.Seven_SimonSays}`,
          search: createSearchParams({
            id: String(questionId + 1),
          }).toString(),
        });
      },
    });
  }, [answers, currentLevel.tricks, navigate, openModal, questionId]);

  return (
    <>
      <ChallengeScreen
        Footer={
          <>
            <div className="pt-36"></div>
            <div className="fixed bottom-0 w-full">
              <div className={`bg-black p-6`}>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-1">
                  <div
                    className="bg-dark-green h-2.5 rounded-full"
                    style={{ width: `${Math.floor((answers.length / totalLength) * 100)}%` }}
                  ></div>
                </div>
                <span className="font-roboto font-bold text-white">
                  {answers.length} / {totalLength}
                </span>
              </div>
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
