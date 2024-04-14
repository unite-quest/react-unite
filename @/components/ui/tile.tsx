const LogoQuizTile: React.FC<{
  title: string;
  onClick: () => void;
}> = ({ title, onClick }) => {
  return (
    <div className="bg-slate-500 w-full h-full object-cover aspect-square">
      <button onClick={onClick}>
        <span>{title}</span>
      </button>
    </div>
  );
};
export { LogoQuizTile };
