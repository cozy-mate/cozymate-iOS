import { create } from 'zustand';

export interface MemberInfo {
  memberId: number;
  nickname: string;
  gender: string;
  birthday: string;
  universityName: string;
  universityId: number;
  majorName: string;
  persona: number;
}

export interface RoomInfo {
  roomId: number;
  isRoomManager: boolean;
}

export interface MemberWithRoom {
  isLoggedIn: boolean;
  memberInfo: MemberInfo | null;
  hasLifeStyle: boolean;
  hasRoom: true;
  roomInfo: RoomInfo; // 반드시 존재
}

export interface MemberWithoutRoom {
  isLoggedIn: boolean;
  memberInfo: MemberInfo | null;
  hasLifeStyle: boolean;
  hasRoom: false;
  roomInfo: RoomInfo;
}

export type Member = MemberWithRoom | MemberWithoutRoom;

type MemberStore = Member & {
  setMemberInfo: (memberInfo: MemberInfo) => void;
  logout: () => void;
  setHasLifeStyle: () => void;
  setRoom: (roomInfo: RoomInfo) => void;
  clearRoom: () => void;
};

export const useMemberStore = create<MemberStore>((set) => ({
  isLoggedIn: false,
  memberInfo: null,
  hasLifeStyle: false,
  hasRoom: false,
  roomInfo: {
    roomId: 0,
    isRoomManager: false,
  },

  setMemberInfo: (memberInfo: MemberInfo) =>
    set(() => ({
      isLoggedIn: true,
      memberInfo,
    })),

  logout: () =>
    set(() => ({
      isLoggedIn: false,
      memberInfo: null,
      hasLifeStyle: false,
      hasRoom: false,
      roomInfo: {
        roomId: 0,
        isRoomManager: false,
      },
    })),

  setHasLifeStyle: () => {
    set(() => ({
      hasLifeStyle: true,
    }));
  },

  setRoom: (roomInfo: RoomInfo) =>
    set(() => ({
      hasRoom: true,
      roomInfo,
    })),

  clearRoom: () =>
    set(() => ({
      hasRoom: false,
      roomInfo: {
        roomId: 0,
        isRoomManager: false,
      },
    })),
}));
