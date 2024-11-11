export interface DeleteRuleResponse {
  result: string;
}

export interface GetRuleDataResponse {
  result: {
    ruleId: number;
    content: string;
    memo: string;
  }[];
}

export interface AddRuleResponse {
  result: {
    ruleId: number;
  };
}

export interface UpdateRuleResponse {
  result: string;
}
