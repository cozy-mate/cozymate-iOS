import { Stack } from 'expo-router';

export default function RoomLayout() {
  return (
    <Stack>
      {/* 방 생성 스크린 */}
      <Stack.Screen name="index" options={{ headerShown: false }} />

      {/* 캐릭터 선택 스크린 */}
      <Stack.Screen name="selectPersona" options={{ headerShown: false }} />
    </Stack>
  );
}
