import React, { Fragment, useState } from 'react';
import { View, Text, Pressable } from 'react-native';

interface CustomTimeSelectComponentProps {
  title: string;
  value: number | undefined;
  onChange: (val: number) => void;
}

const CustomTimeSelectComponent: React.FC<CustomTimeSelectComponentProps> = ({
  title,
  value,
  onChange,
}) => {
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
      <Text className="text-16 font-600 leading-16 text-emphasizedFont mx-1">{title}</Text>

      <View className="gap-y-[8px]">
        <View className="flex flex-row items-center">
          {/* 오전 / 오후 선택 */}
          {(['오전', '오후'] as const).map((meridian, index) => (
            <Fragment key={index}>
              <Pressable
                onPress={() => handlePeriodSelect(meridian)}
                className="px-[8px] py-[11.5px]"
              >
                <Text
                  className={`text-14 ${meridian === selectedMeridian ? 'font-600 text-mainColor' : 'font-500 text-disabledFont'}`}
                >
                  {meridian}
                </Text>
              </Pressable>

              {index === 0 && <View className="bg-[#D9D9D9] w-[1px] h-4 mx-2" />}
            </Fragment>
          ))}
        </View>

        {/* 시간 선택 */}
        <View className="flex flex-row flex-wrap gap-[8px]">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((hour, index) => (
            <Pressable
              key={index}
              onPress={() => handleHourSelect(hour)}
              className={`py-[10px] rounded-md w-[48px] ${selectedHour === hour ? 'bg-subColor1' : 'bg-colorBox'}`}
            >
              <Text
                className={`text-14 text-center leading-14 ${selectedHour === hour ? 'font-600 text-mainColor' : 'font-500 text-disabledFont'}`}
              >
                {hour}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};

export default CustomTimeSelectComponent;
