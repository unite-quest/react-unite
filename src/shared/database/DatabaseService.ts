import { AnswersModel } from '@/models/AnswersModel';
// eslint-disable-next-line no-restricted-imports
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from 'firebase/firestore/lite';
import { firebaseApp } from '../firebase/FirebaseService';

const db = getFirestore(firebaseApp);

const completeChallenge = async (userId: string, challengeId: string, nextChallengeId: string) => {
  const userDoc = doc(db, 'users', userId);
  await setDoc(userDoc, {
    completedChallenges: arrayUnion(challengeId),
    nextChallenge: nextChallengeId,
  });
};

const getAnswersForQuestion = async (challengeId: string): Promise<AnswersModel | null> => {
  const q = query(collection(db, 'answers'), where('challengeId', '==', challengeId));

  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return null;
  }

  const data = querySnapshot.docs?.[0].data();
  if (!data) {
    return null;
  }

  return new AnswersModel(data);
};

export const DatabaseService = {
  completeChallenge,
  getAnswersForQuestion,
};
