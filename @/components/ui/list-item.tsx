const ListItem: React.FC<{
  title: string;
  onClick: () => void;
  checked?: boolean;
}> = ({ title, checked, onClick }) => {
  const color = checked ? 'text-medium-green' : 'text-black';
  const icon = checked ? <span>icon</span> : null;
  return (
    <>
      <button className="w-full border-separator text-left" onClick={checked ? undefined : onClick}>
        <div className="pt-5 pb-5 flex justify-between">
          <span className={`font-roboto font-medium text-base ${color}`}>{title}</span>
          {icon}
        </div>
      </button>
    </>
  );
};
export { ListItem };
