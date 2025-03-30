import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';

import { useGetMemberList } from '@/hooks/member-stat/member-stat';
import { getLifeStyleIcon, getLifeStyleLabel, getLifeStyleValue } from '@/utils/lifeStyle';

import ChipList from '../common/chipList';

const RoomMateComponent: React.FC = () => {
  const router = useRouter();

  const [filterList, setFilterList] = useState<string[]>([]);

  const { data, hasNextPage, fetchNextPage } = useGetMemberList(filterList);

  const handleValue = (value: string) => {
    setFilterList((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const loadMoreList = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <FlatList
      contentContainerStyle={{ paddingBottom: 60 }}
      ListHeaderComponent={() => (
        <View className="px-[20px] mb-[32px] gap-y-[16px]">
          <View className="gap-y-[4px] mx-[4px]">
            <Text className="text-18 font-600 leading-18 text-emphasizedFont">
              원하는 칩을 선택하면
            </Text>
            <Text className="text-18 font-600 leading-18 text-emphasizedFont">
              나와 똑같은 답변을 한 사용자만 떠요!
            </Text>
          </View>

          <ChipList value={filterList} handleValue={handleValue} />
        </View>
      )}
      ItemSeparatorComponent={() => <View className="h-[24px]" />}
      data={data?.pages?.flatMap((page) => page.result.memberList)}
      renderItem={({ item }) => (
        <Pressable onPress={() => router.push(`/user/${item.memberDetail.memberId}`)}>
          <View className="border border-disabledColor px-4 pt-5 pb-[18px] rounded-xl mx-5">
            <View className="flex flex-row items-center justify-between">
              <Text className="text-16 font-600 leading-16 text-basicFont mx-2">
                {item.memberDetail.nickname}
              </Text>
              <Text className="text-16 font-500 leading-16 text-mainColor">
                {item.equality ?? '??'}%
              </Text>
            </View>

            <View className="h-[1px] bg-[#F6F6F6] my-4" />

            <View className="gap-y-[20px]">
              <View className="flex flex-row justify-between">
                {item.preferenceStats.map((chip, index) => (
                  <View key={index} className="flex flex-col items-center w-[66px] mx-2 gap-y-1.5">
                    {getLifeStyleIcon(chip.stat, chip.color as 'blue' | 'white' | 'red')}
                    <View>
                      <Text className="text-12 font-500 leading-12 text-disabledFont text-center">
                        {getLifeStyleLabel(chip.stat)}
                      </Text>
                      <Text className="text-12 font-600 leading-12 text-basicFont text-center">
                        {getLifeStyleValue(chip.stat, chip.value)}
                      </Text>
                    </View>
                  </View>
                ))}
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

export default RoomMateComponent;
