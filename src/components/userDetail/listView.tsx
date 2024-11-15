import React from 'react';
import { View, Text, Pressable } from 'react-native';

import { ListViewProps } from '@type/userDetail/userDetail';

const ListView: React.FC<ListViewProps> = ({ memberDetail, memberStatDetail, openModal }) => {
  const intensityMapping = [
    { index: 0, name: '안 틀어요' },
    { index: 1, name: '약하게 틀어요' },
    { index: 2, name: '적당하게 틀어요' },
    { index: 3, name: '강하게 틀어요' },
  ];

  const sensitivityMapping = [
    { index: 1, name: '매우 예민하지 않아요' },
    { index: 2, name: '예민하지 않아요' },
    { index: 3, name: '보통이에요' },
    { index: 4, name: '예민해요' },
    { index: 5, name: '매우 예민해요' },
  ];

  const basicInfo = {
    nickname: memberDetail.nickname,
    birthYear: memberDetail.birthday.slice(0, 4) + '년',
    universityName: memberDetail.universityName,
    admissionYear: memberStatDetail.admissionYear + '학번',
    majorName: memberDetail.majorName,
  };

  const dormInfo = {
    numOfRoommate: memberStatDetail.numOfRoommate + '인 1실',
    acceptance: memberStatDetail.acceptance,
  };

  const essentialInfo = {
    wakeUpTime: memberStatDetail.wakeUpMeridian + ' ' + memberStatDetail.wakeUpTime + '시',
    sleepingTime: memberStatDetail.sleepingMeridian + ' ' + memberStatDetail.sleepingTime + '시',
    turnOffTime: memberStatDetail.turnOffMeridian + ' ' + memberStatDetail.turnOffTime + '시',
    smoking: memberStatDetail.smoking,
    sleepingHabit: memberStatDetail.sleepingHabit,
    airConditioningIntensity: memberStatDetail.airConditioningIntensity,
    heatingIntensity: memberStatDetail.heatingIntensity,
    lifePattern: memberStatDetail.lifePattern,
    intimacy: memberStatDetail.intimacy,
    canShare: memberStatDetail.canShare,
    studying: memberStatDetail.studying,
    isPlayGame: memberStatDetail.isPlayGame,
    isPhoneCall: memberStatDetail.isPhoneCall,
    intake: memberStatDetail.intake,
    cleanSensitivity: memberStatDetail.cleanSensitivity,
    noiseSensitivity: memberStatDetail.noiseSensitivity,
    cleaningFrequency: memberStatDetail.cleaningFrequency,
    drinkingFrequency: memberStatDetail.drinkingFrequency,
    personality: memberStatDetail.personality,
    mbti: memberStatDetail.mbti,
  };

  const formatValue = (key: string, value: any) => {
    if (key === 'airConditioningIntensity' || key === 'heatingIntensity') {
      const intensity = intensityMapping.find((item) => item.index === value);
      return intensity ? intensity.name : value;
    } else if (key === 'cleanSensitivity' || key === 'noiseSensitivity') {
      const sensitivity = sensitivityMapping.find((item) => item.index === value);
      return sensitivity ? sensitivity.name : value;
    } else if (value === null) {
      return '-';
    }

    return value;
  };

  const renderInfo = (info: Record<string, any>, title: string) => {
    const labels: Record<string, string> = {
      nickname: '닉네임',
      birthYear: '출생년도',
      universityName: '학교',
      admissionYear: '학번',
      majorName: '학과',

      numOfRoommate: '인실',
      acceptance: '합격여부',

      wakeUpTime: '기상시간',
      sleepingTime: '취침시간',
      turnOffTime: '소등시간',
      smoking: '흡연여부',
      sleepingHabit: '잠버릇',
      airConditioningIntensity: '에어컨 강도',
      heatingIntensity: '히터 강도',
      lifePattern: '생활 패턴',
      intimacy: '친밀도',
      canShare: '물건공유',
      isPlayGame: '게임여부',
      isPhoneCall: '전화여부',
      studying: '공부여부',
      intake: '섭취여부',
      cleanSensitivity: '청결 예민도',
      noiseSensitivity: '소음 예민도',
      cleaningFrequency: '청소 빈도',
      drinkingFrequency: '음주 빈도',
      personality: '성격',
      mbti: 'MBTI',
    };

    const infoEntries = Object.entries(info);

    return (
      <View className={`mb-14 ${info === essentialInfo ? 'mb-0' : ''}`}>
        <Text className="mb-2 px-1 text-base font-semibold text-emphasizedFont">{title}</Text>
        <View className="rounded-xl border border-[#F1F2F4] p-4">
          {infoEntries.map(([key, value], index) => (
            <View
              key={key}
              className={`flex flex-row items-center py-3 ${index === 0 ? 'pt-0' : ''} ${
                index === infoEntries.length - 1 ? 'border-b-0 pb-0' : 'border-b border-b-[#f1f2f4]'
              }`}
            >
              <Text className="mr-3 font-medium text-colorFont">{labels[key]}</Text>
              <Text className="font-medium text-[#505059]">{formatValue(key, value)}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View className="mt-4 px-5 pb-[54px]">
      <View className="mb-14">
        {renderInfo(basicInfo, '기본정보')}
        {renderInfo(dormInfo, '기숙사 정보')}
        {renderInfo(essentialInfo, '필수정보')}
      </View>
      <View className="flex flex-col">
        <View className="flex flex-row items-center justify-between px-1">
          <Text className="mb-3 text-base font-semibold text-emphasizedFont">하고 싶은 말</Text>
          <Pressable onPress={openModal}>
            <Text className="text-xs font-medium text-disabledFont underline">신고하기</Text>
          </Pressable>
        </View>
        <View className="rounded-xl border border-[#F1F2F4] p-4">
          <Text className="text-sm font-medium text-basicFont">
            {memberStatDetail.selfIntroduction}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ListView;
