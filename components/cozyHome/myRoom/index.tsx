import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { useGetMyRoomDetail } from '@/hooks/room/room';
import { useMemberStore } from '@/zustand/member/member';
import { useHasRoomStore } from '@/zustand/room/room';

const MyRoomComponent: React.FC = () => {
  const router = useRouter();

  const { memberState } = useMemberStore();
  const { roomId } = useHasRoomStore();

  const { data } = useGetMyRoomDetail();

  return (
    <View className="gap-y-[16px] px-[20px]">
      <View className="gap-y-0.5 mx-1">
        <Text className="text-18 font-600 leading-18 text-emphasizedFont">
          {memberState.nickname}님이
        </Text>
        <Text className="text-18 font-600 leading-18 text-emphasizedFont">
          현재 참여하고있는 방이에요
        </Text>
      </View>

      {roomId !== 0 ? (
        <LinearGradient
          colors={['#B5D3FF', '#68A4FF']}
          start={{ x: 0.02, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderRadius: 12,
            padding: 1,
          }}
        >
          <LinearGradient
            colors={['rgba(249, 251, 255, 0.8)', 'rgba(223, 236, 255, 0.8)']}
            start={{ x: 0.8, y: 0 }}
            end={{ x: 1.04, y: 1 }}
            style={{ borderRadius: 12 }}
          >
            <Pressable
              onPress={() => router.push(`/room/${roomId}`)}
              className="rounded-xl p-[16px] gap-y-[8px]"
            >
              <View className="flex flex-row gap-x-[8px]">
                {data?.result.hashtagList.map((hash, index) => (
                  <View key={index} className="bg-white rounded px-[8px] py-[2px]">
                    <Text className="text-12 font-500 text-colorFont">#{hash}</Text>
                  </View>
                ))}
              </View>

              <Text className="text-16 font-600 text-emphasizedFont">{data?.result.name}</Text>

              <View className="flex flex-row justify-between items-center">
                <Text className="text-12 font-500 text-disabledFont">
                  <Text className="text-mainColor">{data?.result.arrivalMateNum}명</Text>의
                  룸메이트가 있어요
                </Text>
                <Text className="text-16 font-500 text-colorFont">
                  {data?.result.equality ?? '??'}%
                </Text>
              </View>
            </Pressable>
          </LinearGradient>
        </LinearGradient>
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
