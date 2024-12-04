import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Text, View, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import LoadingComponent from '@components/loading/loading';

import { useHasRoomStore, useRoomInfoStore } from '@zustand/room/room';

import { useGetRoomData } from '@hooks/api/room';
import { useGetRoomLog } from '@hooks/api/room-log';

import { onCopyAddress } from '@utils/clipboard';
import { getProfileImage } from '@utils/profileImage';

import { RoomMainScreenProps } from '@type/param/stack';

import CopyIcon from '@assets/roomMain/copyIcon.svg';
import Background from '@assets/roomMain/background.svg';
import CozyBotIcon from '@assets/roomMain/cozyBotIcon.svg';
import ColorRightArrow from '@assets/roomMain/colorRightArrow.svg';

const RoomMain = ({ navigation }: RoomMainScreenProps) => {
  const { myRoom } = useHasRoomStore();
  const { roomInfo } = useRoomInfoStore();

  const { bottom } = useSafeAreaInsets();

  const { data: roomData } = useGetRoomData(myRoom.roomId);

  const { fetchNextPage, hasNextPage, data: roomLogs } = useGetRoomLog(myRoom.roomId);
  // 무한 스크롤
  const loadMoreList = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const toRoomDetail = () => {
    navigation.navigate('RoomDetailScreen', { roomId: myRoom.roomId });
  };

  const toEdit = () => {
    navigation.navigate('EditRoomScreen', { id: myRoom.roomId, type: roomInfo.roomType });
  };

  return (
    <View className="flex-1 bg-sub1">
      <Background style={{ position: 'absolute' }} />
      <View className="mt-[70px] flex px-5">
        {/* 헤더 */}
        <Pressable className="mb-2 flex flex-row items-center" onPress={toRoomDetail}>
          <View className="mr-2 flex flex-row">
            {roomData.result.mateDetailList.map((icon, index) => (
              <View
                key={index}
                className="-ml-1 rounded-full"
                style={{
                  shadowColor: '#606060',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.25,
                  shadowRadius: 2,
                  backgroundColor: 'white',
                }}
              >
                {getProfileImage(icon.persona, 20, 20)}
              </View>
            ))}
          </View>
          <ColorRightArrow />
        </Pressable>

        <View className="mb-16 flex flex-col items-start">
          <Text className="text-lg font-semibold text-basicFont">여기는</Text>
          <View className="flex flex-row">
            <Text className="mb-2 text-lg font-semibold text-main1">
              {roomData.result.name}
              <Text className="text-basicFont">의 방이에요!</Text>
            </Text>
          </View>

          {roomInfo.inviteCode && (
            <Pressable className="flex" onPress={() => onCopyAddress(roomData.result.inviteCode)}>
              <View className="flex flex-row items-center justify-start rounded-xl bg-white px-4 py-2 opacity-60">
                <Text className="text-xs font-medium text-colorFont">
                  {roomData.result.inviteCode}
                </Text>
                <CopyIcon />
              </View>
            </Pressable>
          )}
        </View>
      </View>

      <View className="relative flex-1 flex-col rounded-t-[40px] bg-white px-5 pb-5 pt-8">
        <View className="absolute right-2 top-[-120px]">
          <Pressable onPress={toEdit} disabled={!roomInfo.isRoomManager}>
            {getProfileImage(roomData.result.persona, 140, 140)}
          </Pressable>
        </View>
        <ScrollView
          contentContainerStyle={{ paddingBottom: bottom + 40 }}
          onScrollEndDrag={loadMoreList}
        >
          {roomLogs?.pages?.flatMap((page) =>
            page.result.result.map((data, index) => (
              <View
                key={index}
                className={`border-b border-b-[#F2F1FA] px-1 py-5 ${
                  index === page.result.result.length - 1 && 'border-b-0'
                }`}
              >
                <CozyBotIcon />
                <View className="mt-2">
                  <Text className="mb-[2px] flex flex-row flex-nowrap">
                    {data.content.split(/{(.*?)}/).map((part, i) => (
                      <Text
                        key={i}
                        className={`text-sm font-medium ${
                          i % 2 === 1 ? 'font-semibold text-main1' : 'text-basicFont'
                        }`}
                      >
                        {part}
                      </Text>
                    ))}
                  </Text>
                  <Text className="mt-[2px] text-xs font-medium text-disabledFont">
                    {data.createdAt}
                  </Text>
                </View>
              </View>
            )),
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const RoomMainScreen = ({ navigation, route }: RoomMainScreenProps) => {
  return (
    <ErrorBoundary
      fallback={
        <View className="h-full w-full flex-1 items-center justify-center">
          <Text>Error loading CozyHome</Text>
        </View>
      }
    >
      <Suspense fallback={<LoadingComponent />}>
        <RoomMain navigation={navigation} route={route} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default RoomMainScreen;
