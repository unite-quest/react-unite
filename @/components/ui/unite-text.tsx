import { PropsWithChildren } from 'react';

const UniteText: React.FC<
  PropsWithChildren<{
    align?: 'center' | 'left';
    size?: 'xs' | 'sm' | 'md' | 'lg';
    weight?: 'light' | 'bold';
    textStyle?: string;
  }>
> = ({ children, size = 'sm', align = 'left', weight = 'light', textStyle }) => {
  const alignStyle = align === 'center' ? '' : 'text-left';
  const textSize =
    size === 'xs'
      ? 'text-md'
      : size === 'sm'
        ? 'leading-3 text-lg'
        : size === 'md'
          ? 'text-xl'
          : 'text-2xl';
  const fontWeight = weight === 'light' ? 'font-light' : 'font-medium';
  return (
    <>
      <div className={`${alignStyle}`}>
        <span className={`break-words font-roboto ${fontWeight} ${textSize} ${textStyle || ''}`}>
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
