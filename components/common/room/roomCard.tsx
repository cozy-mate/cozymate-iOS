import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import OpacityPressable from '@/components/opacityPressable';
import { RoomItem } from '@/type/room';
import { getLifeStyleIcon, getLifeStyleLabel } from '@/utils/lifeStyle';

interface RoomCardProps {
  data: RoomItem;
  onPress?: () => void;
}

export default function RoomCard({ data, onPress = () => {} }: RoomCardProps) {
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

  const handlePress = () => {
    onPress();
    router.push(`/room/${data.roomId}`);
  };

  return (
    <OpacityPressable onPress={handlePress}>
      <View className="border border-disabledColor px-[16px] pt-[20px] pb-[18px] rounded-xl mx-[20px]">
        <View className="flex flex-row items-center justify-between">
          <Text className="Semibold16 text-basicFont mx-[8px]">{data.name}</Text>
          <Text
            className={`Medium16 ${data.equality !== null && data.equality > 50 ? 'text-mainColor' : 'text-colorFont'}`}
          >
            {data.equality ?? '?? '}%
          </Text>
        </View>

        <View className="h-[1px] bg-[#F6F6F6] my-[16px]" />

        <View className="gap-y-[24px]">
          <View className="flex flex-row justify-between">
            {data.preferenceMatchCountList.map((chip, index) => (
              <View
                key={index}
                className="flex flex-col items-center mx-[8px] gap-y-[6px] w-[54px]"
              >
                {getLifeStyleIcon(
                  chip.preferenceName,
                  getChipColor(data.numOfArrival, chip.count as number),
                )}
                <View>
                  <Text className="Medium12 text-disabledFont text-center">
                    {getLifeStyleLabel(chip.preferenceName)}
                  </Text>
                  <Text className="Semibold12 text-basicFont text-center">
                    {chip.count ?? '0'}명 일치
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View className="flex flex-row items-center justify-between">
            <View className="flex flex-row gap-x-[6px]">
              {data.hashtags.map((hash, index) => (
                <View key={index} className="py-[2px] px-[8px] rounded bg-colorBox">
                  <Text className="Medium12 text-colorFont">#{hash}</Text>
                </View>
              ))}
            </View>

            <Text className="Medium12 text-disabledFont">
              {data.numOfArrival} / {data.maxMateNum}명
            </Text>
          </View>
        </View>
      </View>
    </OpacityPressable>
  );
}
