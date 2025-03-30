import { Stack } from 'expo-router';

export default function RoomLayout() {
  return (
    <Stack>
      {/* 방 상세 스크린 */}
      <Stack.Screen name="[id]" options={{ headerShown: false }} />

      {/* 방 생성 스크린 */}
      <Stack.Screen name="createRoom" options={{ headerShown: false }} />

      {/* 방 참여 스크린 */}
      <Stack.Screen name="joinRoom" options={{ headerShown: false }} />

      {/* 보낸 참여 요청 목록 스크린 (유저)) */}
      <Stack.Screen name="sentRequest" options={{ headerShown: false }} />

      {/* 추천 방 스크린 */}
      <Stack.Screen name="recommendRoom" options={{ headerShown: false }} />
    </Stack>
  );
}
