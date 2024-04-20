import { ChallengeFooter } from '@/components/shell/ChallengeFooter';
import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
import { LogoQuizTile } from '@/components/ui/tile';
import { LoaderContext } from '@/shared/loader/LoaderProvider';
import { logoMap } from '@/shared/utils/logoMap';
import { useContext, useEffect, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useAnswerState } from 'src/hooks/useAnswerState';
import { useCurrentChallenge } from 'src/hooks/useCurrentChallenge';

function LogoQuizChallenge() {
  const { setLoading } = useContext(LoaderContext);
  const [answers, setAnswers] = useState<boolean[]>(Array(logoMap.length).fill(false));
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
            title={`Finalizar ${answers.filter(value => !!value)}/${logoMap.length}`}
            onClick={console.log}
            disabled={answers.filter(value => !value).length !== logoMap.length}
          />
        }
      >
        <div>
          <div className="pt-6 pb-6 text-left">
            <span>Selecione cada um dos jogos abaixo e descubra o nome.</span>
          </div>
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
        </div>
      </ChallengeScreen>
    </>
  );
}

export default LogoQuizChallenge;
