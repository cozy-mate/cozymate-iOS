import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import GrayArrowIcon from '@/assets/images/common/grayArrow.svg';
import { useGetSentRequestRoomList } from '@/hooks/room/room';
import { useMemberStore } from '@/zustand/member/member';

const SentRequestComponent: React.FC = () => {
  const router = useRouter();

  const { memberState } = useMemberStore();

  const { data } = useGetSentRequestRoomList();

  return (
    <View className="gap-y-[16px] px-[20px]">
      <View className="flex flex-row justify-between items-center">
        <View className="gap-y-[4px] mx-[4px]">
          <Text className="text-18 font-600 text-emphasizedFont">{memberState.nickname}님이</Text>
          <Text className="text-18 font-600 text-emphasizedFont">참여요청을 보낸 방이에요</Text>
        </View>

        <Pressable
          onPress={() => router.push('/room/sendRequest')}
          className="flex flex-row items-center gap-x-[4px]"
        >
          <Text className="text-12 font-600 leading-12 text-disabledFont">더보기</Text>
          <GrayArrowIcon />
        </Pressable>
      </View>

      {data.pages
        ?.flatMap((page) => page.result.result)
        .map((room) => (
          <Pressable key={room.roomId} className="px-[4px] py-[10px] gap-y-[8px]">
            <View className="flex flex-row gap-x-[8px]">
              {room.hashtagList.map((hash, index) => (
                <View key={index} className="bg-colorBox rounded px-[8px] py-[2px]">
                  <Text className="text-12 font-500 leading-12 text-colorFont">#{hash}</Text>
                </View>
              ))}
            </View>

            <Text className="text-16 font-600 leading-16 text-emphasizedFont">{room.name}</Text>

            <View className="flex flex-row justify-between items-center">
              <Text className="text-12 font-500 leading-12 text-disabledFont">
                <Text className="text-mainColor">{room.arrivalMateNum}명</Text>의 룸메이트가 있어요
              </Text>

              <Text className="text-16 font-500 leading-16 text-mainColor">{room.equality}%</Text>
            </View>
          </Pressable>
        ))}
    </View>
  );
};

export default SentRequestComponent;
