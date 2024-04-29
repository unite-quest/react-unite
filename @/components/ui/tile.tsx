import check from '../../../src/assets/check-mark.svg';
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
  parts: number;
}> = ({ image, onClick, text, price, parts }) => {
  return (
    <div>
      <div className={'w-full aspect-square rounded-md place-center'}>
        <button className="relative" onClick={onClick}>
          <img className="rounded-md" src={image} />
        </button>
        <UniteText>
          {text} - {parts} x R$ {price}
        </UniteText>
      </div>
    </div>
  );
};
export { LogoQuizTile, PresentTile, SimonSaysTile };
