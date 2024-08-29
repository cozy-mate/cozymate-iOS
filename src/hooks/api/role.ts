import { addRole, getRoleData } from '@server/api/role';
import { AddRoleRequest } from '@server/requestTypes/role';
import { AddRoleResponse, GetRoleDataResponse } from '@server/responseTypes/role';
import { useMutation, UseMutationResult, useSuspenseQuery } from '@tanstack/react-query';

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
