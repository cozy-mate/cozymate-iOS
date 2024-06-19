import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import CustomRadioBoxComponent from '@components/customRadioBox';

import BlueCharacter from '@assets/onBoard/blueCharacter.svg';
import SchoolIcon from '@assets/onBoard/schoolIcon.svg';
import SelectedSchoolIcon from '@assets/onBoard/selectedSchoolIcon.svg';
import HomeIcon from '@assets/onBoard/homeIcon.svg';
import SelectedHomeIcon from '@assets/onBoard/selectedHomeIcon.svg';

import AbleNextButtonIcon from '@assets/onBoard/ableNextButton.svg';
import DisableNextButtonIcon from '@assets/onBoard/disableNextButton.svg';

interface StepComponentProps {
  handleNextStep: () => void;
}

const StepTwo: React.FC<StepComponentProps> = ({ handleNextStep }) => {
  const [type, setType] = useState<string>('');

  const isComplete = type !== '';

  useEffect(() => {
    console.log('Type:', type);
    console.log('isComplete:', isComplete);
  }, [type, isComplete]);

  const [items, setItems] = useState([
    {
      index: 1,
      item: '기숙사',
      select: false,
      selected: SelectedSchoolIcon,
      notSelected: SchoolIcon,
    },
    {
      index: 2,
      item: '쉐어하우스',
      select: false,
      selected: SelectedHomeIcon,
      notSelected: HomeIcon,
    },
  ]);

  return (
    <View className="flex-1 px-5">
      <View className="mt-[67px] mb-[270px]">
        <View className="mb-6 leading-loose">
          <Text className="text-lg font-semibold text-[#46464B] tracking-tight">
            어떤 주거 형식을
          </Text>
          <Text className="text-lg font-semibold text-[#46464B] tracking-tight">
            가지고 계신가요?
          </Text>
        </View>

        <View>
          <CustomRadioBoxComponent
            value={type}
            setValue={setType}
            items={items}
            setItems={setItems}
          />
        </View>
      </View>

      <View className="flex items-end">
        <Pressable onPress={handleNextStep} disabled={!isComplete}>
          {isComplete ? <AbleNextButtonIcon /> : <DisableNextButtonIcon />}
        </Pressable>
      </View>

      <View className="mt-[-19px]">
        <BlueCharacter />
      </View>
    </View>
  );
};

export default StepTwo;
