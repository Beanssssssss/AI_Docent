import { View, Text, Pressable, ActivityIndicator, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useOnboardingStore } from "@/store/onboarding.store";
import { useEffect, useState } from "react";
import { fetchGalleries, Gallery } from "@/services/gallery";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function GallerySelect() {
  const router = useRouter();
  const setGallery = useOnboardingStore((s) => s.setGallery);
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadGalleries() {
      try {
        setLoading(true);
        const data = await fetchGalleries();
        setGalleries(data);
      } catch (err) {
        setError("갤러리 목록을 불러오는데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadGalleries();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, padding: 24 }}>
        <Pressable
          onPress={() => router.push("/(onboarding)/aesthetic")}
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
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" />
          <Text style={{ marginTop: 16, color: "#666" }}>갤러리 목록을 불러오는 중...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, padding: 24 }}>
        <Pressable
          onPress={() => router.push("/(onboarding)/aesthetic")}
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
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: "#ff0000", marginBottom: 16 }}>{error}</Text>
          <Pressable
            onPress={() => {
              setError(null);
              setLoading(true);
              fetchGalleries()
                .then(setGalleries)
                .catch((err) => {
                  setError("갤러리 목록을 불러오는데 실패했습니다.");
                  console.error(err);
                })
                .finally(() => setLoading(false));
            }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={{
              padding: 12,
              borderRadius: 8,
              backgroundColor: "#007AFF",
            }}
          >
            <Text style={{ color: "#fff" }}>다시 시도</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 24 }}>
      <Pressable
        onPress={() => router.push("/(onboarding)/aesthetic")}
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
      <Text style={{ fontSize: 22, marginBottom: 20, fontWeight: "600" }}>
        관심있는 갤러리를 선택해주세요
      </Text>

      {galleries.length === 0 ? (
        <Text style={{ color: "#666", textAlign: "center", marginTop: 40 }}>
          등록된 갤러리가 없습니다.
        </Text>
      ) : (
        galleries.map((gallery) => (
          <Pressable
            key={gallery.id}
            onPress={() => {
              setGallery(gallery.id);
              router.push("/(onboarding)/exhibitions");
            }}
            hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
            style={{
              padding: 18,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#ddd",
              marginBottom: 14,
              backgroundColor: "#fff",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600" }}>{gallery.name}</Text>
          </Pressable>
        ))
      )}
    </ScrollView>
  );
}
