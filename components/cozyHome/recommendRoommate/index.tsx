import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';

import GrayArrowIcon from '@/assets/images/common/grayArrow.svg';
import { useGetHomeMemberList, useGetRandomMemberList } from '@/hooks/member-stat/member-stat';
import { getLifeStyleIcon, getLifeStyleLabel, getLifeStyleValue } from '@/utils/lifeStyle';
import { useMemberStore } from '@/zustand/member/member';

const RecommendRoommateComponent: React.FC = () => {
  const router = useRouter();

  const { memberState } = useMemberStore();

  const width = Dimensions.get('screen').width;

  const progress = useSharedValue<number>(0);

  const { data: randomMemberList } = useGetRandomMemberList();
  const { data: recommendMemberList } = useGetHomeMemberList();

  const memberList = randomMemberList?.result.memberList ?? recommendMemberList?.result.memberList;

  return (
    memberList !== undefined && (
      <View className="gap-y-[16px]">
        <View className="flex flex-row justify-between items-center px-[20px]">
          <View className="gap-y-[4px] ml-[4px]">
            <Text className="text-18 font-600 leading-18 text-emphasizedFont">
              {memberState.nickname}님과
            </Text>
            <Text className="text-18 font-600 leading-18 text-emphasizedFont">
              꼭 맞는 룸메이트를 추천해드릴게요
            </Text>
          </View>

          <Pressable onPress={() => router.push('/user/roomMate')}>
            <View className="flex flex-row items-center gap-x-[4px]">
              <Text className="text-12 font-600 leading-12 text-disabledFont">더보기</Text>
              <GrayArrowIcon />
            </View>
          </Pressable>
        </View>

        <Carousel
          width={width}
          loop={true}
          data={memberList}
          height={156}
          snapEnabled={true}
          pagingEnabled={true}
          autoPlay={false}
          onProgressChange={progress}
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
                      <View
                        key={index}
                        className="flex flex-col items-center w-[66px] mx-2 gap-y-1.5"
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
                </View>
              </View>
            </Pressable>
          )}
        />

        <Pagination.Custom
          progress={progress}
          data={memberList}
          dotStyle={{ backgroundColor: '#E6E6E6', borderRadius: 9999, width: 8, height: 8 }}
          activeDotStyle={{
            backgroundColor: '#68A4FF',
            borderRadius: 9999,
            width: 16,
            height: 8,
            overflow: 'hidden',
          }}
          containerStyle={{ gap: 8 }}
        />
      </View>
    )
  );
};

export default RecommendRoommateComponent;
