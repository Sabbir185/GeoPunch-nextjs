"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { auth, googleProvider, isFirebaseConfigured } from '@/lib/firebase';
import { 
  User, 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword 
} from 'firebase/auth';

interface FirebaseAuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<User | null>;
  signOut: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<User | null>;
  signUpWithEmail: (email: string, password: string) => Promise<User | null>;
}

const FirebaseAuthContext = createContext<FirebaseAuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => null,
  signOut: async () => {},
  signInWithEmail: async () => null,
  signUpWithEmail: async () => null,
});

export const useFirebaseAuth = () => useContext(FirebaseAuthContext);

export const FirebaseAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async (): Promise<User | null> => {
    if (!isFirebaseConfigured) {
      throw new Error('Firebase is not configured. Set NEXT_PUBLIC_FIREBASE_* env vars to enable Google sign-in.');
    }
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    }
  };

  const signOut = async (): Promise<void> => {
    if (!isFirebaseConfigured) return;
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  const signInWithEmail = async (email: string, password: string): Promise<User | null> => {
    if (!isFirebaseConfigured) {
      throw new Error('Firebase is not configured. Set NEXT_PUBLIC_FIREBASE_* env vars to enable email sign-in.');
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error) {
      console.error('Email sign in error:', error);
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, password: string): Promise<User | null> => {
    if (!isFirebaseConfigured) {
      throw new Error('Firebase is not configured. Set NEXT_PUBLIC_FIREBASE_* env vars to enable email sign-up.');
    }
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error) {
      console.error('Email sign up error:', error);
      throw error;
    }
  };

  return (
    <FirebaseAuthContext.Provider value={{
      user,
      loading,
      signInWithGoogle,
      signOut,
      signInWithEmail,
      signUpWithEmail
    }}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};
