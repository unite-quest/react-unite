import { ChallengeFooter } from '@/components/shell/ChallengeFooter';
import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import logo1 from '../../../assets/logos/non-descriptive-image-1.png';
import logo10 from '../../../assets/logos/non-descriptive-image-10.png';
import logo11 from '../../../assets/logos/non-descriptive-image-11.png';
import logo12 from '../../../assets/logos/non-descriptive-image-12.png';
import logo13 from '../../../assets/logos/non-descriptive-image-13.webp';
import logo14 from '../../../assets/logos/non-descriptive-image-14.png';
import logo15 from '../../../assets/logos/non-descriptive-image-15.webp';
import logo2 from '../../../assets/logos/non-descriptive-image-2.png';
import logo3 from '../../../assets/logos/non-descriptive-image-3.png';
import logo4 from '../../../assets/logos/non-descriptive-image-4.webp';
import logo5 from '../../../assets/logos/non-descriptive-image-5.png';
import logo6 from '../../../assets/logos/non-descriptive-image-6.webp';
import logo7 from '../../../assets/logos/non-descriptive-image-7.png';
import logo8 from '../../../assets/logos/non-descriptive-image-8.webp';
import logo9 from '../../../assets/logos/non-descriptive-image-9.svg';

const logos: { image: string; onClick: () => Promise<void>; variant?: 'done' | 'todo' }[] = [
  {
    image: logo1,
    onClick: async () => {},
  },
  {
    image: logo2,
    onClick: async () => {},
  },
  {
    image: logo3,
    onClick: async () => {},
  },
  {
    image: logo4,
    onClick: async () => {},
  },
  {
    image: logo5,
    onClick: async () => {},
  },
  {
    image: logo6,
    onClick: async () => {},
  },
  {
    image: logo7,
    onClick: async () => {},
  },
  {
    image: logo8,
    onClick: async () => {},
  },
  {
    image: logo9,
    onClick: async () => {},
  },
  {
    image: logo10,
    onClick: async () => {},
  },
  {
    image: logo11,
    onClick: async () => {},
  },
  {
    image: logo12,
    onClick: async () => {},
  },
  {
    image: logo13,
    onClick: async () => {},
  },
  {
    image: logo14,
    onClick: async () => {},
  },
  {
    image: logo15,
    onClick: async () => {},
  },
];

function LogoQuizChallenge() {
  const [answer, setAnswer] = useState<string>('');
  const [params] = useSearchParams();
  const questionId = Number(params.get('id') || 0);
  const logo = logos[questionId];

  const submit = () => {
    alert(`Submitted ${answer}`);
  };

  return (
    <>
      <ChallengeScreen
        Footer={<ChallengeFooter title="Submeter palpite" onClick={submit} disabled={!answer} />}
      >
        <div>
          <div className="pt-6 pb-6 text-left">
            <span>Qual o nome desse jogo?</span>
          </div>
          <div className="pb-10">
            <div className="border-4 border-dark-green rounded-lg pb-15 bg-white relative aspect-square">
              <img
                className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
                src={logo.image}
              />
            </div>
          </div>
          <input
            className="relative border-2 border-dark-green w-full h-11 rounded-lg"
            onChange={e => setAnswer(e.target.value)}
          />
        </div>
      </ChallengeScreen>
    </>
  );
}

export default LogoQuizChallenge;
