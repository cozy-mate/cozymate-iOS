import { useState } from 'react';
import { Text, Pressable, View } from 'react-native';

interface BottomButtonComponentProps {
  buttonText: string;
  onPress: any;
  color: 'BLUE' | 'GRAY' | 'WHITE' | 'RED';
  disabled: boolean;
}

const BottomButtonComponent: React.FC<BottomButtonComponentProps> = ({
  buttonText,
  onPress,
  color,
  disabled,
}) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const basicButtonStyle = `mx-[22px] mt-[12px] mb-[8px] rounded-xl`;
  const buttonStyle = {
    BLUE: 'bg-mainColor py-[17.5px]',
    GRAY: 'bg-[#C4C4C4] py-[17.5px]',
    WHITE: 'bg-colorBox border border-mainColor py-[15.5px]',
    RED: 'bg-warningSubColor border border-warningColor py-[15.5px]',
  };

  const basicTextStyle = `text-16 font-600 leading-16 text-center`;
  const textStyle = {
    BLUE: 'text-white',
    GRAY: 'text-white',
    WHITE: 'text-mainColor',
    RED: 'text-warningColor',
  };

  return (
    <View className="absolute bottom-[34px] bg-white w-full">
      <Pressable
        onPress={onPress}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        className={`${isPressed && 'opacity-50'} ${basicButtonStyle} ${buttonStyle[color]}`}
        disabled={disabled}
      >
        <Text className={`${basicTextStyle} ${textStyle[color]}`}>{buttonText}</Text>
      </Pressable>
    </View>
  );
};

export default BottomButtonComponent;
