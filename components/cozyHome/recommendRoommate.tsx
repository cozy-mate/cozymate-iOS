import { useRouter } from 'expo-router';
import React, { Fragment } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';

import GrayArrowIcon from '@/assets/images/common/grayArrow.svg';
import BasicUserItem from '@/components/common/userItem/basicUserItem';
import { useGetHomeMemberList, useGetRandomMemberList } from '@/hooks/member-stat/member-stat';
import { useTracker } from '@/providers/TrackerProvider';
import { ButtonEvent, EventCategory, GestureEvent } from '@/utils/ga/eventEnum';
import { useMemberStore } from '@/zustand/store';

const RecommendRoommateComponent: React.FC = () => {
  const router = useRouter();

  const { memberInfo, hasLifeStyle } = useMemberStore();

  const { trackButton, trackGesture } = useTracker();

  const width = Dimensions.get('screen').width;

  const progress = useSharedValue<number>(0);

  const { data: randomMemberList } = useGetRandomMemberList();
  const { data: recommendMemberList } = useGetHomeMemberList();

  const memberList =
    hasLifeStyle && recommendMemberList?.result.memberList
      ? recommendMemberList.result.memberList
      : randomMemberList?.result.memberList;

  const handleMore = () => {
    trackButton(ButtonEvent.mate_more, EventCategory.home_content);
    router.push('/user/roomMate');
  };

  const handleUserPress = () => {
    trackButton(ButtonEvent.mate_component, EventCategory.home_content);
  };

  return (
    memberList !== undefined && (
      <View>
        <View className="gap-y-[16px]">
          <View className="flex flex-row justify-between items-center px-[20px]">
            <View className="gap-y-[4px] ml-[4px]">
              <Text className="Semibold18 text-emphasizedFont">{memberInfo?.nickname}님과</Text>
              <Text className="Semibold18 text-emphasizedFont">
                꼭 맞는 룸메이트를 추천해드릴게요
              </Text>
            </View>

            <Pressable onPress={handleMore}>
              <View className="flex flex-row items-center gap-x-[4px]">
                <Text className="Semibold12 text-disabledFont">더보기</Text>
                <GrayArrowIcon />
              </View>
            </Pressable>
          </View>

          {memberList.length !== 0 ? (
            <Fragment>
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
                  <BasicUserItem
                    key={item.memberDetail.memberId}
                    userData={item}
                    onPress={handleUserPress}
                  />
                )}
                onSnapToItem={(index) => {
                  trackGesture(GestureEvent.mate_swipe, EventCategory.home_content, {
                    index,
                    userId: memberList[index]?.memberDetail?.memberId,
                  });
                }}
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
            </Fragment>
          ) : (
            <View className="mx-[20px] border border-disabledColor rounded-xl h-[154px] flex justify-center items-center">
              <Text className="Medium14 text-disabledFont text-center">
                아직 함께할 룸메이트가 없네요.{'\n'}곧 당신과 잘 맞는 룸메이트가 찾아올 거예요.
              </Text>
            </View>
          )}
        </View>

        <View className="bg-[#F7F9FA] w-full h-[10px] mt-[24px]" />
      </View>
    )
  );
};

export default RecommendRoommateComponent;
