import { Text, View } from 'react-native';

import { UserDetailComponentProps } from '@/type/member-stat';

const EssentialInfoComponent: React.FC<UserDetailComponentProps> = ({ data }) => {
  const translateTime = (value: number) => {
    if (value === 0) return '오전 0시';
    if (value === 12) return '오후 12시';
    if (value < 12) return `오전 ${value}시`;
    return `오후 ${value - 12}시`;
  };

  return (
    <View className="px-[20px] gap-y-[12px]">
      <Text className="Semibold16 text-emphasizedFont ml-[4px]">필수 정보</Text>

      <View className="p-[16px] rounded-xl border border-strokeColor">
        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="Medium14 text-colorFont">기상시간</Text>
          <Text className="Medium14 text-basicFont">
            {translateTime(data.memberStatDetail.wakeUpTime as number)}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="Medium14 text-colorFont">취침시간</Text>
          <Text className="Medium14 text-basicFont">
            {translateTime(data.memberStatDetail.sleepingTime as number)}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="Medium14 text-colorFont">소등시간</Text>
          <Text className="Medium14 text-basicFont">
            {translateTime(data.memberStatDetail.turnOffTime as number)}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="Medium14 text-colorFont">흡연여부</Text>
          <Text className="Medium14 text-basicFont">{data.memberStatDetail.smokingStatus}</Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px] flex-1">
          <Text className="Medium14 text-colorFont">잠버릇</Text>
          <Text className="Medium14 leading-6 text-basicFont flex-1">
            {data.memberStatDetail.sleepingHabits &&
              data.memberStatDetail.sleepingHabits.join(', ')}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="Medium14 text-colorFont">에어컨</Text>
          <Text className="Medium14 text-basicFont">{data.memberStatDetail.coolingIntensity}</Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="Medium14 text-colorFont">히터</Text>
          <Text className="Medium14 text-basicFont">{data.memberStatDetail.heatingIntensity}</Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="Medium14 text-colorFont">생활 패턴</Text>
          <Text className="Medium14 text-basicFont">{data.memberStatDetail.lifePattern}</Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="Medium14 text-colorFont">친밀도</Text>
          <Text className="Medium14 text-basicFont">{data.memberStatDetail.intimacy}</Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="Medium14 text-colorFont">물건공유</Text>
          <Text className="Medium14 text-basicFont">{data.memberStatDetail.sharingStatus}</Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="Medium14 text-colorFont">공부여부</Text>
          <Text className="Medium14 text-basicFont">{data.memberStatDetail.studyingStatus}</Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="Medium14 text-colorFont">섭취여부</Text>
          <Text className="Medium14 text-basicFont">{data.memberStatDetail.eatingStatus}</Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="Medium14 text-colorFont">게임여부</Text>
          <Text className="Medium14 text-basicFont">{data.memberStatDetail.gamingStatus}</Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="Medium14 text-colorFont">전화여부</Text>
          <Text className="Medium14 text-basicFont">{data.memberStatDetail.callingStatus}</Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="Medium14 text-colorFont">청결 예민도</Text>
          <Text className="Medium14 text-basicFont">
            {data.memberStatDetail.cleannessSensitivity}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="Medium14 text-colorFont">소음 예민도</Text>
          <Text className="Medium14 text-basicFont">{data.memberStatDetail.noiseSensitivity}</Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="Medium14 text-colorFont">청소빈도</Text>
          <Text className="Medium14 text-basicFont">{data.memberStatDetail.cleaningFrequency}</Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="Medium14 text-colorFont">음주빈도</Text>
          <Text className="Medium14 text-basicFont">{data.memberStatDetail.drinkingFrequency}</Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px] flex-1">
          <Text className="Medium14 text-colorFont">성격</Text>
          <Text className="Medium14 leading-6 text-basicFont flex-1">
            {data.memberStatDetail.personalities && data.memberStatDetail.personalities.join(', ')}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="Medium14 text-colorFont">MBTI</Text>
          <Text className="Medium14 text-basicFont">{data.memberStatDetail.mbti}</Text>
        </View>
      </View>
    </View>
  );
};

export default EssentialInfoComponent;
