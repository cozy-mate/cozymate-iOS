import React, { useState } from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';

import { UserDetailScreenProps } from '@type/param/stack';

import CharacterImage from '@assets/character.svg';
import ListView from '@components/userDetail/listView';
import TableView from '@components/userDetail/tableView';

const UserDetailScreen = ({ navigation }: UserDetailScreenProps) => {
  const [type, setType] = useState<string>('list');
  const [userData, setUserData] = useState({
    basicInfo: {
      name: '오정현',
      age: '2002년',
      school: '인하대학교 (인증완료)',
      studentId: '21학번',
      major: '문화콘텐츠문화경영학과',
    },
    dormitoryInfo: {
      type: '3인 1실',
      passOrNot: '대기중',
    },
    essentialInfo: {
      wakeUp: '오전 8시',
      sleep: '오전 2시',
      lightsOut: '오전 2시',
      smoking: 'X',
      sleepHabit: 'X',
      temperament: '추위를 많이 타요',
      pattern: '새벽형 인간',
      intimacy: '필요한 말만 했으면 좋겠어요',
      sharing: 'X',
      game: 'X',
      call: 'X',
      study: 'X',
      cleanliness: '8',
      noise: '10',
      cleaning: '일주일에 3-4번은 하는 거 같아요!',
      personality: '조용한걸 좋아해요!',
      mbti: 'INFP',
    },
    additionalInfo: {
      must: [
        '각자 할 일만 하고 친목은 안 하고싶어요',
        '음식물 섭취는 되도록 밖에서 해줬으면 좋겠어요',
      ],
      can: ['에어컨, 히터는 마음대로 하셔도 돼요', '흡연여부는 딱히 상관없어요'],
      never: ['친구 데려오기 절대 금지'],
    },
  });

  const typeItems = [
    { index: 1, name: '리스트로 보기', value: 'list', select: true },
    { index: 2, name: '표로 보기', value: 'table', select: false },
  ];

  const handleList = () => {
    setType('list');
  };

  const handleTable = () => {
    setType('table');
  };

  return (
    <SafeAreaView className="flex-1 bg-white ">
      <View className="items-center bg-[#F1F5FF]">
        <View>
          <CharacterImage />
          <View className="items-center px-9 py-[10px] rounded-[64px] bg-white opacity-50">
            <Pressable>
              <Text className="text-colorFont text-[10px] font-semibold">캐릭터 선택하기</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View>
        <View>
          {typeItems.map((item) => (
            <Pressable key={item.index} onPress={item.value === 'list' ? handleList : handleTable}>
              <Text>{item.name}</Text>
            </Pressable>
          ))}
        </View>

        {type === 'list' && (
          <View>
            <ListView userData={userData} />
          </View>
        )}

        {type === 'table' && (
          <View>
            <TableView userData={userData} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default UserDetailScreen;
