import { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import BottomButton from '@/components/common/bottomButton';
import CustomTextInputComponent from '@/components/common/customTextInput';
import OneButtonModal from '@/components/common/oneButtonModal';
import TwoButtonModal from '@/components/common/twoButtonModal';
import { useGetRoomByInviteCode, useJoinRoom } from '@/hooks/room/room';
import { RoomItem } from '@/type/room';

export default function JoinRoom() {
  const [inviteCode, setInviteCode] = useState<string>('');

  const [roomInfo, setRoomInfo] = useState<RoomItem | null>(null);
  const [isRoomInfoModalOpen, setIsRoomInfoModalOpen] = useState<boolean>(false);
  const [isWrongInviteCodeModalOpen, setIsWrongInviteCodeModalOpen] = useState<boolean>(false);

  const { mutateAsync: getRoomByInviteCode } = useGetRoomByInviteCode(
    setRoomInfo,
    setIsRoomInfoModalOpen,
    setIsWrongInviteCodeModalOpen,
  );
  const { mutateAsync: joinRoom } = useJoinRoom();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-[20px] gap-y-5">
        <BackHeaderComponent />
        <CustomTextInputComponent
          title="방장이 준 초대코드를 입력해주세요!"
          value={inviteCode}
          handleValue={(e: string) => setInviteCode(e)}
          placeholder="초대코드를 입력해주세요"
        />
      </View>

      <View className="absolute bottom-[42px] w-full px-[22px]">
        <BottomButton
          buttonText="확인"
          disabled={inviteCode.length === 0}
          onPress={() => getRoomByInviteCode(inviteCode)}
        />
      </View>

      {roomInfo !== null && (
        <TwoButtonModal
          isVisible={isRoomInfoModalOpen}
          title={`[${roomInfo.name}] 방이 맞나요?`}
          subtitle={`방장 : [${roomInfo.managerNickname}] | ${roomInfo.maxMateNum}인실`}
          closeFunc={() => setIsRoomInfoModalOpen(false)}
          leftButtonText="취소"
          leftButtonFunc={() => setIsRoomInfoModalOpen(false)}
          rightButtonText="확인"
          rightButtonFunc={() => joinRoom(roomInfo.roomId)}
        />
      )}

      <OneButtonModal
        isVisible={isWrongInviteCodeModalOpen}
        title="초대코드를 다시 확인해주세요!"
        subtitle="해당 코드를 가진 방이 존재하지 않아요"
        closeFunc={() => {
          setIsWrongInviteCodeModalOpen(false);
          setInviteCode('');
        }}
        buttonText="확인"
        buttonFunc={() => {
          setIsWrongInviteCodeModalOpen(false);
          setInviteCode('');
        }}
      />
    </SafeAreaView>
  );
}
