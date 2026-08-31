import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// If NEXT_PUBLIC_FIREBASE_* env vars aren't set (e.g. not configured yet on
// this deployment), skip real initialization instead of throwing. This file
// is imported from app/layout.tsx (via FirebaseAuthContext), so an eager
// crash here used to take down prerendering for every page, including
// /_not-found — not just the Google sign-in feature that actually needs it.
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId
);

let app: FirebaseApp | undefined;
let auth: Auth;
let db: Firestore;

if (isFirebaseConfigured) {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
} else {
  if (typeof window !== 'undefined') {
    console.warn(
      'Firebase is not configured (missing NEXT_PUBLIC_FIREBASE_* env vars) — Google sign-in is disabled.'
    );
  }
  // Stand-ins so importing this module never throws. Real Firebase calls
  // made against these will fail at call time, not at import/build time —
  // callers should check `isFirebaseConfigured` before using auth/db.
  auth = {} as Auth;
  db = {} as Firestore;
}

// Configure Google provider
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');

export { auth, db, googleProvider };
