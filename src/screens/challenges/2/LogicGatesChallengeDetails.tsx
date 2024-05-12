import { ChallengeFooter } from '@/components/shell/ChallengeFooter';
import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
import { ModalContext } from '@/shared/modal/ModalProvider';
import { ChallengeRouteIdentifier } from '@/shared/utils/ChallengeIdentifiers';
import { persistAnswerKey } from '@/shared/utils/validateAnswer';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentQuestion } from 'src/hooks/useCurrentQuestion';
import And from './And';
import Hard from './HardLogicGates';
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
    numberOfInputs: 11,
    validation: inputs => {
      return inputs[0] && inputs[1] && inputs[2] && inputs[3];
    },
  },
];

function timeout(delay: number) {
  return new Promise(res => setTimeout(res, delay));
}

function LogicGatesChallenge() {
  const navigate = useNavigate();
  const [lightState, setLight] = useState<boolean>(false);
  const [lightStates, setLightStates] = useState<boolean[]>(Array(4).fill(false));
  const [submitState, setSubmitState] = useState<boolean>(false);
  const [showProgressBar, setShowProgressBar] = useState<boolean>(false);
  const [progressBar, setProgressBar] = useState<number>(0);
  const { openModal } = useContext(ModalContext);
  const { id: questionId } = useCurrentQuestion();
  const meta = logicGatesMap[questionId - 1];
  const [inputs, setInputs] = useState<boolean[]>(Array(meta.numberOfInputs).fill(false));
  const progressBarPosition =
    questionId === 4 ? 'left-[90%]' : questionId === 5 ? 'left-[96%]' : 'left-[75%]';

  useEffect(() => {
    setInputs(Array(meta.numberOfInputs).fill(false));
    setLight(false);
    setShowProgressBar(false);
    setProgressBar(0);
    setSubmitState(false);
  }, [meta.numberOfInputs, questionId]);

  const toggleSwitch = (index: number) => {
    setInputs(inputs.map((input, idx) => (idx === index ? !input : input)));
  };

  const onClockClick = () => {
    setInputs(inputs.map((input, idx) => (idx === 11 ? inputs[10] : input)));
  };

  const onResetClick = () => {
    setInputs(inputs.map((input, idx) => (idx === 11 ? false : input)));
  };

  const onSetClick = () => {
    setInputs(inputs.map((input, idx) => (idx === 11 ? true : input)));
  };

  const validateHardChallenge = () => {
    const lamp1 = (inputs[0] || inputs[1]) && !inputs[2];
    const lamp2 = !(!(inputs[3] || inputs[4]) && inputs[5] === inputs[6]);
    const lamp3 = (inputs[7] || inputs[8]) !== inputs[11];
    const lamp4 = !inputs[11] === !inputs[10];
    return [lamp1, lamp2, lamp3, lamp4];
  };

  const submit = async () => {
    let answers = [...inputs];
    setSubmitState(true);
    setShowProgressBar(true);
    await timeout(200);
    setProgressBar(100);
    if (questionId === 5) {
      answers = validateHardChallenge();
      setLightStates(answers);
      await timeout(1000);
      setLightStates([false, false, false, false]);
    } else {
      await timeout(1000);
      if (meta.validation(answers)) {
        setLight(true);
      }
    }

    await timeout(1000);
    // invalid answer
    if (!meta.validation(answers)) {
      openModal({
        type: 'failure',
        message: questionId === 5 ? 'Reveja a sua resposta :(' : 'Não acendeu a lâmpada :(',
      });
      setProgressBar(0);
      setShowProgressBar(false);
      setSubmitState(false);
      return;
    }

    setSubmitState(false);
    const appAnswer = answers.join('|');
    await persistAnswerKey(`c2-q${questionId}-${appAnswer}`);

    if (questionId === 4 || questionId === 5) {
      openModal({
        type: 'imageSuccess',
        message: 'Conseguimos nos formar graças à sua cola!',
        image: 'https://gabrieltnishimura.github.io/unite/prom.png',
        dismiss: () => {
          navigate(meta.navigate);
        },
      });
    } else if (meta.validation(answers)) {
      openModal({
        type: 'success',
        message: 'Ótima resposta, continue assim!',
        dismiss: () => {
          navigate(meta.navigate);
        },
      });
    }
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
          ) : questionId === 5 ? (
            <Hard
              switchStates={inputs}
              lightStates={lightStates}
              onSwitchClick={(index: number) => toggleSwitch(index)}
              onClockClick={onClockClick}
              onResetClick={onResetClick}
              onSetClick={onSetClick}
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
