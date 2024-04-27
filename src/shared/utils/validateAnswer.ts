import { AnswersModel } from '@/models/AnswersModel';
import { ChallengeIdentifier, fromChallengeIdentifierToDBKey } from './ChallengeIdentifiers';
import { oneWayHash } from './oneWayHash';

function sanitizeAnswer(appAnswer: string): string {
  const trimmed = appAnswer.trim().toLowerCase();
  return trimmed.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export async function persistAnswerKey(key: string): Promise<void> {
  const answers = localStorage.getItem('answers');
  let updatedArray = [];
  if (answers) {
    const tentativeArray = JSON.parse(answers);
    if (Array.isArray(tentativeArray) && !tentativeArray.includes(key)) {
      tentativeArray.push(key);
      updatedArray = tentativeArray;
    }
  } else {
    updatedArray = [key];
  }
  const stringArray = JSON.stringify(updatedArray);
  localStorage.setItem('answers', stringArray);
}

export async function persistAnswerKeyArray(keys: string[]): Promise<void> {
  const answers = localStorage.getItem('answers');
  let updatedArray = [];
  if (answers) {
    const tentativeArray = JSON.parse(answers);
    if (Array.isArray(tentativeArray)) {
      tentativeArray.push(...keys);
      updatedArray = tentativeArray;
    }
  } else {
    updatedArray = [...keys];
  }
  const stringArray = JSON.stringify(updatedArray);
  localStorage.setItem('answers', stringArray);
}

export function getAnswerKey(
  challengeId: ChallengeIdentifier,
  questionId: string,
  appAnswer: string,
  skipSanitization?: boolean,
): string {
  const sanitizedAnswer = skipSanitization ? appAnswer : sanitizeAnswer(appAnswer);
  const dbChallengeId = fromChallengeIdentifierToDBKey(challengeId);
  return `c${dbChallengeId}-q${questionId}-${sanitizedAnswer}`;
}

export async function validateAnswer(
  { answers }: AnswersModel,
  challengeId: ChallengeIdentifier,
  questionId: string,
  appAnswer: string,
  skipSanitization?: boolean,
): Promise<boolean> {
  const hash = getAnswerKey(challengeId, questionId, appAnswer, skipSanitization);
  const hashedAnswer = await oneWayHash(hash);
  return answers.includes(hashedAnswer);
}

export async function validateAndPersistAnswer(
  { answers }: AnswersModel,
  challengeId: ChallengeIdentifier,
  questionId: string,
  appAnswer: string,
  skipSanitization?: boolean,
): Promise<{
  valid: boolean;
}> {
  const sanitizedAnswer = skipSanitization ? appAnswer : sanitizeAnswer(appAnswer);
  const dbChallengeId = fromChallengeIdentifierToDBKey(challengeId);
  const hash = `c${dbChallengeId}-q${questionId}-${sanitizedAnswer}`;
  const hashedAnswer = await oneWayHash(hash);
  const valid = answers.includes(hashedAnswer);

  if (valid) {
    persistAnswerKey(hash);
  }

  return {
    valid,
  };
}

export type SplitChoices = {
  correctChoices: number[];
  incorrectChoices: number[];
};

export async function validateRecordAsAnswer(
  challengeId: ChallengeIdentifier,
  userSelection: Record<number, boolean>,
  answers: AnswersModel,
): Promise<SplitChoices> {
  return await Object.entries(userSelection).reduce<Promise<SplitChoices>>(
    (acc, entries, index) => toSplitChoices(acc, entries, index, answers, challengeId),
    Promise.resolve({
      correctChoices: [],
      incorrectChoices: [],
    }),
  );
}

async function toSplitChoices(
  asyncAcc: Promise<SplitChoices>,
  [key, value]: [key: string, value: boolean],
  index: number,
  answers: AnswersModel,
  challengeId: ChallengeIdentifier,
): Promise<SplitChoices> {
  const acc = await asyncAcc;
  const valid = await validateAnswer(
    answers,
    challengeId,
    String(Number(key) + 1),
    String(value),
    true,
  );

  if (valid) {
    return {
      correctChoices: [...acc.correctChoices, index],
      incorrectChoices: [...acc.incorrectChoices],
    };
  }

  return {
    correctChoices: [...acc.correctChoices],
    incorrectChoices: [...acc.incorrectChoices, index],
  };
}

export async function persistRecordAsCorrectAnswer(
  challengeId: ChallengeIdentifier,
  userSelection: Record<number, boolean>,
): Promise<void> {
  const keys = Object.entries(userSelection).map(([key, value]) => {
    return getAnswerKey(challengeId, String(Number(key) + 1), String(value));
  });
  await persistAnswerKeyArray(keys);
}
