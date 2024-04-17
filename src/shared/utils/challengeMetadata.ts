import { UniteButtonVariants } from '@/components/ui/button';
import LogoQuizIntroImage from '../../assets/challenges-intro/IMG_3706_square.webp';
import LogicGatesIntroImage from '../../assets/challenges-intro/intro-logic-gates.webp';
import VideoQuizIntroImage from '../../assets/challenges-intro/work.png';
import { ChallengeIdentifier } from './ChallengeIdentifiers';

export type ChallengeMetadata = {
  title: string;
  period: string;
  description: string;
  background: string;
  image: string;
  footer: {
    background: string;
    buttonColor: UniteButtonVariants;
  };
};

export const challengeMetadataMap: Record<ChallengeIdentifier, ChallengeMetadata> = {
  [ChallengeIdentifier.One_LogoQuiz]: {
    title: 'Como tudo começou',
    period: '2012-2014',
    description:
      'Desde o começo do nosso relacionamento jogos sempre fizeram uma parte bem grande de nossas vidas. Ajude a nos aproximar descobrindo o nome dos jogos que vamos gostar!',
    background: 'bg-cool-green',
    image: LogoQuizIntroImage,
    footer: {
      background: 'bg-black',
      buttonColor: 'black',
    },
  },
  [ChallengeIdentifier.Two_LogicGates]: {
    title: 'Portas Lógicas',
    period: '2015-2016',
    description:
      'Depois de 6 anos duros estudando Engenharia da Computação, estamos quase formados! Nos ajude a passar na última prova passando cola (resolvendo o exercício e enviando a resposta correta).',
    background: '',
    image: LogicGatesIntroImage,
    footer: {
      background: '',
      buttonColor: 'cool-green',
    },
  },
  [ChallengeIdentifier.Three_Video]: {
    title: 'Video Quiz',
    period: '2017-2019',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id euismod odio. Donec varius iaculis est, nec varius justo fringilla vitae. Nam elementum, tellus a luctus pulvinar, risus erat sodales eros, non euismod augue metus vel quam.',
    background: 'bg-beige',
    image: VideoQuizIntroImage,
    footer: {
      background: 'bg-black',
      buttonColor: 'black',
    },
  },
  [ChallengeIdentifier.Four_DogCuisine]: {
    title: 'Mochi Cuisine',
    period: '2020',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id euismod odio. Donec varius iaculis est, nec varius justo fringilla vitae. Nam elementum, tellus a luctus pulvinar, risus erat sodales eros, non euismod augue metus vel quam.',
    background: 'bg-cool-green',
    image: 'https://placehold.co/250x250',
    footer: {
      background: '',
      buttonColor: 'cool-green',
    },
  },
  [ChallengeIdentifier.Five_Labyrinth]: {
    title: 'Sneak that Snack',
    period: '2021',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id euismod odio. Donec varius iaculis est, nec varius justo fringilla vitae. Nam elementum, tellus a luctus pulvinar, risus erat sodales eros, non euismod augue metus vel quam.',
    background: 'bg-cool-green',
    image: 'https://placehold.co/250x250',
    footer: {
      background: '',
      buttonColor: 'cool-green',
    },
  },
  [ChallengeIdentifier.Six_ApartmentTinder]: {
    title: 'Life together',
    period: '2022',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id euismod odio. Donec varius iaculis est, nec varius justo fringilla vitae. Nam elementum, tellus a luctus pulvinar, risus erat sodales eros, non euismod augue metus vel quam.',
    background: 'bg-cool-green',
    image: 'https://placehold.co/250x250',
    footer: {
      background: '',
      buttonColor: 'cool-green',
    },
  },
  [ChallengeIdentifier.Seven_SimonSays]: {
    title: 'A new challenger',
    period: '2022',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id euismod odio. Donec varius iaculis est, nec varius justo fringilla vitae. Nam elementum, tellus a luctus pulvinar, risus erat sodales eros, non euismod augue metus vel quam.',
    background: 'bg-cool-green',
    image: 'https://placehold.co/250x250',
    footer: {
      background: '',
      buttonColor: 'cool-green',
    },
  },
};