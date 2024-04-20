import { ChallengeFooter } from '@/components/shell/ChallengeFooter';
import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
import { logoMap } from '@/shared/utils/logoMap';
import { validateAndPersistAnswer } from '@/shared/utils/validateAnswer';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCurrentChallenge } from 'src/hooks/useCurrentChallenge';
import useLoadAnswerForCurrentChallenge from 'src/hooks/useLoadAnswerForCurrentChallenge';

function LogoQuizChallenge() {
  const [answer, setAnswer] = useState<string>('');
  const [params] = useSearchParams();
  const questionId = Number(params.get('id') || 0);
  const logo = logoMap[questionId];
  const { id: challengeId } = useCurrentChallenge();

  const dbAnswers = useLoadAnswerForCurrentChallenge();

  const submit = async () => {
    if (!dbAnswers) {
      return;
    }

    const { valid } = await validateAndPersistAnswer(
      dbAnswers,
      challengeId,
      String(questionId + 1),
      answer,
    );
    if (valid) {
      alert('Acertou!');
    } else {
      alert('Errou!');
    }
  };

  return (
    <>
      <ChallengeScreen
        Footer={<ChallengeFooter title="Submeter palpite" onClick={submit} disabled={!answer} />}
        tip={logo.tip}
      >
        <div>
          <div className="pt-6 pb-6 text-left">
            <span>Qual o nome desse jogo?</span>
          </div>
          <div className="pb-10">
            <div className="border-4 border-dark-green rounded-lg p-10 bg-white">
              <img className="w-full h-full" src={logo.image} />
            </div>
          </div>
          <input
            className="relative border-2 border-dark-green w-full h-11 rounded-lg"
            onChange={e => setAnswer(e.target.value)}
          />
        </div>
      </ChallengeScreen>
    </>
  );
}

export default LogoQuizChallenge;
