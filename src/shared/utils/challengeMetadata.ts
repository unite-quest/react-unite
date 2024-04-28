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
  const LifeTogetherIntroImage =
  'https://gabrieltnishimura.github.io/unite/challenges-intro/intro-life-together.webp';

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
      'Acabamos de nos conhecer no segundo ano da faculdade, voltando no mesmo ônibus de uma recuperação em Álgebra Linear. O que temos em comum é que ambos adoramos jogar. Ajude-nos a fortalecer nossa conexão descobrindo os jogos que gostaremos!',
    background: 'bg-cool-green',
    image: LogoQuizIntroImage,
    footer: {
      background: 'bg-black',
      buttonColor: 'black',
    },
  },
  [ChallengeIdentifier.Two_LogicGates]: {
    title: 'Forme-se quem puder',
    period: '2015-2016',
    description:
      'Depois de 6 anos duros estudando Engenharia da Computação, estamos quase formados! Nos ajude a passar na última prova passando cola (resolvendo o exercício e enviando a resposta correta).',
    background: 'bg-beige',
    image: LogicGatesIntroImage,
    footer: {
      background: 'bg-black',
      buttonColor: 'black',
    },
  },
  [ChallengeIdentifier.Three_Video]: {
    title: 'União de dinheiro',
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
    title: 'Cozinha do Mochi',
    period: '2020',
    description:
      'Logo antes da pandemia começar, um filhote de Golden Retriever está se juntando a nós. O nome dele é Mochi, e ele vai trazer muita felicidade para a nossa família. Ajude-nos a cuidar dele achando os ingredientes corretos para uma refeição nutritiva (e não venenosa) para ele!',
    background: 'bg-cool-green',
    image: DogCuisineIntroImage,
    footer: {
      background: 'bg-black',
      buttonColor: 'black',
    },
  },
  [ChallengeIdentifier.Five_Labyrinth]: {
    title: 'Contrabando de coxinha',
    period: '2021',
    description:
      'Como nem tudo na vida é como a gente quer, estamos passando pelo ano mais difícil de nossas vidas. A Mimi está muito doente e está internada há alguns meses. No hospital não é permitido trazer comida de fora aos pacientes, mas ela está com uma vontade louca de comer coxinha. Me ajude a entrar furtivamente no quarto dela com algumas coxinhas!',
    background: 'bg-cool-green',
    image: 'https://placehold.co/250x250',
    footer: {
      background: 'bg-black',
      buttonColor: 'black',
    },
  },
  [ChallengeIdentifier.Six_ApartmentTinder]: {
    title: 'Lar doce lar?',
    period: '2022',
    description:
      'Nós finalmente decidimos morar juntos depois de uma década namorando, já estava na hora né... Mas claro que achar uma casa não seria simples! Ajude nós três a encontrar sugestões de lugares para morar que sejam boas para todos os integrantes.',
    background: 'bg-cool-green',
    image: LifeTogetherIntroImage,
    footer: {
      background: 'bg-black',
      buttonColor: 'black',
    },
  },
  [ChallengeIdentifier.Seven_SimonSays]: {
    title: 'Quarto membro da família',
    period: '2022',
    description:
      'O Mochi tem se sentido solitário por ser o único cachorro da casa. Antes que a nova e maloqueira Corgi, Flan, possa se tornar um membro da família, ela precisa aprender boas maneiras! Ajude Flan a lembrar nossos comandos clicando nos botões na ordem correta.',
    background: 'bg-cool-green',
    image: SimonSaysIntroImage,
    footer: {
      background: 'bg-black',
      buttonColor: 'black',
    },
  },
  [ChallengeIdentifier.Eight_TornInvite]: {
    title: 'Convites rasgados',
    period: '2024',
    description: 'LOREM IPSUM',
    background: 'bg-cool-green',
    image: '',
    footer: {
      background: 'bg-black',
      buttonColor: 'black',
    },
  },
};
