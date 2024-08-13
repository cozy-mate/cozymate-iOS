import { PostAxiosInstance, GetAxiosInstance, DeleteAxiosInstance } from '@axios/axios.method';
import { CreateRoomRequest } from '@server/requestTypes/room';
import {
  CreateRoomResponse,
  DeleteRoomResponse,
  GetRoomDataByInviteCodeResponse,
  GetRoomDataResponse,
  JoinRoomResponse,
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

// 생성한 방 정보 조회
export const getRoomData = async (
  roomId: number,
  memberId: number,
): Promise<GetRoomDataResponse> => {
  const response = await GetAxiosInstance<GetRoomDataResponse>(`/rooms/${roomId}}`, {
    params: {
      memberId: memberId,
    },
  });

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

// 방 참여 확인
export const joinRoom = async (roomId: number, memberId: number): Promise<JoinRoomResponse> => {
  const response = await PostAxiosInstance<JoinRoomResponse>(`/rooms/${roomId}/join`, {
    params: {
      memberId: memberId,
    },
  });

  return response.data;
};

// 방 생성
export const createRoom = async (data: CreateRoomRequest): Promise<CreateRoomResponse> => {
  const response = await PostAxiosInstance<CreateRoomResponse>(`/rooms/create`, data);

  return response.data;
};
