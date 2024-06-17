import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import InputBoxComponent from '@components/inputBox';
import BlueCharacter from '@assets/onBoard/blueCharacter.svg';
import RadioBoxComponent from '@components/radioBox';

interface StepComponentProps {
  handleNextStep: () => void;
}

const StepTwo: React.FC<StepComponentProps> = ({ handleNextStep }) => {
  const [name, setName] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [gender, setGender] = useState<string>('');

  const [items, setItems] = useState([
    { index: 1, item: '남자', select: false },
    { index: 2, item: '여자', select: false },
  ]);

  return (
    <View className="flex-1">
      <View className="mt-[67px] mb-[311px]">
        <View className="mb-6 leading-loose">
          <Text className="text-lg font-semibold text-[#46464B] tracking-tight">
            어떤 주거 형식을
          </Text>
          <Text className="text-lg font-semibold text-[#46464B] tracking-tight">
            가지고 계신가요?
          </Text>
        </View>

        <View>
          <RadioBoxComponent
            title="성별"
            value={gender}
            setValue={setGender}
            items={items}
            setItems={setItems}
          />
        </View>
      </View>

      <Pressable onPress={handleNextStep}>
        <Text>클릭</Text>
      </Pressable>
      <BlueCharacter />
    </View>
  );
};

export default StepTwo;
