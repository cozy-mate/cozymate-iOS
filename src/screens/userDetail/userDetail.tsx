import React, { useState, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, View, Pressable, ScrollView, Dimensions, SafeAreaView } from 'react-native';

// import ListView from '@components/userDetail/listView';
import TableView from '@components/userDetail/tableView';

import { useHasRoomStore } from '@zustand/room/room';

import { useGetUserDetailData, useGetOtherDetailData } from '@hooks/api/member-stat';

import { getProfileImage } from '@utils/profileImage';

import { UserDetailScreenProps } from '@type/param/stack';

import BackButton from '@assets/backButton.svg';
import HeartIcon from '@assets/userDetail/heart.svg';
import MessageIcon from '@assets/userDetail/message.svg';
import Background from '@assets/userDetail/background.svg';
import NotSelectedListIcon from '@assets/userDetail/listIcon.svg';
import NotSelectedTableIcon from '@assets/userDetail/tableIcon.svg';
import SelectedListIcon from '@assets/userDetail/coloredListIcon.svg';
import SelectedTableIcon from '@assets/userDetail/coloredTableIcon.svg';

const UserDetailScreen = ({ navigation, route }: UserDetailScreenProps) => {
  const { memberId } = route.params;

  const { myRoom } = useHasRoomStore();

  const { bottom } = useSafeAreaInsets();
  const width = Dimensions.get('screen').width;

  const [type, setType] = useState<string>('table');

  const { data: mylifestyledata } = useGetUserDetailData();
  const { data: otherlifestyledata } = useGetOtherDetailData(memberId);

  const toBack = () => {
    navigation.goBack();
  };

  const toChatRoom = () => {
    navigation.navigate('SendChatScreen', { recipientId: memberId });
  };

  const handleList = useCallback(() => {
    setType('list');
  }, []);

  const handleTable = useCallback(() => {
    setType('table');
  }, []);

  const [isInvited, setIsInvited] = useState<boolean>(false);

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="bg-sub1" />
      <View className="flex-1">
        <View className="flex flex-1 flex-col bg-sub1">
          {/* 상단 헤더 */}
          <View className="mb-[15px] mt-2 flex flex-row justify-between pl-3 pr-5">
            <Background width={width} style={{ position: 'absolute', zIndex: 99 }} />
            <Pressable onPress={toBack} style={{ zIndex: 100 }}>
              <BackButton />
            </Pressable>
            <View className="flex flex-row">
              <Pressable onPress={toChatRoom}>
                <MessageIcon />
              </Pressable>
              <Pressable>
                <HeartIcon />
              </Pressable>
            </View>
          </View>

          <View className="mb-[22px] flex flex-row items-center px-[25px]">
            {/* {getProfileImage(otherUserBasicData.memberPersona, 40, 40)} */}
            {getProfileImage(1, 40, 40)}
            <View className="ml-2 flex flex-col">
              <Text className="mb-1 text-base font-semibold leading-5 text-emphasizedFont">
                {/* {otherUserBasicData.memberNickName} */}
                닉네임
              </Text>
              <Text className="text-sm font-medium text-basicFont">
                {/* 나와의 일치율 {otherUserBasicData.equality}% */}
                나와의 일치율 95%
              </Text>
            </View>
          </View>

          <View className="flex-1 rounded-t-[20px] bg-white pt-3">
            <View className="flex flex-row items-center justify-center">
              {/* 리스트로 보기 */}
              <Pressable
                onPress={handleList}
                className="flex flex-row items-center justify-center p-4"
              >
                <View className="flex">
                  {type === 'list' ? <SelectedListIcon /> : <NotSelectedListIcon />}
                </View>
                <Text
                  className={`ml-1.5 text-sm ${
                    type === 'list' ? 'font-semibold text-main1' : 'font-medium text-disabledFont'
                  }`}
                >
                  리스트로 보기
                </Text>
              </Pressable>

              <View className="mx-[18px] h-6 w-px bg-disabled" />

              {/* 표로 보기 */}
              <Pressable
                onPress={handleTable}
                className="flex flex-row items-center justify-center p-4"
              >
                <View className="flex">
                  {type === 'table' ? <SelectedTableIcon /> : <NotSelectedTableIcon />}
                </View>
                <Text
                  className={`ml-1.5 text-sm ${
                    type === 'table' ? 'font-semibold text-main1' : 'font-medium text-disabledFont'
                  }`}
                >
                  표로 보기
                </Text>
              </Pressable>
            </View>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ paddingBottom: bottom }}>
              {/* {type === 'list' && (
                  <ListView userBasicData={otherUserBasicData} userData={otherlifestyledata} />
                )} */}
              {type === 'table' && (
                <TableView
                  userData={mylifestyledata.result}
                  otherUserData={otherlifestyledata.result}
                />
              )}
            </ScrollView>
          </View>
        </View>

        <View className="px-5">
          {/* 순서대로 1. 방이 있고 초대한 경우 2. 방이 있고 초대하지 않은 경우 3. 방이 없는 경우 */}
          <Pressable
            onPress={() => setIsInvited(!isInvited)}
            className={`fixed bottom-[42px] rounded-xl px-5 py-4 ${
              myRoom.hasRoom
                ? isInvited
                  ? 'border border-main1 bg-colorBox'
                  : 'bg-main1'
                : 'bg-[#c4c4c4]'
            }`}
          >
            <Text
              className={`text-center text-base font-semibold ${
                myRoom.hasRoom ? (isInvited ? 'text-main1' : 'text-white') : 'text-white'
              }`}
            >
              {myRoom.hasRoom
                ? isInvited
                  ? '초대 취소하기'
                  : '내 방으로 초대하기'
                : '내 방으로 초대하기'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default UserDetailScreen;
