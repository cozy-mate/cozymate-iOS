import React, { useState } from 'react';
import { Text, View, Pressable, SafeAreaView } from 'react-native';

import CustomRadioBoxComponent from '@components/customRadioBox';

import { useSignUpStore } from '@zustand/member/member';

import { CharacterInputScreenProps } from '@type/param/rootStack';

import First from '@assets/characterItem/1.svg';
import Third from '@assets/characterItem/3.svg';
import Fifth from '@assets/characterItem/5.svg';
import Sixth from '@assets/characterItem/6.svg';
import Ninth from '@assets/characterItem/9.svg';
import Second from '@assets/characterItem/2.svg';
import Fourth from '@assets/characterItem/4.svg';
import Eighth from '@assets/characterItem/8.svg';
import Tenth from '@assets/characterItem/10.svg';
import Seventh from '@assets/characterItem/7.svg';
import Twelfth from '@assets/characterItem/12.svg';
import Eleventh from '@assets/characterItem/11.svg';
import Fifteenth from '@assets/characterItem/15.svg';
import Sixteenth from '@assets/characterItem/16.svg';
import Thirteenth from '@assets/characterItem/13.svg';
import Fourteenth from '@assets/characterItem/14.svg';

type IconProps = {
  width: number;
  height: number;
};

type Item = {
  index: number;
  item: number;
  select: boolean;
  icon: React.FC<IconProps>;
};

const CharacterInputScreen = ({ navigation }: CharacterInputScreenProps) => {
  const { setSignUpState } = useSignUpStore();

  const [character, setCharacter] = useState<number>(0);

  const isComplete = character !== 0;

  const [items, setItems] = useState<Item[]>([
    { index: 1, item: 1, select: false, icon: First },
    { index: 2, item: 2, select: false, icon: Second },
    { index: 3, item: 3, select: false, icon: Third },
    { index: 4, item: 4, select: false, icon: Fourth },
    { index: 5, item: 5, select: false, icon: Fifth },
    { index: 6, item: 6, select: false, icon: Sixth },
    { index: 7, item: 7, select: false, icon: Seventh },
    { index: 8, item: 8, select: false, icon: Eighth },
    { index: 9, item: 9, select: false, icon: Ninth },
    { index: 10, item: 10, select: false, icon: Tenth },
    { index: 11, item: 11, select: false, icon: Eleventh },
    { index: 12, item: 12, select: false, icon: Twelfth },
    { index: 13, item: 13, select: false, icon: Thirteenth },
    { index: 14, item: 14, select: false, icon: Fourteenth },
    { index: 15, item: 15, select: false, icon: Fifteenth },
    { index: 16, item: 16, select: false, icon: Sixteenth },
  ]);

  const toNext = async (): Promise<void> => {
    if (!isComplete) return;

    setSignUpState({
      persona: character,
    });

    navigation.navigate('ChipSelectScreen');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex flex-1 flex-col justify-between px-5">
        {/* 상단 View */}
        <View className="mt-14 flex">
          {/* 설명 Text */}
          <View className="mb-6 leading-loose">
            <Text className="text-lg font-semibold tracking-tight text-[#46464B]">
              cozymate와 함께할{'\n'}캐릭터를 선택해주세요!
            </Text>
          </View>

          {/* 캐릭터 선택 Input */}
          <CustomRadioBoxComponent
            value={character}
            setValue={setCharacter}
            items={items}
            setItems={setItems}
          />
        </View>

        {/* 하단 View */}
        <View className="flex">
          <Pressable onPress={toNext}>
            <View className={`rounded-xl p-4 ${isComplete ? 'bg-main1' : 'bg-[#C4C4C4]'}`}>
              <Text className="text-center text-base font-semibold text-white">다음</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CharacterInputScreen;
