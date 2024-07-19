import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import CustomRadioBoxComponent from '@components/customRadioBox';

import CharacterBox from '@assets/onBoard/characterBox.svg';
import SelectCharacterBox from '@assets/onBoard/selectCharacterBox.svg';

interface StepComponentProps {
  handleNextStep: () => void;
}

interface Character {
  index: number;
  item: string;
  select: boolean;
  selected: React.FC;
  notSelected: React.FC;
}

const StepTwo: React.FC<StepComponentProps> = ({ handleNextStep }) => {
  const [character, setCharacter] = useState<string>('');

  const isComplete = character !== '';

  useEffect(() => {
    console.log('Type:', character);
    console.log('isComplete:', isComplete);
  }, [character, isComplete]);

  const [items, setItems] = useState<Character[]>([
    {
      index: 1,
      item: '루루',
      select: false,
      selected: SelectCharacterBox,
      notSelected: CharacterBox,
    },
    {
      index: 2,
      item: '로이',
      select: false,
      selected: SelectCharacterBox,
      notSelected: CharacterBox,
    },
    {
      index: 3,
      item: '레오',
      select: false,
      selected: SelectCharacterBox,
      notSelected: CharacterBox,
    },
    {
      index: 4,
      item: '부이',
      select: false,
      selected: SelectCharacterBox,
      notSelected: CharacterBox,
    },

    {
      index: 5,
      item: '루루',
      select: false,
      selected: SelectCharacterBox,
      notSelected: CharacterBox,
    },
    {
      index: 6,
      item: '로이',
      select: false,
      selected: SelectCharacterBox,
      notSelected: CharacterBox,
    },
    {
      index: 7,
      item: '레오',
      select: false,
      selected: SelectCharacterBox,
      notSelected: CharacterBox,
    },
    {
      index: 8,
      item: '부이',
      select: false,
      selected: SelectCharacterBox,
      notSelected: CharacterBox,
    },

    {
      index: 9,
      item: '루루',
      select: false,
      selected: SelectCharacterBox,
      notSelected: CharacterBox,
    },
    {
      index: 10,
      item: '로이',
      select: false,
      selected: SelectCharacterBox,
      notSelected: CharacterBox,
    },
    {
      index: 11,
      item: '레오',
      select: false,
      selected: SelectCharacterBox,
      notSelected: CharacterBox,
    },
    {
      index: 12,
      item: '부이',
      select: false,
      selected: SelectCharacterBox,
      notSelected: CharacterBox,
    },

    {
      index: 13,
      item: '루루',
      select: false,
      selected: SelectCharacterBox,
      notSelected: CharacterBox,
    },
    {
      index: 14,
      item: '로이',
      select: false,
      selected: SelectCharacterBox,
      notSelected: CharacterBox,
    },
    {
      index: 15,
      item: '레오',
      select: false,
      selected: SelectCharacterBox,
      notSelected: CharacterBox,
    },
    {
      index: 16,
      item: '부이',
      select: false,
      selected: SelectCharacterBox,
      notSelected: CharacterBox,
    },
  ]);

  return (
    <View className="flex flex-col justify-between flex-1 px-5">
      {/* 상단 View */}
      <View className="flex mt-14">
        {/* 설명 Text */}
        <View className="mb-6 leading-loose">
          <Text className="text-lg font-semibold text-[#46464B] tracking-tight">
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
        <Pressable onPress={handleNextStep}>
          <View className={`p-4 rounded-xl ${isComplete ? 'bg-main1' : 'bg-[#C4C4C4]'}`}>
            <Text className="text-base font-semibold text-center text-white">다음</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default StepTwo;
