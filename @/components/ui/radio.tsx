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
              className={`w-full flex rounded-xl items-center p-2 min-h-14 text-left relative ${style.backgroundContainer}`}
              onClick={() => onSelect(option)}
            >
              <div
                className={`absolute rounded-full h-9 w-9 ${style.valueContainer} flex items-center justify-center`}
              >
                <span className={`font-roboto font-bold text-base ${style.valueText}`}>
                  {alternative[index]}
                </span>
              </div>
              <div className="pl-11">
                <span className={`font-roboto font-medium ${style.labelText}`}>{option}</span>
              </div>
            </button>
          </div>
        );
      })}
    </>
  );
};
export { UniteRadio };
