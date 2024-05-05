enum Rating {
  ZeroStars,
  OneStar,
  TwoStars,
  ThreeStars,
  FourStars,
  FiveStars,
}

export type LivingConditions = {
  title: string;
  image: string;
  ratings: { name: string; score: Rating }[];
  reviews: {
    user: 'Mochi' | 'Mimi' | 'Gabriel';
    review: string;
  }[];
};

export const rentalRumbleApartments: LivingConditions[] = [
  {
    title: 'Apê no espaço sideral',
    image: 'https://gabrieltnishimura.github.io/unite/rental-rumble/space-apartment.webp',
    ratings: [
      {
        name: 'Silêncio',
        score: 5,
      },
      {
        name: 'Localização',
        score: 0,
      },
      {
        name: 'Raios UV',
        score: 1,
      },
      {
        name: 'Floresta Negra',
        score: 3,
      },
    ],
    reviews: [
      {
        user: 'Mochi',
        review: 'Não consigo passear aqui...',
      },
      {
        user: 'Mimi',
        review: 'iFood está falando que está fora da área de entrega =(',
      },
      {
        user: 'Gabriel',
        review: 'Aposto que não tem pernilongo no espaço!',
      },
    ],
  },
  {
    title: 'Kitnet no meio do mar',
    image: 'https://gabrieltnishimura.github.io/unite/rental-rumble/sea-kitchen.webp',
    ratings: [
      {
        name: 'Comida',
        score: 5,
      },
      {
        name: 'Banho do Mochi',
        score: 2,
      },
      {
        name: 'Felicidade do Mochi',
        score: 5,
      },
      {
        name: 'Maresia',
        score: 3,
      },
    ],
    reviews: [
      {
        user: 'Mimi',
        review: 'Open de frutos do mar whoohooo',
      },
      {
        user: 'Mochi',
        review: 'EU AMO A PRAIA',
      },
      {
        user: 'Gabriel',
        review: 'Isso é mais mar do que praia, mas gostei!',
      },
    ],
  },
  {
    title: 'Condomínio no deserto',
    image: 'https://gabrieltnishimura.github.io/unite/rental-rumble/desert-condo.webp',
    ratings: [
      {
        name: 'Patas Queimadas',
        score: 0,
      },
      {
        name: 'Temperatura',
        score: 1,
      },
      {
        name: 'Localização',
        score: 2,
      },
      {
        name: 'Salada de cactus',
        score: 3,
      },
    ],
    reviews: [
      {
        user: 'Mochi',
        review: 'Socorro, minhas patas estão queimando =(',
      },
      {
        user: 'Mimi',
        review: 'Mochiiiiii',
      },
      {
        user: 'Gabriel',
        review: 'LISAM AL GAIB',
      },
    ],
  },
  {
    title: 'Flat Caverna',
    image: 'https://gabrieltnishimura.github.io/unite/rental-rumble/stalagmite-flat.webp',
    ratings: [
      {
        name: 'Cogumelos',
        score: 3,
      },
      {
        name: 'Temperatura',
        score: 4,
      },
      {
        name: 'Iluminação',
        score: 1,
      },
      {
        name: 'Risco de queda',
        score: 3,
      },
    ],
    reviews: [
      {
        user: 'Mochi',
        review: 'Achei um monte de ossos aqui em baixo!!',
      },
      {
        user: 'Mimi',
        review:
          'Essa caverna tem controle de temperatura natural! Vamos economizar com energia elétrica',
      },
      {
        user: 'Gabriel',
        review: 'Certeza absoluta que eu vou tropeçar nesse musgo maldito e cair no rio',
      },
    ],
  },
  {
    title: 'Chalé no zoológico',
    image: 'https://gabrieltnishimura.github.io/unite/rental-rumble/zoo-apartment.webp',
    ratings: [
      {
        name: 'Biodiversidade',
        score: 5,
      },
      {
        name: 'Excrementos',
        score: 1,
      },
      {
        name: 'Plantas',
        score: 3,
      },
      {
        name: 'Localização',
        score: 4,
      },
    ],
    reviews: [
      {
        user: 'Mochi',
        review: 'Minha dieta seria composta de chinchila, ratinhos, esquilos - delícia!',
      },
      {
        user: 'Mimi',
        review: 'O cheiro disso não deve ser nada agradável...',
      },
      {
        user: 'Gabriel',
        review:
          'De todos os outros, esse é o que tem mais cara de ter um supermercado perto HAHAHA',
      },
    ],
  },
  {
    title: 'Casa no fundo do mar',
    image: 'https://gabrieltnishimura.github.io/unite/rental-rumble/underthesea-house.webp',
    ratings: [
      {
        name: 'Biodiversidade',
        score: 4,
      },
      {
        name: 'Hidropônico',
        score: 3,
      },
      {
        name: 'Localização',
        score: 1,
      },
    ],
    reviews: [
      {
        user: 'Mochi',
        review:
          'Se eu for passear, preciso ir com tanque de oxigênio? Não gostei muito da ideia...',
      },
      {
        user: 'Mimi',
        review: 'Aposto que não vamos conseguir ouvir nossas vizinhas brigando daqui',
      },
      {
        user: 'Gabriel',
        review: 'As pessoas vivem aqui!? Imagina sair para trabalhar e encontrar com tubarões =*(',
      },
    ],
  },
  {
    title: 'Sobrado no metrô',
    image: 'https://gabrieltnishimura.github.io/unite/rental-rumble/subway-apartment.webp',
    ratings: [
      {
        name: 'Barulho',
        score: 0,
      },
      {
        name: 'Hora do rush',
        score: 0,
      },
      {
        name: 'Cozinha "aberta"',
        score: 5,
      },
    ],
    reviews: [
      {
        user: 'Mochi',
        review: 'Não?',
      },
      {
        user: 'Mimi',
        review: 'Não.',
      },
      {
        user: 'Gabriel',
        review: 'Ok???',
      },
    ],
  },
];
