import { StackSpacing } from '@/components/ui/stack-spacing';
import { UniteText, UniteTitle } from '@/components/ui/unite-text';
import { LoaderContext } from '@/shared/loader/LoaderProvider';
import { CreditEntry, creditEntries } from '@/shared/utils/creditsEntries';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Credits() {
  const { setLoading } = useContext(LoaderContext);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      document.body.style.overflow = 'hidden';

      setLoading(false);
    }, 400);
  }, [setLoading]);

  const goHome = () => {
    navigate('..');
  };

  function fromCreditEntryToLayout(entry: CreditEntry): JSX.Element {
    return (
      <>
        <div className="flex justify-center">
          <div>
            <UniteText align="center" size="md" weight="bold">
              {entry.label}
            </UniteText>
            <StackSpacing size="xs" />
            {entry.type === 'names' ? (
              entry.value.map(creditName => {
                return (
                  <>
                    <UniteText align="center">{creditName}</UniteText>
                    <StackSpacing size="xs" />
                  </>
                );
              })
            ) : entry.type === 'links' ? (
              <>
                <UniteText
                  align="center"
                  onClick={() => {
                    window.open(entry.link);
                  }}
                >
                  Link
                </UniteText>
                <StackSpacing size="xs" />
              </>
            ) : null}
            {entry.type === 'names' && entry.image ? (
              <img height={100} width={100} src={entry.image} />
            ) : null}
          </div>
        </div>
        <StackSpacing size="sm" />
      </>
    );
  }

  return (
    <div className="min-h-svh animate-credits-with-color">
      <div className="absolute w-[300px] h-[700px] left-[50%] m-[-150px] animate-credits">
        <UniteTitle align="center">Unite Quest</UniteTitle>
        <StackSpacing size="md" />
        {creditEntries.map(fromCreditEntryToLayout)}
        <StackSpacing size="md" />
        <UniteText align="center" onClick={goHome}>
          Voltar para home
        </UniteText>
        <StackSpacing size="md" />
      </div>
    </div>
  );
}

export default Credits;
