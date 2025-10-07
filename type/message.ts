export type MessageData = {
  nickname: string;
  content: string;
  datetime: string;
};

export type MessageRoomData = {
  persona: number;
  nickname: string;
  lastContent: string;
  messageRoomId: number;
  memberId: number;
  hasNewMessage: boolean;
};
