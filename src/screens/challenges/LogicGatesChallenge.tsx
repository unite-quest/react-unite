import { Button } from '@/components/ui/button';
import logicGatesHard from '../../assets/logic-gates-hard.png';

function LogicGatesChallenge() {
  return (
    <>
      <div className="flex bg-gradient-to-b from-blue to-[#8ce1fb] h-20">LOGIC GATES CHALLENGE</div>
      <img className="p-5" src={logicGatesHard} alt="Logo" />
      <Button variant="secondary" onClick={console.log}>
        Submit Answer
      </Button>
    </>
  );
}

export default LogicGatesChallenge;
