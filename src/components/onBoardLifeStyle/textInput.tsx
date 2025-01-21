import React from 'react';
import { Text, View, TextInput } from 'react-native';

import { RegisterLifeStyle } from '@zustand/member-stat/type';
import { useNewLifeStyleStore } from '@zustand/member-stat/member-stat';

interface TextInputComponentProps {
  title: string;
  isNumber: boolean;
  value: keyof RegisterLifeStyle;
  showNext?: React.Dispatch<React.SetStateAction<boolean>>;
}

const TextInputComponent: React.FC<TextInputComponentProps> = ({
  title,
  isNumber,
  value,
  showNext,
}) => {
  const { lifeStyle, setNewLifeStyle } = useNewLifeStyleStore();

  const handleValue = (text: string) => {
    setNewLifeStyle({ [value]: text });

    if (showNext) {
      showNext(true);
    }
  };

  return (
    <View className="space-y-2">
      <Text className="text-base font-semibold text-emphasizedFont">{title}</Text>
      <TextInput
        value={String(lifeStyle[value])}
        keyboardType={isNumber ? 'number-pad' : undefined}
        onChangeText={(text) => handleValue(text)}
        placeholder="23"
        maxLength={2}
        className="rounded-xl bg-colorBox p-4 text-basicFont"
      />
    </View>
  );
};

export default TextInputComponent;
