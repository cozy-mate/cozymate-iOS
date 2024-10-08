import { useRecoilValue } from 'recoil';
import Config from 'react-native-config';
import React, { useState, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, View, Image, Pressable, ScrollView, SafeAreaView } from 'react-native';

import ListView from '@components/userDetail/listView';
import TableView from '@components/userDetail/tableView';

import { OtherBasicData, OtherLifeStyleState } from '@recoil/recoil';

import { useGetUserDetailData } from '@hooks/api/member-stat';

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

const UserDetailScreen = ({ navigation }: UserDetailScreenProps) => {
  const { bottom } = useSafeAreaInsets();

  const [type, setType] = useState<string>('list');

  const { data: mylifestyledata, refetch: refetchMyLifeStyle } = useGetUserDetailData();

  const otherUserBasicData = useRecoilValue(OtherBasicData);
  const otherUserData = useRecoilValue(OtherLifeStyleState);

  const toBack = () => {
    navigation.goBack();
  };

  const toChatRoom = () => {
    navigation.navigate('SendChatScreen', { recipientId: otherUserBasicData.memberId });
  };

  const handleList = useCallback(() => {
    setType('list');
  }, []);

  const handleTable = useCallback(() => {
    setType('table');
  }, []);

  return (
    <>
      <SafeAreaView className="flex-1 bg-sub1">
        <Background style={{ position: 'absolute' }} />
        <View className="flex-1">
          <View className="flex flex-1 flex-col">
            {/* 상단 헤더 */}
            <View className="mb-[15px] mt-2 flex flex-row justify-between px-5">
              <Pressable onPress={toBack}>
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
              {getProfileImage(otherUserBasicData.memberPersona, 40, 40)}
              <View className="ml-2 flex flex-col">
                <Text className="mb-1 text-base font-semibold leading-5 text-emphasizedFont">
                  {otherUserBasicData.memberNickName}
                </Text>
                <Text className="text-sm font-medium text-basicFont">
                  나와의 일치율 {otherUserBasicData.equality}%
                </Text>
              </View>
            </View>

            <View className="flex-1 rounded-t-[20px] bg-white pt-1">
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
                      type === 'table'
                        ? 'font-semibold text-main1'
                        : 'font-medium text-disabledFont'
                    }`}
                  >
                    표로 보기
                  </Text>
                </Pressable>
              </View>

              <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ paddingBottom: bottom }}>
                {type === 'list' && (
                  <ListView userBasicData={otherUserBasicData} userData={otherUserData} />
                )}
                {type === 'table' && (
                  <TableView userData={mylifestyledata.result} otherUserData={otherUserData} />
                )}
              </ScrollView>
            </View>
          </View>

          <Pressable className="absolute bottom-0 w-full bg-white px-5">
            <View className="items-center rounded-xl bg-main1 py-4">
              <Text className="text-white">코지메이트 요청</Text>
            </View>
          </Pressable>
        </View>
      </SafeAreaView>
      <SafeAreaView className="bg-white" />
    </>
  );
};

export default UserDetailScreen;
