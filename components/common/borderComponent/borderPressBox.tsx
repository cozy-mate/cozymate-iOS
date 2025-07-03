import { View, Text, Pressable } from 'react-native';

import DownArrow from '@/assets/images/onBoard/downArrow.svg';

import BorderContainer from './borderContainer';

interface BorderPressBoxProps {
  title: string;
  value: string;
  placeholder: string;
  onPress: () => void;
  hasArrow?: boolean;
  isFocused?: boolean;
}

const BorderPressBox: React.FC<BorderPressBoxProps> = ({
  title,
  value,
  placeholder,
  onPress,
  hasArrow = false,
  isFocused,
}) => {
  return (
    <Pressable onPress={onPress}>
      <BorderContainer isFocused={isFocused}>
        <View className="flex-1 mr-[4px]">
          <Text className="Semibold12 text-colorFont">{title}</Text>
          <View className="flex flex-row justify-between items-center">
            <Text
              className={`mt-[6px] Medium14 ${value !== '' ? 'text-basicFont' : 'text-disabledFont'}`}
            >
              {value !== '' ? value : placeholder}
            </Text>
            {hasArrow && <DownArrow />}
          </View>
        </View>
      </BorderContainer>
    </Pressable>
  );
};

export default BorderPressBox;
