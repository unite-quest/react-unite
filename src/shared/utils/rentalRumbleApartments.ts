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
  ratings: {
    location: Rating;
    view: Rating;
    interior: Rating;
    facilities: Rating;
  };
  reviews: {
    user: 'Mochi' | 'Mimi' | 'Gabriel';
    review: string;
  }[];
};

export const rentalRumbleApartments: LivingConditions[] = [
  {
    title: 'Apê no espaço sideral',
    image: 'https://gabrieltnishimura.github.io/unite/rental-rumble/space-apartment.webp',
    ratings: {
      location: Rating.TwoStars,
      view: Rating.FourStars,
      interior: Rating.ThreeStars,
      facilities: Rating.OneStar,
    },
    reviews: [
      {
        user: 'Mochi',
        review: 'Não consigo passear aqui...',
      },
      {
        user: 'Mimi',
        review: 'O Natural da Terra mais próximo daqui é a 30 anos luz!?',
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
    ratings: {
      location: Rating.ThreeStars,
      view: Rating.FourStars,
      interior: Rating.TwoStars,
      facilities: Rating.ThreeStars,
    },
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
        review: 'Isso é mais mar do que praia, mas beleza',
      },
    ],
  },
  {
    title: 'Condomínio no deserto',
    image: 'https://gabrieltnishimura.github.io/unite/rental-rumble/desert-condo.webp',
    ratings: {
      location: Rating.OneStar,
      view: Rating.FourStars,
      interior: Rating.ThreeStars,
      facilities: Rating.ThreeStars,
    },
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
    ratings: {
      location: Rating.OneStar,
      view: Rating.OneStar,
      interior: Rating.ThreeStars,
      facilities: Rating.OneStar,
    },
    reviews: [
      {
        user: 'Mochi',
        review: 'Eu posso comer esse osso aqui em baixo?',
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
    ratings: {
      location: Rating.OneStar,
      view: Rating.TwoStars,
      interior: Rating.ThreeStars,
      facilities: Rating.TwoStars,
    },
    reviews: [
      {
        user: 'Mochi',
        review: 'Se vocês me derem chinchila de café dá manhã eu topo',
      },
      {
        user: 'Mimi',
        review: 'O cheiro disso não deve ser nada agradável...',
      },
      {
        user: 'Gabriel',
        review: 'Pelo menos dá pra ir pro supermercado daqui ¯\\_(ツ)_/¯',
      },
    ],
  },
  {
    title: 'Casa no fundo do mar',
    image: 'https://gabrieltnishimura.github.io/unite/rental-rumble/underthesea-house.webp',
    ratings: {
      location: Rating.TwoStars,
      view: Rating.FourStars,
      interior: Rating.ThreeStars,
      facilities: Rating.OneStar,
    },
    reviews: [
      {
        user: 'Mochi',
        review: 'Se eu for passear, preciso ir com tanque de oxigênio?',
      },
      {
        user: 'Mimi',
        review: 'Aposto que não vamos conseguir ouvir nossas vizinhas brigando daqui',
      },
      {
        user: 'Gabriel',
        review: 'As pessoas vivem aqui!?',
      },
    ],
  },
  {
    title: 'Sobrado no metrô',
    image: 'https://gabrieltnishimura.github.io/unite/rental-rumble/subway-apartment.webp',
    ratings: {
      location: Rating.ZeroStars,
      view: Rating.ZeroStars,
      interior: Rating.ZeroStars,
      facilities: Rating.FiveStars,
    },
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
