import { CommonActions, useNavigation } from '@react-navigation/native';
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import React from 'react';

import { matchMultiQueries, queries } from '@/server';
import { CreatePublicRoomRequest } from '@/server/room/request';
import { CreatePublicRoomResponse, GetRoomByInviteCodeResponse } from '@/server/room/response';
import { createPublicRoom, exitRoom, getRoomByInviteCode, joinRoom } from '@/server/room/room';
import { RoomItem } from '@/type/room';
import { showRejectToast } from '@/utils/toast';
import { useCreateRoomStore } from '@/zustand/room/room';
import { useMemberStore } from '@/zustand/store';

// 내 방 정보 조회
export const useGetMyRoomDetail = (roomId: number) => {
  return useQuery({
    ...queries.room.myRoomDetail({ roomId }),
    enabled: roomId !== 0,
  });
};

// 방 정보 조회 기능
export const useGetRoomDetail = (roomId: number) => {
  return useSuspenseQuery({
    ...queries.room.detail({ roomId }),
    // 오류가 발생했을 때 refetch를 시도하는 것 방지
    retry: false,
  });
};

// 방 검색
export const useSearchRoom = (keyword: string) => {
  return useQuery({
    ...queries.room.searchRoom({ keyword }),
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
    ...queries.room.checkHasRoom(),
  });
};

// 방 나가기 기능
export const useExitRoom = (roomId: number) => {
  const queryClient = useQueryClient();

  const { clearRoom } = useMemberStore();

  const navigation = useNavigation();

  return useMutation({
    mutationFn: () => exitRoom(roomId),
    onSuccess: () => {
      clearRoom();

      queryClient.invalidateQueries({
        predicate: matchMultiQueries([
          queries.room.checkHasRoom._def,
          queries.room.detail({ roomId }).queryKey,
          queries.room.myRoomDetail({ roomId }).queryKey,
        ]),
      });

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: '(tabs)' }],
        }),
      );
    },
  });
};

// 방 입장 기능
export const useJoinRoom = (roomId: number) => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const { setRoom } = useMemberStore();

  return useMutation({
    mutationFn: () => joinRoom(roomId),
    onSuccess: () => {
      setRoom({ roomId: roomId, isRoomManager: false });

      queryClient.invalidateQueries({
        predicate: matchMultiQueries([
          queries.room.checkHasRoom._def,
          queries.room.myRoomDetail({ roomId }).queryKey,
        ]),
      });

      router.back();
    },
  });
};

// 공개 방 생성 기능
export const useCreatePublicRoom = () => {
  const navigation = useNavigation();

  const { clearCreateRoomInfo } = useCreateRoomStore();
  const { setRoom } = useMemberStore();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePublicRoomRequest) => createPublicRoom(data),
    onSuccess: (response: CreatePublicRoomResponse) => {
      const { roomId } = response.result;

      setRoom({ roomId, isRoomManager: true });

      queryClient.invalidateQueries({
        predicate: matchMultiQueries([
          queries.room.checkHasRoom._def,
          queries.room.myRoomDetail({ roomId }).queryKey,
        ]),
      });

      setTimeout(
        () =>
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: '(tabs)' }],
            }),
          ),
        100,
      );
      clearCreateRoomInfo();
    },
  });
};
