import { GetAxiosInstance, PostAxiosInstance, DeleteAxiosInstance } from '@axios/axios.method';

import { AddRuleRequest } from '@server/requestTypes/rule';
import {
  AddRuleResponse,
  DeleteRuleResponse,
  GetRuleDataResponse,
} from '@server/responseTypes/rule';

// 특정 방의 특정 Rule 삭제
export const deleteRule = async (roomId: number, ruleId: number): Promise<DeleteRuleResponse> => {
  const response = await DeleteAxiosInstance<DeleteRuleResponse>(`/rule/${roomId}`, {
    params: {
      ruleId: ruleId,
    },
  });

  return response.data;
};

// 특정 방의 Rule 목록 조회
export const getRuleData = async (roomId: number): Promise<GetRuleDataResponse> => {
  const response = await GetAxiosInstance<GetRuleDataResponse>(`/rule/${roomId}`);

  return response.data;
};

// 특정 방의 Rule 생성
export const addRule = async (roomId: number, data: AddRuleRequest): Promise<AddRuleResponse> => {
  const response = await PostAxiosInstance<AddRuleResponse>(`/rule/${roomId}`, data);

  return response.data;
};
