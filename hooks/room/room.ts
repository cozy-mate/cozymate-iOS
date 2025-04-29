import { StackActions } from '@react-navigation/native';
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useRouter, useNavigationContainerRef } from 'expo-router';
import React from 'react';

import { CreatePublicRoomRequest } from '@/apis/room/request';
import { CreatePublicRoomResponse } from '@/apis/room/response';
import {
  cancelInviteMember,
  cancelRequestRoom,
  checkIsInvitedMember,
  checkIsInvitedRoom,
  checkIsRequestedMember,
  checkIsRequestedRoom,
  createPublicRoom,
  exitRoom,
  getReceivedRequestList,
  getRoomDetail,
  getSentRequestRoomList,
  inviteMember,
  searchRoom,
  sendRoomRequest,
} from '@/apis/room/room';
import { showRejectToast, showSuccessToast } from '@/utils/toast';
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

export const useSendRoomRequest = (
  roomId: number,
  roomName: string,
  setIsNotHasLifeStyleModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => sendRoomRequest(roomId),
    onSuccess: () => {
      showSuccessToast(`${roomName}에 방 참여 요청을 보냈어요`);
      queryClient.invalidateQueries({ queryKey: [`/rooms/${roomId}/pending-status`] });
      queryClient.invalidateQueries({ queryKey: [`/rooms/requested`] });
    },
    onError: (error: any) => {
      const code = error.response?.data?.code;

      if (code === 'ROOM401') {
        showRejectToast('이미 다른 방에 참여하고 있어서 참가할 수 없어요');
      }

      if (code === 'MEMBERSTAT402') {
        setIsNotHasLifeStyleModalOpen(true);
      }
    },
  });
};

export const useInviteMember = (
  inviteeId: number,
  nickname: string,
  setIsCreateRoomModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => inviteMember(inviteeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/rooms/invited-status/${inviteeId}`] });
      showSuccessToast(`[${nickname}]님에게 방 초대 요청을 보냈어요`);
    },
    onError: (error: any) => {
      const code = error.response?.data?.code;

      console.log(code);

      // 방이 없다
      if (code === 'ROOM400') {
        setIsCreateRoomModalOpen(true);
      }

      // 상대가 방이 이미 있다
      if (code === 'ROOM401') {
        showRejectToast('이미 다른 방에 참여하고 있어서 초대할 수 없어요');
      }

      // 방이 꽉찼다
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

export const useCheckIsInvitedMember = (memberId: number) => {
  const { roomInfo } = useHasRoomStore();

  return useQuery({
    queryKey: [`/rooms/invited-status/${memberId}`, memberId],
    queryFn: () => checkIsInvitedMember(memberId),
    enabled: roomInfo.roomId !== 0,
  });
};

export const useCheckIsRequestedMember = (memberId: number) => {
  const { roomInfo } = useHasRoomStore();

  return useQuery({
    queryKey: [`/rooms/pending-status/${memberId}`, memberId],
    queryFn: () => checkIsRequestedMember(memberId),
    enabled: roomInfo.roomId !== 0,
  });
};

export const useCancelInviteMember = (inviteeId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => cancelInviteMember(inviteeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/rooms/invited-status/${inviteeId}`] });
      showRejectToast('방 초대 요청을 취소했어요');
    },
  });
};

export const useCancelRequestRoom = (roomId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => cancelRequestRoom(roomId),
    onSuccess: () => {
      showSuccessToast('방 참여 요청을 취소했어요');
      queryClient.invalidateQueries({ queryKey: [`/rooms/${roomId}/pending-status`] });
      queryClient.invalidateQueries({ queryKey: [`/rooms/requested`] });
    },
  });
};

export const useCheckIsInvitedRoom = (roomId: number) => {
  return useSuspenseQuery({
    queryKey: [`/rooms/${roomId}/invited-status`, roomId],
    queryFn: () => checkIsInvitedRoom(roomId),
  });
};

export const useSearchRoom = (keyword: string) => {
  return useQuery({
    queryKey: [`/rooms/search`, keyword],
    queryFn: () => searchRoom(keyword),
    enabled: keyword !== '',
  });
};
