import { Platform } from "react-native";

// 플랫폼별 기본 API_BASE 설정
// iOS 시뮬레이터: 127.0.0.1
// 안드로이드 에뮬레이터: 10.0.2.2 (호스트 머신의 localhost를 가리킴)
const getDefaultApiBase = (): string => {
  if (Platform.OS === "android") {
    return "http://10.0.2.2:8000";
  }
  // iOS
  return "http://127.0.0.1:8000";
};

// 환경 변수에서 API_BASE 가져오기
const envApiBase = process.env.EXPO_PUBLIC_API_BASE;

// URL을 플랫폼에 맞게 정규화하는 함수
const normalizeIp = (url: string, platform: string): string => {
  // 10.x.x.x 같은 로컬 네트워크 IP 감지
  const ipPattern = /http:\/\/10\.\d+\.\d+\.\d+(:\d+)?/;
  
  if (ipPattern.test(url)) {
    if (platform === "android") {
      // 안드로이드: 10.0.2.2로 변환
      return url.replace(/http:\/\/10\.\d+\.\d+\.\d+/, "http://10.0.2.2");
    } else {
      // iOS: 127.0.0.1로 변환
      return url.replace(/http:\/\/10\.\d+\.\d+\.\d+/, "http://127.0.0.1");
    }
  }
  
  // localhost나 127.0.0.1을 포함하는 경우
  if (url.includes("127.0.0.1") || url.includes("localhost")) {
    if (platform === "android") {
      // 안드로이드: 10.0.2.2로 변환
      return url.replace("127.0.0.1", "10.0.2.2").replace("localhost", "10.0.2.2");
    }
    // iOS는 그대로 유지
    return url;
  }
  
  return url;
};

// 플랫폼별 API_BASE 설정
const getApiBase = (): string => {
  const platform = Platform.OS;
  
  // 환경 변수가 설정되어 있는 경우
  if (envApiBase) {
    // URL을 플랫폼에 맞게 정규화
    const normalized = normalizeIp(envApiBase, platform);
    return normalized;
  }
  
  // 환경 변수가 없으면 기본값 사용
  return getDefaultApiBase();
};

// 함수로 export하여 런타임에 매번 확인
export const getApiBaseUrl = (): string => getApiBase();

// 하위 호환성을 위해 상수로도 export
export const API_BASE = getApiBase();

// 디버깅용 로그
if (__DEV__) {
  console.log(`[API] Platform: ${Platform.OS}, API_BASE: ${API_BASE}`);
}
