import { Button } from '@/components/ui/button';

function LogoQuizChallenge() {
  return (
    <>
      <div className="flex bg-gradient-to-b from-blue to-[#8ce1fb] h-20">LOGO QUIZ CHALLENGE</div>
      <Button variant="secondary" onClick={console.log}>
        Submit Answer
      </Button>
    </>
  );
}

export default LogoQuizChallenge;
