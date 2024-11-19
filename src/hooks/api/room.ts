import {
  useQuery,
  useMutation,
  UseQueryResult,
  useSuspenseQuery,
  UseMutationResult,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';

import { useHasRoomStore, useRoomInfoStore } from '@zustand/room/room';

import {
  exitRoom,
  getRoomData,
  checkHasRoom,
  checkRequested,
  sendRoomRequest,
  getRequestRooms,
  getRoomRequests,
  changeRoomPublic,
  deleteRoomRequest,
  searchRoomByKeyword,
} from '@server/api/room';
import {
  ExitRoomResponse,
  GetRoomDataResponse,
  CheckHasRoomResponse,
  CheckRequestedResponse,
  SendRoomRequestResponse,
  GetRequestRoomsResponse,
  GetRoomRequestsResponse,
  ChangeRoomPublicResponse,
  DeleteRoomRequestResponse,
  SearchRoomByKeywordResponse,
} from '@server/responseTypes/room';

export const useCheckHasRoom = (): {
  data: CheckHasRoomResponse | undefined;
  refetch: () => void;
} => {
  const { data, refetch } = useSuspenseQuery({
    queryKey: ['hasRoom'],
    queryFn: () => checkHasRoom(),
    select: (reseponse: CheckHasRoomResponse) => {
      return reseponse;
    },
  });

  return { data, refetch };
};

export const useGetRoomData = (
  roomId: number,
): { data: GetRoomDataResponse; refetch: () => void } => {
  const { data, refetch } = useSuspenseQuery({
    queryKey: ['roomdata', roomId],
    queryFn: () => getRoomData(roomId),
    select: (response: GetRoomDataResponse) => {
      return response;
    },
  });

  return { data, refetch };
};

// 사용자 -> 참여 요청한 방 목록
export const useGetRequestRooms = (): UseQueryResult<GetRequestRoomsResponse, void> => {
  const { myRoom } = useHasRoomStore();

  return useQuery({
    queryKey: [`/rooms/requested`],
    queryFn: () => getRequestRooms(),
    enabled: !myRoom.hasRoom,
  });
};

// 방장 -> 참여 요청한 멤버 목록
export const useGetRoomRequests = (): UseQueryResult<GetRoomRequestsResponse, void> => {
  const { myRoom } = useHasRoomStore();
  const { roomInfo } = useRoomInfoStore();

  return useQuery({
    queryKey: [`/rooms/pending-members`],
    queryFn: () => getRoomRequests(),
    enabled: myRoom.hasRoom && roomInfo.isRoomManager,
  });
};

// 방 상세페이지에서 사용
// 0. 방 참여 요청 여부 확인
export const useCheckRequested = (
  roomId: number,
): UseSuspenseQueryResult<CheckRequestedResponse, void> => {
  return useSuspenseQuery({
    queryKey: [`/rooms/${roomId}/pending-status`, roomId],
    queryFn: () => checkRequested(roomId),
  });
};

// 1. 방 참여 요청
export const useSendRoomRequest = (
  roomId: number,
  refetch: () => void,
): UseMutationResult<SendRoomRequestResponse, void, unknown, unknown> => {
  return useMutation({
    mutationFn: () => sendRoomRequest(roomId),
    onSuccess: () => refetch(),
  });
};

// 2. 방 참여 요청 취소
export const useDeleteRoomRequest = (
  roomId: number,
  refetch: () => void,
): UseMutationResult<DeleteRoomRequestResponse, void, unknown, unknown> => {
  return useMutation({
    mutationFn: () => deleteRoomRequest(roomId),
    onSuccess: () => refetch(),
  });
};

// 3. 방 나가기
export const useExitRoom = (
  roomId: number,
): UseMutationResult<ExitRoomResponse, void, unknown, unknown> => {
  return useMutation({
    mutationFn: () => exitRoom(roomId),
    onSuccess: () => {},
  });
};

// 4. 공개방으로 전환
export const useChangeRoomPublic = (
  roomId: number,
): UseMutationResult<ChangeRoomPublicResponse, void, unknown, unknown> => {
  return useMutation({
    mutationFn: () => changeRoomPublic(roomId),
  });
};

// 방 검색
export const useSearchRoomByKeyword = (
  keyword: string,
): UseQueryResult<SearchRoomByKeywordResponse> => {
  return useQuery({
    queryKey: [`/rooms/search`, keyword],
    queryFn: () => searchRoomByKeyword(keyword),
    enabled: keyword !== '',
  });
};
