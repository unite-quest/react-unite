import arrow from '../../../src/assets/arrow.svg';
import { UniteButton, UniteButtonVariants } from './button';

const FixedButton: React.FC<{
  title: string;
  background: string;
  buttonVariant: UniteButtonVariants;
  onClick: () => void;
  disabled?: boolean;
  withArrow?: boolean;
}> = ({ title, background, buttonVariant, disabled, onClick, withArrow }) => {
  const disabledBackground = disabled ? 'bg-light-beige' : background;

  return (
    <>
      {/* workaround for fixed bottom */}
      <div className="pt-36"></div>
      <div className="fixed bottom-0 w-full">
        <div className={`${disabledBackground} p-6`}>
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
