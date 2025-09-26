import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  acceptRoomRequest,
  cancelInviteMember,
  checkIsInvitedMember,
  inviteMember,
} from '@/server/room/room';
import { showRejectToast, showSuccessToast } from '@/utils/toast';
import { useMemberStore } from '@/zustand/store';
import { matchMultiQueries, queries } from '@/server';

// 방장 -> 내방으로 초대 취소 기능
export const useCancelInviteMember = (inviteeId: number) => {
  const queryClient = useQueryClient();

  const { roomInfo } = useMemberStore();

  return useMutation({
    mutationFn: () => cancelInviteMember(inviteeId),
    onSuccess: () => {
      showRejectToast('방 초대 요청을 취소했어요');
      queryClient.invalidateQueries({
        queryKey: [`/rooms/${roomInfo?.roomId}/invited-members`, roomInfo?.roomId],
      });
      queryClient.invalidateQueries(queries.room.checkIsInvitedMember({ memberId: inviteeId }));
    },
  });
};

// 방장 -> 방에 참여 요청한 사용자인지 조회
export const useCheckIsRequestedMember = (memberId: number) => {
  const { roomInfo } = useMemberStore();

  return useQuery({
    ...queries.room.checkIsRequestedMember({ memberId }),
    enabled: roomInfo?.roomId !== 0 && roomInfo?.isRoomManager,
  });
};

export const useGetReceivedRequestList = (isRoomManager: boolean) => {
  return useQuery({
    ...queries.room.receivedRequestList(),
    enabled: isRoomManager,
  });
};

// 방장 -> 방장이 초대한 사용자인지 조회
export const useCheckIsInvitedMember = (memberId: number) => {
  const { roomInfo } = useMemberStore();

  return useQuery({
    ...queries.room.checkIsInvitedMember({ memberId }),
    enabled: roomInfo?.roomId !== 0 && roomInfo?.isRoomManager,
  });
};

// 방장 -> 방 참여 요청 수락/거절
export const useAcceptRoomRequest = (
  requesterId: number,
  requesterName: string,
  roomId: number,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (accept: boolean) => acceptRoomRequest(requesterId, accept),
    onSuccess: (_data, variables) => {
      const accept = variables; // mutationFn에 전달된 값

      if (accept) {
        showSuccessToast(`[${requesterName}]님의 방 참여 요청을 수락했어요`);
      } else {
        showSuccessToast(`[${requesterName}]님의 방 참여 요청을 거절했어요`);
      }
      queryClient.invalidateQueries({
        predicate: matchMultiQueries([
          queries.room.checkIsRequestedMember({ memberId: requesterId }).queryKey,
          queries.room.receivedRequestList._def,
          queries.room.myRoomDetail({ roomId }).queryKey,
        ]),
      });
    },
    onError: (error: any) => {
      const code = error.response?.data?.code;

      if (code === 'ROOM412') {
        showRejectToast('존재하지 않는 참여요청이에요');
      }

      queryClient.invalidateQueries({
        predicate: matchMultiQueries([
          queries.room.checkIsRequestedMember({ memberId: requesterId }).queryKey,
          queries.room.receivedRequestList._def,
        ]),
      });
    },
  });
};

// 방장 -> 내방으로 초대하기
export const useInviteMember = (
  inviteeId: number,
  nickname: string,
  setIsCreateRoomModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  userRoomId: number,
) => {
  const queryClient = useQueryClient();

  const { roomInfo } = useMemberStore();

  return useMutation({
    mutationFn: () => inviteMember(inviteeId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`/rooms/${roomInfo?.roomId}/invited-members`, roomInfo?.roomId],
      });
      queryClient.invalidateQueries(queries.room.checkIsInvitedMember({ memberId: inviteeId }));
      showSuccessToast(`[${nickname}]님에게 방 초대 요청을 보냈어요`);
    },
    onError: (error: any) => {
      queryClient.invalidateQueries({
        queryKey: [`/rooms/${roomInfo?.roomId}/invited-members`, roomInfo?.roomId],
      });
      queryClient.invalidateQueries(queries.room.checkIsInvitedMember({ memberId: inviteeId }));

      const code = error.response?.data?.code;

      // 1. userRoomId가 0이 아니면 ROOM401 상황으로 간주 → 최우선 처리
      if (userRoomId !== 0) {
        showRejectToast('이미 다른 방에 참여하고 있어서 초대할 수 없어요');
        return; // 이후의 로직은 무시
      }

      // 2. 방이 없다
      if (code === 'ROOM400') {
        setIsCreateRoomModalOpen(true);
        return;
      }

      // 3. 상대가 방이 이미 있다 (fallback용)
      if (code === 'ROOM401') {
        showRejectToast('이미 다른 방에 참여하고 있어서 초대할 수 없어요');
        return;
      }

      // 4. 방이 꽉찼다
      if (code === 'ROOM406') {
        showRejectToast('방 인원이 꽉차서 초대할 수 없어요');
        return;
      }
    },
  });
};
