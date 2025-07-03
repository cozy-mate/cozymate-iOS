import * as Clipboard from 'expo-clipboard';
import { Alert, Pressable, Text, View } from 'react-native';

import One from '@/assets/images/character/1.svg';
import CopyIcon from '@/assets/images/cozyBot/copy.svg';
import { useCheckHasRoom, useGetMyRoomDetail } from '@/hooks/room/room';

const RoomInfoComponent: React.FC = () => {
  const { data: hasRoom } = useCheckHasRoom();

  const { data } = useGetMyRoomDetail(hasRoom.result.roomId);

  return (
    <View className="mt-2 px-[20px] mb-28">
      <Pressable
        onPress={() => console.log('클릭')}
        className="flex flex-row items-center my-[10px]"
      >
        <View className="mr-2 flex flex-row">
          {data?.result.mateDetailList.map((mate, index) => (
            // <View
            //   key={index}
            //   className="-ml-1 rounded-full"
            //   style={{
            //     shadowColor: '#606060',
            //     shadowOffset: { width: 0, height: 0 },
            //     shadowOpacity: 0.25,
            //     shadowRadius: 2,
            //     backgroundColor: 'white',
            //   }}
            // >
            <One key={index} width={20} height={20} className="ml-[-4px]" />
            // </View>
          ))}
        </View>
        {/* <ColorRightArrow /> */}
      </Pressable>

      <View className="gap-y-[6px] mx-[4px] my-[8px]">
        <Text className="Semibold18 text-basicFont">여기는</Text>
        <Text className="Semibold18 text-mainColor">
          {data?.result.name}
          <Text className="text-basicFont">의 방이에요!</Text>
        </Text>
      </View>

      {true && (
        <Pressable
          onPress={async () => {
            await Clipboard.setStringAsync(data?.result.inviteCode as string);
            Alert.alert('초대코드가 복사되었습니다!');
          }}
          className="flex flex-row self-start items-center rounded-xl bg-white/60 px-[16px] py-[8px]"
        >
          <Text className="Medium12 text-colorFont">{data?.result.inviteCode}</Text>
          <CopyIcon />
        </Pressable>
      )}

      <View className="absolute right-[8px] -bottom-[140px] z-10">
        {/* <Pressable onPress={toEdit} disabled={!roomInfo.isRoomManager}>
          {getProfileImage(roomData.result.persona, 140, 140)}
        </Pressable> */}
        <One width={140} height={140} />
      </View>
    </View>
  );
};

export default RoomInfoComponent;
