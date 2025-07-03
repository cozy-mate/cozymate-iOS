import { Pressable, Text, View } from 'react-native';

import RadioIcon from '@/assets/images/onBoard/radio.svg';
import SelectRadioIcon from '@/assets/images/onBoard/selectedRadio.svg';

import BorderContainer from './borderContainer';

interface BorderSelectBoxProps {
  title: string;
  value: string;
  items: {
    title: string;
    value: string;
  }[];
  onPress: (e: string) => void;
}

const BorderSelectBox: React.FC<BorderSelectBoxProps> = ({ title, value, items, onPress }) => {
  return (
    <BorderContainer>
      <View className="flex-1 mr-[4px]">
        <Text className="Semibold12 text-colorFont">{title}</Text>
        <View className="flex flex-row items-center gap-x-[8px]">
          {items.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => onPress(item.value)}
              className="flex flex-row items-center py-[3px]"
            >
              <View className="pr-[8px] py-[4px]">
                {value === item.value ? <SelectRadioIcon /> : <RadioIcon />}
              </View>
              <Text
                className={`Medium14 ${value === item.value ? 'text-basicFont' : 'text-disabledFont'}`}
              >
                {item.title}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </BorderContainer>
  );
};

export default BorderSelectBox;
