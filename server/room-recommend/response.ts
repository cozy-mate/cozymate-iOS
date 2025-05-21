import { RecommendRoomItem } from '@/type/room';

export interface GetRecommendRoomListResponse {
  result: {
    page: number;
    hasNext: boolean;
    result: RecommendRoomItem[];
  };
}
