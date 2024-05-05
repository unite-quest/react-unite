import { Rating } from '@/components/ui/rating';
import { StackSpacing } from '@/components/ui/stack-spacing';
import { UniteText } from '@/components/ui/unite-text';
import { LivingConditions } from '@/shared/utils/rentalRumbleApartments';
import check from '../../../assets/check.png';
import cross from '../../../assets/cross.png';
import gabriel from '../../../assets/gabriel-profile.png';
import mimi from '../../../assets/mimi-profile.png';
import mochi from '../../../assets/mochi-profile.webp';

export const RentalRumbleDrawerContent: React.FC<{
  place: LivingConditions;
  onReject: () => void;
  onApprove: () => void;
}> = ({ place, onReject, onApprove }) => {
  return (
    <>
      {place.ratings.map(({ name, score }) => {
        return (
          <div key={name} className="flex justify-between">
            <div>
              <UniteText>{name}</UniteText>
            </div>
            <div className="flex items-center">
              <Rating count={score} />
              <UniteText weight="bold">{score}/5</UniteText>
            </div>
          </div>
        );
      })}
      <StackSpacing size="sm" />
      <UniteText weight="bold">Anotações da família</UniteText>
      <StackSpacing size="xs" />
      {place.reviews.map(({ user, review }) => {
        const profile = user === 'Gabriel' ? gabriel : user === 'Mimi' ? mimi : mochi;
        return (
          <div key={`${user}-${review}`} className="flex pb-3 items-center">
            <div className="h-12 w-12 border-2 border-purple-400 bg-cool-green rounded-full mr-2 flex items-center justify-center">
              <img src={profile} height={40} width={40} alt={user} />
            </div>
            <div className="w-60">
              <UniteText>{review}</UniteText>
            </div>
          </div>
        );
      })}
      <StackSpacing size="sm" />
      <div className="flex">
        <StackSpacing size="sm" />
        <button
          className="rounded-3xl bg-[#C92626] pt-5 pb-5 w-full mr-5 flex items-center justify-center"
          onClick={onReject}
        >
          <StackSpacing size="sm" />
          <img height={20} width={20} src={cross} />
        </button>
        <button
          className="rounded-3xl bg-[#219262] pt-5 pb-5 w-full flex items-center justify-center"
          onClick={onApprove}
        >
          <img height={20} width={20} src={check} />
        </button>
      </div>
      <StackSpacing size="md" />
      <StackSpacing size="lg" />
    </>
  );
};
