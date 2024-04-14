import { PropsWithChildren } from 'react';

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
      <div className={`min-h-svh bg-${background}`}>
        {Header}
        <div className="pl-5 pr-5">{children}</div>
        {Footer}
      </div>
    </>
  );
};
export { UniteScreen };
