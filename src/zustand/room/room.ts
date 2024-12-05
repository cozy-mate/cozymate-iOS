import { create } from 'zustand';

import { MyRoom, RoomInfo, CreatePublicRoomInfo, CreatePrivateRoomInfo } from './type';

// 사용자의 방 존재 여부 및 방 아이디
export const useHasRoomStore = create<{
  myRoom: MyRoom;
  setMyRoom: (newMyRoom: Partial<MyRoom>) => void;
  clearMyRoom: () => void;
}>((set) => ({
  myRoom: {
    hasRoom: false,
    roomId: 0,
    isRoomManager: false,
    isFullRoom: false,
  },
  setMyRoom: (newMyRoom) => set((state) => ({ myRoom: { ...state.myRoom, ...newMyRoom } })),
  clearMyRoom: () =>
    set(() => ({
      myRoom: {
        hasRoom: false,
        roomId: 0,
        isRoomManager: false,
        isFullRoom: false,
      },
    })),
}));

// 공개방 생성
export const useCreatePublicRoomStore = create<{
  createPublicRoomInfo: CreatePublicRoomInfo;
  setCreatePublicRoomInfo: (newCreatePublicRoomInfo: Partial<CreatePublicRoomInfo>) => void;
  clearCreatePublicRoom: () => void;
}>((set) => ({
  createPublicRoomInfo: {
    name: '',
    persona: 0,
    maxMateNum: 0,
    hashtagList: [],
  },
  setCreatePublicRoomInfo: (newCreatePublicRoomInfo) =>
    set((state) => ({
      createPublicRoomInfo: { ...state.createPublicRoomInfo, ...newCreatePublicRoomInfo },
    })),
  clearCreatePublicRoom: () =>
    set(() => ({
      createPublicRoomInfo: {
        name: '',
        persona: 0,
        maxMateNum: 0,
        hashtagList: [],
      },
    })),
}));

// 비공개방 생성
export const useCreatePrivateRoomStore = create<{
  createPrivateRoomInfo: CreatePrivateRoomInfo;
  setCreatePrivateRoomInfo: (newCreatePrivateRoomInfo: Partial<CreatePrivateRoomInfo>) => void;
  clearCreatePrivateRoom: () => void;
}>((set) => ({
  createPrivateRoomInfo: {
    name: '',
    persona: 0,
    maxMateNum: 0,
  },
  setCreatePrivateRoomInfo: (newCreatePrivateRoomInfo) =>
    set((state) => ({
      createPrivateRoomInfo: { ...state.createPrivateRoomInfo, ...newCreatePrivateRoomInfo },
    })),
  clearCreatePrivateRoom: () =>
    set(() => ({
      createPrivateRoomInfo: {
        name: '',
        persona: 0,
        maxMateNum: 0,
      },
    })),
}));

// 생성된 방 정보 저장
export const useRoomInfoStore = create<{
  roomInfo: RoomInfo;
  setRoomInfo: (info: RoomInfo) => void;
  clearRoomInfo: () => void;
}>((set) => ({
  roomInfo: {
    roomId: 0,
    name: '',
    inviteCode: '',
    persona: 0,
    mateDetailList: [
      {
        memberId: 0,
        mateId: 0,
        nickname: '',
        persona: 0,
        mateEquality: 0,
      },
    ],
    managerMemberId: 0,
    managerNickname: '',
    isRoomManager: false,
    favoriteId: 0,
    maxMateNum: 0,
    arrivalMateNum: 0,
    dormitoryName: '',
    roomType: '',
    hashtagList: [],
    equality: 0,
    difference: {
      blue: [],
      red: [],
      white: [],
    },
  },
  setRoomInfo: (newRoomInfo) =>
    set((state) => ({ roomInfo: { ...state.roomInfo, ...newRoomInfo } })),
  clearRoomInfo: () =>
    set(() => ({
      roomInfo: {
        roomId: 0,
        name: '',
        inviteCode: '',
        persona: 0,
        mateDetailList: [
          {
            memberId: 0,
            mateId: 0,
            nickname: '',
            persona: 0,
            mateEquality: 0,
          },
        ],
        managerMemberId: 0,
        managerNickname: '',
        isRoomManager: false,
        favoriteId: 0,
        maxMateNum: 0,
        arrivalMateNum: 0,
        dormitoryName: '',
        roomType: '',
        hashtagList: [],
        equality: 0,
        difference: {
          blue: [],
          red: [],
          white: [],
        },
      },
    })),
}));
