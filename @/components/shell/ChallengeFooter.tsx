import { useCurrentChallenge } from 'src/hooks/useCurrentChallenge';
import { FixedButton } from '../ui/fixed-button';

const ChallengeFooter: React.FC<{
  title: string;
  onClick: () => void;
  disabled?: boolean;
  withArrow?: boolean;
}> = ({ title, onClick, disabled, withArrow }) => {
  const { meta } = useCurrentChallenge();

  return (
    <>
      <FixedButton
        title={title}
        background={meta.footer.background}
        buttonVariant={meta.footer.buttonColor}
        onClick={onClick}
        disabled={disabled}
        withArrow={withArrow}
      />
    </>
  );
};
export { ChallengeFooter };
