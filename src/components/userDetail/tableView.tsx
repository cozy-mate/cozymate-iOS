import React from 'react';
import { View, Text, Pressable } from 'react-native';

import { useHasLifeStyleStore } from '@zustand/member-stat/member-stat';

import { TableViewProps } from '@type/userDetail/userDetail';

const TableView: React.FC<TableViewProps> = ({ userData, otherUserData, openModal }) => {
  const { hasLifeStyle } = useHasLifeStyleStore();

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

  const truncateString = (str: string) => {
    return str.length > 7 ? `${str.slice(0, 7)}...` : str;
  };

  const formatValue = (key: string, value: any) => {
    if (key === 'birthday') {
      return value.slice(0, 4) + '년';
    } else if (key === 'numOfRoommate') {
      return `${value}인 1실`;
    } else if (key === 'wakeUpTime') {
      return `${userData.memberStatDetail.wakeUpMeridian} ${value}시`;
    } else if (key === 'sleepingTime') {
      return `${userData.memberStatDetail.sleepingMeridian} ${value}시`;
    } else if (key === 'turnOffTime') {
      return `${userData.memberStatDetail.turnOffMeridian} ${value}시`;
    } else if (key === 'airConditioningIntensity' || key === 'heatingIntensity') {
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

  const renderInfo = (my: Record<string, any>, other: Record<string, any>) => {
    const labels: Record<string, string> = {
      nickname: '닉네임',
      birthday: '출생년도',
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

    const keys = Object.keys(labels).filter((key) => key in my || key in other);

    return (
      <View className="mb-[7px] mt-4 flex rounded-xl border border-[#f1f2f4] p-4">
        <View className="w-full leading-loose">
          {keys.map((key, index) =>
            key in my && key in other ? (
              <View
                key={key}
                className={`flex w-full flex-row items-center justify-between py-3 ${
                  index === 0 ? 'pt-0' : ''
                } ${index === keys.length - 1 ? 'border-b-0 pb-0' : 'border-b border-b-[#f1f2f4]'}`}
              >
                <Text className="flex items-center font-medium text-colorFont">{labels[key]}</Text>
                <View className="flex w-[75%] flex-row items-center justify-center">
                  <View className="w-1/2">
                    <Text
                      className={`text-center font-medium tracking-tight ${
                        key !== 'nickname' &&
                        key !== 'nickname' &&
                        my[key] !== other[key] &&
                        (hasLifeStyle ? 'text-[#F7473B]' : 'text-[#505059]')
                      }`}
                    >
                      {truncateString(formatValue(key, my[key]))}
                    </Text>
                  </View>

                  <View className="w-1/2">
                    <Text
                      className={`text-center font-medium tracking-tight ${
                        key !== 'nickname' &&
                        key !== 'nickname' &&
                        my[key] !== other[key] &&
                        (hasLifeStyle ? 'text-[#F7473B]' : 'text-[#505059]')
                      }`}
                    >
                      {truncateString(formatValue(key, other[key]))}
                    </Text>
                  </View>
                </View>
              </View>
            ) : null,
          )}
        </View>
      </View>
    );
  };

  return (
    <View className="mt-4 px-5 pb-[54px]">
      <View className="mb-14">
        {renderInfo(userData.memberDetail, otherUserData.memberDetail)}
        {renderInfo(userData.memberStatDetail, otherUserData.memberStatDetail)}
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
            {otherUserData.memberStatDetail.selfIntroduction}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TableView;
