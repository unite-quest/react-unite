import { Button } from './button';

const FixedButton: React.FC<{
  title: string;
  variant: 'white' | 'dark' | 'beige';
  onClick: () => void;
  disabled: boolean;
}> = ({ title, variant, disabled, onClick }) => {
  return (
    <>
      <div className="pb-20" />
      <div className="fixed bottom-0 w-full">
        <div className={`bg-${variant} p-5`}>
          <Button variant="secondary" onClick={onClick} disabled={disabled}>
            {title}
          </Button>
        </div>
      </div>
    </>
  );
};
export { FixedButton };
