import {
  DeleteAxiosInstance,
  GetAxiosInstance,
  PostAxiosInstance,
  PutAxiosInstance,
} from '@/axios/axios.method';

import { CreateRuleRequest, UpdateRuleRequest } from './request';
import {
  CreateRuleResponse,
  DeleteRuleResponse,
  GetRuleListResponse,
  UpdateRuleResponse,
} from './response';

// 특정 Rule 삭제
export const deleteRule = async (roomId: number, ruleId: number): Promise<DeleteRuleResponse> => {
  const response = await DeleteAxiosInstance<DeleteRuleResponse>(
    `/rooms/${roomId}/rules/${ruleId}`,
  );

  return response.data;
};

// 특정 방의 Rule 목록 조회
export const getRuleList = async (roomId: number): Promise<GetRuleListResponse> => {
  const response = await GetAxiosInstance<GetRuleListResponse>(`/rooms/${roomId}/rules`);

  return response.data;
};

// 특정 방의 Rule 생성
export const createRule = async (
  roomId: number,
  data: CreateRuleRequest,
): Promise<CreateRuleResponse> => {
  const response = await PostAxiosInstance<CreateRuleResponse>(`/rooms/${roomId}/rules`, data);

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
