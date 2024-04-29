import { PropsWithChildren } from 'react';
import { InsetSpacing } from '../ui/inset-spacing';

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
        {Footer}
      </div>
    </>
  );
};

export { UniteScreen };
