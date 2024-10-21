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
    myRoleList: MateRoleItem;
    otherRoleList: {
      [key: string]: MateRoleItem;
    };
  };
}

export interface UpdateRoleResponse {
  result: string;
}

export interface AddRoleResponse {
  result: string;
}
