import { UniteButton } from '@/components/ui/button';
import { LoaderContext } from '@/shared/loader/LoaderProvider';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gift from '../../assets/gift.svg';
import landscape from '../../assets/pixelArt_landscape.svg';
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
      <div className="bg-blue items-center justify-center p-10">
        <div className="text-beige font-sacramento text-5xl font-normal pb-10">Mimi & Gabriel</div>
        <div className="text-black font-roboto text-lg font-medium">25 de agosto de 2024 | 16h</div>
        <div className="text-black font-roboto text-xl font-light">
          Botânico Quintal - Av. Imperatriz Leopoldina, 681 - Vila Leopoldina, São Paulo - SP
        </div>
      </div>
      <div className="flex bg-gradient-to-b from-blue via-[#8ce1fb] to-30% to-light-beige">
        <img className="p-5" src={logo} alt="Logo" />
      </div>
      <div className="bg-light-blue">
        <div className="p-10">
          <div className="text-dark-green font-pt-serif text-4xl pb-10 font-bold text-left">
            A nossa história
          </div>
          <div className="text-black font-roboto text-lg font-medium pb-10 text-left">
            Decidimos contar um pouco de nossa trajetória até aqui de uma maneira diferente!
            Convidamos cada um de vocês para participar de uma sequência de desafios preparados
            exclusivamente para o nosso casamento. Clique no botão abaixo e comece agora mesmo!
          </div>
          <Link to="/story">
            <UniteButton
              title="Iniciar aventura"
              buttonVariant="adventure"
              icon={<img width={21} height={21} src={sword} alt="sword" />}
            />
          </Link>
        </div>

        <img src={landscape} alt="Landscape" />
      </div>
      <div className="bg-light-beige">
        <div className="p-10">
          <div className="text-dark-green font-pt-serif text-4xl font-bold text-left pb-10">
            Lista de presentes
          </div>
          <div className="text-black font-roboto text-lg font-medium text-left pb-10">
            Como forma de receber auxílio em nossa nova fase, sugerimos algumas opções de presentes
            que serão revertidos em dinheiro para nós. Dessa maneira, receberemos uma quantia de
            cada um que nos gratificar que representará alguma das opções que estão listadas no link
            abaixo:
          </div>
          <Link to="/story">
            <UniteButton title="Acessar lista de presentes" />
          </Link>
        </div>

        <img src={gift} alt="Gifts" />
      </div>
    </>
  );
}

export default Home;
