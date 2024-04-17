import { ChallengeFooter } from '@/components/shell/ChallengeFooter';
import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
import { LogoQuizTile } from '@/components/ui/tile';
import { useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import logo1 from '../../assets/logos/non-descriptive-image-1.png';
import logo10 from '../../assets/logos/non-descriptive-image-10.png';
import logo11 from '../../assets/logos/non-descriptive-image-11.png';
import logo12 from '../../assets/logos/non-descriptive-image-12.png';
import logo13 from '../../assets/logos/non-descriptive-image-13.webp';
import logo14 from '../../assets/logos/non-descriptive-image-14.png';
import logo15 from '../../assets/logos/non-descriptive-image-15.webp';
import logo2 from '../../assets/logos/non-descriptive-image-2.png';
import logo3 from '../../assets/logos/non-descriptive-image-3.png';
import logo4 from '../../assets/logos/non-descriptive-image-4.webp';
import logo5 from '../../assets/logos/non-descriptive-image-5.png';
import logo6 from '../../assets/logos/non-descriptive-image-6.webp';
import logo7 from '../../assets/logos/non-descriptive-image-7.png';
import logo8 from '../../assets/logos/non-descriptive-image-8.webp';
import logo9 from '../../assets/logos/non-descriptive-image-9.svg';

const logos: { image: string }[] = [
  {
    image: logo1,
  },
  {
    image: logo2,
  },
  {
    image: logo3,
  },
  {
    image: logo4,
  },
  {
    image: logo5,
  },
  {
    image: logo6,
  },
  {
    image: logo7,
  },
  {
    image: logo8,
  },
  {
    image: logo9,
  },
  {
    image: logo10,
  },
  {
    image: logo11,
  },
  {
    image: logo12,
  },
  {
    image: logo13,
  },
  {
    image: logo14,
  },
  {
    image: logo15,
  },
];

function LogoQuizChallenge() {
  const [answers] = useState<Array<'todo' | 'done'>>(Array(15).fill('todo'));
  const navigate = useNavigate();

  const goToLogoDetailedScreen = (index: number) => {
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
            title={`Finalizar ${answers.filter(value => value === 'done')}/${logos.length}`}
            onClick={console.log}
            disabled={answers.filter(value => value === 'done').length !== logos.length}
          />
        }
      >
        <div>
          <div className="pt-6 pb-6 text-left">
            <span>Selecione cada um dos jogos abaixo e descubra o nome.</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {logos.map((logo, index) => {
              return (
                <LogoQuizTile
                  key={logo.image}
                  onClick={() => {
                    goToLogoDetailedScreen(index);
                  }}
                  image={logo.image}
                  variant={answers[index]}
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
