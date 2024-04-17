import { UniteScreen } from '@/components/shell/screen';
import { FixedButton } from '@/components/ui/fixed-button';
import { Header } from '@/components/ui/header';
import { LogoQuizTile } from '@/components/ui/tile';
import { useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import logo1 from '../../assets/logos/non-descriptive-image-1.png';
import logo10 from '../../assets/logos/non-descriptive-image-10.png';
import logo11 from '../../assets/logos/non-descriptive-image-11.png';
import logo12 from '../../assets/logos/non-descriptive-image-12.png';
import logo13 from '../../assets/logos/non-descriptive-image-13.webp';
import logo14 from '../../assets/logos/non-descriptive-image-14.png';
import logo15 from '../../assets/logos/non-descriptive-image-15.png';
import logo2 from '../../assets/logos/non-descriptive-image-2.png';
import logo3 from '../../assets/logos/non-descriptive-image-3.png';
import logo4 from '../../assets/logos/non-descriptive-image-4.webp';
import logo5 from '../../assets/logos/non-descriptive-image-5.png';
import logo6 from '../../assets/logos/non-descriptive-image-6.webp';
import logo7 from '../../assets/logos/non-descriptive-image-7.png';
import logo8 from '../../assets/logos/non-descriptive-image-8.webp';
import logo9 from '../../assets/logos/non-descriptive-image-9.svg';

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
      <UniteScreen
        background="cool-green"
        Header={<Header title="Logo Quiz" variant="details" style="bg-cool-green" />}
        Footer={
          <FixedButton
            title={`Finalizar ${answers.filter(value => value === 'done')}/${logos.length}`}
            background="bg-white"
            buttonVariant="cool-green"
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
      </UniteScreen>
    </>
  );
}

export default LogoQuizChallenge;
