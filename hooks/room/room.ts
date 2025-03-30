import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { CreatePublicRoomRequest } from '@/apis/room/request';
import { CreatePublicRoomResponse } from '@/apis/room/response';
import {
  checkIsRequestedRoom,
  createPublicRoom,
  getReceivedRequestList,
  getRoomDetail,
  getSentRequestRoomList,
  inviteMember,
  sendRoomRequest,
} from '@/apis/room/room';
import { showRejectToast } from '@/utils/toast';
import { useHasRoomStore } from '@/zustand/room/room';

export const useGetMyRoomDetail = () => {
  const { roomId } = useHasRoomStore();

  return useQuery({
    queryKey: [`/rooms/${roomId}/myRoom`],
    queryFn: () => getRoomDetail(roomId),
    enabled: roomId !== 0,
  });
};

export const useGetRoomDetail = (roomId: number) => {
  return useSuspenseQuery({
    queryKey: [`/rooms/${roomId}`, roomId],
    queryFn: () => getRoomDetail(roomId),
  });
};

export const useCheckIsRequestedRoom = (roomId: number) => {
  return useSuspenseQuery({
    queryKey: [`/rooms/${roomId}/pending-status`, roomId],
    queryFn: () => checkIsRequestedRoom(roomId),
  });
};

export const useGetSentRequestRoomList = () => {
  return useSuspenseQuery({
    queryKey: [`/rooms/requested`],
    queryFn: () => getSentRequestRoomList(),
  });
};

export const useGetReceivedRequestList = () => {
  const isRoomManager = true;

  return useQuery({
    queryKey: [`/rooms/pending-members`],
    queryFn: () => getReceivedRequestList(),
    enabled: isRoomManager,
  });
};

export const useSendRoomRequest = (roomId: number) => {
  return useMutation({
    mutationFn: () => sendRoomRequest(roomId),
    onError: (error: any) => {
      const code = error.response?.data?.code;

      if (code === 'ROOM401') {
        showRejectToast('이미 다른 방에 참여하고 있어서 참가할 수 없어요');
      }
    },
  });
};

export const useInviteMember = (inviteeId: number) => {
  return useMutation({
    mutationFn: () => inviteMember(inviteeId),
    onError: (error: any) => {
      const code = error.response?.data?.code;

      console.log(code);

      if (code === 'ROOM401') {
        showRejectToast('이미 다른 방에 참여하고 있어서 초대할 수 없어요');
      }

      if (code === 'ROOM406') {
        showRejectToast('방 인원이 꽉차서 초대할 수 없어요');
      }
    },
  });
};

export const useCreatePublicRoom = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: CreatePublicRoomRequest) => createPublicRoom(data),
    onSuccess: (response: CreatePublicRoomResponse) => {
      router.replace(`/room/${response.result.roomId}`);
    },
  });
};
