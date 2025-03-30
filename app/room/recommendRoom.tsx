import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import RadioIcon from '@/assets/images/room/radio.svg';
import SelectedRadioIcon from '@/assets/images/room/selectedRadio.svg';
import BackHeaderComponent from '@/components/common/backHeader';
import BottomButton from '@/components/common/bottomButton';
import RecommendRoomComponent from '@/components/recommendRoom';
import { sortTypeItem } from '@/constants/items/sortItem';
import { useGetRecommendRoomList } from '@/hooks/room-recommend/room-recommend';
import { useMemberStore } from '@/zustand/member/member';

export default function RecommendRoom() {
  const { memberState } = useMemberStore();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const [sortType, setSortType] = useState<string>('AVERAGE_RATE');
  const [selectedSortType, setSelectedSortType] = useState<string>('AVERAGE_RATE');

  const { refetch } = useGetRecommendRoomList(sortType);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="gap-y-[16px]">
        <View className="px-[20px]">
          <BackHeaderComponent />
        </View>

        <View className="gap-y-[4px] ml-[4px] px-[20px]">
          <Text className="text-18 font-600 text-emphasizedFont">{memberState.nickname}님과</Text>
          <Text className="text-18 font-600 text-emphasizedFont">꼭 맞는 방을 추천해드릴게요</Text>
        </View>

        <RecommendRoomComponent sortType={sortType} bottomSheetRef={bottomSheetRef} />
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[320]}
        index={-1}
        enablePanDownToClose={true}
        backdropComponent={(props) => (
          <BottomSheetBackdrop {...props} opacity={0.7} disappearsOnIndex={-1} appearsOnIndex={0} />
        )}
      >
        <BottomSheetView className="px-[20px] flex-1 relative pt-[12px]">
          <View className="gap-y-[8px]">
            {sortTypeItem.map((item, index) => (
              <Pressable
                key={index}
                onPress={() => setSelectedSortType(item.value)}
                className="flex flex-row justify-between items-center"
              >
                <Text
                  className={`text-16 leading-16 py-[11.5px] ${item.value === selectedSortType ? 'font-600 text-mainColor' : 'font-500 text-disabledFont'}`}
                >
                  {item.title}
                </Text>

                <View className="p-[8px] my-[1px]">
                  {item.value === selectedSortType ? <SelectedRadioIcon /> : <RadioIcon />}
                </View>
              </Pressable>
            ))}
          </View>

          <View className="absolute bottom-[54px] left-5 w-full">
            <BottomButton
              buttonText="확인"
              disabled={false}
              onPress={() => {
                setSortType(selectedSortType);
                bottomSheetRef.current?.close();
                refetch();
              }}
            />
          </View>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
}
