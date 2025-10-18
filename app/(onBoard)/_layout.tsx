import { Stack } from 'expo-router';

export default function OnBoardLayout() {
  return (
    <Stack>
      {/* 로그인 화면 */}
      <Stack.Screen name="index" options={{ headerShown: false }} />

      {/* 학교 인증 */}
      <Stack.Screen name="schoolAuthentication" options={{ headerShown: false }} />

      {/* 유저 정보 */}
      <Stack.Screen name="personalInfo" options={{ headerShown: false }} />

      {/* 유저 정보 v2 */}
      <Stack.Screen name="personalInfo_v2" options={{ headerShown: false }} />

      {/* 캐릭터 선택 */}
      <Stack.Screen name="character" options={{ headerShown: false }} />

      {/* 선호 칩 선택 */}
      <Stack.Screen name="chipSelect" options={{ headerShown: false }} />

      {/* 완료 */}
      <Stack.Screen name="complete" options={{ headerShown: false }} />
    </Stack>
  );
}
