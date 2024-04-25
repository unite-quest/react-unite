import check from '../../../src/assets/check.png';
import cross from '../../../src/assets/cross.png';
import waiting from '../../../src/assets/waiting.png';

const StatefulCard: React.FC<{
  title: string;
  onClick: () => void;
  checked?: boolean;
}> = ({ title, checked, onClick }) => {
  const background =
    checked === true ? 'bg-[#BBE4D2]' : checked === false ? 'bg-[#F8C8C8]' : 'bg-[#FFFEFB]';
  const iconBackground =
    checked === true ? 'bg-[#219262]' : checked === false ? 'bg-[#C92626]' : 'bg-[#F4E9CD]';
  const icon =
    checked === true ? (
      <img height={15} width={15} src={check} />
    ) : checked === false ? (
      <img height={15} width={15} src={cross} />
    ) : (
      <img height={25} width={25} src={waiting} />
    );
  return (
    <>
      <div className={`w-full border-2 rounded-2xl p-5 ${background} mb-3`}>
        <div className="flex justify-between items-center">
          <div className="flex flex-col text-left">
            <span className="font-roboto font-medium text-xl">{title}</span>
            <button
              className="border-[3px] rounded-xl border-[#4848B8] p-1 mt-3 w-44 text-[#4848B8] font-roboto font-medium bg-[#FFFEFB]"
              onClick={onClick}
            >
              Ver detalhes
            </button>
          </div>
          <div
            className={`rounded-full h-16 w-16 ${iconBackground} flex items-center justify-center`}
          >
            {icon}
          </div>
        </div>
      </div>
    </>
  );
};
export { StatefulCard };
