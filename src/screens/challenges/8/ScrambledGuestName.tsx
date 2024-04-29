import { useState } from 'react';
import paper from '../../../assets/torn-paper.webp';

function getRotations(letters: string[]): string[] {
  return letters.map(() => {
    const angle = Math.floor(Math.random() * 360);
    return `${angle}deg`;
  });
}

export const ScrambledGuestName: React.FC<{ name: string }> = ({ name }) => {
  const letters: string[] = name.split('');
  const [rotations] = useState(getRotations(letters));

  return (
    <div className="grid grid-cols-3">
      {letters.map((letter, index) => {
        return (
          <div
            key={`${letter}-${index}`}
            className="relative h-28 w-28 flex justify-center items-center"
          >
            <img
              className="absolute"
              style={{ rotate: rotations[index] }}
              height={110}
              width={110}
              src={paper}
              alt={`Torn paper with the letter ${letter}`}
            />
            <span className="font-roboto text-5xl z-10">{letter.toUpperCase()}</span>
          </div>
        );
      })}
    </div>
  );
};
