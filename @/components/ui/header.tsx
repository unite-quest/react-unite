import flag from '../../../src/assets/flag.png';
import { InsetSpacing } from './inset-spacing';
import { StackSpacing } from './stack-spacing';

export const Header: React.FC<{
  title: string;
  style: string;
  onFlagClick?: () => void;
  onBackClick?: () => void;
  variant: 'intro' | 'home' | 'details';
}> = ({ title, style, onFlagClick, onBackClick }) => {
  return (
    <header className={`${style}`}>
      <StackSpacing size="sm" />
      <InsetSpacing size="md">
        <div className="flex items-center justify-center relative h-10">
          {onBackClick ? (
            <button
              className="rounded-full border-2 border-black h-10 w-10 flex items-center justify-center bg-white absolute left-0 top-0 "
              onClick={onBackClick}
            >
              <svg className="h-4 w-4 scale-x-[-1]" viewBox="0 0 256 256">
                <path
                  fill="black"
                  d="M129.6,38.5c-7.4,7.4-7.4,19.5,0,26.9l43.6,43.6H29c-10.5,0-19,8.5-19,19s8.5,19,19,19h144.2l-43.6,43.6c-7.4,7.4-7.4,19.5,0,26.9c3.7,3.7,8.6,5.6,13.4,5.6c4.9,0,9.7-1.9,13.4-5.6L246,128l-89.5-89.5C149.1,31.1,137.1,31.1,129.6,38.5z"
                />
              </svg>
            </button>
          ) : null}
          <h1 className="font-roboto font-medium text-xl text-black">{title}</h1>
          {onFlagClick ? (
            <button
              className="rounded-full border-2 border-black h-10 w-10 flex items-center justify-center bg-white absolute top-0 right-0"
              onClick={onFlagClick}
            >
              <img className="h-6 w-6" src={flag} />
            </button>
          ) : null}
        </div>
      </InsetSpacing>
      <StackSpacing size="sm" />
    </header>
  );
};
