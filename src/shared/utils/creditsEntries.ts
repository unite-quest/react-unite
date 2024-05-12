export type CreditEntry = {
  label: string;
  image?: string;
  value: string[];
  color: string;
};

export const creditEntries: CreditEntry[] = [
  {
    label: 'Direction',
    value: ['Mimi', 'Gabriel'],
    image: 'https://gabrieltnishimura.github.io/unite/credits/credits1.webp',
    color: 'text-[#1616EF]',
  },
  {
    label: 'Game Design',
    value: ['Mimi', 'Gabriel', 'Humayta'],
    image: 'https://gabrieltnishimura.github.io/unite/credits/credits2.webp',
    color: 'text-[#1414C8]',
  },
  {
    label: 'UI/UX Design',
    value: ['Humayta'],
    color: 'text-[#0F0FD1]',
  },
  {
    label: 'Pixel Art',
    value: ['Matheus Bitencourt', 'ChatGPT', 'Midjourney', 'Mimi'],
    color: 'text-[#1919B3]',
    image: 'https://gabrieltnishimura.github.io/unite/credits/credits3.webp',
  },
  { label: 'Development', value: ['Mimi', 'Gabriel'], color: 'text-[#027599]'}, 
  {
    label: 'Alpha Testing',
    value: ['Paty', 'Luiza', 'Jessica'],
    color: 'text-[#026482]',
    image: 'https://gabrieltnishimura.github.io/unite/credits/credits4.webp'
  },
  {
    label: 'Beta Testing',
    value: ['Caique', 'Carol', 'Claudia', 'Gianfranco', 'Guilherme', 'Fabio', 'Rodrigo', 'Roberto'],
    image: 'https://gabrieltnishimura.github.io/unite/credits/credits5.webp',
    color: 'text-[#024D66]',
  },
  { label: 'Players', value: ['Voce'], color: 'text-[#015F7A]' },
];
