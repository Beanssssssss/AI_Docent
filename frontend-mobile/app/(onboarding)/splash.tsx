import { View, Text } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace("/(onboarding)/age");
    }, 1800);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F6F4EF" }}>
      <Text style={{ fontSize: 28, fontWeight: "600" }}>내 안의 작은 미술관</Text>
      <Text style={{ marginTop: 8, fontSize: 16 }}>AI Docent</Text>
    </View>
  );
}