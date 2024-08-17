import React, { useState } from 'react';
import { Pressable, Text, View, ScrollView } from 'react-native';

import { RoomMateScreenProps } from '@type/param/loginStack';
import CheckBoxContainer from '@components/roomMate/checkBoxContainer';

import Background from '@assets/roomMate/background.svg';

import SchoolLogo from '@assets/roomMate/schoolLogo.svg';
import MagnifierIcon from '@assets/roomMate/magnifier.svg';

import Example1 from '@assets/roomMate/example/1.svg';
import Example2 from '@assets/roomMate/example/2.svg';
import Example3 from '@assets/roomMate/example/3.svg';
import Example4 from '@assets/roomMate/example/4.svg';
import SameAnswerContainer from '@components/roomMate/sameAnswerContainer';
import SimilarLifeStyleContainer from '@components/roomMate/similarLifeStyleContainer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const RoomMateScreen = ({ navigation }: RoomMateScreenProps) => {
  const [value, setValue] = useState<string[]>([]);

  const [items, setItems] = useState([
    { index: 1, id: '출생년도', name: '출생년도', select: false },
    { index: 2, id: '학번', name: '학번', select: false },
    { index: 3, id: '학과', name: '학과', select: false },
    { index: 4, id: '신청실', name: '신청실', select: false },
    { index: 5, id: '합격여부', name: '합격여부', select: false },
    { index: 6, id: '기상시간', name: '기상시간', select: false },
    { index: 7, id: '취침시간', name: '취침시간', select: false },
    { index: 8, id: '소등시간', name: '소등시간', select: false },
    { index: 9, id: '흡연여부', name: '흡연여부', select: false },
    { index: 10, id: '잠버릇', name: '잠버릇', select: false },
    { index: 11, id: '체질', name: '체질', select: false },
    { index: 12, id: '생활패턴', name: '생활패턴', select: false },
    { index: 13, id: '물건공유', name: '물건공유', select: false },
    { index: 14, id: '공부여부', name: '공부여부', select: false },
    { index: 15, id: '게임여부', name: '게임여부', select: false },
    { index: 16, id: '전화여부', name: '전화여부', select: false },
    { index: 17, id: '청결예민도', name: '청결예민도', select: false },
    { index: 18, id: '소음예민도', name: '소음예민도', select: false },
    { index: 19, id: '청소빈도', name: '청소빈도', select: false },
    { index: 20, id: '성격', name: '성격', select: false },
    { index: 21, id: 'MBTI', name: 'MBTI', select: false },
  ]);
  const [originalItems, setOriginalItems] = useState([...items]);

  const toUserDetail = () => {
    navigation.navigate('UserDetailScreen');
  };

  const [users, setUsers] = useState([
    {
      image: Example1,
      index: 1,
      age: 21,
      type: '2인 1실',
      name: '배이',
      percent: 75,
    },
    {
      image: Example2,
      index: 2,
      age: 23,
      type: '2인 1실',
      name: '지우',
      percent: 51,
    },
    {
      image: Example3,
      index: 3,
      age: 25,
      type: '4인 1실',
      name: '규진',
      percent: 48,
    },
    {
      image: Example4,
      index: 4,
      age: 21,
      type: '4인 1실',
      name: '해원',
      percent: 31,
    },
  ]);

  return (
    <View className="flex-1 bg-[#F7FAFF]">
      <ScrollView className="flex-1">
        <View className="flex-row h-[132px] px-4 justify-between items-center pt-[65px] mb-6 bg-[#CADFFF] rounded-br-[40px]">
          <Background style={{ position: 'absolute' }} />
          <Pressable>
            <View className="flex-row items-center py-2">
              <SchoolLogo />
              <Text className="text-lg font-semibold text-[#5B9CFF] ml-[6px]">인하대학교</Text>
            </View>
          </Pressable>
          <Pressable>
            <MagnifierIcon />
          </Pressable>
        </View>

        <View className="mb-6">
          <CheckBoxContainer
            value={value}
            setValue={setValue}
            items={items}
            setItems={setItems}
            originalItems={originalItems}
          />
        </View>

        <View className="flex drop-shadow-topShadow">
          <SameAnswerContainer users={users} setUsers={setUsers} toUserDetail={toUserDetail} />
          <SimilarLifeStyleContainer users={users} setUsers={setUsers} />
        </View>
      </ScrollView>
    </View>
  );
};

export default RoomMateScreen;
