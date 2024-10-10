import { useMutation, useSuspenseQuery, UseMutationResult } from '@tanstack/react-query';

import { addRule, getRuleData } from '@server/api/rule';
import { AddRuleRequest } from '@server/requestTypes/rule';
import { AddRuleResponse, GetRuleDataResponse } from '@server/responseTypes/rule';

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
