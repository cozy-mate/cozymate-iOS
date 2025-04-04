import { create } from 'zustand';

import { RoomInfo } from './type';

export const useHasRoomStore = create<{
  roomInfo: RoomInfo;
  setRoomInfo: (newRoomId: RoomInfo) => void;
}>((set) => ({
  roomInfo: {
    roomId: 0,
    isRoomManager: false,
  },
  setRoomInfo: (newState: RoomInfo) => set({ roomInfo: newState }),
}));
