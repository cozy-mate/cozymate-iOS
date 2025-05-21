import * as Clipboard from 'expo-clipboard';
import { Alert, Pressable, Text, View } from 'react-native';

import CopyIcon from '@/assets/images/room/copy.svg';
import { getPersona } from '@/constants/items/characterItem';
import { RoomItem } from '@/type/room';
import { useHasRoomStore } from '@/zustand/room/room';

interface RoomInfoComponentProps {
  data: RoomItem;
}

const RoomInfoComponent: React.FC<RoomInfoComponentProps> = ({ data }) => {
  const { roomInfo } = useHasRoomStore();

  return (
    <View className="px-[20px] gap-y-[20px]">
      <View className="flex flex-row items-center gap-x-[8px]">
        {getPersona(data.persona, 40, 40)}
        <View className="gap-y-1">
          <Text className="text-16 font-600 text-emphasizedFont">{data.name}</Text>
          <View className="flex flex-row gap-x-[4px]">
            {data.hashtagList.map((hashtag) => (
              <Text key={hashtag} className="text-14 font-500 leading-14 text-basicFont">
                #{hashtag}
              </Text>
            ))}
          </View>
        </View>
      </View>

      {roomInfo.roomId === data.roomId ? (
        <Pressable
          onPress={async () => {
            await Clipboard.setStringAsync(data.inviteCode);
            Alert.alert('초대코드가 복사되었습니다!');
          }}
          className="bg-subColor2 rounded-xl border border-mainColor p-3 flex flex-row items-center justify-center gap-x-[4px]"
        >
          <Text className="text-14 font-600 text-mainColor text-center">{data.inviteCode}</Text>
          <CopyIcon />
        </Pressable>
      ) : (
        <View className="bg-subColor2 rounded-xl border border-mainColor p-[12px]">
          <Text className="text-14 font-600 text-mainColor text-center">
            방 평균일치율 {data.equality ?? '??'}%
          </Text>
        </View>
      )}
    </View>
  );
};

export default RoomInfoComponent;
