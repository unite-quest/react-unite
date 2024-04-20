import { ChallengeFooter } from '@/components/shell/ChallengeFooter';
import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
import { ChallengeRouteIdentifier } from '@/shared/utils/ChallengeIdentifiers';
import { useNavigate } from 'react-router-dom';
import logicGatesHard from '../../../assets/logic-gates-hard.png';

function LogicGatesChallenge() {
  const navigate = useNavigate();

  const submit = () => {
    navigate(`/challenge/${ChallengeRouteIdentifier.Three_Video}/landing`);
  };

  return (
    <>
      <ChallengeScreen Footer={<ChallengeFooter title="Submeter" onClick={submit} />}>
        <div>
          <img className="p-5" src={logicGatesHard} alt="Logo" />
        </div>
      </ChallengeScreen>
    </>
  );
}

export default LogicGatesChallenge;
