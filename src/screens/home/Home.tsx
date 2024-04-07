import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <Link to="/story">
        <Button variant="destructive">Story</Button>
      </Link>
      <Button variant="destructive">
     Challenges
    </Button>
    </>
  );
}

export default Home;
