const StackSpacing: React.FC<{ size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' }> = ({ size = 'sm' }) => {
  const paddingStyle =
    size === 'xs'
      ? 'pb-2'
      : size === 'sm'
        ? 'pb-4'
        : size === 'md'
          ? 'pb-8'
          : size === 'lg'
            ? 'pb-12'
            : 'pb-28';
  return (
    <>
      <div className={`${paddingStyle}`} />
    </>
  );
};
export { StackSpacing };
