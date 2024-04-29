import { PresentTile } from '@/components/ui/tile';
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
      <div className="bg-light-blue h-screen">
        <div className="text-dark-green font-pt-serif text-4xl p-10 font-bold text-left">
          Lista de presentes
        </div>
        <div className="text-black font-roboto text-lg font-medium pl-10 pr-10 text-left pb-10">
          Nós vamos viajar para Nova Zelândia na nossa lua de mel dois dias após a festa de
          casamento.
        </div>
        <div className="grid grid-cols-2 gap-4 pl-10 pr-10">
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
      </div>
    </>
  );
}

export default Registry;
