import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import CustomRadioBoxComponent from '@components/customRadioBox';

import Booie from '@assets/onBoard/example/booie.svg';
import Leo from '@assets/onBoard/example/leo.svg';
import Lulu from '@assets/onBoard/example/lulu.svg';
import Roy from '@assets/onBoard/example/roy.svg';

interface StepComponentProps {
  handleNextStep: () => void;
}

const StepFour: React.FC<StepComponentProps> = ({ handleNextStep }) => {
  const [character, setCharacter] = useState<string>('');

  const isComplete = character !== '';

  useEffect(() => {
    console.log('Type:', character);
    console.log('isComplete:', isComplete);
  }, [character, isComplete]);

  const [items, setItems] = useState([
    {
      index: 1,
      item: '루루',
      select: false,
      selected: Lulu,
      notSelected: Lulu,
    },
    {
      index: 2,
      item: '로이',
      select: false,
      selected: Roy,
      notSelected: Roy,
    },
    {
      index: 3,
      item: '레오',
      select: false,
      selected: Leo,
      notSelected: Leo,
    },
    {
      index: 4,
      item: '부이',
      select: false,
      selected: Booie,
      notSelected: Booie,
    },
  ]);

  return (
    <View className="flex-1 px-5">
      <View className="mt-[67px] mb-[160px]">
        <View className="mb-6 leading-loose">
          <Text className="text-lg font-semibold text-[#46464B] tracking-tight">
            cozymate와 함께할
          </Text>
          <Text className="text-lg font-semibold text-[#46464B] tracking-tight">
            캐릭터를 선택해주세요!
          </Text>
        </View>

        <View className="flex-row flex-wrap justify-between">
          <CustomRadioBoxComponent
            value={character}
            setValue={setCharacter}
            items={items}
            setItems={setItems}
          />
        </View>
      </View>

      <View className="flex">
        <Pressable onPress={handleNextStep} disabled={!isComplete}>
          <View
            className={`px-4 py-5 w-[330px] rounded-[39px]  ${
              isComplete ? 'bg-main' : 'bg-disabledFont'
            } `}
          >
            <Text className="text-sm font-semibold text-center text-white">확인</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default StepFour;
