import React, { useState } from 'react';
import { Text, View, Pressable } from 'react-native';

import { SignUp } from '@zustand/member/type';

import RadioButton from '@assets/onBoard/radioBox.svg';
import SelectedRadioButton from '@assets/onBoard/selectedRadioBox.svg';

interface RadioInputComponentProps {
  title: string;
  value: string;
  handleValue: (newSignUpState: Partial<SignUp>) => void;
  items: { title: string; value: string }[];
}

const RadioInputComponent: React.FC<RadioInputComponentProps> = ({
  title,
  value,
  handleValue,
  items,
}) => {
  const [isFoucused, setIsFocused] = useState<boolean>(false);

  return (
    <Pressable
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={`space-y-1.5 rounded-xl border px-5 py-[18px] ${
        isFoucused ? 'border-sub1' : 'border-disabled'
      }`}
    >
      <Text
        className={`text-xs font-semibold ${
          isFoucused || value !== '' ? 'text-main1' : 'text-colorFont'
        }`}
      >
        {title}
      </Text>

      <View className="flex flex-row items-center space-x-2">
        {items.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => handleValue({ gender: item.value })}
            className="flex flex-row items-center space-x-1"
          >
            {value === item.value ? <SelectedRadioButton /> : <RadioButton />}
            <Text
              className={`text-sm font-medium ${
                value === item.value ? 'text-basicFont' : 'text-disabledFont'
              }`}
            >
              {item.title}
            </Text>
          </Pressable>
        ))}
      </View>
    </Pressable>
  );
};

export default RadioInputComponent;
