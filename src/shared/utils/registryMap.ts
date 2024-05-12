const present1 = 'https://gabrieltnishimura.github.io/unite/registry/hobbiton.webp';
const present2 = 'https://gabrieltnishimura.github.io/unite/registry/kiwi.webp';
const present3 = 'https://gabrieltnishimura.github.io/unite/registry/glowworm.webp';
const present4 = 'https://gabrieltnishimura.github.io/unite/registry/onsen.webp';

export type RegistryEntry = {
  questionId: string;
  image: string;
  text: string;
  price: number;
  totalStock: number;
  currentStock: number;
};

export const registryMap: RegistryEntry[] = [
  {
    questionId: '1',
    image: present1,
    text: 'Tour do cenario de filme Hobbiton',
    price: 365.04,
    totalStock: 2,
    currentStock: 2,
  },
  {
    questionId: '2',
    image: present2,
    text: 'Parque Kiwi Birdlife',
    price: 171.62,
    totalStock: 2,
    currentStock: 2,
  },
  {
    questionId: '3',
    image: present3,
    text: 'Experiência na caverna Waitomo Glowworm',
    price: 1014,
    totalStock: 2,
    currentStock: 2,
  },
  {
    questionId: '3',
    image: present4,
    text: 'Relaxamento no Onsen Hot Pools',
    price: 1140,
    totalStock: 2,
    currentStock: 2,
  },
];
