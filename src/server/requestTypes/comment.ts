export interface CreateCommentRequest {
  roomId: number;
  postId: number;
  content: string;
}

export interface UpdateCommentRequest {
  roomId: number;
  postId: number;
  commentId: number;
  content: string;
}

export interface DeleteCommentRequest {
  roomId: number;
  postId: number;
  commentId: number;
}

export interface GetCommentRequest {
  roomId: number;
  postId: number;
}
