export interface DeleteRoleResponse {
  result: string;
}

export interface RoleItem {
  roleId: number;
  mateList: { mateId: number; nickname: string }[];
  content: string;
  repeatDayList: string[];
  isAllDays: boolean;
}

export interface GetRoleDataResponse {
  result: RoleItem[];
}

export interface AddRoleResponse {
  result: {
    roleId: number;
  };
}

export interface UpdateRoleResponse {
  result: string;
}
