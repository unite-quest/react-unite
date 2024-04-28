import { ChallengeFooter } from '@/components/shell/ChallengeFooter';
import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
import { UniteRadio } from '@/components/ui/radio';
import { useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';

function LogicGatesChallenge() {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState<string>('');
  const places = ['Família', 'Faculdade', 'Trabalho', 'Outros'];

  const submit = () => {
    if (!selectedValue) {
      return;
    }
    const difficulty = selectedValue === 'Faculdade' || selectedValue === 'Trabalho' ? 2 : 1;

    navigate({
      pathname: 'details',
      search: createSearchParams({
        id: String(difficulty),
      }).toString(),
    });
  };

  return (
    <>
      <ChallengeScreen
        Footer={<ChallengeFooter title="Submeter" onClick={submit} disabled={!selectedValue} />}
      >
        <div className="pt-6 pb-12 text-left">
          <span>
            Antes de iniciar esse desafio, precisamos saber de uma informação. Onde nos conhecemos?
          </span>
        </div>
        <UniteRadio options={places} onSelect={setSelectedValue} selectedValue={selectedValue} />
      </ChallengeScreen>
    </>
  );
}

export default LogicGatesChallenge;
