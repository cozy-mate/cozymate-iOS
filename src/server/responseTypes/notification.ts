export interface GetNotificationResponse {
  result: {
    content: string;
    createdAt: string;
    category: string;
  }[];
}
