export type ChatData = {
  nickname: string;
  content: string;
  datetime: string;
};

export type ChatRoomData = {
  persona: number;
  nickname: string;
  lastContent: string;
  chatRoomId: number;
  memberId: number;
  hasNewChat: boolean;
};
