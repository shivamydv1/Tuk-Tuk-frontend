import { auth } from "../config/firebase";
import { signInWithPhoneNumber } from "firebase/auth";

let confirmationResult = null;

export const sendFirebasePhoneOtp = async (phoneNumber, verifier) => {
  try {
    // verifier mobile par 'FirebaseRecaptchaVerifierModal' se aayega
    // aur web par 'RecaptchaVerifier' se.
    confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, verifier);
    return confirmationResult;
  } catch (error) {
    console.error("Firebase Send OTP Error:", error);
    throw error;
  }
};

export const confirmFirebasePhoneOtp = async (code) => {
  if (!confirmationResult) {
    throw new Error("OTP session expired. Please resend the code.");
  }

  try {
    const credential = await confirmationResult.confirm(code);
    const idToken = await credential.user.getIdToken(true);

    return {
      idToken,
      phoneNumber: credential.user.phoneNumber,
    };
  } catch (error) {
    console.error("Firebase Confirm OTP Error:", error);
    throw error;
  }
};

export const clearFirebasePhoneOtp = () => {
  confirmationResult = null;
};
