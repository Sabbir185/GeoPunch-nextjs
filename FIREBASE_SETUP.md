# Firebase Authentication Setup

## Overview
This update adds Google Firebase authentication to the GPS Attendance system. Users can now sign in with Google to send emails from the activity page.

## Key Changes Made

### 1. Added Firebase Dependencies
- `firebase` - Client-side Firebase SDK
- `react-firebase-hooks` - React hooks for Firebase
- `firebase-admin` - Server-side Firebase Admin SDK

### 2. Created Firebase Configuration
- `/lib/firebase.ts` - Firebase client configuration
- `/contexts/FirebaseAuthContext.tsx` - React context for Firebase auth
- `/components/auth/GoogleAuthModal.tsx` - Google sign-in modal

### 3. Updated Components
- `/app/layout.tsx` - Added FirebaseAuthProvider
- `/app/activity/layout.tsx` - Updated header with Google sign-in button
- `/app/activity/page.tsx` - Added authentication check before email sending
- `/app/api/email/send/route.ts` - Updated to support Firebase auth

### 4. Environment Variables Required
Add these to your `.env.local` file:

```env
# Firebase Configuration (for client-side)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin Configuration (for server-side)
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"your_project_id",...}
```

## Firebase Setup Instructions

### 1. Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable Authentication and Google sign-in method

### 2. Get Firebase Config
1. Go to Project Settings → General
2. Scroll down to "Your apps" section
3. Click "Add app" → Web app
4. Copy the configuration values

### 3. Generate Service Account Key
1. Go to Project Settings → Service Accounts
2. Click "Generate new private key"
3. Save the JSON file securely
4. Add the entire JSON content as `FIREBASE_SERVICE_ACCOUNT_KEY` in your `.env.local`

### 4. Configure Google OAuth
1. Go to Authentication → Sign-in method
2. Enable Google provider
3. Add your domain to authorized domains

## How It Works

### For Regular Users (Faculty)
1. Visit the activity page
2. Click "Sign In with Google" button
3. Complete Google OAuth flow
4. Once signed in, can click email links to send emails
5. Authentication status is shown in the header

### For Admin Users
- Admin users can still send emails using the existing cookie-based authentication
- The email API checks for both Firebase auth and admin auth

### Email Sending Flow
1. User clicks email link in the table
2. System checks if user is authenticated with Firebase
3. If not authenticated, shows "Sign in with Google" modal
4. If authenticated, opens email composition modal
5. Email is sent with Firebase ID token for authentication

## Security Features

- Firebase ID tokens are verified server-side
- Users must be authenticated to send emails
- Admin users retain existing permissions
- All email sending is logged for audit purposes

## Testing

1. Start the development server: `yarn dev`
2. Visit `http://localhost:3000/activity`
3. Try clicking email links without signing in (should show auth modal)
4. Sign in with Google and try sending an email
5. Verify emails are received with proper sender information
