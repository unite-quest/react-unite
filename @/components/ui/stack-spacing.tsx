const StackSpacing: React.FC<{ size: 'sm' | 'md' | 'lg' }> = ({ size = 'sm' }) => {
  const paddingStyle = size === 'sm' ? 'pb-4' : size === 'md' ? 'pb-8' : 'pb-12';
  return (
    <>
      <div className={`${paddingStyle}`} />
    </>
  );
};
export { StackSpacing };
