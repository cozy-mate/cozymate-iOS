import { useRouter } from 'expo-router';
import { Suspense } from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import { Portal } from 'react-native-portalize';

import Background from '@/assets/images/myPage/background.svg';
import LoadingComponent from '@/components/common/loading';
import OverScrollView from '@/components/common/overScrollView';
import BottomMenuComponent from '@/components/myPage/menu/bottomMenu';
import TopMenuComponent from '@/components/myPage/menu/topMenu';
import OpacityPressable from '@/components/opacityPressable';
import { getPersona } from '@/constants/items/characterItem';
import { useGetMemberProfile } from '@/hooks/member/member';
import { useAuthProvider } from '@/providers/AuthProvider';
import { deleteToken } from '@/utils/token';
import { useMemberStore } from '@/zustand/store';

function MyPageComponent() {
  const width = Dimensions.get('screen').width;

  const router = useRouter();

  const { data } = useGetMemberProfile();

  const { logout, clearRoom } = useMemberStore();

  const { broadcastLogout } = useAuthProvider();

  const handleLogout = async () => {
    await deleteToken().then(() => broadcastLogout());
    logout();
    clearRoom();
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 120,
        paddingHorizontal: 20,
        paddingTop: 52,
        backgroundColor: '#FFFFFF',
      }}
      showsVerticalScrollIndicator={false}
    >
      <OverScrollView backgroundColor={'#BCD7FF'} height={500} top={-400} />

      <Background style={{ position: 'absolute' }} width={width} />

      <View className="flex flex-col items-center my-[52px] gap-y-[12px]">
        {getPersona(data.result.persona, 120, 120)}
        <Text className="Semibold18 text-emphasizedFont">{data.result.nickname}</Text>
      </View>

      <View className="gap-y-[16px]">
        <TopMenuComponent />
        <BottomMenuComponent />

        <View className="flex flex-row justify-center items-center">
          <OpacityPressable
            onPress={() => handleLogout()}
            className="px-[4px] py-[12px] flex items-center"
          >
            <Text className="Medium12 text-disabledFont">로그아웃</Text>
          </OpacityPressable>

          <View className="h-[18px] w-[1px] bg-[#D9D9D9] mx-[16px]" />

          <OpacityPressable
            onPress={() => router.push('/myPage/withdraw')}
            className="px-[4px] py-[12px] flex items-center"
          >
            <Text className="Medium12 text-disabledFont">회원탈퇴</Text>
          </OpacityPressable>
        </View>
      </View>

      <OverScrollView backgroundColor={'#FFFFFF'} height={500} bottom={-400} />
    </ScrollView>
  );
}

export default function MyPage() {
  return (
    <Suspense
      fallback={
        <Portal>
          <LoadingComponent />
        </Portal>
      }
    >
      <MyPageComponent />
    </Suspense>
  );
}
