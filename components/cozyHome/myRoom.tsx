import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import { useGetMyRoomDetail } from '@/hooks/room/room';
import { useTracker } from '@/providers/TrackerProvider';
import { ButtonEvent, EventCategory } from '@/utils/ga/eventEnum';
import { useMemberStore } from '@/zustand/store';

import { MyRoomCard, MyRoomCardSkeleton } from '../common/room';

export default function MyRoomComponent() {
  const router = useRouter();
  const { trackButton } = useTracker();

  const { memberInfo, hasRoom, roomInfo } = useMemberStore();
  const { data } = useGetMyRoomDetail(roomInfo.roomId);

  const onPress = () => {
    if (hasRoom && roomInfo !== undefined && roomInfo.roomId !== 0) {
      trackButton(ButtonEvent.my_room, EventCategory.home_content);
      router.push(`/room/${roomInfo.roomId}`);
    }
  };

  return (
    <View>
      <View className="gap-y-[16px] px-[20px]">
        <View className="gap-y-[2px] mx-[4px]">
          <Text className="Semibold18 text-emphasizedFont">{memberInfo?.nickname ?? ''}님이</Text>
          <Text className="Semibold18 text-emphasizedFont">현재 참여하고있는 방이에요</Text>
        </View>

        {!data ? <MyRoomCardSkeleton /> : <MyRoomCard data={data.result} onPress={onPress} />}
      </View>

      <View className="bg-[#F7F9FA] w-full h-[10px] mt-[24px]" />
    </View>
  );
}
