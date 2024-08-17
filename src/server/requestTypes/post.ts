export interface CreatePostRequest {
  roomId: number;
  title: string;
  content: string;
  imageList: string[];
}

export interface UpdatePostRequest {
  roomId: number;
  postId: number;
  title: string;
  content: string;
  imageList: string[];
}

export interface DeletePostRequest {
  roomId: number;
  postId: number;
}

export interface GetPostListRequest {
  roomId: number;
  page: number;
}

export interface GetPostDetailRequest {
  roomId: number;
  postId: number;
}
