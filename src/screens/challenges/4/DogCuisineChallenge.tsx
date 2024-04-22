import { ChallengeFooter } from '@/components/shell/ChallengeFooter';
import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
import { UniteToggle } from '@/components/ui/toggle';
import { ModalContext } from '@/shared/modal/ModalProvider';
import { ChallengeRouteIdentifier } from '@/shared/utils/ChallengeIdentifiers';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const todaysMenu: { image: string; itemName: string; answer: boolean; tipWhenWrong: string }[] = [
  {
    image: 'https://gabrieltnishimura.github.io/unite/Chocolate_Cake.png',
    itemName: 'Chocolate',
    answer: false,
    tipWhenWrong: 'Chocolate é veneno',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Egg.png',
    itemName: 'Maça',
    answer: false,
    tipWhenWrong: 'Maça é veneno',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Mango.png',
    itemName: 'Manga',
    answer: true,
    tipWhenWrong: 'Manga é boa',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Beef.png',
    itemName: 'Carne',
    answer: true,
    tipWhenWrong: 'Carne é cheio de proteínas e faz bem para a flora de cachorros.',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Mango.png',
    itemName: 'Manga 3',
    answer: true,
    tipWhenWrong: 'Manga é boa',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Cooked Pork.png',
    itemName: 'Porco',
    answer: true,
    tipWhenWrong: 'Porco bomzão',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Garlic.png',
    itemName: 'Alho',
    answer: false,
    tipWhenWrong: 'Alho faz mal!',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Mango.png',
    itemName: 'Manga 7',
    answer: true,
    tipWhenWrong: 'Manga é boa',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Grape.png',
    itemName: 'Uva',
    answer: false,
    tipWhenWrong: 'Uva faz mal',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Leek.png',
    itemName: 'Alho poró',
    answer: false,
    tipWhenWrong: 'Alho poró do mal',
  },
];

const mochiGrowthFeedback: Record<number, { message: string; image: string }> = {
  1: {
    message: 'Mochi está pequeno e não gostou de quase nada!',
    image: 'https://gabrieltnishimura.github.io/unite/mochi/mochi-1.webp',
  },
  2: {
    message: 'Mochi está mediano',
    image: 'https://gabrieltnishimura.github.io/unite/mochi/mochi-2.webp',
  },
  3: {
    message: 'Mochi está ficando maior, mas ainda precisa de mais nutrientes.',
    image: 'https://gabrieltnishimura.github.io/unite/mochi/mochi-3.webp',
  },
  4: {
    message: 'Mochi está quase lá!',
    image: 'https://gabrieltnishimura.github.io/unite/mochi/mochi-4.webp',
  },
};

function validateMenuChoices(menu: Record<number, boolean>): {
  correctChoices: number[];
  incorrectChoices: number[];
} {
  return todaysMenu.reduce<{
    correctChoices: number[];
    incorrectChoices: number[];
  }>(
    (acc, cur, index) => {
      if (menu[index] === undefined) {
        return {
          correctChoices: [...acc.correctChoices],
          incorrectChoices: [...acc.incorrectChoices, index],
        };
      }

      if (menu[index] === cur.answer) {
        return {
          correctChoices: [...acc.correctChoices, index],
          incorrectChoices: [...acc.incorrectChoices],
        };
      }

      return {
        correctChoices: [...acc.correctChoices],
        incorrectChoices: [...acc.incorrectChoices, index],
      };
    },
    {
      correctChoices: [],
      incorrectChoices: [],
    },
  );
}

function DogCuisineChallenge() {
  const { openModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const [menuSelection, setMenuSelection] = useState<Record<number, boolean>>({});
  const selectedItems = Object.keys(menuSelection).length;

  const changeMenuSelection = (index: number, state: boolean) => {
    setMenuSelection({
      ...menuSelection,
      [index]: state,
    });
  };

  const submit = () => {
    const { correctChoices, incorrectChoices } = validateMenuChoices(menuSelection);
    if (incorrectChoices.length === 0) {
      openModal({
        message: 'Acertou!',
        onPrimaryPress: () => {
          navigate(`/challenge/${ChallengeRouteIdentifier.Five_Labyrinth}/landing`);
        },
      });
      return;
    }
    // at least one incorrect choice
    // show mochi feedback
    // mochi growth algorithm is based off of incorrect choices (1<x<3 = 1; 4<x<7 = 2; 8<x<11 = 3; 11<x<15 = 4;)
    const mochiGrowthLevel = Math.floor(correctChoices.length / 4 + 1);
    console.log('Mochi growth level based on', mochiGrowthLevel, correctChoices.length);
    const feedback = mochiGrowthFeedback[mochiGrowthLevel];
    // randomize item feedback
    const randomIndex = Math.floor(Math.random() * incorrectChoices.length);
    const feedbackForMenuIndex = incorrectChoices[randomIndex];
    openModal({
      message: `Feedback: ${feedback.message} + "${todaysMenu[feedbackForMenuIndex].tipWhenWrong}"`,
      image: feedback.image,
      onPrimaryPress: () => {
        setMenuSelection({});
      },
    });
  };

  return (
    <>
      <ChallengeScreen
        Footer={
          <ChallengeFooter
            title={`Preparar comida (${selectedItems}/${todaysMenu.length})`}
            onClick={submit}
            disabled={selectedItems !== todaysMenu.length}
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
