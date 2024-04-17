import { ChallengeFooter } from '@/components/shell/ChallengeFooter';
import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
import { useAnswers } from '@/shared/database/useAnswers';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCurrentChallenge } from 'src/hooks/useCurrentChallenge';
import logo1 from '../../../assets/logos/non-descriptive-image-1.png';
import logo10 from '../../../assets/logos/non-descriptive-image-10.png';
import logo11 from '../../../assets/logos/non-descriptive-image-11.png';
import logo12 from '../../../assets/logos/non-descriptive-image-12.png';
import logo13 from '../../../assets/logos/non-descriptive-image-13.webp';
import logo14 from '../../../assets/logos/non-descriptive-image-14.png';
import logo15 from '../../../assets/logos/non-descriptive-image-15.webp';
import logo2 from '../../../assets/logos/non-descriptive-image-2.png';
import logo3 from '../../../assets/logos/non-descriptive-image-3.png';
import logo4 from '../../../assets/logos/non-descriptive-image-4.webp';
import logo5 from '../../../assets/logos/non-descriptive-image-5.png';
import logo6 from '../../../assets/logos/non-descriptive-image-6.webp';
import logo7 from '../../../assets/logos/non-descriptive-image-7.png';
import logo8 from '../../../assets/logos/non-descriptive-image-8.webp';
import logo9 from '../../../assets/logos/non-descriptive-image-9.svg';

const logos: { image: string; onClick: () => Promise<void>; tip: string }[] = [
  {
    image: logo1,
    onClick: async () => {},
    tip: 'É um jogo eletrônico de quebra-cabeça com elementos de RPG e estratégia, desenvolvido e publicado pela GungHo Online Entertainment',
  },
  {
    image: logo2,
    onClick: async () => {},
    tip: 'O jogo consiste no desenvolvimento de uma vila com a nomeação da preferência do jogador, com o objetivo de melhorá-la e torná-la capaz de defender-se de ataques de outros jogadores.',
  },
  {
    image: logo3,
    onClick: async () => {},
    tip: 'Nesse jogo os jogadores tentam ser a força dominante em uma ilha, construindo estradas, vilas e cidades. Em cada turno, os dados são rolados para determinar quais recursos a ilha produz. Os jogadores coletam esses recursos - madeira, trigo, tijolo, ovelha ou pedra - para construir suas civilizações',
  },
  {
    image: logo4,
    onClick: async () => {},
    tip: 'Nesse jogo você é um fazendeiro em um barraco de madeira com seu cônjuge e um pouco mais. Em um turno, você começa a ter apenas duas ações, um para você e um para o cônjuge, de todas as possibilidades que você encontrará em uma fazenda: recolher barro, madeira ou pedra, cercas de construção, e assim por diante.',
  },
  {
    image: logo5,
    onClick: async () => {},
    tip: '',
  },
  {
    image: logo6,
    onClick: async () => {},
    tip: '',
  },
  {
    image: logo7,
    onClick: async () => {},
    tip: '',
  },
  {
    image: logo8,
    onClick: async () => {},
    tip: '',
  },
  {
    image: logo9,
    onClick: async () => {},
    tip: '',
  },
  {
    image: logo10,
    onClick: async () => {},
    tip: '',
  },
  {
    image: logo11,
    onClick: async () => {},
    tip: '',
  },
  {
    image: logo12,
    onClick: async () => {},
    tip: '',
  },
  {
    image: logo13,
    onClick: async () => {},
    tip: '',
  },
  {
    image: logo14,
    onClick: async () => {},
    tip: '',
  },
  {
    image: logo15,
    onClick: async () => {},
    tip: '',
  },
];

function LogoQuizChallenge() {
  const [answer, setAnswer] = useState<string>('');
  const [params] = useSearchParams();
  const { id } = useCurrentChallenge();
  const questionId = Number(params.get('id') || 0);
  const logo = logos[questionId];

  const { getAnswersForQuestion } = useAnswers();

  const submit = async () => {
    const valid = await getAnswersForQuestion({ challengeId: id, questionId }, answer);
    if (valid) {
      alert('Acertou!');
    } else {
      alert('Errou!');
    }
  };

  return (
    <>
      <ChallengeScreen
        Footer={<ChallengeFooter title="Submeter palpite" onClick={submit} disabled={!answer} />}
        tip={logo.tip}
      >
        <div>
          <div className="pt-6 pb-6 text-left">
            <span>Qual o nome desse jogo?</span>
          </div>
          <div className="pb-10">
            <div className="border-4 border-dark-green rounded-lg p-10 bg-white aspect-square">
              <img className="w-full h-full" src={logo.image} />
            </div>
          </div>
          <input
            className="relative border-2 border-dark-green w-full h-11 rounded-lg"
            onChange={e => setAnswer(e.target.value)}
          />
        </div>
      </ChallengeScreen>
    </>
  );
}

export default LogoQuizChallenge;
