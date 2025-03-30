import { Stack } from 'expo-router';

export default function UserLayout() {
  return (
    <Stack>
      {/* 유저 상세 스크린 */}
      <Stack.Screen name="[id]" options={{ headerShown: false }} />

      {/* 받은 참여 요청 목록 스크린 (방장) */}
      <Stack.Screen name="receivedRequest" options={{ headerShown: false }} />

      {/* 룸메이트 스크린 */}
      <Stack.Screen name="roomMate" options={{ headerShown: false }} />
    </Stack>
  );
}
