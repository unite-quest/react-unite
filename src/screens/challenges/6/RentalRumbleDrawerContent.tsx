import { Rating } from '@/components/ui/rating';
import { LivingConditions } from '@/shared/utils/rentalRumbleApartments';
import check from '../../../assets/check.png';
import cross from '../../../assets/cross.png';
import gabriel from '../../../assets/gabriel-profile.png';
import mimi from '../../../assets/mimi-profile.png';
import mochi from '../../../assets/mochi-profile.webp';

function fromKeyToLabel(key: string): string {
  switch (key) {
    case 'location':
      return 'Localização';
    case 'view':
      return 'Vista';
    case 'interior':
      return 'Interior';
    case 'exterior':
      return 'Exterior';
    case 'facilities':
      return 'Comodidades';
    default:
      return 'Localização';
  }
}

export const RentalRumbleDrawerContent: React.FC<{
  place: LivingConditions;
  onReject: () => void;
  onApprove: () => void;
}> = ({ place, onReject, onApprove }) => {
  return (
    <>
      {Object.entries(place.ratings).map(([key, rating]) => {
        return (
          <div key={key} className="flex justify-between pb-2">
            <div>
              <span className="font-roboto">{fromKeyToLabel(key)}</span>
            </div>
            <div className="flex items-center">
              <Rating count={rating} />
              <span className="font-roboto font-bold">{rating}/5</span>
            </div>
          </div>
        );
      })}
      <div className="pt-3 pb-3">
        <span className="font-roboto font-bold">Anotações da família</span>
      </div>
      {place.reviews.map(({ user, review }) => {
        const profile = user === 'Gabriel' ? gabriel : user === 'Mimi' ? mimi : mochi;
        return (
          <div key={`${user}-${review}`} className="flex pb-3 items-center">
            <div className="h-12 w-12 border-2 border-purple-400 bg-cool-green rounded-full mr-2 flex items-center justify-center">
              <img src={profile} height={40} width={40} alt={user} />
            </div>
            <div className="w-60">
              <span>{review}</span>
            </div>
          </div>
        );
      })}
      <div className="flex pt-3 pb-20">
        <button
          className="rounded-3xl bg-[#C92626] pt-5 pb-5 w-full mr-5 flex items-center justify-center"
          onClick={onReject}
        >
          <img height={20} width={20} src={cross} />
        </button>
        <button
          className="rounded-3xl bg-[#219262] pt-5 pb-5 w-full flex items-center justify-center"
          onClick={onApprove}
        >
          <img height={20} width={20} src={check} />
        </button>
      </div>
    </>
  );
};
