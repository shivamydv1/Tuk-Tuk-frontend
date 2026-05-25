import API from "./axios";

// ── Guest Login ─────────────────────────────────────────────
export const guestLogin = async () => {
  try {
    const response = await API.post("/api/auth/guest");
    return response.data;
  } catch (error) {
    console.log("Guest Login Error:", error.response?.data || error.message);
    throw error;
  }
};


// ── Firebase Phone Auth (Replaces Twilio) ───────────────────
// Backend endpoint: /api/auth/firebase-phone
export const firebasePhoneAuth = async (idToken, phoneNumber, name) => {
  try {
    const response = await API.post("/api/auth/firebase-phone", {
      idToken,
      phoneNumber,
      ...(name ? { name } : {}),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ── Social Logins (Native Implementation) ───────────────────

export const googleLogin = async (idToken, name) => {
  try {
    const response = await API.post("/api/auth/google-login", { idToken, name });
    return response.data;
  } catch (error) {
    console.log("Google API Error:", error.response?.data || error.message);
    throw error;
  }
};

export const facebookLogin = async (accessToken) => {
  try {
    const response = await API.post("/api/auth/facebook-login", { accessToken });
    return response.data;
  } catch (error) {
    console.log("Facebook API Error:", error.response?.data || error.message);
    throw error;
  }
};

export const appleLogin = async (identityToken) => {
  const response = await API.post("/api/auth/apple-login", { identityToken });
  return response.data;
};
