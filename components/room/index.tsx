import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { RecommendRoomItem } from '@/type/room';
import { getLifeStyleIcon, getLifeStyleLabel } from '@/utils/lifeStyle';

interface RoomComponentProps {
  roomData: RecommendRoomItem;
}

const RoomComponent: React.FC<RoomComponentProps> = ({ roomData }) => {
  const router = useRouter();

  const getChipColor = (numOfArrival: number, count: number) => {
    if (count === 0) {
      return 'red';
    } else if (numOfArrival === count) {
      return 'blue';
    } else {
      return 'white';
    }
  };

  return (
    <Pressable onPress={() => router.push(`/room/${roomData.roomId}`)}>
      <View className="border border-disabledColor px-[16px] pt-[20px] pb-[18px] rounded-xl mx-[20px]">
        <View className="flex flex-row items-center justify-between">
          <Text className="text-16 font-600 leading-16 text-basicFont mx-2">{roomData.name}</Text>
          <Text
            className={`text-16 font-500 leading-16 ${roomData.equality !== null && roomData.equality > 50 ? 'text-mainColor' : 'text-colorFont'}`}
          >
            {roomData.equality ?? '?? '}%
          </Text>
        </View>

        <View className="h-[1px] bg-[#F6F6F6] my-[16px]" />

        <View className="gap-y-[24px]">
          <View className="flex flex-row justify-between">
            {roomData.preferenceMatchCountList.map((chip, index) => (
              <View key={index} className="flex flex-col items-center mx-[8px] gap-y-[6px]">
                {getLifeStyleIcon(
                  chip.preferenceName,
                  getChipColor(roomData.numOfArrival, chip.count as number),
                )}
                <View>
                  <Text className="text-12 font-500 leading-12 text-disabledFont text-center">
                    {getLifeStyleLabel(chip.preferenceName)}
                  </Text>
                  <Text className="text-12 font-600 leading-12 text-basicFont text-center">
                    {chip.count ?? '0'}명 일치
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View className="flex flex-row items-center justify-between">
            <View className="flex flex-row gap-x-[6px]">
              {roomData.hashtags.map((hash, index) => (
                <View key={index} className="py-0.5 px-2 rounded bg-colorBox">
                  <Text className="text-12 font-500 leading-12 text-colorFont">#{hash}</Text>
                </View>
              ))}
            </View>

            <Text className="text-12 font-500 leading-12 text-disabledFont">
              {roomData.numOfArrival} / {roomData.maxMateNum}명
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default RoomComponent;
