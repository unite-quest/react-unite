import { PropsWithChildren } from 'react';
import { InsetSpacing } from '../ui/inset-spacing';
import { StackSpacing } from '../ui/stack-spacing';

const UniteScreen: React.FC<
  PropsWithChildren<{
    // todo add types to background
    background: string;
    Header: JSX.Element;
    Footer: JSX.Element;
  }>
> = ({ Header, Footer, background, children }) => {
  return (
    <>
      <div className={`min-h-svh ${background}`}>
        {Header}
        <InsetSpacing size="md">{children}</InsetSpacing>
        <StackSpacing size="xl" />
        {Footer}
      </div>
    </>
  );
};

export { UniteScreen };
