import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import SimpleUserItem from '@/components/common/userItem/simpleUserItem';
import { useGetReceivedRequestList } from '@/hooks/room/roomManager';
import { useHasRoomStore } from '@/zustand/room/room';

export default function ReceivedRequest() {
  const { roomInfo } = useHasRoomStore();

  const { data } = useGetReceivedRequestList(roomInfo.isRoomManager);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="gap-y-[20px]">
        <View className="px-[20px]">
          <BackHeaderComponent />
        </View>

        <View className="gap-y-[16px] px-[20px]">
          <View className="flex flex-row items-center">
            <View className="gap-y-[4px] ml-[4px]">
              <Text className="Semibold18 text-emphasizedFont">{data?.result.length}개의</Text>
              <Text className="Semibold18 text-emphasizedFont">방 참여 요청이 도착했어요</Text>
            </View>
          </View>

          {data?.result.length !== 0 ? (
            data?.result.map((member) => <SimpleUserItem key={member.memberId} userData={member} />)
          ) : (
            <View className="mt-[120px] py-[37px]">
              <Text className="Medium14 text-disabledFont text-center">
                아직 도착한 방 참여 요청이 없어요.{'\n'}곧 당신과 잘 맞는 룸메이트가 찾아올 거예요.
              </Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
