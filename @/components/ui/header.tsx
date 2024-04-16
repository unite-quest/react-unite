import { useNavigate } from 'react-router-dom';

export const Header: React.FC<{
  title: string;
  style: string;
  onUserClick?: () => void;
  onFlagClick?: () => void;
  variant: 'intro' | 'home' | 'details';
}> = ({ title, variant, style, onUserClick, onFlagClick }) => {
  let navigate = useNavigate();
  return (
    <header className={style}>
      {variant === 'intro' ? (
        <div className="flex flex-row pt-6 pb-6 ">
          <div className="basis-1/4" onClick={onFlagClick}>
            {'flag'}
          </div>
          <div className="basis-1/2">{title}</div>
          <div className="basis-1/4" onClick={onUserClick}>
            {'user'}
          </div>
        </div>
      ) : variant === 'home' ? (
        <div className="flex flex-row pt-6 pb-6">
          <div className="basis-1/2">{title}</div>
          <div className="basis-1/4"></div>
          <div className="basis-1/4" onClick={onUserClick}>
            {'user'}
          </div>
        </div>
      ) : variant === 'details' ? (
        <div className="flex flex-row pt-6 pb-6">
          <div className="basis-1/4" onClick={() => navigate(-1)}>
            {'back'}
          </div>
          <div className="basis-1/2">{title} </div>
          <div className="basis-1/4" onClick={onUserClick}>
            {'user'}
          </div>
        </div>
      ) : (
        <></>
      )}
    </header>
  );
};
