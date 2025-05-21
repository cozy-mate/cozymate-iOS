export interface GetNotificationLogResponse {
  result: {
    page: number;
    hasNext: boolean;
    result: {
      content: string;
      createdAt: string;
      category: string;
      targetId: number;
    }[];
  };
}
