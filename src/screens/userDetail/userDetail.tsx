import React, { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';

import { UserDetailScreenProps } from '@type/param/loginStack';

import ListView from '@components/userDetail/listView';
import TableView from '@components/userDetail/tableView';

import Background from '@assets/userDetail/background.svg';

import BackButton from '@assets/backButton.svg';
import MessageIcon from '@assets/message.svg';
import HeartIcon from '@assets/heart.svg';

import CharacterImage from '@assets/character.svg';
import SelectedListIcon from '@assets/userDetail/coloredListIcon.svg';
import SelectedTableIcon from '@assets/userDetail/coloredTableIcon.svg';
import NotSelectedListIcon from '@assets/userDetail/listIcon.svg';
import NotSelectedTableIcon from '@assets/userDetail/tableIcon.svg';

const UserDetailScreen = ({ navigation }: UserDetailScreenProps) => {
  const [type, setType] = useState<string>('list');
  const [userData, setUserData] = useState({
    basicInfo: {
      name: '오정현',
      age: '2002년',
      school: '인하대학교',
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

  const [otherUserData, setOtherUserData] = useState({
    basicInfo: {
      name: '양유진',
      age: '2002년',
      school: '인하대학교',
      studentId: '21학번',
      major: '정보통신공학과',
    },
    dormitoryInfo: {
      type: '3인 1실',
      passOrNot: '합격',
    },
    essentialInfo: {
      wakeUp: '오전 7시',
      sleep: '오전 3시',
      lightsOut: '오전 4시',
      smoking: 'X',
      sleepHabit: 'X',
      temperament: '추위를 많이 타요',
      pattern: '새벽형 인간',
      intimacy: '어느정도 친하게 지내요',
      sharing: 'X',
      game: 'X',
      call: 'X',
      study: 'O',
      cleanliness: '5',
      noise: '8',
      cleaning: '매일매일 해요!',
      personality: '조용한걸 좋아해요!',
      mbti: 'ISFJ',
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
    {
      index: 1,
      name: '리스트로 보기',
      value: 'list',
      select: true,
      selected: SelectedListIcon,
      notSelected: NotSelectedListIcon,
    },
    {
      index: 2,
      name: '표로 보기',
      value: 'table',
      select: false,
      selected: SelectedTableIcon,
      notSelected: NotSelectedTableIcon,
    },
  ];

  const handleList = () => {
    setType('list');
  };

  const handleTable = () => {
    setType('table');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#CADFFF]">
      <Background style={{ position: 'absolute' }} />
      <View className="flex-row justify-between flex-1 px-5">
        <Pressable>
          <BackButton />
        </Pressable>
        <View className="flex-row">
          <Pressable>
            <MessageIcon />
          </Pressable>
          <Pressable>
            <HeartIcon />
          </Pressable>
        </View>
      </View>
      <View className="items-center">
        <View className="mb-[48px]">
          <CharacterImage />
          <View className="items-center px-6 py-3 rounded-[64px] bg-main">
            <Pressable>
              <Text className="text-xs font-semibold text-white">룸메이트 요청하기</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <ScrollView>
        <View className="bg-white pt-5 rounded-t-[20px]">
          <View className="flex-row justify-between">
            {typeItems.map((item) => (
              <View className="items-center flex-1 p-4">
                <Pressable
                  key={item.index}
                  onPress={item.value === 'list' ? handleList : handleTable}
                >
                  <View className="mb-[6px]">
                    {item.value === type ? <item.selected /> : <item.notSelected />}
                  </View>
                  <Text
                    className={`${
                      item.value === type
                        ? 'text-main font-semibold'
                        : 'text-disabledFont font-medium'
                    }`}
                  >
                    {item.name}
                  </Text>
                </Pressable>
              </View>
            ))}
          </View>

          {type === 'list' && (
            <View>
              <ListView userData={userData} />
            </View>
          )}

          {type === 'table' && (
            <View>
              <TableView userData={userData} otherUserData={otherUserData} />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserDetailScreen;
