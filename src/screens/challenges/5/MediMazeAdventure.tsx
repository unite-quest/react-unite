import { ChallengeFooter } from '@/components/shell/ChallengeFooter';
import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
import { StackSpacing } from '@/components/ui/stack-spacing';
import { UniteText, UniteTitle } from '@/components/ui/unite-text';
import { LoaderContext } from '@/shared/loader/LoaderProvider';
import { mazeTutorial } from '@/shared/utils/maze/mazeLevelMetadata';
import { useContext, useEffect } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useCurrentQuestion } from 'src/hooks/useCurrentQuestion';

function MediMazeAdventure() {
  const { setLoading } = useContext(LoaderContext);
  const navigate = useNavigate();
  const { id: questionId } = useCurrentQuestion();
  const tutorial = mazeTutorial[questionId];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [setLoading]);

  const submit = () => {
    navigate({
      pathname: 'details',
      search: createSearchParams({
        id: String(questionId),
      }).toString(),
    });
  };

  if (!tutorial) {
    throw new Error('Invalid tutorial');
  }

  return (
    <>
      <ChallengeScreen Footer={<ChallengeFooter title="Ir para o desafio" onClick={submit} />}>
        <UniteTitle>{tutorial.title}</UniteTitle>
        <StackSpacing size="sm" />
        <UniteText>{tutorial.description}</UniteText>
        <StackSpacing size="sm" />
        <div className="flex justify-center">
          <img className="shadow rounded-lg" height={250} width={400} src={tutorial.image} />
        </div>
        <StackSpacing size="lg" />
      </ChallengeScreen>
    </>
  );
}

export default MediMazeAdventure;
