import { create } from 'zustand';

import { RoleItem } from './type';

// 롤 1개 정보
export const useRoleItemStore = create<{
  roleItem: RoleItem;
  setRoleItem: (newRole: RoleItem) => void;
}>((set) => ({
  roleItem: {
    title: '',
    repeatDayList: [],
  },
  setRoleItem: (newRole) => set((state) => ({ roleItem: { ...state.roleItem, ...newRole } })),
}));
