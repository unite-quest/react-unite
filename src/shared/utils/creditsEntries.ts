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
    image: 'https://gabrieltnishimura.github.io/unite/challenges-intro/intro-maze.webp',
    color: 'text-[#1616EF]',
  },
  {
    label: 'Game Design',
    value: ['Mimi', 'Gabriel', 'Humayta'],
    image: 'https://gabrieltnishimura.github.io/unite/challenges-intro/intro-maze.webp',
    color: 'text-[#1414C8]',
  },
  {
    label: 'UI/UX Design',
    value: ['Humayta'],
    image: 'https://gabrieltnishimura.github.io/unite/challenges-intro/intro-maze.webp',
    color: 'text-[#0F0FD1]',
  },
  {
    label: 'Pixel Art',
    value: ['Matheus Bitencourt', 'ChatGPT', 'Midjourney', 'Mimi'],
    color: 'text-[#1919B3]',
  },
  { label: 'Development', value: ['Mimi', 'Gabriel'], color: 'text-[#027599]' },
  {
    label: 'Alpha Testing',
    value: ['Paty', 'Luiza', 'Jessica'],
    color: 'text-[#026482]',
  },
  {
    label: 'Beta Testing',
    value: ['Caique', 'Carol', 'Claudia', 'Gianfranco', 'Guilherme', 'Fabio', 'Rodrigo', 'Roberto'],
    color: 'text-[#024D66]',
  },
  { label: 'Players', value: ['Voce'], color: 'text-[#015F7A]' },
];
