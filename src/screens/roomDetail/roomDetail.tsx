import React, { useState } from 'react';
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

import ChipComponent from '@components/roomDetail/chipComponent';
import LifeStyleModal from '@components/roomDetail/lifeStyleModal';
import MemberComponent from '@components/roomDetail/memberComponent';

import { useGetRoomData } from '@hooks/api/room';

import { getProfileImage } from '@utils/profileImage';

import { RoomDetailScreenProps } from '@type/param/stack';

import BackButton from '@assets/backButton.svg';
import HeartIcon from '@assets/userDetail/heart.svg';
import MessageIcon from '@assets/userDetail/message.svg';

type ChipItems = {
  title: string;
  color: string;
};

const RoomDetailScreen = ({ navigation, route }: RoomDetailScreenProps) => {
  const { roomId } = route.params;

  const { data: roomData } = useGetRoomData(roomId);

  // const [roomData, setRoomData] = useState({
  //   roomId: 0,
  //   name: '',
  //   inviteCode: '',
  //   profileImage: 0,
  //   mateList: [{ memberId: 0, mateId: 0, nickname: '' }],
  //   roomType: '',
  //   hashtags: [''],
  // });

  const [isLifeStyleModalOpen, setIsLifeStyleModalOpen] = useState<boolean>(false);

  const handleLifeStyleModal = () => {
    setIsLifeStyleModalOpen(!isLifeStyleModalOpen);
  };

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

  const [items, setItems] = useState<ChipItems[]>([
    { title: '학번', color: 'blue' },
    { title: '학과', color: 'gray' },
    { title: '신청실', color: 'red' },
    { title: '합격여부', color: 'gray' },
    { title: '기상시간', color: 'red' },
    { title: '취침시간', color: 'blue' },
    { title: '소등시간', color: 'red' },
    { title: '흡연여부', color: 'gray' },
    { title: '잠버릇', color: 'blue' },
    { title: '에어컨', color: 'red' },
    { title: '히터', color: 'blue' },
    { title: '생활패턴', color: 'gray' },
    { title: '친밀도', color: 'blue' },
    { title: '물건공유', color: 'blue' },
    { title: '공부여부', color: 'red' },
    { title: '게임여부', color: 'blue' },
    { title: '전화여부', color: 'red' },
    { title: '섭취여부', color: 'blue' },
    { title: '청결예민도', color: 'gray' },
    { title: '소음예민도', color: 'blue' },
    { title: '청소빈도', color: 'blue' },
    { title: '성격', color: 'blue' },
    { title: 'MBTI', color: 'blue' },
  ]);

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
                {getProfileImage(roomData.result.profileImage, 40, 40)}
                <View className="ml-2 flex flex-col">
                  <Text className="mb-1 text-base font-semibold leading-5 text-emphasizedFont">
                    {roomData.result.name}
                  </Text>
                  <View className="flex flex-row">
                    {roomData.result.hashtags &&
                      roomData.result.hashtags.map((hash, index) => (
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
              {/* <Text className="mb-4 px-1 text-base font-semibold text-emphasizedFont">
                <Text className="text-main1">{roomData.requestList.length}</Text>개의
                {'\n'}룸메이트 요청이 도착했어요
              </Text> */}

              {/* <View className="rounded-xl border border-[#F1F2F4] px-4 py-2">
                {roomData.requestList.map((request, index) => (
                  <MemberComponent key={index} index={index} memberData={request} />
                ))}
              </View> */}
            </View>

            <View className="mb-16">
              <View className="mb-4 flex flex-row items-center justify-between px-1">
                <Text className="text-base font-semibold text-emphasizedFont">방정보</Text>
                <Text className="text-xs font-medium text-disabledFont">
                  <Text className="text-main1">
                    {roomData.result.mateList && roomData.result.mateList.length}
                  </Text>{' '}
                  / {roomData.result.mateList && roomData.result.mateList.length}
                </Text>
              </View>

              <View className="rounded-xl border border-[#F1F2F4] px-4 py-2">
                {roomData.result.mateList &&
                  roomData.result.mateList.map((member, index) => (
                    <MemberComponent
                      key={index}
                      index={index}
                      memberData={member}
                      length={roomData.result.mateList.length}
                    />
                  ))}
              </View>
            </View>

            <View className="mb-16">
              <Text className="mb-4 px-1 text-base font-semibold text-emphasizedFont">
                기숙사 정보
              </Text>

              {/* <View className="rounded-xl border border-[#F1F2F4] p-4">
                <View className="flex flex-row border-b border-b-[#F1F2F4] pb-3">
                  <Text className="mr-3 text-sm font-medium text-colorFont">분류</Text>
                  <Text className="text-sm font-medium text-basicFont">{roomData.type}</Text>
                </View>
                <View className="flex flex-row pt-3">
                  <Text className="mr-3 text-sm font-medium text-colorFont">인실</Text>
                  <Text className="text-sm font-medium text-basicFont">
                    {roomData.numOfRoommate}인실
                  </Text>
                </View>
              </View> */}
            </View>

            <View className="mb-16">
              <Text className="mb-4 px-1 text-base font-semibold text-emphasizedFont">
                룸메이트 라이프스타일 한 눈에 보기
              </Text>

              <View className="flex flex-row flex-wrap">
                {items.map((item, index) => (
                  <ChipComponent
                    key={index}
                    index={index}
                    chipData={item}
                    handleModal={handleLifeStyleModal}
                  />
                ))}
              </View>
            </View>
          </View>
        </View>

        {isLifeStyleModalOpen && <LifeStyleModal closeModal={handleLifeStyleModal} />}
      </ScrollView>
    </View>
  );
};

export default RoomDetailScreen;
