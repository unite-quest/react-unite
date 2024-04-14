import { UniteScreen } from '@/components/shell/screen';
import { FixedButton } from '@/components/ui/fixed-button';
import { Header } from '@/components/ui/header';
import { LogoQuizTile } from '@/components/ui/tile';
import { useState } from 'react';

const logos: { image: string; onClick: () => Promise<void> }[] = [
  {
    image: 'test1',
    onClick: async () => {},
  },
  {
    image: 'test2',
    onClick: async () => {},
  },
  {
    image: 'test3',
    onClick: async () => {},
  },
  {
    image: 'test4',
    onClick: async () => {},
  },
  {
    image: 'test5',
    onClick: async () => {},
  },
  {
    image: 'test6',
    onClick: async () => {},
  },
  {
    image: 'test7',
    onClick: async () => {},
  },
  {
    image: 'test8',
    onClick: async () => {},
  },
  {
    image: 'test9',
    onClick: async () => {},
  },
  {
    image: 'test10',
    onClick: async () => {},
  },
  {
    image: 'test11',
    onClick: async () => {},
  },
  {
    image: 'test12',
    onClick: async () => {},
  },
  {
    image: 'test13',
    onClick: async () => {},
  },
  {
    image: 'test14',
    onClick: async () => {},
  },
  {
    image: 'test15',
    onClick: async () => {},
  },
];

function LogoQuizChallenge() {
  const [answers] = useState(0);

  return (
    <>
      <UniteScreen
        background="cool-green"
        Header={<Header title="Logo Quiz" variant="intro" style="bg-cool-green" />}
        Footer={
          <FixedButton
            title={`Finalizar ${answers}/${logos.length}`}
            variant="white"
            onClick={console.log}
            disabled={answers !== logos.length}
          />
        }
      >
        <div>
          <div className="pt-6 pb-6 text-left">
            <span>Você deve selecionar cada um dos itens abaixo e acertar a respectiva marca.</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {logos.map(i => {
              return <LogoQuizTile title={i.image} onClick={i.onClick} key={i.image} />;
            })}
          </div>
        </div>
      </UniteScreen>
    </>
  );
}

export default LogoQuizChallenge;
