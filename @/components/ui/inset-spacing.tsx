import { PropsWithChildren } from 'react';

const InsetSpacing: React.FC<PropsWithChildren<{ size: 'sm' | 'md' | 'lg' }>> = ({
  children,
  size = 'sm',
}) => {
  const paddingStyle = size === 'sm' ? 'pl-4 pr-4' : size === 'md' ? 'pl-8 pr-8' : 'pl-12 pr-12';
  return (
    <>
      <div className={`${paddingStyle}`}>{children}</div>
    </>
  );
};
export { InsetSpacing };
