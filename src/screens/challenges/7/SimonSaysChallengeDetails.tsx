import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
import { SimonSaysTile } from '@/components/ui/tile';
import { UniteText } from '@/components/ui/unite-text';
import { ModalContext } from '@/shared/modal/ModalProvider';
import { ChallengeRouteIdentifier } from '@/shared/utils/ChallengeIdentifiers';
import { corgiChallengeLevels, corgiPosesMap } from '@/shared/utils/corgiPosesMap';
import { validateAndPersistAnswer } from '@/shared/utils/validateAnswer';
import { useContext, useEffect, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import useAllAnswers from 'src/hooks/useAllAnswers';
import { useAnswerState } from 'src/hooks/useAnswerState';
import { useCurrentChallenge } from 'src/hooks/useCurrentChallenge';
import { useCurrentQuestion } from 'src/hooks/useCurrentQuestion';

function SimonSaysChallenge() {
  const { openModal } = useContext(ModalContext);
  const { id: challengeId } = useCurrentChallenge();
  const { id: questionId } = useCurrentQuestion();
  const [answers, setAnswers] = useState<number[]>([]);
  const currentLevel = corgiChallengeLevels[questionId];
  const dbAnswers = useAllAnswers();
  const { answeredQuestionIds, refetchAnsweredQuestions } = useAnswerState(challengeId);

  const totalLength = currentLevel.tricks.length;
  const navigate = useNavigate();

  useEffect(() => {
    if (currentLevel.tricks.length !== answers.length || !dbAnswers) {
      // don't validate if not fully responded yet
      return;
    }
    const fn = async () => {
      const answerString = answers.join('|');
      const { valid } = await validateAndPersistAnswer(
        dbAnswers,
        challengeId,
        String(questionId + 1),
        answerString,
      );
      await refetchAnsweredQuestions();
      if (!valid) {
        setAnswers([]);
        openModal({
          type: 'failure',
          message:
            'Resposta incorreta! Tente novamente (e se quiser ver a sequência novamente aperte no botão voltar =)',
        });
        return;
      }
    };
    fn();
  }, [
    answers,
    challengeId,
    currentLevel.tricks.length,
    dbAnswers,
    openModal,
    questionId,
    refetchAnsweredQuestions,
  ]);

  useEffect(() => {
    if (!answeredQuestionIds?.length) {
      return;
    }

    if (!answeredQuestionIds.includes(String(questionId + 1))) {
      // incorrect answer
      return;
    }

    // last answer
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
  }, [answeredQuestionIds, navigate, openModal, questionId]);

  return (
    <>
      <ChallengeScreen
        description="Repita a ordem apresentada na tela anterior. No rodapé, apresentamos a barra de progresso para concluir esse desafio."
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
                <UniteText weight="bold" textStyle="text-white" align="center">
                  {answers.length} / {totalLength}
                </UniteText>
              </div>
            </div>
          </>
        }
      >
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
      </ChallengeScreen>
    </>
  );
}

export default SimonSaysChallenge;
