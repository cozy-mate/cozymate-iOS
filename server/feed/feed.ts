import { GetAxiosInstance, PutAxiosInstance } from '@/axios/axios.method';

import { UpdateMyRoomFeedRequest } from './request';
import { GetMyRoomFeedResponse } from './response';

export type Feed = {
  name: string;
  description: string;
};

export const getMyRoomFeed = async () => {
  const response = await GetAxiosInstance<GetMyRoomFeedResponse>('/feed');
  return response.data;
};

export const updateMyRoomFeed = async (request: UpdateMyRoomFeedRequest) => {
  const response = await PutAxiosInstance<boolean, UpdateMyRoomFeedRequest>('/feed', request);
  return response.data;
};
