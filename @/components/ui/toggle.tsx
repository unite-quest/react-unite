import { StackSpacing } from './stack-spacing';

const UniteToggle: React.FC<{
  label: string;
  image: string;
  state: boolean | undefined;
  onChange: (state: boolean) => void;
}> = ({ image, label, state, onChange }) => {
  // implement undefined state
  function calculateState(): string {
    if (state === undefined) {
      return 'N/A';
    } else if (state === true) {
      return 'Permitido';
    }
    return 'Não Permitido';
  }

  let styles: {
    backgroundColor: string;
    toggleColor: string;
    togglePositioning: string;
  };
  if (state === undefined) {
    styles = {
      backgroundColor: 'bg-[#C8C8C8]',
      toggleColor: 'bg-[#858585]',
      togglePositioning: 'justify-start',
    };
  } else if (state === true) {
    styles = {
      backgroundColor: 'bg-[#70DDAF]',
      toggleColor: 'bg-[#229262]',
      togglePositioning: 'justify-end',
    };
  } else {
    styles = {
      backgroundColor: 'bg-[#EBBEAF]',
      toggleColor: 'bg-[#C06F54]',
      togglePositioning: 'justify-start',
    };
  }

  return (
    <>
      <div
        className={`p-5 pl-32 relative w-full flex justify-between items-center ${styles.backgroundColor} rounded-e-3xl rounded-bl-3xl`}
      >
        <div className="absolute left-5 top-[-1rem]">
          <img height={80} width={80} src={image} />
        </div>
        <div className="block text-left">
          <div>
            <span className="font-roboto font-bold text-md">{label}</span>
          </div>
          <div>
            <span className="font-roboto font-light text-sm">{calculateState()}</span>
          </div>
        </div>
        <div>
          <button className="h-8 w-[3.5rem]" onClick={() => onChange(!state)}>
            <div
              className={`bg-black w-full h-full rounded-full flex items-center p-1 ${styles.toggleColor} ${styles.togglePositioning}`}
            >
              <div className="h-6 w-6 bg-white rounded-full"></div>
            </div>
          </button>
        </div>
      </div>
      <StackSpacing size="md" />
    </>
  );
};
export { UniteToggle };
