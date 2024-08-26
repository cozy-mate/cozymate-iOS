import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';

import { ListViewProps } from '@type/userDetail/userDetail';

const ListView: React.FC<ListViewProps> = ({ userBasicData, userData }) => {
  const intensityMapping = [
    { index: 0, name: '아예 틀지 않아요' },
    { index: 1, name: '약하게 틀어요' },
    { index: 2, name: '적당하게 틀어요' },
    { index: 3, name: '세게 틀어요' },
  ];

  const sensitivityMapping = [
    { index: 1, name: '매우 예민하지 않아요' },
    { index: 2, name: '예민하지 않아요' },
    { index: 3, name: '보통이에요' },
    { index: 4, name: '예민해요' },
    { index: 5, name: '매우 예민해요' },
  ];

  const formatValue = (key: string, value: any) => {
    if (key === 'birthYear') {
      return `${value}년`;
    } else if (key === 'isPlayGame' || key === 'isPhoneCall' || key === 'canShare') {
      return value ? 'O' : 'X';
    } else if (key === 'numOfRoommate') {
      return `${value}인 1실`;
    } else if (key === 'wakeUpTime') {
      return `${userData.wakeUpMeridian} ${value}시`;
    } else if (key === 'sleepingTime') {
      return `${userData.sleepingMeridian} ${value}시`;
    } else if (key === 'turnOffTime') {
      return `${userData.turnOffMeridian} ${value}시`;
    } else if (key === 'airConditioningIntensity' || key === 'heatingIntensity') {
      const intensity = intensityMapping.find((item) => item.index === value);
      return intensity ? intensity.name : value;
    } else if (key === 'cleanSensitivity' || key === 'noiseSensitivity') {
      const sensitivity = sensitivityMapping.find((item) => item.index === value);
      return sensitivity ? sensitivity.name : value;
    }
    return value;
  };

  const renderInfo = (info: Record<string, any>, title: string) => {
    const labels: Record<string, string> = {
      memberName: '이름',
      birthYear: '출생년도',
      universityId: '학교',
      admissionYear: '학번',
      major: '학과',
      numOfRoommate: '인실',
      acceptance: '합격여부',
      wakeUpTime: '기상시간',
      sleepingTime: '취침시간',
      turnOffTime: '소등시간',
      smokingState: '흡연여부',
      sleepingHabit: '잠버릇',
      airConditioningIntensity: '에어컨 강도',
      heatingIntensity: '히터 강도',
      lifePattern: '생활 패턴',
      intimacy: '친밀도',
      canShare: '물건공유',
      studying: '공부여부',
      isPlayGame: '게임여부',
      isPhoneCall: '전화여부',
      intake: '섭취여부',
      cleanSensitivity: '청결 예민도',
      noiseSensitivity: '소음 예민도',
      cleaningFrequency: '청소 빈도',
      personality: '성격',
      mbti: 'MBTI',
    };

    const infoEntries = Object.entries(info);

    return (
      <View className={`mb-14 ${info == essentialInfo && 'mb-0'}`}>
        <Text className="mb-2 text-base font-semibold text-[#444955] px-1">{title}</Text>
        <View className="p-4 border-[1px] border-[#F1F2F4] rounded-xl">
          {infoEntries.map(([key, value], index) =>
            value ? (
              <View
                key={key}
                className={`flex flex-row items-center py-3 ${index === 0 ? 'pt-0' : ''} ${
                  index === infoEntries.length - 1
                    ? 'border-b-0 pb-0'
                    : 'border-b-[1px] border-b-[#f1f2f4]'
                }`}
              >
                <Text className="mr-3 font-medium text-colorFont">{labels[key]}</Text>
                <Text className="text-[#505059] font-medium">{formatValue(key, value)}</Text>
              </View>
            ) : null,
          )}
        </View>
      </View>
    );
  };

  const basicInfo = {
    memberName: userBasicData.memberName,
    birthYear: userData.birthYear,
    universityId: userData.universityId,
    admissionYear: userData.admissionYear,
    major: userData.major,
  };

  const dormInfo = {
    numOfRoommate: userData.numOfRoommate,
    acceptance: userData.acceptance,
  };

  const essentialInfo = {
    wakeUpTime: userData.wakeUpTime,
    sleepingTime: userData.sleepingTime,
    turnOffTime: userData.turnOffTime,
    smokingState: userData.smokingState,
    sleepingHabit: userData.sleepingHabit,
    airConditioningIntensity: userData.airConditioningIntensity,
    heatingIntensity: userData.heatingIntensity,
    lifePattern: userData.lifePattern,
    intimacy: userData.intimacy,
    canShare: userData.canShare,
    studying: userData.studying,
    isPlayGame: userData.isPlayGame,
    isPhoneCall: userData.isPhoneCall,
    intake: userData.intake,
    cleanSensitivity: userData.cleanSensitivity,
    noiseSensitivity: userData.noiseSensitivity,
    cleaningFrequency: userData.cleaningFrequency,
    personality: userData.personality,
    mbti: userData.mbti,
  };

  return (
    <View className="px-5 mt-4 pb-[60px]">
      {renderInfo(basicInfo, '기본정보')}
      {renderInfo(dormInfo, '기숙사 정보')}
      {renderInfo(essentialInfo, '필수정보')}
    </View>
  );
};

export default ListView;
