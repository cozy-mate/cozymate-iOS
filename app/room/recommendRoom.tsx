import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GrayArrowIcon from '@/assets/images/common/grayArrow.svg';
import MagnifierIcon from '@/assets/images/common/magnifier.svg';
import RadioIcon from '@/assets/images/room/radio.svg';
import SelectedRadioIcon from '@/assets/images/room/selectedRadio.svg';
import BackHeaderComponent from '@/components/common/backHeader';
import BottomButton from '@/components/common/bottomButton';
import RoomComponent from '@/components/room';
import { sortTypeItem, SortTypeValue } from '@/constants/items/sortItem';
import { useGetRecommendRoomList } from '@/hooks/room-recommend/room-recommend';
import { useTracker } from '@/providers/TrackerProvider';
import { ButtonEvent, EventCategory } from '@/utils/ga/eventEnum';
import { useMemberStore } from '@/zustand/member/member';

export default function RecommendRoom() {
  const router = useRouter();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const [sortType, setSortType] = useState<SortTypeValue>('AVERAGE_RATE');
  const [selectedSortType, setSelectedSortType] = useState<SortTypeValue>('AVERAGE_RATE');

  const { memberState } = useMemberStore();

  const { trackButton } = useTracker();

  const { data, hasNextPage, fetchNextPage, refetch } = useGetRecommendRoomList(sortType);

  const loadMoreList = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const onPressSortTypeSubmit = (value: SortTypeValue) => {
    trackButton(ButtonEvent.sorting, EventCategory.content_room);
    setSortType(value);
    bottomSheetRef.current?.close();
    refetch();
  };

  const onPressSortType = (value: SortTypeValue) => {
    const buttonEvent = `sorting_${value.toLowerCase()}` as keyof typeof ButtonEvent;
    trackButton(ButtonEvent[buttonEvent], EventCategory.content_room, {
      sorting: ButtonEvent[buttonEvent],
    });
    setSortType(value);
  };

  const onPressRoom = (roomId: number) => {
    trackButton(ButtonEvent.room_component, EventCategory.content_room, {
      roomId,
    });
    router.push(`/room/${roomId}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="gap-y-[16px] flex-1">
        <View className="px-[20px]">
          <BackHeaderComponent />
        </View>

        <FlatList
          data={data?.pages?.flatMap((page) => page.result.result)}
          renderItem={({ item }) => (
            <RoomComponent roomData={item} onPress={() => onPressRoom(item.roomId)} />
          )}
          ListHeaderComponent={() => (
            <View className="px-[20px]">
              <View className="gap-y-[4px] ml-[4px]">
                <Text className="text-18 font-600 text-emphasizedFont">
                  {memberState.nickname}님과
                </Text>
                <Text className="text-18 font-600 text-emphasizedFont">
                  꼭 맞는 방을 추천해드릴게요
                </Text>
              </View>

              <Pressable
                onPress={() => router.push('/room/search')}
                className="bg-colorBox rounded-xl px-[4px] py-[8px] flex flex-row items-center mt-[16px] mb-[20px]"
              >
                <View className="p-[8px]">
                  <MagnifierIcon />
                </View>
                <Text className="text-14 font-500 leading-14 text-disabledFont">
                  방 이름을 검색해보세요
                </Text>
              </Pressable>

              <Pressable
                onPress={() => bottomSheetRef.current?.expand()}
                className="py-[11.5px] self-end mb-[8px] flex flex-row gap-x-[4px]"
              >
                <Text className="text-14 font-500 leading-14 text-basicFont">
                  {sortTypeItem.find((item) => item.value === sortType)?.title}
                </Text>

                <View className="rotate-90">
                  <GrayArrowIcon />
                </View>
              </Pressable>
            </View>
          )}
          ItemSeparatorComponent={() => <View className="h-[24px]" />}
          onEndReached={loadMoreList}
          onEndReachedThreshold={0.5}
        />
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
                onPress={() => onPressSortType(item.value)}
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
                onPressSortTypeSubmit(selectedSortType);
              }}
            />
          </View>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
}
