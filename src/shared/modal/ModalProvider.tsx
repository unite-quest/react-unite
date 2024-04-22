import { UniteButton } from '@/components/ui/button';
import React, { PropsWithChildren, useEffect } from 'react';

interface ModalData {
  message: string;
  image?: string;
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

  return (
    <ModalContext.Provider value={{ openModal }}>
      {modalInfo ? (
        <div className="fixed top-0 left-0 h-full w-full bg-black/[.5] p-5 z-50">
          <div className="flex items-center justify-center h-full">
            <div className="bg-white rounded-3xl min-h-80 min-w-80 p-5 flex flex-col justify-between">
              <div className="flex justify-center">
                {modalInfo.image ? <img height={200} width={200} src={modalInfo.image} /> : null}
              </div>
              <div>
                <span className="break-words">{modalInfo.message}</span>
              </div>
              <div>
                <UniteButton title="Ok" buttonVariant="adventure" onClick={primaryPress} />
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {children}
    </ModalContext.Provider>
  );
};
