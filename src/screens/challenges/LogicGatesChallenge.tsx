import { useNavigate } from 'react-router-dom';
import logicGatesHard from '../../assets/logic-gates-hard.png';

function LogicGatesChallenge() {
  const navigate = useNavigate();

  const submit = () => {
    navigate('./details', {
      state: {},
    });
  };

  return (
    <>
      <div className="flex bg-gradient-to-b from-blue to-[#8ce1fb] h-20">LOGIC GATES CHALLENGE</div>
      <img className="p-5" src={logicGatesHard} alt="Logo" />
      <button onClick={submit}>Submit Answer</button>
    </>
  );
}

export default LogicGatesChallenge;
