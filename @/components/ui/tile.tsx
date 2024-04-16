import check from '../../../src/assets/check-mark.svg';

const LogoQuizTile: React.FC<{
  image: string;
  onClick: () => void;
  variant?: 'done' | 'todo';
}> = ({ image, onClick, variant }) => {
  return (
    <div className="w-full aspect-square rounded-md place-center min-h-full">
      <button className="relative" onClick={onClick}>
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
export { LogoQuizTile };
