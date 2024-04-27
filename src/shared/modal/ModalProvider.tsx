import { UniteButton } from '@/components/ui/button';
import React, { PropsWithChildren, useEffect } from 'react';
import poppers from '../../assets/poppers.webp';
import wrench from '../../assets/wrench.webp';
interface ModalData {
  type: 'success' | 'failure' | 'image';
  message: string;
  image?: string;
  dismiss?: () => void;
  onPrimaryPress?: () => void;
}

export interface ModalInterface {
  openModal: (data: ModalData | undefined) => void;
}

export const ModalContext = React.createContext<ModalInterface>({
  openModal: () => undefined,
});

export const ModalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [modalInfo, openModal] = React.useState<ModalData | undefined>(undefined);
  const circleStyle = modalInfo?.type === 'success' ? 'bg-[#219262]' : 'bg-[#C92626]';
  const titleStyle = modalInfo?.type === 'success' ? 'text-[#219262]' : 'text-[#C92626]';

  useEffect(() => {
    if (modalInfo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [modalInfo]);

  const primaryPress = () => {
    modalInfo?.onPrimaryPress?.();
    openModal(undefined);
  };

  const closeModal = () => {
    modalInfo?.dismiss?.();
    openModal(undefined);
  };

  const successOrFailure = modalInfo?.type === 'success' || modalInfo?.type === 'failure';

  return (
    <ModalContext.Provider value={{ openModal }}>
      {modalInfo ? (
        <div className="fixed top-0 left-0 h-full w-full bg-black/[.5] p-5 z-50">
          <div className="flex items-center justify-center h-full">
            <div className="bg-white rounded-3xl min-h-72 min-w-80 p-5 justify-between relative">
              <div className="absolute right-5">
                <button
                  className="h-10 w-10 rounded-full border-black border-2 items-center justify-center"
                  onClick={closeModal}
                >
                  <span className="text-2xl leading-none">×</span>
                </button>
              </div>
              <div className="flex justify-center pb-4">
                {modalInfo.image ? <img height={200} width={200} src={modalInfo.image} /> : null}
                {successOrFailure ? (
                  <div
                    className={`rounded-full w-28 h-28 flex items-center justify-center ${circleStyle}`}
                  >
                    <img
                      height={75}
                      width={75}
                      src={modalInfo.type === 'success' ? poppers : wrench}
                    />
                  </div>
                ) : null}
              </div>
              <div>
                {successOrFailure ? (
                  <div className="pb-4">
                    <h1 className={`font-pt-serif font-bold text-2xl ${titleStyle}`}>
                      {modalInfo.type === 'success' ? 'Sucesso!' : 'Erro ):'}
                    </h1>
                  </div>
                ) : null}
                <span className="break-words font-roboto text-base">{modalInfo.message}</span>
              </div>
              {modalInfo?.onPrimaryPress ? (
                <div className="pt-2">
                  <UniteButton title="Ok" buttonVariant="adventure" onClick={primaryPress} />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
      {children}
    </ModalContext.Provider>
  );
};
