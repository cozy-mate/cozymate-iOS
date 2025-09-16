import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { useCheckHasRoom, useGetMyRoomDetail } from '@/hooks/room/room';
import { useTracker } from '@/providers/TrackerProvider';
import { ButtonEvent, EventCategory } from '@/utils/ga/eventEnum';
import { useMemberStore } from '@/zustand/store';

const MyRoomComponent: React.FC = () => {
  const router = useRouter();
  const { trackButton } = useTracker();

  const { memberInfo, hasLifeStyle } = useMemberStore();

  const { data: hasRoom } = useCheckHasRoom();
  const { data } = useGetMyRoomDetail(hasRoom.result.roomId);

  const handleRoomPress = () => {
    trackButton(ButtonEvent.my_room, EventCategory.home_content);
    router.push(`/room/${hasRoom.result.roomId}`);
  };

  return (
    hasLifeStyle && (
      <View>
        <View className="gap-y-[16px] px-[20px]">
          <View className="gap-y-[2px] mx-[4px]">
            <Text className="Semibold18 text-emphasizedFont">{memberInfo?.nickname ?? ''}님이</Text>
            <Text className="Semibold18 text-emphasizedFont">현재 참여하고있는 방이에요</Text>
          </View>

          {hasRoom.result.roomId !== 0 ? (
            <Pressable
              onPress={handleRoomPress}
              className="rounded-xl p-[16px] gap-y-[8px] border border-mainColor bg-subColor2"
            >
              <View className="flex flex-row gap-x-[8px]">
                {data?.result.hashtagList.map((hash, index) => (
                  <View key={index} className="bg-white rounded px-[8px] py-[2px]">
                    <Text className="Medium12 text-colorFont">#{hash}</Text>
                  </View>
                ))}
              </View>

              <Text className="Semibold16 text-emphasizedFont">{data?.result.name}</Text>

              <View className="flex flex-row justify-between items-center">
                <Text className="Medium12 text-disabledFont">
                  <Text className="text-mainColor">{data?.result.arrivalMateNum}명</Text>의
                  룸메이트가 있어요
                </Text>
                <Text className="Medium16 text-colorFont">{data?.result.equality ?? '?? '}%</Text>
              </View>
            </Pressable>
          ) : (
            <View className="p-[20px] gap-y-[6px] mt-[16px]">
              <Text className="Medium14 text-disabledFont text-center">
                아직 참여하고 있는 방이 없어요
              </Text>
              <Text className="Medium14 text-disabledFont text-center">
                방을 만들거나, 방에 참여해보세요!
              </Text>
            </View>
          )}
        </View>

        <View className="bg-[#F7F9FA] w-full h-[10px] mt-[24px]" />
      </View>
    )
  );
};

export default MyRoomComponent;
