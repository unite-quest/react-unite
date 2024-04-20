const UniteRadio: React.FC<{
  options: string[];
  selectedValue: string;
  onSelect: (option: string) => void;
}> = ({ options, selectedValue, onSelect }) => {
  const alternative: string[] = ['a', 'b', 'c', 'd'];
  return (
    <>
      {/* wrapper */}
      <div className="">
        {options.map((option, index) => {
          return (
            <div className="p-1">
              <button
                className="w-full flex bg-medium-green rounded-md  h-15"
                key={option}
                onClick={() => onSelect(option)}
              >
                <div className=" bg-dark-green rounded-full h-full text-white">
                  {alternative[index]}
                </div>
                <div>
                  {option} {option === selectedValue ? 'selected' : ''}
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};
export { UniteRadio };
