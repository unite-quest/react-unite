import check from '../../../assets/check.png';
import cross from '../../../assets/cross.png';

export const RentalRumbleDrawerContent: React.FC<{
  onReject: () => void;
  onApprove: () => void;
}> = ({ onReject, onApprove }) => {
  return (
    <>
      <span>test</span>
      <div className="flex">
        <button
          className="rounded-3xl bg-[#C92626] pt-5 pb-5 w-full mr-5 flex items-center justify-center"
          onClick={onReject}
        >
          <img height={20} width={20} src={cross} />
        </button>
        <button
          className="rounded-3xl bg-[#219262] pt-5 pb-5 w-full flex items-center justify-center"
          onClick={onApprove}
        >
          <img height={20} width={20} src={check} />
        </button>
      </div>
    </>
  );
};
