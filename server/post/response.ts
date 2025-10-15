import { Comment } from '../comment/comment';

import { Post } from './post';

export interface GetPostListResponse {
  result: {
    page: number;
    hasNext: boolean;
    result: (Post & { commentCount: number })[];
  };
}

export interface GetPostDetailResponse {
  result: Post & { commentList: Comment[] };
}
