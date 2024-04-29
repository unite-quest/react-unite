import check from '../../../src/assets/check-mark.svg';
import { StackSpacing } from './stack-spacing';
import { UniteText } from './unite-text';

const ListItem: React.FC<{
  title: string;
  onClick: () => void;
  checked?: boolean;
}> = ({ title, checked, onClick }) => {
  const color = checked ? 'text-medium-green' : 'text-black';
  return (
    <>
      <button className="w-full border-separator text-left" onClick={checked ? undefined : onClick}>
        <StackSpacing size="sm" />
        <div className="flex justify-between items-center">
          <UniteText weight="bold" textStyle={color}>
            {title}
          </UniteText>
          {checked ? <img height={24} width={24} src={check} /> : null}
        </div>
        <StackSpacing size="sm" />
      </button>
    </>
  );
};
export { ListItem };
