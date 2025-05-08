import { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';

import GrayArrow from '@/assets/images/common/grayArrow.svg';

interface MenuComponentProps {
  items: {
    title: string;
    subTitle: ReactNode | null;
    onPress: () => void;
  }[];
}

const MenuComponent: React.FC<MenuComponentProps> = ({ items }) => {
  return (
    <View className="border border-[#F1F2F4] rounded-xl px-[16px] py-[4px]">
      {items.map((item, index) => (
        <Pressable
          key={index}
          onPress={item.onPress}
          className={`flex flex-row justify-between py-[12px] ${index !== items.length - 1 && 'border-b border-b-[#F1F2F4]'}`}
        >
          <Text className="text-14 font-500 text-emphasizedFont">{item.title}</Text>

          <View className="flex flex-row items-center gap-x-[4px]">
            {item.subTitle !== null && item.subTitle}
            <GrayArrow />
          </View>
        </Pressable>
      ))}
    </View>
  );
};

export default MenuComponent;
