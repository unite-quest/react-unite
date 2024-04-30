import { ChallengeFooter } from '@/components/shell/ChallengeFooter';
import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
import { UniteRadio } from '@/components/ui/radio';
import { StackSpacing } from '@/components/ui/stack-spacing';
import { UniteText } from '@/components/ui/unite-text';
import { ModalContext } from '@/shared/modal/ModalProvider';
import { validateAndPersistAnswer } from '@/shared/utils/validateAnswer';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAllAnswers from 'src/hooks/useAllAnswers';
import { useCurrentChallenge } from 'src/hooks/useCurrentChallenge';
import { useCurrentQuestion } from 'src/hooks/useCurrentQuestion';

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
  const { openModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const { id: challengeId } = useCurrentChallenge();
  const { id: questionId } = useCurrentQuestion();
  const [answer, setAnswer] = useState<string>('');
  const dbAnswers = useAllAnswers();

  const submitAnswer = async () => {
    if (!dbAnswers) {
      return;
    }

    const { valid } = await validateAndPersistAnswer(
      dbAnswers,
      challengeId,
      String(questionId + 1),
      answer,
      true,
    );
    if (valid) {
      openModal({
        type: 'success',
        message: 'Ótima resposta, continue assim!',
        dismiss: () => {
          navigate(-1);
        },
      });
    } else {
      openModal({
        type: 'failure',
        message: 'Hmmm, não exatamente. Revise sua resposta',
      });
    }
  };

  if (!answerMetadataForQuestion[questionId]) {
    throw new Error('invalid question id');
  }

  const answerMeta = answerMetadataForQuestion[questionId];

  return (
    <>
      <ChallengeScreen
        Footer={<ChallengeFooter title="Submeter" onClick={submitAnswer} disabled={!answer} />}
      >
        <UniteText size="md" weight="bold">
          {answerMeta.title}
        </UniteText>
        <StackSpacing size="sm" />
        <UniteText size="md">{answerMeta.description}</UniteText>
        <StackSpacing size="sm" />
        <div className="w-full divide-y">
          <UniteRadio
            options={answerMeta.alternatives}
            onSelect={setAnswer}
            selectedValue={answer}
          />
        </div>
      </ChallengeScreen>
    </>
  );
}

export default VideoChallengeDetails;
