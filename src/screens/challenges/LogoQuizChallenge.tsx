import { ChallengeFooter } from '@/components/shell/ChallengeFooter';
import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
import { LogoQuizTile } from '@/components/ui/tile';
import { LoaderContext } from '@/shared/loader/LoaderProvider';
import { logoMap } from '@/shared/utils/logoMap';
import { useContext, useEffect, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import useLoadAnswerForCurrentChallenge from 'src/hooks/useLoadAnswerForCurrentChallenge';

function LogoQuizChallenge() {
  const { setLoading } = useContext(LoaderContext);
  const [answers] = useState<Array<'todo' | 'done'>>(Array(15).fill('todo'));
  const navigate = useNavigate();
  const answer = useLoadAnswerForCurrentChallenge();

  const goToLogoDetailedScreen = (index: number) => {
    navigate({
      pathname: 'details',
      search: createSearchParams({
        id: String(index),
      }).toString(),
    });
  };

  useEffect(() => {
    if (answer === undefined) {
      return;
    }

    setLoading(false);
  }, [setLoading, answer]);

  return (
    <>
      <ChallengeScreen
        Footer={
          <ChallengeFooter
            title={`Finalizar ${answers.filter(value => value === 'done')}/${logoMap.length}`}
            onClick={console.log}
            disabled={answers.filter(value => value === 'done').length !== logoMap.length}
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
                  variant={answers[index]}
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
