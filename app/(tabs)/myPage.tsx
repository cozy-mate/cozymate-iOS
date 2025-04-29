import { useRouter } from 'expo-router';
import { Suspense } from 'react';
import { Dimensions, Modal, Pressable, ScrollView, Text, View } from 'react-native';

import Background from '@/assets/images/myPage/background.svg';
import LoadingComponent from '@/components/common/loading';
import MenuComponent from '@/components/myPage/Menu';
import { getPersona } from '@/constants/items/characterItem';
import { useGetMemberProfile } from '@/hooks/member/member';
import { useGetMyRoomDetail } from '@/hooks/room/room';
import { useAuthProvider } from '@/providers/AuthProvider';
import { showRejectToast } from '@/utils/toast';
import { deleteToken } from '@/utils/token';
import { useHasLifeStyleStore } from '@/zustand/member-stat/member-stat';
import { useHasRoomStore } from '@/zustand/room/room';

export default function MyPage() {
  const width = Dimensions.get('screen').width;

  const router = useRouter();

  const { roomInfo } = useHasRoomStore();

  const { data } = useGetMemberProfile();
  const { hasLifeStyle } = useHasLifeStyleStore();

  const { data: roomData } = useGetMyRoomDetail();

  const { broadcastLogout } = useAuthProvider();

  const TopMenuItems = [
    { title: '내 정보', subTitle: null, onPress: () => router.push('/myPage/myInfo') },
    {
      title: '나의 코지룸',
      subTitle: roomData !== undefined ? roomData?.result.name : undefined,
      undefinedText: '아직 방이 존재하지 않아요',
      onPress: () =>
        roomData !== undefined
          ? router.push(`/room/${roomInfo.roomId}`)
          : showRejectToast('참여한 방이 아직 없어요'),
    },
    // { title: '학교 인증', onPress: () => router.push('/myPage/schoolAuthentication') },
    {
      title: '나의 라이프스타일',
      subTitle: null,
      onPress: () =>
        hasLifeStyle ? router.push('/myPage/myLifeStyle') : router.push('/lifeStyle/onboarding'),
    },
    {
      title: '내가 찜한 룸메이트',
      subTitle: null,
      onPress: () => router.push('/myPage/likeRoommate'),
    },
  ];

  const BottomMenuItems = [
    { title: '문의하기', subTitle: null, onPress: () => router.push('/myPage/inquiry') },
  ];

  const handleLogout = async () => {
    await deleteToken().then(() => broadcastLogout());
    router.replace('/');
  };

  return (
    <Suspense
      fallback={
        <Modal transparent={true}>
          <LoadingComponent />
        </Modal>
      }
    >
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
        <Background style={{ position: 'absolute' }} width={width} />

        <View className="flex flex-col items-center my-[52px] gap-y-[12px]">
          {getPersona(data.result.persona, 120, 120)}
          <Text className="text-18 font-600 leading-18 text-emphasizedFont">
            {data.result.nickname}
          </Text>
        </View>

        <View className="gap-y-[16px]">
          <MenuComponent items={TopMenuItems} />
          <MenuComponent items={BottomMenuItems} />

          <View className="flex flex-row justify-center items-center">
            <Pressable
              onPress={() => handleLogout()}
              className="px-[4px] py-[12px] flex items-center"
            >
              <Text className="text-12 font-500 leading-12 text-disabledFont">로그아웃</Text>
            </Pressable>

            <View className="h-[18px] w-[1px] bg-[#D9D9D9] mx-[16px]" />

            <Pressable
              onPress={() => router.push('/myPage/withdraw')}
              className="px-[4px] py-[12px] flex items-center"
            >
              <Text className="text-12 font-500 leading-12 text-disabledFont">회원탈퇴</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </Suspense>
  );
}
