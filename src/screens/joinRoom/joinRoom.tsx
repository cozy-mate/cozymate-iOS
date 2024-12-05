import React, { useState } from 'react';
import {
  Text,
  View,
  Keyboard,
  Pressable,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';

import LoadingComponent from '@components/commonComponents/loading';
import CustomTextInputBox from '@components/common/customTextInputBox';
import TwoButtonModal from '@components/commonComponents/twoButtonModal';
import OneButtonModal from '@components/commonComponents/oneButtonModal';

import { useHasRoomStore, useRoomInfoStore } from '@zustand/room/room';

import { getRoomData } from '@server/api/room';

import { useJoinRoom, useGetRoomDataByInviteCode } from '@hooks/api/room';

import { JoinRoomScreenProps } from '@type/param/stack';

import BackButton from '@assets/backButton.svg';

interface RoomInfoProps {
  roomId: number;
  name: string;
  managerNickname: string;
  maxMateNum: number;
}

const JoinRoomScreen = ({ navigation }: JoinRoomScreenProps) => {
  const { setMyRoom } = useHasRoomStore();
  const { setRoomInfo } = useRoomInfoStore();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);

  const [inviteCode, setInviteCode] = useState<string>('');

  const [roomBasicInfo, setRoomBasicInfo] = useState<RoomInfoProps>({
    roomId: 0,
    name: '',
    managerNickname: '',
    maxMateNum: 0,
  });

  const { mutateAsync: getRoomDataByInviteCode, isPending: pendingRoomData } =
    useGetRoomDataByInviteCode();
  const { mutateAsync: joinRoom, isPending: pendingJoinRoom } = useJoinRoom();

  const getRoomInfo = async () => {
    try {
      const response = await getRoomDataByInviteCode(inviteCode);

      setRoomBasicInfo({
        roomId: response.result.roomId,
        name: response.result.name,
        managerNickname: response.result.managerNickname,
        maxMateNum: response.result.maxMateNum,
      });

      setIsModalOpen(true);
    } catch (error) {
      setRoomBasicInfo({
        roomId: 0,
        name: '',
        managerNickname: '',
        maxMateNum: 0,
      });
      setIsErrorModalOpen(true);
    }
  };

  const toBack = () => {
    navigation.goBack();
  };

  const joinCozyRoom = async () => {
    try {
      await joinRoom(roomBasicInfo.roomId);

      const response = await getRoomData(roomBasicInfo.roomId);

      setMyRoom({
        hasRoom: true,
        roomId: response.result.roomId,
        isRoomManager: false,
        isFullRoom: response.result.arrivalMateNum === response.result.maxMateNum,
      });

      setRoomInfo({
        roomId: response.result.roomId,
        name: response.result.name,
        inviteCode: response.result.inviteCode,
        persona: response.result.persona,
        mateDetailList: response.result.mateDetailList,
        managerMemberId: response.result.managerMemberId,
        managerNickname: response.result.managerNickname,
        isRoomManager: false,
        favoriteId: response.result.favoriteId,
        maxMateNum: response.result.maxMateNum,
        arrivalMateNum: response.result.arrivalMateNum,
        dormitoryName: response.result.dormitoryName,
        roomType: response.result.roomType,
        hashtagList: response.result.hashtagList,
        equality: response.result.equality,
        difference: response.result.difference,
      });

      setIsModalOpen(false);
      navigation.navigate('MainScreen', { screen: 'CozyHomeScreen' });
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex flex-1 flex-col justify-between px-5">
          <View>
            <Pressable onPress={toBack} className="mb-5 mt-2">
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

        <OneButtonModal
          isVisible={isErrorModalOpen}
          title="초대코드를 다시 확인해주세요!"
          subtitle="해당 코드를 가진 방이 존재하지 않아요"
          closeFunc={() => setIsErrorModalOpen(false)}
          buttonText="확인"
          buttonFunc={() => setIsErrorModalOpen}
        />

        <TwoButtonModal
          isVisible={isModalOpen}
          title={`[${roomBasicInfo.name}] 방이 맞나요?`}
          subtitle={`방장 [${roomBasicInfo.managerNickname}] | ${roomBasicInfo.maxMateNum}인실`}
          closeFunc={() => setIsModalOpen(false)}
          leftButtonText="취소"
          leftButtonFunc={() => setIsModalOpen(false)}
          rightButtonText="확인"
          rightButtonFunc={joinCozyRoom}
        />
        {pendingRoomData && <LoadingComponent />}
        {pendingJoinRoom && <LoadingComponent />}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default JoinRoomScreen;
