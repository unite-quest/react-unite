import lamp from 'src/assets/lamp.png';

const Lamp: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div className="bg-yellow-400 rounded-full border-2 border-black  p-1.5">
      <img onClick={onClick} height={36} width={36} src={lamp} />
    </div>
  );
};
export { Lamp };
