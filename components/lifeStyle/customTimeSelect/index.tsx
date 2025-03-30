import { Pressable, Text, View } from 'react-native';

interface CustomTimeSelectComponentProps {
  title: string;
  timeValue: string | number | undefined;
  meridianValue: string | number | undefined;
  items: {
    index: number;
    title: string;
    value: string | number;
  }[];
  handleTime: (value: string | number | undefined) => void;
  handleMeridian: (value: string | number | undefined) => void;
}

const CustomTimeSelectComponent: React.FC<CustomTimeSelectComponentProps> = ({
  title,
  timeValue,
  meridianValue,
  items,
  handleTime,
  handleMeridian,
}) => {
  return (
    <View className="gap-y-[4px]">
      <Text className="text-16 font-600 leading-16 text-emphasizedFont mx-1">{title}</Text>

      <View className="gap-y-[8px]">
        <View className="flex flex-row items-center">
          <Pressable onPress={() => handleMeridian('오전')} className="px-[8px] py-[11.5px]">
            <Text
              className={`text-14 ${meridianValue === '오전' ? 'font-600 text-mainColor' : 'font-500 text-disabledFont'}`}
            >
              AM
            </Text>
          </Pressable>

          <View className="w-[1px] h-[16px] bg-[#D9D9D9] mx-[8px]" />

          <Pressable onPress={() => handleMeridian('오후')} className="p-[8px] py-[11.5px]">
            <Text
              className={`text-14 ${meridianValue === '오후' ? 'font-600 text-mainColor' : 'font-500 text-disabledFont'}`}
            >
              PM
            </Text>
          </Pressable>
        </View>

        <View className="flex flex-row flex-wrap gap-[8px]">
          {items.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => handleTime(item.value)}
              className={`py-[10px] rounded-md w-[48px] ${timeValue === item.value ? 'bg-subColor1' : 'bg-colorBox'}`}
            >
              <Text
                className={`text-14 text-center leading-14 ${timeValue === item.value ? 'font-600 text-mainColor' : 'font-500 text-disabledFont'}`}
              >
                {item.title}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};

export default CustomTimeSelectComponent;
