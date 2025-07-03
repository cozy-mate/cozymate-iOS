import { Stack } from 'expo-router';

export default function UpdateInfoLayout() {
  return (
    <Stack>
      {/* 캐릭터 수정 */}
      <Stack.Screen name="persona" options={{ headerShown: false }} />

      {/* 닉네임 수정 */}
      <Stack.Screen name="nickname" options={{ headerShown: false }} />

      {/* 생일 수정 */}
      <Stack.Screen name="birthday" options={{ headerShown: false }} />
    </Stack>
  );
}
