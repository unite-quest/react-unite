import { ChallengeFooter } from '@/components/shell/ChallengeFooter';
import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
import { scrambledInviteList } from '@/shared/utils/scrambledInviteList';
import { useState } from 'react';

function TornInvite() {
  const [answer, setAnswer] = useState('');
  const currentGuest: number = 0;
  const totalGuests: number = scrambledInviteList.length;

  const submit = () => {
    console.log('submitting', answer);
  };

  return (
    <>
      <ChallengeScreen
        Footer={
          <ChallengeFooter
            onClick={submit}
            title={`Submeter palpite ${currentGuest}/${totalGuests}`}
            disabled={currentGuest !== totalGuests}
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
          <span>{scrambledInviteList[currentGuest]}</span>
        </div>
        <div>
          <input
            onKeyUp={({ key }) => (key === 'Enter' ? submit() : null)}
            className="relative border-2 border-dark-green w-full h-11 rounded-lg"
            onChange={e => setAnswer(e.target.value)}
          />
        </div>
      </ChallengeScreen>
    </>
  );
}

export default TornInvite;
