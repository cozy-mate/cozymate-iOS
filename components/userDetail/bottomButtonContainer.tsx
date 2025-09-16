import { useRouter } from 'expo-router';
import { Dimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BottomButtonComponent from '@/components/common/bottomButton';
import TwoBottomButtonComponent from '@/components/common/twoBottomButton';
import { useGetMyRoomDetail } from '@/hooks/room/room';
import { useCheckIsInvitedMember, useCheckIsRequestedMember } from '@/hooks/room/roomManager';
import { useMemberStore } from '@/zustand/store';

interface BottomButtonContainerProps {
  id: number;
  onPress: any;
}

const BottomButtonContainer: React.FC<BottomButtonContainerProps> = ({ id, onPress }) => {
  const router = useRouter();

  const isSmallSize = Dimensions.get('screen').height <= 667;

  const { bottom } = useSafeAreaInsets();

  const { memberInfo, hasLifeStyle, roomInfo } = useMemberStore();

  const { data: isInvited } = useCheckIsInvitedMember(id);
  const { data: isRequested } = useCheckIsRequestedMember(id);

  const { data: roomData } = useGetMyRoomDetail(roomInfo?.roomId as number);

  const isInMateList = roomData?.result?.mateDetailList?.some(
    (mate: { memberId: number }) => mate.memberId === id,
  );

  // 같은 방에 속한 사용자 or 방이 있지만 방장이 아닐 때
  if (isInMateList || (!roomInfo?.isRoomManager && roomInfo?.roomId !== 0)) return null;

  return (
    <View style={{ height: 108, bottom: isSmallSize ? 160 : bottom + 94 }}>
      {id !== Number(memberInfo?.memberId ?? 0) && !hasLifeStyle && (
        <BottomButtonComponent
          buttonText="라이프스타일 입력하고 내 방으로 초대하기"
          disabled={false}
          color="BLUE"
          onPress={() => router.push('/lifeStyle/onboarding')}
        />
      )}
      {/* 해당 사용자를 초대함 => 초대 취소하기 */}
      {Number(id) !== Number(memberInfo?.memberId ?? 0) && isInvited?.result && (
        <BottomButtonComponent
          buttonText="초대 취소하기"
          disabled={false}
          color="WHITE"
          onPress={() => onPress('CANCEL')}
        />
      )}
      {/* 해당 사용자가 방 참여 요청을 보냄 => 수락/거절 */}
      {Number(id) !== Number(memberInfo?.memberId ?? 0) && isRequested?.result && (
        <TwoBottomButtonComponent
          onLeftPress={() => onPress('REJECT')}
          onRightPress={() => onPress('ACCEPT')}
          disabled={false}
        />
      )}
      {Number(id) !== Number(memberInfo?.memberId ?? 0) &&
        !isRequested?.result &&
        !isInvited?.result &&
        hasLifeStyle && (
          <BottomButtonComponent
            buttonText="내 방으로 초대하기"
            disabled={false}
            color="BLUE"
            onPress={() => onPress('INVITE')}
          />
        )}
    </View>
  );
};

export default BottomButtonContainer;
