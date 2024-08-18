import { PostAxiosInstance, GetAxiosInstance, DeleteAxiosInstance } from '@axios/axios.method';
import { CreateRoomRequest, RequestInviteRequest } from '@server/requestTypes/room';
import {
  AcceptInviteResponse,
  CheckHasRoomResponse,
  CreateRoomResponse,
  DeleteRoomResponse,
  GetInviteRequestResponse,
  GetMateListsResponse,
  GetRoomDataByInviteCodeResponse,
  GetRoomDataResponse,
  JoinRoomResponse,
  RequestInviteResponse,
} from '@server/responseTypes/room';

// 방 삭제
export const deleteRoom = async (roomId: number, memberId: number): Promise<DeleteRoomResponse> => {
  const response = await DeleteAxiosInstance<DeleteRoomResponse>(`/rooms/${roomId}`, {
    params: {
      memberId: memberId,
    },
  });

  return response.data;
};

// 방 정보 조회
export const getRoomData = async (roomId: number): Promise<GetRoomDataResponse> => {
  const response = await GetAxiosInstance<GetRoomDataResponse>(`/rooms/${roomId}`);

  return response.data;
};

// 방에 초대할 코지메이트 목록 조회
export const getMateLists = async (roomId: number): Promise<GetMateListsResponse> => {
  const response = await GetAxiosInstance<GetMateListsResponse>(
    `/rooms/${roomId}/available-friends`,
  );

  return response.data;
};

// 방 초대 요청 조회
export const getInviteRequest = async (): Promise<GetInviteRequestResponse> => {
  const response = await GetAxiosInstance<GetInviteRequestResponse>(`/rooms/request-invites`);

  return response.data;
};

// 초대코드로 방 정보 조회
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

// 사용자가 참여한 방이 있는지 여부 조회
export const checkHasRoom = async (): Promise<CheckHasRoomResponse> => {
  const response = await GetAxiosInstance<CheckHasRoomResponse>(`/rooms/exist`);

  return response.data;
};

// 방 참여 확인
export const joinRoom = async (roomId: number, memberId: number): Promise<JoinRoomResponse> => {
  const response = await PostAxiosInstance<JoinRoomResponse>(`/rooms/${roomId}/join`, {
    params: {
      memberId: memberId,
    },
  });

  return response.data;
};

// 선택한 코지메이트 방에 초대요청 보내기
export const requestInvite = async (
  roomId: number,
  data: RequestInviteRequest,
): Promise<RequestInviteResponse> => {
  const response = await PostAxiosInstance<RequestInviteResponse>(`/rooms/${roomId}/invite`, data);

  return response.data;
};

// 방 초대 수락/거절
export const acceptInvite = async (
  roomId: number,
  accept: boolean,
): Promise<AcceptInviteResponse> => {
  const response = await PostAxiosInstance<AcceptInviteResponse>(
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

// 방 생성
export const createRoom = async (data: CreateRoomRequest): Promise<CreateRoomResponse> => {
  const response = await PostAxiosInstance<CreateRoomResponse>(`/rooms/create`, data);

  return response.data;
};
