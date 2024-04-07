import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { firebaseApp } from '../firebase/FirebaseService';

const db = getFirestore(firebaseApp);

const getUserDetails = async () => {
  await addDoc(collection(db, 'users'), {
    first: 'Ada',
    last: 'Lovelace',
    born: 1815,
  });
};

const completeChallenge = async (userId: string, challengeId: string, nextChallengeId: string) => {
  const userDoc = doc(db, 'users', userId);
  await setDoc(userDoc, {
    completedChallenges: arrayUnion(challengeId),
    nextChallenge: nextChallengeId,
  });
};

// returns next challenge if correct
const validateAnswersAndGetNextChallenge = async (
  challengeId: string,
  answers: Record<string, string>,
): Promise<string | null> => {
  let q = query(collection(db, 'answers'));
  Object.entries(answers).forEach(([key, value]) => {
    q = query(q, where(key, '==', value));
  });

  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return null;
  }

  const document = querySnapshot.docs?.[0];
  console.log(document.id);
  if (!document || document.id !== challengeId) {
    return null;
  }

  const nextChallenge = document.data().nextChallenge || null;
  // workaround cos idk how to query the first
  if (nextChallenge) {
    return nextChallenge;
  }

  return null;
};

export const DatabaseService = {
  getUserDetails,
  completeChallenge,
  validateAnswersAndGetNextChallenge,
};
