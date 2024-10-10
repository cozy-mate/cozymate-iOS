import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Pressable,
  ScrollView,
  SafeAreaView,
  NativeScrollEvent,
  LayoutChangeEvent,
  NativeSyntheticEvent,
} from 'react-native';

import { dummyData } from './dummyData';

import MemberContainer from '@components/roomDetail/memberContainer';

import { getProfileImage } from '@utils/profileImage';

import { RoomDetailScreenProps } from '@type/param/stack';

import BackButton from '@assets/backButton.svg';
import HeartIcon from '@assets/userDetail/heart.svg';
import MessageIcon from '@assets/userDetail/message.svg';

const RoomDetailScreen = ({ navigation }: RoomDetailScreenProps) => {
  const [roomData, setRoomData] = useState(dummyData);

  const toHome = () => {
    navigation.goBack();
  };

  // 스크롤 시 SafeAreaView 색상 관련
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollY(event.nativeEvent.contentOffset.y);
  };

  const [height, setHeight] = useState<number>(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height);
  };

  return (
    <View className="flex-1 bg-sub1">
      <SafeAreaView
        style={{
          backgroundColor: scrollY <= height ? '#CADFFF' : 'white',
        }}
      />
      <ScrollView
        className="flex-1"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        bounces={false}
      >
        <View className="bg-white">
          <View className="flex flex-col bg-sub1" onLayout={handleLayout}>
            <View>
              {/* 상단 헤더 */}
              <View className="mb-[15px] mt-2 flex flex-row justify-between px-5">
                <Pressable onPress={toHome}>
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

              <View className="mb-[22px] flex flex-row items-center px-[25px]">
                {getProfileImage(roomData.persona, 40, 40)}
                <View className="ml-2 flex flex-col">
                  <Text className="mb-1 text-base font-semibold leading-5 text-emphasizedFont">
                    {roomData.title}
                  </Text>
                  <View className="flex flex-row">
                    {roomData.hashTag.map((hash, index) => (
                      <Text key={index} className="mr-1 text-sm font-medium text-basicFont">
                        #{hash}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className="flex-1 bg-sub1">
          <View className="flex-1 rounded-t-[20px] bg-white px-5 pt-9">
            <View className="mb-16">
              <Text className="mb-4 text-base font-semibold text-emphasizedFont">
                <Text className="text-main1">{roomData.requestList.length}</Text>개의
                {'\n'}룸메이트 요청이 도착했어요
              </Text>
              <MemberContainer memberData={roomData.requestList} />
            </View>

            <View className="mb-16">
              <View className="flex flex-row items-center justify-between">
                <Text className="mb-4 text-base font-semibold text-emphasizedFont">방정보</Text>
                <Text className="text-xs font-medium text-disabledFont">
                  <Text className="text-main1">{roomData.currentNum}</Text> / {roomData.maxNum}
                </Text>
              </View>
              <MemberContainer memberData={roomData.member} />
            </View>

            <View className="mb-16">
              <Text className="mb-4 text-base font-semibold text-emphasizedFont">기숙사 정보</Text>
              <MemberContainer memberData={roomData.member} />
            </View>

            <View className="mb-16">
              <Text className="mb-4 text-base font-semibold text-emphasizedFont">
                룸메이트 라이프스타일 한 눈에 보기
              </Text>
              <MemberContainer memberData={roomData.member} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RoomDetailScreen;
