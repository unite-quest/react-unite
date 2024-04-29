import React, { PropsWithChildren, useEffect } from 'react';

interface DrawerData {
  title: string;
  image: string;
  content: JSX.Element;
}

export interface RentalDrawerInterface {
  openRentalDrawer: (data: DrawerData | undefined) => void;
  closeRentalDrawer: () => void;
}

export const RentalDrawerContext = React.createContext<RentalDrawerInterface>({
  openRentalDrawer: () => undefined,
  closeRentalDrawer: () => undefined,
});

export const RentalDrawerProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [drawerInfo, openRentalDrawer] = React.useState<DrawerData | undefined>();

  useEffect(() => {
    if (drawerInfo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [drawerInfo]);

  const closeRentalDrawer = () => {
    openRentalDrawer(undefined);
  };

  return (
    <RentalDrawerContext.Provider value={{ openRentalDrawer, closeRentalDrawer }}>
      {drawerInfo ? (
        <div className="w-full h-full fixed top-0 left-0 z-50">
          <div className="w-full h-full absolute top-0 left-0 bg-black opacity-50 z-60"></div>
          <div className="w-full h-full absolute top-[10%] left-0 bg-white z-70 rounded-t-3xl text-left p-8 overflow-auto animate-out">
            <div className="flex justify-end pb-5">
              <button
                className="h-10 w-10 rounded-full border-black border-2 items-center justify-center"
                onClick={closeRentalDrawer}
              >
                <span className="text-2xl leading-none">×</span>
              </button>
            </div>
            <div>
              {drawerInfo.image ? (
                <div className="pb-5">
                  <img
                    className="w-full rounded-2xl shadow-md"
                    src={drawerInfo.image}
                    height={300}
                    width={300}
                  />
                </div>
              ) : null}
              <div className="pb-5">
                <h1 className="font-bold font-roboto text-3xl">{drawerInfo.title}</h1>
              </div>
              {drawerInfo.content || null}
            </div>
          </div>
        </div>
      ) : null}
      {children}
    </RentalDrawerContext.Provider>
  );
};
