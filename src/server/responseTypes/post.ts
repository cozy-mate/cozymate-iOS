export interface CreatePostResponse {
  result: number;
}

export interface UpdatePostResponse {
  result: number;
}

export interface DeletePostResponse {
  result: boolean;
}

export interface GetPostListResponse {
  result: [
    {
      id: number;
      title: string;
      content: string;
      nickname: string;
      persona: string;
      imageList: string[];
      commentCount: number;
      createdAt: string;
    },
  ];
}

export interface GetPostDetailResponse {
  result: {
    id: number;
    title: string;
    content: string;
    nickname: string;
    persona: string;
    imageList: string[];
    commentList: [
      {
        id: number;
        content: string;
        nickname: string;
        persona: string;
      },
    ];
    createdAt: string;
    updatedAt: string;
  };
}