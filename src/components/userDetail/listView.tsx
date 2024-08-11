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
}

const ListView: React.FC<ViewProps> = ({ userData }) => {
  const renderInfo = (info: Record<string, string>, title: string) => {
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

    const entries = Object.entries(info);

    return (
      <View className="mb-6 leading-loose">
        <Text className="text-lg font-semibold text-[#444955] tracking-tight px-1 mb-3">
          {title}
        </Text>
        <View className="p-4 border-[1px] border-[#F1F2F4] rounded-xl">
          {entries.map(([key, value], index) => (
            <View
              key={key}
              className={`flex-row items-center py-3 ${index === 0 ? 'pt-0' : ''} ${
                index === entries.length - 1
                  ? 'border-b-0 pb-0'
                  : 'border-b-[1px] border-b-[#f1f2f4]'
              }`}
            >
              <Text className="mr-3 font-medium text-colorFont">{labels[key] || key}</Text>
              <Text className="text-[#505059] font-medium">{value}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <ScrollView className="px-5 mt-4">
      {renderInfo(userData.basicInfo, '기본정보')}
      {renderInfo(userData.dormitoryInfo, '기숙사 정보')}
      {renderInfo(userData.essentialInfo, '필수 정보')}
    </ScrollView>
  );
};

export default ListView;
