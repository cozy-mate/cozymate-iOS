import { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import BottomButtonComponent from '@/components/common/bottomButton';
import CustomTextInput from '@/components/common/customInput/customTextInput';
import OneButtonModal from '@/components/modal/oneButtonModal';
import TwoButtonModal from '@/components/modal/twoButtonModal';
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
  const { mutateAsync: joinRoom } = useJoinRoom(roomInfo?.roomId as number);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-[20px] gap-y-[20px]">
        <BackHeaderComponent />

        <CustomTextInput
          title="방장이 준 초대코드를 입력해주세요!"
          value={inviteCode}
          handleValue={(e: string) => setInviteCode(e)}
          placeholder="초대코드를 입력해주세요"
        />
      </View>

      <BottomButtonComponent
        buttonText="확인"
        onPress={() => getRoomByInviteCode(inviteCode)}
        color={inviteCode.length === 0 ? 'GRAY' : 'BLUE'}
        disabled={inviteCode.length === 0}
      />

      {roomInfo !== null && (
        <TwoButtonModal
          isVisible={isRoomInfoModalOpen}
          title={`[${roomInfo.name}] 방이 맞나요?`}
          subtitle={`방장 : [${roomInfo.managerNickname}] | ${roomInfo.maxMateNum}인실`}
          closeFunc={() => setIsRoomInfoModalOpen(false)}
          leftButtonText="취소"
          leftButtonFunc={() => setIsRoomInfoModalOpen(false)}
          rightButtonText="확인"
          rightButtonFunc={joinRoom}
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
