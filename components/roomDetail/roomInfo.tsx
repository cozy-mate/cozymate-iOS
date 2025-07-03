import * as Clipboard from 'expo-clipboard';
import { Alert, Pressable, Text, View } from 'react-native';

import CopyIcon from '@/assets/images/room/copy.svg';
import { getPersona } from '@/constants/items/characterItem';
import { useCheckHasRoom } from '@/hooks/room/room';
import { RoomItem } from '@/type/room';

interface RoomInfoComponentProps {
  data: RoomItem;
}

const RoomInfoComponent: React.FC<RoomInfoComponentProps> = ({ data }) => {
  const { data: hasRoom } = useCheckHasRoom();

  return (
    <View className="px-[20px] gap-y-[20px]">
      <View className="flex flex-row items-center gap-x-[8px]">
        {getPersona(data.persona, 40, 40)}
        <View className="gap-y-1">
          <Text className="Semibold16 text-emphasizedFont">{data.name}</Text>
          <View className="flex flex-row gap-x-[4px]">
            {data.hashtagList.map((hashtag) => (
              <Text key={hashtag} className="Medium14 text-basicFont">
                #{hashtag}
              </Text>
            ))}
          </View>
        </View>
      </View>

      {hasRoom.result.roomId === data.roomId ? (
        <Pressable
          onPress={async () => {
            await Clipboard.setStringAsync(data.inviteCode);
            Alert.alert('초대코드가 복사되었습니다!');
          }}
          className="bg-subColor2 rounded-xl border border-mainColor p-3 flex flex-row items-center justify-center gap-x-[4px]"
        >
          <Text className="Semibold14 text-mainColor text-center">{data.inviteCode}</Text>
          <CopyIcon />
        </Pressable>
      ) : (
        <View className="bg-subColor2 rounded-xl border border-mainColor p-[12px]">
          <Text className="Semibold14 text-mainColor text-center">
            방 평균일치율 {data.equality ?? '??'}%
          </Text>
        </View>
      )}
    </View>
  );
};

export default RoomInfoComponent;
