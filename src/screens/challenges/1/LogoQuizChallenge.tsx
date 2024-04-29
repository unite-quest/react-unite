import { ChallengeFooter } from '@/components/shell/ChallengeFooter';
import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
import { StackSpacing } from '@/components/ui/stack-spacing';
import { LogoQuizTile } from '@/components/ui/tile';
import { UniteText } from '@/components/ui/unite-text';
import { LoaderContext } from '@/shared/loader/LoaderProvider';
import { ChallengeRouteIdentifier } from '@/shared/utils/ChallengeIdentifiers';
import { logoMap } from '@/shared/utils/logoMap';
import { useContext, useEffect, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useAnswerState } from 'src/hooks/useAnswerState';
import { useCurrentChallenge } from 'src/hooks/useCurrentChallenge';

function LogoQuizChallenge() {
  const { setLoading } = useContext(LoaderContext);
  const [answers, setAnswers] = useState<boolean[]>(Array(logoMap.length).fill(false));
  const correctAnswers = answers.filter(value => !!value).length;
  const navigate = useNavigate();
  const { id } = useCurrentChallenge();
  const { answeredQuestionIds } = useAnswerState(id);

  const goToLogoDetailedScreen = (index: number) => {
    navigate({
      pathname: 'details',
      search: createSearchParams({
        id: String(index),
      }).toString(),
    });
  };

  const goToNextChallenge = () => {
    navigate(`/challenge/${ChallengeRouteIdentifier.Two_LogicGates}/landing`);
  };

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

  return (
    <>
      <ChallengeScreen
        Footer={
          <ChallengeFooter
            title={`Finalizar ${correctAnswers}/${answers.length}`}
            disabled={correctAnswers !== answers.length}
            onClick={goToNextChallenge}
          />
        }
      >
        <UniteText>Selecione cada um dos jogos abaixo e descubra o nome.</UniteText>
        <StackSpacing size="sm" />
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
      </ChallengeScreen>
    </>
  );
}

export default LogoQuizChallenge;
