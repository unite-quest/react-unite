const UniteRadio: React.FC<{
  options: string[];
  selectedValue: string;
  onSelect: (option: string) => void;
}> = ({ options, selectedValue, onSelect }) => {
  return (
    <>
      {/* wrapper */}
      <div className="">
        {options.map((option, index) => {
          return (
            <button className="w-full flex" key={option} onClick={() => onSelect(option)}>
              <div>{index + 1}</div>
              <div>
                {option} {option === selectedValue ? 'selected' : ''}
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
};
export { UniteRadio };
