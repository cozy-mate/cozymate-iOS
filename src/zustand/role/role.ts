import { create } from 'zustand';

import { RoleItem } from './type';

// 롤 1개 정보
export const useRoleItemStore = create<{
  roleItem: RoleItem;
  setRoleItem: (newRole: RoleItem) => void;
}>((set) => ({
  roleItem: {
    roleId: 0,
    mateList: [],
    content: '',
    repeatDayList: [],
    isAllDays: false,
  },
  setRoleItem: (newRole) => set((state) => ({ roleItem: { ...state.roleItem, ...newRole } })),
}));
