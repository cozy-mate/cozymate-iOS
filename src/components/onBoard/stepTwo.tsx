import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import CustomRadioBoxComponent from '@components/customRadioBox';

import CharacterBox from '@assets/onBoard/characterBox.svg';

interface StepComponentProps {
  handleNextStep: () => void;
}

type Character = {
  index: number;
  item: string;
  select: boolean;
  selected: React.FC;
  notSelected: React.FC;
};

type Item = {
  series: string;
  characters: Character[];
};

const StepTwo: React.FC<StepComponentProps> = ({ handleNextStep }) => {
  const [character, setCharacter] = useState<string>('');

  const isComplete = character !== '';

  useEffect(() => {
    console.log('Type:', character);
    console.log('isComplete:', isComplete);
  }, [character, isComplete]);

  const [items, setItems] = useState<Item[]>([
    {
      series: 'Type 1',
      characters: [
        {
          index: 1,
          item: '루루',
          select: false,
          selected: CharacterBox,
          notSelected: CharacterBox,
        },
        {
          index: 2,
          item: '로이',
          select: false,
          selected: CharacterBox,
          notSelected: CharacterBox,
        },
        {
          index: 3,
          item: '레오',
          select: false,
          selected: CharacterBox,
          notSelected: CharacterBox,
        },
        {
          index: 4,
          item: '부이',
          select: false,
          selected: CharacterBox,
          notSelected: CharacterBox,
        },
      ],
    },
    {
      series: 'Type 2',
      characters: [
        {
          index: 5,
          item: '루루',
          select: false,
          selected: CharacterBox,
          notSelected: CharacterBox,
        },
        {
          index: 6,
          item: '로이',
          select: false,
          selected: CharacterBox,
          notSelected: CharacterBox,
        },
        {
          index: 7,
          item: '레오',
          select: false,
          selected: CharacterBox,
          notSelected: CharacterBox,
        },
        {
          index: 8,
          item: '부이',
          select: false,
          selected: CharacterBox,
          notSelected: CharacterBox,
        },
      ],
    },
    {
      series: 'Type 3',
      characters: [
        {
          index: 9,
          item: '루루',
          select: false,
          selected: CharacterBox,
          notSelected: CharacterBox,
        },
        {
          index: 10,
          item: '로이',
          select: false,
          selected: CharacterBox,
          notSelected: CharacterBox,
        },
        {
          index: 11,
          item: '레오',
          select: false,
          selected: CharacterBox,
          notSelected: CharacterBox,
        },
        {
          index: 12,
          item: '부이',
          select: false,
          selected: CharacterBox,
          notSelected: CharacterBox,
        },
      ],
    },
    {
      series: 'Type 4',
      characters: [
        {
          index: 13,
          item: '루루',
          select: false,
          selected: CharacterBox,
          notSelected: CharacterBox,
        },
        {
          index: 14,
          item: '로이',
          select: false,
          selected: CharacterBox,
          notSelected: CharacterBox,
        },
        {
          index: 15,
          item: '레오',
          select: false,
          selected: CharacterBox,
          notSelected: CharacterBox,
        },
        {
          index: 16,
          item: '부이',
          select: false,
          selected: CharacterBox,
          notSelected: CharacterBox,
        },
      ],
    },
  ]);

  const updateCharacters = (updatedCharacters: Character[]) => {
    setItems((prevItems) =>
      prevItems.map((prevItem) => ({
        ...prevItem,
        characters: prevItem.characters.map(
          (char) =>
            updatedCharacters.find((updatedChar) => updatedChar.index === char.index) || char,
        ),
      })),
    );
  };

  return (
    <ScrollView className="flex-1 px-5">
      <View className="mt-[56px] mb-[59px]">
        <View className="mb-6 leading-loose">
          <Text className="text-lg font-semibold text-[#46464B] tracking-tight">
            cozymate와 함께할
          </Text>
          <Text className="text-lg font-semibold text-[#46464B] tracking-tight">
            캐릭터를 선택해주세요!
          </Text>
        </View>

        {items.map((typeItem) => (
          <View key={typeItem.series} className="mb-[48px]">
            <Text className="mb-3 text-base font-semibold tracking-tight text-emphasizedFont">
              {typeItem.series}
            </Text>
            <View className="flex-row flex-wrap justify-between">
              <CustomRadioBoxComponent
                value={character}
                setValue={setCharacter}
                items={typeItem.characters}
                updateCharacters={updateCharacters}
              />
            </View>
          </View>
        ))}
      </View>

      <View className="flex">
        <Pressable onPress={handleNextStep}>
          <View
            className={`text-base font-semibold p-4 rounded-xl ${
              isComplete ? 'bg-main' : 'bg-[#C4C4C4]'
            }`}
          >
            <Text className="text-center text-white">확인</Text>
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default StepTwo;
