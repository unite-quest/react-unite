import { ChallengeFooter } from '@/components/shell/ChallengeFooter';
import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
import { UniteRadio } from '@/components/ui/radio';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

type VideoAnswerMetadata = {
  title: string;
  description: string;
  alternatives: string[];
  tip: string;
};

const answerMetadataForQuestion: VideoAnswerMetadata[] = [
  {
    title: 'Pergunta 1/8',
    description: 'Qual o nome do Gabriel?',
    alternatives: [
      'Gahbriel',
      'Gabriel Takaoka Nishimura, aluno de terceira chamada',
      'Gah',
      'Gabi',
    ],
    tip: 'Preste atenção no nome do canal',
  },
  {
    title: 'Pergunta 2/8',
    description: 'Qual o nome da bebida?',
    alternatives: [
      'Orion beer',
      'Orion',
      'Premium draft beer',
      "Orion's original brew premium draft beer",
    ],
    tip: 'Como é o nome que o Gabriel falou durante o vídeo',
  },
  {
    title: 'Pergunta 3/8',
    description: 'Qual o número do episódio?',
    alternatives: ['1', '2', '3', '4'],
    tip: 'Olhe o título do vídeo',
  },
  {
    title: 'Pergunta 4/8',
    description: 'Quem está entrevistando o Gabriel?',
    alternatives: ['Roberta', 'Mimi/Vi', 'Raquel', 'Consuelo'],
    tip: 'A Consuelo não fala',
  },
  {
    title: 'Pergunta 5/8',
    description: 'Qual a nota que o Gabriel de para bebida?',
    alternatives: ['4.7', '4.8', '4.9', '5.0'],
    tip: 'Essa é fácil demais, você não merece uma dica',
  },
  {
    title: 'Pergunta 6/8',
    description: 'Qual a cor das duas almofadas atrás do Gabriel?',
    alternatives: ['Amarela e preta', 'Verde e preta', 'Amarela e cinza', 'Verde e cinza'],
    tip: 'Para as pessoas que não conseguem ver as cores: Verde e preta',
  },
  {
    title: 'Pergunta 7/8',
    description: 'Onde o Gabriel estava?',
    alternatives: ['Califórnia', 'São Paulo', 'Okinawa', 'Tóquio'],
    tip: 'O primeiro vídeo soltado no canal tem o mesmo fundo e é mencionado onde o Gabriel está',
  },
  {
    title: 'Pergunta 8/8',
    description: 'Quantas vezes o Gabriel tentou abrir a tampa?',
    alternatives: ['14', '15', '16', '17'],
    tip: 'Boa sorte contando',
  },
];

function VideoChallengeDetails() {
  const navigate = useNavigate();
  const { challengeId } = useParams();
  const { state } = useLocation();
  const [answer, setAnswer] = useState<string>('');

  const submitAnswer = () => {
    navigate(`../challenge/${challengeId}`, {
      relative: 'route',
    });
  };

  if (state?.questionId === undefined || !answerMetadataForQuestion[state.questionId]) {
    throw new Error('invalid question id');
  }

  const answerMeta = answerMetadataForQuestion[state.questionId];

  return (
    <>
      <ChallengeScreen
        Footer={
          <ChallengeFooter title="Submeter palpite" onClick={submitAnswer} disabled={!answer} />
        }
      >
        <div>
          <div className="pt-6 text-left">
            <span>{answerMeta.title}</span>
          </div>
          <div className="pt-6 pb-6 text-left">
            <span>{answerMeta.description}</span>
          </div>
          <div className="w-full divide-y">
            <UniteRadio
              options={answerMeta.alternatives}
              onSelect={setAnswer}
              selectedValue={answer}
            />
          </div>
        </div>
      </ChallengeScreen>
    </>
  );
}

export default VideoChallengeDetails;
