import { ChallengeFooter } from '@/components/shell/ChallengeFooter';
import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
import { ModalContext } from '@/shared/modal/ModalProvider';
import { ChallengeRouteIdentifier } from '@/shared/utils/ChallengeIdentifiers';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentQuestion } from 'src/hooks/useCurrentQuestion';
import And from './And';
import Not from './Not';
import NotOrAnd from './NotOrAnd';
import Or from './Or';

type LogicGateMetadata = {
  questionId: string;
  description: string;
  navigate: string;
  numberOfInputs: number;
  validation: (inputs: boolean[]) => boolean;
};
const logicGatesMap: LogicGateMetadata[] = [
  {
    questionId: '1',
    description:
      'Esta é uma porta lógica chamada NOT. Quando o interruptor está ligado, a corrente não passa. Quando o interruptor está desligado, a corrente passa. Tente acender a lâmpada.',
    navigate: `/challenge/${ChallengeRouteIdentifier.Two_LogicGates}/details?id=2`,
    numberOfInputs: 1,
    validation: inputs => {
      console.log(!inputs[0]);
      return !inputs[0];
    },
  },
  {
    questionId: '2',
    description:
      'Esta é uma porta lógica chamada OR. Quando os dois interruptores estão desligados a corrente não passa. Quando qualquer um dos dois, ou os dois interruptores estão ligados a corrente passa. Tente acender a lâmpada.',
    navigate: `/challenge/${ChallengeRouteIdentifier.Two_LogicGates}/details?id=3`,
    numberOfInputs: 2,
    validation: inputs => {
      return inputs[0] || inputs[1];
    },
  },
  {
    questionId: '3',
    description:
      'Esta é uma porta lógica chamada AND. Quando qualquer um dos dois, ou os dois interruptores estão desligados a corrente não passa. Quando os dois interruptores estão ligados a corrente passa. Tente acender a lâmpada.',
    navigate: `/challenge/${ChallengeRouteIdentifier.Two_LogicGates}/details?id=4`,
    numberOfInputs: 2,
    validation: inputs => {
      return inputs[0] && inputs[1];
    },
  },
  {
    questionId: '4',
    description:
      'Escolha a combinação de interruptores ligados ou desligados que farão a lâmpada acender. A nossa formatura está dependendo de você!',
    navigate: `/challenge/${ChallengeRouteIdentifier.Three_Video}/landing`,
    numberOfInputs: 3,
    validation: inputs => {
      return !inputs[0] && (inputs[1] || inputs[2]);
    },
  },
  {
    questionId: '5',
    description:
      'Escolha a combinação de interruptores ligados ou desligados que farão a lâmpada acender. A nossa formatura está dependendo de você!',
    navigate: `/challenge/${ChallengeRouteIdentifier.Three_Video}/landing`,
    numberOfInputs: 3,
    validation: inputs => {
      return !inputs[0] && (inputs[1] || inputs[2]);
    },
  },
];

function timeout(delay: number) {
  return new Promise(res => setTimeout(res, delay));
}

function LogicGatesChallenge() {
  const navigate = useNavigate();
  const [lightState, setLight] = useState<boolean>(false);
  const [submitState, setSubmitState] = useState<boolean>(false);
  const [showProgressBar, setShowProgressBar] = useState<boolean>(false);
  const [progressBar, setProgressBar] = useState<number>(0);
  const { openModal } = useContext(ModalContext);
  const { id: questionId } = useCurrentQuestion();
  const meta = logicGatesMap[questionId - 1];
  const [inputs, setInputs] = useState<boolean[]>(Array(meta.numberOfInputs).fill(false));
  const progressBarPosition = questionId === 4 ? 'left-[90%]' : 'left-[75%]';

  useEffect(() => {
    setInputs(Array(meta.numberOfInputs).fill(false));
    setLight(false);
    setShowProgressBar(false);
    setProgressBar(0);
    setSubmitState(false);
  }, [questionId]);

  const toggleSwitch = (index: number) => {
    setInputs(inputs.map((input, idx) => (idx === index ? !input : input)));
  };

  const submit = async () => {
    setSubmitState(true);
    setShowProgressBar(true);
    await timeout(200);
    setProgressBar(100);
    await timeout(1000);
    if (meta.validation(inputs)) {
      setLight(true);
    }
    await timeout(1000);
    if (meta.validation(inputs) && (questionId === 4 || questionId === 5)) {
      openModal({
        type: 'imageSuccess',
        message: 'Conseguimos nos formar graças à sua cola!',
        image: 'https://gabrieltnishimura.github.io/unite/prom.png',
        dismiss: () => {
          navigate(meta.navigate);
        },
      });
    } else if (meta.validation(inputs)) {
      openModal({
        type: 'challengeCompleted',
        onPrimaryPress: () => {
          navigate(meta.navigate);
        },
      });
    } else {
      openModal({
        type: 'failure',
        message: 'Não acendeu a lâmpada :(',
      });
      setProgressBar(0);
      setShowProgressBar(false);
    }
    setSubmitState(false);
  };

  return (
    <>
      <ChallengeScreen
        description={meta.description}
        Footer={<ChallengeFooter title="Submeter" onClick={submit} disabled={submitState} />}
      >
        <div className="flex justify-center relative">
          {questionId === 1 ? (
            <Not switchState={inputs[0]} lightState={lightState} onClick={() => toggleSwitch(0)} />
          ) : questionId === 2 ? (
            <Or
              switchState1={inputs[0] || false}
              switchState2={inputs[1] || false}
              lightState={lightState}
              onClick1={() => toggleSwitch(0)}
              onClick2={() => toggleSwitch(1)}
            />
          ) : questionId === 3 ? (
            <And
              switchState1={inputs[0] || false}
              switchState2={inputs[1] || false}
              lightState={lightState}
              onClick1={() => toggleSwitch(0)}
              onClick2={() => toggleSwitch(1)}
            />
          ) : questionId === 4 ? (
            <NotOrAnd
              switchState1={inputs[0] || false}
              switchState2={inputs[1] || false}
              switchState3={inputs[2] || false}
              lightState={lightState}
              onClick1={() => toggleSwitch(0)}
              onClick2={() => toggleSwitch(1)}
              onClick3={() => toggleSwitch(2)}
            />
          ) : null}
          {showProgressBar ? (
            <div>
              <div
                className={`w-2.5 bg-gray-200 rounded-full h-full dark:bg-gray-700 mb-1 flex-col-reverse flex absolute ${progressBarPosition}`}
              >
                <div
                  className="bg-dark-green w-2.5 rounded-full"
                  style={{
                    transition: 'height 1s ease-in-out',
                    height: `${progressBar}%`,
                  }}
                ></div>
              </div>
            </div>
          ) : null}
        </div>
      </ChallengeScreen>
    </>
  );
}

export default LogicGatesChallenge;
