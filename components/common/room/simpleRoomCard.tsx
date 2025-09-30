import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import OpacityPressable from '@/components/opacityPressable';
import { RoomDetailItem } from '@/type/room';

interface SimpleRoomCardProps {
  data: RoomDetailItem;
  onPress?: any;
}

export default function SimpleRoomCard({ data, onPress = () => {} }: SimpleRoomCardProps) {
  const router = useRouter();

  const handlePress = () => {
    onPress();
    router.push(`/room/${data.roomId}`);
  };

  return (
    <OpacityPressable
      onPress={handlePress}
      className="p-[16px] gap-y-[8px] border border-disabledColor rounded-xl"
    >
      <View className="flex flex-row gap-x-[8px]">
        {data.hashtagList.map((hash, index) => (
          <View key={index} className="bg-colorBox rounded px-[8px] py-[2px]">
            <Text className="Medium12 text-colorFont">#{hash}</Text>
          </View>
        ))}
      </View>

      <Text className="Semibold16 text-emphasizedFont">{data.name}</Text>

      <View className="flex flex-row justify-between items-center">
        <Text className="Medium12 text-disabledFont">
          <Text className="text-mainColor">{data.arrivalMateNum}명</Text>의 룸메이트가 있어요
        </Text>

        <Text
          className={`Medium16 ${data.equality !== null && data.equality > 50 ? 'text-mainColor' : 'text-colorFont'} `}
        >
          {data.equality ?? '?? '}%
        </Text>
      </View>
    </OpacityPressable>
  );
}
