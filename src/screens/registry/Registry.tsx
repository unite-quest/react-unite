import { UniteScreen } from '@/components/shell/screen';
import { StackSpacing } from '@/components/ui/stack-spacing';
import { PresentTile } from '@/components/ui/tile';
import { UniteText, UniteTitle } from '@/components/ui/unite-text';
import { LoaderContext } from '@/shared/loader/LoaderProvider';
import { registryMap } from '@/shared/utils/registryMap';
import { useContext, useEffect } from 'react';

function Registry() {
  const { setLoading } = useContext(LoaderContext);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, [setLoading]);

  return (
    <>
      <UniteScreen background="bg-light-blue h-screen" Header={<></>} Footer={<></>}>
        <StackSpacing size="md" />
        <UniteTitle color="text-dark-green">Lista de presentes</UniteTitle>
        <StackSpacing size="sm" />
        <UniteText>
          Nós vamos viajar para Nova Zelândia na nossa lua de mel dois dias após a festa de
          casamento.
        </UniteText>
        <StackSpacing size="md" />
        <div className="grid grid-cols-2 gap-4">
          {registryMap.map(present => {
            return (
              <PresentTile
                key={present.image}
                onClick={() => {}}
                image={present.image}
                text={present.text}
                price={present.price}
                parts={present.parts}
              />
            );
          })}
        </div>
      </UniteScreen>
    </>
  );
}

export default Registry;
