export interface DeleteRuleResponse {
  result: string;
}

export interface GetRuleListResponse {
  result: {
    ruleId: number;
    content: string;
    memo: string;
  }[];
}

export interface CreateRuleResponse {
  result: {
    ruleId: number;
  };
}

export interface UpdateRuleResponse {
  result: string;
}
