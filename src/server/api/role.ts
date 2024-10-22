import {
  GetAxiosInstance,
  PostAxiosInstance,
  PatchAxiosInstance,
  DeleteAxiosInstance,
} from '@axios/axios.method';

import { AddRoleRequest, UpdateRoleRequest } from '@server/requestTypes/role';
import {
  AddRoleResponse,
  DeleteRoleResponse,
  UpdateRoleResponse,
  GetRoleDataResponse,
} from '@server/responseTypes/role';

// 특정 Role 삭제
export const deleteRole = async (roomId: number, roleId: number): Promise<DeleteRoleResponse> => {
  const response = await DeleteAxiosInstance<DeleteRoleResponse>(
    `/rooms/${roomId}/roles/${roleId}`,
  );

  return response.data;
};

// 특정 방의 Role 목록 조회
export const getRoleData = async (roomId: number): Promise<GetRoleDataResponse> => {
  const response = await GetAxiosInstance<GetRoleDataResponse>(`/rooms/${roomId}/roles`);

  return response.data;
};

// 특정 Role 수정
export const updateRole = async (
  roomId: number,
  roleId: number,
  data: UpdateRoleRequest,
): Promise<UpdateRoleResponse> => {
  const response = await PatchAxiosInstance<UpdateRoleResponse>(
    `/rooms/${roomId}/roles/${roleId}`,
    data,
  );

  return response.data;
};

// 특정 방에 Role 생성
export const addRole = async (roomId: number, data: AddRoleRequest): Promise<AddRoleResponse> => {
  const response = await PostAxiosInstance<AddRoleResponse>(`/rooms/${roomId}/roles`, data);

  return response.data;
};
