import { useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import DoneIcon from '@/assets/images/roleNRule/done.svg';
import NotDoneIcon from '@/assets/images/roleNRule/notDone.svg';
import BackHeaderComponent from '@/components/common/backHeader';
import NoLifeStyleComponent from '@/components/common/noLifeStyle';
import NoRoommateComponent from '@/components/common/noRoommate';
import PreferenceChipListComponent from '@/components/common/preferenceChipList';
import SearchButtonComponent from '@/components/common/searchButton';
import BasicUserItem from '@/components/common/userItem/basicUserItem';
import { LifeStyleValue } from '@/constants/items/lifeStyle';
import { useGetMemberList, useGetRandomMemberList } from '@/hooks/member-stat/member-stat';
import { useTracker } from '@/providers/TrackerProvider';
import { ButtonEvent, EventCategory } from '@/utils/ga/eventEnum';

export default function Roommate() {
  const { trackButton } = useTracker();

  const [filterList, setFilterList] = useState<LifeStyleValue[]>([]);
  const [hasRoom, setHasRoom] = useState<boolean>(false);

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

  const { data: randomMemberList } = useGetRandomMemberList();
  const { data, hasNextPage, fetchNextPage } = useGetMemberList(filterList, hasRoom);

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

  const onPressUser = () => {
    trackButton(ButtonEvent.mate_component, EventCategory.content_mate);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-[20px]">
        <BackHeaderComponent />
      </View>

      <FlatList
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 60 }}
        data={memberList}
        renderItem={({ item }) => (
          <BasicUserItem key={item.memberDetail.memberId} userData={item} onPress={onPressUser} />
        )}
        ItemSeparatorComponent={() => <View className="h-[24px]" />}
        ListHeaderComponent={() => (
          <View className="px-[20px] gap-y-[16px]">
            <View className="gap-y-[2px] mx-[8px] mt-[24px]">
              <Text className="Semibold18 text-emphasizedFont">원하는 칩을 선택하면</Text>
              <Text className="Semibold18 text-emphasizedFont">
                나와 똑같은 답변을 한 사용자만 떠요!
              </Text>
            </View>

            <SearchButtonComponent type="user" />

            <PreferenceChipListComponent value={filterList} handleValue={handleValue} />

            <View className="flex flex-row justify-end items-center mt-[16px] mb-[8px]">
              <Pressable onPress={() => setHasRoom(!hasRoom)} className="p-[9px]">
                {hasRoom ? <DoneIcon /> : <NotDoneIcon />}
              </Pressable>
              <Text className="Medium14 text-basicFont">방이 없는 사용자만 보기</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() =>
          data !== undefined ? <NoRoommateComponent /> : <NoLifeStyleComponent />
        }
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
}
