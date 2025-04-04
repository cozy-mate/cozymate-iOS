import { Pressable, Text, View } from 'react-native';

import GrayArrow from '@/assets/images/common/grayArrow.svg';

interface MenuComponentProps {
  items: {
    title: string;
    subTitle: string | null | undefined;
    undefinedText?: string;
    onPress: () => void;
  }[];
}

const MenuComponent: React.FC<MenuComponentProps> = ({ items }) => {
  return (
    <View className="border border-[#F1F2F4] rounded-xl px-4 py-1">
      {items.map((item, index) => (
        <Pressable
          key={index}
          onPress={item.onPress}
          className={`flex flex-row justify-between py-3 ${index !== items.length - 1 && 'border-b border-b-[#F1F2F4]'}`}
        >
          <Text className="text-14 font-500 text-emphasizedFont">{item.title}</Text>

          <View className="flex flex-row items-center gap-x-[4px]">
            {item.subTitle !== null &&
              (item.subTitle !== undefined ? (
                <Text className="text-14 font-500 leading-14 text-mainColor">{item.subTitle}</Text>
              ) : (
                <Text className="text-14 font-500 leading-14 text-disabledFont">
                  {item.undefinedText}
                </Text>
              ))}
            <GrayArrow />
          </View>
        </Pressable>
      ))}
    </View>
  );
};

export default MenuComponent;
