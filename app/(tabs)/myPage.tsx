import { useRouter } from 'expo-router';
import { Suspense } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import Background from '@/assets/images/myPage/background.svg';
import MenuComponent from '@/components/myPage/Menu';
import { getPersona } from '@/constants/items/characterItem';
import { useGetMemberProfile } from '@/hooks/member/member';
import { deleteToken } from '@/utils/token';
import { useHasRoomStore } from '@/zustand/room/room';

export default function MyPage() {
  const router = useRouter();

  const { roomId } = useHasRoomStore();

  const { data } = useGetMemberProfile();

  const TopMenuItems = [
    { title: '내 정보', onPress: () => router.push('/myPage/myInfo') },
    { title: '나의 코지룸', onPress: () => router.push(`/room/${roomId}`) },
    // { title: '학교 인증', onPress: () => router.push('/myPage/schoolAuthentication') },
    { title: '나의 라이프스타일', onPress: () => router.push('/myPage/myLifeStyle') },
    { title: '내가 찜한 룸메이트', onPress: () => router.push('/myPage/likeRoommate') },
  ];

  const BottomMenuItems = [{ title: '문의하기', onPress: () => router.push('/myPage/inquiry') }];

  const handleLogout = async () => {
    await deleteToken();
    router.replace('/');
  };

  return (
    <Suspense>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 100,
          paddingHorizontal: 20,
          paddingTop: 52,
          backgroundColor: '#FFFFFF',
        }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <Background style={{ position: 'absolute' }} />

        <View className="flex flex-col items-center my-[52px] gap-y-[12px]">
          {getPersona(data.result.persona, 120, 120)}
          <Text className="text-18 font-600 text-emphasizedFont">{data.result.nickname}</Text>
        </View>

        <View className="gap-y-[16px]">
          <MenuComponent items={TopMenuItems} />
          <MenuComponent items={BottomMenuItems} />

          <View className="flex flex-row justify-center items-center">
            <Pressable onPress={() => handleLogout()} className="px-1 py-3 flex items-center">
              <Text className="text-12 font-500 text-disabledFont">로그아웃</Text>
            </Pressable>

            <View className="h-[18px] w-[1px] bg-[#D9D9D9] mx-4" />

            <Pressable
              onPress={() => router.push('/myPage/withdraw')}
              className="px-1 py-3 flex items-center"
            >
              <Text className="text-12 font-500 text-disabledFont">회원탈퇴</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </Suspense>
  );
}
