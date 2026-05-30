
# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
=======
# Tuk-Tuk-App
Tuk-Tuk is a modern social and dating mobile application built using React Native and Expo, designed to help users connect, chat, discover nearby people, and engage through interactive features like Blind Pick, Official Chatrooms, and Truth &amp; Dare.
>>>>>>> 0a926f773c5e710b98dbb834e0e7982d6598617a
=======
# Tuk-Tuk-frontend

# Phone Authentication Implementation Guide
​
 This project has been updated to use a universal Phone Authentication system (Android, iOS, Web) via Firebase JS SDK. The previous Twilio-based logic has been replaced to ensure compatibility with Expo Go and web platforms.
​
 ## Key Changes and Updates
​
 ### 1. Firebase Configuration
 - **File:** `src/config/firebase.js`
 - **Change:** Created a centralized Firebase initialization file using the JS SDK. It is configured with the `tuk-tuk-application` project credentials to match the backend environment.
 - **Why:** This allows the app to run on all platforms without needing native modules that often crash in Expo Go.

 - 
### 2. Universal Auth Service
 - **File:** `src/services/firebasePhoneAuth.js`
 - **Change:** Rewrote OTP sending (`sendFirebasePhoneOtp`) and confirmation (`confirmFirebasePhoneOtp`) functions.
 - **Output:** The service now retrieves a secure `idToken` from Firebase, which is essential for backend-side verification.

### 3. Enhanced UI Components
 - **File:** `Components/enter-mobile.jsx`
     - Integrated `FirebaseRecaptchaVerifierModal` for invisible verification on mobile.
     - Added a hidden Recaptcha container for web support.
     - Updated `handleContinue` to pass the Recaptcha verifier to the auth service.
 - **File:** `Components/verify-otp.jsx`
     - Updated the verification flow to send the Firebase `idToken` and `phoneNumber` to the backend endpoint `/api/auth/firebase-phone`.
     - Implemented session saving logic using `authStore` upon successful backend response.
​
 ### 4. API Layer Cleanup
 - **File:** `src/api/authApi.js`
     - Removed legacy Twilio-related endpoints (`send-otp`, `verify-otp`).
     - Added `firebasePhoneAuth` function to communicate with the Spring Boot backend's Firebase verification controller.
​
 ### 5. Required Dependencies
 To support this universal flow, the following packages were installed:
 - `firebase`: Core SDK.
 - `expo-firebase-recaptcha`: Managed recaptcha for Expo.
 - `react-native-webview`: Required for the recaptcha modal.
 - `@react-native-async-storage/async-storage`: For session persistence.


## Backend Synchronization
 The frontend now generates an `idToken` specifically for the `tuk-tuk-application` project. The backend verifies this token using the Firebase Admin SDK. **Both must use the same Firebase Project ID** to avoid "Audience (aud) claim mismatch" errors.
​
 ## Testing Instructions
 1. **Enable Phone Auth:** Ensure Phone Authentication is enabled in the Firebase Console for project `tuk-tuk-application`.
 2. **Add Test Numbers:** Use the "Phone numbers for testing" section in Firebase Console to add your number and a fixed 6-digit code (e.g., `123456`) to skip SMS billing during development.
 3. **Run App:** Execute `npx expo start -c` to clear cache and start the project.
>>>>>>> 313ac27be9a00f623f195a53147db66404b179ac
