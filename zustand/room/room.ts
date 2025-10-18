import { create } from 'zustand';

import { CreateRoomInfo } from './type';

export const useCreateRoomStore = create<{
  createRoomInfo: CreateRoomInfo;
  setCreateRoomInfo: (status: Partial<CreateRoomInfo>) => void;
  clearCreateRoomInfo: () => void;
}>((set) => ({
  createRoomInfo: {
    name: '',
    persona: 1,
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
        persona: 1,
        maxMateNum: 0,
        hashtagList: [],
      },
    })),
}));
