import BottomSheet from '@gorhom/bottom-sheet';
import { Pressable, Text, View } from 'react-native';

import { getLifeStyleIcon, getLifeStyleLabel } from '@/utils/lifeStyle';

interface PreferenceInfoComponentProps {
  data: string[];
  bottomSheetRef: React.RefObject<BottomSheet>;
}

const PreferenceInfoComponent: React.FC<PreferenceInfoComponentProps> = ({
  data,
  bottomSheetRef,
}) => {
  return (
    <View className="border border-[#F1F2F4] rounded-xl p-[16px] pt-[20px] gap-y-[12px]">
      <View className="flex flex-row justify-between">
        {data.map((chip, index) => (
          <View key={index} className="flex flex-col items-center mx-[8px] gap-y-[2px]">
            {getLifeStyleIcon(chip, 'blue')}
            <Text className="Semibold12 text-emphasizedFont text-center">
              {getLifeStyleLabel(chip)}
            </Text>
          </View>
        ))}
      </View>

      <Pressable onPress={() => bottomSheetRef.current?.expand()} className="py-[7.5px]">
        <Text className="Medium12 text-disabledFont underline text-center">수정하기</Text>
      </Pressable>
    </View>
  );
};

export default PreferenceInfoComponent;
