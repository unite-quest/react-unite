import { PropsWithChildren } from 'react';

const UniteText: React.FC<PropsWithChildren<{ align?: 'center' | 'left' }>> = ({
  children,
  align = 'left',
}) => {
  const alignStyle = align === 'center' ? '' : 'text-left';
  return (
    <>
      <div className={`${alignStyle}`}>
        <span className="break-words font-roboto text-base">{children}</span>
      </div>
    </>
  );
};
export { UniteText };
