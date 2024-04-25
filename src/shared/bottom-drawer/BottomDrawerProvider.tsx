import React, { PropsWithChildren, useEffect } from 'react';

interface DrawerData {
  title: string;
  variant?: 'default' | 'rental';
  message?: string;
  image?: string;
  content?: JSX.Element;
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

  useEffect(() => {
    if (drawerInfo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [drawerInfo]);

  const closeDrawer = () => {
    openDrawer(undefined);
  };

  return (
    <BottomDrawerContext.Provider value={{ openDrawer, closeDrawer }}>
      {drawerInfo ? (
        <div className="w-full h-full fixed top-0 left-0 z-50">
          <div className="w-full h-full absolute top-0 left-0 bg-black opacity-50 z-60"></div>
          <div className="w-full h-full absolute top-[10%] left-0 bg-white z-70 rounded-t-3xl text-left p-9">
            <div className="flex justify-end pb-5">
              <button
                className="h-10 w-10 rounded-full border-black border-2 items-center justify-center"
                onClick={closeDrawer}
              >
                <span className="text-2xl leading-none">×</span>
              </button>
            </div>
            <div>
              {drawerInfo.image ? (
                <div className="pb-5">
                  <img className="w-full rounded-2xl shadow-md" src={drawerInfo.image} />
                </div>
              ) : null}
              <div className="pb-5">
                <h1
                  className={`font-bold ${drawerInfo.variant === 'rental' ? 'font-roboto text-3xl' : 'font-pt-serif text-xl'}`}
                >
                  {drawerInfo.title}
                </h1>
              </div>
              {drawerInfo.message ? (
                <div className="">
                  <span className="font-roboto text-sm">{drawerInfo.message}</span>
                </div>
              ) : null}
              {drawerInfo.content || null}
            </div>
          </div>
        </div>
      ) : null}
      {children}
    </BottomDrawerContext.Provider>
  );
};
