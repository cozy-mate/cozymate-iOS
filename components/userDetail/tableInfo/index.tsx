import { Text, View } from 'react-native';

import { intensityItems, sensitivityItems } from '@/constants/items/lifeStyle';
import { useGetMemberDetail, useGetMyDetail } from '@/hooks/member-stat/member-stat';

interface UserDetailComponentProps {
  id: number;
}

const TableInfoComponent: React.FC<UserDetailComponentProps> = ({ id }) => {
  const { data: myData } = useGetMyDetail();
  const { data } = useGetMemberDetail(Number(id));

  const getTextStyle = (myValue: any, otherValue: any) =>
    myValue !== otherValue ? 'text-[#F7473B]' : 'text-basicFont';

  const getTimeTextStyle = (myTime: any, otherTime: any, myMeridian: any, otherMeridian: any) => {
    return myTime === otherTime && myMeridian === otherMeridian
      ? 'text-basicFont'
      : 'text-[#F7473B]';
  };

  const getSlicedText = (text: string) => {
    if (text.length > 8) {
      return text.slice(0, 8) + '...';
    } else {
      return text;
    }
  };

  return (
    <View className="px-[20px] gap-y-[12px]">
      <View className="p-4 rounded-xl border border-strokeColor">
        <View className="flex flex-row items-center">
          <Text className="text-14 font-500 text-colorFont w-[21%]">닉네임</Text>
          <Text className="text-14 font-500 w-[39%] text-center text-basicFont">
            {getSlicedText(myData.result.memberDetail.nickname)}
          </Text>
          <Text className="text-14 font-500 w-[39%] text-center text-basicFont">
            {getSlicedText(data.result.memberDetail.nickname)}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center">
          <Text className="text-14 font-500 text-colorFont w-[21%]">출생년도</Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTextStyle(myData.result.memberDetail.birthday.slice(0, 4), data.result.memberDetail.birthday.slice(0, 4))}`}
          >
            {myData.result.memberDetail.birthday.slice(0, 4)}년
          </Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTextStyle(myData.result.memberDetail.birthday.slice(0, 4), data.result.memberDetail.birthday.slice(0, 4))}`}
          >
            {data.result.memberDetail.birthday.slice(0, 4)}년
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center">
          <Text className="text-14 font-500 text-colorFont w-[21%]">학교</Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTextStyle(myData.result.memberDetail.universityName, data.result.memberDetail.universityName)}`}
          >
            {myData.result.memberDetail.universityName}
          </Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTextStyle(myData.result.memberDetail.universityName, data.result.memberDetail.universityName)}`}
          >
            {data.result.memberDetail.universityName}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center">
          <Text className="text-14 font-500 text-colorFont w-[21%]">학번</Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTextStyle(myData.result.memberStatDetail.admissionYear, data.result.memberStatDetail.admissionYear)}`}
          >
            {myData.result.memberStatDetail.admissionYear}학번
          </Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTextStyle(myData.result.memberStatDetail.admissionYear, data.result.memberStatDetail.admissionYear)}`}
          >
            {data.result.memberStatDetail.admissionYear}학번
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center">
          <Text className="text-14 font-500 text-colorFont w-[21%]">학과</Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTextStyle(myData.result.memberDetail.majorName, data.result.memberDetail.majorName)}`}
          >
            {myData.result.memberDetail.majorName}
          </Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTextStyle(myData.result.memberDetail.majorName, data.result.memberDetail.majorName)}`}
          >
            {data.result.memberDetail.majorName}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center">
          <Text className="text-14 font-500 text-colorFont w-[21%]">기상시간</Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTimeTextStyle(myData.result.memberStatDetail.wakeUpTime, data.result.memberStatDetail.wakeUpTime, myData.result.memberStatDetail.wakeUpMeridian, data.result.memberStatDetail.wakeUpMeridian)}`}
          >
            {myData.result.memberStatDetail.wakeUpMeridian}{' '}
            {myData.result.memberStatDetail.wakeUpTime}시
          </Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTimeTextStyle(myData.result.memberStatDetail.wakeUpTime, data.result.memberStatDetail.wakeUpTime, myData.result.memberStatDetail.wakeUpMeridian, data.result.memberStatDetail.wakeUpMeridian)}`}
          >
            {data.result.memberStatDetail.wakeUpMeridian} {data.result.memberStatDetail.wakeUpTime}
            시
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center">
          <Text className="text-14 font-500 text-colorFont w-[21%]">취침시간</Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTimeTextStyle(myData.result.memberStatDetail.sleepingTime, data.result.memberStatDetail.sleepingTime, myData.result.memberStatDetail.sleepingMeridian, data.result.memberStatDetail.sleepingMeridian)}`}
          >
            {myData.result.memberStatDetail.sleepingMeridian}{' '}
            {myData.result.memberStatDetail.sleepingTime}시
          </Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTimeTextStyle(myData.result.memberStatDetail.sleepingTime, data.result.memberStatDetail.sleepingTime, myData.result.memberStatDetail.sleepingMeridian, data.result.memberStatDetail.sleepingMeridian)}`}
          >
            {data.result.memberStatDetail.sleepingMeridian}{' '}
            {data.result.memberStatDetail.sleepingTime}시
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center">
          <Text className="text-14 font-500 text-colorFont w-[21%]">소등시간</Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTimeTextStyle(myData.result.memberStatDetail.turnOffTime, data.result.memberStatDetail.turnOffTime, myData.result.memberStatDetail.turnOffMeridian, data.result.memberStatDetail.turnOffMeridian)}`}
          >
            {myData.result.memberStatDetail.turnOffMeridian}{' '}
            {myData.result.memberStatDetail.turnOffTime}시
          </Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTimeTextStyle(myData.result.memberStatDetail.turnOffTime, data.result.memberStatDetail.turnOffTime, myData.result.memberStatDetail.turnOffMeridian, data.result.memberStatDetail.turnOffMeridian)}`}
          >
            {data.result.memberStatDetail.turnOffMeridian}{' '}
            {data.result.memberStatDetail.turnOffTime}시
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center">
          <Text className="text-14 font-500 text-colorFont w-[21%]">흡연여부</Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTextStyle(myData.result.memberStatDetail.smoking, data.result.memberStatDetail.smoking)}`}
          >
            {getSlicedText(myData.result.memberStatDetail.smoking)}
          </Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTextStyle(myData.result.memberStatDetail.smoking, data.result.memberStatDetail.smoking)}`}
          >
            {getSlicedText(data.result.memberStatDetail.smoking)}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center">
          <Text className="text-14 font-500 text-colorFont w-[21%]">잠버릇</Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTextStyle(myData.result.memberStatDetail.sleepingHabit.join(', '), data.result.memberStatDetail.sleepingHabit.join(', '))}`}
          >
            {getSlicedText(myData.result.memberStatDetail.sleepingHabit.join(', '))}
          </Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTextStyle(myData.result.memberStatDetail.sleepingHabit.join(', '), data.result.memberStatDetail.sleepingHabit.join(', '))}`}
          >
            {getSlicedText(data.result.memberStatDetail.sleepingHabit.join(', '))}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center">
          <Text className="text-14 font-500 text-colorFont w-[21%]">에어컨</Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTextStyle(myData.result.memberStatDetail.airConditioningIntensity, data.result.memberStatDetail.airConditioningIntensity)}`}
          >
            {getSlicedText(intensityItems[myData.result.memberStatDetail.airConditioningIntensity])}
          </Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTextStyle(myData.result.memberStatDetail.airConditioningIntensity, data.result.memberStatDetail.airConditioningIntensity)}`}
          >
            {getSlicedText(intensityItems[data.result.memberStatDetail.airConditioningIntensity])}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center">
          <Text className="text-14 font-500 text-colorFont w-[21%]">히터</Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTextStyle(myData.result.memberStatDetail.heatingIntensity, data.result.memberStatDetail.heatingIntensity)}`}
          >
            {getSlicedText(intensityItems[myData.result.memberStatDetail.heatingIntensity])}
          </Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTextStyle(myData.result.memberStatDetail.heatingIntensity, data.result.memberStatDetail.heatingIntensity)}`}
          >
            {getSlicedText(intensityItems[data.result.memberStatDetail.heatingIntensity])}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center">
          <Text className="text-14 font-500 text-colorFont w-[21%]">생활 패턴</Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTextStyle(myData.result.memberStatDetail.lifePattern, data.result.memberStatDetail.lifePattern)}`}
          >
            {getSlicedText(myData.result.memberStatDetail.lifePattern)}
          </Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTextStyle(myData.result.memberStatDetail.lifePattern, data.result.memberStatDetail.lifePattern)}`}
          >
            {getSlicedText(data.result.memberStatDetail.lifePattern)}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center">
          <Text className="text-14 font-500 text-colorFont w-[21%]">친밀도</Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTextStyle(myData.result.memberStatDetail.intimacy, data.result.memberStatDetail.intimacy)}`}
          >
            {getSlicedText(myData.result.memberStatDetail.intimacy)}
          </Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTextStyle(myData.result.memberStatDetail.intimacy, data.result.memberStatDetail.intimacy)}`}
          >
            {getSlicedText(data.result.memberStatDetail.intimacy)}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center">
          <Text className="text-14 font-500 text-colorFont w-[21%]">물건공유</Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTextStyle(myData.result.memberStatDetail.canShare, data.result.memberStatDetail.canShare)}`}
          >
            {getSlicedText(myData.result.memberStatDetail.canShare)}
          </Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTextStyle(myData.result.memberStatDetail.canShare, data.result.memberStatDetail.canShare)}`}
          >
            {getSlicedText(data.result.memberStatDetail.canShare)}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center">
          <Text className="text-14 font-500 text-colorFont w-[21%]">공부여부</Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTextStyle(myData.result.memberStatDetail.studying, data.result.memberStatDetail.studying)}`}
          >
            {getSlicedText(myData.result.memberStatDetail.studying)}
          </Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTextStyle(myData.result.memberStatDetail.studying, data.result.memberStatDetail.studying)}`}
          >
            {getSlicedText(data.result.memberStatDetail.studying)}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center">
          <Text className="text-14 font-500 text-colorFont w-[21%]">섭취여부</Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTextStyle(myData.result.memberStatDetail.intake, data.result.memberStatDetail.intake)}`}
          >
            {getSlicedText(myData.result.memberStatDetail.intake)}
          </Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTextStyle(myData.result.memberStatDetail.intake, data.result.memberStatDetail.intake)}`}
          >
            {getSlicedText(data.result.memberStatDetail.intake)}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center">
          <Text className="text-14 font-500 text-colorFont w-[21%]">게임여부</Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTextStyle(myData.result.memberStatDetail.isPlayGame, data.result.memberStatDetail.isPlayGame)}`}
          >
            {getSlicedText(myData.result.memberStatDetail.isPlayGame)}
          </Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTextStyle(myData.result.memberStatDetail.isPlayGame, data.result.memberStatDetail.isPlayGame)}`}
          >
            {getSlicedText(data.result.memberStatDetail.isPlayGame)}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center">
          <Text className="text-14 font-500 text-colorFont w-[21%]">전화여부</Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTextStyle(myData.result.memberStatDetail.isPhoneCall, data.result.memberStatDetail.isPhoneCall)}`}
          >
            {getSlicedText(myData.result.memberStatDetail.isPhoneCall)}
          </Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTextStyle(myData.result.memberStatDetail.isPhoneCall, data.result.memberStatDetail.isPhoneCall)}`}
          >
            {getSlicedText(data.result.memberStatDetail.isPhoneCall)}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center">
          <Text className="text-14 font-500 text-colorFont w-[21%]">청결 예민도</Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTextStyle(myData.result.memberStatDetail.cleanSensitivity, data.result.memberStatDetail.cleanSensitivity)}`}
          >
            {getSlicedText(sensitivityItems[myData.result.memberStatDetail.cleanSensitivity - 1])}
          </Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTextStyle(myData.result.memberStatDetail.cleanSensitivity, data.result.memberStatDetail.cleanSensitivity)}`}
          >
            {getSlicedText(sensitivityItems[data.result.memberStatDetail.cleanSensitivity - 1])}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center">
          <Text className="text-14 font-500 text-colorFont w-[21%]">소음 예민도</Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTextStyle(myData.result.memberStatDetail.noiseSensitivity, data.result.memberStatDetail.noiseSensitivity)}`}
          >
            {getSlicedText(sensitivityItems[myData.result.memberStatDetail.noiseSensitivity - 1])}
          </Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTextStyle(myData.result.memberStatDetail.noiseSensitivity, data.result.memberStatDetail.noiseSensitivity)}`}
          >
            {getSlicedText(sensitivityItems[data.result.memberStatDetail.noiseSensitivity - 1])}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center">
          <Text className="text-14 font-500 text-colorFont w-[21%]">청소빈도</Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTextStyle(myData.result.memberDetail.nickname, data.result.memberDetail.nickname)}`}
          >
            {getSlicedText(myData.result.memberStatDetail.cleaningFrequency)}
          </Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTextStyle(myData.result.memberDetail.nickname, data.result.memberDetail.nickname)}`}
          >
            {getSlicedText(data.result.memberStatDetail.cleaningFrequency)}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center">
          <Text className="text-14 font-500 text-colorFont w-[21%]">음주빈도</Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTextStyle(myData.result.memberStatDetail.drinkingFrequency, data.result.memberStatDetail.drinkingFrequency)}`}
          >
            {getSlicedText(myData.result.memberStatDetail.drinkingFrequency)}
          </Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTextStyle(myData.result.memberStatDetail.drinkingFrequency, data.result.memberStatDetail.drinkingFrequency)}`}
          >
            {getSlicedText(data.result.memberStatDetail.drinkingFrequency)}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center">
          <Text className="text-14 font-500 text-colorFont w-[21%]">성격</Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTextStyle(myData.result.memberStatDetail.personality, data.result.memberStatDetail.personality)}`}
          >
            {getSlicedText(myData.result.memberStatDetail.personality.join(', '))}
          </Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTextStyle(myData.result.memberStatDetail.personality, data.result.memberStatDetail.personality)}`}
          >
            {getSlicedText(data.result.memberStatDetail.personality.join(', '))}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center">
          <Text className="text-14 font-500 text-colorFont w-[21%]">MBTI</Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTextStyle(myData.result.memberStatDetail.mbti, data.result.memberStatDetail.mbti)}`}
          >
            {getSlicedText(myData.result.memberStatDetail.mbti)}
          </Text>
          <Text
            className={`text-14 font-500 w-[39%] text-center ${getTextStyle(myData.result.memberStatDetail.mbti, data.result.memberStatDetail.mbti)}`}
          >
            {getSlicedText(data.result.memberStatDetail.mbti)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TableInfoComponent;
