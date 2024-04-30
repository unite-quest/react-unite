import { ChallengeFooter } from '@/components/shell/ChallengeFooter';
import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
import { ListItem } from '@/components/ui/list-item';
import { StackSpacing } from '@/components/ui/stack-spacing';
import { UniteText } from '@/components/ui/unite-text';
import { LoaderContext } from '@/shared/loader/LoaderProvider';
import { ModalContext } from '@/shared/modal/ModalProvider';
import { ChallengeRouteIdentifier } from '@/shared/utils/ChallengeIdentifiers';
import { useCallback, useContext, useEffect, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useAnswerState } from 'src/hooks/useAnswerState';
import { useCurrentChallenge } from 'src/hooks/useCurrentChallenge';

const questions: { question: string }[] = [
  {
    question: 'Qual o nome do Gabriel?',
  },
  {
    question: 'Qual o nome da bebida?', // Orion's original brew premium draft beer
  },
  {
    question: 'Qual o número do episódio?', //3
  },
  {
    question: 'Quem está entrevistando o Gabriel', //Mimi
  },
  {
    question: 'Qual a nota que o Gabriel de para bebida?', //4.7
  },
  {
    question: 'Qual a cor das duas almofadas atrás do Gabriel?', //verde e preto
  },
  {
    question: 'Onde o Gabriel estava?', //episode number one, California
  },
  {
    question: 'Quantas vezes o Gabriel tentou abrir a tampa?', //17
  },
];

function LogoQuizChallenge() {
  const navigate = useNavigate();
  const { setLoading } = useContext(LoaderContext);
  const { openModal } = useContext(ModalContext);

  const { id } = useCurrentChallenge();
  const { answeredQuestionIds } = useAnswerState(id);

  // [0] means the first question has a correct answer
  const [correctAnswers, setCorrectAnswers] = useState<Array<number>>([]);
  const challengeFinished = correctAnswers.length === questions.length;

  const goToNextChallenge = useCallback(() => {
    navigate(`/challenge/${ChallengeRouteIdentifier.Four_DogCuisine}/landing`);
  }, [navigate]);

  useEffect(() => {
    if (answeredQuestionIds === undefined) {
      return;
    }
    setCorrectAnswers(answeredQuestionIds.map(id => Number(id) - 1));
    setLoading(false);
  }, [answeredQuestionIds, setLoading]);

  useEffect(() => {
    if (!challengeFinished) {
      return;
    }
    openModal({
      type: 'challengeCompleted',
      onPrimaryPress: () => {
        goToNextChallenge();
      },
    });
  }, [challengeFinished, goToNextChallenge, openModal]);

  const onOpenQuestion = (index: number) => {
    navigate({
      pathname: 'details',
      search: createSearchParams({
        id: String(index),
      }).toString(),
    });
  };

  return (
    <>
      <ChallengeScreen
        Footer={
          <ChallengeFooter
            title={`Finalizar (${correctAnswers.length}/${questions.length})`}
            onClick={goToNextChallenge}
            disabled={!challengeFinished}
          />
        }
      >
        <div>
          <iframe
            className="w-full h-48 rounded-md"
            src="https://www.youtube.com/embed/XJMzbCjA0aI?si=1_yRhPM96YowHpFJ"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <StackSpacing size="sm" />
          <UniteText>
            Para nos certificar que você assistiu o vídeo atentamente até o fim, responda as
            seguintes perguntas:
          </UniteText>
          <StackSpacing size="sm" />
          <div className="w-full divide-y">
            {questions.map(({ question }, index) => {
              return (
                <ListItem
                  key={question}
                  title={question}
                  onClick={() => onOpenQuestion(index)}
                  checked={correctAnswers.includes(index)}
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
