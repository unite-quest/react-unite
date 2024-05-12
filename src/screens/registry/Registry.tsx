import { UniteScreen } from '@/components/shell/screen';
import { StackSpacing } from '@/components/ui/stack-spacing';
import { PresentTile } from '@/components/ui/tile';
import { UniteText, UniteTitle } from '@/components/ui/unite-text';
import { GiftDrawerContext } from '@/shared/bottom-drawer/GiftDrawerProvider';
import { LoaderContext } from '@/shared/loader/LoaderProvider';
import { RegistryEntry, registryMap } from '@/shared/utils/registryMap';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Registry() {
  const { setLoading } = useContext(LoaderContext);
  const { openDrawer } = useContext(GiftDrawerContext);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
      setLoading(false);
    }, 10);
  }, [setLoading]);

  const onClickGift = (choice: RegistryEntry) => {
    openDrawer(choice);
  };

  const onBack = () => {
    navigate(-1);
  };

  return (
    <>
      <UniteScreen background="bg-light-blue" Header={<></>} Footer={<></>}>
        <StackSpacing size="md" />
        <UniteText onClick={onBack}>Voltar</UniteText>
        <StackSpacing size="sm" />
        <UniteTitle color="text-dark-green">Lista de presentes</UniteTitle>
        <StackSpacing size="sm" />
        <UniteText>
          Nós vamos viajar para Nova Zelândia na nossa lua de mel dois dias após a festa de
          casamento. Caso deseje dar um presente para nós, escolha abaixo clicando em "Dar
          presente"!
        </UniteText>
        <StackSpacing size="md" />
        <div className="">
          {registryMap.map(present => {
            return (
              <PresentTile
                key={present.image}
                onClick={() => onClickGift(present)}
                image={present.image}
                text={present.text}
                price={present.price.toLocaleString('pt-BR')}
                parts={`${present.currentStock}/${present.totalStock}`}
                outOfStock={present.currentStock === 0}
              />
            );
          })}
        </div>
        <StackSpacing size="xl" />
      </UniteScreen>
    </>
  );
}

export default Registry;
