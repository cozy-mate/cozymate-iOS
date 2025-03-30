import { create } from 'zustand';

import { SelectedItem } from './type';

export const useSelectedItemStore = create<{
  selectedItem: SelectedItem;
  setSelectedItem: (newState: SelectedItem) => void;
}>((set) => ({
  selectedItem: {
    id: 0,
    type: '',
    content: '',
  },
  setSelectedItem: (newState: SelectedItem) => set({ selectedItem: newState }),
}));
