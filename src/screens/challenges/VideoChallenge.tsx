import { UniteScreen } from '@/components/shell/screen';
import { FixedButton } from '@/components/ui/fixed-button';
import { Header } from '@/components/ui/header';
import { ListItem } from '@/components/ui/list-item';
import { useState } from 'react';

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
  // [0] means the first question has a correct answer
  const [correctAnswers] = useState<Array<number>>([1]);

  const onOpenQuestion = (index: number) => {
    console.log('TODO video question', index);
  };

  return (
    <>
      <UniteScreen
        background="beige"
        Header={<Header title="Video Quiz" variant="intro" style="bg-beige" />}
        Footer={
          <FixedButton
            title={`Finalizar ${correctAnswers.length}/${questions.length}`}
            variant="white"
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
/*
.item {
   margin-top: 10px;
   border-top: 1px solid black;
   padding-top: 10px;
}

.item:first-child {
   margin-top: 0;
   border-top: none;
   padding-top: 0;
}*/

export default LogoQuizChallenge;
