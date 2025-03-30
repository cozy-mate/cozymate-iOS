import { create } from 'zustand';

export const useHasRoomStore = create<{
  roomId: number;
  setRoomId: (newRoomId: number) => void;
}>((set) => ({
  roomId: 0,
  setRoomId: (newState: number) => set({ roomId: newState }),
}));
