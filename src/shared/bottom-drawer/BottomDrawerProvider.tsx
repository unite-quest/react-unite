import React, { PropsWithChildren, useEffect } from 'react';

interface DrawerData {
  title: string;
  message: string;
}

export interface BottomDrawerInterface {
  openDrawer: (data: DrawerData | undefined) => void;
}

export const BottomDrawerContext = React.createContext<BottomDrawerInterface>({
  openDrawer: () => undefined,
});

export const BottomDrawerProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [drawerInfo, openDrawer] = React.useState<DrawerData | undefined>(undefined);

  useEffect(() => {
    if (drawerInfo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [drawerInfo]);

  const dismiss = () => {
    openDrawer(undefined);
  };

  return (
    <BottomDrawerContext.Provider value={{ openDrawer }}>
      {drawerInfo ? (
        <div className="w-full h-full absolute top-0 left-0 z-50">
          <div className="w-full h-full absolute top-0 left-0 bg-black opacity-50 z-60"></div>
          <div className="w-full h-full absolute top-[20%] left-0 bg-white z-70 rounded-t-3xl text-left p-5">
            <div className="flex justify-end">
              <button
                className="h-10 w-10 rounded-full border-black border-2 items-center justify-center"
                onClick={dismiss}
              >
                <span className="text-2xl leading-none">×</span>
              </button>
            </div>
            <div>
              <div className="pb-5">
                <h1 className="font-pt-serif font-bold text-xl">{drawerInfo.title}</h1>
              </div>
              <div className="">
                <span className="font-roboto text-sm">{drawerInfo.message}</span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {children}
    </BottomDrawerContext.Provider>
  );
};
