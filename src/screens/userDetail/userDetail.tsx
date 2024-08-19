import React, { useCallback, useState } from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';

import { UserDetailScreenProps } from '@type/param/loginStack';

import ListView from '@components/userDetail/listView';
import TableView from '@components/userDetail/tableView';

import Background from '@assets/userDetail/background.svg';

import BackButton from '@assets/backButton.svg';
import MessageIcon from '@assets/message.svg';
import HeartIcon from '@assets/heart.svg';

import CharacterImage from '@assets/userDetail/character.svg';

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

  const toBack = () => {
    navigation.goBack();
  };

  const handleList = useCallback(() => {
    setType('list');
  }, []);

  const handleTable = useCallback(() => {
    setType('table');
  }, []);

  return (
    <SafeAreaView className="flex-1 flex bg-[#CADFFF]">
      <Background style={{ position: 'absolute' }} />
      <View className="flex flex-col">
        {/* 상단 헤더 */}
        <View className="flex flex-row justify-between px-5 mt-2 mb-[15px]">
          <Pressable onPress={toBack}>
            <BackButton />
          </Pressable>
          <View className="flex flex-row">
            <Pressable>
              <MessageIcon />
            </Pressable>
            <Pressable>
              <HeartIcon />
            </Pressable>
          </View>
        </View>

        <View className="flex flex-row items-center mb-[22px] px-[25px]">
          <CharacterImage />
          <View className="flex flex-col ml-2">
            <Text className="mb-1 text-base font-semibold leading-5 text-emphasizedFont">
              {otherUserData.basicInfo.name}
            </Text>
            <Text className="text-sm font-medium text-basicFont">나와의 일치율 99%</Text>
          </View>
        </View>

        <View className="flex flex-col bg-white pt-3 rounded-t-[20px]">
          <View className="flex flex-row items-center justify-center">
            {/* 리스트로 보기 */}
            <Pressable
              onPress={handleList}
              className="flex flex-row items-center justify-center p-4"
            >
              <View className="flex">
                {type === 'list' ? <SelectedListIcon /> : <NotSelectedListIcon />}
              </View>
              <Text
                className={`text-sm ml-1.5 ${
                  type === 'list' ? 'text-main1 font-semibold' : 'text-disabledFont font-medium'
                }`}
              >
                리스트로 보기
              </Text>
            </Pressable>

            <View className="bg-disabled w-[1px] h-6 mx-[18px]" />

            {/* 표로 보기 */}
            <Pressable
              onPress={handleTable}
              className="flex flex-row items-center justify-center p-4"
            >
              <View className="flex">
                {type === 'table' ? <SelectedTableIcon /> : <NotSelectedTableIcon />}
              </View>
              <Text
                className={`text-sm ml-1.5 ${
                  type === 'table' ? 'text-main1 font-semibold' : 'text-disabledFont font-medium'
                }`}
              >
                표로 보기
              </Text>
            </Pressable>
          </View>

          {type === 'list' && <ListView userData={userData} />}
          {type === 'table' && <TableView userData={userData} otherUserData={otherUserData} />}

          <Pressable className="fixed z-10 w-full px-5 py-2 pb-4 bg-white bottom-8">
            <View className="items-center py-4 rounded-xl bg-main1">
              <Text className="text-white">코지메이트 요청</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserDetailScreen;
