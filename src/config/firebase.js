import { initializeApp, getApps } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// Firebase project configuration for tuk-tuk-cd7ee (Matching Backend)
const firebaseConfig = {
  apiKey: "AIzaSyC_XAG2bGWYoYdmUtCAwrkOVKidWqPS3k0",
  authDomain: "tuk-tuk-cd7ee.firebaseapp.com",
  projectId: "tuk-tuk-cd7ee",
  storageBucket: "tuk-tuk-cd7ee.firebasestorage.app",
  messagingSenderId: "807444567658",
  appId: "1:807444567658:web:38a728dd03819034299c13",
  measurementId: "G-GHLX30ML5H"
};

// Initialize Firebase
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Auth with persistence for React Native
let auth;
if (Platform.OS === "web") {
  auth = getAuth(app);
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

export { auth };
