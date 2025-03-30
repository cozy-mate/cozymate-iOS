import { Text, View } from 'react-native';

import { intensityItems, sensitivityItems } from '@/constants/items/lifeStyle';
import { useGetMemberDetail } from '@/hooks/member-stat/member-stat';

interface UserDetailComponentProps {
  id: number;
}

const EssentialInfoComponent: React.FC<UserDetailComponentProps> = ({ id }) => {
  const { data } = useGetMemberDetail(Number(id));

  return (
    <View className="px-[20px] gap-y-[12px]">
      <Text className="text-16 font-600 text-emphasizedFont ml-1">필수 정보</Text>

      <View className="p-4 rounded-xl border border-strokeColor">
        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="text-14 font-500 text-colorFont">기상시간</Text>
          <Text className="text-14 font-500 text-basicFont">
            {data.result.memberStatDetail.wakeUpMeridian} {data.result.memberStatDetail.wakeUpTime}
            시
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="text-14 font-500 text-colorFont">취침시간</Text>
          <Text className="text-14 font-500 text-basicFont">
            {data.result.memberStatDetail.sleepingMeridian}{' '}
            {data.result.memberStatDetail.sleepingTime}시
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="text-14 font-500 text-colorFont">소등시간</Text>
          <Text className="text-14 font-500 text-basicFont">
            {data.result.memberStatDetail.turnOffMeridian}{' '}
            {data.result.memberStatDetail.turnOffTime}시
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="text-14 font-500 text-colorFont">흡연여부</Text>
          <Text className="text-14 font-500 text-basicFont">
            {data.result.memberStatDetail.smoking}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="text-14 font-500 text-colorFont">잠버릇</Text>
          <Text className="text-14 font-500 text-basicFont">
            {data.result.memberStatDetail.sleepingHabit}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="text-14 font-500 text-colorFont">에어컨</Text>
          <Text className="text-14 font-500 text-basicFont">
            {intensityItems[data.result.memberStatDetail.airConditioningIntensity]}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="text-14 font-500 text-colorFont">히터</Text>
          <Text className="text-14 font-500 text-basicFont">
            {intensityItems[data.result.memberStatDetail.heatingIntensity]}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="text-14 font-500 text-colorFont">생활 패턴</Text>
          <Text className="text-14 font-500 text-basicFont">
            {data.result.memberStatDetail.lifePattern}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="text-14 font-500 text-colorFont">친밀도</Text>
          <Text className="text-14 font-500 text-basicFont">
            {data.result.memberStatDetail.intimacy}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="text-14 font-500 text-colorFont">물건공유</Text>
          <Text className="text-14 font-500 text-basicFont">
            {data.result.memberStatDetail.canShare}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="text-14 font-500 text-colorFont">공부여부</Text>
          <Text className="text-14 font-500 text-basicFont">
            {data.result.memberStatDetail.studying}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="text-14 font-500 text-colorFont">섭취여부</Text>
          <Text className="text-14 font-500 text-basicFont">
            {data.result.memberStatDetail.intake}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="text-14 font-500 text-colorFont">게임여부</Text>
          <Text className="text-14 font-500 text-basicFont">
            {data.result.memberStatDetail.isPlayGame}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="text-14 font-500 text-colorFont">전화여부</Text>
          <Text className="text-14 font-500 text-basicFont">
            {data.result.memberStatDetail.isPhoneCall}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="text-14 font-500 text-colorFont">청결 예민도</Text>
          <Text className="text-14 font-500 text-basicFont">
            {sensitivityItems[data.result.memberStatDetail.cleanSensitivity - 1]}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="text-14 font-500 text-colorFont">소음 예민도</Text>
          <Text className="text-14 font-500 text-basicFont">
            {sensitivityItems[data.result.memberStatDetail.noiseSensitivity - 1]}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="text-14 font-500 text-colorFont">청소빈도</Text>
          <Text className="text-14 font-500 text-basicFont">
            {data.result.memberStatDetail.cleaningFrequency}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="text-14 font-500 text-colorFont">음주빈도</Text>
          <Text className="text-14 font-500 text-basicFont">
            {data.result.memberStatDetail.drinkingFrequency}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="text-14 font-500 text-colorFont">성격</Text>
          <Text className="text-14 font-500 text-basicFont">
            {data.result.memberStatDetail.personality}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="text-14 font-500 text-colorFont">MBTI</Text>
          <Text className="text-14 font-500 text-basicFont">
            {data.result.memberStatDetail.mbti}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default EssentialInfoComponent;
