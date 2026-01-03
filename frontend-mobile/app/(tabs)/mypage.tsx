import { View, Text } from "react-native";

export default function MyPageScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24, paddingBottom: 120 }}>
      <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 12 }}>
        마이페이지
      </Text>
      <Text style={{ color: "#666", textAlign: "center" }}>
        사용자 정보 및 설정을 관리하는 화면입니다.
      </Text>
    </View>
  );
}
