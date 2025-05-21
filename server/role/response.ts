export interface DeleteRoleResponse {
  result: string;
}

export interface GetRoleListResponse {
  result: {
    roleId: number;
    mateList: {
      mateId: number;
      nickname: string;
    }[];
    content: string;
    repeatDayList: string[];
    isAllDays: boolean;
  }[];
}

export interface CreateRoleResponse {
  result: {
    ruleId: number;
  };
}

export interface UpdateRoleResponse {
  result: string;
}
