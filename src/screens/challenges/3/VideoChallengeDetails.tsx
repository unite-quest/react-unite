import { ChallengeFooter } from '@/components/shell/ChallengeFooter';
import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
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
