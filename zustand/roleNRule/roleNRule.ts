import { create } from 'zustand';

import { SelectedItem } from './type';

export const useSelectedItemStore = create<{
  selectedItem: SelectedItem;
  setSelectedItem: (updater: (prev: SelectedItem) => SelectedItem) => void;
  clearSelectedItem: () => void;
}>((set) => ({
  selectedItem: {
    id: 0,
    type: '',
    content: '',

    todoItem: {
      mateIdList: [],
      content: '',
      timePoint: '',
    },

    ruleItem: {
      content: '',
      memo: '',
    },

    roleItem: {
      mateIdNameList: [],
      content: '',
      repeatDayList: [],
    },
  },
  setSelectedItem: (updater) =>
    set((state) => ({
      selectedItem: updater(state.selectedItem),
    })),
  clearSelectedItem: () =>
    set({
      selectedItem: {
        id: 0,
        type: '',
        content: '',

        todoItem: {
          mateIdList: [],
          content: '',
          timePoint: '',
        },

        ruleItem: {
          content: '',
          memo: '',
        },

        roleItem: {
          mateIdNameList: [],
          content: '',
          repeatDayList: [],
        },
      },
    }),
}));
