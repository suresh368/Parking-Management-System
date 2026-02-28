# Firebase Setup Guide for Password Reset

## Prerequisites
You need a Google account to use Firebase.

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter a project name (e.g., "Pitstop Parking Management")
4. (Optional) Enable Google Analytics
5. Click **"Create project"**

## Step 2: Enable Email/Password Authentication

1. In your Firebase project dashboard, click **"Authentication"** in the left sidebar
2. Click **"Get started"** (if first time)
3. Go to **"Sign-in method"** tab
4. Click on **"Email/Password"**
5. Toggle **"Enable"** switch
6. Click **"Save"**

## Step 3: Get Your Firebase Configuration

1. In Firebase Console, click the **gear icon** ⚙️ next to "Project Overview"
2. Select **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click the **web icon** `</>` to add a web app
5. Register your app with a nickname (e.g., "Pitstop Web")
6. You'll see your Firebase configuration object:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  // ... other fields
};
```

## Step 4: Configure Your Project

Copy the following values from the Firebase config to your `.env` file:

- `apiKey` → `VITE_FIREBASE_API_KEY`
- `authDomain` → `VITE_FIREBASE_AUTH_DOMAIN`
- `projectId` → `VITE_FIREBASE_PROJECT_ID`

Example `.env` file:
```env
VITE_FIREBASE_API_KEY=AIzaSyC1234567890abcdefghijklmnop
VITE_FIREBASE_AUTH_DOMAIN=pitstop-parking.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=pitstop-parking
```

## Step 5: Install Firebase SDK

The Firebase SDK is already included in your `package.json`. If needed, run:

```powershell
npm install
```

## Step 6: Configure Email Action Handler (Optional)

For custom password reset pages:

1. In Firebase Console → **Authentication** → **Templates** tab
2. Edit **"Password reset"** template
3. Customize the email template if desired
4. For custom action URL, you can set it to your domain

## Step 7: Test the Setup

1. Restart your development server:
   ```powershell
   # Stop current server (Ctrl+C)
   npm run dev
   ```

2. Go to the Forgot Password page
3. Enter a registered email address
4. Check your email inbox for the password reset link
5. Click the link and set a new password

## Security Note

- **Never commit** your `.env` file to version control
- The `.env` file is already in `.gitignore`
- Share `.env.example` as a template instead

## Troubleshooting

### "Invalid API key" error
- Double-check that you copied the entire API key correctly
- Make sure there are no extra spaces in the `.env` file

### Email not sending
- Verify Email/Password authentication is enabled in Firebase Console
- Check your spam/junk folder
- Wait a few minutes - emails can be delayed

### "Domain not authorized" error
- Go to Firebase Console → Authentication → Settings
- Add your domain to "Authorized domains" list

## Firebase Free Tier Limits

- **10,000 email/password sign-ups** per day
- **100 emails** per day for password reset
- More than enough for development and small-scale production

---

For more details, visit [Firebase Authentication Documentation](https://firebase.google.com/docs/auth)
