export interface DeleteRuleResponse {
  result: string;
}

export interface GetRuleDataResponse {
  result: {
    id: number;
    content: string;
    memo: string;
  }[];
}

export interface AddRuleResponse {
  result: {
    id: number;
  };
}

export interface UpdateRuleResponse {
  result: string;
}
