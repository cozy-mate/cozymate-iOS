import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { RoomItem } from '@/type/room';

interface SimpleRoomItemProps {
  roomData: RoomItem;
  onPress?: any;
}

const SimpleRoomItem: React.FC<SimpleRoomItemProps> = ({ roomData, onPress = () => {} }) => {
  const router = useRouter();

  const handlePress = () => {
    onPress();
    router.push(`/room/${roomData.roomId}`);
  };

  return (
    <Pressable
      onPress={handlePress}
      className="p-[16px] gap-y-[8px] border border-disabledColor rounded-xl"
    >
      <View className="flex flex-row gap-x-[8px]">
        {roomData.hashtagList.map((hash, index) => (
          <View key={index} className="bg-colorBox rounded px-[8px] py-[2px]">
            <Text className="Medium12 text-colorFont">#{hash}</Text>
          </View>
        ))}
      </View>

      <Text className="Semibold16 text-emphasizedFont">{roomData.name}</Text>

      <View className="flex flex-row justify-between items-center">
        <Text className="Medium12 text-disabledFont">
          <Text className="text-mainColor">{roomData.arrivalMateNum}명</Text>의 룸메이트가 있어요
        </Text>

        <Text
          className={`Medium16 ${roomData.equality !== null && roomData.equality > 50 ? 'text-mainColor' : 'text-colorFont'} `}
        >
          {roomData.equality ?? '?? '}%
        </Text>
      </View>
    </Pressable>
  );
};

export default SimpleRoomItem;
