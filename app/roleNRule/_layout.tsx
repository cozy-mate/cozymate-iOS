import { Stack } from 'expo-router';

export default function RoleNRuleLayout() {
  return (
    <Stack>
      {/* 롤앤룰 생성 */}
      <Stack.Screen name="create" options={{ headerShown: false }} />

      {/* Todo 수정 */}
      <Stack.Screen name="update/[type]" options={{ headerShown: false }} />
    </Stack>
  );
}
