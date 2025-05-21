import { Stack } from 'expo-router';

export default function MyPageLayout() {
  return (
    <Stack>
      {/* 내 정보 */}
      <Stack.Screen name="myInfo" options={{ headerShown: false }} />

      {/* 내 정보 수정 */}
      <Stack.Screen name="updateInfo/[type]" options={{ headerShown: false }} />

      {/* 학교 인증 */}
      <Stack.Screen name="schoolAuthentication" options={{ headerShown: false }} />

      {/* 나의 라이프스타일 */}
      <Stack.Screen name="myLifeStyle" options={{ headerShown: false }} />

      {/* 내가 찜한 룸메이트 */}
      <Stack.Screen name="likeRoommate" options={{ headerShown: false }} />

      {/* 문의하기 */}
      <Stack.Screen name="inquiry/list" options={{ headerShown: false }} />
      <Stack.Screen name="inquiry/register" options={{ headerShown: false }} />
      <Stack.Screen name="inquiry/failed" options={{ headerShown: false }} />

      {/* 회원탈퇴 */}
      <Stack.Screen name="withdraw" options={{ headerShown: false }} />
    </Stack>
  );
}
