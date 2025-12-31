import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function CameraScreen() {
  const router = useRouter();
  const [isCapturing, setIsCapturing] = useState(false);

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>사진 촬영</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* 카메라 프리뷰 영역 */}
      <View style={styles.cameraPreview}>
        <Text style={styles.previewText}>카메라 프리뷰</Text>
        <Text style={styles.previewSubtext}>
          여기에 카메라 뷰가 표시됩니다
        </Text>
      </View>

      {/* 하단 컨트롤 */}
      <View style={styles.controls}>
        <Pressable
          style={styles.captureButton}
          onPress={() => {
            setIsCapturing(true);
            // 촬영 로직
            setTimeout(() => {
              setIsCapturing(false);
              router.back();
            }, 500);
          }}
        >
          <View style={[styles.captureButtonInner, isCapturing && styles.capturing]} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  cameraPreview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
  previewText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  previewSubtext: {
    color: "#999",
    fontSize: 14,
  },
  controls: {
    paddingBottom: 40,
    paddingTop: 20,
    alignItems: "center",
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  captureButtonInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#fff",
  },
  capturing: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
