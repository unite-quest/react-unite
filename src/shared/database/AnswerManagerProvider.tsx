import { AnswersModel } from '@/models/AnswersModel';
import React, { PropsWithChildren, createContext, useEffect, useState } from 'react';

export interface AnswerManagerContextInput {
  answers: AnswersModel | null | undefined;
}

const defaultState: AnswerManagerContextInput = {
  answers: undefined,
};

export const AnswerManagerContext = createContext<AnswerManagerContextInput>(defaultState);
export const AnswerManagerProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [answers, setAnswers] = useState<AnswersModel | undefined>(undefined);

  useEffect(() => {
    const grabSecretsOnce = async () => {
      const secrets = new AnswersModel(process.env.REACT_APP_SECRET);
      setAnswers(secrets || undefined);
    };
    grabSecretsOnce();
  }, []);

  return (
    <AnswerManagerContext.Provider value={{ answers }}>{children}</AnswerManagerContext.Provider>
  );
};
