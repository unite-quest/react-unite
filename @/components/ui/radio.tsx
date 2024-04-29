import { UniteText } from './unite-text';

const UniteRadio: React.FC<{
  options: string[];
  selectedValue: string;
  onSelect: (option: string) => void;
}> = ({ options, selectedValue, onSelect }) => {
  const alternative: string[] = ['a', 'b', 'c', 'd'];

  return (
    <>
      {options.map((option, index) => {
        const style =
          option === selectedValue
            ? {
                backgroundContainer: 'bg-dark-green',
                valueContainer: 'bg-beige',
                valueText: 'text-black',
                labelText: 'text-white',
              }
            : {
                backgroundContainer: 'bg-medium-green',
                valueContainer: 'bg-dark-green',
                valueText: 'text-white',
                labelText: 'text-black',
              };
        return (
          <div key={option} className="pb-2">
            <button
              className={`w-full flex rounded-xl items-center p-4 min-h-14 text-left relative ${style.backgroundContainer}`}
              onClick={() => onSelect(option)}
            >
              <div
                className={`absolute rounded-full h-9 w-9 ${style.valueContainer} flex items-center justify-center`}
              >
                <UniteText size="md" weight="bold" textStyle={style.valueText}>
                  {alternative[index]}
                </UniteText>
              </div>
              <div className="pl-11">
                <UniteText size="md" weight="bold" textStyle={style.labelText}>
                  {option}
                </UniteText>
              </div>
            </button>
          </div>
        );
      })}
    </>
  );
};
export { UniteRadio };
