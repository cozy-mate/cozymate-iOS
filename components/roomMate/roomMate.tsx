import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';

import BlueRightArrowIcon from '@/assets/images/common/blueRightArrow.svg';
import MagnifierIcon from '@/assets/images/common/magnifier.svg';
import StarImage from '@/assets/images/roomMate/star.svg';
import { useGetMemberList, useGetRandomMemberList } from '@/hooks/member-stat/member-stat';
import { useMemberStore } from '@/zustand/member/member';

import ChipList from '../common/chipList';
import UserComponent from '../user';

const RoomMateComponent: React.FC = () => {
  const router = useRouter();

  const { memberState } = useMemberStore();

  const [filterList, setFilterList] = useState<string[]>([]);

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
      data={memberList}
      renderItem={({ item }) => <UserComponent userData={item} />}
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
          <View>
            <Text>없음</Text>
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
                onPress={() => router.push('/lifeStyle/onboarding')}
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
      contentContainerStyle={{ paddingBottom: 60 }}
      onEndReached={randomMemberList ? undefined : loadMoreList}
      onEndReachedThreshold={randomMemberList ? 0 : 0.5}
    />
  );
};

export default RoomMateComponent;
