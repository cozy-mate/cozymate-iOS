export interface CreateFeedRequest {
  roomId: number;
  name: string;
  description: string;
}

export interface UpdateFeedRequest {
  id: number;
  name: string;
  description: string;
}

export interface GetFeedRequest {
  roomId: number;
}
