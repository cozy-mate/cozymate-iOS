import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { useRef, useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import BottomButton from '@/components/common/bottomButton';
import ChipList from '@/components/common/chipList';
import MyInfoComponent from '@/components/myPage/MyInfo';
import PreferenceListComponent from '@/components/myPage/PreferenceList';
import {
  useGetPreferenceList,
  useUpdatePreferenceList,
} from '@/hooks/member-stat-preference/member-stat-preference';

export default function MyInfo() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const { data } = useGetPreferenceList();

  const { mutateAsync: updatePreferenceList } = useUpdatePreferenceList();

  const [preferenceList, setPreferenceList] = useState<string[]>(data.result.preferenceList);

  const handleValue = (value: string) => {
    setPreferenceList((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        if (prev.length < 4) {
          return [...prev, value];
        } else {
          Alert.alert(
            '최대 4개까지만 선택할 수 있습니다.',
            '더 이상 선택할 수 없습니다.',
            [{ text: '확인' }],
            { cancelable: true },
          );
          return prev;
        }
      }
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-[20px]">
      <ScrollView contentContainerStyle={{ rowGap: 8 }}>
        <BackHeaderComponent />
        <View className="gap-y-5">
          <MyInfoComponent />
          <PreferenceListComponent bottomSheetRef={bottomSheetRef} />
        </View>
      </ScrollView>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[500]}
        index={-1}
        enablePanDownToClose={true}
        backdropComponent={(props) => (
          <BottomSheetBackdrop {...props} opacity={0.7} disappearsOnIndex={-1} appearsOnIndex={0} />
        )}
      >
        <BottomSheetView className="px-[20px] flex-1 relative pt-5">
          <ChipList value={preferenceList} handleValue={handleValue} />

          <View className="absolute bottom-[54px] left-5 w-full">
            <BottomButton
              buttonText="확인"
              disabled={false}
              onPress={() => {
                updatePreferenceList({ preferenceList });
                bottomSheetRef.current?.close();
              }}
            />
          </View>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
}
