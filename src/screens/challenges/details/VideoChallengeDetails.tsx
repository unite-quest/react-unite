import { UniteScreen } from '@/components/shell/screen';
import { FixedButton } from '@/components/ui/fixed-button';
import { Header } from '@/components/ui/header';
import { UniteRadio } from '@/components/ui/radio';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

type VideoAnswerMetadata = {
  title: string;
  description: string;
  alternatives: string[];
};

const answerMetadataForQuestion: VideoAnswerMetadata[] = [
  {
    title: 'Pergunta 1/10',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id euismod odio. Donec varius iaculis est, nec varius justo fringilla vitae. Nam elementum tellus?',
    alternatives: ['Alternativa 1', 'Alternativa 2', 'Alternativa 3', 'Alternativa 4'],
  },
  {
    title: 'Pergunta 2/10',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id euismod odio. Donec varius iaculis est, nec varius justo fringilla vitae. Nam elementum tellus?',
    alternatives: ['Alternativa 1', 'Alternativa 2', 'Alternativa 3', 'Alternativa 4'],
  },
  {
    title: 'Pergunta 3/10',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id euismod odio. Donec varius iaculis est, nec varius justo fringilla vitae. Nam elementum tellus?',
    alternatives: ['Alternativa 1', 'Alternativa 2', 'Alternativa 3', 'Alternativa 4'],
  },
  {
    title: 'Pergunta 4/10',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id euismod odio. Donec varius iaculis est, nec varius justo fringilla vitae. Nam elementum tellus?',
    alternatives: ['Alternativa 1', 'Alternativa 2', 'Alternativa 3', 'Alternativa 4'],
  },
  {
    title: 'Pergunta 5/10',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id euismod odio. Donec varius iaculis est, nec varius justo fringilla vitae. Nam elementum tellus?',
    alternatives: ['Alternativa 1', 'Alternativa 2', 'Alternativa 3', 'Alternativa 4'],
  },
];

function VideoChallengeDetails() {
  const navigate = useNavigate();
  const { challengeId } = useParams();
  const { state } = useLocation();
  const [answer, setAnswer] = useState<string>('');

  const submitAnswer = () => {
    navigate(`../challenge/${challengeId}/challenge`, {
      relative: 'route',
    });
  };

  if (state?.questionId === undefined || !answerMetadataForQuestion[state.questionId]) {
    throw new Error('invalid question id');
  }

  const answerMeta = answerMetadataForQuestion[state.questionId];

  return (
    <>
      <UniteScreen
        background="beige"
        Header={<Header title="Video Quiz" variant="intro" style="bg-beige" />}
        Footer={
          <FixedButton
            title={`Submeter palpite`}
            background="bg-black"
            buttonVariant="black"
            onClick={submitAnswer}
            disabled={!answer}
          />
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
      </UniteScreen>
    </>
  );
}

export default VideoChallengeDetails;
