import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import OpacityPressable from '@/components/opacityPressable';
import { MiniRoomItem } from '@/type/room';

interface MiniRoomCardProps {
  data: MiniRoomItem;
}

export default function MiniRoomCard({ data }: MiniRoomCardProps) {
  const router = useRouter();

  return (
    <OpacityPressable
      key={data.roomId}
      onPress={() => router.push(`/room/${data.roomId}`)}
      className="flex flex-row justify-between items-center px-[8px] py-[10px]"
    >
      <View>
        <Text className="Semibold16 text-emphasizedFont">{data.name}</Text>
        <Text className="Medium12 text-disabledFont">
          <Text className="text-mainColor">{data.arrivalMateNum}명</Text>의 룸메이트가 있어요
        </Text>
      </View>

      <Text className="Medium16 text-mainColor">{data.equality}%</Text>
    </OpacityPressable>
  );
}
