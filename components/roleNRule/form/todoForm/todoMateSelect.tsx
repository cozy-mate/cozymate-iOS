import { Pressable, Text, View } from 'react-native';

import CheckBoxIcon from '@/assets/images/roleNRule/check.svg';
import NotCheckBoxIcon from '@/assets/images/roleNRule/notCheck.svg';

interface TodoMateSelectComponentProps {
  title: string;
  value: number[];
  items: {
    memberId: number;
    mateId: number;
    nickname: string;
    persona: number;
    mateEquality: number;
  }[];
  handleValue: (value: number[]) => void;
}

const TodoMateSelectComponent: React.FC<TodoMateSelectComponentProps> = ({
  title,
  value,
  items,
  handleValue,
}) => {
  const toggleSelection = (itemValue: number) => {
    const updatedValue = value.includes(itemValue)
      ? value.filter((v) => v !== itemValue)
      : [...value, itemValue];
    handleValue(updatedValue);
  };

  const toggleAll = () => {
    if (value.length === items.length) {
      handleValue([]);
    } else {
      handleValue(items.map((item) => item.mateId));
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
              onPress={() => toggleSelection(item.mateId)}
              className={`px-[20px] py-[10px] rounded-md ${value.includes(item.mateId) ? 'bg-subColor1' : 'bg-colorBox'}`}
            >
              <Text
                className={`${value.includes(item.mateId) ? 'Semibold14 text-mainColor' : 'Medium14 text-disabledFont'}`}
              >
                {item.nickname}
              </Text>
            </Pressable>
          ))}
        </View>

        <View className="flex flex-row items-center">
          <Pressable onPress={toggleAll} className="p-[8px]">
            {value.length === items.length ? <CheckBoxIcon /> : <NotCheckBoxIcon />}
          </Pressable>

          <Text className="Medium14 text-disabledFont">모두</Text>
        </View>
      </View>
    </View>
  );
};

export default TodoMateSelectComponent;
