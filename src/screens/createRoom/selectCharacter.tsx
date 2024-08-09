import React, { useState } from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';

import { SelectCharacterScreenProps } from '@type/param/loginStack';

import { useRecoilState } from 'recoil';
import { RoomInfo, SignUp } from '@recoil/type';
import { createRoomState, signUpState } from '@recoil/recoil';

import CustomRadioBoxComponent from '@components/customRadioBox';

import first from '@assets/characterItem/1.svg';
import second from '@assets/characterItem/2.svg';
import third from '@assets/characterItem/3.svg';
import fourth from '@assets/characterItem/4.svg';
import fifth from '@assets/characterItem/5.svg';
import sixth from '@assets/characterItem/6.svg';
import seventh from '@assets/characterItem/7.svg';
import eighth from '@assets/characterItem/8.svg';
import ninth from '@assets/characterItem/9.svg';
import tenth from '@assets/characterItem/10.svg';
import eleventh from '@assets/characterItem/11.svg';
import twelfth from '@assets/characterItem/12.svg';
import thirteenth from '@assets/characterItem/13.svg';
import fourteenth from '@assets/characterItem/14.svg';
import fifteenth from '@assets/characterItem/15.svg';
import sixteenth from '@assets/characterItem/16.svg';

interface Character {
  index: number;
  item: number;
  select: boolean;
  icon: React.FC;
}

const SelectCharacterScreen = ({ navigation }: SelectCharacterScreenProps) => {
  const [createroomState, setCreateroomState] = useRecoilState(createRoomState);

  const [profileImage, setProfileImage] = useState<number>(0);

  const isComplete = profileImage !== 0;

  const [items, setItems] = useState<Character[]>([
    {
      index: 1,
      item: 1,
      select: false,
      icon: first,
    },
    {
      index: 2,
      item: 2,
      select: false,
      icon: second,
    },
    {
      index: 3,
      item: 3,
      select: false,
      icon: third,
    },
    {
      index: 4,
      item: 4,
      select: false,
      icon: fourth,
    },

    {
      index: 5,
      item: 5,
      select: false,
      icon: fifth,
    },
    {
      index: 6,
      item: 6,
      select: false,
      icon: sixth,
    },
    {
      index: 7,
      item: 7,
      select: false,
      icon: seventh,
    },
    {
      index: 8,
      item: 8,
      select: false,
      icon: eighth,
    },

    {
      index: 9,
      item: 9,
      select: false,
      icon: ninth,
    },
    {
      index: 10,
      item: 10,
      select: false,
      icon: tenth,
    },
    {
      index: 11,
      item: 11,
      select: false,
      icon: eleventh,
    },
    {
      index: 12,
      item: 12,
      select: false,
      icon: twelfth,
    },

    {
      index: 13,
      item: 13,
      select: false,
      icon: thirteenth,
    },
    {
      index: 14,
      item: 14,
      select: false,
      icon: fourteenth,
    },
    {
      index: 15,
      item: 15,
      select: false,
      icon: fifteenth,
    },
    {
      index: 16,
      item: 16,
      select: false,
      icon: sixteenth,
    },
  ]);

  const toNext = async (): Promise<void> => {
    setCreateroomState((prevState: RoomInfo) => ({
      ...prevState,
      profileImage: profileImage,
    }));

    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex flex-col justify-between flex-1 px-5">
        {/* 상단 View */}
        <View className="flex mt-14">
          {/* 설명 Text */}
          <View className="mb-6 leading-loose">
            <Text className="text-lg font-semibold tracking-tight text-emphasizedFont">
              우리방을 대표할{'\n'}캐릭터를 선택해주세요!
            </Text>
          </View>

          {/* 캐릭터 선택 Input */}
          <CustomRadioBoxComponent
            value={profileImage}
            setValue={setProfileImage}
            items={items}
            setItems={setItems}
          />
        </View>

        {/* 하단 View */}
        <View className="flex">
          <Pressable onPress={toNext}>
            <View className={`p-4 rounded-xl ${isComplete ? 'bg-main1' : 'bg-[#C4C4C4]'}`}>
              <Text className="text-base font-semibold text-center text-white">완료</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SelectCharacterScreen;
