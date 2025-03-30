import { Stack } from 'expo-router';

export default function LifeStyleLayout() {
  return (
    <Stack>
      {/* 라이프스타일 온보딩 */}
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />

      {/* 라이프스타일 기본정보 */}
      <Stack.Screen name="basicInfo" options={{ headerShown: false }} />

      {/* 라이프스타일 필수정보 */}
      <Stack.Screen name="essentialInfo" options={{ headerShown: false }} />

      {/* 라이프스타일 선택정보 */}
      <Stack.Screen name="additionalInfo" options={{ headerShown: false }} />
    </Stack>
  );
}
