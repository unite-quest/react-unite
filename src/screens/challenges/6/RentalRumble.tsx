import { ChallengeFooter } from '@/components/shell/ChallengeFooter';
import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
import { StatefulCard } from '@/components/ui/stateful-card';
import { BottomDrawerContext } from '@/shared/bottom-drawer/BottomDrawerProvider';
import { useContext } from 'react';

type LivingConditions = {
  title: string;
  checked?: boolean;
};

const list: LivingConditions[] = [
  { title: 'Apê no espaço sideral', checked: undefined },
  { title: 'Kitnet no mar', checked: true },
  { title: 'Casa na árvore', checked: false },
  { title: 'Flat Caverna', checked: undefined },
  { title: 'Condomínio no zoológico', checked: false },
  { title: 'Chalé Caverna', checked: false },
];

function RentalRumble() {
  const { openDrawer } = useContext(BottomDrawerContext);

  const moreDetails = (place: LivingConditions) => {
    openDrawer({
      title: place.title,
      message: 'test',
    });
  };

  return (
    <>
      <ChallengeScreen
        description="Analise casa um dos imóveis abaixo e dê o seu veredito. Todas as casas deverão ser avaliadas para continuar."
        Footer={
          <ChallengeFooter title={`Submeter palpite (3/4)`} onClick={console.log} disabled={true} />
        }
      >
        {list.map(detail => {
          return (
            <StatefulCard
              key={detail.title}
              onClick={() => moreDetails(detail)}
              title={detail.title}
              checked={detail.checked}
            />
          );
        })}
      </ChallengeScreen>
    </>
  );
}

export default RentalRumble;
