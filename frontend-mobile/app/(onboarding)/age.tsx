import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useOnboardingStore } from "@/store/onboarding.store";

const AGES = ["10대", "20대", "30대", "40대", "50대 이상"];

export default function Age() {
  const router = useRouter();
  const setAge = useOnboardingStore((s) => s.setAge);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>연령대를 선택해주세요</Text>

      {AGES.map((age) => (
        <Pressable
          key={age}
          onPress={() => {
            setAge(age);
            router.push("/(onboarding)/aesthetic");
          }}
          hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
          style={{
            padding: 16,
            borderRadius: 10,
            borderWidth: 1,
            marginBottom: 12,
          }}
        >
          <Text>{age}</Text>
        </Pressable>
      ))}
    </View>
  );
}