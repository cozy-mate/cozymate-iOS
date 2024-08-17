export interface CreateFeedRequest {
  roomId: number;
  name: string;
  description: string;
}

export interface UpdateFeedRequest {
  roomId: number;
  name: string;
  description: string;
}

export interface GetFeedRequest {
  roomId: number;
}
