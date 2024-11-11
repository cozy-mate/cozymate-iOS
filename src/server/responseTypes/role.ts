export interface DeleteRoleResponse {
  result: string;
}

export interface RoleItem {
  id: number;
  content: string;
  repeatDayList: string[];
  allDays: boolean;
}

export interface MateRoleItem {
  persona: number;
  mateRoleList: RoleItem[];
}

export interface GetRoleDataResponse {
  result: {
    roleList: {
      id: number;
      mateNameList: string[];
      content: string;
      repeatDayList: string[];
      allDays: boolean;
    }[];
  };
}

export interface UpdateRoleResponse {
  result: string;
}

export interface AddRoleResponse {
  result: string;
}
