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

export interface Member {
  isLoggedIn: boolean;
  memberInfo: MemberInfo | null;
  hasLifeStyle: boolean;
  hasRoom: boolean;
  roomInfo?: RoomInfo;
}

interface MemberStore extends Member {
  setMemberInfo: (memberInfo: MemberInfo) => void;
  logout: () => void;
  setHasLifeStyle: () => void;
  setRoom: (roomInfo: RoomInfo) => void;
  clearRoom: () => void;
}

export const useMemberStore = create<MemberStore>((set) => ({
  isLoggedIn: false,
  memberInfo: null,
  hasLifeStyle: false,
  hasRoom: false,
  roomInfo: undefined,

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
      roomInfo: undefined,
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
      roomInfo: undefined,
    })),
}));
