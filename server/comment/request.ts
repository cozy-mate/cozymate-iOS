export interface CreateCommentRequest {
  postId: number;
  roomId: number;
  content: string;
}

export interface UpdateCommentRequest {
  commentId: number;
  roomId: number;
  postId: number;
  content: string;
}

export interface DeleteCommentRequest {
  commentId: number;
  roomId: number;
  postId: number;
}

export interface GetCommentListRequest {
  postId: number;
  roomId: number;
}
