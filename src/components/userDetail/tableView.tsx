import React from 'react';
import { View, Text, ScrollView } from 'react-native';

interface ViewProps {
  userData: {
    basicInfo: {
      name: string;
      age: string;
      school: string;
      studentId: string;
      major: string;
    };
    dormitoryInfo: {
      type: string;
      passOrNot: string;
    };
    essentialInfo: {
      wakeUp: string;
      sleep: string;
      lightsOut: string;
      smoking: string;
      sleepHabit: string;
      temperament: string;
      pattern: string;
      intimacy: string;
      sharing: string;
      game: string;
      call: string;
      study: string;
      cleanliness: string;
      noise: string;
      cleaning: string;
      personality: string;
      mbti: string;
    };
    additionalInfo: {
      must: string[];
      can: string[];
      never: string[];
    };
  };
  otherUserData: {
    basicInfo: {
      name: string;
      age: string;
      school: string;
      studentId: string;
      major: string;
    };
    dormitoryInfo: {
      type: string;
      passOrNot: string;
    };
    essentialInfo: {
      wakeUp: string;
      sleep: string;
      lightsOut: string;
      smoking: string;
      sleepHabit: string;
      temperament: string;
      pattern: string;
      intimacy: string;
      sharing: string;
      game: string;
      call: string;
      study: string;
      cleanliness: string;
      noise: string;
      cleaning: string;
      personality: string;
      mbti: string;
    };
    additionalInfo: {
      must: string[];
      can: string[];
      never: string[];
    };
  };
}

const TableView: React.FC<ViewProps> = ({ userData, otherUserData }) => {
  const truncateString = (str: string) => {
    return str.length > 7 ? `${str.slice(0, 7)}...` : str;
  };

  const renderInfo = (my: Record<string, string>, other: Record<string, string>, title: string) => {
    const labels: Record<string, string> = {
      name: '이름',
      age: '출생년도',
      school: '학교',
      studentId: '학번',
      major: '학과',
      type: '인실',
      passOrNot: '합격여부',
      wakeUp: '기상시간',
      sleep: '취침시간',
      lightsOut: '소등시간',
      smoking: '흡연여부',
      sleepHabit: '잠버릇',
      temperament: '더위, 추위',
      pattern: '생활 패턴',
      intimacy: '친밀도',
      sharing: '물건공유',
      study: '공부여부',
      game: '게임여부',
      call: '전화여부',
      cleanliness: '청결 예민도',
      noise: '소음 예민도',
      cleaning: '청소 빈도',
      personality: '성격',
      mbti: 'MBTI',
    };

    const keys = Object.keys(labels);

    return (
      <View className="w-full leading-loose">
        {keys.map((key, index) =>
          key in my && key in other ? (
            <View
              key={key}
              className={`flex flex-row items-center justify-between w-full py-3 ${
                index === 0 ? 'pt-0' : ''
              } ${
                index === keys.length - 1 ? 'pb-0 border-b-0' : 'border-b-[1px] border-b-[#f1f2f4]'
              }`}
            >
              <Text className="flex items-center font-medium text-colorFont">{labels[key]}</Text>
              <View className="flex flex-row w-[70%] justify-around items-center">
                <Text
                  className={`font-medium tracking-tight ${
                    key !== 'name' && my[key] !== other[key] ? 'text-[#F7473B]' : 'text-[#505059]'
                  }`}
                  style={{ maxWidth: '46%', textAlign: 'center' }}
                >
                  {truncateString(my[key])}
                </Text>
                <Text
                  className={`font-medium tracking-tight ${
                    key !== 'name' && my[key] !== other[key] ? 'text-[#F7473B]' : 'text-[#505059]'
                  }`}
                  style={{ maxWidth: '46%', textAlign: 'center' }}
                >
                  {truncateString(other[key])}
                </Text>
              </View>
            </View>
          ) : null,
        )}
      </View>
    );
  };

  return (
    <ScrollView>
      <View className="flex-1 px-5">
        <View className="flex mt-4 mb-[7px] border-[1px] p-4 rounded-xl border-[#f1f2f4]">
          {renderInfo(userData.basicInfo, otherUserData.basicInfo, '기본정보')}
          {renderInfo(userData.dormitoryInfo, otherUserData.dormitoryInfo, '기숙사 정보')}
          {renderInfo(userData.essentialInfo, otherUserData.essentialInfo, '필수 정보')}
        </View>
      </View>
    </ScrollView>
  );
};

export default TableView;
