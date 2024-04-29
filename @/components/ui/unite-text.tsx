import { PropsWithChildren } from 'react';

const UniteText: React.FC<
  PropsWithChildren<{
    align?: 'center' | 'left';
    size?: 'sm' | 'md' | 'lg';
    weight?: 'light' | 'bold';
  }>
> = ({ children, size = 'sm', align = 'left', weight = 'light' }) => {
  const alignStyle = align === 'center' ? '' : 'text-left';
  const textSize = size === 'sm' ? 'leading-3 text-lg' : size === 'md' ? 'text-xl' : 'text-2xl';
  const fontWeight = weight === 'light' ? 'font-light' : 'font-medium';
  return (
    <>
      <div className={`${alignStyle}`}>
        <span className={`break-words font-roboto font-light ${fontWeight} ${textSize}`}>
          {children}
        </span>
      </div>
    </>
  );
};
const UniteTitle: React.FC<
  PropsWithChildren<{
    align?: 'center' | 'left';
    color?: string;
  }>
> = ({ children, align = 'left', color = '' }) => {
  const alignStyle = align === 'center' ? '' : 'text-left';
  return (
    <>
      <div className={`${alignStyle}`}>
        <span className={`font-pt-serif text-4xl font-bold ${color}`}>{children}</span>
      </div>
    </>
  );
};
export { UniteText, UniteTitle };
