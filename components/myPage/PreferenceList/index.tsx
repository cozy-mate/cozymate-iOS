import BottomSheet from '@gorhom/bottom-sheet';
import { Pressable, Text, View } from 'react-native';

import { useGetPreferenceList } from '@/hooks/member-stat-preference/member-stat-preference';
import { getLifeStyleIcon, getLifeStyleLabel } from '@/utils/lifeStyle';

interface PreferenceListComponentProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
}

const PreferenceListComponent: React.FC<PreferenceListComponentProps> = ({ bottomSheetRef }) => {
  const { data } = useGetPreferenceList();

  return (
    <View className="border border-[#F1F2F4] rounded-xl px-4 py-5 gap-y-[12px]">
      <View className="flex flex-row justify-between">
        {data.result.preferenceList.map((chip, index) => (
          <View key={index} className="flex flex-col items-center w-[50px] mx-2 gap-y-0.5">
            {getLifeStyleIcon(chip, 'blue')}
            <Text className="text-12 font-600 text-emphasizedFont text-center">
              {getLifeStyleLabel(chip)}
            </Text>
          </View>
        ))}
      </View>

      <Pressable onPress={() => bottomSheetRef.current?.expand()}>
        <Text className="text-12 font-500 text-disabledFont underline text-center">수정하기</Text>
      </Pressable>
    </View>
  );
};

export default PreferenceListComponent;
