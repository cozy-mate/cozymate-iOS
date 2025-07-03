import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BottomButtonComponent from '@/components/common/bottomButton';
import TwoBottomButtonComponent from '@/components/common/twoBottomButton';
import { useCheckHasRoom } from '@/hooks/room/room';
import { useCheckIsInvitedRoom, useCheckIsRequestedRoom } from '@/hooks/room/user';

interface BottomButtonContainerProps {
  id: number;
  onPress: any;
}

const BottomButtonContainer: React.FC<BottomButtonContainerProps> = ({ id, onPress }) => {
  const { bottom } = useSafeAreaInsets();

  const { data: hasRoom } = useCheckHasRoom();

  const { data: isRequested } = useCheckIsRequestedRoom(Number(id));
  const { data: isInvited } = useCheckIsInvitedRoom(Number(id));

  return (
    <View style={{ height: 108, bottom: bottom + 124 }}>
      {hasRoom.result.roomId === id && (
        <BottomButtonComponent
          buttonText="방 나가기"
          onPress={() => onPress('EXIT')}
          color="RED"
          disabled={false}
        />
      )}

      {hasRoom.result.roomId !== id && !isRequested.result && !isInvited.result && (
        <BottomButtonComponent
          buttonText="방 참여하기"
          disabled={false}
          color="BLUE"
          onPress={() => onPress('SEND')}
        />
      )}

      {hasRoom.result.roomId !== id && isRequested.result && (
        <BottomButtonComponent
          buttonText="방 참여 취소하기"
          onPress={() => onPress('CANCEL')}
          color="WHITE"
          disabled={false}
        />
      )}

      {hasRoom.result.roomId !== id && isInvited.result && (
        <TwoBottomButtonComponent
          onLeftPress={() => onPress('REJECT')}
          onRightPress={() => onPress('ACCEPT')}
          disabled={false}
        />
      )}
    </View>
  );
};

export default BottomButtonContainer;
