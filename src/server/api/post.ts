import { CreatePostRequest, UpdatePostRequest } from '@server/requestTypes/post';
import {
  PostAxiosInstance,
  PutAxiosInstance,
  DeleteAxiosInstance,
  GetAxiosInstance,
} from '../../axios/axios.method';
import {
  GetPostDetailResponse,
  CreatePostResponse,
  UpdatePostResponse,
  GetPostListResponse,
  DeletePostResponse,
} from '@server/responseTypes/post';

// 게시글 조회
export const getDetailPost = async (
  roomId: number,
  postId: number,
): Promise<GetPostDetailResponse> => {
  const response = await GetAxiosInstance<GetPostDetailResponse>(`/post/${roomId}/${postId}`);
  return response.data;
};

export const getPostList = async (roomId: number, page: number): Promise<GetPostListResponse> => {
  const response = await GetAxiosInstance<GetPostListResponse>(`/post/${roomId}`, {
    params: {
      page,
    },
  });
  return response.data;
};

// 게시글 생성
export const createPost = async (data: CreatePostRequest): Promise<CreatePostResponse> => {
  const response = await PostAxiosInstance<CreatePostResponse>(`/post`, data);
  return response.data;
};

// 게시글 수정
export const updatePost = async (data: UpdatePostRequest): Promise<UpdatePostResponse> => {
  const response = await PutAxiosInstance<UpdatePostResponse>(`/post`, data);
  return response.data;
};

// 게시글 삭제
export const deletePost = async (roomId: number, postId: number): Promise<DeletePostResponse> => {
  const response = await DeleteAxiosInstance<DeletePostResponse>(`/post/${roomId}/${postId}`);
  return response.data;
};
