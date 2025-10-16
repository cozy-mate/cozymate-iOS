import {
  DeleteAxiosInstance,
  GetAxiosInstance,
  PostAxiosInstance,
  PutAxiosInstance,
} from '@/axios/axios.method';

import {
  CreateCommentRequest,
  DeleteCommentRequest,
  GetCommentListRequest,
  UpdateCommentRequest,
} from './request';
import { GetCommentListResponse } from './response';

export type Comment = {
  id: number;
  writerId: number;
  nickname: string;
  persona: number;
  content: string;
  createdAt: string;
};

export const createComment = async (data: CreateCommentRequest): Promise<boolean> => {
  const response = await PostAxiosInstance<boolean, CreateCommentRequest>(`/comment`, data);
  return response.data;
};

export const updateComment = async (data: UpdateCommentRequest): Promise<boolean> => {
  const response = await PutAxiosInstance<boolean, UpdateCommentRequest>(`/comment`, data);
  return response.data;
};

export const deleteComment = async (data: DeleteCommentRequest): Promise<boolean> => {
  const response = await DeleteAxiosInstance<boolean>(
    `/comment/${data.roomId}/${data.postId}/${data.commentId}`,
  );
  return response.data;
};

export const getCommentList = async (
  data: GetCommentListRequest,
): Promise<GetCommentListResponse> => {
  const response = await GetAxiosInstance<GetCommentListResponse>(
    `/comment/${data.roomId}/${data.postId}`,
  );
  return response.data;
};
