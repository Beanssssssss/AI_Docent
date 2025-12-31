import { ScrollView, View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useOnboardingStore } from "../../store/onboarding.store";

export default function HomeScreen() {
  const router = useRouter();
  const galleryId = useOnboardingStore((s) => s.gallery);
  const exhibitionId = useOnboardingStore((s) => s.exhibition);

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={{ flex: 1, backgroundColor: "#fff" }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 24,
          flexGrow: 1,
        }}
      >
        {/* AI 도슨트 인사 */}
        <View style={{ marginBottom: 40 }}>
          <Text style={{ fontSize: 24, fontWeight: "600", marginBottom: 12 }}>
            AI 도슨트
          </Text>
          <Text style={{ color: "#4b5563", lineHeight: 22 }}>
            전시를 보며 궁금한 점이 생기면{"\n"}
            작품, 작가, 배경까지 모두 질문해보세요.
          </Text>
        </View>

        {/* 메인 액션 */}
        <View style={{ gap: 16 }}>
          <Pressable
            style={{
              backgroundColor: "#000",
              paddingVertical: 16,
              borderRadius: 16,
            }}
            onPress={() => router.push("/(tabs)/chat")}
          >
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                fontSize: 18,
                fontWeight: "600",
              }}
            >
              AI에게 질문하기
            </Text>
          </Pressable>

          <Pressable
            style={{
              borderWidth: 1,
              borderColor: "#d1d5db",
              paddingVertical: 16,
              borderRadius: 16,
            }}
            onPress={() => router.push("/camera")}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                color: "#1f2937",
              }}
            >
              작품 사진으로 질문하기
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}