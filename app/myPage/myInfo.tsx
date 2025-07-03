import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Suspense, useRef, useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { Portal } from 'react-native-portalize';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import BottomButtonComponent from '@/components/common/bottomButton';
import BottomSheetComponent from '@/components/common/bottomSheet';
import LoadingComponent from '@/components/common/loading';
import PreferenceChipListComponent from '@/components/common/preferenceChipList';
import BasicInfoComponent from '@/components/myPage/myInfo/basicInfo';
import PreferenceInfoComponent from '@/components/myPage/myInfo/preferenceInfo';
import { LifeStyleValue } from '@/constants/items/lifeStyle';
import {
  useGetPreferenceList,
  useUpdatePreferenceList,
} from '@/hooks/member-stat-preference/member-stat-preference';

function MyInfoComponent() {
  const { data } = useGetPreferenceList();
  const { mutateAsync: updatePreferenceList } = useUpdatePreferenceList();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const [preferenceList, setPreferenceList] = useState<string[]>(data.result.preferenceList);

  const resetPreferenceList = () => {
    setPreferenceList(data.result.preferenceList);
  };

  const handleValue = (value: LifeStyleValue) => {
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
      <BackHeaderComponent />

      <ScrollView contentContainerStyle={{ rowGap: 20 }}>
        <BasicInfoComponent />
        <PreferenceInfoComponent data={preferenceList} bottomSheetRef={bottomSheetRef} />

        <BottomSheetComponent
          bottomSheetRef={bottomSheetRef}
          snapPoints={[500]}
          backdropFunc={resetPreferenceList}
        >
          <BottomSheetView className="flex-1 mt-[20px]">
            <View className="px-[20px]">
              <PreferenceChipListComponent value={preferenceList} handleValue={handleValue} />
            </View>

            <BottomButtonComponent
              buttonText="확인"
              onPress={() => {
                updatePreferenceList({ preferenceList });
                bottomSheetRef.current?.close();
              }}
              color={preferenceList.length !== 4 ? 'GRAY' : 'BLUE'}
              disabled={preferenceList.length !== 4}
            />
          </BottomSheetView>
        </BottomSheetComponent>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function MyInfo() {
  return (
    <Suspense
      fallback={
        <Portal>
          <LoadingComponent />
        </Portal>
      }
    >
      <MyInfoComponent />
    </Suspense>
  );
}
