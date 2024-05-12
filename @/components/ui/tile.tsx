import check from '../../../src/assets/check-mark.svg';
import { StackSpacing } from './stack-spacing';
import { UniteText } from './unite-text';

const LogoQuizTile: React.FC<{
  image: string;
  onClick: () => void;
  variant?: 'done' | 'todo';
}> = ({ image, onClick, variant }) => {
  return (
    <div className="w-full aspect-square rounded-md place-center min-h-full">
      <button className="relative" onClick={onClick} disabled={variant === 'done'}>
        <img className="rounded-md" src={image} />
        {variant === 'done' ? (
          <>
            <div className="rounded-md bg-light-green opacity-50 h-full w-full absolute top-0" />
            <img className="absolute top-0 right-0" src={check} />{' '}
          </>
        ) : (
          <></>
        )}
      </button>
    </div>
  );
};

const SimonSaysTile: React.FC<{
  image: string;
  onClick: () => void;
  bg: string;
}> = ({ image, onClick, bg }) => {
  return (
    <div
      className={
        'focus:ring-4 shadow-lg transform active:scale-y-75 transition-transform flex p-5 w-full rounded-lg place-center min-h-full ' +
        bg
      }
    >
      <button className="relative" onClick={onClick}>
        <img className="rounded-md" src={image} />
      </button>
    </div>
  );
};

const PresentTile: React.FC<{
  image: string;
  onClick: () => void;
  text: string;
  price: string;
  parts: string;
  outOfStock: boolean;
}> = ({ image, onClick, text, price, parts, outOfStock }) => {
  const outOfStockBackground = outOfStock ? 'bg-[#9A9A9A]' : 'bg-[#BBE4D2]';
  return (
    <button onClick={onClick} className={`w-full rounded-2xl p-5 mb-3 ${outOfStockBackground}`}>
      <div>
        <UniteText size="xs" weight="bold" textStyle="text-black">
          {text}
        </UniteText>
        <StackSpacing size="sm" />
        <div className="flex justify-between">
          <img height={130} width={130} className="rounded-md" src={image} />
          <div className="text-left flex flex-col justify-center items-center">
            <UniteText size="xs">R${price}</UniteText>
            <UniteText size="xs">Estoque: ({parts})</UniteText>
            <StackSpacing size="sm" />
            {outOfStock ? null : (
              <div className="border-[2px] rounded-xl border-[#4848B8] p-1 pl-4 pr-4 text-[#4848B8] font-roboto font-medium bg-[#FFFEFB]">
                Dar presente
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};
export { LogoQuizTile, PresentTile, SimonSaysTile };
