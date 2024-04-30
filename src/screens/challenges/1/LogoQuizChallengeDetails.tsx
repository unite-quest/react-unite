import { ChallengeFooter } from '@/components/shell/ChallengeFooter';
import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
import { StackSpacing } from '@/components/ui/stack-spacing';
import { UniteText } from '@/components/ui/unite-text';
import { BottomDrawerContext } from '@/shared/bottom-drawer/BottomDrawerProvider';
import { ModalContext } from '@/shared/modal/ModalProvider';
import { logoMap } from '@/shared/utils/logoMap';
import { validateAndPersistAnswer } from '@/shared/utils/validateAnswer';
import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAllAnswers from 'src/hooks/useAllAnswers';
import { useCurrentChallenge } from 'src/hooks/useCurrentChallenge';
import { useCurrentQuestion } from 'src/hooks/useCurrentQuestion';

function LogoQuizChallenge() {
  const { openModal } = useContext(ModalContext);
  const { openDrawer } = useContext(BottomDrawerContext);
  const answerInput = useRef<HTMLInputElement>(null);
  const [answer, setAnswer] = useState<string>('');
  const { id: questionId } = useCurrentQuestion();
  const logo = logoMap[questionId];
  const { id: challengeId } = useCurrentChallenge();
  const navigate = useNavigate();

  const dbAnswers = useAllAnswers();

  const askForTip = () => {
    openDrawer({
      title: 'Dica',
      message: logo.tip,
    });
  };

  const submit = async () => {
    if (!dbAnswers) {
      return;
    }

    answerInput.current?.blur();
    const { valid } = await validateAndPersistAnswer(
      dbAnswers,
      challengeId,
      String(questionId + 1),
      answer,
    );
    if (valid) {
      openModal({
        type: 'success',
        message: 'Continue assim!',
        dismiss: () => {
          navigate(-1);
        },
      });
    } else {
      openModal({
        type: 'failure',
        message: 'Hmmm, não exatamente. Revise sua resposta',
      });
    }
  };

  return (
    <>
      <ChallengeScreen
        Footer={<ChallengeFooter title="Submeter" onClick={submit} disabled={!answer} />}
        onTipClick={askForTip}
      >
        <UniteText>Qual o nome desse jogo?</UniteText>
        <StackSpacing size="sm" />
        <div className="border-4 border-dark-green rounded-3xl p-10 bg-white">
          <img className="w-full h-full" src={logo.image} />
        </div>
        <StackSpacing size="md" />
        <input
          ref={answerInput}
          onKeyUp={({ key }) => (key === 'Enter' ? submit() : null)}
          className="border-2 border-dark-green w-full p-3 rounded-2xl font-roboto text-lg font-medium"
          onChange={e => setAnswer(e.target.value)}
        />
      </ChallengeScreen>
    </>
  );
}

export default LogoQuizChallenge;
