import { ChallengeFooter } from '@/components/shell/ChallengeFooter';
import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
import { StatefulCard } from '@/components/ui/stateful-card';
import { useContext, useEffect, useState } from 'react';

import { BottomDrawerContext } from '@/shared/bottom-drawer/BottomDrawerProvider';
import { RentalDrawerContext } from '@/shared/bottom-drawer/RentalDrawerProvider';
import { LoaderContext } from '@/shared/loader/LoaderProvider';
import { ModalContext } from '@/shared/modal/ModalProvider';
import { ChallengeIdentifier, ChallengeRouteIdentifier } from '@/shared/utils/ChallengeIdentifiers';
import { LivingConditions, rentalRumbleApartments } from '@/shared/utils/rentalRumbleApartments';
import {
  persistRecordAsCorrectAnswer,
  validateRecordAsAnswer,
} from '@/shared/utils/validateAnswer';
import { useNavigate } from 'react-router-dom';
import useAllAnswers from 'src/hooks/useAllAnswers';
import { useAnswerState } from 'src/hooks/useAnswerState';
import { RentalRumbleDrawerContent } from './RentalRumbleDrawerContent';

function RentalRumble() {
  const { setLoading } = useContext(LoaderContext);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const currentAnswers: number = Object.keys(answers).length;
  const { openDrawer } = useContext(BottomDrawerContext);
  const { openRentalDrawer, closeRentalDrawer } = useContext(RentalDrawerContext);
  const { openModal } = useContext(ModalContext);
  const dbAnswers = useAllAnswers();
  const navigate = useNavigate();
  const { answeredQuestionIds, refetchAnsweredQuestions } = useAnswerState(
    ChallengeIdentifier.Six_ApartmentTinder,
  );

  const moreDetails = (place: LivingConditions, index: number) => {
    openRentalDrawer({
      title: place.title,
      image: place.image,
      content: (
        <>
          <RentalRumbleDrawerContent
            place={place}
            onApprove={() => {
              setAnswers({ ...answers, [index]: true });
              closeRentalDrawer();
            }}
            onReject={() => {
              setAnswers({ ...answers, [index]: false });
              closeRentalDrawer();
            }}
          />
        </>
      ),
    });
  };

  const submit = async () => {
    if (!dbAnswers) {
      return;
    }

    const { incorrectChoices } = await validateRecordAsAnswer(
      ChallengeIdentifier.Six_ApartmentTinder,
      answers,
      dbAnswers,
    );

    if (incorrectChoices.length === 0) {
      await persistRecordAsCorrectAnswer(ChallengeIdentifier.Six_ApartmentTinder, answers);
      await refetchAnsweredQuestions(); // triggers side effect to rerender answeredQuestionIds
      return;
    } else {
      openModal({
        type: 'failure',
        message: `Verifique suas respostas e submita novamente. Existem ${incorrectChoices.length} respostas incorretas.`,
      });
    }
  };

  useEffect(() => {
    if (answeredQuestionIds === undefined) {
      return;
    }
    setLoading(false);

    if (answeredQuestionIds.length === rentalRumbleApartments.length) {
      openModal({
        type: 'challengeCompleted',
        dismiss: () => {
          navigate(`/challenge/${ChallengeRouteIdentifier.Seven_SimonSays}/landing`);
        },
      });
    }
  }, [setLoading, answeredQuestionIds, openModal, navigate]);

  return (
    <>
      <ChallengeScreen
        description="Analise casa um dos imóveis abaixo e dê o seu veredito. Todas as casas deverão ser avaliadas para continuar."
        onTipClick={() => {
          openDrawer({
            title: 'Não entendeu?',
            message:
              'Foque na análise dos três integrantes da família! As mensagens tem tom positivo ou negativo sobre o imóvel; você pode usar isso de referência para avaliar.',
          });
        }}
        Footer={
          <ChallengeFooter
            title={`Submeter palpite (${currentAnswers}/${rentalRumbleApartments.length})`}
            onClick={submit}
            disabled={currentAnswers !== rentalRumbleApartments.length}
          />
        }
      >
        {rentalRumbleApartments.map((detail, index) => {
          return (
            <StatefulCard
              key={detail.title}
              image={detail.image}
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
