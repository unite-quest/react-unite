import { ChallengeFooter } from '@/components/shell/ChallengeFooter';
import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
import { StatefulCard } from '@/components/ui/stateful-card';
import { BottomDrawerContext } from '@/shared/bottom-drawer/BottomDrawerProvider';
import { useContext, useState } from 'react';

import { LivingConditions, rentalRumbleApartments } from '@/shared/utils/rentalRumbleApartments';
import { RentalRumbleDrawerContent } from './RentalRumbleDrawerContent';

function RentalRumble() {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const { openDrawer, closeDrawer } = useContext(BottomDrawerContext);

  const moreDetails = (place: LivingConditions, index: number) => {
    openDrawer({
      title: place.title,
      variant: 'rental',
      image: place.image,
      content: (
        <>
          <RentalRumbleDrawerContent
            place={place}
            onApprove={() => {
              setAnswers({ ...answers, [index]: true });
              closeDrawer();
            }}
            onReject={() => {
              setAnswers({ ...answers, [index]: false });
              closeDrawer();
            }}
          />
        </>
      ),
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
        {rentalRumbleApartments.map((detail, index) => {
          return (
            <StatefulCard
              key={detail.title}
              onClick={() => moreDetails(detail, index)}
              title={detail.title}
              checked={answers[index]}
            />
          );
        })}
      </ChallengeScreen>
    </>
  );
}

export default RentalRumble;
