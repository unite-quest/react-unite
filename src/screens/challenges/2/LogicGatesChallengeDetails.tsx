import { ChallengeFooter } from '@/components/shell/ChallengeFooter';
import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
import { BottomDrawerContext } from '@/shared/bottom-drawer/BottomDrawerProvider';
import { ModalContext } from '@/shared/modal/ModalProvider';
import { ChallengeRouteIdentifier } from '@/shared/utils/ChallengeIdentifiers';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import { useCurrentQuestion } from 'src/hooks/useCurrentQuestion';

function LogicGatesChallenge() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<boolean[]>(Array(3).fill(false));
  const { openModal } = useContext(ModalContext);
  const { openDrawer } = useContext(BottomDrawerContext);
  //const { id: questionId } = useCurrentQuestion();

  const submit = async () => {
    if (!inputs[0] && (inputs[1] || inputs[2])) {
      openModal({
        type: 'success',
        message: '',
        onPrimaryPress: () => {
          navigate(`/challenge/${ChallengeRouteIdentifier.Three_Video}/landing`);
        },
      });
    } else {
      openModal({
        type: 'failure',
        message: 'Hmmm, não exatamente. Revise sua resposta',
      });
    }
  };

  return (
    <>
      <ChallengeScreen
        Footer={<ChallengeFooter title="Submeter" onClick={submit} />}
        onTipClick={() => {
          openDrawer({
            title: 'Não entendeu?',
            message:
              'Cada porta lógica de acordo com a entrada gera uma saida. <br> NOT: (entrada=1, saida=0), (entrada=0, saida=1)\nOR: (entrada1=1, entrada2=1, saida=1) ou (entrada1=1, entrada2=0, saida=1) ou (entrada1=0, entrada2=1, saida=1) ou (entrada1=0, entrada2=0, saida=0)\nAND: (entrada1=1, entrada2=1, saida=1) ou (entrada1=1, entrada2=0, saida=0) ou (entrada1=0, entrada2=1, saida=0) ou (entrada1=0, entrada2=0, saida=0)\n',
          });
        }}
      >
        <div className="pt-6 pb-12 text-left">
          <span>
            Este é um exercício de portas lógicas, clique nos botões para deixá-los na combinação
            necessária para que o "?" seja 1. Estamos dependendo de você para nos formarmos!
          </span>
        </div>
        <div className="flex">
          <div className="w-1/3"></div>
          <div className="w-1/3 border-4 border-black border-solid h-10">?</div>
          <div className="w-1/3"></div>
        </div>
        <div className="flex">
          <div className="w-1/2"></div>
          <div className="w-1/2 border-l-4 border-black border-solid h-10" />
        </div>
        <div className="flex">
          <div className="w-full border-4 border-black border-solid h-10">AND</div>
        </div>
        <div className="flex">
          <div className="w-1/6"></div>
          <div className="w-1/6 border-l-4 border-black border-solid h-10" />
          <div className="w-1/3"></div>
          <div className="w-1/3 border-l-4 border-black border-solid h-10" />
        </div>
        <div className="flex">
          <div className="w-1/3 border-4 border-black border-solid h-10">NOT</div>
          <div className="w-2/3 border-4 border-black border-solid h-10"> OR</div>
        </div>
        <div className="flex">
          <div className="w-1/6"></div>
          <div className="w-1/6 border-l-4 border-black border-solid h-10" />
          <div className="w-1/6"></div>
          <div className="w-1/6 border-l-4 border-black border-solid h-10" />
          <div className="w-1/6"></div>
          <div className="w-1/6 border-l-4 border-black border-solid h-10" />
        </div>
        <div className="flex">
          {inputs.map((input, index) => {
            return (
              <button
                className={'w-1/3 h-10 rounded-full ' + (input ? 'bg-emerald-600' : 'bg-red-600')}
                onClick={() =>
                  setInputs(prevArray => {
                    let newArr = [...prevArray];
                    newArr[index] = !prevArray[index];
                    return newArr;
                  })
                }
              >
                {input ? '1' : '0'}
              </button>
            );
          })}
        </div>
      </ChallengeScreen>
    </>
  );
}

export default LogicGatesChallenge;
