import { ChallengeFooter } from '@/components/shell/ChallengeFooter';
import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
import { StackSpacing } from '@/components/ui/stack-spacing';
import { LogoQuizTile } from '@/components/ui/tile';
import { LoaderContext } from '@/shared/loader/LoaderProvider';
import { ModalContext } from '@/shared/modal/ModalProvider';
import { ChallengeRouteIdentifier } from '@/shared/utils/ChallengeIdentifiers';
import { logoMap } from '@/shared/utils/logoMap';
import { useCallback, useContext, useEffect, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useAnswerState } from 'src/hooks/useAnswerState';
import { useCurrentChallenge } from 'src/hooks/useCurrentChallenge';

const MINIMUM_ANSWERS = 7;

function LogoQuizChallenge() {
  const navigate = useNavigate();
  const { setLoading } = useContext(LoaderContext);
  const { openModal } = useContext(ModalContext);
  const { id } = useCurrentChallenge();
  const { answeredQuestionIds } = useAnswerState(id);

  const [answers, setAnswers] = useState<boolean[]>(Array(logoMap.length).fill(false));
  const correctAnswers = answers.filter(value => !!value).length;
  const challengeFinished = correctAnswers >= MINIMUM_ANSWERS;

  const goToLogoDetailedScreen = (index: number) => {
    navigate({
      pathname: 'details',
      search: createSearchParams({
        id: String(index),
      }).toString(),
    });
  };

  const goToNextChallenge = useCallback(() => {
    navigate(`/challenge/${ChallengeRouteIdentifier.Two_LogicGates}/landing`);
  }, [navigate]);

  useEffect(() => {
    if (answeredQuestionIds === undefined) {
      return;
    }

    const updatedAnswers: boolean[] = logoMap.reduce<boolean[]>((acc, cur) => {
      if (answeredQuestionIds.includes(cur.questionId)) {
        return [...acc, true];
      }
      return [...acc, false];
    }, []);
    setAnswers(updatedAnswers);

    setLoading(false);
  }, [setLoading, answeredQuestionIds]);

  useEffect(() => {
    if (!challengeFinished) {
      return;
    }

    openModal({
      type: 'success',
      message:
        'Parabéns, você completou esse nível! Pressione Continuar para ir para o próximo desafio, ou X para terminar o nível',
      dismiss: () => {},
      onPrimaryPress: () => {
        goToNextChallenge();
      },
    });
  }, [challengeFinished, goToNextChallenge, openModal]);

  return (
    <>
      <ChallengeScreen
        description="Selecione cada um dos jogos abaixo e descubra o nome."
        Footer={
          <ChallengeFooter
            title={`Finalizar ${correctAnswers}/${MINIMUM_ANSWERS}`}
            disabled={!challengeFinished}
            onClick={goToNextChallenge}
          />
        }
      >
        <div className="grid grid-cols-3 gap-4">
          {logoMap.map((logo, index) => {
            return (
              <LogoQuizTile
                key={logo.image}
                onClick={() => {
                  goToLogoDetailedScreen(index);
                }}
                image={logo.image}
                variant={answers[index] ? 'done' : 'todo'}
              />
            );
          })}
        </div>
        <StackSpacing size="xl" />
      </ChallengeScreen>
    </>
  );
}

export default LogoQuizChallenge;
