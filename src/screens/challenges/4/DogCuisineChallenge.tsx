import { ChallengeFooter } from '@/components/shell/ChallengeFooter';
import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
import { UniteToggle } from '@/components/ui/toggle';
import { AnswersModel } from '@/models/AnswersModel';
import { ModalContext } from '@/shared/modal/ModalProvider';
import { ChallengeIdentifier, ChallengeRouteIdentifier } from '@/shared/utils/ChallengeIdentifiers';
import { getAnswerKey, persistAnswerKeyArray, validateAnswer } from '@/shared/utils/validateAnswer';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAllAnswers from 'src/hooks/useAllAnswers';

const todaysMenu: { image: string; itemName: string; answer: boolean; tipWhenWrong: string }[] = [
  {
    image: 'https://gabrieltnishimura.github.io/unite/Beef.png',
    itemName: 'Carne',
    answer: true,
    tipWhenWrong:
      'Carne é facilmente digerível e fornece proteínas essenciais para a saúde e desenvolvimento muscular do animal.',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Garlic.png',
    itemName: 'Alho',
    answer: false,
    tipWhenWrong:
      'Alho contém compostos que podem causar toxicidade, levando a danos nos glóbulos vermelhos e outros problemas de saúde graves.',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Chocolate_Cake.png',
    itemName: 'Chocolate',
    answer: false,
    tipWhenWrong:
      'Chocolate contém teobromina, uma substância que cachorros não conseguem metabolizar eficientemente e que pode ser tóxica ou até fatal!',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Coconut.png',
    itemName: 'Coco',
    answer: true,
    tipWhenWrong:
      'Coco é uma fonte de ácidos graxos que podem contribuir para uma pele saudável e pelo brilhante.',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Wine.png',
    itemName: 'Vinho',
    answer: false,
    tipWhenWrong:
      'Alcool é tóxico para cachorros porque eles o metabolizam lentamente, levando a altos níveis no corpo que afetam gravemente o sistema nervoso central e podem causar sintomas sérios, como depressão respiratória e acidose metabólica, mesmo em pequenas doses.',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Rhubarb.png',
    itemName: 'Ruibarbo',
    answer: false,
    tipWhenWrong: 'Ruibarbo tem folhas que contêm ácido oxálico, que pode ser tóxico para eles.',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Cooked Pork.png',
    itemName: 'Porco',
    answer: true,
    tipWhenWrong: 'Porco fornece proteínas de alta qualidade para o cachorro!',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Cranberries.png',
    itemName: 'Cranberries',
    answer: true,
    tipWhenWrong:
      'Cranberries contêm nutrientes que ajudam a prevenir infecções do trato urinário do cachorro.',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Egg.png',
    itemName: 'Ovo',
    answer: true,
    tipWhenWrong: 'Ovos são uma excelente fonte de proteína, vitaminas e ácidos graxos essenciais.',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Blueberry.png',
    itemName: 'Mirtilo',
    answer: true,
    tipWhenWrong:
      'Mirtilo é rico em antioxidantes, que ajudam a proteger as células e promover uma saúde geral melhor.',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Grape.png',
    itemName: 'Uvas',
    answer: false,
    tipWhenWrong:
      'Uvas contêm substâncias que podem causar insuficiência renal aguda e outros problemas de saúde graves em cães!',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Mango.png',
    itemName: 'Manga',
    answer: true,
    tipWhenWrong:
      'Manga sem caroço é rica em vitaminas A e C, que ajudam a fortalecer o sistema imunológico e a manter a saúde da pele e dos pelos.',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Strawberry.png',
    itemName: 'Morango',
    answer: true,
    tipWhenWrong: 'Morangos são ricos em fibras e vitamina C, além de serem baixos em calorias.',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Leek.png',
    itemName: 'Alho poró',
    answer: false,
    tipWhenWrong:
      'Alho poró contém compostos semelhantes aos encontrados no alho e na cebola, que são tóxicos para eles e podem causar danos aos glóbulos vermelhos e outros problemas de saúde graves.',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Spring_Onion.png',
    itemName: 'Cebolinha',
    answer: false,
    tipWhenWrong:
      'Cebolhinha causa sérias irritações no estômago e no intestino pois possuem uma substância chamada dissulfeto de n-propil, que provoca uma alteração nas hemoglobinas levando a destruição de glóbulos vermelhos.',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Ginger.png',
    itemName: 'Gengibre',
    answer: true,
    tipWhenWrong:
      'Gengibre pode ajudar a aliviar náuseas e melhorar a digestão, além de possuir propriedades anti-inflamatórias naturais.',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Macadamia.png',
    itemName: 'Macadamia',
    answer: false,
    tipWhenWrong: 'Macadamia',
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

type SplitChoices = {
  correctChoices: number[];
  incorrectChoices: number[];
};

async function fromMenuToSplitChoices(
  asyncAcc: Promise<SplitChoices>,
  [key, value]: [key: string, value: boolean],
  index: number,
  answers: AnswersModel,
): Promise<SplitChoices> {
  const acc = await asyncAcc;
  const valid = await validateAnswer(
    answers,
    ChallengeIdentifier.Four_DogCuisine,
    String(Number(key) + 1),
    String(value),
    true,
  );

  if (valid) {
    return {
      correctChoices: [...acc.correctChoices, index],
      incorrectChoices: [...acc.incorrectChoices],
    };
  }

  return {
    correctChoices: [...acc.correctChoices],
    incorrectChoices: [...acc.incorrectChoices, index],
  };
}

async function persistMenu(menu: Record<number, boolean>): Promise<void> {
  const keys = Object.entries(menu).map(([key, value]) => {
    return getAnswerKey(
      ChallengeIdentifier.Four_DogCuisine,
      String(Number(key) + 1),
      String(value),
    );
  });
  await persistAnswerKeyArray(keys);
}

async function validateMenuChoices(
  menu: Record<number, boolean>,
  answers: AnswersModel,
): Promise<SplitChoices> {
  return await Object.entries(menu).reduce<Promise<SplitChoices>>(
    (acc, entries, index) => fromMenuToSplitChoices(acc, entries, index, answers),
    Promise.resolve({
      correctChoices: [],
      incorrectChoices: [],
    }),
  );
}

function DogCuisineChallenge() {
  const { openModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const [menuSelection, setMenuSelection] = useState<Record<number, boolean>>({});
  const selectedItems = Object.keys(menuSelection).length;
  const dbAnswers = useAllAnswers();

  const changeMenuSelection = (index: number, state: boolean) => {
    setMenuSelection({
      ...menuSelection,
      [index]: state,
    });
  };

  const submit = async () => {
    if (!dbAnswers) {
      return;
    }

    const { correctChoices, incorrectChoices } = await validateMenuChoices(
      menuSelection,
      dbAnswers,
    );
    if (incorrectChoices.length === 0) {
      persistMenu(menuSelection);
      openModal({
        message: 'Acertou!',
        image: 'https://gabrieltnishimura.github.io/unite/mochi/mochi-5.webp',
        onPrimaryPress: () => {
          navigate(`/challenge/${ChallengeRouteIdentifier.Five_Labyrinth}/landing`);
        },
      });
      return;
    }
    // at least one incorrect choice
    // show mochi feedback
    // mochi growth algorithm is based off of incorrect choices (1<x<3 = 1; 4<x<7 = 2; 8<x<11 = 3; 11<x<15 = 4;)
    // TODO CHANGE MOCHI ALGORITHM TO SUPPORT BIGGER
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
