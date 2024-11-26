import { create } from 'zustand';

import { RuleItem } from './type';

// 룰 1개 정보
export const useRuleItemStore = create<{
  ruleItem: RuleItem;
  setRuleItem: (newRule: RuleItem) => void;
}>((set) => ({
  ruleItem: {
    ruleId: 0,
    content: '',
    memo: '',
  },
  setRuleItem: (newRule) => set((state) => ({ ruleItem: { ...state.ruleItem, ...newRule } })),
}));
