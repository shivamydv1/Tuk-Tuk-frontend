import { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  ActivityIndicator,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Search, X, ChevronDown } from "lucide-react-native";
import { sendFirebasePhoneOtp } from "../src/services/firebasePhoneAuth";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { auth } from "../src/config/firebase";

const COUNTRIES = [
  { name: "India", flag: "🇮🇳", code: "+91" },
  { name: "United States", flag: "🇺🇸", code: "+1" },
  { name: "United Kingdom", flag: "🇬🇧", code: "+44" },
  // ... (Aapki baaki list yahan rahegi)
];

export default function EnterMobile() {
  const router = useRouter();
  const recaptchaVerifier = useRef(null);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(COUNTRIES[0]);

  const handleContinue = async () => {
    const trimmed = phone.trim();
    if (trimmed.length < 5) {
      Alert.alert("Invalid", "Please enter a valid phone number.");
      return;
    }

    const e164 = `${selected.code}${trimmed.replace(/^0+/, "")}`;
    setLoading(true);

    try {
      // Pass the recaptcha verifier to the service
      await sendFirebasePhoneOtp(e164, recaptchaVerifier.current);
      router.push({ pathname: "/verify-otp", params: { phone: e164 } });
    } catch (err) {
      console.error(err);
      Alert.alert("Error", err.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#070616" />
      <LinearGradient colors={["#070616", "#110d2f", "#150f3d"]} style={StyleSheet.absoluteFill} />

      {/* Firebase Recaptcha Modal */}
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={auth.app.options}
        attemptInvisibleVerification={true}
      />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={22} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>Enter your number</Text>
        <Text style={styles.subtitle}>We'll send a verification code to confirm your identity.</Text>

        <View style={styles.inputRow}>
          <TouchableOpacity style={styles.countryBtn} onPress={() => setPickerOpen(true)}>
            <Text style={styles.countryBtnFlag}>{selected.flag}</Text>
            <Text style={styles.countryBtnCode}>{selected.code}</Text>
            <ChevronDown size={14} color="rgba(167,139,250,0.8)" />
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Phone number"
            placeholderTextColor="rgba(255,255,255,0.35)"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            editable={!loading}
          />
        </View>

        <TouchableOpacity
          style={[styles.continueBtn, loading && { opacity: 0.7 }]}
          onPress={handleContinue}
          disabled={loading}
        >
          <LinearGradient colors={["#ff4ea3", "#8f56ff"]} style={styles.continueBtnGradient}>
            {loading ? <ActivityIndicator color="white" /> : <Text style={styles.continueBtnText}>Continue</Text>}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#070616" },
  header: { paddingTop: 52, paddingHorizontal: 16, paddingBottom: 8 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.08)", alignItems: "center", justifyContent: "center" },
  body: { flex: 1, paddingHorizontal: 24, paddingTop: 32 },
  title: { color: "white", fontSize: 28, fontWeight: "800", marginBottom: 10 },
  subtitle: { color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 22, marginBottom: 36 },
  inputRow: { flexDirection: "row", gap: 10, marginBottom: 24 },
  countryBtn: { flexDirection: "row", alignItems: "center", gap: 6, height: 54, paddingHorizontal: 12, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.08)", borderWidth: 1, borderColor: "rgba(167,139,250,0.3)", minWidth: 90 },
  countryBtnFlag: { fontSize: 20 },
  countryBtnCode: { color: "white", fontSize: 14, fontWeight: "700" },
  input: { flex: 1, height: 54, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.08)", borderWidth: 1, borderColor: "rgba(255,255,255,0.15)", paddingHorizontal: 16, color: "white", fontSize: 16 },
  continueBtn: { borderRadius: 14, overflow: "hidden" },
  continueBtnGradient: { height: 54, alignItems: "center", justifyContent: "center", borderRadius: 14 },
  continueBtnText: { color: "white", fontSize: 16, fontWeight: "700" },
});
