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

    return (
      <View className="leading-loose">
        {Object.keys(labels).map(
          (key) =>
            key in my &&
            key in other && (
              <View key={key} className="flex-row items-center my-3">
                <Text className="mr-3 font-medium text-colorFont">{labels[key]}</Text>
                <View className="flex-row justify-between">
                  <Text
                    className={`font-medium ${
                      my[key] !== other[key] ? 'text-[#F7473B]' : 'text-[#505059]'
                    }`}
                  >
                    {my[key]}
                  </Text>
                  <Text
                    className={`font-medium ${
                      my[key] !== other[key] ? 'text-[#F7473B]' : 'text-[#505059]'
                    }`}
                  >
                    {other[key]}
                  </Text>
                </View>
              </View>
            ),
        )}
      </View>
    );
  };

  return (
    <ScrollView>
      <View className="flex-1 px-5">
        <View className="mt-[67px] mb-[7px]">
          {renderInfo(userData.basicInfo, otherUserData.basicInfo, '기본정보')}
          {renderInfo(userData.dormitoryInfo, otherUserData.dormitoryInfo, '기숙사 정보')}
          {renderInfo(userData.essentialInfo, otherUserData.essentialInfo, '필수 정보')}
        </View>
      </View>
    </ScrollView>
  );
};

export default TableView;
