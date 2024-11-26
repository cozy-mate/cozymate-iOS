import { useMutation, useSuspenseQuery, UseMutationResult } from '@tanstack/react-query';

import { AddRuleRequest, UpdateRuleRequest } from '@server/requestTypes/rule';
import { addRule, updateRule, deleteRule, getRuleData } from '@server/api/rule';
import {
  AddRuleResponse,
  UpdateRuleResponse,
  DeleteRuleResponse,
  GetRuleDataResponse,
} from '@server/responseTypes/rule';

// Rule 삭제
export const useDeleteRule = (
  roomId: number,
  ruleId: number,
  refetch: () => void,
): UseMutationResult<DeleteRuleResponse, void> => {
  return useMutation({
    mutationFn: () => deleteRule(roomId, ruleId),
    onSuccess: () => refetch(),
  });
};

// Rule 조회
export const useGetRuleData = (
  roomId: number,
): { data: GetRuleDataResponse; refetch: () => void } => {
  const { data, refetch } = useSuspenseQuery({
    queryKey: ['ruledata', roomId],
    queryFn: () => getRuleData(roomId),
    select: (response: GetRuleDataResponse) => {
      return response;
    },
    refetchInterval: 3000,
  });

  return { data, refetch };
};

// Rule 생성
export const useAddRule = (
  roomId: number,
  refetchRuleData: () => void,
): UseMutationResult<AddRuleResponse, void, AddRuleRequest, unknown> => {
  return useMutation({
    mutationFn: (addRuleRequest: AddRuleRequest) => addRule(roomId, addRuleRequest),
    onSuccess: () => {
      refetchRuleData();
    },
  });
};

// Rule 수정
export const useUpdateRule = (
  roomId: number,
  ruleId: number,
  refetchRuleData: () => void,
): UseMutationResult<UpdateRuleResponse, void, AddRuleRequest, unknown> => {
  return useMutation({
    mutationFn: (updateRuleRequest: UpdateRuleRequest) =>
      updateRule(roomId, ruleId, updateRuleRequest),
    onSuccess: () => {
      refetchRuleData();
    },
  });
};
