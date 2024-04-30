import { ChallengeFooter } from '@/components/shell/ChallengeFooter';
import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
import { StackSpacing } from '@/components/ui/stack-spacing';
import { BottomDrawerContext } from '@/shared/bottom-drawer/BottomDrawerProvider';
import { ModalContext } from '@/shared/modal/ModalProvider';
import { useContext, useEffect, useRef, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useCurrentQuestion } from 'src/hooks/useCurrentQuestion';
import useTornInviteMetadata from 'src/hooks/useTornInviteMetadata';
import { ScrambledGuestName } from './ScrambledGuestName';

function TornInvite() {
  const { id: questionId } = useCurrentQuestion();
  const answerInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [answer, setAnswer] = useState('');
  const { openModal } = useContext(ModalContext);
  const { openDrawer } = useContext(BottomDrawerContext);

  const {
    currentQuestionId,
    alreadyAnswered,
    totalGuestsSubmitted,
    totalGuests,
    guestName,
    tipForGuestName,
    nextQuestionId,
    validateAnswer,
  } = useTornInviteMetadata();

  const submit = () => {
    const validate = async () => {
      answerInput.current?.blur();
      // add validation
      const valid = await validateAnswer(answer);
      setAnswer('');

      if (!valid) {
        openModal({
          type: 'failure',
          message: 'Tente novamente!',
        });
        return;
      }
    };
    validate();
  };

  useEffect(() => {
    if (!alreadyAnswered || nextQuestionId === undefined) {
      return;
    }

    if (nextQuestionId === null) {
      openModal({
        type: 'success',
        message: 'Você já completou todos os nomes! Clique no X para finalizar a jornada.',
        dismiss: () => {
          navigate('/credits');
        },
      });
      return;
    }

    openModal({
      type: 'success',
      message: 'Você completou esse nome! Clique no x para continuar para o próximo.',
      dismiss: () => {
        navigate({
          pathname: '.',
          search: createSearchParams({
            id: String(nextQuestionId),
          }).toString(),
        });
      },
    });
  }, [alreadyAnswered, currentQuestionId, navigate, nextQuestionId, openModal, questionId]);

  return (
    <>
      <ChallengeScreen
        description="Nos ajude a descobrir qual o nome do convidado abaixo a partir das letras soltas que encontramos do convite despedaçado."
        onTipClick={() => {
          openDrawer({ title: 'Dica', message: tipForGuestName });
        }}
        Footer={
          <ChallengeFooter
            onClick={submit}
            title={`Submeter (${totalGuestsSubmitted}/${totalGuests})`}
            disabled={!answer}
          />
        }
      >
        <ScrambledGuestName name={guestName} />
        <StackSpacing size="md" />
        <input
          ref={answerInput}
          onKeyUp={({ key }) => (key === 'Enter' ? submit() : null)}
          value={answer}
          className="border-2 border-dark-green w-full p-3 rounded-2xl font-roboto text-lg font-medium"
          onChange={e => setAnswer(e.target.value)}
        />
        <StackSpacing size="md" />
      </ChallengeScreen>
    </>
  );
}

export default TornInvite;
