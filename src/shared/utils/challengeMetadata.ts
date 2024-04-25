import { UniteButtonVariants } from '@/components/ui/button';
import { ChallengeIdentifier } from './ChallengeIdentifiers';
const LogoQuizIntroImage =
  'https://gabrieltnishimura.github.io/unite/challenges-intro/intro-logo-quiz.webp';
const LogicGatesIntroImage =
  'https://gabrieltnishimura.github.io/unite/challenges-intro/intro-logic-gates.webp';
const VideoQuizIntroImage =
  'https://gabrieltnishimura.github.io/unite/challenges-intro/intro-video.png';
const DogCuisineIntroImage = 'https://gabrieltnishimura.github.io/unite/mochi/mochi-1.webp';
const SimonSaysIntroImage =
  'https://gabrieltnishimura.github.io/unite/challenges-intro/intro-simon-says.webp';

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
      'Agora que nos formamos na faculdade, estamos focados em juntar dinheiro para nossa futura vida juntos e para organizar nosso casamento. Você poderia nos ajudar a ganhar dinheiro assistindo a um de nossos vídeos no YouTube? Para otimizar o algoritmo, assista-o até o final.',
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
      'Logo antes da pandemia começar, um filhote de Golden Retriever se juntou a nós. O nome dele é MonitorCheckIcon, e ele vai trazer muita felicidade para a nossa família. Ajude-nos a cuidar dele achando os ingredientes corretos para uma refeição nutritiva (e não venenosa) para ele!',
    background: 'bg-cool-green',
    image: DogCuisineIntroImage,
    footer: {
      background: 'bg-black',
      buttonColor: 'black',
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
    title: 'Lar doce lar?',
    period: '2022',
    description:
      'Em 2022 nós finalmente decidimos morar juntos... Mas claro que achar uma casa não seria simples! Ajude nós três a encontrar sugestões de lugares para morar que sejam boas para todos os integrantes.',
    background: 'bg-cool-green',
    image: 'https://placehold.co/250x250',
    footer: {
      background: 'bg-black',
      buttonColor: 'black',
    },
  },
  [ChallengeIdentifier.Seven_SimonSays]: {
    title: 'Quarto membro da família',
    period: '2022',
    description:
      'O Mochi tem se sentido solitário por ser o único cachorro da casa. Antes que a nova e atrevida Corgi, Flan, possa se tornar um membro da família, ela precisa aprender boas maneiras! Ajude Flan a lembrar nossos comandos clicando nos botões na ordem correta.',
    background: 'bg-cool-green',
    image: SimonSaysIntroImage,
    footer: {
      background: '',
      buttonColor: 'cool-green',
    },
  },
};
