import { ChallengeFooter } from '@/components/shell/ChallengeFooter';
import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
import { UniteToggle } from '@/components/ui/toggle';
import { ModalContext } from '@/shared/modal/ModalProvider';
import { ChallengeIdentifier, ChallengeRouteIdentifier } from '@/shared/utils/ChallengeIdentifiers';
import {
  persistRecordAsCorrectAnswer,
  validateRecordAsAnswer,
} from '@/shared/utils/validateAnswer';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAllAnswers from 'src/hooks/useAllAnswers';

const todaysMenu: { image: string; itemName: string; tipWhenWrong: string }[] = [
  {
    image: 'https://gabrieltnishimura.github.io/unite/Beef.png',
    itemName: 'Carne',
    tipWhenWrong:
      'Carne é facilmente digerível e fornece proteínas essenciais para a saúde e desenvolvimento muscular do animal.',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Garlic.png',
    itemName: 'Alho',
    tipWhenWrong:
      'Alho contém compostos que podem causar toxicidade, levando a danos nos glóbulos vermelhos e outros problemas de saúde graves.',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Chocolate_Cake.png',
    itemName: 'Chocolate',
    tipWhenWrong:
      'Chocolate contém teobromina, uma substância que cachorros não conseguem metabolizar eficientemente e que pode ser tóxica ou até fatal!',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Coconut.png',
    itemName: 'Coco',
    tipWhenWrong:
      'Coco é uma fonte de ácidos graxos que podem contribuir para uma pele saudável e pelo brilhante.',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Wine.png',
    itemName: 'Vinho',
    tipWhenWrong:
      'Alcool é tóxico para cachorros porque eles o metabolizam lentamente, levando a altos níveis no corpo que afetam gravemente o sistema nervoso central e podem causar sintomas sérios, como depressão respiratória e acidose metabólica, mesmo em pequenas doses.',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Rhubarb.png',
    itemName: 'Ruibarbo',
    tipWhenWrong: 'Ruibarbo tem folhas que contêm ácido oxálico, que pode ser tóxico para eles.',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Cooked Pork.png',
    itemName: 'Porco',
    tipWhenWrong: 'Porco fornece proteínas de alta qualidade para o cachorro!',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Cranberries.png',
    itemName: 'Cranberries',
    tipWhenWrong:
      'Cranberries contêm nutrientes que ajudam a prevenir infecções do trato urinário do cachorro.',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Egg.png',
    itemName: 'Ovo',
    tipWhenWrong: 'Ovos são uma excelente fonte de proteína, vitaminas e ácidos graxos essenciais.',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Blueberry.png',
    itemName: 'Mirtilo',
    tipWhenWrong:
      'Mirtilo é rico em antioxidantes, que ajudam a proteger as células e promover uma saúde geral melhor.',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Grape.png',
    itemName: 'Uvas',
    tipWhenWrong:
      'Uvas contêm substâncias que podem causar insuficiência renal aguda e outros problemas de saúde graves em cães!',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Mango.png',
    itemName: 'Manga',
    tipWhenWrong:
      'Manga sem caroço é rica em vitaminas A e C, que ajudam a fortalecer o sistema imunológico e a manter a saúde da pele e dos pelos.',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Strawberry.png',
    itemName: 'Morango',
    tipWhenWrong: 'Morangos são ricos em fibras e vitamina C, além de serem baixos em calorias.',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Leek.png',
    itemName: 'Alho poró',
    tipWhenWrong:
      'Alho poró contém compostos semelhantes aos encontrados no alho e na cebola, que são tóxicos para eles e podem causar danos aos glóbulos vermelhos e outros problemas de saúde graves.',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Spring_Onion.png',
    itemName: 'Cebolinha',
    tipWhenWrong:
      'Cebolhinha causa sérias irritações no estômago e no intestino pois possuem uma substância chamada dissulfeto de n-propil, que provoca uma alteração nas hemoglobinas levando a destruição de glóbulos vermelhos.',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Ginger.png',
    itemName: 'Gengibre',
    tipWhenWrong:
      'Gengibre pode ajudar a aliviar náuseas e melhorar a digestão, além de possuir propriedades anti-inflamatórias naturais.',
  },
  {
    image: 'https://gabrieltnishimura.github.io/unite/Macadamia.png',
    itemName: 'Macadamia',
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

    const { correctChoices, incorrectChoices } = await validateRecordAsAnswer(
      ChallengeIdentifier.Four_DogCuisine,
      menuSelection,
      dbAnswers,
    );
    if (incorrectChoices.length === 0) {
      await persistRecordAsCorrectAnswer(ChallengeIdentifier.Four_DogCuisine, menuSelection);
      openModal({
        type: 'image',
        message: 'Acertou! O Mochi cresceu bem e saudável.',
        image: 'https://gabrieltnishimura.github.io/unite/mochi/mochi-5.webp',
        onPrimaryPress: () => {
          navigate(`/challenge/${ChallengeRouteIdentifier.Five_Labyrinth}/landing`);
        },
      });
      return;
    }
    // at least one incorrect choice
    // show mochi feedback
    // mochi growth algorithm is based off of incorrect choices (1<x<5 = 1; 5<x<8 = 2; 9<x<12 = 3; 12<x<16 = 4;)
    const mochiGrowthLevel = Math.floor(correctChoices.length / 4.1 + 1);
    console.log('Mochi growth level based on', mochiGrowthLevel, correctChoices.length);
    const feedback = mochiGrowthFeedback[mochiGrowthLevel];
    // randomize item feedback
    const randomIndex = Math.floor(Math.random() * incorrectChoices.length);
    const feedbackForMenuIndex = incorrectChoices[randomIndex];
    openModal({
      type: 'image',
      message: `${feedback.message} Aqui vai a dica de um do(s) item(s) que está incorreto: "${todaysMenu[feedbackForMenuIndex].tipWhenWrong}"`,
      image: feedback.image,
      dismiss: () => {
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
              Para que o Mochi cresça saudável, você precisa indicar quais comidas ele pode ou não
              comer. Aperte uma vez para permitir o alimento e duas para não permitir. Cuidado para
              não preparar o menu errado! Caso algum alimento esteja incorreto, você deverá começar
              tudo de novo.
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
