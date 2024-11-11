export interface DeleteRoleResponse {
  result: string;
}

export interface RoleItem {
  roleId: number;
  mateNameList: string[];
  content: string;
  repeatDayList: string[];
  isAllDays: boolean;
}

export interface GetRoleDataResponse {
  result: {
    roleList: RoleItem[];
  };
}

export interface AddRoleResponse {
  result: {
    roleId: number;
  };
}

export interface UpdateRoleResponse {
  result: string;
}
