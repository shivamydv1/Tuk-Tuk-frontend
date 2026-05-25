# Tuk-Tuk-frontend

# Phone Authentication Implementation Guide
​
 This project has been updated to use a universal Phone Authentication system (Android, iOS, Web) via Firebase JS SDK. The previous Twilio-based logic has been replaced to ensure compatibility with Expo Go and web platforms.
​
 ## Key Changes and Updates
​
 ### 1. Firebase Configuration
 - **File:** `src/config/firebase.js`
 - **Change:** Created a centralized Firebase initialization file using the JS SDK. It is configured with the `tuk-tuk-cd7ee` project credentials to match the backend environment.
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
 The frontend now generates an `idToken` specifically for the `tuk-tuk-cd7ee` project. The backend verifies this token using the Firebase Admin SDK. **Both must use the same Firebase Project ID** to avoid "Audience (aud) claim mismatch" errors.
​
 ## Testing Instructions
 1. **Enable Phone Auth:** Ensure Phone Authentication is enabled in the Firebase Console for project `tuk-tuk-cd7ee`.
 2. **Add Test Numbers:** Use the "Phone numbers for testing" section in Firebase Console to add your number and a fixed 6-digit code (e.g., `123456`) to skip SMS billing during development.
 3. **Run App:** Execute `npx expo start -c` to clear cache and start the project.
