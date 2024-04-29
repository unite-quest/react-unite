export type UniteButtonVariants = 'cool-green' | 'black' | 'adventure';

const UniteButton: React.FC<{
  title: string;
  buttonVariant?: UniteButtonVariants;
  onClick?: () => void;
  disabled?: boolean;
  icon?: JSX.Element;
}> = ({ title, buttonVariant = 'cool-green', disabled, onClick, icon }) => {
  const baseButton =
    'w-full border-[3px] rounded-2xl pt-4 pb-4 pl-4 pr-4 text-left flex justify-between font-roboto text-xl items-center';

  const buttonColorMap: Record<typeof buttonVariant, string> = {
    'cool-green': 'bg-dark-green border-white text-white', // pending designs
    'black': 'bg-black border-[#B1B1FF] text-white',
    'adventure': 'bg-[#B1B1FF] border-black text-black font-semibold',
  };
  const disabledButton = 'border-[#9A9A9A] text-[#9A9A9A] bg-[#E0E0E0]';

  return (
    <>
      <button
        className={`${baseButton} ${disabled ? disabledButton : buttonColorMap[buttonVariant]}`}
        onClick={onClick}
        disabled={disabled}
      >
        {title}
        {icon}
      </button>
    </>
  );
};
export { UniteButton };
