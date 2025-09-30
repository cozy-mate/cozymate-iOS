import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GrayArrowIcon from '@/assets/images/common/grayArrow.svg';
import MagnifierIcon from '@/assets/images/common/magnifier.svg';
import RadioIcon from '@/assets/images/room/radio.svg';
import SelectedRadioIcon from '@/assets/images/room/selectedRadio.svg';
import BackHeaderComponent from '@/components/common/backHeader';
import { RoomCard } from '@/components/common/room';
import OpacityPressable from '@/components/opacityPressable';
import { sortTypeItem } from '@/constants/items/sortItem';
import { useGetRecommendRoomList } from '@/hooks/room-recommend/room-recommend';
import { useTracker } from '@/providers/TrackerProvider';
import { ButtonEvent, EventCategory } from '@/utils/ga/eventEnum';
import { useMemberStore } from '@/zustand/store';

export default function RecommendRoom() {
  const router = useRouter();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const [selectedSortType, setSelectedSortType] = useState<string>('AVERAGE_RATE');

  const { memberInfo } = useMemberStore();

  const { trackButton } = useTracker();

  const { data, hasNextPage, fetchNextPage, refetch } = useGetRecommendRoomList(selectedSortType);

  const onPressSortTypeSubmit = (value: string) => {
    trackButton(ButtonEvent.sorting, EventCategory.content_room);
    setSelectedSortType(value);
    bottomSheetRef.current?.close();
    refetch();
  };

  const onPressSortType = (value: string) => {
    const buttonEvent = `sorting_${value.toLowerCase()}` as keyof typeof ButtonEvent;
    trackButton(ButtonEvent[buttonEvent], EventCategory.content_room, {
      sorting: ButtonEvent[buttonEvent],
    });
    setSelectedSortType(value);
  };

  const onPressRoom = (roomId: number) => {
    trackButton(ButtonEvent.room_component, EventCategory.content_room, {
      roomId,
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="gap-y-[16px] flex-1">
        <View className="px-[20px]">
          <BackHeaderComponent />
        </View>

        <FlatList
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
          data={data?.pages?.flatMap((page) => page.result.result)}
          renderItem={({ item }) => (
            <RoomCard key={item.roomId} data={item} onPress={() => onPressRoom(item.roomId)} />
          )}
          ListHeaderComponent={() => (
            <View className="px-[20px]">
              <View className="gap-y-[4px] ml-[4px]">
                <Text className="Semibold18 text-emphasizedFont">
                  {memberInfo?.nickname ?? ''}님과
                </Text>
                <Text className="Semibold18 text-emphasizedFont">꼭 맞는 방을 추천해드릴게요</Text>
              </View>

              <OpacityPressable
                onPress={() => router.push('/room/search')}
                className="bg-colorBox rounded-xl px-[4px] py-[8px] flex flex-row items-center mt-[16px] mb-[20px]"
              >
                <View className="p-[8px]">
                  <MagnifierIcon />
                </View>
                <Text className="Medium14 text-disabledFont">방 이름을 검색해보세요</Text>
              </OpacityPressable>

              <OpacityPressable
                onPress={() => bottomSheetRef.current?.expand()}
                className="py-[11.5px] self-end mb-[8px] flex flex-row gap-x-[4px]"
              >
                <Text className="Medium14 text-basicFont">{sortTypeItem[selectedSortType]}</Text>
                <View className="rotate-90">
                  <GrayArrowIcon />
                </View>
              </OpacityPressable>
            </View>
          )}
          ItemSeparatorComponent={() => <View className="h-[24px]" />}
          onEndReached={() => {
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={() => (
            <View className="flex-1">
              <View className="w-full h-full flex items-center justify-center">
                <View className="gap-y-[20px] pb-[50px]">
                  <Text className="Medium14 text-disabledFont text-center">
                    아직 함께할 룸메이트가 없네요.{'\n'}곧 당신과 잘 맞는 룸메이트가 찾아올 거예요.
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[350]}
        index={-1}
        enablePanDownToClose={true}
        backdropComponent={(props) => (
          <BottomSheetBackdrop {...props} opacity={0.7} disappearsOnIndex={-1} appearsOnIndex={0} />
        )}
      >
        <BottomSheetView className="h-[350px] px-[20px] pt-[24px]">
          <View className="flex-1 gap-y-[8px]">
            {Object.entries(sortTypeItem).map(([value, title]) => (
              <OpacityPressable key={value} onPress={() => onPressSortType(value)}>
                <View className="flex flex-row justify-between items-center">
                  <Text
                    className={`py-[11.5px] ${value === selectedSortType ? 'Semibold16 text-mainColor' : 'Medium16 text-disabledFont'}`}
                  >
                    {title}
                  </Text>

                  <View className="p-[8px] my-[1px]">
                    {value === selectedSortType ? <SelectedRadioIcon /> : <RadioIcon />}
                  </View>
                </View>
              </OpacityPressable>
            ))}
          </View>

          <OpacityPressable onPress={() => onPressSortTypeSubmit(selectedSortType)}>
            <View className="border bg-mainColor py-[17.5px] rounded-xl mb-[50px]">
              <Text className="Semibold16 text-white text-center">확인</Text>
            </View>
          </OpacityPressable>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
}
