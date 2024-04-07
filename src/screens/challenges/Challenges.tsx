import { useParams } from 'react-router-dom';

function Challenges() {
  const { challengeId } = useParams();
  console.log(challengeId);

  return <></>;
}

export default Challenges;
