import { ChallengeFooter } from '@/components/shell/ChallengeFooter';
import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
import { ListItem } from '@/components/ui/list-item';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  // [0] means the first question has a correct answer
  const [correctAnswers, setCorrectAnswers] = useState<Array<number>>([]);

  useEffect(() => {
    const fn = async () => {
      // get api data
      console.log('add refetch logic to prefill answers');
      setCorrectAnswers([1]);
    };
    fn();
    // anytime navigating?
  }, []);

  const onOpenQuestion = (index: number) => {
    console.log('TODO video question', index);
    navigate('./details', {
      state: {
        questionId: index,
      },
    });
  };

  return (
    <>
      <ChallengeScreen
        Footer={
          <ChallengeFooter
            title={`Finalizar (${correctAnswers.length}/${questions.length})`}
            onClick={console.log}
            disabled={correctAnswers.length !== questions.length}
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
          <div className="pt-6 pb-6 text-left">
            <span>
              Para nos certificar que você assistiu o vídeo atentamente até o fim, responda as
              seguintes perguntas
            </span>
          </div>
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
