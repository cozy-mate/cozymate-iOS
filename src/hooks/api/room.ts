import {
  useQuery,
  useMutation,
  UseQueryResult,
  useSuspenseQuery,
  UseMutationResult,
} from '@tanstack/react-query';

import {
  exitRoom,
  getRoomData,
  checkHasRoom,
  sendRoomRequest,
  getRequestRooms,
  deleteRoomRequest,
} from '@server/api/room';
import {
  ExitRoomResponse,
  GetRoomDataResponse,
  CheckHasRoomResponse,
  SendRoomRequestResponse,
  GetRequestRoomsResponse,
  DeleteRoomRequestResponse,
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

export const useGetRequestRooms = (): UseQueryResult<GetRequestRoomsResponse, void> => {
  return useQuery({
    queryKey: [`/rooms/requested`],
    queryFn: () => getRequestRooms(),
  });
};

// 방 상세페이지에서 사용
// 1. 방 참여 요청
export const useSendRoomRequest = (
  roomId: number,
): UseMutationResult<SendRoomRequestResponse, void, unknown, unknown> => {
  return useMutation({
    mutationFn: () => sendRoomRequest(roomId),
    onSuccess: () => {},
  });
};

// 2. 방 참여 요청 취소
export const useDeleteRoomRequest = (
  roomId: number,
): UseMutationResult<DeleteRoomRequestResponse, void, unknown, unknown> => {
  return useMutation({
    mutationFn: () => deleteRoomRequest(roomId),
    onSuccess: () => {},
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
