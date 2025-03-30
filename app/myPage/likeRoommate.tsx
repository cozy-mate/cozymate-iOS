import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import { useGetMemberLikeList } from '@/hooks/member-favorite/member-favorite';
import { useGetRoomLikeList } from '@/hooks/room-favorite/room-favorite';
import { getLifeStyleIcon, getLifeStyleLabel, getLifeStyleValue } from '@/utils/lifeStyle';

export default function LikeRoommate() {
  const router = useRouter();

  const [type, setType] = useState<string>('MEMBER');

  const {
    data: memberList,
    hasNextPage: memberHasNextPage,
    fetchNextPage: memberFetchNextPage,
  } = useGetMemberLikeList();

  const loadMoreMember = () => {
    if (memberHasNextPage) {
      memberFetchNextPage();
    }
  };

  const {
    data: roomList,
    hasNextPage: roomHasNextPage,
    fetchNextPage: roomFetchNextPage,
  } = useGetRoomLikeList();

  const loadMoreRoom = () => {
    if (roomHasNextPage) {
      roomFetchNextPage();
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
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-[20px] gap-y-[20px] flex-1">
        <View className="gap-y-[16px]">
          <BackHeaderComponent />

          <View className="flex flex-row items-center gap-x-[8px]">
            <Pressable
              onPress={() => setType('MEMBER')}
              className={`border rounded-lg px-[14px] py-[8px] ${type === 'MEMBER' ? 'border-mainColor bg-subColor1' : 'border-disabledColor bg-white'}`}
            >
              <Text
                className={`text-12 leading-12 ${type === 'MEMBER' ? 'font-600 text-mainColor' : 'font-500 text-disabledFont'}`}
              >
                내가 찜한 룸메이트
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setType('ROOM')}
              className={`border rounded-lg px-[14px] py-[8px] ${type === 'ROOM' ? 'border-mainColor bg-subColor1' : 'border-disabledColor bg-white'}`}
            >
              <Text
                className={`text-12 leading-12 ${type === 'ROOM' ? 'font-600 text-mainColor' : 'font-500 text-disabledFont'}`}
              >
                내가 찜한 방
              </Text>
            </Pressable>
          </View>
        </View>

        <View className="flex-1">
          {type === 'MEMBER' && (
            <FlatList
              ItemSeparatorComponent={() => <View className="h-[24px]" />}
              onEndReached={loadMoreMember}
              onEndReachedThreshold={0.5}
              data={memberList?.pages?.flatMap((page) => page.result.result)}
              renderItem={({ item }) => (
                <Pressable
                  key={item.memberFavoriteId}
                  onPress={() =>
                    router.push(`/user/${item.memberStatPreferenceDetail.memberDetail.memberId}`)
                  }
                  className="border border-disabledColor px-4 pt-5 pb-[18px] rounded-xl"
                >
                  <View className="flex flex-row items-center justify-between">
                    <Text className="text-16 font-600 leading-16 text-basicFont mx-2">
                      {item.memberStatPreferenceDetail.memberDetail.nickname}
                    </Text>
                    <Text className="text-16 font-500 leading-16 text-mainColor">
                      {item.memberStatPreferenceDetail.equality ?? '??'}%
                    </Text>
                  </View>

                  <View className="h-[1px] bg-[#F6F6F6] my-4" />

                  <View className="flex flex-row justify-between">
                    {item.memberStatPreferenceDetail.preferenceStats.map((chip, index) => (
                      <View
                        key={index}
                        className="flex flex-col items-center w-[50px] mx-2 gap-y-1.5"
                      >
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
                </Pressable>
              )}
            />
          )}

          {type === 'ROOM' && (
            <FlatList
              ItemSeparatorComponent={() => <View className="h-[24px]" />}
              onEndReached={loadMoreRoom}
              onEndReachedThreshold={0.5}
              data={roomList?.pages?.flatMap((page) => page.result.result)}
              renderItem={({ item }) => (
                <Pressable
                  key={item.roomFavoriteId}
                  onPress={() => router.push(`/room/${item.roomId}`)}
                >
                  <View className="border border-disabledColor px-4 pt-5 pb-[18px] rounded-xl">
                    <View className="flex flex-row items-center justify-between">
                      <Text className="text-16 font-600 leading-16 text-basicFont mx-2">
                        {item.name}
                      </Text>
                      <Text className="text-16 font-500 leading-16 text-mainColor">
                        {item.equality ?? '??'}%
                      </Text>
                    </View>

                    <View className="h-[1px] bg-[#F6F6F6] my-4" />

                    <View className="gap-y-[24px]">
                      <View className="flex flex-row justify-between">
                        {item.preferenceMatchCountList.map((chip, index) => (
                          <View
                            key={index}
                            className="flex flex-col items-center w-[50px] mx-2 gap-y-1.5"
                          >
                            {getLifeStyleIcon(
                              chip.preferenceName,
                              getChipColor(item.currentMateNum, chip.count),
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
                          {item.hashtagList.map((hash, index) => (
                            <View key={index} className="py-0.5 px-2 rounded bg-colorBox">
                              <Text className="text-12 font-500 leading-12 text-colorFont">
                                #{hash}
                              </Text>
                            </View>
                          ))}
                        </View>

                        <Text className="text-12 font-500 leading-12 text-disabledFont">
                          {item.currentMateNum} / {item.maxMateNum}명
                        </Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
              )}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
