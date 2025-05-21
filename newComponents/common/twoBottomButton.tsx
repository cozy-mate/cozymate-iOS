import { useState } from 'react';
import { Text, Pressable, View } from 'react-native';

interface TwoBottomButtonComponentProps {
  onLeftPress: any;
  onRightPress: any;
  disabled?: boolean;
}

const TwoBottomButtonComponent: React.FC<TwoBottomButtonComponentProps> = ({
  onLeftPress,
  onRightPress,
  disabled = false,
}) => {
  const [isLeftPressed, setIsLeftPressed] = useState<boolean>(false);
  const [isRightPressed, setIsRightPressed] = useState<boolean>(false);

  const basicButtonStyle = `flex-1 mt-[12px] mb-[8px] rounded-xl`;
  const buttonStyle = {
    BLUE: 'bg-mainColor py-[17.5px]',
    WHITE: 'bg-colorBox border border-mainColor py-[15.5px]',
  };

  const basicTextStyle = `text-16 font-600 leading-16 text-center`;
  const textStyle = {
    BLUE: 'text-white',
    WHITE: 'text-mainColor',
  };

  return (
    <View className="absolute bottom-0 bg-white w-full" style={{ height: 108 }}>
      <View className="flex flex-row items-center px-[20px] gap-x-[8px]">
        <Pressable
          onPress={onLeftPress}
          onPressIn={() => setIsLeftPressed(true)}
          onPressOut={() => setIsLeftPressed(false)}
          className={`${isLeftPressed && 'opacity-50'} ${basicButtonStyle} ${buttonStyle['WHITE']}`}
          disabled={disabled}
        >
          <Text className={`${basicTextStyle} ${textStyle['WHITE']}`}>거절</Text>
        </Pressable>

        <Pressable
          onPress={onRightPress}
          onPressIn={() => setIsRightPressed(true)}
          onPressOut={() => setIsRightPressed(false)}
          className={`${isRightPressed && 'opacity-50'} ${basicButtonStyle} ${buttonStyle['BLUE']}`}
          disabled={disabled}
        >
          <Text className={`${basicTextStyle} ${textStyle['BLUE']}`}>수락</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TwoBottomButtonComponent;
