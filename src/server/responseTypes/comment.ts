export interface CreateCommentResponse {
  result: number;
}

export interface UpdateCommentResponse {
  result: number;
}

export interface DeleteCommentResponse {
  result: boolean;
}

export interface GetCommentListReponse {
  result: {
    id: number;
    writerId: number;
    nickname: string;
    persona: number;
    content: string;
    createdAt: string;
  }[];
}
