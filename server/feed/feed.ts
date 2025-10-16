import { GetAxiosInstance, PostAxiosInstance, PutAxiosInstance } from '@/axios/axios.method';

import { CreateMyRoomFeedRequest, UpdateMyRoomFeedRequest } from './request';
import { GetMyRoomFeedResponse } from './response';

export type Feed = {
  name: string;
  description: string;
};

export const getMyRoomFeed = async ({ roomId }: { roomId: number }) => {
  const response = await GetAxiosInstance<GetMyRoomFeedResponse>(`/feed/${roomId}`);
  return response.data;
};

export const createMyRoomFeed = async (request: CreateMyRoomFeedRequest) => {
  const response = await PostAxiosInstance<boolean, CreateMyRoomFeedRequest>('/feed', request);
  return response.data;
};

export const updateMyRoomFeed = async (request: UpdateMyRoomFeedRequest) => {
  const response = await PutAxiosInstance<boolean, UpdateMyRoomFeedRequest>('/feed', request);
  return response.data;
};
