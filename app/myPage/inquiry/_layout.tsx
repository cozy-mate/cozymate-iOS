import { Stack } from 'expo-router';

export default function InquiryLayout() {
  return (
    <Stack>
      {/* 문의 내역 */}
      <Stack.Screen name="list" options={{ headerShown: false }} />

      {/* 문의하기 */}
      <Stack.Screen name="register" options={{ headerShown: false }} />
    </Stack>
  );
}
