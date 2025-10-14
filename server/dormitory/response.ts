export type Menu = {
  time: string;
  menu: string;
};

export type Notice = {
  title: string;
  url: string;
  isImportant: boolean;
  createdAt: string;
};

export type MenuTimeKey = 'breakfast' | 'lunch' | 'dinner';

export interface GetDormitoryMenuResponse {
  result: {
    [key in MenuTimeKey]: Menu;
  };
}

export interface GetDormitoryNoticeResponse {
  result: Notice[];
}
