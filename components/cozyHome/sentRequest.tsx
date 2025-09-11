import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import GrayArrowIcon from '@/assets/images/common/grayArrow.svg';
import { useCheckHasRoom } from '@/hooks/room/room';
import { useGetSentRequestRoomList } from '@/hooks/room/user';

import SimpleRoomItem from '../common/roomItem/simpleRoomItem';
import { useMemberStore } from '@/zustand/store';

const SentRequestComponent: React.FC = () => {
  const router = useRouter();

  const { memberInfo, hasRoom } = useMemberStore();

  const { data } = useGetSentRequestRoomList(3);

  return (
    hasRoom &&
    data.pages?.flatMap((page) => page.result.result).length !== 0 && (
      <View>
        <View className="gap-y-[16px] px-[20px]">
          <View className="flex flex-row justify-between items-center">
            <View className="gap-y-[4px] mx-[4px]">
              <Text className="Semibold18 text-emphasizedFont">{memberInfo?.nickname}님이</Text>
              <Text className="Semibold18 text-emphasizedFont">참여요청을 보낸 방이에요</Text>
            </View>

            <Pressable
              onPress={() => router.push('/room/sentRequest')}
              className="flex flex-row items-center gap-x-[4px]"
            >
              <Text className="Semibold12 text-disabledFont">더보기</Text>
              <GrayArrowIcon />
            </Pressable>
          </View>

          {data.pages
            ?.flatMap((page) => page.result.result)
            .slice(0, 3)
            .map((room) => (
              <SimpleRoomItem key={room.roomId} roomData={room} />
            ))}
        </View>

        <View className="bg-[#F7F9FA] w-full h-[10px] mt-[24px]" />
      </View>
    )
  );
};

export default SentRequestComponent;
