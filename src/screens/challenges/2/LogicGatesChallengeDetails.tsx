import { ChallengeFooter } from '@/components/shell/ChallengeFooter';
import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
import { BottomDrawerContext } from '@/shared/bottom-drawer/BottomDrawerProvider';
import { ModalContext } from '@/shared/modal/ModalProvider';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentQuestion } from 'src/hooks/useCurrentQuestion';
import Not from './Not';

function timeout(delay: number) {
  return new Promise(res => setTimeout(res, delay));
}

function LogicGatesChallenge() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<boolean[]>(Array(3).fill(false));
  const [switchState, setSwitch] = useState<boolean>(false);
  const [lightState, setLight] = useState<boolean>(false);
  const [progressBar, setProgressBar] = useState<number>(0);
  const { openModal } = useContext(ModalContext);
  const { openDrawer } = useContext(BottomDrawerContext);
  const { id: questionId } = useCurrentQuestion();

  const toggleSwitch = () => {
    setSwitch(prevState => !prevState);
    console.log(switchState);
  };

  const submit = async () => {
    setProgressBar(100);
    await timeout(1000);
    if (!switchState) {
      setLight(true);
    }
    await timeout(1000);
    if (!switchState) {
      openModal({
        type: 'challengeCompleted',
        onPrimaryPress: () => {
          //navigate(`/challenge/${ChallengeRouteIdentifier.Three_Video}/landing`);
        },
      });
    } else {
      openModal({
        type: 'failure',
        message: 'Não acendeu a lâmpada :(',
      });
      setProgressBar(0);
    }
  };

  return (
    <>
      <ChallengeScreen
        description="Esta é uma porta lógica chamada NOT. Quando o interruptor está ligado, a corrente não passa. Quando o interruptor está desligado, a corrente passa. Tente acender a lâmpada."
        Footer={<ChallengeFooter title="Submeter" onClick={submit} />}
        onTipClick={() => {
          openDrawer({
            title: 'Não entendeu?',
            message:
              'Cada porta lógica de acordo com a entrada gera uma saida. <br> NOT: (entrada=1, saida=0), (entrada=0, saida=1)\nOR: (entrada1=1, entrada2=1, saida=1) ou (entrada1=1, entrada2=0, saida=1) ou (entrada1=0, entrada2=1, saida=1) ou (entrada1=0, entrada2=0, saida=0)\nAND: (entrada1=1, entrada2=1, saida=1) ou (entrada1=1, entrada2=0, saida=0) ou (entrada1=0, entrada2=1, saida=0) ou (entrada1=0, entrada2=0, saida=0)\n',
          });
        }}
      >
        <div className="flex justify-center relative">
          <Not switchState={switchState} lightState={lightState} onClick={toggleSwitch} />
          <div>
            <div className="w-2.5 bg-gray-200 rounded-full h-full dark:bg-gray-700 mb-1 flex-col-reverse flex absolute left-[70%]">
              <div
                className="bg-dark-green w-2.5 rounded-full"
                style={{
                  transition: 'height 1s ease-in-out',
                  height: `${progressBar}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </ChallengeScreen>
    </>
  );
}

export default LogicGatesChallenge;
