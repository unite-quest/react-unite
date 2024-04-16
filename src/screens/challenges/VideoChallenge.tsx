import { UniteScreen } from '@/components/shell/screen';
import { FixedButton } from '@/components/ui/fixed-button';
import { Header } from '@/components/ui/header';
import { ListItem } from '@/components/ui/list-item';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions: { question: string }[] = [
  {
    question: 'Qual o nome do gabriel?',
  },
  {
    question: 'test11',
  },
  {
    question: 'test12',
  },
  {
    question: 'test13',
  },
  {
    question: 'test14',
  },
  {
    question: 'test15',
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
      <UniteScreen
        background="beige"
        Header={<Header title="Video Quiz" variant="intro" style="bg-beige" />}
        Footer={
          <FixedButton
            title={`Finalizar (${correctAnswers.length}/${questions.length})`}
            background="bg-white"
            buttonVariant="cool-green"
            onClick={console.log}
            disabled={correctAnswers.length !== questions.length}
          />
        }
      >
        <div>
          <div className="pt-6 pb-6 text-left">
            <span>Você deve selecionar cada um dos itens abaixo e acertar a respectiva marca.</span>
          </div>
          <iframe
            className="w-full h-48 rounded-md"
            src="https://www.youtube.com/embed/XJMzbCjA0aI?si=1_yRhPM96YowHpFJ"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
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
      </UniteScreen>
    </>
  );
}

export default LogoQuizChallenge;
