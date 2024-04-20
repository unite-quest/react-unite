import { AnswersModel } from '@/models/AnswersModel';
import { ChallengeIdentifier, fromChallengeIdentifierToDBKey } from './ChallengeIdentifiers';
import { oneWayHash } from './oneWayHash';

function sanitizeAnswer(appAnswer: string): string {
  const trimmed = appAnswer.trim().toLowerCase();
  return trimmed.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

async function persistAnswerKey(key: string): Promise<void> {
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
