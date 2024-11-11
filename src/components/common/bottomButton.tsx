import React from 'react';
import { Text, Pressable } from 'react-native';

interface BottomButtonProps {
  color: string;
  borderColor: string;
  textColor: string;
  text: string;
  disabled: any;
  onPressFunc: () => Promise<void> | void;
}

const BottomButton: React.FC<BottomButtonProps> = ({
  color,
  borderColor,
  textColor,
  text,
  disabled,
  onPressFunc,
}) => {
  const buttonStyle = disabled
    ? `bg-disabledButton p-4 border border-disabledButton rounded-xl`
    : `${color} p-4 border ${borderColor} rounded-xl`;

  const textStyle = disabled
    ? `text-white text-center font-semibold text-base `
    : `${textColor} text-center font-semibold text-base`;

  return (
    <Pressable className={buttonStyle} onPress={onPressFunc}>
      <Text className={textStyle}>{text}</Text>
    </Pressable>
  );
};

export default BottomButton;
