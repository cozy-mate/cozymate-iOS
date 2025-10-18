import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import GrayArrow from '@/assets/images/common/grayArrow.svg';
import HomeIcon from '@/assets/images/myPage/home.svg';
import VerifiedIcon from '@/assets/images/myPage/verified.svg';
import { useGetMyRoomDetail } from '@/hooks/room/room';
import { showRejectToast } from '@/utils/toast';
import { useMemberStore } from '@/zustand/store';

const TopMenuComponent: React.FC = () => {
  const router = useRouter();

  const { memberInfo, hasLifeStyle, hasRoom, roomInfo } = useMemberStore();
  const { data: roomData } = useGetMyRoomDetail(roomInfo.roomId);

  const topMenuItems = [
    { title: '내 정보', subTitle: null, onPress: () => router.push('/myPage/myInfo') },
    {
      title: '나의 코지룸',
      subTitle: hasRoom ? (
        <View className="flex flex-row items-center gap-x-[4px]">
          <HomeIcon />
          <Text className="Medium14 text-mainColor">{roomData?.result.name}</Text>
        </View>
      ) : (
        <Text className="Medium14 text-disabledFont">아직 방이 존재하지 않아요</Text>
      ),
      onPress: () =>
        roomData !== undefined
          ? router.push(`/room/${roomInfo.roomId}`)
          : showRejectToast('참여한 방이 아직 없어요'),
    },
    {
      title: '학교 인증',
      subTitle: (
        <View className="flex flex-row items-center gap-x-[4px]">
          <VerifiedIcon />
          <Text className="Medium14 text-mainColor">{memberInfo?.universityName ?? ''}</Text>
        </View>
      ),
      onPress: () => router.push('/myPage/schoolAuthentication'),
    },
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

  return (
    <View className="border border-[#F1F2F4] rounded-xl px-[16px] py-[4px]">
      {topMenuItems.map((item, index) => (
        <Pressable
          key={index}
          onPress={item.onPress}
          className={`flex flex-row justify-between py-[12px] ${index !== topMenuItems.length - 1 && 'border-b border-b-[#F1F2F4]'}`}
        >
          <Text className="Medium14 text-emphasizedFont">{item.title}</Text>

          <View className="flex flex-row items-center gap-x-[4px]">
            {item.subTitle !== null && item.subTitle}
            <GrayArrow />
          </View>
        </Pressable>
      ))}
    </View>
  );
};

export default TopMenuComponent;
