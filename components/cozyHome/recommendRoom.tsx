import { useRouter } from 'expo-router';
import React, { Fragment } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';

import GrayArrowIcon from '@/assets/images/common/grayArrow.svg';
import { RoomCard, RoomCardSkeleton } from '@/components/common/room';
import { useGetHomeRecommendRoomList } from '@/hooks/room-recommend/room-recommend';
import { useTracker } from '@/providers/TrackerProvider';
import { ButtonEvent, EventCategory, GestureEvent } from '@/utils/ga/eventEnum';
import { useMemberStore } from '@/zustand/store';

import OpacityPressable from '../opacityPressable';

export default function RecommendRoomComponent() {
  const router = useRouter();
  const { trackButton, trackGesture } = useTracker();

  const { memberInfo } = useMemberStore();

  const width = Dimensions.get('screen').width;

  const progress = useSharedValue<number>(0);

  const { data, isLoading } = useGetHomeRecommendRoomList();

  const handleMore = () => {
    trackButton(ButtonEvent.room_more, EventCategory.home_content);
    router.push('/room/recommendRoom');
  };

  const handleRoomPress = () => {
    trackButton(ButtonEvent.room_component, EventCategory.home_content);
  };

  return (
    <View className="gap-y-[16px]">
      <View className="flex flex-row justify-between items-center px-[20px]">
        <View className="gap-y-[4px] ml-[4px]">
          <Text className="Semibold18 text-emphasizedFont">{memberInfo?.nickname ?? ''}님과</Text>
          <Text className="Semibold18 text-emphasizedFont">꼭 맞는 방을 추천해드릴게요</Text>
        </View>

        <OpacityPressable onPress={handleMore}>
          <View className="flex flex-row items-center gap-x-[4px]">
            <Text className="Semibold12 text-disabledFont">더보기</Text>
            <GrayArrowIcon />
          </View>
        </OpacityPressable>
      </View>

      {isLoading || data === undefined ? (
        <Fragment>
          <Carousel
            width={width}
            loop={true}
            data={Array.from({ length: 5 }, (_, i) => i + 1)}
            height={210}
            snapEnabled={true}
            pagingEnabled={true}
            autoPlay={false}
            onProgressChange={progress}
            renderItem={({ item }) => <RoomCardSkeleton key={item} />}
          />
          <Pagination.Custom
            progress={progress}
            data={Array.from({ length: 5 }, (_, i) => i + 1)}
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
      ) : data.result.result.length !== 0 ? (
        <Fragment>
          <Carousel
            width={width}
            loop={true}
            data={data.result.result}
            height={210}
            snapEnabled={true}
            pagingEnabled={true}
            autoPlay={false}
            onProgressChange={progress}
            renderItem={({ item }) => (
              <RoomCard key={item.roomId} data={item} onPress={handleRoomPress} />
            )}
            onSnapToItem={(index) => {
              trackGesture(GestureEvent.room_swipe, EventCategory.home_content, {
                index,
                roomId: data.result.result[index]?.roomId,
              });
            }}
          />
          <Pagination.Custom
            progress={progress}
            data={data.result.result}
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
  );
}
