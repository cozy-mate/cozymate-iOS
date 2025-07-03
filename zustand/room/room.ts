import { create } from 'zustand';

import { CreateRoomInfo, RoomInfo } from './type';

export const useHasRoomStore = create<{
  roomInfo: RoomInfo;
  setRoomInfo: (newRoomId: RoomInfo) => void;
  clearRoomInfo: () => void;
}>((set) => ({
  roomInfo: {
    roomId: 0,
    isRoomManager: false,
  },
  setRoomInfo: (newState: RoomInfo) => set({ roomInfo: newState }),
  clearRoomInfo: () =>
    set({
      roomInfo: {
        roomId: 0,
        isRoomManager: false,
      },
    }),
}));

export const useCreateRoomStore = create<{
  createRoomInfo: CreateRoomInfo;
  setCreateRoomInfo: (status: Partial<CreateRoomInfo>) => void;
  clearCreateRoomInfo: () => void;
}>((set) => ({
  createRoomInfo: {
    name: '',
    persona: 0,
    maxMateNum: 0,
    hashtagList: [],
  },
  setCreateRoomInfo: (status) =>
    set((state) => ({
      createRoomInfo: {
        ...state.createRoomInfo,
        ...status,
      },
    })),
  clearCreateRoomInfo: () =>
    set(() => ({
      createRoomInfo: {
        name: '',
        persona: 0,
        maxMateNum: 0,
        hashtagList: [],
      },
    })),
}));
