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
  checked?: boolean;
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
    checked: undefined,
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
        review: 'Pelo menos a internet é rápida',
      },
    ],
  },
  {
    title: 'Kitnet no mar',
    image: 'https://gabrieltnishimura.github.io/unite/rental-rumble/sea-kitchen.webp',
    checked: true,
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
    ],
  },
  {
    title: 'Casa na árvore',
    image: 'https://placehold.co/250x250',
    checked: false,
    ratings: {
      location: Rating.TwoStars,
      view: Rating.FourStars,
      interior: Rating.ThreeStars,
      facilities: Rating.OneStar,
    },
    reviews: [],
  },
  {
    title: 'Flat Caverna',
    image: 'https://placehold.co/250x250',
    checked: undefined,
    ratings: {
      location: Rating.TwoStars,
      view: Rating.FourStars,
      interior: Rating.ThreeStars,
      facilities: Rating.OneStar,
    },
    reviews: [],
  },
  {
    title: 'Condomínio no zoológico',
    image: 'https://placehold.co/250x250',
    checked: false,
    ratings: {
      location: Rating.TwoStars,
      view: Rating.FourStars,
      interior: Rating.ThreeStars,
      facilities: Rating.OneStar,
    },
    reviews: [],
  },
  {
    title: 'Chalé Caverna',
    image: 'https://placehold.co/250x250',
    checked: false,
    ratings: {
      location: Rating.TwoStars,
      view: Rating.FourStars,
      interior: Rating.ThreeStars,
      facilities: Rating.OneStar,
    },
    reviews: [],
  },
];
