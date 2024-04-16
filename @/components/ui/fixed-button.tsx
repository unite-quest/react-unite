import arrow from '../../../src/assets/arrow.svg';
import { UniteButton } from './button';

const FixedButton: React.FC<{
  title: string;
  background: string;
  buttonVariant: 'cool-green' | 'black';
  onClick: () => void;
  disabled?: boolean;
  withArrow?: boolean;
}> = ({ title, background, buttonVariant, disabled, onClick, withArrow }) => {
  return (
    <>
      {/* workaround for fixed bottom */}
      <div className="pt-36"></div>
      <div className="fixed bottom-0 w-full">
        <div className={`${background} p-6`}>
          <UniteButton
            title={title}
            buttonVariant={buttonVariant}
            onClick={onClick}
            disabled={disabled}
            icon={withArrow ? <img className="h-5 w-5" src={arrow} alt="Arrow" /> : undefined}
          />
        </div>
      </div>
    </>
  );
};
export { FixedButton };
