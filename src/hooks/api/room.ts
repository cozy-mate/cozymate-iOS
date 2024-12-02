import {
  useQuery,
  useMutation,
  UseQueryResult,
  useSuspenseQuery,
  UseMutationResult,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';

import { useHasRoomStore, useRoomInfoStore } from '@zustand/room/room';

import { CreatePublicRoomRequest, CreatePrivateRoomRequest } from '@server/requestTypes/room';
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
  createPublicRoom,
  deleteRoomRequest,
  getInvitedMembers,
  createPrivateRoom,
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
  CreatePublicRoomResponse,
  DeleteRoomRequestResponse,
  GetInvitedMembersResponse,
  CreatePrivateRoomResponse,
  DeleteInviteMemberResponse,
  SearchRoomByKeywordResponse,
  AcceptRequestMemberResponse,
  CheckRequestedToJoinResponse,
} from '@server/responseTypes/room';

import { showRejectToast, showSuccessToast } from '@utils/toast';

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
        return Promise.resolve(null);
      }
      return getRoomData(myRoom.roomId);
    },
  });
};

// 공개 방 생성
export const useCreatePublicRoom = (): UseMutationResult<
  CreatePublicRoomResponse,
  void,
  CreatePublicRoomRequest
> => {
  return useMutation({
    mutationFn: (data: CreatePublicRoomRequest) => createPublicRoom(data),
  });
};

// 비공개 방 생성
export const useCreatePrivateRoom = (): UseMutationResult<
  CreatePrivateRoomResponse,
  void,
  CreatePrivateRoomRequest
> => {
  return useMutation({
    mutationFn: (data: CreatePrivateRoomRequest) => createPrivateRoom(data),
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
  const { clearMyRoom } = useHasRoomStore();
  const { clearRoomInfo } = useRoomInfoStore();

  return useMutation({
    mutationFn: () => exitRoom(roomId),
    onSuccess: () => {
      clearMyRoom();
      clearRoomInfo();
    },
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
  roomName: string,
): UseMutationResult<SendRoomRequestResponse, void, unknown, unknown> => {
  return useMutation({
    mutationFn: () => sendRoomRequest(roomId),
    onSuccess: () => {
      showSuccessToast(`${roomName}에 방 참여 요청을 보냈어요`);
      refetch();
    },
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
  nickname: string,
): UseMutationResult<InviteMemberResponse> => {
  return useMutation({
    mutationFn: () => inviteMember(inviteeId),
    onSuccess: () => {
      showSuccessToast(`${nickname}님에게 방 초대 요청을 보냈어요`);
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
  nickname: string,
): UseMutationResult<AcceptRequestMemberResponse, unknown, boolean, unknown> => {
  return useMutation({
    mutationFn: (accept: boolean) => acceptRequestMember(requesterId, accept),
    onSuccess: ({ result }: AcceptRequestMemberResponse) => {
      if (result === '초대 요청 수락 완료') {
        showSuccessToast(`${nickname}님의 방 초대 요청을 수락했어요`);
      }
      if (result === '초대 요청 거절 완료') {
        showRejectToast(`${nickname}님의 방 초대 요청을 거절했어요`);
      }
      refetchData();
      refetchStatus();
    },
  });
};
