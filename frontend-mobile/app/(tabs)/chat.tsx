import { View, Text, TextInput, Pressable, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function ChatScreen() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        {/* 채팅 메시지 영역 */}
        <ScrollView 
          style={{ flex: 1 }} 
          contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        >
          <View style={{ alignItems: "center", justifyContent: "center", flex: 1, paddingVertical: 40 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 8 }}>
              AI 도슨트와 대화하기
            </Text>
            <Text style={{ color: "#666", textAlign: "center" }}>
              궁금한 점을 물어보세요
            </Text>
          </View>
        </ScrollView>

        {/* 입력창 영역 */}
        <View style={{ 
          flexDirection: "row", 
          alignItems: "center", 
          padding: 12,
          paddingBottom: 100, // FloatingTabBar를 위한 여백
          borderTopWidth: 1, 
          borderTopColor: "#e5e5e5",
          backgroundColor: "#fff"
        }}>
          <Pressable
            onPress={() => router.push("/camera")}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={{
              marginRight: 8,
              padding: 8,
            }}
          >
            <MaterialIcons name="camera-alt" size={24} color="#007AFF" />
          </Pressable>
          
          <TextInput
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: "#e5e5e5",
              borderRadius: 20,
              paddingHorizontal: 16,
              paddingVertical: 10,
              fontSize: 16,
              backgroundColor: "#f5f5f5",
            }}
            placeholder="메시지를 입력하세요..."
            value={message}
            onChangeText={setMessage}
            multiline
          />
          
          <Pressable
            onPress={() => {
              if (message.trim()) {
                // 메시지 전송 로직
                setMessage("");
              }
            }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={{
              marginLeft: 8,
              padding: 8,
            }}
          >
            <MaterialIcons 
              name="send" 
              size={24} 
              color={message.trim() ? "#007AFF" : "#ccc"} 
            />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
