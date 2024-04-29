import { PropsWithChildren } from 'react';

import arrow from '../../../src/assets/arrow.svg';
import { UniteButton, UniteButtonVariants } from './button';
import { InsetSpacing } from './inset-spacing';
import { StackSpacing } from './stack-spacing';

const FixedBottom: React.FC<
  PropsWithChildren<{
    title: string;
    background: string;
    buttonVariant: UniteButtonVariants;
    onClick: () => void;
    disabled?: boolean;
    withArrow?: boolean;
  }>
> = ({ children, title, background, buttonVariant, disabled, onClick, withArrow }) => {
  const disabledBackground = disabled ? 'bg-light-beige' : background;

  return (
    <>
      {/* workaround for fixed bottom */}
      <div className="pt-36"></div>
      <div className="fixed bottom-0 w-full">
        {children}
        <div className={`${disabledBackground}`}>
          <StackSpacing size="sm" />
          <InsetSpacing size="md">
            <UniteButton
              title={title}
              buttonVariant={buttonVariant}
              onClick={onClick}
              disabled={disabled}
              icon={
                withArrow ? <img className="h-5 w-5 invert" src={arrow} alt="Arrow" /> : undefined
              }
            />
          </InsetSpacing>
          <StackSpacing size="sm" />
        </div>
      </div>
    </>
  );
};
export { FixedBottom };
