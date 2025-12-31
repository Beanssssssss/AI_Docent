import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useOnboardingStore } from "@/store/onboarding.store";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const OPTIONS = [
  { key: "light", title: "가볍게", desc: "편하게 감상하고 싶어요" },
  { key: "medium", title: "적당히", desc: "배경이 궁금해요" },
  { key: "deep", title: "깊이 있게", desc: "맥락까지 알고 싶어요" },
];

export default function Aesthetic() {
  const router = useRouter();
  const setLevel = useOnboardingStore((s) => s.setAesthetic);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Pressable
        onPress={() => router.push("/(onboarding)/age")}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20,
          paddingVertical: 12,
          paddingHorizontal: 8,
        }}
      >
        <MaterialIcons name="arrow-back" size={24} color="#000" />
        <Text style={{ marginLeft: 8, fontSize: 16 }}>이전</Text>
      </Pressable>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>어떻게 안내해드릴까요?</Text>

      {OPTIONS.map((o) => (
        <Pressable
          key={o.key}
          onPress={() => {
            setLevel(o.key);
            router.push("/(onboarding)/gallery");
          }}
          hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
          style={{
            padding: 18,
            borderRadius: 12,
            borderWidth: 1,
            marginBottom: 14,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "600" }}>{o.title}</Text>
          <Text style={{ marginTop: 4, color: "#555" }}>{o.desc}</Text>
        </Pressable>
      ))}
    </View>
  );
}