import { GetAxiosInstance, PatchAxiosInstance, PostAxiosInstance } from '@/axios/axios.method';

import { CreatePublicRoomRequest } from './request';
import {
  CheckHasRoomResponse,
  CheckIsRequestedRoomResponse,
  CheckRoomNameResponse,
  CreatePublicRoomResponse,
  ExitRoomResponse,
  GetReceivedRequestListResponse,
  GetRoomDetailResponse,
  GetSentRequestRoomListResponse,
  InviteMemberResponse,
  SendRoomRequestRequest,
} from './response';

// 사용자 -> 방 참여 요청 취소
// 방 삭제 기능 (방장 권한)
// 방장 -> 내방으로 초대 취소 기능

// 방 정보 조회 기능
export const getRoomDetail = async (roomId: number): Promise<GetRoomDetailResponse> => {
  const response = await GetAxiosInstance<GetRoomDetailResponse>(`/rooms/${roomId}`);

  return response.data;
};

// 사용자 -> 사용자가 참여 요청한 방인지 조회
export const checkIsRequestedRoom = async (
  roomId: number,
): Promise<CheckIsRequestedRoomResponse> => {
  const response = await GetAxiosInstance<CheckIsRequestedRoomResponse>(
    `/rooms/${roomId}/pending-status`,
  );

  return response.data;
};

// 사용자 -> 사용자가 초대받은 방인지 조회
// 우리방으로 초대한 멤버 목록 조회
// 방 검색

// 사용자가 참여 요청한 방 목록 조회
export const getSentRequestRoomList = async (
  page?: number,
  size?: number,
): Promise<GetSentRequestRoomListResponse> => {
  const response = await GetAxiosInstance<GetSentRequestRoomListResponse>(`/rooms/requested`, {
    params: {
      page,
      size,
    },
  });

  return response.data;
};

// 방장 -> 방에 참여 요청한 사용자인지 조회

// 방장에게 보이는 방 참여 요청 목록 조회
export const getReceivedRequestList = async (): Promise<GetReceivedRequestListResponse> => {
  const response = await GetAxiosInstance<GetReceivedRequestListResponse>(`/rooms/pending-members`);

  return response.data;
};

// 초대코드로 방 정보 조회 기능
// 사용자가 초대 요청받은 방 목록 조회
// 방장 -> 방장이 초대한 사용자인지 조회

// 로그인한 사용자가 참여한 방이 있는지 여부 조회
export const checkHasRoom = async (): Promise<CheckHasRoomResponse> => {
  const response = await GetAxiosInstance<CheckHasRoomResponse>(`/rooms/exist`);

  return response.data;
};

// 다른 사용자가 참여한 방이 있는지 여부 조회

// 방 이름 중복 검증
export const checkRoomName = async (roomName: string): Promise<CheckRoomNameResponse> => {
  const response = await GetAxiosInstance<CheckRoomNameResponse>(`/rooms/check-roomname`, {
    params: {
      roomName,
    },
  });

  return response.data;
};

// 방 정보 수정
// 공개방으로 전환
// 비공개방으로 전환

// 방 나가기 기능
export const exitRoom = async (roomId: number): Promise<ExitRoomResponse> => {
  const response = await PatchAxiosInstance<ExitRoomResponse>(`/rooms/${roomId}/quit`);

  return response.data;
};

// 방에서 강제 퇴장 시키기
// 방장 -> 방 참여 요청 수락/거절

// 사용자 -> 방 참여 요청
export const sendRoomRequest = async (roomId: number): Promise<SendRoomRequestRequest> => {
  const response = await PostAxiosInstance<SendRoomRequestRequest>(`/rooms/${roomId}/request-join`);

  return response.data;
};

// 방 입장 기능
// 사용자 -> 방 참여 요청/수락

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
