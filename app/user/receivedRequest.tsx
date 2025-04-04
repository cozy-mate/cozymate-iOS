import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import { useGetReceivedRequestList } from '@/hooks/room/room';

export default function ReceivedRequest() {
  const router = useRouter();

  const { data } = useGetReceivedRequestList();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="gap-y-[20px]">
        <View className="px-[20px]">
          <BackHeaderComponent />
        </View>

        <View className="gap-y-[16px] px-[20px]">
          <View className="flex flex-row items-center">
            <View className="gap-y-[4px] ml-[4px]">
              <Text className="text-18 font-600 text-emphasizedFont">
                {data?.result.length}개의
              </Text>
              <Text className="text-18 font-600 text-emphasizedFont">
                방 참여 요청이 도착했어요
              </Text>
            </View>
          </View>

          {data?.result.length !== 0 &&
            data?.result.map((member) => (
              <Pressable
                key={member.memberId}
                onPress={() => router.push(`/user/${member.memberId}`)}
                className="px-[16px] py-[20px] flex flex-row justify-between items-center border border-disabledColor rounded-xl"
              >
                <Text className="text-16 font-600 leading-16 text-basicFont mx-[8px]">
                  {member.nickname}
                </Text>

                <Text
                  className={`text-16 font-500 leading-16 ${member.mateEquality !== null && member.mateEquality > 50 ? 'text-mainColor' : 'text-colorFont'}`}
                >
                  {member.mateEquality}%
                </Text>
              </Pressable>
            ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
