import React, { useState } from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { RoomMateScreenProps } from '@type/param/stack';
import CheckBoxContainer from '@components/roomMate/checkBoxContainer';

import SchoolLogo from '@assets/roomMate/schoolLogo.svg';
import MagnifierIcon from '@assets/roomMate/magnifier.svg';

import Example1 from '@assets/roomMate/example/1.svg';
import Example2 from '@assets/roomMate/example/2.svg';
import Example3 from '@assets/roomMate/example/3.svg';
import Example4 from '@assets/roomMate/example/4.svg';
import SameAnswerContainer from '@components/roomMate/sameAnswerContainer';
import SimilarLifeStyleContainer from '@components/roomMate/similarLifeStyleContainer';

const RoomMateScreen = ({ navigation }: RoomMateScreenProps) => {
  const [value, setValue] = useState<string[]>([]);

  const [items, setItems] = useState([
    { index: 1, id: 'pattern', name: '생활패턴', select: false },
    { index: 2, id: 'age', name: '나이', select: false },
    { index: 3, id: 'id', name: '학번', select: false },
    { index: 4, id: 'major', name: '학과', select: false },
    { index: 5, id: 'type', name: '신청실', select: false },
    { index: 6, id: 'pattern', name: '합격여부', select: false },
    { index: 7, id: 'pattern', name: '기상시간', select: false },
    { index: 8, id: 'pattern', name: '취침시간', select: false },
    { index: 9, id: 'pattern', name: '소등시간', select: false },
    { index: 10, id: 'pattern', name: '흡연여부', select: false },
    { index: 11, id: 'pattern', name: '잠버릇', select: false },
    { index: 12, id: 'pattern', name: '냉난방', select: false },
    { index: 13, id: 'pattern', name: '물건공유', select: false },
    { index: 14, id: 'pattern', name: '공부여부', select: false },
    { index: 15, id: 'pattern', name: '게임여부', select: false },
    { index: 16, id: 'pattern', name: '전화여부', select: false },
    { index: 17, id: 'pattern', name: '청결예민도', select: false },
    { index: 18, id: 'pattern', name: '소음예민도', select: false },
    { index: 19, id: 'pattern', name: '청소빈도', select: false },
    { index: 20, id: 'pattern', name: '성격', select: false },
    { index: 21, id: 'pattern', name: 'MBTI', select: false },
  ]);
  const [originalItems, setOriginalItems] = useState([...items]);

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
      <ScrollView>
        <View className="flex-row h-[132px] px-4 justify-between items-center pt-[65px] mb-[26px] bg-[#CADFFF] rounded-br-[40px]">
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

        <View className="mb-6 h-[197px]">
          <CheckBoxContainer
            value={value}
            setValue={setValue}
            items={items}
            setItems={setItems}
            originalItems={originalItems}
          />
        </View>

        <View className="h-[372px]">
          <SameAnswerContainer users={users} setUsers={setUsers} />
        </View>

        <View className="h-[214px]">
          <SimilarLifeStyleContainer users={users} setUsers={setUsers} />
        </View>
      </ScrollView>
    </View>
  );
};

export default RoomMateScreen;
