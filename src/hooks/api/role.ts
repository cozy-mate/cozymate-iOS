import { useMutation, useSuspenseQuery, UseMutationResult } from '@tanstack/react-query';

import { AddRoleRequest, UpdateRoleRequest } from '@server/requestTypes/role';
import { addRole, updateRole, deleteRole, getRoleData } from '@server/api/role';
import {
  AddRoleResponse,
  UpdateRoleResponse,
  DeleteRoleResponse,
  GetRoleDataResponse,
} from '@server/responseTypes/role';

// Role 삭제
export const useDeleteRole = (
  roomId: number,
  roleId: number,
  refetch: () => void,
): UseMutationResult<DeleteRoleResponse, void> => {
  return useMutation({
    mutationFn: () => deleteRole(roomId, roleId),
    onSuccess: () => refetch(),
  });
};

// Role 생성
export const useAddRole = (
  roomId: number,
  refetchRuleData: () => void,
  refetchTodoData: () => void,
): UseMutationResult<AddRoleResponse, void, AddRoleRequest, unknown> => {
  return useMutation({
    mutationFn: (addRoleRequest: AddRoleRequest) => addRole(roomId, addRoleRequest),
    onSuccess: () => {
      refetchRuleData();
      refetchTodoData();
    },
  });
};

// Role 조회
export const useGetRoleData = (
  roomId: number,
): { data: GetRoleDataResponse; refetch: () => void } => {
  const { data, refetch } = useSuspenseQuery({
    queryKey: ['roledata', roomId],
    queryFn: () => getRoleData(roomId),
    select: (response: GetRoleDataResponse) => {
      return response;
    },
    refetchInterval: 3000,
  });

  return { data, refetch };
};

// Role 수정
export const useUpdateRole = (
  roomId: number,
  roleId: number,
  refetchRoleData: () => void,
): UseMutationResult<UpdateRoleResponse, void, UpdateRoleRequest, unknown> => {
  return useMutation({
    mutationFn: (updateRoleRequest: UpdateRoleRequest) =>
      updateRole(roomId, roleId, updateRoleRequest),
    onSuccess: () => {
      refetchRoleData();
    },
  });
};
