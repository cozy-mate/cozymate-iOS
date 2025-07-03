import { Pressable, Text, View } from 'react-native';

import CheckBoxIcon from '@/assets/images/roleNRule/check.svg';
import NotCheckBoxIcon from '@/assets/images/roleNRule/notCheck.svg';
import { MateIdNameListItem } from '@/type/role';

interface RoleMateSelectComponentProps {
  title: string;
  value: MateIdNameListItem[];
  items: {
    memberId: number;
    mateId: number;
    nickname: string;
    persona: number;
    mateEquality: number;
  }[];
  handleValue: (value: MateIdNameListItem[]) => void;
}

const RoleMateSelectComponent: React.FC<RoleMateSelectComponentProps> = ({
  title,
  value,
  items,
  handleValue,
}) => {
  const toggleSelection = (item: { mateId: number; nickname: string }) => {
    const exists = value.some((v) => v.mateId === item.mateId);
    const updatedValue = exists
      ? value.filter((v) => v.mateId !== item.mateId)
      : [...value, { mateId: item.mateId, nickname: item.nickname }];
    handleValue(updatedValue);
  };

  const toggleAll = () => {
    if (value.length === items.length) {
      handleValue([]);
    } else {
      handleValue(items.map((item) => ({ mateId: item.mateId, nickname: item.nickname })));
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
              className={`px-[20px] py-[10px] rounded-md ${value.some((v) => v.mateId === item.mateId) ? 'bg-subColor1' : 'bg-colorBox'}`}
            >
              <Text
                className={`${value.some((v) => v.mateId === item.mateId) ? 'Semibold14 text-mainColor' : 'Medium14 text-disabledFont'}`}
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

export default RoleMateSelectComponent;
