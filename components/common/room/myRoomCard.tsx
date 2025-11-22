import { Text, View } from 'react-native';

import OpacityPressable from '@/components/opacityPressable';
import { RoomDetailItem } from '@/type/room';

interface MyRoomCardProps {
  data: RoomDetailItem;
  onPress: () => void;
}

export default function MyRoomCard({ data, onPress }: MyRoomCardProps) {
  return (
    <OpacityPressable
      onPress={onPress}
      className="rounded-xl p-[16px] gap-y-[8px] border border-mainColor bg-subColor2"
    >
      {/* <View className="flex flex-row gap-x-[8px]">
        {data.hashtagList.map((hash, index) => (
          <View key={index} className="bg-white rounded px-[8px] py-[2px]">
            <Text className="Medium12 text-colorFont">#{hash}</Text>
          </View>
        ))}
      </View> */}

      {/* {!data.description && <Text className="Medium12 text-colorFont">{data.description}</Text>} */}

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
