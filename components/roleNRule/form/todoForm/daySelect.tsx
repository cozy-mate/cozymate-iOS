import { Pressable, Text, View } from 'react-native';

import CheckBoxIcon from '@/assets/images/roleNRule/check.svg';
import NotCheckBoxIcon from '@/assets/images/roleNRule/notCheck.svg';

interface DaySelectComponentProps {
  title: string;
  value: string[] | null;
  handleValue: (value: string[] | null) => void;
}

const DaySelectComponent: React.FC<DaySelectComponentProps> = ({ title, value, handleValue }) => {
  const items = ['월', '화', '수', '목', '금', '토', '일'];

  const toggleSelection = (itemValue: string) => {
    if (value === null) {
      handleValue([itemValue]);
      return;
    }

    if (value.includes(itemValue)) {
      const updatedValue = value.filter((v) => v !== itemValue);
      handleValue(updatedValue.length === 0 ? null : updatedValue);
    } else {
      handleValue([...value, itemValue]);
    }
  };

  const toggleAll = () => {
    if (value === null || value.length > 0) {
      handleValue([]);
    } else {
      handleValue(null);
    }
  };

  return (
    <View className="gap-y-[12px]">
      <Text className="Semibold18 text-basicFont px-[4px]">{title}</Text>

      <View className="gap-y-[8px]">
        <View className="flex flex-row flex-wrap gap-[8px]">
          {items.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => toggleSelection(item)}
              className={`w-[32px] h-[32px] m-[4px] flex items-center justify-center rounded-full ${value !== null && value.includes(item) ? 'bg-subColor1' : 'bg-colorBox'}`}
            >
              <Text
                className={`${value !== null && value.includes(item) ? 'Semibold12 text-mainColor' : 'Medium12 text-disabledFont'}`}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        <View className="flex flex-row items-center">
          <Pressable onPress={toggleAll} className="p-[8px]">
            {value !== null && value.length === 0 ? <CheckBoxIcon /> : <NotCheckBoxIcon />}
          </Pressable>

          <Text className="Medium14 text-disabledFont">정해진 요일이 없어요</Text>
        </View>
      </View>
    </View>
  );
};

export default DaySelectComponent;
