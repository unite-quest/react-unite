import questionMark from '../../../src/assets/questionmark.png';
import { UniteText } from './unite-text';

const LevelSelector: React.FC<{
  label: string;
  image: string;
  title: string;
  subtitle: string;
  status: 'todo' | 'doing' | 'done';
  onClick: () => void;
}> = ({ label, image, title, subtitle, status, onClick }) => {
  const fullSubtitle = status === 'doing' ? 'EM ANDAMENTO' : 'CONCLUÍDO';

  const doingOrDone = (
    <>
      <div className="flex flex-col">
        <UniteText size="md" weight="bold" textStyle="text-white">
          {title}
        </UniteText>
        <UniteText size="xs" weight="light" textStyle="text-white">
          {fullSubtitle} {subtitle}
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
    <div className="absolute ">
      <img src={questionMark} height={50} width={50} />
    </div>
  );

  return (
    <>
      <div
        className="p-10 flex justify-between bg-blend-multiply bg-cover bg-center bg-neutral-400 relative"
        style={{ backgroundImage: `url('${image}')` }}
      >
        <div className="h-10 w-10 border-2 border-white flex items-center justify-center bg-dark-green">
          <UniteText size="md" weight="bold" textStyle="text-white">
            {label}
          </UniteText>
        </div>
        {status === 'todo' ? todo : doingOrDone}
      </div>
    </>
  );
};
export { LevelSelector };
