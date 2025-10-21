import { Fragment, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';

interface CustomTimeSelectProps {
  title: string;
  value: number | undefined;
  onChange: (val: number) => void;
}

const CustomTimeSelect: React.FC<CustomTimeSelectProps> = ({ title, value, onChange }) => {
  const initialHour = value !== undefined ? (value % 12 === 0 ? 12 : value % 12) : undefined;
  const initialMeridian = value !== undefined ? (value < 12 ? '오전' : '오후') : undefined;

  const [selectedHour, setSelectedHour] = useState<number | undefined>(initialHour);
  const [selectedMeridian, setSelectedMeridian] = useState<'오전' | '오후' | undefined>(
    initialMeridian,
  );

  const triggerChangeIfReady = (
    hour: number | undefined,
    meridian: '오전' | '오후' | undefined,
  ) => {
    if (hour !== undefined && meridian !== undefined) {
      const hour24 = meridian === '오전' ? hour % 12 : (hour % 12) + 12;
      onChange(hour24 % 24);
    }
  };

  const handleHourSelect = (hour: number) => {
    setSelectedHour(hour);
    triggerChangeIfReady(hour, selectedMeridian);
  };

  const handlePeriodSelect = (meridian: '오전' | '오후') => {
    setSelectedMeridian(meridian);
    triggerChangeIfReady(selectedHour, meridian);
  };

  return (
    <View className="gap-y-[4px]">
      <Text className="Semibold16 text-emphasizedFont mx-[4px]">{title}</Text>

      <FlatList
        data={Array.from({ length: 12 }, (_, i) => i + 1)}
        renderItem={({ item }) => (
          <Pressable
            key={item}
            onPress={() => handleHourSelect(item)}
            className={`w-[48px] py-[10px] rounded-md ${selectedHour === item ? 'bg-subColor1' : 'bg-colorBox'}`}
          >
            <Text
              className={`text-center ${selectedHour === item ? 'Semibold14 text-mainColor' : 'Medium14 text-disabledFont'}`}
            >
              {item}
            </Text>
          </Pressable>
        )}
        ListHeaderComponent={() => (
          <View className="flex flex-row items-center">
            {/* 오전 / 오후 선택 */}
            {(['오전', '오후'] as const).map((meridian, index) => (
              <Fragment key={index}>
                <Pressable
                  onPress={() => handlePeriodSelect(meridian)}
                  className="px-[8px] py-[11.5px]"
                >
                  <Text
                    className={`${meridian === selectedMeridian ? 'Semibold14 text-mainColor' : 'Medium14 text-disabledFont'}`}
                  >
                    {meridian}
                  </Text>
                </Pressable>

                {index === 0 && <View className="bg-[#D9D9D9] w-[1px] h-4 mx-2" />}
              </Fragment>
            ))}
          </View>
        )}
        scrollEnabled={false}
        bounces={false}
        numColumns={6}
        contentContainerStyle={{ gap: 8 }}
        columnWrapperStyle={{ gap: 8 }}
      />
    </View>
  );
};

export default CustomTimeSelect;
