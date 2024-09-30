export interface SignUp {
  name: string;
  nickname: string;
  gender: string;
  birthday: string;
  persona: number;
}

export interface Profile {
  name: string;
  nickname: string;
  gender: string;
  birthday: string;
  persona: number;
}

export interface MyRoom {
  hasRoom: boolean;
  roomId: number;
}
