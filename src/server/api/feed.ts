import { GetAxiosInstance, PutAxiosInstance, PostAxiosInstance } from '@axios/axios.method';

import { CreateFeedRequest, UpdateFeedRequest } from '@server/requestTypes/feed';
import {
  GetFeedResponse,
  CreateFeedResponse,
  UpdateFeedResponse,
} from '@server/responseTypes/feed';

// 피드 정보 조회하기
export const getFeedData = async (roomId: number): Promise<GetFeedResponse> => {
  const response = await GetAxiosInstance<GetFeedResponse>(`/feed/${roomId}`);
  return response.data;
};

// 피드 생성
export const createFeed = async (data: CreateFeedRequest): Promise<CreateFeedResponse> => {
  const response = await PostAxiosInstance<CreateFeedResponse>(`/feed`, data);
  return response.data;
};

// 피드 정보 수정하기
export const updateFeed = async (data: UpdateFeedRequest): Promise<UpdateFeedResponse> => {
  const response = await PutAxiosInstance<UpdateFeedResponse>(`/feed`, data);
  return response.data;
};
