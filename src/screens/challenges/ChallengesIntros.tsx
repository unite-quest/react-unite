import { UniteScreen } from '@/components/shell/screen';
import { FixedButton } from '@/components/ui/fixed-button';
import { Header } from '@/components/ui/header';
import { LoaderContext } from '@/shared/loader/LoaderProvider';
import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

type IntroMetadata = {
  title: string;
  period: string;
  description: string;
  background: string;
  image: string;
};

const intros: Record<string, IntroMetadata> = {
  '1': {
    title: 'Logo Quiz',
    period: '2012-2014',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id euismod odio. Donec varius iaculis est, nec varius justo fringilla vitae. Nam elementum, tellus a luctus pulvinar, risus erat sodales eros, non euismod augue metus vel quam.',
    background: '',
    image: 'https://placehold.co/250x250',
  },
  '2': {
    title: 'Logo Quiz',
    period: '2012-2014',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id euismod odio. Donec varius iaculis est, nec varius justo fringilla vitae. Nam elementum, tellus a luctus pulvinar, risus erat sodales eros, non euismod augue metus vel quam.',
    background: '',
    image: 'https://placehold.co/250x250',
  },
  '3': {
    title: 'Video Quiz',
    period: '2017-2019',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id euismod odio. Donec varius iaculis est, nec varius justo fringilla vitae. Nam elementum, tellus a luctus pulvinar, risus erat sodales eros, non euismod augue metus vel quam.',
    background: 'bg-cool-green',
    image: 'https://placehold.co/250x250',
  },
};

function Challenges() {
  const { challengeId: unsanitizedChallengeId } = useParams();
  const challengeId = unsanitizedChallengeId || '1';
  const intro: IntroMetadata | null = intros[challengeId] || null;
  const { setLoading } = useContext(LoaderContext);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, [setLoading]);

  const submit = () => {
    navigate('./challenge', {
      state: {},
    });
  };

  if (!intro) {
    throw new Error('Invalid intro');
  }

  return (
    <>
      <UniteScreen
        background="cool-green"
        Header={<Header title={intro.period} variant="intro" style={intro.background} />}
        Footer={<FixedButton title="Começar desafio" variant="black" onClick={submit} />}
      >
        <div className="text-left">
          <span className="font-pt-serif font-bold text-5xl block pb-6">{intro.title}</span>
          <span className="font-roboto text-lg block">{intro.description}</span>
          <div className="flex justify-center pt-10">
            <img className="rotate-[4deg] border-8 border-white" src={intro.image} />
          </div>
        </div>
      </UniteScreen>
    </>
  );
}

export default Challenges;
