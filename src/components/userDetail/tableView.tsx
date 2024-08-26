import React from 'react';
import { View, Text } from 'react-native';

import { TableViewProps } from '@type/userDetail/userDetail';

const TableView: React.FC<TableViewProps> = ({ userData, otherUserData }) => {
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

  const truncateString = (str: string) => {
    return str.length > 7 ? `${str.slice(0, 7)}...` : str;
  };

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

  const renderInfo = (my: Record<string, any>, other: Record<string, any>) => {
    const labels: Record<string, string> = {
      name: '이름', // From userBasicData
      memberName: '이름', // From otherUserBasicData
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

    const keys = Object.keys(labels).filter((key) => key in my || key in other);

    return (
      <View className="flex mt-4 mb-[7px] border-[1px] p-4 rounded-xl border-[#f1f2f4]">
        <View className="w-full leading-loose">
          {keys.map((key, index) =>
            key in my && key in other ? (
              <View
                key={key}
                className={`flex flex-row items-center justify-between w-full py-3 ${
                  index === 0 ? 'pt-0' : ''
                } ${
                  index === keys.length - 1
                    ? 'pb-0 border-b-0'
                    : 'border-b-[1px] border-b-[#f1f2f4]'
                }`}
              >
                <Text className="flex items-center font-medium text-colorFont">{labels[key]}</Text>
                <View className="flex flex-row w-[75%] justify-center items-center">
                  <Text
                    className={`font-medium tracking-tight ${
                      key !== 'name' && key !== 'memberName' && my[key] !== other[key]
                        ? 'text-[#F7473B]'
                        : 'text-[#505059]'
                    }`}
                    style={{ width: '50%', textAlign: 'center' }}
                  >
                    {truncateString(formatValue(key, my[key]))}
                  </Text>
                  <Text
                    className={`font-medium tracking-tight ${
                      key !== 'name' && key !== 'memberName' && my[key] !== other[key]
                        ? 'text-[#F7473B]'
                        : 'text-[#505059]'
                    }`}
                    style={{ width: '50%', textAlign: 'center' }}
                  >
                    {truncateString(formatValue(key, other[key]))}
                  </Text>
                </View>
              </View>
            ) : null,
          )}
        </View>
      </View>
    );
  };

  return <View className="px-5 mt-4 pb-[54px]">{renderInfo(userData, otherUserData)}</View>;
};

export default TableView;
