import React, { useCallback, useState } from 'react';
import { Image, Pressable, SafeAreaView, Text, View, ScrollView } from 'react-native';

import { UserDetailScreenProps } from '@type/param/loginStack';

import ListView from '@components/userDetail/listView';
import TableView from '@components/userDetail/tableView';

import Background from '@assets/userDetail/background.svg';

import BackButton from '@assets/backButton.svg';
import MessageIcon from '@assets/message.svg';
import HeartIcon from '@assets/heart.svg';

import SelectedListIcon from '@assets/userDetail/coloredListIcon.svg';
import SelectedTableIcon from '@assets/userDetail/coloredTableIcon.svg';
import NotSelectedListIcon from '@assets/userDetail/listIcon.svg';
import NotSelectedTableIcon from '@assets/userDetail/tableIcon.svg';
import { useRecoilValue } from 'recoil';
import {
  MyLifeStyleState,
  OtherBasicData,
  OtherLifeStyleState,
  profileState,
} from '@recoil/recoil';
import Config from 'react-native-config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const UserDetailScreen = ({ navigation }: UserDetailScreenProps) => {
  const { bottom } = useSafeAreaInsets();

  const [type, setType] = useState<string>('list');

  const userBasicData = useRecoilValue(profileState);
  const userData = useRecoilValue(MyLifeStyleState);
  const otherUserBasicData = useRecoilValue(OtherBasicData);
  const otherUserData = useRecoilValue(OtherLifeStyleState);

  const toBack = () => {
    navigation.goBack();
  };

  const handleList = useCallback(() => {
    setType('list');
  }, []);

  const handleTable = useCallback(() => {
    setType('table');
  }, []);

  return (
    <>
      <SafeAreaView className="flex-1 bg-[#CADFFF]">
        <Background style={{ position: 'absolute' }} />
        <View className="flex-1">
          <View className="flex flex-col flex-1">
            {/* 상단 헤더 */}
            <View className="flex flex-row justify-between px-5 mt-2 mb-[15px]">
              <Pressable onPress={toBack}>
                <BackButton />
              </Pressable>
              <View className="flex flex-row">
                <Pressable>
                  <MessageIcon />
                </Pressable>
                <Pressable>
                  <HeartIcon />
                </Pressable>
              </View>
            </View>

            <View className="flex flex-row items-center mb-[22px] px-[25px]">
              <Image
                source={{
                  uri: `${Config.S3_IMAGE_URL}/persona/png/${otherUserBasicData.memberPersona}.png`,
                }}
                style={{ width: 40, height: 40 }}
                resizeMode="cover"
              />
              <View className="flex flex-col ml-2">
                <Text className="mb-1 text-base font-semibold leading-5 text-emphasizedFont">
                  {otherUserBasicData.memberNickName}
                </Text>
                <Text className="text-sm font-medium text-basicFont">
                  나와의 일치율 {otherUserBasicData.equality}%
                </Text>
              </View>
            </View>

            <View className="flex-1 bg-white pt-1 rounded-t-[20px]">
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
                    className={`text-sm ml-1.5 ${
                      type === 'list' ? 'text-main1 font-semibold' : 'text-disabledFont font-medium'
                    }`}
                  >
                    리스트로 보기
                  </Text>
                </Pressable>

                <View className="bg-disabled w-[1px] h-6 mx-[18px]" />

                {/* 표로 보기 */}
                <Pressable
                  onPress={handleTable}
                  className="flex flex-row items-center justify-center p-4"
                >
                  <View className="flex">
                    {type === 'table' ? <SelectedTableIcon /> : <NotSelectedTableIcon />}
                  </View>
                  <Text
                    className={`text-sm ml-1.5 ${
                      type === 'table'
                        ? 'text-main1 font-semibold'
                        : 'text-disabledFont font-medium'
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
                  <TableView userData={userData} otherUserData={otherUserData} />
                )}
              </ScrollView>
            </View>
          </View>

          <Pressable className="absolute bottom-0 w-full px-5 bg-white">
            <View className="items-center py-4 rounded-xl bg-main1">
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
