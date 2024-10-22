import { create } from 'zustand';

import {
  MyRoom,
  RoomInfo,
  InviteCodeRoomInfo,
  CreatePublicRoomInfo,
  CreatePrivateRoomInfo,
} from './type';

// 사용자의 방 존재 여부 및 방 아이디
export const useHasRoomStore = create<{
  myRoom: MyRoom;
  setMyRoom: (newMyRoom: Partial<MyRoom>) => void;
}>((set) => ({
  myRoom: {
    hasRoom: false,
    roomId: 0,
  },
  setMyRoom: (newMyRoom) => set((state) => ({ myRoom: { ...state.myRoom, ...newMyRoom } })),
}));

// 공개방 생성
export const useCreatePublicRoomStore = create<{
  createPublicRoomInfo: CreatePublicRoomInfo;
  setCreatePublicRoomInfo: (newCreatePublicRoomInfo: Partial<CreatePublicRoomInfo>) => void;
}>((set) => ({
  createPublicRoomInfo: {
    name: '',
    profileImage: 0,
    maxMateNum: 0,
    hashtags: [],
  },
  setCreatePublicRoomInfo: (newCreatePublicRoomInfo) =>
    set((state) => ({
      createPublicRoomInfo: { ...state.createPublicRoomInfo, ...newCreatePublicRoomInfo },
    })),
}));

// 비공개방 생성
export const useCreatePrivateRoomStore = create<{
  createPrivateRoomInfo: CreatePrivateRoomInfo;
  setCreatePrivateRoomInfo: (newCreatePrivateRoomInfo: Partial<CreatePrivateRoomInfo>) => void;
}>((set) => ({
  createPrivateRoomInfo: {
    name: '',
    profileImage: 0,
    maxMateNum: 0,
  },
  setCreatePrivateRoomInfo: (newCreatePrivateRoomInfo) =>
    set((state) => ({
      createPrivateRoomInfo: { ...state.createPrivateRoomInfo, ...newCreatePrivateRoomInfo },
    })),
}));

// 생성된 방 정보 저장
export const useRoomInfoStore = create<{
  roomInfo: RoomInfo;
  setRoomInfo: (info: RoomInfo) => void;
}>((set) => ({
  roomInfo: {
    roomId: 0,
    name: '',
    inviteCode: '',
    profileImage: 0,
    mateList: [
      {
        memberId: 0,
        mateId: 0,
        nickname: '',
      },
    ],
    roomType: '',
    hashtags: [],
  },
  setRoomInfo: (newRoomInfo) =>
    set((state) => ({ roomInfo: { ...state.roomInfo, ...newRoomInfo } })),
}));

// 초대코드로 조회한 방 정보
export const useInviteCodeRoomStore = create<{
  inviteCodeRoomInfo: InviteCodeRoomInfo;
  setInviteCodeRoomInfo: (info: InviteCodeRoomInfo) => void;
}>((set) => ({
  inviteCodeRoomInfo: {
    roomId: 0,
    name: '',
    managerName: '',
    maxMateNum: 0,
  },
  setInviteCodeRoomInfo: (newRoomInfo) =>
    set((state) => ({ inviteCodeRoomInfo: { ...state.inviteCodeRoomInfo, ...newRoomInfo } })),
}));
