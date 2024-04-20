import { ChallengeFooter } from '@/components/shell/ChallengeFooter';
import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
import { UniteToggle } from '@/components/ui/toggle';
import { ChallengeRouteIdentifier } from '@/shared/utils/ChallengeIdentifiers';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const todaysMenu: { image: string; itemName: string }[] = [
  {
    image: 'https://gabrieltnishimura.github.io/unite/Chocolate_Cake.png',
    itemName: 'Chocolate',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Egg.png',
    itemName: 'Maça',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Mango.png',
    itemName: 'Teste',
  },
];

function DogCuisineChallenge() {
  const navigate = useNavigate();
  const [menuSelection, setMenuSelection] = useState<Record<number, boolean>>({});

  const changeMenuSelection = (index: number, state: boolean) => {
    setMenuSelection({
      ...menuSelection,
      [index]: state,
    });
  };

  const goToNextChallenge = () => {
    navigate(`/challenge/${ChallengeRouteIdentifier.Five_Labyrinth}/landing`);
  };

  return (
    <>
      <ChallengeScreen
        Footer={
          <ChallengeFooter
            title={`Submeter Palpite`}
            onClick={goToNextChallenge}
            disabled={false}
          />
        }
      >
        <div>
          <div className="pt-6 pb-12 text-left">
            <span>
              Para que os dogs permaneçam saudáveis, você precisa indicar quais comidas eles estão
              permitidos a comer. Cuidado para não errar! Caso inverta algum item, você deverá
              começar tudo de novo.
            </span>
          </div>
          <div className="w-full">
            {todaysMenu.map(({ image, itemName }, index) => {
              return (
                <UniteToggle
                  image={image}
                  key={itemName}
                  label={itemName}
                  onChange={state => changeMenuSelection(index, state)}
                  state={menuSelection[index]}
                />
              );
            })}
          </div>
        </div>
      </ChallengeScreen>
    </>
  );
}

export default DogCuisineChallenge;
