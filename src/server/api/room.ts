import {
  GetAxiosInstance,
  PostAxiosInstance,
  PatchAxiosInstance,
  DeleteAxiosInstance,
} from '@axios/axios.method';

import {
  UpdateRoomRequest,
  CreatePublicRoomRequest,
  CreatePrivateRoomRequest,
} from '@server/requestTypes/room';
import {
  JoinRoomResponse,
  ExitRoomResponse,
  DeleteRoomResponse,
  UpdateRoomResponse,
  GetRoomDataResponse,
  CheckHasRoomResponse,
  AcceptInviteResponse,
  InviteMemberResponse,
  CheckRoomNameResponse,
  GetRequestRoomsResponse,
  GetInvitedRoomsResponse,
  ForceExitMemberResponse,
  SendRoomRequestResponse,
  CreatePublicRoomResponse,
  ChangeRoomPublicResponse,
  CreatePrivateRoomResponse,
  GetInvitedMembersResponse,
  CheckOtherHasRoomResponse,
  AcceptRequestRoomResponse,
  DeleteRoomRequestResponse,
  DeleteInviteMemberResponse,
  AcceptRequestMemberResponse,
  GetRoomDataByInviteCodeResponse,
} from '@server/responseTypes/room';

// 사용자 -> 방 참여 요청 취소
export const deleteRoomRequest = async (roomId: number): Promise<DeleteRoomRequestResponse> => {
  const response = await DeleteAxiosInstance<DeleteRoomRequestResponse>(
    `/rooms/${roomId}/request-join`,
  );

  return response.data;
};

// 방 삭제 기능 (방장 권한)
export const deleteRoom = async (roomId: number, memberId: number): Promise<DeleteRoomResponse> => {
  const response = await DeleteAxiosInstance<DeleteRoomResponse>(`/rooms/${roomId}`, {
    params: {
      memberId: memberId,
    },
  });

  return response.data;
};

// 방장 -> 내방으로 초대 취소 기능
export const deleteInviteMember = async (
  inviteeId: number,
): Promise<DeleteInviteMemberResponse> => {
  const response = await DeleteAxiosInstance<DeleteInviteMemberResponse>(
    `/rooms/invitee/${inviteeId}`,
  );

  return response.data;
};

// 방 정보 조회 기능
export const getRoomData = async (roomId: number): Promise<GetRoomDataResponse> => {
  const response = await GetAxiosInstance<GetRoomDataResponse>(`/rooms/${roomId}`);

  return response.data;
};

// 우리방으로 초대한 멤버 목록 조회
export const getInvitedMembers = async (roomId: number): Promise<GetInvitedMembersResponse> => {
  const response = await GetAxiosInstance<GetInvitedMembersResponse>(
    `/rooms/${roomId}/invited-members`,
  );

  return response.data;
};

// 사용자가 참여 요청한 방 목록 조회
export const getRequestRooms = async (): Promise<GetRequestRoomsResponse> => {
  const response = await GetAxiosInstance<GetRequestRoomsResponse>(`/rooms/requested`);

  return response.data;
};

// 초대코드로 방 정보 조회 기능
export const getRoomDataByInviteCode = async (
  inviteCode: string,
): Promise<GetRoomDataByInviteCodeResponse> => {
  const response = await GetAxiosInstance<GetRoomDataByInviteCodeResponse>(`/rooms/join`, {
    params: {
      inviteCode: inviteCode,
    },
  });

  return response.data;
};

// 사용자가 초대 요청받은 방 목록 조회
export const getInvitedRooms = async (): Promise<GetInvitedRoomsResponse> => {
  const response = await GetAxiosInstance<GetInvitedRoomsResponse>(`/rooms/invited`);

  return response.data;
};

// 로그인한 사용자가 참여한 방이 있는지 여부 조회
export const checkHasRoom = async (): Promise<CheckHasRoomResponse> => {
  const response = await GetAxiosInstance<CheckHasRoomResponse>(`/rooms/exist`);

  return response.data;
};

// 다른 사용자가 참여한 방이 있는지 여부 조회
export const checkOtherHasRoom = async (memberId: number): Promise<CheckOtherHasRoomResponse> => {
  const response = await GetAxiosInstance<CheckOtherHasRoomResponse>(`/rooms/exist/${memberId}`);

  return response.data;
};

// 방 이름 중복 검증
export const checkRoomName = async (roomName: string): Promise<CheckRoomNameResponse> => {
  const response = await GetAxiosInstance<CheckRoomNameResponse>(`/rooms/check-roomname`, {
    params: {
      roomName: roomName,
    },
  });

  return response.data;
};

// 방 정보 수정
export const updateRoom = async (
  roomId: number,
  data: UpdateRoomRequest,
): Promise<UpdateRoomResponse> => {
  const response = await PatchAxiosInstance<UpdateRoomResponse>(`/rooms/${roomId}`, data);

  return response.data;
};

// 공개방으로 전환
export const changeRoomPublic = async (roomId: number): Promise<ChangeRoomPublicResponse> => {
  const response = await PatchAxiosInstance<ChangeRoomPublicResponse>(`/rooms/${roomId}/to-public`);

  return response.data;
};

// 방 나가기 기능
export const exitRoom = async (roomId: number): Promise<ExitRoomResponse> => {
  const response = await PatchAxiosInstance<ExitRoomResponse>(`/rooms/${roomId}/quit`);

  return response.data;
};

// 방에서 강제 퇴장 시키기
export const forceExitMember = async (
  roomId: number,
  memberId: number,
): Promise<ForceExitMemberResponse> => {
  const response = await PatchAxiosInstance<ForceExitMemberResponse>(
    `/rooms/${roomId}/force-quit/${memberId}`,
  );

  return response.data;
};

// 방장 -> 방 참여 요청 수락/거절
export const acceptRequestMember = async (
  requesterId: number,
  accept: boolean,
): Promise<AcceptRequestMemberResponse> => {
  const response = await PatchAxiosInstance<AcceptInviteResponse>(
    `/rooms/request-join/${requesterId}`,
    null,
    {
      params: {
        accept: accept,
      },
    },
  );

  return response.data;
};

// 사용자 -> 방 참여 요청
export const sendRoomRequest = async (roomId: number): Promise<SendRoomRequestResponse> => {
  const response = await PostAxiosInstance<SendRoomRequestResponse>(
    `/rooms/${roomId}/request-join`,
  );

  return response.data;
};

// 방 입장 기능
export const joinRoom = async (roomId: number): Promise<JoinRoomResponse> => {
  const response = await PostAxiosInstance<JoinRoomResponse>(`/rooms/${roomId}/join`);

  return response.data;
};

// 사용자 방 초대 요청/수락
export const acceptRequestRoom = async (
  roomId: number,
  accept: boolean,
): Promise<AcceptRequestRoomResponse> => {
  const response = await PostAxiosInstance<AcceptRequestRoomResponse>(
    `/rooms/${roomId}/invite-request`,
    null,
    {
      params: {
        accept: accept,
      },
    },
  );

  return response.data;
};

// 방장 -> 내방으로 초대하기
export const inviteMember = async (inviteeId: number): Promise<InviteMemberResponse> => {
  const response = await PostAxiosInstance<InviteMemberResponse>(`/rooms/invite/${inviteeId}`);

  return response.data;
};

// 공개 방 생성 기능
export const createPublicRoom = async (
  data: CreatePublicRoomRequest,
): Promise<CreatePublicRoomResponse> => {
  const response = await PostAxiosInstance<CreatePublicRoomResponse>(`/rooms/create-public`, data);

  return response.data;
};

// 초대코드로 방생성 기능
export const createPrivateRoom = async (
  data: CreatePrivateRoomRequest,
): Promise<CreatePrivateRoomResponse> => {
  const response = await PostAxiosInstance<CreatePrivateRoomResponse>(
    `/rooms/create-private`,
    data,
  );

  return response.data;
};
