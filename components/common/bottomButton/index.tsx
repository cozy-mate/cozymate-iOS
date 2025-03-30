import React from 'react';
import { Pressable, Text } from 'react-native';

interface BottomButtonProps {
  buttonText: string;
  disabled: boolean;
  onPress: () => void;
  backColor?: string;
  borderColor?: string;
  textColor?: string;
}

const BottomButton: React.FC<BottomButtonProps> = ({
  buttonText,
  disabled,
  onPress,
  backColor,
  borderColor,
  textColor,
}) => {
  const defaultBackColor = disabled ? 'bg-[#C4C4C4]' : 'bg-mainColor';
  const defaultBorderColor = disabled ? 'border-[#C4C4C4]' : 'border-mainColor';
  const defaultTextColor = 'text-white';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`flex-1 py-[17.5px] rounded-xl border ${backColor ?? defaultBackColor} ${borderColor ?? defaultBorderColor}`}
    >
      <Text className={`text-16 font-600 leading-16 text-center ${textColor ?? defaultTextColor}`}>
        {buttonText}
      </Text>
    </Pressable>
  );
};

export default BottomButton;
