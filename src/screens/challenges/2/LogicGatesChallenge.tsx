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
    const difficulty = selectedValue === 'Faculdade' || selectedValue === 'Trabalho' ? 5 : 1;

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
        description="Antes de iniciar esse desafio, precisamos saber de uma informação. Onde nos conhecemos?"
        Footer={<ChallengeFooter title="Submeter" onClick={submit} disabled={!selectedValue} />}
      >
        <UniteRadio options={places} onSelect={setSelectedValue} selectedValue={selectedValue} />
      </ChallengeScreen>
    </>
  );
}

export default LogicGatesChallenge;
