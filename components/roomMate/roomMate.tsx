import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';

import BlueRightArrowIcon from '@/assets/images/common/blueRightArrow.svg';
import MagnifierIcon from '@/assets/images/common/magnifier.svg';
import StarImage from '@/assets/images/roomMate/star.svg';
import { LifeStyleValue } from '@/constants/items/lifeStyle';
import { useGetMemberList, useGetRandomMemberList } from '@/hooks/member-stat/member-stat';
import { useTracker } from '@/providers/TrackerProvider';
import { ButtonEvent, EventCategory } from '@/utils/ga/eventEnum';
import { useMemberStore } from '@/zustand/member/member';

import ChipList from '../common/chipList';
import UserComponent from '../user';

const RoomMateComponent: React.FC = () => {
  const router = useRouter();

  const { memberState } = useMemberStore();

  const [filterList, setFilterList] = useState<LifeStyleValue[]>([]);

  const { trackButton } = useTracker();

  const { data: randomMemberList } = useGetRandomMemberList();
  const { data, hasNextPage, fetchNextPage } = useGetMemberList(filterList);

  const memberList =
    // 라이프스타일이 있는 사용자
    data !== undefined
      ? // 추천 룸메이트 데이터 사용
        data?.pages?.flatMap((page) => page.result.memberList)
      : // 필터링을 선택하지 않은 경우
        filterList.length === 0
        ? // 랜덤 룸메이트 데이터 사용
          randomMemberList?.result.memberList
        : [];

  const handleValue = (value: LifeStyleValue) => {
    setFilterList((prev) => {
      if (prev.includes(value)) {
        trackButton(ButtonEvent[`chip_${value}`], EventCategory.content_mate, {
          isActivated: !prev.includes(value),
          activeChipCount: prev.filter((item) => item !== value).length,
        });
        return prev.filter((item) => item !== value);
      } else {
        trackButton(ButtonEvent[`chip_${value}`], EventCategory.content_mate, {
          isActivated: prev.includes(value),
          activeChipCount: prev.filter((item) => item !== value).length,
        });
        return [...prev, value];
      }
    });
  };

  const loadMoreList = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const onPressLifeStyle = () => {
    trackButton(ButtonEvent.life_style_component, EventCategory.content_mate);
    router.push('/lifeStyle/onboarding');
  };

  const onPressUser = () => {
    trackButton(ButtonEvent.mate_component, EventCategory.content_mate);
  };

  return (
    <FlatList
      data={memberList}
      renderItem={({ item }) => <UserComponent userData={item} onPress={onPressUser} />}
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

          <Pressable
            onPress={() => router.push('/user/search')}
            className="bg-colorBox rounded-xl px-[4px] py-[8px] flex flex-row items-center"
          >
            <View className="p-[8px]">
              <MagnifierIcon />
            </View>
            <Text className="text-14 font-500 leading-14 text-disabledFont">
              룸메이트 닉네임을 검색해보세요
            </Text>
          </Pressable>

          <ChipList value={filterList} handleValue={handleValue} />
        </View>
      )}
      ListEmptyComponent={() =>
        data !== undefined ? (
          <View className="flex-1">
            <View className="w-full h-full flex items-center justify-center">
              <View className="gap-y-[20px] pb-[50px]">
                <Text className="text-14 font-500 leading-14 text-disabledFont text-center">
                  아직 함께할 룸메이트가 없네요.{'\n'}곧 당신과 잘 맞는 룸메이트가 찾아올 거예요.
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View className="pt-[32px] pb-[16px] flex items-center mt-[16px]">
            <StarImage />
            <View className="p-[16px] flex items-center">
              <View>
                <Text className="text-12 font-500 leading-12 text-disabledFont text-center">
                  {memberState.nickname}님, 라이프스타일을 입력하면
                </Text>
                <Text className="text-12 font-500 leading-12 text-disabledFont text-center">
                  나와 똑같은 답변을 한 사용자를 확인할 수 있어요!
                </Text>
              </View>
              <Pressable
                onPress={onPressLifeStyle}
                className="p-[8px] flex flex-row items-center gap-x-[8px]"
              >
                <Text className="text-16 font-600 leading-16 text-mainColor text-center">
                  라이프스타일 입력하러가기
                </Text>
                <BlueRightArrowIcon />
              </Pressable>
            </View>
          </View>
        )
      }
      ItemSeparatorComponent={() => <View className="h-[24px]" />}
      contentContainerStyle={{ paddingBottom: 60, flexGrow: 1 }}
      onEndReached={randomMemberList ? undefined : loadMoreList}
      onEndReachedThreshold={randomMemberList ? 0 : 0.5}
    />
  );
};

export default RoomMateComponent;
