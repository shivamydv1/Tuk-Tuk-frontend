import { initializeApp, getApps } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// Firebase project configuration for tuk-tuk-application (Matching Backend)
const firebaseConfig = {
  apiKey: "AIzaSyC6Vf9KlQtpOOFaptFaJ_jQz1FiYKRDmhc",
  authDomain: "tuk-tuk-application.firebaseapp.com",
  projectId: "tuk-tuk-application",
  storageBucket: "tuk-tuk-application.firebasestorage.app",
  messagingSenderId: "969637468541",
  appId: "1:969637468541:web:9655b97869e82557671414",
  measurementId: "G-62JSVW37Z3"
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
