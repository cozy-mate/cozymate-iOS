import React, { useState } from 'react';
import { Pressable, SafeAreaView, Text, TextInput, View } from 'react-native';
import { JoinRoomScreenProps } from '@type/param/loginStack';

import { useRecoilState } from 'recoil';
import { hasRoomState, inviteCodeRoomState, roomInfoState } from '@recoil/recoil';

import { getRoomData, getRoomDataByInviteCode, joinRoom } from '@server/api/room';

import ButtonModal from '@components/common/buttonModal';

import BackButton from '@assets/backButton.svg';

const JoinRoomScreen = ({ navigation }: JoinRoomScreenProps) => {
  const [, setHasRoom] = useRecoilState(hasRoomState);
  const [inviteRoomInfo, setInviteRoomInfo] = useRecoilState(inviteCodeRoomState);
  const [roomInfo, setRoomInfo] = useRecoilState(roomInfoState);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [inviteCode, setInviteCode] = useState<string>('');
  const [roomId, setRoomId] = useState<number>(0);

  const getRoomInfo = async () => {
    setIsModalOpen(true);
    try {
      const response = await getRoomDataByInviteCode(inviteCode);

      console.log(response.result);
      setInviteRoomInfo((prevState) => ({
        ...prevState,
        roomId: response.result.roomId,
        name: response.result.name,
        managerName: response.result.managerName,
        maxMateNum: response.result.maxMateNum,
      }));
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
      });

      setHasRoom({ hasRoom: true, roomId: inviteRoomInfo.roomId });
      navigation.navigate('MainScreen');
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setInviteRoomInfo(() => ({
      roomId: 0,
      name: '',
      managerName: '',
      maxMateNum: 0,
    }));
  };

  const prop = {
    title: `[${inviteRoomInfo.name}] 방이 맞나요?`,
    message: `방장 [${inviteRoomInfo.managerName}] | ${inviteRoomInfo.maxMateNum}인실`,
    cancelText: '취소',
    submitText: '확인',
    onSubmit: joinCozyRoom,
    isVisible: isModalOpen,
    closeModal: closeModal,
    buttonCount: 2,
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex flex-col justify-between flex-1 px-5">
        <View>
          <Pressable onPress={toMain} className="mt-2 mb-5">
            <BackButton />
          </Pressable>
          <Text className="px-2 mb-2 text-base font-semibold text-basicFont">
            방장이 준 초대코드를 입력해주세요!
          </Text>
          <TextInput
            value={inviteCode}
            onChangeText={setInviteCode}
            placeholder="초대코드를 입력해주세요"
            className="p-4 font-medium bg-colorBox text-basicFont rounded-xl"
          />
        </View>

        <View className={`${inviteCode ? 'bg-main1' : 'bg-[#C4c4c4]'} flex p-4 rounded-xl`}>
          <Pressable onPress={getRoomInfo}>
            <Text className="text-base font-semibold text-center text-white">확인</Text>
          </Pressable>
        </View>
      </View>

      {isModalOpen && <ButtonModal {...prop} />}
    </SafeAreaView>
  );
};

export default JoinRoomScreen;
