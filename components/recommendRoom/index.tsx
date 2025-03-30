import BottomSheet from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import { FlatList, Pressable, Text, View } from 'react-native';

import GrayArrowIcon from '@/assets/images/common/grayArrow.svg';
import { sortTypeItem } from '@/constants/items/sortItem';
import { useGetRecommendRoomList } from '@/hooks/room-recommend/room-recommend';
import { getLifeStyleIcon, getLifeStyleLabel } from '@/utils/lifeStyle';

interface RecommendRoomComponentProps {
  sortType: string;
  bottomSheetRef: React.RefObject<BottomSheet>;
}

const RecommendRoomComponent: React.FC<RecommendRoomComponentProps> = ({
  sortType,
  bottomSheetRef,
}) => {
  const router = useRouter();

  const { data, hasNextPage, fetchNextPage } = useGetRecommendRoomList(sortType);

  const loadMoreList = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const getChipColor = (numOfArrival: number, count: number) => {
    if (count === 0) {
      return 'red';
    } else if (numOfArrival === count) {
      return 'blue';
    } else {
      return 'white';
    }
  };

  return (
    <FlatList
      ListHeaderComponent={() => (
        <Pressable
          onPress={() => bottomSheetRef.current?.expand()}
          className="py-[11.5px] self-end mx-[20px] mb-[8px] flex flex-row gap-x-[4px]"
        >
          <Text className="text-14 font-500 leading-14 text-basicFont">
            {sortTypeItem.find((item) => item.value === sortType)?.title}
          </Text>

          <View className="rotate-90">
            <GrayArrowIcon />
          </View>
        </Pressable>
      )}
      data={data?.pages?.flatMap((page) => page.result.result)}
      renderItem={({ item }) => (
        <Pressable onPress={() => router.push(`/room/${item.roomId}`)}>
          <View className="border border-disabledColor px-4 pt-5 pb-[18px] rounded-xl mx-5">
            <View className="flex flex-row items-center justify-between">
              <Text className="text-16 font-600 leading-16 text-basicFont mx-2">{item.name}</Text>
              <Text className="text-16 font-500 leading-16 text-mainColor">
                {item.equality ?? '??'}%
              </Text>
            </View>

            <View className="h-[1px] bg-[#F6F6F6] my-4" />

            <View className="gap-y-[24px]">
              <View className="flex flex-row justify-between">
                {item.preferenceMatchCountList.map((chip, index) => (
                  <View key={index} className="flex flex-col items-center w-[50px] mx-2 gap-y-1.5">
                    {getLifeStyleIcon(
                      chip.preferenceName,
                      getChipColor(item.numOfArrival, chip.count as number),
                    )}
                    <View>
                      <Text className="text-12 font-500 leading-12 text-disabledFont text-center">
                        {getLifeStyleLabel(chip.preferenceName)}
                      </Text>
                      <Text className="text-12 font-600 leading-12 text-basicFont text-center">
                        {chip.count ?? '0'}명 일치
                      </Text>
                    </View>
                  </View>
                ))}
              </View>

              <View className="flex flex-row items-center justify-between">
                <View className="flex flex-row">
                  {item.hashtags.map((hash, index) => (
                    <View key={index} className="py-0.5 px-2 rounded bg-colorBox">
                      <Text className="text-12 font-500 leading-12 text-colorFont">#{hash}</Text>
                    </View>
                  ))}
                </View>

                <Text className="text-12 font-500 leading-12 text-disabledFont">
                  {item.numOfArrival} / {item.maxMateNum}명
                </Text>
              </View>
            </View>
          </View>
        </Pressable>
      )}
      onEndReached={loadMoreList}
      onEndReachedThreshold={0.5}
    />
  );
};

export default RecommendRoomComponent;
