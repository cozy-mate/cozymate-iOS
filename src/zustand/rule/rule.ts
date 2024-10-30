import { create } from 'zustand';

import { RuleItem } from './type';

// 룰 1개 정보
export const useRuleItemStore = create<{
  ruleItem: RuleItem;
  setRuleItem: (newRule: RuleItem) => void;
}>((set) => ({
  ruleItem: {
    content: '',
    memo: '',
  },
  setRuleItem: (newRule) => set((state) => ({ ruleItem: { ...state.ruleItem, ...newRule } })),
}));
