import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import OpacityPressable from '@/components/opacityPressable';
import { useTracker } from '@/providers/TrackerProvider';
import { RoomDetailItem } from '@/type/room';
import { ButtonEvent, EventCategory } from '@/utils/ga/eventEnum';
import { useMemberStore } from '@/zustand/store';

interface MyRoomCardProps {
  data: RoomDetailItem;
}

export default function MyRoomCard({ data }: MyRoomCardProps) {
  const router = useRouter();
  const { trackButton } = useTracker();

  const { hasRoom, roomInfo } = useMemberStore();

  const handleRoomPress = () => {
    if (hasRoom && roomInfo !== undefined && roomInfo.roomId !== 0) {
      trackButton(ButtonEvent.my_room, EventCategory.home_content);
      router.push(`/room/${roomInfo?.roomId}`);
    }
  };

  return (
    <OpacityPressable
      onPress={handleRoomPress}
      className="rounded-xl p-[16px] gap-y-[8px] border border-mainColor bg-subColor2"
    >
      <View className="flex flex-row gap-x-[8px]">
        {data.hashtagList.map((hash, index) => (
          <View key={index} className="bg-white rounded px-[8px] py-[2px]">
            <Text className="Medium12 text-colorFont">#{hash}</Text>
          </View>
        ))}
      </View>

      <Text className="Semibold16 text-emphasizedFont">{data.name}</Text>

      <View className="flex flex-row justify-between items-center">
        <Text className="Medium12 text-disabledFont">
          <Text className="text-mainColor">{data.arrivalMateNum}명</Text>의 룸메이트가 있어요
        </Text>
        <Text className="Medium16 text-colorFont">{data.equality ?? '?? '}%</Text>
      </View>
    </OpacityPressable>
  );
}
