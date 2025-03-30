import { Stack } from 'expo-router';

export default function ChatLayout() {
  return (
    <Stack>
      {/* 쪽지방 목록 */}
      <Stack.Screen name="list" options={{ headerShown: false }} />

      {/* 쪽지방 */}
      <Stack.Screen name="[id]" options={{ headerShown: false }} />

      {/* 쪽지 보내기 */}
      <Stack.Screen name="send/[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
