export type CreditEntry =
  | {
      type: 'names';
      label: string;
      image?: string;
      value: string[];
    }
  | {
      type: 'links';
      label: string;
      link: string;
    };

import gabriel from '../../assets/gabriel-profile.png';
import mimi from '../../assets/mimi-profile.png';
import mochi from '../../assets/mochi-profile.webp';

export const creditEntries: CreditEntry[] = [
  {
    type: 'names',
    label: 'Direção',
    value: ['Mimi', 'Gabriel'],
    image: gabriel,
  },
  { type: 'names', label: 'Game Design', value: ['Mimi', 'Gabriel'], image: mimi },
  { type: 'names', label: 'UI/UX Design', value: ['Ricardo Humaytá'], image: mochi },
  {
    type: 'names',
    label: 'Pixel Art',
    value: ['Matheus Bitencourt', 'ChatGPT', 'Midjourney', 'Mimi'],
  },
  { type: 'names', label: 'Desenvolvimento', value: ['Mimi', 'Gabriel'] },
  { type: 'names', label: 'Alpha Testing', value: ['Paty', 'Luiza', 'Jessica'] },
  { type: 'names', label: 'Beta Testing', value: ['TBD'] },
  { type: 'names', label: 'Jogadores', value: ['Você'] },
  { type: 'links', label: 'Github', link: 'https://github.com/unite-quest/react-unite' },
];
