import {
  DeleteAxiosInstance,
  GetAxiosInstance,
  PostAxiosInstance,
  PutAxiosInstance,
} from '@/axios/axios.method';

import { CreateRoleRequest, UpdateRoleRequest } from './request';
import {
  CreateRoleResponse,
  DeleteRoleResponse,
  GetRoleListResponse,
  UpdateRoleResponse,
} from './response';

// 특정 Role 삭제
export const deleteRole = async (roomId: number, roleId: number): Promise<DeleteRoleResponse> => {
  const response = await DeleteAxiosInstance<DeleteRoleResponse>(
    `/rooms/${roomId}/roles/${roleId}`,
  );

  return response.data;
};

// 특정 방의 Role 목록 조회
export const getRoleList = async (roomId: number): Promise<GetRoleListResponse> => {
  const response = await GetAxiosInstance<GetRoleListResponse>(`/rooms/${roomId}/roles`);

  return response.data;
};

// 특정 방의 Role 생성
export const createRole = async (
  roomId: number,
  data: CreateRoleRequest,
): Promise<CreateRoleResponse> => {
  const response = await PostAxiosInstance<CreateRoleResponse>(`/rooms/${roomId}/roles`, data);

  return response.data;
};

// 특정 Role 수정
export const updateRole = async (
  roomId: number,
  roleId: number,
  data: UpdateRoleRequest,
): Promise<UpdateRoleResponse> => {
  const response = await PutAxiosInstance<UpdateRoleResponse>(
    `/rooms/${roomId}/roles/${roleId}`,
    data,
  );

  return response.data;
};
