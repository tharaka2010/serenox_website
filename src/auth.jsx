import { auth, db } from './firebaseConfig';
import { signInWithEmailAndPassword, signOut, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export const signIn = async (email, password) => {
  try {
    await setPersistence(auth, browserLocalPersistence);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const isAdmin = async (user) => {
  if (!user) {
    console.log("isAdmin check: No user provided.");
    return false;
  }

  console.log(`isAdmin check: Checking admin status for user: ${user.uid}`);

  try {
    const adminDocRef = doc(db, 'adminUsers', user.uid);
    const adminDocSnap = await getDoc(adminDocRef);

    if (adminDocSnap.exists()) {
      console.log(`isAdmin check: User ${user.uid} is an admin.`);
      return true;
    } else {
      console.log(`isAdmin check: User ${user.uid} is not an admin.`);
      return false;
    }
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};
