import {
  DeleteAxiosInstance,
  GetAxiosInstance,
  PostAxiosInstance,
  PutAxiosInstance,
} from '@/axios/axios.method';

import {
  CreatePostRequest,
  DeletePostRequest,
  GetPostDetailRequest,
  GetPostListRequest,
  UpdatePostRequest,
} from './request';
import { GetPostDetailResponse, GetPostListResponse } from './response';

export type Post = {
  id: number;
  writerId: number;
  content: string;
  nickname: string;
  persona: number;
  createdAt: string;
  imageList: string[];
};

export const getPostList = async (data: GetPostListRequest): Promise<GetPostListResponse> => {
  const response = await GetAxiosInstance<GetPostListResponse>(`/post/${data.roomId}`, {
    params: {
      page: data.page,
    },
  });
  return response.data;
};

export const getPostDetail = async (data: GetPostDetailRequest): Promise<GetPostDetailResponse> => {
  const response = await GetAxiosInstance<GetPostDetailResponse>(
    `/post/${data.roomId}/${data.postId}`,
  );
  return response.data;
};

export const createPost = async (data: CreatePostRequest): Promise<boolean> => {
  const response = await PostAxiosInstance<boolean, CreatePostRequest>(`/post`, data);
  return response.data;
};

export const updatePost = async (data: UpdatePostRequest): Promise<boolean> => {
  const response = await PutAxiosInstance<boolean, UpdatePostRequest>(`/post`, data);
  return response.data;
};

export const deletePost = async (data: DeletePostRequest): Promise<boolean> => {
  const response = await DeleteAxiosInstance<boolean>(`/post/${data.roomId}/${data.postId}`);
  return response.data;
};
