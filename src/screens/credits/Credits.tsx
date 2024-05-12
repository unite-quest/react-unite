import { StackSpacing } from '@/components/ui/stack-spacing';
import { UniteText } from '@/components/ui/unite-text';
import { LoaderContext } from '@/shared/loader/LoaderProvider';
import { CreditEntry, creditEntries } from '@/shared/utils/creditsEntries';
import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Credits() {
  const creditsRef = useRef<HTMLDivElement>(null);
  const { setLoading } = useContext(LoaderContext);
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1);
  }, [setLoading]);

  useEffect(() => {
    const creditsEl = creditsRef.current;
    if (!creditsEl) {
      return;
    }

    const enableScrolling = () => {
      document.body.style.overflow = 'auto';
      creditsEl.style.position = 'relative'; // Reset position to static or adjust as needed
      creditsEl.style.bottom = '0'; // Reset top to bring it into view
      setAnimate(false);
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
      }, 1);
    };

    creditsEl.addEventListener('animationend', enableScrolling);

    return () => {
      creditsEl.removeEventListener('animationend', enableScrolling);
    };
  }, []);

  const goHome = () => {
    navigate('..');
  };
  const gotoGift = () => {
    navigate('/registry');
  };
  const openGithub = () => {
    window.open('https://github.com/unite-quest/react-unite');
  };

  function fromCreditEntryToLayout(entry: CreditEntry): JSX.Element {
    const angle = `${Math.random() >= 0.5 ? '' : '-'}${Math.random() * 5}deg`;
    return (
      <Fragment key={entry.label}>
        <div className="flex justify-center" key={entry.label}>
          <div>
            <span className={`font-bitmap-pixel text-3xl font-medium text-center ${entry.color}`}>
              {entry.label}
            </span>
            <StackSpacing size="xs" />
            {entry.value.map(creditName => {
              return (
                <Fragment key={creditName}>
                  <span className={`font-osd text-2xl text-center`}>{creditName}</span>
                  <StackSpacing size="xs" />
                </Fragment>
              );
            })}
            {entry.image ? (
              <img
                height={250}
                width={250}
                className="rotate-[4deg] border-8 border-white"
                style={{ rotate: angle }}
                src={entry.image}
              />
            ) : null}
          </div>
        </div>
        <StackSpacing size="lg" />
      </Fragment>
    );
  }

  return (
    <div className="min-h-svh animate-credits-with-color">
      <div
        className={`absolute w-[300px] left-[50%] mr-[-150px] ml-[-150px] ${animate ? ' h-[700px] animate-credits' : ''}`}
        ref={creditsRef}
      >
        <StackSpacing size="md" />
        <h1 className="font-bitmap-pixel text-6xl text-[#7f7ffa]">Unite Quest</h1>
        <StackSpacing size="xl" />
        {creditEntries.map(fromCreditEntryToLayout)}
        <StackSpacing size="md" />
        <UniteText align="center" onClick={openGithub}>
          Github
        </UniteText>
        <StackSpacing size="md" />
        <UniteText align="center" onClick={gotoGift}>
          Dar presente
        </UniteText>
        <StackSpacing size="md" />
        <UniteText align="center" onClick={goHome}>
          Voltar para home
        </UniteText>
        <StackSpacing size="lg" />
      </div>
    </div>
  );
}

export default Credits;
