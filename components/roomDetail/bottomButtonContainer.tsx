import { Fragment } from 'react';

import BottomButtonComponent from '@/components/roomDetail/bottomButton';
import { useCheckIsInvitedRoom, useCheckIsRequestedRoom } from '@/hooks/room/room';
import TwoBottomButtonComponent from '@/newComponents/common/twoBottomButton';
import { useHasRoomStore } from '@/zustand/room/room';

interface BottomButtonContainerProps {
  id: number;
  onPress: any;
}

const BottomButtonContainer: React.FC<BottomButtonContainerProps> = ({ id, onPress }) => {
  const { roomInfo } = useHasRoomStore();

  const { data: isRequested } = useCheckIsRequestedRoom(Number(id));
  const { data: isInvited } = useCheckIsInvitedRoom(Number(id));

  return (
    <Fragment>
      {roomInfo.roomId === id && (
        <BottomButtonComponent
          buttonText="방 나가기"
          onPress={() => onPress('EXIT')}
          color="RED"
          disabled={false}
        />
      )}

      {roomInfo.roomId !== id && !isRequested.result && !isInvited.result && (
        <BottomButtonComponent
          buttonText="방 참여하기"
          disabled={false}
          color="BLUE"
          onPress={() => onPress('SEND')}
        />
      )}

      {roomInfo.roomId !== id && isRequested.result && (
        <BottomButtonComponent
          buttonText="방 참여 취소하기"
          onPress={() => onPress('CANCEL')}
          color="WHITE"
          disabled={false}
        />
      )}

      {roomInfo.roomId !== id && isInvited.result && (
        <TwoBottomButtonComponent
          onLeftPress={() => onPress('ACCEPT')}
          onRightPress={() => onPress('REJECT')}
          disabled={false}
        />
      )}
    </Fragment>
  );
};

export default BottomButtonContainer;
