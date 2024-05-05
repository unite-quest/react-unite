import { UniteText } from '@/components/ui/unite-text';
import React, { PropsWithChildren, useEffect } from 'react';
import useLocationHash from 'src/hooks/useLocationHash';

interface DrawerData {
  title: string;
  message: string;
  image?: string;
  dismiss?: () => void;
}

export interface BottomDrawerInterface {
  openDrawer: (data: DrawerData | undefined) => void;
  closeDrawer: () => void;
}

export const BottomDrawerContext = React.createContext<BottomDrawerInterface>({
  openDrawer: () => undefined,
  closeDrawer: () => undefined,
});

export const BottomDrawerProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [drawerInfo, openDrawer] = React.useState<DrawerData | undefined>(undefined);
  const locationHash = useLocationHash();

  useEffect(() => {
    if (drawerInfo) {
      closeDrawer();
    }
    // hack to close regardless of state
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationHash]);

  useEffect(() => {
    if (drawerInfo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [drawerInfo]);

  const closeDrawer = () => {
    drawerInfo?.dismiss?.();
    openDrawer(undefined);
  };

  return (
    <BottomDrawerContext.Provider value={{ openDrawer, closeDrawer }}>
      {drawerInfo ? (
        <div className="w-full h-full fixed top-0 left-0 z-50">
          <div className="w-full h-full absolute top-0 left-0 bg-black opacity-75 z-60"></div>
          <div
            className={`w-full ${drawerInfo.image ? 'h-full' : ''} absolute bottom-0 left-0 bg-white z-70 rounded-t-3xl text-left p-8 overflow-auto`}
          >
            <div className="flex justify-end">
              <button
                className="h-10 w-10 rounded-full border-black border-2 items-center justify-center"
                onClick={closeDrawer}
              >
                <span className="text-2xl leading-none">×</span>
              </button>
            </div>
            <div>
              {drawerInfo.image ? (
                <div className="pt-5 pb-5">
                  <img
                    className="w-full rounded-2xl shadow-md"
                    src={drawerInfo.image}
                    height={300}
                    width={300}
                  />
                </div>
              ) : null}
              <div className="pb-5">
                <h1 className="font-bold font-pt-serif text-3xl">{drawerInfo.title}</h1>
              </div>
              <UniteText>{drawerInfo.message}</UniteText>
            </div>
          </div>
        </div>
      ) : null}
      {children}
    </BottomDrawerContext.Provider>
  );
};
