import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import GrayArrowIcon from '@/assets/images/common/grayArrow.svg';
import MagnifierIcon from '@/assets/images/userDetail/magnifier.svg';
import { intensityItems, sensitivityItems } from '@/constants/items/lifeStyle';
import { sampleLifeStyleData } from '@/constants/sampleLifeStyle';
import { useGetMemberDetail, useGetMyDetail } from '@/hooks/member-stat/member-stat';
import { useMemberStore } from '@/zustand/member/member';
import { useHasLifeStyleStore } from '@/zustand/member-stat/member-stat';

type InfoItem = {
  index: number;
  label: string;
  myValue: any;
  otherValue: any;
};

interface InfoRowProps {
  item: InfoItem;
}

const InfoRow: React.FC<InfoRowProps> = ({ item }) => {
  const getTextStyle = (myValue: any, otherValue: any) =>
    JSON.stringify(myValue) !== JSON.stringify(otherValue) ? 'text-[#F7473B]' : 'text-basicFont';

  const getSlicedText = (text: string) => {
    if (text.length > 8) {
      return text.slice(0, 8) + '...';
    } else {
      return text;
    }
  };

  return (
    <View
      className={`flex flex-row items-center py-[12px] border-b border-b-[#F1F2F4] ${item.index === 1 && 'pt-0'}
      ${item.index === 25 && 'pb-0 border-b-0'}`}
    >
      <Text className="text-14 font-500 text-colorFont w-[22%]">{item.label}</Text>
      <Text
        className={`text-14 font-500 w-[38%] text-center ${item.label === '닉네임' ? 'text-basicFont' : getTextStyle(item.myValue, item.otherValue)}`}
      >
        {getSlicedText(Array.isArray(item.myValue) ? item.myValue.join(', ') : item.myValue)}
      </Text>

      <Text
        className={`text-14 font-500 w-[38%] text-center ${item.label === '닉네임' ? 'text-basicFont' : getTextStyle(item.myValue, item.otherValue)}`}
      >
        {getSlicedText(
          Array.isArray(item.otherValue) ? item.otherValue.join(', ') : item.otherValue,
        )}
      </Text>
    </View>
  );
};

interface UserDetailComponentProps {
  id: number;
}

const TableInfoComponent: React.FC<UserDetailComponentProps> = ({ id }) => {
  const router = useRouter();

  const { hasLifeStyle } = useHasLifeStyleStore();
  const { memberState } = useMemberStore();

  const { data: myData } = useGetMyDetail();
  const { data } = useGetMemberDetail(Number(id));

  const items: InfoItem[] = [
    {
      index: 1,
      label: '닉네임',
      myValue: memberState.nickname,
      otherValue: data.result.memberDetail.nickname,
    },
    {
      index: 2,
      label: '출생년도',
      myValue: `${memberState.birthday.slice(0, 4)}년`,
      otherValue: `${data.result.memberDetail.birthday.slice(0, 4)}년`,
    },
    {
      index: 3,
      label: '학교',
      myValue: memberState.universityName,
      otherValue: data.result.memberDetail.universityName,
    },
    {
      index: 4,
      label: '학번',
      myValue:
        myData !== undefined
          ? `${myData.result.memberStatDetail.admissionYear}학번`
          : `${sampleLifeStyleData.admissionYear}학번`,
      otherValue: `${data.result.memberStatDetail.admissionYear}학번`,
    },
    {
      index: 5,
      label: '학과',
      myValue: memberState.majorName,
      otherValue: data.result.memberDetail.majorName,
    },
    {
      index: 6,
      label: '기상시간',
      myValue:
        myData !== undefined
          ? `${myData.result.memberStatDetail.wakeUpMeridian} ${myData.result.memberStatDetail.wakeUpTime}시`
          : `${sampleLifeStyleData.wakeUpMeridian} ${sampleLifeStyleData.wakeUpTime}시`,
      otherValue: `${data.result.memberStatDetail.wakeUpMeridian} ${data.result.memberStatDetail.wakeUpTime}시`,
    },
    {
      index: 7,
      label: '취침시간',
      myValue:
        myData !== undefined
          ? `${myData.result.memberStatDetail.sleepingMeridian} ${myData.result.memberStatDetail.sleepingTime}시`
          : `${sampleLifeStyleData.sleepingMeridian} ${sampleLifeStyleData.sleepingTime}시`,
      otherValue: `${data.result.memberStatDetail.sleepingMeridian} ${data.result.memberStatDetail.sleepingTime}시`,
    },
    {
      index: 8,
      label: '소등시간',
      myValue:
        myData !== undefined
          ? `${myData.result.memberStatDetail.turnOffMeridian} ${myData.result.memberStatDetail.turnOffTime}시`
          : `${sampleLifeStyleData.turnOffMeridian} ${sampleLifeStyleData.turnOffTime}시`,
      otherValue: `${data.result.memberStatDetail.turnOffMeridian} ${data.result.memberStatDetail.turnOffTime}시`,
    },
    {
      index: 9,
      label: '흡연여부',
      myValue:
        myData !== undefined ? myData.result.memberStatDetail.smoking : sampleLifeStyleData.smoking,
      otherValue: data.result.memberStatDetail.smoking,
    },
    {
      index: 10,
      label: '잠버릇',
      myValue:
        myData !== undefined
          ? myData.result.memberStatDetail.sleepingHabit
          : sampleLifeStyleData.sleepingHabit,
      otherValue: data.result.memberStatDetail.sleepingHabit,
    },
    {
      index: 11,
      label: '에어컨',
      myValue:
        myData !== undefined
          ? intensityItems[myData.result.memberStatDetail.airConditioningIntensity]
          : intensityItems[sampleLifeStyleData.airConditioningIntensity],
      otherValue: intensityItems[data.result.memberStatDetail.airConditioningIntensity],
    },
    {
      index: 12,
      label: '히터',
      myValue:
        myData !== undefined
          ? intensityItems[myData.result.memberStatDetail.heatingIntensity]
          : intensityItems[sampleLifeStyleData.heatingIntensity],
      otherValue: intensityItems[data.result.memberStatDetail.heatingIntensity],
    },
    {
      index: 13,
      label: '생활 패턴',
      myValue:
        myData !== undefined
          ? myData.result.memberStatDetail.lifePattern
          : sampleLifeStyleData.lifePattern,
      otherValue: data.result.memberStatDetail.lifePattern,
    },
    {
      index: 14,
      label: '친밀도',
      myValue:
        myData !== undefined
          ? myData.result.memberStatDetail.intimacy
          : sampleLifeStyleData.intimacy,
      otherValue: data.result.memberStatDetail.intimacy,
    },
    {
      index: 15,
      label: '물건공유',
      myValue:
        myData !== undefined
          ? myData.result.memberStatDetail.canShare
          : sampleLifeStyleData.canShare,
      otherValue: data.result.memberStatDetail.canShare,
    },
    {
      index: 16,
      label: '공부여부',
      myValue:
        myData !== undefined
          ? myData.result.memberStatDetail.studying
          : sampleLifeStyleData.studying,
      otherValue: data.result.memberStatDetail.studying,
    },
    {
      index: 17,
      label: '섭취여부',
      myValue:
        myData !== undefined ? myData.result.memberStatDetail.intake : sampleLifeStyleData.intake,
      otherValue: data.result.memberStatDetail.intake,
    },
    {
      index: 18,
      label: '게임여부',
      myValue:
        myData !== undefined
          ? myData.result.memberStatDetail.isPlayGame
          : sampleLifeStyleData.isPlayGame,
      otherValue: data.result.memberStatDetail.isPlayGame,
    },
    {
      index: 19,
      label: '전화여부',
      myValue:
        myData !== undefined
          ? myData.result.memberStatDetail.isPhoneCall
          : sampleLifeStyleData.isPhoneCall,
      otherValue: data.result.memberStatDetail.isPhoneCall,
    },
    {
      index: 20,
      label: '청결 예민도',
      myValue:
        myData !== undefined
          ? sensitivityItems[myData.result.memberStatDetail.cleanSensitivity - 1]
          : sensitivityItems[sampleLifeStyleData.cleanSensitivity - 1],
      otherValue: sensitivityItems[data.result.memberStatDetail.cleanSensitivity - 1],
    },
    {
      index: 21,
      label: '소음 예민도',
      myValue:
        myData !== undefined
          ? sensitivityItems[myData.result.memberStatDetail.noiseSensitivity - 1]
          : sensitivityItems[sampleLifeStyleData.noiseSensitivity - 1],
      otherValue: sensitivityItems[data.result.memberStatDetail.noiseSensitivity - 1],
    },
    {
      index: 22,
      label: '청소빈도',
      myValue:
        myData !== undefined
          ? myData.result.memberStatDetail.cleaningFrequency
          : sampleLifeStyleData.cleaningFrequency,
      otherValue: data.result.memberStatDetail.cleaningFrequency,
    },
    {
      index: 23,
      label: '음주빈도',
      myValue:
        myData !== undefined
          ? myData.result.memberStatDetail.drinkingFrequency
          : sampleLifeStyleData.drinkingFrequency,
      otherValue: data.result.memberStatDetail.drinkingFrequency,
    },
    {
      index: 24,
      label: '성격',
      myValue:
        myData !== undefined
          ? myData.result.memberStatDetail.personality
          : sampleLifeStyleData.personality,
      otherValue: data.result.memberStatDetail.personality,
    },
    {
      index: 25,
      label: 'MBTI',
      myValue:
        myData !== undefined ? myData.result.memberStatDetail.mbti : sampleLifeStyleData.mbti,
      otherValue: data.result.memberStatDetail.mbti,
    },
  ];

  return (
    <View className="px-[20px] gap-y-[8px]">
      {!hasLifeStyle && (
        <Pressable
          onPress={() => router.push('/lifeStyle/onboarding')}
          className="bg-colorBox rounded-xl border border-disabledColor px-[16px] py-[12px] flex flex-row items-center justify-between"
        >
          <View className="flex flex-row items-center gap-x-[8px]">
            <MagnifierIcon />
            <Text className="text-12 font-600 leading-12 text-basicFont">
              아래 화면은 예시 데이터예요.{'\n'}라이프스타일 입력하고 표로 쉽게 비교해보세요!
            </Text>
          </View>
          <GrayArrowIcon />
        </Pressable>
      )}

      <View className="gap-y-[12px]">
        <View className="p-[16px] rounded-xl border border-strokeColor">
          {items.map((item, index) => (
            <InfoRow key={index} item={item} />
          ))}
        </View>
      </View>
    </View>
  );
};

export default TableInfoComponent;
