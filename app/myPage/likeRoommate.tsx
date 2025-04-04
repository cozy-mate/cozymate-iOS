import { useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import RoomComponent from '@/components/room';
import UserComponent from '@/components/user';
import { useGetMemberLikeList } from '@/hooks/member-favorite/member-favorite';
import { useGetRoomLikeList } from '@/hooks/room-favorite/room-favorite';

export default function LikeRoommate() {
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

  console.log(roomList?.pages?.flatMap((page) => page.result.result));

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="gap-y-[20px] flex-1">
        <View className="gap-y-[16px] px-[20px]">
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
              data={memberList?.pages?.flatMap((page) => page.result.result)}
              renderItem={({ item }) => (
                <UserComponent userData={item.memberStatPreferenceDetail} />
              )}
              ItemSeparatorComponent={() => <View className="h-[24px]" />}
              onEndReached={loadMoreMember}
              onEndReachedThreshold={0.5}
            />
          )}

          {type === 'ROOM' && (
            <FlatList
              data={roomList?.pages?.flatMap((page) => page.result.result)}
              renderItem={({ item }) => <RoomComponent roomData={item} />}
              ItemSeparatorComponent={() => <View className="h-[24px]" />}
              onEndReached={loadMoreRoom}
              onEndReachedThreshold={0.5}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
