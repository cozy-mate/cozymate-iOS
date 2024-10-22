import {
  GetAxiosInstance,
  PutAxiosInstance,
  PostAxiosInstance,
  DeleteAxiosInstance,
} from '@axios/axios.method';

import { AddRuleRequest, UpdateRuleRequest } from '@server/requestTypes/rule';
import {
  AddRuleResponse,
  DeleteRuleResponse,
  UpdateRuleResponse,
  GetRuleDataResponse,
} from '@server/responseTypes/rule';

// 특정 Rule 삭제
export const deleteRule = async (roomId: number, ruleId: number): Promise<DeleteRuleResponse> => {
  const response = await DeleteAxiosInstance<DeleteRuleResponse>(`/rooms/${roomId}/rule/${ruleId}`);

  return response.data;
};

// 특정 방의 Rule 목록 조회
export const getRuleData = async (roomId: number): Promise<GetRuleDataResponse> => {
  const response = await GetAxiosInstance<GetRuleDataResponse>(`/rooms/${roomId}/rules`);

  return response.data;
};

// 특정 방의 Rule 생성
export const addRule = async (roomId: number, data: AddRuleRequest): Promise<AddRuleResponse> => {
  const response = await PostAxiosInstance<AddRuleResponse>(`/rooms/${roomId}/rules`, data);

  return response.data;
};

// 특정 Rule 수정
export const updateRule = async (
  roomId: number,
  ruleId: number,
  data: UpdateRuleRequest,
): Promise<UpdateRuleResponse> => {
  const response = await PutAxiosInstance<UpdateRuleResponse>(
    `/rooms/${roomId}/rules/${ruleId}`,
    data,
  );

  return response.data;
};
