import questionMark from '../../../src/assets/questionmark.png';
import { UniteText } from './unite-text';

const LevelSelector: React.FC<{
  label: string;
  image: string;
  title: string;
  subtitle: string;
  status: 'todo' | 'doing' | 'done';
  onClick: () => void;
}> = ({ label, image, title, status, onClick }) => {
  const fullSubtitle = status === 'doing' ? 'EM ANDAMENTO' : 'CONCLUÍDO';
  const labelColor = status === 'todo' ? '' : 'border-white bg-dark-green';
  const backgroundColor =
    status === 'todo'
      ? 'bg-neutral-400 bg-blend-luminosity'
      : status === 'doing'
        ? ''
        : 'bg-cool-green bg-blend-multiply';

  const doingOrDone = (
    <>
      <div className="flex flex-col">
        <UniteText size="md" weight="bold" textStyle="text-white" align="center">
          {title}
        </UniteText>
        <UniteText size="xs" weight="light" textStyle="text-white" align="center">
          {fullSubtitle}
        </UniteText>
      </div>
      <div>
        <button
          className="rounded-full border-2 border-black h-10 w-10 flex items-center justify-center bg-white rotate-180"
          onClick={onClick}
        >
          <svg className="h-4 w-4 scale-x-[-1]" viewBox="0 0 256 256">
            <path
              fill="black"
              d="M129.6,38.5c-7.4,7.4-7.4,19.5,0,26.9l43.6,43.6H29c-10.5,0-19,8.5-19,19s8.5,19,19,19h144.2l-43.6,43.6c-7.4,7.4-7.4,19.5,0,26.9c3.7,3.7,8.6,5.6,13.4,5.6c4.9,0,9.7-1.9,13.4-5.6L246,128l-89.5-89.5C149.1,31.1,137.1,31.1,129.6,38.5z"
            />
          </svg>
        </button>
      </div>
    </>
  );

  const todo = (
    <div className="absolute top-0 z-10 w-full h-full flex items-center justify-center">
      <img src={questionMark} height={50} width={50} />
    </div>
  );

  return (
    <>
      <button
        className={`relative bg-cover bg-center ${backgroundColor} w-full h-full`}
        style={{ backgroundImage: `url('${image}')` }}
      >
        <div className="p-10 flex justify-between">
          <div className={`h-10 w-10 border-2 flex items-center justify-center ${labelColor}`}>
            <UniteText size="md" weight="bold" textStyle="text-white">
              {label}
            </UniteText>
          </div>
          {status !== 'todo' ? doingOrDone : null}
        </div>
        {status === 'todo' ? todo : null}
      </button>
    </>
  );
};
export { LevelSelector };
