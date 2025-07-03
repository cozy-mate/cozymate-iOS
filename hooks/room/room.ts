import { StackActions } from '@react-navigation/native';
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useRouter, useNavigationContainerRef } from 'expo-router';
import React from 'react';

import { CreatePublicRoomRequest } from '@/server/room/request';
import { CreatePublicRoomResponse, GetRoomByInviteCodeResponse } from '@/server/room/response';
import {
  checkHasRoom,
  createPublicRoom,
  exitRoom,
  getRoomByInviteCode,
  getRoomDetail,
  joinRoom,
  searchRoom,
} from '@/server/room/room';
import { RoomItem } from '@/type/room';
import { showRejectToast } from '@/utils/toast';
import { useCreateRoomStore, useHasRoomStore } from '@/zustand/room/room';

// 내 방 정보 조회
export const useGetMyRoomDetail = (roomId: number) => {
  return useQuery({
    queryKey: [`/rooms/${roomId}/myRoom`, roomId],
    queryFn: () => getRoomDetail(roomId),
    enabled: roomId !== 0,
  });
};

// 방 정보 조회 기능
export const useGetRoomDetail = (roomId: number) => {
  return useSuspenseQuery({
    queryKey: [`/rooms/${roomId}`, roomId],
    queryFn: () => getRoomDetail(roomId),
  });
};

// 방 검색
export const useSearchRoom = (keyword: string) => {
  return useQuery({
    queryKey: [`/rooms/search`, keyword],
    queryFn: () => searchRoom(keyword),
    enabled: keyword !== '',
  });
};

// 초대코드로 방 정보 조회 기능
export const useGetRoomByInviteCode = (
  setRoomInfo: React.Dispatch<React.SetStateAction<RoomItem | null>>,
  setIsRoomInfoModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsWrongInviteCodeModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  return useMutation({
    mutationFn: (inviteCode: string) => getRoomByInviteCode(inviteCode),
    onSuccess: (response: GetRoomByInviteCodeResponse) => {
      setRoomInfo(response.result);
      setIsRoomInfoModalOpen(true);
    },
    onError: (error: any) => {
      console.log(error.response?.data);
      const message = error.response?.data?.message;

      if (message === '존재하지 않는 방입니다.') {
        setIsWrongInviteCodeModalOpen(true);
      } else if (message === '일치하지 않는 성별입니다.') {
        showRejectToast('성별이 다르면 방에 참여할 수 없어요');
      } else {
        setIsWrongInviteCodeModalOpen(true);
      }
    },
  });
};

// 로그인한 사용자가 참여한 방이 있는지 여부 조회
export const useCheckHasRoom = () => {
  return useSuspenseQuery({
    queryKey: [`/rooms/exist`],
    queryFn: () => checkHasRoom(),
  });
};

// 방 나가기 기능
export const useExitRoom = (roomId: number) => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const { setRoomInfo } = useHasRoomStore();

  const rootNavigation = useNavigationContainerRef();

  return useMutation({
    mutationFn: () => exitRoom(roomId),
    onSuccess: () => {
      setRoomInfo({ roomId: 0, isRoomManager: false });

      queryClient.invalidateQueries({ queryKey: [`/rooms/exist`] });
      queryClient.invalidateQueries({ queryKey: [`/rooms/${roomId}`, roomId] });
      queryClient.invalidateQueries({ queryKey: [`/rooms/${roomId}/myRoom`, roomId] });

      rootNavigation.dispatch(StackActions.popToTop());
      router.replace('/(tabs)/cozyHome');
    },
  });
};

// 방 입장 기능
export const useJoinRoom = (roomId: number) => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const { setRoomInfo } = useHasRoomStore();

  return useMutation({
    mutationFn: () => joinRoom(roomId),
    onSuccess: (data) => {
      setRoomInfo({ roomId: roomId, isRoomManager: false });

      queryClient.invalidateQueries({ queryKey: [`/rooms/exist`] });
      queryClient.invalidateQueries({ queryKey: [`/rooms/${roomId}/myRoom`, roomId] });
      router.back();
    },
  });
};

// 공개 방 생성 기능
export const useCreatePublicRoom = () => {
  const router = useRouter();

  const { clearCreateRoomInfo } = useCreateRoomStore();
  const { setRoomInfo } = useHasRoomStore();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePublicRoomRequest) => createPublicRoom(data),
    onSuccess: (response: CreatePublicRoomResponse) => {
      setRoomInfo({ roomId: response.result.roomId, isRoomManager: true });

      queryClient.invalidateQueries({ queryKey: [`/rooms/exist`] });
      queryClient.invalidateQueries({
        queryKey: [`/rooms/${response.result.roomId}/myRoom`, response.result.roomId],
      });

      setTimeout(() => router.back(), 100);
      clearCreateRoomInfo();
    },
  });
};
