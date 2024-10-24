import React, { useState } from 'react';
import {
  Text,
  View,
  Keyboard,
  Pressable,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';

import ButtonModal from '@components/common/buttonModal';
import CustomTextInputBox from '@components/common/customTextInputBox';

import { useHasRoomStore, useRoomInfoStore, useInviteCodeRoomStore } from '@zustand/room/room';

import { joinRoom, getRoomData, getRoomDataByInviteCode } from '@server/api/room';

import { JoinRoomScreenProps } from '@type/param/stack';

import BackButton from '@assets/backButton.svg';

const JoinRoomScreen = ({ navigation }: JoinRoomScreenProps) => {
  const { setMyRoom } = useHasRoomStore();
  const { setRoomInfo } = useRoomInfoStore();
  const { inviteCodeRoomInfo, setInviteCodeRoomInfo } = useInviteCodeRoomStore();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [inviteCode, setInviteCode] = useState<string>('');
  const [roomId, setRoomId] = useState<number>(0);

  const getRoomInfo = async () => {
    setIsModalOpen(true);
    try {
      const response = await getRoomDataByInviteCode(inviteCode);

      console.log(response.result);
      setInviteCodeRoomInfo({
        roomId: response.result.roomId,
        name: response.result.name,
        managerName: response.result.managerName,
        maxMateNum: response.result.maxMateNum,
      });
      setRoomId(response.result.roomId);
    } catch (error) {
      console.log(error);
    }
  };

  const toMain = () => {
    navigation.navigate('MainScreen');
  };

  const joinCozyRoom = async () => {
    try {
      setIsModalOpen(false);
      await joinRoom(roomId);

      const response = await getRoomData(roomId);
      setRoomInfo({
        roomId: response.result.roomId,
        name: response.result.name,
        inviteCode: response.result.inviteCode,
        profileImage: response.result.profileImage,
        mateList: response.result.mateList,
        roomType: response.result.roomType,
        hashtags: response.result.hashtags || [],
      });

      setMyRoom({ hasRoom: true, roomId: inviteCodeRoomInfo.roomId });
      navigation.navigate('MainScreen');
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setInviteCodeRoomInfo({
      roomId: 0,
      name: '',
      managerName: '',
      maxMateNum: 0,
    });
  };

  const prop = {
    title: `[${inviteCodeRoomInfo.name}] 방이 맞나요?`,
    message: `방장 [${inviteCodeRoomInfo.managerName}] | ${inviteCodeRoomInfo.maxMateNum}인실`,
    cancelText: '취소',
    submitText: '확인',
    onSubmit: joinCozyRoom,
    isVisible: isModalOpen,
    closeModal: closeModal,
    buttonCount: 2,
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex flex-1 flex-col justify-between px-5">
          <View>
            <Pressable onPress={toMain} className="mb-5 mt-2">
              <BackButton />
            </Pressable>
            <CustomTextInputBox
              title="방장이 준 초대코드를 입력해주세요!"
              value={inviteCode}
              setValue={setInviteCode}
              placeholder="초대코드를 입력해주세요"
            />
          </View>

          <View className={`${inviteCode ? 'bg-main1' : 'bg-[#C4c4c4]'} flex rounded-xl p-4`}>
            <Pressable onPress={getRoomInfo}>
              <Text className="text-center text-base font-semibold text-white">확인</Text>
            </Pressable>
          </View>
        </View>

        {isModalOpen && <ButtonModal {...prop} />}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default JoinRoomScreen;
