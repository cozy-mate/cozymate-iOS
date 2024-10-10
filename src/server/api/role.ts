import { GetAxiosInstance, PostAxiosInstance, DeleteAxiosInstance } from '@axios/axios.method';

import { AddRoleRequest } from '@server/requestTypes/role';
import {
  AddRoleResponse,
  DeleteRoleResponse,
  GetRoleDataResponse,
} from '@server/responseTypes/role';

// 특정 Role 삭제
export const deleteRole = async (roomId: number, roleId: number): Promise<DeleteRoleResponse> => {
  const response = await DeleteAxiosInstance<DeleteRoleResponse>(`/rold/${roomId}`, {
    params: {
      roleId: roleId,
    },
  });

  return response.data;
};

// 특정 방의 Role 목록 조회
export const getRoleData = async (roomId: number): Promise<GetRoleDataResponse> => {
  const response = await GetAxiosInstance<GetRoleDataResponse>(`/role/${roomId}`);

  return response.data;
};

// 특정 방의 Role 생성
export const addRole = async (roomId: number, data: AddRoleRequest): Promise<AddRoleResponse> => {
  const response = await PostAxiosInstance<AddRoleResponse>(`/role/${roomId}`, data);

  return response.data;
};
