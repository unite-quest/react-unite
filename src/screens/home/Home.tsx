import { UniteButton } from '@/components/ui/button';
import { InsetSpacing } from '@/components/ui/inset-spacing';
import { StackSpacing } from '@/components/ui/stack-spacing';
import { UniteText, UniteTitle } from '@/components/ui/unite-text';
import { LoaderContext } from '@/shared/loader/LoaderProvider';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import landscape from '../../assets/adventure-landscape.png';
import present from '../../assets/present.png';
import gift from '../../assets/presents-landscape.png';
import sword from '../../assets/sword.png';
import logo from '../../assets/wedding-main.png';

function Home() {
  const { setLoading } = useContext(LoaderContext);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, [setLoading]);

  return (
    <>
      <div className="relative">
        {/* background */}
        <div className="absolute t-0 l-0 h-[21%] w-full bg-gradient-to-b from-blue via-[#8ce1fb] to-[205%] to-light-beige z-[-1]"></div>
        {/* actual content */}
        <StackSpacing size="lg" />
        <InsetSpacing size={'md'}>
          <div className="items-center justify-center">
            <div className="text-beige font-sacramento text-5xl font-normal min-h-10">
              Mimi & Gabriel
            </div>
            <StackSpacing size="sm" />
            <UniteText align="center" size="md" weight="bold">
              25 de agosto de 2024 | 16h
            </UniteText>
            <UniteText align="center">
              Botânico Quintal - Av. Imperatriz Leopoldina, 681 - Vila Leopoldina, São Paulo - SP | Esporte Fino
            </UniteText>
          </div>
        </InsetSpacing>
        <StackSpacing size="md" />
        <InsetSpacing size={'md'}>
          <div>
            <img height={1080} width={940} src={logo} alt="Logo" />
          </div>
        </InsetSpacing>
        <StackSpacing size="md" />
        <div className="bg-light-blue">
          <StackSpacing size="lg" />
          <InsetSpacing size={'md'}>
            <StackSpacing size="lg" />
            <UniteTitle color="text-dark-green" align="left">
              A nossa história
            </UniteTitle>
            <StackSpacing size="md" />
            <UniteText align="left">
              Decidimos contar um pouco de nossa trajetória até aqui de uma maneira diferente!
              Convidamos cada um de vocês para participar de uma sequência de desafios preparados
              exclusivamente para o nosso casamento. Clique no botão abaixo e comece agora mesmo!
            </UniteText>
            <StackSpacing size="md" />
            <Link to="/story">
              <UniteButton
                title="Iniciar aventura"
                buttonVariant="adventure"
                icon={<img width={28} height={28} src={sword} alt="sword" />}
              />
            </Link>
            <StackSpacing size="xl" />
          </InsetSpacing>
          <img src={landscape} alt="Landscape" />
        </div>
        <div className="bg-light-beige">
          <StackSpacing size="lg" />
          <InsetSpacing size={'md'}>
            <StackSpacing size="lg" />
            <UniteTitle color="text-dark-green" align="left">
              Lista de presentes
            </UniteTitle>
            <StackSpacing size="md" />
            <UniteText align="left">
              Como forma de receber auxílio em nossa nova fase, sugerimos algumas opções de
              presentes que serão revertidos em dinheiro para nós. Dessa maneira, receberemos uma
              quantia de cada um que nos gratificar que representará alguma das opções que estão
              listadas no link abaixo:
            </UniteText>
            <StackSpacing size="md" />
            <Link to="/registry">
              <UniteButton
                title="Acessar lista"
                buttonVariant="adventure"
                icon={<img width={28} height={28} src={present} alt="present" />}
              />
            </Link>
          </InsetSpacing>
          <StackSpacing size="md" />
          <img src={gift} alt="Gifts" />
        </div>
      </div>
    </>
  );
}

export default Home;
