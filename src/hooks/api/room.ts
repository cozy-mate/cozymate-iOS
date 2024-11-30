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
  deleteRoom,
  getRoomData,
  checkHasRoom,
  inviteMember,
  checkRequested,
  sendRoomRequest,
  getRequestRooms,
  getRoomRequests,
  changeRoomPublic,
  deleteRoomRequest,
  getInvitedMembers,
  deleteInviteMember,
  searchRoomByKeyword,
  acceptRequestMember,
  checkRequestedToJoin,
} from '@server/api/room';
import {
  ExitRoomResponse,
  DeleteRoomResponse,
  GetRoomDataResponse,
  CheckHasRoomResponse,
  InviteMemberResponse,
  CheckRequestedResponse,
  SendRoomRequestResponse,
  GetRequestRoomsResponse,
  GetRoomRequestsResponse,
  ChangeRoomPublicResponse,
  DeleteRoomRequestResponse,
  GetInvitedMembersResponse,
  DeleteInviteMemberResponse,
  SearchRoomByKeywordResponse,
  AcceptRequestMemberResponse,
  CheckRequestedToJoinResponse,
} from '@server/responseTypes/room';

// 어플 시작 시 사용
// 사용자가 참여한 방이 있는지 여부 조회
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

export const useGetMyRoomData = (): UseSuspenseQueryResult<GetRoomDataResponse | null, void> => {
  const { myRoom } = useHasRoomStore();

  return useSuspenseQuery({
    queryKey: myRoom.hasRoom ? [`/rooms/${myRoom.roomId}`] : ['no-room'],
    queryFn: () => {
      if (!myRoom.hasRoom) {
        return Promise.resolve(null); // hasRoom이 false일 때 기본값 반환
      }
      return getRoomData(myRoom.roomId); // 실제 쿼리 실행
    },
  });
};

// 코지홈
// 1. 사용자 -> 참여 요청한 방 목록
export const useGetRequestRooms = (): UseQueryResult<GetRequestRoomsResponse, void> => {
  const { myRoom } = useHasRoomStore();

  return useQuery({
    queryKey: [`/rooms/requested`],
    queryFn: () => getRequestRooms(),
    enabled: !myRoom.hasRoom,
  });
};

// 2. 방장 -> 참여 요청한 멤버 목록
export const useGetRoomRequests = (): UseQueryResult<GetRoomRequestsResponse, void> => {
  const { myRoom } = useHasRoomStore();
  const { roomInfo } = useRoomInfoStore();

  return useQuery({
    queryKey: [`/rooms/pending-members`],
    queryFn: () => getRoomRequests(),
    enabled: myRoom.hasRoom && roomInfo.isRoomManager,
  });
};

// 추천 방 스크린
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

// 방 상세페이지에서 사용
// 공통
// 방 정보 조회 기능
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

// 우리 방으로 초대한 멤버 목록 조회
export const useGetInvitedMembers = (
  roomId: number,
): UseSuspenseQueryResult<GetInvitedMembersResponse> => {
  return useSuspenseQuery({
    queryKey: [`/rooms/${roomId}/invited-members`, roomId],
    queryFn: () => getInvitedMembers(roomId),
  });
};

// 방 나가기
export const useExitRoom = (
  roomId: number,
): UseMutationResult<ExitRoomResponse, void, unknown, unknown> => {
  return useMutation({
    mutationFn: () => exitRoom(roomId),
    onSuccess: () => {},
  });
};

// 방장
// 1. 방 삭제 기능
export const useDeleteRoom = (roomId: number): UseMutationResult<DeleteRoomResponse> => {
  return useMutation({
    mutationFn: () => deleteRoom(roomId),
  });
};

// 2. 공개방으로 전환
export const useChangeRoomPublic = (
  roomId: number,
): UseMutationResult<ChangeRoomPublicResponse, void, unknown, unknown> => {
  return useMutation({
    mutationFn: () => changeRoomPublic(roomId),
  });
};

// 사용자
// 1. 방 참여 요청 취소
export const useDeleteRoomRequest = (
  roomId: number,
  refetch: () => void,
): UseMutationResult<DeleteRoomRequestResponse, void, unknown, unknown> => {
  return useMutation({
    mutationFn: () => deleteRoomRequest(roomId),
    onSuccess: () => refetch(),
  });
};

// 2. 방 참여 요청 여부 조회
export const useCheckRequested = (
  roomId: number,
): UseSuspenseQueryResult<CheckRequestedResponse> => {
  return useSuspenseQuery({
    queryKey: [`/rooms/${roomId}/pending`, roomId],
    queryFn: () => checkRequested(roomId),
  });
};

// 3. 방 참여 요청
export const useSendRoomRequest = (
  roomId: number,
  refetch: () => void,
): UseMutationResult<SendRoomRequestResponse, void, unknown, unknown> => {
  return useMutation({
    mutationFn: () => sendRoomRequest(roomId),
    onSuccess: () => refetch(),
  });
};

// 유저 상세페이지
// 방장
// 0. 방 참여 요청 조회 여부
export const useCheckRequestedToJoin = (
  memberId: number,
): { data: CheckRequestedToJoinResponse | undefined; refetch: () => void } => {
  const { myRoom } = useHasRoomStore();

  const { data, refetch } = useQuery({
    queryKey: [`/rooms/invited-status/memberId`, memberId],
    queryFn: () => checkRequestedToJoin(memberId),
    select: (response: CheckRequestedToJoinResponse) => {
      return response;
    },
    enabled: myRoom.isRoomManager,
  });

  return { data, refetch };
};

// 1. 내 방으로 초대하기
export const useInviteMember = (
  inviteeId: number,
  refetch: () => void,
): UseMutationResult<InviteMemberResponse> => {
  return useMutation({
    mutationFn: () => inviteMember(inviteeId),
    onSuccess: () => {
      refetch();
    },
  });
};

// 2. 내 방으로 초대 취소하기
export const useDeleteInviteMember = (
  inviteeId: number,
  refetch: () => void,
): UseMutationResult<DeleteInviteMemberResponse> => {
  return useMutation({
    mutationFn: () => deleteInviteMember(inviteeId),
    onSuccess: () => {
      refetch();
    },
  });
};

// 3. 초대 요청 수락/거절
export const useAcceptRequestMember = (
  requesterId: number,
  refetchData: () => void,
  refetchStatus: () => void,
): UseMutationResult<AcceptRequestMemberResponse, unknown, boolean, unknown> => {
  return useMutation({
    mutationFn: (accept: boolean) => acceptRequestMember(requesterId, accept),
    onSuccess: () => {
      refetchData();
      refetchStatus();
    },
  });
};
