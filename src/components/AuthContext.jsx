import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { signIn as firebaseSignIn, signOutUser as firebaseSignOut, isAdmin } from '../auth';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const adminStatus = await isAdmin(user);
        setIsAdminUser(adminStatus);
      } else {
        setIsAdminUser(false);
      }
      setLoadingAuth(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    console.log('AuthContext.jsx: login function called');
    try {
      await firebaseSignIn(email, password);
    } catch (error) {
      console.error('AuthContext.jsx: Error during firebaseSignIn:', error);
      throw error; // Re-throw to be caught by Login.jsx
    }
  };

  const logout = async () => {
    await firebaseSignOut();
  };

  const value = {
    currentUser,
    isAdminUser,
    loadingAuth,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loadingAuth && children}
    </AuthContext.Provider>
  );
};
