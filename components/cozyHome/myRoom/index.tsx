import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { useGetMyRoomDetail } from '@/hooks/room/room';
import { useMemberStore } from '@/zustand/member/member';
import { useHasRoomStore } from '@/zustand/room/room';

const MyRoomComponent: React.FC = () => {
  const router = useRouter();

  const { memberState } = useMemberStore();
  const { roomInfo } = useHasRoomStore();

  const { data } = useGetMyRoomDetail();

  return (
    <View className="gap-y-[16px] px-[20px]">
      <View className="gap-y-[2px] mx-[4px]">
        <Text className="text-18 font-600 leading-18 text-emphasizedFont">
          {memberState.nickname}님이
        </Text>
        <Text className="text-18 font-600 leading-18 text-emphasizedFont">
          현재 참여하고있는 방이에요
        </Text>
      </View>

      {roomInfo.roomId !== 0 ? (
        <Pressable
          onPress={() => router.push(`/room/${roomInfo.roomId}`)}
          className="rounded-xl p-[16px] gap-y-[8px] border border-mainColor bg-subColor2"
        >
          <View className="flex flex-row gap-x-[8px]">
            {data?.result.hashtagList.map((hash, index) => (
              <View key={index} className="bg-white rounded px-[8px] py-[2px]">
                <Text className="text-12 font-500 leading-12 text-colorFont">#{hash}</Text>
              </View>
            ))}
          </View>

          <Text className="text-16 font-600 leading-16 text-emphasizedFont">
            {data?.result.name}
          </Text>

          <View className="flex flex-row justify-between items-center">
            <Text className="text-12 font-500 leading-12 text-disabledFont">
              <Text className="text-mainColor">{data?.result.arrivalMateNum}명</Text>의 룸메이트가
              있어요
            </Text>
            <Text className="text-16 font-500 leading-16 text-colorFont">
              {data?.result.equality ?? '?? '}%
            </Text>
          </View>
        </Pressable>
      ) : (
        <View className="p-[20px] gap-y-[6px] mt-[16px]">
          <Text className="text-14 font-500 text-disabledFont leading-14 text-center">
            아직 참여하고 있는 방이 없어요
          </Text>
          <Text className="text-14 font-500 text-disabledFont leading-14 text-center">
            방을 만들거나, 방에 참여해보세요!
          </Text>
        </View>
      )}
    </View>
  );
};

export default MyRoomComponent;
