import React, { Fragment, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Text, View, Pressable, ScrollView, SafeAreaView } from 'react-native';

import { profileState, hasRoomState, loggedInState, roomInfoState } from '@recoil/recoil';

import { signOut, deleteMember } from '@server/api/member';

import { deleteToken } from '@utils/token';
import { deleteFcmToken } from '@utils/fcm';
import { getProfileImage } from '@utils/profileImage';

import { MyPageScreenProps } from '@type/param/stack';

import HomeIcon from '@assets/myPage/home.svg';
import RightArrow from '@assets/myPage/rightArrow.svg';
import RoundBackGround from '@assets/myPage/roundBack.svg';
import CertificationIcon from '@assets/myPage/certification.svg';

const MyPageScreen = ({ navigation }: MyPageScreenProps) => {
  const hasRoom = useRecoilValue(hasRoomState);
  const myProfile = useRecoilValue(profileState);
  const roomInfo = useRecoilValue(roomInfoState);
  const [, setLoggedIn] = useRecoilState(loggedInState);
  const [school, setSchool] = useState<boolean>(true);

  const toRoomDetail = () => {
    navigation.navigate('RoomDetailScreen');
  };

  const toSchoolAuthentication = () => {
    navigation.navigate('SchoolAuthenticationScreen');
  };

  const toLifeStyleEdit = () => {
    navigation.navigate('LifeStyleEditScreen');
  };

  const logout = async () => {
    try {
      const response = await signOut();

      console.log(response);

      await deleteToken();
      await deleteFcmToken();
      setLoggedIn(false);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const withdraw = async () => {
    try {
      const response = await deleteMember();

      console.log(response);

      await deleteToken();
      await deleteFcmToken();
      setLoggedIn(false);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="bg-white px-5">
        <View className="flex flex-1 flex-col items-center">
          {getProfileImage(myProfile.persona, 120, 120)}
          <Text className="mb-10 mt-3 text-lg font-semibold text-emphasizedFont">
            {myProfile.nickname}
          </Text>

          <View className="mb-4 flex w-full flex-col rounded-xl border border-[#f1f2f4] p-4 py-1">
            <Pressable className="flex flex-row justify-between border-b border-b-[#f1f2f4] py-3">
              <Text className="text-sm font-medium text-emphasizedFont">나의 코지룸</Text>
              <View className="flex flex-row items-center">
                {hasRoom.hasRoom ? (
                  <Pressable onPress={toRoomDetail} className="flex flex-row items-center">
                    <HomeIcon />
                    <Text className="mx-1 text-sm font-medium text-main1">{roomInfo.name}</Text>
                    <RightArrow />
                  </Pressable>
                ) : (
                  <Fragment>
                    <Text className="mr-1 text-sm font-medium text-disabledFont">
                      아직 방이 존재하지 않아요
                    </Text>
                    <RightArrow />
                  </Fragment>
                )}
              </View>
            </Pressable>

            <Pressable className="flex flex-row justify-between border-b border-b-[#f1f2f4] py-3">
              <Text className="text-sm font-medium text-emphasizedFont">학교 인증</Text>
              <View className="flex flex-row items-center">
                {school ? (
                  <Fragment>
                    <CertificationIcon />
                    <Text className="mx-1 text-sm font-medium text-main1">인하대학교</Text>
                    <RightArrow />
                  </Fragment>
                ) : (
                  <Pressable
                    onPress={toSchoolAuthentication}
                    className="flex flex-row items-center"
                  >
                    <Text className="mr-1 text-sm font-medium text-disabledFont">
                      아직 학교인증이 되어있지 않아요
                    </Text>
                    <RightArrow />
                  </Pressable>
                )}
              </View>
            </Pressable>

            <Pressable
              className="flex flex-row justify-between border-b border-b-[#f1f2f4] py-3"
              onPress={toLifeStyleEdit}
            >
              <Text className="text-sm font-medium text-emphasizedFont">나의 라이프스타일</Text>
              <View className="flex flex-row items-center">
                <RightArrow />
              </View>
            </Pressable>

            <Pressable className="flex flex-row justify-between py-3">
              <Text className="text-sm font-medium text-emphasizedFont">내가 찜한 룸메이트</Text>
              <View className="flex flex-row items-center">
                <RightArrow />
              </View>
            </Pressable>
          </View>

          <View className="mb-4 flex w-full flex-col rounded-xl border border-[#f1f2f4] p-4 py-1">
            <Pressable className="flex flex-row justify-between py-3">
              <Text className="text-sm font-medium text-emphasizedFont">문의하기</Text>
              <RightArrow />
            </Pressable>
          </View>

          <View className="flex flex-row items-center justify-center">
            <Pressable onPress={logout}>
              <Text className="px-1 py-3 text-xs font-medium text-disabledFont">로그아웃</Text>
            </Pressable>

            <View className="mx-4 h-[18px] w-px bg-[#d9d9d9]" />

            <Pressable onPress={withdraw}>
              <Text className="px-1 py-3 text-xs font-medium text-disabledFont">회원탈퇴</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyPageScreen;
