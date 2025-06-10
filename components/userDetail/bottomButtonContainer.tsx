import { useRouter } from 'expo-router';
import { Fragment } from 'react';

import BottomButtonComponent from '@/components/roomDetail/bottomButton';
import { useCheckIsInvitedMember, useCheckIsRequestedMember } from '@/hooks/room/room';
import TwoBottomButtonComponent from '@/newComponents/common/twoBottomButton';
import { useMemberStore } from '@/zustand/member/member';
import { useHasLifeStyleStore } from '@/zustand/member-stat/member-stat';

interface BottomButtonContainerProps {
  id: number;
  onPress: any;
}

const BottomButtonContainer: React.FC<BottomButtonContainerProps> = ({ id, onPress }) => {
  const router = useRouter();

  const { memberState } = useMemberStore();
  const { hasLifeStyle } = useHasLifeStyleStore();

  const { data: isInvited } = useCheckIsInvitedMember(id);
  const { data: isRequested } = useCheckIsRequestedMember(id);

  return (
    <Fragment>
      {id !== memberState.memberId && !hasLifeStyle && (
        <BottomButtonComponent
          buttonText="라이프스타일 입력하고 내 방으로 초대하기"
          disabled={false}
          color="BLUE"
          onPress={() => router.push('/lifeStyle/onboarding')}
        />
      )}

      {/* 해당 사용자를 초대함 => 초대 취소하기 */}
      {Number(id) !== memberState.memberId && isInvited?.result && (
        <BottomButtonComponent
          buttonText="초대 취소하기"
          disabled={false}
          color="WHITE"
          onPress={() => onPress('CANCEL')}
        />
      )}

      {/* 해당 사용자가 방 참여 요청을 보냄 => 수락/거절 */}
      {Number(id) !== memberState.memberId && isRequested?.result && (
        <TwoBottomButtonComponent
          onLeftPress={() => onPress('REJECT')}
          onRightPress={() => onPress('ACCEPT')}
          disabled={false}
        />
      )}

      {Number(id) !== memberState.memberId &&
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
    </Fragment>
  );
};

export default BottomButtonContainer;
