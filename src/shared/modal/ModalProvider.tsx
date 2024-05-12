import { UniteButton } from '@/components/ui/button';
import { StackSpacing } from '@/components/ui/stack-spacing';
import { UniteText } from '@/components/ui/unite-text';
import React, { PropsWithChildren, useEffect } from 'react';
import useLocationHash from 'src/hooks/useLocationHash';
import poppers from '../../assets/poppers.webp';
import wrench from '../../assets/wrench.webp';

interface ChallengeCompletedModalData {
  type: 'challengeCompleted';
  onPrimaryPress: () => void;
}
interface ImageModalData {
  type: 'imageSuccess';
  image: string;
  message: string;
  dismiss: () => void;
}

interface CustomModalData {
  type: 'success' | 'failure';
  message: string;
  dismiss?: () => void;
  onPrimaryPress?: () => void;
}

type ModalData = CustomModalData | ImageModalData | ChallengeCompletedModalData;

export interface ModalInterface {
  openModal: (data: ModalData | undefined) => void;
}

export const ModalContext = React.createContext<ModalInterface>({
  openModal: () => undefined,
});

export const ModalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const locationHash = useLocationHash();
  const [modalInfo, openModal] = React.useState<ModalData | undefined>(undefined);
  const isSuccess =
    modalInfo?.type === 'success' ||
    modalInfo?.type === 'challengeCompleted' ||
    modalInfo?.type === 'imageSuccess';
  const circleStyle = isSuccess ? 'bg-[#219262]' : 'bg-[#C92626]';
  const titleStyle = isSuccess ? 'text-[#219262]' : 'text-[#C92626]';

  useEffect(() => {
    if (modalInfo) {
      openModal(undefined);
    }
    // hack to close regardless of state
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationHash]);

  useEffect(() => {
    if (modalInfo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [modalInfo]);

  const exceptionLogoQuiz = modalInfo?.type === 'success' && Boolean(modalInfo.onPrimaryPress);

  const primaryPress =
    modalInfo?.type === 'challengeCompleted' || exceptionLogoQuiz
      ? () => {
          modalInfo?.onPrimaryPress?.();
          openModal(undefined);
        }
      : null;

  const image = modalInfo?.type === 'imageSuccess' ? modalInfo.image : null;

  const message =
    modalInfo?.type === 'challengeCompleted'
      ? 'Parabéns, você completou esse nível! Pressione Continuar para ir para o próximo desafio.'
      : modalInfo?.message;

  const closeModal = () => {
    if (modalInfo?.type !== 'challengeCompleted') {
      modalInfo?.dismiss?.();
    }
    openModal(undefined);
  };

  const successOrFailure = isSuccess || modalInfo?.type === 'failure';
  const showDismiss: boolean = exceptionLogoQuiz || Boolean(!primaryPress);

  return (
    <ModalContext.Provider value={{ openModal }}>
      {modalInfo ? (
        <div className="fixed top-0 left-0 h-full w-full bg-black/[.75] p-5 z-50">
          <div className="flex items-center justify-center h-full">
            <div className="bg-white rounded-3xl min-h-72 min-w-80 p-5 justify-between relative">
              {showDismiss ? (
                <div className="absolute right-5">
                  <button
                    className="h-10 w-10 rounded-full border-black border-2 items-center justify-center"
                    onClick={closeModal}
                  >
                    <span className="text-2xl leading-none">×</span>
                  </button>
                </div>
              ) : null}
              <div className="flex justify-center pb-4">
                {image ? (
                  <div className="pt-8">
                    <img className="rounded-full" height={200} width={200} src={image} />
                  </div>
                ) : null}
                {successOrFailure && modalInfo?.type !== 'imageSuccess' ? (
                  <div
                    className={`rounded-full w-28 h-28 flex items-center justify-center ${circleStyle}`}
                  >
                    <img height={75} width={75} src={isSuccess ? poppers : wrench} />
                  </div>
                ) : null}
              </div>
              <div>
                {successOrFailure ? (
                  <div className="pb-4">
                    <h1 className={`font-pt-serif font-bold text-2xl ${titleStyle}`}>
                      {isSuccess ? 'Sucesso!' : 'Erro ):'}
                    </h1>
                  </div>
                ) : null}
                <UniteText align="center">{message}</UniteText>
              </div>
              {primaryPress ? (
                <>
                  <StackSpacing size="md" />
                  <UniteButton title="Continuar" buttonVariant="adventure" onClick={primaryPress} />
                </>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
      {children}
    </ModalContext.Provider>
  );
};
