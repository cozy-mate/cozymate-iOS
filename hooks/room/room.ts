import { StackActions } from '@react-navigation/native';
import {
  useMutation,
  useQuery,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useRouter, useNavigationContainerRef } from 'expo-router';

import { CreatePublicRoomRequest } from '@/apis/room/request';
import { CreatePublicRoomResponse } from '@/apis/room/response';
import {
  checkIsRequestedRoom,
  createPublicRoom,
  exitRoom,
  getReceivedRequestList,
  getRoomDetail,
  getSentRequestRoomList,
  inviteMember,
  sendRoomRequest,
} from '@/apis/room/room';
import { showRejectToast } from '@/utils/toast';
import { useHasRoomStore } from '@/zustand/room/room';

export const useGetMyRoomDetail = () => {
  const { roomInfo } = useHasRoomStore();

  return useQuery({
    queryKey: [`/rooms/${roomInfo.roomId}/myRoom`],
    queryFn: () => getRoomDetail(roomInfo.roomId),
    enabled: roomInfo.roomId !== 0,
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
  return useSuspenseInfiniteQuery({
    queryKey: [`/rooms/requested`],
    queryFn: ({ pageParam }) => getSentRequestRoomList(pageParam, 3),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.result.hasNext) {
        return lastPage.result.page + 1;
      }
    },
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
  const { setRoomInfo } = useHasRoomStore();

  return useMutation({
    mutationFn: (data: CreatePublicRoomRequest) => createPublicRoom(data),
    onSuccess: (response: CreatePublicRoomResponse) => {
      setRoomInfo(response.result);
      router.replace(`/room/${response.result.roomId}`);
    },
  });
};

export const useExitRoom = (roomId: number) => {
  const router = useRouter();

  const { setRoomInfo } = useHasRoomStore();
  const rootNavigation = useNavigationContainerRef();

  return useMutation({
    mutationFn: () => exitRoom(roomId),
    onSuccess: () => {
      setRoomInfo({ roomId: 0, isRoomManager: false });
      rootNavigation.dispatch(StackActions.popToTop());
      router.replace('/(tabs)/home');
    },
  });
};
