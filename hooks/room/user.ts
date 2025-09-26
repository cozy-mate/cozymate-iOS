import {
  useMutation,
  useQueryClient,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';

import { acceptRoomInvite, cancelRequestRoom, sendRoomRequest } from '@/server/room/room';
import { showRejectToast, showSuccessToast } from '@/utils/toast';
import { useMemberStore } from '@/zustand/store';
import { matchMultiQueries, queries } from '@/server';
import { GetSentRequestRoomListResponse } from '@/server/room/response';

// 사용자 -> 방 참여 요청 취소
export const useCancelRequestRoom = (roomId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => cancelRequestRoom(roomId),
    onSuccess: () => {
      showRejectToast('방 참여 요청을 취소했어요');
      queryClient.invalidateQueries({
        predicate: matchMultiQueries([
          queries.room.checkIsRequestedRoom({ roomId }).queryKey,
          queries.room.receivedRequestList._def,
        ]),
      });
    },
  });
};

// 사용자 -> 사용자가 참여 요청한 방인지 조회
export const useCheckIsRequestedRoom = (roomId: number) => {
  return useSuspenseQuery(queries.room.checkIsRequestedRoom({ roomId }));
};

// 사용자 -> 사용자가 초대 받은 방인지 조회
export const useCheckIsInvitedRoom = (roomId: number) => {
  return useSuspenseQuery(queries.room.checkIsInvitedRoom({ roomId }));
};

// 사용자가 참여 요청한 방 목록 조회
export const useGetSentRequestRoomList = (size: number) => {
  return useSuspenseInfiniteQuery({
    ...queries.room.sentRequestRoomList({ size }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: GetSentRequestRoomListResponse) => {
      if (lastPage.result.hasNext) {
        return lastPage.result.page + 1;
      }
    },
  });
};

// 사용자 -> 방 참여 요청
export const useSendRoomRequest = (
  roomId: number,
  roomManagerName: string,
  setIsNotHasLifeStyleModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => sendRoomRequest(roomId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: matchMultiQueries([
          queries.room.checkIsRequestedRoom({ roomId }).queryKey,
          queries.room.receivedRequestList._def,
        ]),
      });
      showSuccessToast(`[${roomManagerName}]님에게 방 참여 요청을 보냈어요`);
    },
    onError: (error: any) => {
      queryClient.invalidateQueries({
        predicate: matchMultiQueries([
          queries.room.checkIsRequestedRoom({ roomId }).queryKey,
          queries.room.receivedRequestList._def,
        ]),
      });

      const code = error.response?.data?.code;

      if (code === 'ROOM401') {
        showRejectToast('이미 다른 방에 참여하고 있어서 참여할 수 없어요');
      }

      if (code === 'MEMBERSTAT402') {
        setIsNotHasLifeStyleModalOpen(true);
      }

      if (code === 'ROOM406') {
        showRejectToast('방 인원이 꽉차서 방에 참여할 수 없어요');
      }
    },
  });
};

// 사용자 -> 방 초대 요청/수락
export const useAcceptRoomInvite = (roomId: number, roomManagerName: string) => {
  const queryClient = useQueryClient();

  const { setRoom } = useMemberStore();

  return useMutation({
    mutationFn: (accept: boolean) => acceptRoomInvite(roomId, accept),
    onSuccess: (_data, variables) => {
      const accept = variables; // mutationFn에 전달된 값

      if (accept) {
        showSuccessToast(`[${roomManagerName}]님의 방 참여 요청을 수락했어요`);
        setRoom({ roomId: roomId, isRoomManager: false });

        queryClient.invalidateQueries({
          predicate: matchMultiQueries([
            queries.room.checkHasRoom._def,
            queries.room.myRoomDetail({ roomId }).queryKey,
            queries.room.detail({ roomId }).queryKey,
          ]),
        });
      } else {
        showSuccessToast(`[${roomManagerName}]님의 방 참여 요청을 거절했어요`);
      }
      queryClient.invalidateQueries({
        predicate: matchMultiQueries([
          queries.room.checkIsInvitedRoom({ roomId }).queryKey,
          // TODO : 이런 이름으로 저장하는 Key가 없는데 왜 존재하는지 모르겠음
          ['/rooms/invited'],
        ]),
      });
    },
    onError: (error: any) => {
      const code = error.response?.data?.code;

      if (code === 'ROOM408') {
        showRejectToast('존재하지 않는 초대요청이에요');
      }
      queryClient.invalidateQueries({
        predicate: matchMultiQueries([
          queries.room.checkIsInvitedRoom({ roomId }).queryKey,
          // TODO : 이런 이름으로 저장하는 Key가 없는데 왜 존재하는지 모르겠음
          ['/rooms/invited'],
        ]),
      });
    },
  });
};
