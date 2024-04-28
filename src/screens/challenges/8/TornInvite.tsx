import { ChallengeFooter } from '@/components/shell/ChallengeFooter';
import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
import { BottomDrawerContext } from '@/shared/bottom-drawer/BottomDrawerProvider';
import { ModalContext } from '@/shared/modal/ModalProvider';
import { useContext, useEffect, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useCurrentQuestion } from 'src/hooks/useCurrentQuestion';
import useTornInviteMetadata from 'src/hooks/useTornInviteMetadata';

function TornInvite() {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState('');
  const { openModal } = useContext(ModalContext);
  const { openDrawer } = useContext(BottomDrawerContext);
  // technically should start with 0
  const { id: questionId } = useCurrentQuestion();
  const {
    alreadyAnswered,
    totalGuestsSubmitted,
    totalGuests,
    guestName,
    tipForGuestName,
    nextQuestionId,
    validateAnswer,
  } = useTornInviteMetadata(questionId);

  const submit = () => {
    const validate = async () => {
      // add validation
      const valid = await validateAnswer(answer);
      if (!valid) {
        openModal({
          type: 'failure',
          message: 'Tente novamente!',
        });
        return;
      }

      // verify step after validated
      if (totalGuests === totalGuestsSubmitted) {
        console.log('last success');
        return;
      }

      // display success for all but the last answer
      setAnswer('');
      openModal({
        type: 'success',
        message: 'Parabens! Clique no x para continuar para o próximo nome.',
        dismiss: () => {
          navigate({
            pathname: '.',
            search: createSearchParams({
              id: String(nextQuestionId),
            }).toString(),
          });
        },
      });
    };
    validate();
  };

  useEffect(() => {
    if (!alreadyAnswered) {
      return;
    }

    openModal({
      type: 'success',
      message: 'Você já completou esse nome! Clique no x para continuar para o próximo.',
      dismiss: () => {
        navigate({
          pathname: '.',
          search: createSearchParams({
            id: String(nextQuestionId),
          }).toString(),
        });
      },
    });
  }, [alreadyAnswered, navigate, nextQuestionId, openModal]);

  return (
    <>
      <ChallengeScreen
        onTipClick={() => {
          openDrawer({ title: 'Dica', message: tipForGuestName });
        }}
        Footer={
          <ChallengeFooter
            onClick={submit}
            title={`Submeter palpite ${totalGuestsSubmitted}/${totalGuests}`}
            disabled={!answer}
          />
        }
      >
        <div className="pt-6 pb-12 text-left">
          <span>
            Nos ajude a descobrir qual o nome do convidado abaixo a partir das letras soltas que
            encontramos do convite despedaçado.
          </span>
        </div>
        <div className="pb-10">
          <span>{guestName}</span>
        </div>
        <div>
          <input
            onKeyUp={({ key }) => (key === 'Enter' ? submit() : null)}
            value={answer}
            className="relative border-2 border-dark-green w-full h-11 rounded-lg"
            onChange={e => setAnswer(e.target.value)}
          />
        </div>
      </ChallengeScreen>
    </>
  );
}

export default TornInvite;
