import { PostAxiosInstance, PutAxiosInstance } from '@axios/axios.method';
import { CreateCommentRequest, UpdateCommentRequest } from '@server/requestTypes/comment';
import {
  CreateCommentResponse,
  DeleteCommentResponse,
  UpdateCommentResponse,
} from '@server/responseTypes/comment';

// 댓글 생성
export const createComment = async (data: CreateCommentRequest): Promise<CreateCommentResponse> => {
  const response = await PostAxiosInstance<CreateCommentResponse>(`/comment`, data);
  return response.data;
};

// 댓글 수정
export const updateComment = async (data: UpdateCommentRequest): Promise<UpdateCommentResponse> => {
  const response = await PutAxiosInstance<UpdateCommentResponse>(`/comment`, data);
  return response.data;
};

// 댓글 삭제
export const deleteComment = async (
  roomId: number,
  postId: number,
  commentId: number,
): Promise<DeleteCommentResponse> => {
  const response = await PostAxiosInstance<DeleteCommentResponse>(
    `/comment/${roomId}/${postId}/${commentId}`,
  );
  return response.data;
};
