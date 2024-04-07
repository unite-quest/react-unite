import React, { PropsWithChildren } from 'react';

export interface LoaderContextInterface {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoaderContext = React.createContext<LoaderContextInterface>({
  loading: false,
  setLoading: () => undefined,
});

export const LoaderProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = React.useState(true);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {loading ? (
        <div className="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50">
          <div className="flex justify-center items-center mt-[50vh]">PLACEHOLDER</div>
        </div>
      ) : null}
      {children}
    </LoaderContext.Provider>
  );
};
