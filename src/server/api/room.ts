import {
  GetAxiosInstance,
  PostAxiosInstance,
  PatchAxiosInstance,
  DeleteAxiosInstance,
} from '@axios/axios.method';

import { CreatePublicRoomRequest, CreatePrivateRoomRequest } from '@server/requestTypes/room';
import {
  JoinRoomResponse,
  ExitRoomResponse,
  DeleteRoomResponse,
  GetRoomDataResponse,
  CheckHasRoomResponse,
  CheckRoomNameResponse,
  CreatePublicRoomResponse,
  CreatePrivateRoomResponse,
  GetRoomDataByInviteCodeResponse,
} from '@server/responseTypes/room';

// 방 삭제 기능 (방장 권한)
export const deleteRoom = async (roomId: number, memberId: number): Promise<DeleteRoomResponse> => {
  const response = await DeleteAxiosInstance<DeleteRoomResponse>(`/rooms/${roomId}`, {
    params: {
      memberId: memberId,
    },
  });

  return response.data;
};

// 방 정보 조회 기능
export const getRoomData = async (roomId: number): Promise<GetRoomDataResponse> => {
  const response = await GetAxiosInstance<GetRoomDataResponse>(`/rooms/${roomId}`);

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

// 사용자가 참여한 방이 있는지 여부 조회
export const checkHasRoom = async (): Promise<CheckHasRoomResponse> => {
  const response = await GetAxiosInstance<CheckHasRoomResponse>(`/rooms/exist`);

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

// 방 나가기 기능
export const exitRoom = async (roomId: number): Promise<ExitRoomResponse> => {
  const response = await PatchAxiosInstance<ExitRoomResponse>(`/rooms/${roomId}/quit`);

  return response.data;
};

// 방 입장 기능
export const joinRoom = async (roomId: number): Promise<JoinRoomResponse> => {
  const response = await PostAxiosInstance<JoinRoomResponse>(`/rooms/${roomId}/join`);

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
