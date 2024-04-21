import check from '../../../src/assets/check-mark.svg';

const ListItem: React.FC<{
  title: string;
  onClick: () => void;
  checked?: boolean;
}> = ({ title, checked, onClick }) => {
  const color = checked ? 'text-medium-green' : 'text-black';
  return (
    <>
      <button className="w-full border-separator text-left" onClick={checked ? undefined : onClick}>
        <div className="pt-5 pb-5 flex justify-between items-center">
          <span className={`font-roboto font-medium text-base ${color}`}>{title}</span>
          {checked ? <img height={24} width={24} src={check} /> : null}
        </div>
      </button>
    </>
  );
};
export { ListItem };
