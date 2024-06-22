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
    return (
      <View className="mb-6 leading-loose">
        <Text className="text-lg font-semibold text-[#46464B] tracking-tight">{title}</Text>
        {Object.entries(info).map(([key, value]) => (
          <View key={key}>
            <Text>{`${key}: ${value}`}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView>
      <View className="flex-1 px-5">
        <Text>지금 테이블임</Text>
        <View className="mt-[67px] mb-[7px]">
          {renderInfo(userData.basicInfo, '기본정보')}
          {renderInfo(userData.dormitoryInfo, '기숙사 정보')}
          {renderInfo(userData.essentialInfo, '필수 정보')}
        </View>
      </View>
    </ScrollView>
  );
};

export default ListView;
