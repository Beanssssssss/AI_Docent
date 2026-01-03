import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, usePathname } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface TabItem {
  name: string;
  label: string;
  route: string;
  icon: (isActive: boolean) => React.ReactNode;
}

export default function FloatingTabBar() {
  const router = useRouter();
  const pathname = usePathname();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // 현재 활성 탭 확인
  const getCurrentRoute = (): string => {
    // 경로 문자열을 확인
    const path = pathname || '';
    
    // 디버깅용 (개발 중에만)
    if (__DEV__) {
      console.log('FloatingTabBar - Current pathname:', path);
    }
    
    // 홈 화면: /(tabs) 또는 /(tabs)/ 또는 /(tabs)/index
    if (path === '/(tabs)' || path === '/(tabs)/' || path === '/(tabs)/index' || path === '/(tabs)/index/' || path.includes('/(tabs)') && !path.includes('/chat') && !path.includes('/mypage')) {
      return 'index';
    }
    
    // 채팅 화면
    if (path.includes('/(tabs)/chat') || path.includes('/chat')) {
      return 'chat';
    }
    
    // 마이페이지 화면
    if (path.includes('/(tabs)/mypage') || path.includes('/mypage')) {
      return 'mypage';
    }
    
    // 기본값은 index
    return 'index';
  };

  const currentRoute = getCurrentRoute();
  
  // 디버깅용
  if (__DEV__) {
    console.log('FloatingTabBar - Current route:', currentRoute);
  }

  const tabs: TabItem[] = [
    {
      name: 'index',
      label: '홈',
      route: '/(tabs)',
      icon: (isActive) => (
        <IconSymbol 
          size={24} 
          name="house.fill" 
          color={isActive ? colors.tint : colors.tabIconDefault} 
        />
      ),
    },
    {
      name: 'chat',
      label: '채팅',
      route: '/(tabs)/chat',
      icon: (isActive) => (
        <MaterialIcons 
          name="chat" 
          size={24} 
          color={isActive ? colors.tint : colors.tabIconDefault} 
        />
      ),
    },
    {
      name: 'mypage',
      label: '마이',
      route: '/(tabs)/mypage',
      icon: (isActive) => (
        <MaterialIcons 
          name="person" 
          size={24} 
          color={isActive ? colors.tint : colors.tabIconDefault} 
        />
      ),
    },
  ];

  const handlePress = (tab: TabItem) => {
    if (currentRoute !== tab.name) {
      // 홈 화면의 경우 replace를 사용하여 스택을 초기화
      if (tab.name === 'index') {
        router.replace(tab.route as any);
      } else {
        router.push(tab.route as any);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.wrapper, { backgroundColor: colors.background }]}>
        {tabs.map((tab) => {
          const isActive = currentRoute === tab.name;
          return (
            <TouchableOpacity
              key={tab.name}
              style={[
                styles.item,
                isActive && styles.itemActive,
                isActive && { backgroundColor: colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(10, 126, 164, 0.1)' }
              ]}
              onPress={() => handlePress(tab)}
              activeOpacity={0.7}
            >
              {tab.icon(isActive)}
              <Text
                style={[
                  styles.label,
                  { 
                    color: isActive ? colors.tint : colors.tabIconDefault,
                    fontWeight: isActive ? '600' : '500',
                  },
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    pointerEvents: "box-none",
  },
  wrapper: {
    marginHorizontal: 20,
    marginBottom: 28,
    height: 64,
    borderRadius: 32,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 8,

    // iOS 그림자
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },

    // Android 그림자
    elevation: 12,

    // 블러 효과를 위한 배경
    borderWidth: 0.5,
    borderColor: "rgba(0, 0, 0, 0.05)",
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 4,
  },
  itemActive: {
    // 배경색은 인라인 스타일로 적용
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 2,
  },
});
